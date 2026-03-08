# Auto Review (`auto_review.sh` / `auto_review.ps1`)

**Usage:**
```bash
./auto_review.sh [taskId] [branch] [fixCommand] [lintCommand]
```

**Description:**
Programmatically identifies code quality issues on a branch published by a Jules session, applies safe auto-fixes, and returns instructions to the session to address any remaining issues. This eliminates the need for the local LLM host to review mechanical syntax/lint errors.

**Behavior:**
- Stashes any current local changes.
- Fetches and checks out the target `branch` published by Jules.
- Runs the `fixCommand` (e.g., `npm run format`, `npm run lint:fix`) to automatically correct safe issues.
- Runs the `lintCommand` (e.g., `npm run lint`, `npm test`) to detect remaining errors.
- If the `lintCommand` fails (non-zero exit code), it captures the output and sends it directly to the Jules session via the `sendMessage` API as a request to fix the broken code.
- Switches back to the original branch and restores the git stash.

**Requires:**
- Local Git repository configured and tracking the remote branch.
- `JULES_API_KEY` (configured via `setup.sh`)