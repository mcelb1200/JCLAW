# Resolve Conflicts (`resolve_conflicts.sh` / `resolve_conflicts.ps1`)

**Usage:**
```bash
./resolve_conflicts.sh [sourceBranch] [targetBranch (default: main)]
```

**Description:**
Automated Merge Conflict Resolution Engine for JCLAW. It attempts to merge a feature branch into a target branch (like `main`) and, if conflicts are detected, scaffolds a new Jules task dedicated specifically to resolving those conflicts.

**Behavior:**
1. Checks out the target branch and pulls latest changes.
2. Attempts a merge of the source branch.
3. If conflicts exist:
   - Identifies the unmerged files.
   - Generates a new markdown instruction file in `.jules/active/resolve-conflicts-[sourceBranch].md`.
   - Populates the instruction file with the scoped files and explicit directives to resolve the conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`).
   - Aborts the local merge to return the workspace to a clean state.
4. If no conflicts exist:
   - Reports success and aborts the merge (leaving the workspace unchanged).

**Workflow:**
- Run `resolve_conflicts.sh feature-x`.
- If conflicts are reported, run `./agent-skills/bash/delegate_task.sh [repo] main resolve-conflicts-feature-x`.
- Jules will then autonomously resolve the conflicts and push the fix to the branch.
