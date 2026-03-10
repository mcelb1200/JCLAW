#!/bin/bash
# batch_delegate.sh
# Orchestrator for managing concurrent and consecutive Jules tasks from the backlog.

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
source "$DIR/common.sh"

REPOSITORY=$1
CONCURRENCY=${2:-1} # Default to sequential (1 at a time)

if [ -z "$REPOSITORY" ]; then
    echo "Usage: $0 [repository] [concurrency (optional, default: 1)]"
    echo "Example: $0 google/jules 3"
    exit 1
fi

BACKLOG_DIR=".jules/backlog"
ACTIVE_DIR=".jules/active"
SCOPE_LOCK_SCRIPT="./.scripts/jules/jules-scope-lock.sh"

if [ ! -d "$BACKLOG_DIR" ]; then
    log "error" "Backlog directory '$BACKLOG_DIR' not found."
    exit 1
fi

TASKS=$(ls "$BACKLOG_DIR"/*.md 2>/dev/null)
if [ -z "$TASKS" ]; then
    log "info" "Backlog is empty. Nothing to delegate."
    exit 0
fi

echo -e "${YELLOW}=== JCLAW Backlog Orchestrator ===${NC}"
log "info" "Repository: $REPOSITORY"
log "info" "Concurrency Limit: $CONCURRENCY"

# Function to delegate a single task
delegate_task() {
    local task_file=$1
    local task_id=$(basename "$task_file" .md)
    local branch="jules-$task_id"

    # Export functions for subshell visibility
    source "$DIR/common.sh"

    log "info" "--- Processing Task: $task_id ---"

    # 1. Semantic Validation
    PROMPT=$(cat "$task_file")
    
    # Move to active for validation (compliance with AI_OPERATIONS)
    mkdir -p "$ACTIVE_DIR"
    cp "$task_file" "$ACTIVE_DIR/$task_id.md"
    
    "$DIR/validate_config.sh" "$REPOSITORY" "$branch" "$PROMPT" "$ACTIVE_DIR/$task_id.md"
    if [ $? -ne 0 ]; then
        log "error" "Validation failed for $task_id. Skipping."
        rm "$ACTIVE_DIR/$task_id.md"
        return 1
    fi

    # 2. Deconflicting Logic: Scope Lock (AI_OPERATIONS Section 9.1)
    if [ -f "$SCOPE_LOCK_SCRIPT" ]; then
        log "info" "Acquiring Scope Lock for $task_id..."
        SCOPED_FILES=$(grep "SCOPED_FILES" "$task_file" | cut -d':' -f2 | xargs)
        if [ -z "$SCOPED_FILES" ]; then
            log "error" "No SCOPED_FILES declared in $task_id. Compliance requires explicit scoping."
            rm "$ACTIVE_DIR/$task_id.md"
            return 1
        fi
        
        bash "$SCOPE_LOCK_SCRIPT" acquire "$task_id" "jclaw-batch" "$SCOPED_FILES"
        if [ $? -ne 0 ]; then
            log "error" "Scope lock conflict for $task_id. Aborting delegation for this task."
            rm "$ACTIVE_DIR/$task_id.md"
            return 1
        fi
    else
        log "warn" "Scope lock script not found. Proceeding without project-specific locking."
    fi

    # 3. Record Baseline
    git log origin/main --format="%H %s" -n 1 > "$ACTIVE_DIR/$task_id.baseline"

    # 4. Create local branch first (AI_OPERATIONS requirement)
    log "info" "Creating local branch $branch..."
    git checkout -b "$branch" main --quiet || { log "error" "Failed to create branch $branch"; return 1; }

    # 5. Delegate
    log "info" "Initiating API delegation..."
    "$DIR/delegate_task.sh" "$REPOSITORY" "$branch" "$task_id" "" "true"
    
    RET=$?
    
    # Return to main
    git checkout main --quiet

    if [ $RET -eq 0 ]; then
        log "info" "✓ Successfully delegated $task_id."
        rm "$task_file" # Remove from backlog
    else
        log "error" "✗ Delegation failed for $task_id."
        # Release lock if we acquired it
        if [ -f "$SCOPE_LOCK_SCRIPT" ]; then
            bash "$SCOPE_LOCK_SCRIPT" release "$task_id"
        fi
        rm "$ACTIVE_DIR/$task_id.md" "$ACTIVE_DIR/$task_id.baseline"
        return 1
    fi
}

# Orchestration Loop
CURRENT_JOBS=0
for task in $TASKS; do
    delegate_task "$task" &
    ((CURRENT_JOBS++))

    if [ "$CURRENT_JOBS" -ge "$CONCURRENCY" ]; then
        wait -n # Wait for at least one background job to finish
        ((CURRENT_JOBS--))
    fi
done

wait
log "info" "Batch delegation complete."
