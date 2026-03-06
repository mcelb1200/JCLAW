# 🤖 AI Agent Setup Guide: Google Jules MCP

This guide is designed for an AI agent (like Antigravity, Claude, or Cursor) to quickly install, configure, and utilize this MCP server in a new environment.

## 🚀 Fast-Track Installation (CLI)

Run these commands to clone, build, and prepare the server:

```bash
# 1. Clone the repository
git clone https://github.com/mcelb1200/google-jules-mcp.git
cd google-jules-mcp

# 2. Install dependencies
npm install

# 3. Build the project
npm run build

# 4. Verify local Jules CLI (Optional but Recommended)
jules --version
```

## ⚙️ Configuration (Environment Variables)

This server uses a **Tiered Interaction Model**. It prefers the CLI and REST API over browser automation. To enable this, configure the following:

| Variable | Required | Description |
|----------|----------|-------------|
| `JULES_API_KEY` | **Highly Recommended** | Your Jules Personal Access Token (PAT). Enables 10x faster task ops via REST API. |
| `JULES_CLI_PATH` | Optional | Path to the `jules` binary. Defaults to `jules` in PATH. |
| `SESSION_MODE` | Optional | Use `cookies` or `browserbase` for browser fallbacks. |
| `GOOGLE_AUTH_COOKIES`| Optional | Required for browser-based fallbacks if API/CLI fail. |

## 🛠️ Adding to MCP Config

Add this entry to your `mcpConfig` (e.g., `claude_desktop_config.json` or `.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "google-jules-mcp": {
      "command": "node",
      "args": ["/absolute/path/to/google-jules-mcp/dist/index.js"],
      "env": {
        "JULES_API_KEY": "your_api_key_here",
        "JULES_CLI_PATH": "jules",
        "SESSION_MODE": "cookies",
        "GOOGLE_AUTH_COOKIES": "..."
      }
    }
  }
}
```

## 🧠 Core Agent Workflow: "Delegation"

The most efficient way for an agent to use this server is via **Code Delegation**:

1. **Mark the Code**: Add comments like `// @jules: refactor this method to use async/await`.
2. **Commit**: `git add . && git commit -m "delegate refactor to jules"`
3. **Trigger**: Use the `jules_delegate_task` tool.
   - It will automatically **detect** your repo and branch.
   - It will **push** your changes to origin.
   - It will **initiate** a Jules task using the REST API to scan and resolve the `@jules` markers.

## 🔍 Monitoring & Salvaging

- **`jules_check_feedback`**: Run this periodically to see if Jules is blocked in `AWAITING_USER_FEEDBACK`. It retrieves the exact question from Jules.
- **`jules_analyze_code`**: Use `returnPatch: true` to salvage a unified Git patch from any session (even failed ones).
- **`jules_list_tasks`**: Filters by the current repository automatically across all branches.

## ⚠️ Important Note
- Ensure `jules` is authenticated on the host machine (`jules login`) if using CLI mode.
- REST API is the most reliable tier for initiating complex prompts.
