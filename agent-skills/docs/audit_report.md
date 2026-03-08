# Audit Report (`audit_report.sh` / `audit_report.ps1`)

**Usage:**
```bash
./audit_report.sh [taskId]
```

**Description:**
Generates a formal markdown audit report for a given Jules session. It lists activities, code outcomes, initial prompts, and the final state.

**Behavior:**
- **CI/Artifact Retrieval**: If the GitHub CLI (`gh`) is installed and the session includes a branch name, the script automatically retrieves the latest GitHub Actions CI run summary for that branch. If a run failed, it embeds the last 20 lines of the failed logs directly into the report for immediate analysis.
- Fetches session details and activity history.
- Processes the history into a timestamped table of events.
- Extracts the final code artifact or patch and review text.
- Outputs the generated markdown text and optionally saves it to `.jules/audit/{taskId}.jclaw.md`.

**Requires:**
- `JULES_API_KEY` (configured via `setup.sh`)
- `gh` CLI (optional, for CI telemetry)