# dependency_status.ps1
# Visualizes the status of Jules tasks across the backlog, active, and archive directories.

$Dir = Split-Path $MyInvocation.MyCommand.Path
. "$Dir\common.ps1"

Write-Host "=== JCLAW Dependency Status ===" -ForegroundColor Yellow

# 1. Backlog (Pending)
Write-Host "`nPending Tasks (.jules/backlog):"
if (Test-Path ".jules/backlog") {
    Get-ChildItem ".jules/backlog/*.md" | ForEach-Object {
        $Task = $_.BaseName
        Write-Host " - $Task" -ForegroundColor Cyan
    }
} else {
    Write-Host " (No backlog directory)"
}

# 2. Active (In Progress)
Write-Host "`nActive Tasks (.jules/active):"
if (Test-Path ".jules/active") {
    Get-ChildItem ".jules/active/*.md" | ForEach-Object {
        $Task = $_.BaseName
        Write-Host " - $Task" -ForegroundColor Green
    }
} else {
    Write-Host " (No active directory)"
}

# 3. Archive (Completed)
Write-Host "`nCompleted Tasks (.jules/archive):"
if (Test-Path ".jules/archive") {
    Get-ChildItem ".jules/archive/*.md" | ForEach-Object {
        $Task = $_.BaseName
        Write-Host " - $Task"
    }
} else {
    Write-Host " (No archive directory)"
}

Write-Host "`nUse '.\agent-skills\pwsh\delegate_task.ps1' to fire off pending tasks once their dependencies are in 'archived' state."
