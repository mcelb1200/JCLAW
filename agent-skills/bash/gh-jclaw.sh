#!/bin/bash
# gh-jclaw.sh
# Prototype for the GitHub CLI extension 'gh-jclaw'

SKILLS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
source "$SKILLS_DIR/common.sh"

COMMAND=$1
shift

case "$COMMAND" in
    "sync")
        bash "$SKILLS_DIR/sync_gh_sessions.sh" "$@"
        ;;
    "delegate")
        bash "$SKILLS_DIR/delegate_task.sh" "$@"
        ;;
    "status")
        bash "$SKILLS_DIR/list_tasks.sh" "$@"
        ;;
    "audit")
        bash "$SKILLS_DIR/audit_report.sh" "$@"
        ;;
    "dependency")
        bash "$SKILLS_DIR/dependency_status.sh" "$@"
        ;;
    "resolve")
        bash "$SKILLS_DIR/resolve_conflicts.sh" "$@"
        ;;
    "help"|*)
        echo "JCLAW GitHub CLI Extension (Prototype)"
        echo ""
        echo "Usage: gh jclaw <command> [args]"
        echo ""
        echo "Commands:"
        echo "  sync       - Sync session state from GitHub PR metadata to local .jules/ tiers."
        echo "  delegate   - Delegate a task to Jules and link it to the active PR."
        echo "  status     - List active/pending tasks."
        echo "  audit      - Generate an audit report with integrated CI telemetry."
        echo "  dependency - Visualize task dependencies across local tiers."
        echo "  resolve    - Scaffold a conflict resolution task for a feature branch."
        echo ""
        ;;
esac
