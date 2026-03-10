#!/bin/bash
# monitor_sessions.sh

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
source "$DIR/common.sh"

STUCK_THRESHOLD_MINUTES=30
NOW_SECONDS=$(date +%s)

echo -e "${YELLOW}=== Monitoring Active Sessions ===${NC}"
echo "Stuck threshold: $STUCK_THRESHOLD_MINUTES minutes"

RESPONSE=$(api_call "GET" "?pageSize=50" "") || exit 1
SESSIONS=$(echo "$RESPONSE" | jq -c '.sessions // [] | .[]')

if [ -z "$SESSIONS" ]; then
    echo "No sessions found."
    exit 0
fi

STUCK_COUNT=0

while IFS= read -r session; do
    ID=$(echo "$session" | jq -r '.id')
    TITLE=$(echo "$session" | jq -r '.title' | head -n 1)
    STATE=$(echo "$session" | jq -r '.state')
    UPDATE_TIME=$(echo "$session" | jq -r '.updateTime')
    
    # Skip COMPLETED or CANCELLED
    if [[ "$STATE" == "COMPLETED" ]] || [[ "$STATE" == "CANCELLED" ]]; then
        continue
    fi

    # Convert ISO 8601 updateTime to seconds
    # Handles 2026-03-08T21:55:54.178688Z
    UPDATE_SECONDS=$(date -d "${UPDATE_TIME}" +%s 2>/dev/null)
    if [ $? -ne 0 ]; then
        # Fallback for some date versions
        UPDATE_SECONDS=$(date -d "$(echo $UPDATE_TIME | sed 's/\.[0-9]*Z/Z/')" +%s 2>/dev/null)
    fi

    DIFF_MINUTES=$(( (NOW_SECONDS - UPDATE_SECONDS) / 60 ))

    STATUS_COLOR="${NC}"
    if [[ "$STATE" == "AWAITING_USER_FEEDBACK" ]] || [[ "$STATE" == "AWAITING_PLAN_APPROVAL" ]]; then
        STATUS_COLOR="${YELLOW}"
    elif [[ "$STATE" == "IN_PROGRESS" ]]; then
        STATUS_COLOR="${GREEN}"
    fi

    echo -ne "Task ${ID} (${TITLE:0:40}): [${STATUS_COLOR}${STATE}${NC}] - Last updated ${DIFF_MINUTES}m ago"

    if [ $DIFF_MINUTES -gt $STUCK_THRESHOLD_MINUTES ] && [[ "$STATE" == "IN_PROGRESS" ]]; then
        echo -e " ${RED}<<< STUCK? >>>${NC}"
        STUCK_COUNT=$((STUCK_COUNT + 1))
    else
        echo ""
    fi
done <<< "$SESSIONS"

if [ $STUCK_COUNT -gt 0 ]; then
    echo -e "\n${RED}⚠ Found $STUCK_COUNT potentially stuck sessions.${NC}"
    echo "Recommended action: Use check_feedback.sh or get_task.sh [id] to investigate."
else
    echo -e "\n${GREEN}✓ No stuck sessions detected.${NC}"
fi
