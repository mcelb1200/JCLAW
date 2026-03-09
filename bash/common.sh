#!/bin/bash
# common.sh

if [ -f .env.jclaw ]; then
    source .env.jclaw
fi

if [ -z "$JULES_API_KEY" ]; then
    echo "Error: JULES_API_KEY not found. Please run setup.sh first."
    exit 1
fi

API_BASE="https://jules.googleapis.com/v1alpha/sessions"

# Internal helper to handle API calls with status code checking
api_call() {
    local method=$1
    local endpoint=$2
    local body=$3
    local response_file=$(mktemp)
    local status_code

    if [ "$method" = "GET" ]; then
        status_code=$(curl -s -w "%{http_code}" -o "$response_file" -X GET "$API_BASE$endpoint" \
            -H "x-goog-api-key: $JULES_API_KEY" \
            -H "Content-Type: application/json")
    else
        status_code=$(curl -s -w "%{http_code}" -o "$response_file" -X "$method" "$API_BASE$endpoint" \
            -H "x-goog-api-key: $JULES_API_KEY" \
            -H "Content-Type: application/json" \
            -d "$body")
    fi

    local response=$(cat "$response_file")
    rm "$response_file"

    if [[ "$status_code" -ne 200 ]]; then
        echo -e "\033[0;31mError: API call failed with status $status_code\033[0m" >&2
        echo "$response" | jq '.' >&2
        return 1
    fi

    echo "$response"
}

# Standardized ID extraction from a session object or ID string
extract_id() {
    local input="$1"
    echo "$input" | jq -r '.id // .name // . | split("/") | last'
}

# Dynamically identify project context (DNA)
identify_project_dna() {
    local dna=""
    
    # 1. PlatformIO / C++
    if [ -f "platformio.ini" ]; then
        local cpp_std=$(grep -A 10 "build_flags" platformio.ini | grep "std=" | head -n 1 | cut -d'=' -f2 | sed 's/gnu++//' | sed 's/c++//')
        dna="- **Language**: C++${cpp_std:-17}\n- **Build System**: PlatformIO\n- **Test Framework**: Google Test (GTest)\n"
    # 2. Rust
    elif [ -f "Cargo.toml" ]; then
        dna="- **Language**: Rust\n- **Build System**: Cargo\n"
    # 3. Node.js / TS
    elif [ -f "package.json" ]; then
        dna="- **Language**: TypeScript/JavaScript\n- **Build System**: npm/yarn\n"
    # 4. Python
    elif [ -f "pyproject.toml" ] || [ -f "requirements.txt" ]; then
        dna="- **Language**: Python\n"
    fi

    # 5. Architecture specific (Project DNA file if exists)
    if [ -f "DNA.md" ]; then
        dna="$dna$(cat DNA.md)\n"
    fi

    echo -e "$dna"
}

# Push a file to a GitHub repository using the API (headless)
gh_api_push_file() {
    local repo="$1"
    local branch="$2"
    local local_path="$3"
    local remote_path="$4"
    local message="$5"

    if [ ! -f "$local_path" ]; then
        echo -e "\033[0;31mError: Local file $local_path not found.\033[0m" >&2
        return 1
    fi

    local content_b64=$(base64 -w 0 "$local_path")
    # Get current file SHA if it exists for update
    local current_sha=$(gh api "repos/$repo/contents/$remote_path?ref=$branch" --jq '.sha' 2>/dev/null)

    if [ -n "$current_sha" ] && [ "$current_sha" != "null" ]; then
        gh api --method PUT "repos/$repo/contents/$remote_path" \
            -f message="$message" \
            -f content="$content_b64" \
            -f branch="$branch" \
            -f sha="$current_sha" >/dev/null
    else
        gh api --method PUT "repos/$repo/contents/$remote_path" \
            -f message="$message" \
            -f content="$content_b64" \
            -f branch="$branch" >/dev/null
    fi
}

# Color helpers
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color
