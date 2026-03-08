#!/bin/bash
# resolve_conflicts.sh
# Automated Merge Conflict Resolution Engine for JCLAW.

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
source "$DIR/common.sh"

SOURCE_BRANCH=$1
TARGET_BRANCH=${2:-main}

if [ -z "$SOURCE_BRANCH" ]; then
    echo "Usage: $0 [sourceBranch] [targetBranch (default: main)]"
    exit 1
fi

echo -e "${YELLOW}=== JCLAW Conflict Resolution Engine ===${NC}"
echo "Source: $SOURCE_BRANCH"
echo "Target: $TARGET_BRANCH"

# 1. Ensure we are up to date
git checkout "$TARGET_BRANCH" || exit 1
git pull origin "$TARGET_BRANCH" || echo -e "${YELLOW}Warning: Could not pull origin/$TARGET_BRANCH. Using local state.${NC}"

# 2. Attempt merge
echo "Attempting to merge $SOURCE_BRANCH into $TARGET_BRANCH..."
if git merge "$SOURCE_BRANCH" --no-commit --no-ff > /dev/null 2>&1; then
    echo -e "${GREEN}✓ No conflicts detected. Merge successful (uncommitted).${NC}"
    git merge --abort
    exit 0
fi

# 3. Handle Conflicts
UNMERGED=$(git status --porcelain | grep "^UU " | cut -c 4-)
if [ -z "$UNMERGED" ]; then
    echo -e "${RED}✗ Merge failed for unknown reasons. No UU files found.${NC}"
    git merge --abort
    exit 1
fi

echo -e "${RED}⚠ Conflicts detected in:${NC}"
echo "$UNMERGED"

# 4. Scaffolding Resolution Task
TASK_NAME="resolve-conflicts-${SOURCE_BRANCH//\//-}"
mkdir -p .jules/active
REPORT_FILE=".jules/active/$TASK_NAME.md"

cat <<EOF > "$REPORT_FILE"
## Task: $TASK_NAME
**BASE_COMMIT:** $TARGET_BRANCH
**SCOPED_FILES:** $(echo $UNMERGED | xargs | tr ' ' ',')

### Objective
Resolve merge conflicts between \`$SOURCE_BRANCH\` and \`$TARGET_BRANCH\`.
The following files contain standard git conflict markers (<<<<<<<, =======, >>>>>>>).

Please inspect these files, resolve the conflicts logically ensuring the intent of both branches is preserved, remove the markers, and commit the resolution.

### Files to Fix:
$(echo "$UNMERGED" | sed 's/^/- /')
EOF

echo -e "${GREEN}✓ Created conflict resolution task: $REPORT_FILE${NC}"
echo "Aborting local merge to clean index..."
git merge --abort

echo -e "\n${NC}Delegation command:"
echo -e "${YELLOW}./agent-skills/bash/delegate_task.sh [repository] $TARGET_BRANCH $TASK_NAME${NC}"
