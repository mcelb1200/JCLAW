#!/bin/bash
# dependency_status.sh
# Visualizes the status of Jules tasks across the backlog, active, and archive directories.

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
source "$DIR/common.sh"

echo -e "${YELLOW}=== JCLAW Dependency Status ===${NC}"

# 1. Backlog (Pending)
echo -e "\n${NC}Pending Tasks (.jules/backlog):"
if [ -d ".jules/backlog" ]; then
    ls .jules/backlog/*.md 2>/dev/null | xargs -n 1 basename | sed 's/.md//' | while read -r task; do
        echo -e " - ${YELLOW}$task${NC} (backlog)"
    done
else
    echo " (No backlog directory)"
fi

# 2. Active (In Progress)
echo -e "\n${NC}Active Tasks (.jules/active):"
if [ -d ".jules/active" ]; then
    ls .jules/active/*.md 2>/dev/null | xargs -n 1 basename | sed 's/.md//' | while read -r task; do
        echo -e " - ${GREEN}$task${NC} (active)"
    done
else
    echo " (No active directory)"
fi

# 3. Archive (Completed)
echo -e "\n${NC}Completed Tasks (.jules/archive):"
if [ -d ".jules/archive" ]; then
    ls .jules/archive/*.md 2>/dev/null | xargs -n 1 basename | sed 's/.md//' | while read -r task; do
        echo -e " - ${NC}$task${NC} (archived)"
    done
else
    echo " (No archive directory)"
fi

echo -e "\n${NC}Use './agent-skills/bash/delegate_task.sh' to fire off pending tasks once their dependencies are in 'archived' state."
