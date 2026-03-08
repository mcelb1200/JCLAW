param(
    [Parameter(Mandatory=$true)][string]$TaskId,
    [Parameter(Mandatory=$true)][string]$Branch,
    [Parameter(Mandatory=$true)][string]$FixCommand,
    [Parameter(Mandatory=$true)][string]$LintCommand
)

$Dir = Split-Path $MyInvocation.MyCommand.Path
. "$Dir\common.ps1"

Write-Host "=== Automated Code Review ===" -ForegroundColor Cyan

# Get current branch
$CurrentBranch = (git rev-parse --abbrev-ref HEAD).Trim()
$StashNeeded = $false

$DiffExitCode = (git diff-index --quiet HEAD --; $LASTEXITCODE)
if ($DiffExitCode -ne 0) {
    Write-Host "ℹ Stashing local changes..." -ForegroundColor Yellow
    git stash push -m "auto_review_stash_$TaskId" | Out-Null
    $StashNeeded = $true
}

Write-Host "ℹ Fetching remote branch: $Branch" -ForegroundColor Cyan
git fetch origin $Branch | Out-Null

git checkout $Branch | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Failed to checkout branch $Branch. Does it exist locally or on origin?" -ForegroundColor Red
    if ($StashNeeded) { git stash pop | Out-Null }
    exit 1
}

Write-Host "ℹ Pulling latest changes from origin..." -ForegroundColor Cyan
git pull origin $Branch | Out-Null

Write-Host "ℹ Running fix command: $FixCommand" -ForegroundColor Cyan
Invoke-Expression $FixCommand | Out-Null

Write-Host "ℹ Running lint command: $LintCommand" -ForegroundColor Cyan
$LintOutput = ""
try {
    $LintOutput = Invoke-Expression $LintCommand 2>&1 | Out-String
    $LintExitCode = $LASTEXITCODE
} catch {
    $LintOutput = $_.Exception.Message
    $LintExitCode = 1
}

if ($LintExitCode -ne 0) {
    Write-Host "✗ Code quality issues found. Preparing feedback for Jules session..." -ForegroundColor Yellow

    # Truncate output to avoid massive payloads (max 10000 chars)
    $TruncatedOutput = if ($LintOutput.Length -gt 10000) { $LintOutput.Substring(0, 10000) } else { $LintOutput }

    $Feedback = "Automated Code Review Failed. Please address the following programmatic errors identified by the CI/Linter on branch \`$Branch\`:`n`n\`\`\``n$TruncatedOutput`n\`\`\``n`nPlease fix these issues and update the plan or commit the fixes."

    $BodyObj = @{ prompt = $Feedback }
    $Body = $BodyObj | ConvertTo-Json -Depth 5 -Compress

    Write-Host "ℹ Sending feedback to session $TaskId..." -ForegroundColor Cyan
    $Response = Invoke-ApiCall -Method "POST" -Endpoint "/$TaskId:sendMessage" -Body $Body

    if ($Response -and -not $Response.error) {
        Write-Host "✓ Feedback sent successfully to task $TaskId." -ForegroundColor Green
    } else {
        Write-Host "✗ Failed to send feedback to Jules." -ForegroundColor Red
        if ($Response) { $Response | ConvertTo-Json -Depth 5 | Write-Host }
    }
} else {
    Write-Host "✓ Code passed automated review." -ForegroundColor Green
}

Write-Host "ℹ Restoring original branch: $CurrentBranch" -ForegroundColor Cyan
git checkout $CurrentBranch | Out-Null

if ($StashNeeded) {
    Write-Host "ℹ Popping stashed changes..." -ForegroundColor Yellow
    git stash pop | Out-Null
}

Write-Host "=== Auto Review Complete ===" -ForegroundColor Cyan
