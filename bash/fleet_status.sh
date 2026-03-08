#!/bin/bash
# fleet_status.sh (Consolidated Fleet Dashboard for Gemini CLI)

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
source "$DIR/common.sh"

echo -e "${YELLOW}=== JULES AI FLEET DASHBOARD ===${NC}"

RESPONSE=$(api_call "GET" "?pageSize=50" "") || exit 1
SESSIONS=$(echo "$RESPONSE" | jq -c '.sessions // [] | .[]')

if [ -z "$SESSIONS" ]; then
    echo "No active sessions found."
    exit 0
fi

# We'll group them for easier review
PENDING_APPROVAL=""
PENDING_FEEDBACK=""
ACTIVE_PROGRESS=""
STUCK_SESSIONS=""

STUCK_THRESHOLD_MINUTES=30
NOW_SECONDS=$(date +%s)

while IFS= read -r session; do
    ID=$(echo "$session" | jq -r '.id')
    TITLE=$(echo "$session" | jq -r '.title' | head -n 1)
    STATE=$(echo "$session" | jq -r '.state')
    UPDATE_TIME=$(echo "$session" | jq -r '.updateTime')
    
    # Ignore terminal states
    if [[ "$STATE" == "COMPLETED" ]] || [[ "$STATE" == "CANCELLED" ]] || [[ "$STATE" == "FAILED" ]]; then
        continue
    fi

    # Calc timing for stuck detection
    UPDATE_SECONDS=$(date -d "${UPDATE_TIME}" +%s 2>/dev/null)
    if [ $? -ne 0 ]; then
        UPDATE_SECONDS=$(date -d "$(echo $UPDATE_TIME | sed 's/\.[0-9]*Z/Z/')" +%s 2>/dev/null)
    fi
    DIFF_MINUTES=$(( (NOW_SECONDS - UPDATE_SECONDS) / 60 ))

    ENTRY="\n--- ${GREEN}Task $ID (${TITLE:0:50})${NC} ---\n"
    ENTRY+="State: [${YELLOW}${STATE}${NC}] | Last updated: ${DIFF_MINUTES}m ago\n"

    case $STATE in
        "AWAITING_PLAN_APPROVAL")
            # Fetch the plan
            PLAN=$(api_call "GET" "/$ID/activities?pageSize=10" "" | jq -r '.activities[] | select(.planGenerated) | .planGenerated.plan.steps | map("- " + .title + ": " + .description) | join("\n")' | head -n 20)
            ENTRY+="PROPOSED PLAN:\n${BLUE}${PLAN}${NC}\n"
            ENTRY+="Action: Use 'approve_plan.sh $ID' or provide feedback.\n"
            PENDING_APPROVAL+="$ENTRY"
            ;;
        "AWAITING_USER_FEEDBACK")
            # Fetch the question
            QUESTION=$(api_call "GET" "/$ID/activities?pageSize=10" "" | jq -r '.activities[] | select(.agentMessaged) | .agentMessaged.agentMessage // .agentMessaged.prompt' | head -n 1)
            ENTRY+="JULES QUESTION:\n${YELLOW}> $QUESTION${NC}\n"
            ENTRY+="Action: Use 'send_message.sh $ID \"[your response]\"'\n"
            PENDING_FEEDBACK+="$ENTRY"
            ;;
        "IN_PROGRESS")
            # Get latest activity
            LATEST=$(api_call "GET" "/$ID/activities?pageSize=5" "" | jq -r '.activities[0] | keys | .[] | select(. != "createTime" and . != "name" and . != "description" and . != "originator" and . != "id")' | head -n 1)
            ENTRY+="Latest Activity: $LATEST\n"
            if [ $DIFF_MINUTES -gt $STUCK_THRESHOLD_MINUTES ]; then
                ENTRY+="${RED}<<< STUCK WARNING >>>${NC}\n"
                STUCK_SESSIONS+="$ENTRY"
            else
                ACTIVE_PROGRESS+="$ENTRY"
            fi
            ;;
        *)
            ACTIVE_PROGRESS+="$ENTRY"
            ;;
    esac
done <<< "$SESSIONS"

# Output organized by priority
if [ -n "$PENDING_APPROVAL" ]; then
    echo -e "\n${CYAN}>>> ACTIONS REQUIRED: PLAN APPROVALS <<<${NC}"
    echo -e "$PENDING_APPROVAL"
fi

if [ -n "$PENDING_FEEDBACK" ]; then
    echo -e "\n${CYAN}>>> ACTIONS REQUIRED: USER FEEDBACK <<<${NC}"
    echo -e "$PENDING_FEEDBACK"
fi

if [ -n "$STUCK_SESSIONS" ]; then
    echo -e "\n${RED}>>> WARNING: POTENTIALLY STUCK SESSIONS <<<${NC}"
    echo -e "$STUCK_SESSIONS"
fi

if [ -n "$ACTIVE_PROGRESS" ]; then
    echo -e "\n${BLUE}>>> SESSIONS IN PROGRESS <<<${NC}"
    echo -e "$ACTIVE_PROGRESS"
fi

echo -e "\n${GREEN}End of Dashboard.${NC}"
