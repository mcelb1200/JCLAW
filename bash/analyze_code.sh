#!/bin/bash
# analyze_code.sh

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
source "$DIR/common.sh"

TASK_ID=$1
RETURN_PATCH=${2:-false}

if [ -z "$TASK_ID" ]; then
    echo "Usage: $0 [taskId] [returnPatch (true|false)]"
    exit 1
fi

echo "=== Analyzing Code ==="

ACTIVITIES=$(api_call "GET" "/$TASK_ID/activities?pageSize=20" "")
EVENTS=$(echo "$ACTIVITIES" | jq -r '.activities // []')

if [ "$EVENTS" = "null" ] || [ $(echo "$EVENTS" | jq length) -eq 0 ]; then
    echo "API Code Analysis for Session $TASK_ID:"
    echo "No activities found yet."
    exit 0
fi

echo "Recent Activities:"
for row in $(echo "$EVENTS" | jq -r '.[] | @base64'); do
    DECODED=$(echo "${row}" | base64 --decode)
    
    # Identify the event type (excluding common fields)
    EVENT_TYPE=$(echo "$DECODED" | jq -r 'keys | .[] | select(. != "createTime" and . != "name" and . != "description" and . != "originator" and . != "id")' | head -n 1)
    
    if [ -z "$EVENT_TYPE" ] || [ "$EVENT_TYPE" = "null" ]; then
        EVENT_TYPE="ACTIVITY"
        DETAIL=$(echo "$DECODED" | jq -r '.description // ""')
    else
        # Extract meaningful detail based on event type
        case $EVENT_TYPE in
            "planGenerated")
                DETAIL="Generated plan with $(echo "$DECODED" | jq -r '.planGenerated.plan.steps | length') steps"
                ;;
            "planApproved")
                DETAIL="Plan $(echo "$DECODED" | jq -r '.planApproved.planId') approved"
                ;;
            "progressUpdated")
                DETAIL=$(echo "$DECODED" | jq -r '.progressUpdated.description // .description // "Progress updated"')
                ;;
            "agentMessaged")
                DETAIL=$(echo "$DECODED" | jq -r '.agentMessaged.agentMessage // .agentMessaged.prompt // "Message from agent"')
                ;;
            "userMessaged")
                DETAIL=$(echo "$DECODED" | jq -r '.userMessaged.userMessage // "Message from user"')
                ;;
            *)
                # Safely handle objects vs arrays/other for generic cases
                DETAIL=$(echo "$DECODED" | jq -r "if (.$EVENT_TYPE | type) == \"object\" then (.$EVENT_TYPE.description // .description // \"\") elif (.$EVENT_TYPE | type) == \"array\" then \"$(echo "$EVENT_TYPE" | tr '[:lower:]' '[:upper:]') with \(.$EVENT_TYPE | length) items\" else .description // \"\" end")
                ;;
        esac
    fi
    
    # Truncate detail for readability
    if [ ${#DETAIL} -gt 100 ]; then
        DETAIL="${DETAIL:0:97}..."
    fi
    
    echo "- $EVENT_TYPE: $DETAIL"
done

PATCHES=$(echo "$EVENTS" | jq -r 'map(select(has("changeSet")) | .changeSet)')
if [ "$PATCHES" != "null" ] && [ $(echo "$PATCHES" | jq length) -gt 0 ]; then
    LATEST_PATCH=$(echo "$PATCHES" | jq -r '.[0]')
    if [ "$RETURN_PATCH" = "true" ]; then
        echo -e "\n\n--- FULL GIT PATCH ---\n$(echo "$LATEST_PATCH" | jq -r '.gitPatch')\n\n"
    else
        echo -e "\n\n--- LATEST CODE ARTIFACT ---\nCommit Message: $(echo "$LATEST_PATCH" | jq -r '.suggestedCommitMessage // "N/A"')\nPatch Snippet (first 500 chars):\n$(echo "$LATEST_PATCH" | jq -r '.gitPatch | .[0:500]')...\n*Use returnPatch: true to get the full diff.*"
    fi
fi
