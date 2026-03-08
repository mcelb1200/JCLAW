# Dependency Status (`dependency_status.sh` / `dependency_status.ps1`)

**Usage:**
```bash
./dependency_status.sh
```

**Description:**
Scans the local filesystem to visualize the status of Jules tasks across the backlog, active, and archive directories. It identifies which tasks are currently "archived" (and thus ready to be used as dependencies) and which are still in "active" or "backlog" status.

**Behavior:**
- Iterates through `.jules/backlog/`, `.jules/active/`, and `.jules/archive/`.
- Prints a color-coded summary of each task's location.
- Helps the "Brain" agent determine when it is safe to delegate dependent tasks using `delegate_task.sh`.
