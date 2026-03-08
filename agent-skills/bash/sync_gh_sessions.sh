#!/bin/bash
# sync_gh_sessions.sh
# Discovers JCLAW sessions from GitHub PR metadata and populates the local environment.

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
source "$DIR/common.sh"
source "$DIR/github_integration.sh"

REPOSITORY=$1
BRANCH=$2

# Auto-detect context if missing
if [ -z "$REPOSITORY" ]; then
    remote_url=$(git remote get-url origin 2>/dev/null)
    repo_match=$(echo "$remote_url" | grep -oP '[:/]\K[^/]+/[^/.]+(?=\.git|$)')
    REPOSITORY=${repo_match}
fi

if [ -z "$BRANCH" ]; then
    BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
fi

if [ -z "$REPOSITORY" ]; then
    echo -e "${RED}Error: Could not detect repository. Provide it as the first argument (owner/repo).${NC}"
    exit 1
fi

echo -e "${YELLOW}=== JCLAW GitHub Persistence Sync ===${NC}"
echo "Repository: $REPOSITORY"
echo "Branch: $BRANCH"

SESSIONS=$(get_sessions_from_pr "$BRANCH" "$REPOSITORY")

if [ -z "$SESSIONS" ]; then
    echo -e "${GREEN}No JCLAW session metadata found in PR comments.${NC}"
    exit 0
fi

echo -e "${GREEN}Discovered sessions from GitHub:${NC}"
echo "$SESSIONS" | jq -r '" - \(.taskId) (ID: \(.sessionId)) [\(.timestamp)]"'

# Ensure .jules/active exists
mkdir -p .jules/active

echo "$SESSIONS" | jq -c '.' | while read -r session; do
    TASK_ID=$(echo "$session" | jq -r '.taskId')
    SESSION_ID=$(echo "$session" | jq -r '.sessionId')
    
    FILE=".jules/active/$TASK_ID.md"
    if [ ! -f "$FILE" ]; then
        echo -e "ℹ Creating local mapping for $TASK_ID..."
        echo "## Remote JCLAW Session
Discovered via GitHub PR sync.

**Session ID**: $SESSION_ID
**Task ID**: $TASK_ID
**Sync Time**: $(date)

*Note: This file was automatically generated to restore cross-machine session state.*" > "$FILE"
    fi
done

echo -e "\n${GREEN}✓ Sync complete. Your local JCLAW state is now up to date with the team's progress on GitHub.${NC}"
