#!/bin/bash
# auto_review.sh

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
source "$DIR/common.sh"

TASK_ID=$1
BRANCH=$2
FIX_COMMAND=$3
LINT_COMMAND=$4

if [ -z "$TASK_ID" ] || [ -z "$BRANCH" ] || [ -z "$FIX_COMMAND" ] || [ -z "$LINT_COMMAND" ]; then
    echo "Usage: $0 [taskId] [branch] \"[fixCommand]\" \"[lintCommand]\""
    exit 1
fi

echo "=== Automated Code Review ==="

# Get current branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
STASH_NEEDED=false

if ! git diff-index --quiet HEAD --; then
    echo "ℹ Stashing local changes..."
    git stash push -m "auto_review_stash_$TASK_ID" >/dev/null
    STASH_NEEDED=true
fi

echo "ℹ Fetching remote branch: $BRANCH"
git fetch origin "$BRANCH" >/dev/null 2>&1

if ! git checkout "$BRANCH" >/dev/null 2>&1; then
    echo "✗ Failed to checkout branch $BRANCH. Does it exist locally or on origin?"
    if [ "$STASH_NEEDED" = true ]; then git stash pop >/dev/null; fi
    exit 1
fi

echo "ℹ Pulling latest changes from origin..."
git pull origin "$BRANCH" >/dev/null 2>&1 || true

echo "ℹ Running fix command: $FIX_COMMAND"
eval "$FIX_COMMAND" >/dev/null 2>&1
# We ignore the result of fix command, as we only care if lint passes

echo "ℹ Running lint command: $LINT_COMMAND"
LINT_OUTPUT=$(eval "$LINT_COMMAND" 2>&1)
LINT_EXIT_CODE=$?

if [ $LINT_EXIT_CODE -ne 0 ]; then
    echo "✗ Code quality issues found. Preparing feedback for Jules session..."

    # Truncate output to avoid massive payloads (max 10000 chars)
    TRUNCATED_OUTPUT=$(echo "$LINT_OUTPUT" | cut -c 1-10000)

    FEEDBACK="Automated Code Review Failed. Please address the following programmatic errors identified by the CI/Linter on branch \`$BRANCH\`:\n\n\`\`\`\n$TRUNCATED_OUTPUT\n\`\`\`\n\nPlease fix these issues and update the plan or commit the fixes."

    FEEDBACK_ESCAPED=$(echo -e "$FEEDBACK" | jq -Rs .)
    BODY=$(cat <<EOF
{
  "prompt": $FEEDBACK_ESCAPED
}
EOF
    )

    echo "ℹ Sending feedback to session $TASK_ID..."
    RESPONSE=$(api_call "POST" "/$TASK_ID:sendMessage" "$BODY")

    if echo "$RESPONSE" | jq -e 'has("error")' > /dev/null; then
        echo "✗ Failed to send feedback to Jules. Response:"
        echo "$RESPONSE" | jq '.'
    else
        echo "✓ Feedback sent successfully to task $TASK_ID."
    fi
else
    echo "✓ Code passed automated review."
fi

echo "ℹ Restoring original branch: $CURRENT_BRANCH"
git checkout "$CURRENT_BRANCH" >/dev/null 2>&1

if [ "$STASH_NEEDED" = true ]; then
    echo "ℹ Popping stashed changes..."
    git stash pop >/dev/null 2>&1
fi

echo "=== Auto Review Complete ==="
