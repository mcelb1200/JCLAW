#!/bin/bash
# audit_report.sh
# Professional audit reporting for JCLAW sessions

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
source "$DIR/common.sh"
source "$DIR/github_integration.sh"

TASK_ID=$1
if [ -z "$TASK_ID" ]; then
    echo "Usage: $0 [taskId]"
    exit 1
fi

REPORT_DIR=".jules/audit"
mkdir -p "$REPORT_DIR"
REPORT_FILE="$REPORT_DIR/$TASK_ID.report.md"

echo -e "${YELLOW}Generating comprehensive audit report for $TASK_ID...${NC}"

# 1. Fetch data
SESSION_DATA=$(api_call "GET" "/$TASK_ID" "") || exit 1
ACTIVITIES=$(api_call "GET" "/$TASK_ID/activities?pageSize=100" "") || exit 1

TITLE=$(echo "$SESSION_DATA" | jq -r '.title')
STATE=$(echo "$SESSION_DATA" | jq -r '.state')
BRANCH=$(echo "$SESSION_DATA" | jq -r '.sourceContext.githubRepoContext.startingBranch')
REPO=$(echo "$SESSION_DATA" | jq -r '.sourceContext.source | sub("sources/github/"; "")')
CREATE_TIME=$(echo "$SESSION_DATA" | jq -r '.createTime')

# 2. CI Telemetry (Artifact retrieval)
TELEMETRY="*No branch information available.*"
if [ "$BRANCH" != "null" ]; then
    if command -v gh >/dev/null 2>&1; then
        RUN=$(gh run list --branch "$BRANCH" --limit 1 --json databaseId,status,conclusion,name | jq -r '.[0]')
        if [ "$RUN" != "null" ]; then
            ID=$(echo "$RUN" | jq -r '.databaseId')
            STATUS=$(echo "$RUN" | jq -r '.status')
            CONCLUSION=$(echo "$RUN" | jq -r '.conclusion')
            NAME=$(echo "$RUN" | jq -r '.name')
            TELEMETRY="**Latest CI Run:** $NAME (ID: $ID)\n**Status:** $STATUS\n**Conclusion:** $CONCLUSION"
            if [ "$CONCLUSION" = "failure" ]; then
                LOGS=$(gh run view "$ID" --log-failed | tail -n 20)
                TELEMETRY="$TELEMETRY\n\n**Failed Logs (Tail):**\n\`\`\`\n$LOGS\n\`\`\`"
            fi
        else
            TELEMETRY="*No GitHub Actions runs found for branch \`$BRANCH\`.*"
        fi
    else
        TELEMETRY="*gh CLI not found. CI telemetry skipped.*"
    fi
fi

# 3. Get GitHub Context
PR_LINK=$(get_session_pr_link "$BRANCH" "$REPO")

# 4. Build Report
cat <<EOF > "$REPORT_FILE"
# 🦞 JCLAW Session Audit Report: $TASK_ID
**Title:** $TITLE  
**State:** $STATE  
**Created:** $CREATE_TIME  
**Repository:** $REPO  
**Branch:** $BRANCH  
**GitHub Link:** $PR_LINK

---

## 📊 CI Telemetry
$TELEMETRY

---

## 🎯 Original Prompt
$(echo "$SESSION_DATA" | jq -r '.prompt')

---

## 💬 Conversation History
EOF

echo "$ACTIVITIES" | jq -c '.activities // [] | .[]' | while read -r activity; do
    if echo "$activity" | jq -e '.agentMessaged' > /dev/null; then
        echo -e "### 🤖 Jules Message\n$(echo "$activity" | jq -r '.agentMessaged.agentMessage')\n" >> "$REPORT_FILE"
    elif echo "$activity" | jq -e '.userMessaged' > /dev/null; then
        echo -e "### 👤 User Message\n$(echo "$activity" | jq -r '.userMessaged.userMessage')\n" >> "$REPORT_FILE"
    fi
done

echo "---" >> "$REPORT_FILE"
echo -e "## 🛠️ Implementation Summary" >> "$REPORT_FILE"

# Extract change summary from the latest completion if available
SUMMARY=$(echo "$ACTIVITIES" | jq -r '.activities // [] | .[] | select(.agentCompleted) | .agentCompleted.summary' | head -n 1)
if [ "$SUMMARY" != "null" ] && [ -n "$SUMMARY" ]; then
    echo -e "$SUMMARY" >> "$REPORT_FILE"
else
    echo -e "No final summary was recorded by the agent." >> "$REPORT_FILE"
fi

# Link to code analysis (assumes analyze_code.sh produces meaningful output)
echo -e "\nDetailed code changes can be reviewed by running \`./agent-skills/bash/analyze_code.sh $TASK_ID\`" >> "$REPORT_FILE"

echo -e "${GREEN}✓ Audit report generated: $REPORT_FILE${NC}"
