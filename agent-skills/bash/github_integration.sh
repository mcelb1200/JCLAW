#!/bin/bash
# github_integration.sh
# Professional helper for mapping Jules sessions to GitHub PRs

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
source "$DIR/common.sh"

# Find a PR associated with a branch
get_pr_for_branch() {
    local branch=$1
    local repo=$2
    if ! check_cmd "gh"; then return 1; fi
    
    gh pr list --head "$branch" --repo "$repo" --json number,url,title --jq '.[0]'
}

# Post a comment to a PR
post_pr_comment() {
    local pr_number=$1
    local repo=$2
    local body=$3
    if ! check_cmd "gh"; then return 1; fi

    gh pr comment "$pr_number" --repo "$repo" --body "$body"
}

# Sync JCLAW session metadata to a PR (hidden HTML comment)
sync_session_to_pr() {
    local branch=$1
    local repo=$2
    local task_id=$3
    local session_id=$4
    if ! check_cmd "gh"; then return 1; fi

    local pr_json=$(get_pr_for_branch "$branch" "$repo")
    if [ -z "$pr_json" ] || [ "$pr_json" == "null" ]; then
        echo -e "${YELLOW}Warning: No PR found for branch $branch. Skipping remote sync.${NC}"
        return 0
    fi

    local pr_num=$(echo "$pr_json" | jq -r '.number')
    local metadata="<!-- JCLAW_SESSION: { \"taskId\": \"$task_id\", \"sessionId\": \"$session_id\", \"timestamp\": \"$(date -u +"%Y-%m-%dT%H:%M:%SZ")\" } -->"
    
    echo -e "ℹ Syncing session $session_id to PR #$pr_num..."
    gh pr comment "$pr_num" --repo "$repo" --body "🦞 **JCLAW Session Linked**: $task_id (ID: $session_id)\n\n$metadata"
}

# Extract session metadata from all PR comments
get_sessions_from_pr() {
    local branch=$1
    local repo=$2
    if ! check_cmd "gh"; then return 1; fi

    local pr_json=$(get_pr_for_branch "$branch" "$repo")
    if [ -z "$pr_json" ] || [ "$pr_json" == "null" ]; then
        return 0
    fi

    local pr_num=$(echo "$pr_json" | jq -r '.number')
    
    # Fetch all comments and parse for JCLAW_SESSION tag
    gh pr view "$pr_num" --repo "$repo" --json comments --jq '.comments[].body' | \
        grep "JCLAW_SESSION:" | \
        sed 's/.*JCLAW_SESSION: \(.*\) } -->.*/\1 }/'
}

# Link a Jules session to a PR (helper for audit reports)
get_session_pr_link() {
    local branch=$1
    local repo=$2
    local pr_json=$(get_pr_for_branch "$branch" "$repo")
    
    if [ -n "$pr_json" ] && [ "$pr_json" != "null" ]; then
        local url=$(echo "$pr_json" | jq -r '.url')
        local num=$(echo "$pr_json" | jq -r '.number')
        echo "[PR #$num]($url)"
    else
        echo "No PR found for branch $branch"
    fi
}
