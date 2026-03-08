param(
    [Parameter(Mandatory=$true)][string]$SourceBranch,
    [string]$TargetBranch="main"
)

$Dir = Split-Path $MyInvocation.MyCommand.Path
. "$Dir\common.ps1"

Write-Host "=== JCLAW Conflict Resolution Engine ===" -ForegroundColor Yellow
Write-Host "Source: $SourceBranch"
Write-Host "Target: $TargetBranch"

# 1. Ensure we are up to date
git checkout $TargetBranch
if ($LASTEXITCODE -ne 0) { exit 1 }
git pull origin $TargetBranch

# 2. Attempt merge
Write-Host "Attempting to merge $SourceBranch into $TargetBranch..."
$MergeResult = git merge $SourceBranch --no-commit --no-ff 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ No conflicts detected. Merge successful (uncommitted)." -ForegroundColor Green
    git merge --abort
    exit 0
}

# 3. Handle Conflicts
$StatusOut = git status --porcelain
$Unmerged = $StatusOut | Where-Object { $_ -match "^UU " } | ForEach-Object { $_.Substring(3).Trim() }

if (-not $Unmerged) {
    Write-Host "✗ Merge failed for unknown reasons. No UU files found." -ForegroundColor Red
    git merge --abort
    exit 1
}

Write-Host "⚠ Conflicts detected in:" -ForegroundColor Red
$Unmerged | Write-Host

# 4. Scaffolding Resolution Task
$TaskName = "resolve-conflicts-$($SourceBranch -replace '[/\\]', '-')"
if (-not (Test-Path ".jules/active")) { New-Item -ItemType Directory -Path ".jules/active" | Out-Null }
$ReportFile = ".jules/active/$TaskName.md"

$ScopedFiles = $Unmerged -join ","

$Content = @"
## Task: $TaskName
**BASE_COMMIT:** $TargetBranch
**SCOPED_FILES:** $ScopedFiles

### Objective
Resolve merge conflicts between \`$SourceBranch\` and \`$TargetBranch\`.
The following files contain standard git conflict markers (<<<<<<<, =======, >>>>>>>).

Please inspect these files, resolve the conflicts logically ensuring the intent of both branches is preserved, remove the markers, and commit the resolution.

### Files to Fix:
$(($Unmerged | ForEach-Object { "- $_" }) -join "`n")
"@

$Content | Out-File -FilePath $ReportFile -Encoding utf8

Write-Host "✓ Created conflict resolution task: $ReportFile" -ForegroundColor Green
Write-Host "Aborting local merge to clean index..."
git merge --abort

Write-Host "`nDelegation command:"
Write-Host ".\agent-skills\pwsh\delegate_task.ps1 -Repository [repository] -Branch $TargetBranch -TaskId $TaskName" -ForegroundColor Yellow
