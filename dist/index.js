#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema, ListResourcesRequestSchema, ReadResourceRequestSchema, ErrorCode, McpError, } from "@modelcontextprotocol/sdk/types.js";
import { chromium } from 'playwright';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as os from 'os';
class GoogleJulesMCP {
    constructor() {
        this.browser = null;
        this.page = null;
        this.config = {
            headless: process.env.HEADLESS !== 'false',
            timeout: parseInt(process.env.TIMEOUT || '30000'),
            debug: process.env.DEBUG === 'true',
            dataPath: process.env.JULES_DATA_PATH || path.join(os.homedir(), '.jules-mcp', 'data.json'),
            baseUrl: 'https://jules.google.com'
        };
        this.dataPath = this.config.dataPath;
        this.server = new Server({
            name: 'google-jules-mcp',
            version: '1.0.0',
        }, {
            capabilities: {
                tools: {},
                resources: {},
            },
        });
        this.setupToolHandlers();
        this.setupResourceHandlers();
    }
    setupToolHandlers() {
        this.server.setRequestHandler(ListToolsRequestSchema, async () => {
            return {
                tools: [
                    {
                        name: 'jules_create_task',
                        description: 'Create a new task in Google Jules with repository and description',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                description: {
                                    type: 'string',
                                    description: 'Task description - what you want Jules to do',
                                },
                                repository: {
                                    type: 'string',
                                    description: 'GitHub repository in format owner/repo-name',
                                },
                                branch: {
                                    type: 'string',
                                    description: 'Git branch to work on (optional, defaults to main)',
                                },
                            },
                            required: ['description', 'repository'],
                        },
                    },
                    {
                        name: 'jules_get_task',
                        description: 'Get details of a specific Jules task by ID or URL',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                taskId: {
                                    type: 'string',
                                    description: 'Task ID or full Jules task URL',
                                },
                            },
                            required: ['taskId'],
                        },
                    },
                    {
                        name: 'jules_send_message',
                        description: 'Send a message/instruction to Jules in an active task',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                taskId: {
                                    type: 'string',
                                    description: 'Task ID or URL',
                                },
                                message: {
                                    type: 'string',
                                    description: 'Message to send to Jules',
                                },
                            },
                            required: ['taskId', 'message'],
                        },
                    },
                    {
                        name: 'jules_approve_plan',
                        description: 'Approve Jules execution plan for a task',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                taskId: {
                                    type: 'string',
                                    description: 'Task ID or URL',
                                },
                            },
                            required: ['taskId'],
                        },
                    },
                    {
                        name: 'jules_resume_task',
                        description: 'Resume a paused Jules task',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                taskId: {
                                    type: 'string',
                                    description: 'Task ID or URL',
                                },
                            },
                            required: ['taskId'],
                        },
                    },
                    {
                        name: 'jules_list_tasks',
                        description: 'List all Jules tasks with their status',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                status: {
                                    type: 'string',
                                    enum: ['all', 'active', 'pending', 'completed', 'paused'],
                                    description: 'Filter tasks by status',
                                },
                                limit: {
                                    type: 'number',
                                    description: 'Maximum number of tasks to return (default 10)',
                                },
                            },
                        },
                    },
                    {
                        name: 'jules_analyze_code',
                        description: 'Analyze code changes and diff in a Jules task',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                taskId: {
                                    type: 'string',
                                    description: 'Task ID or URL',
                                },
                                includeSourceCode: {
                                    type: 'boolean',
                                    description: 'Whether to include full source code content',
                                },
                            },
                            required: ['taskId'],
                        },
                    },
                    {
                        name: 'jules_bulk_create_tasks',
                        description: 'Create multiple tasks from a list of descriptions and repositories',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                tasks: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            description: { type: 'string' },
                                            repository: { type: 'string' },
                                            branch: { type: 'string' },
                                        },
                                        required: ['description', 'repository'],
                                    },
                                    description: 'Array of task objects to create',
                                },
                            },
                            required: ['tasks'],
                        },
                    },
                    {
                        name: 'jules_screenshot',
                        description: 'Take a screenshot of current Jules page for debugging',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                taskId: {
                                    type: 'string',
                                    description: 'Optional task ID to navigate to first',
                                },
                                filename: {
                                    type: 'string',
                                    description: 'Optional filename for screenshot',
                                },
                            },
                        },
                    },
                ],
            };
        });
        this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
            const { name, arguments: args } = request.params;
            try {
                switch (name) {
                    case 'jules_create_task':
                        return await this.createTask(args);
                    case 'jules_get_task':
                        return await this.getTask(args);
                    case 'jules_send_message':
                        return await this.sendMessage(args);
                    case 'jules_approve_plan':
                        return await this.approvePlan(args);
                    case 'jules_resume_task':
                        return await this.resumeTask(args);
                    case 'jules_list_tasks':
                        return await this.listTasks(args);
                    case 'jules_analyze_code':
                        return await this.analyzeCode(args);
                    case 'jules_bulk_create_tasks':
                        return await this.bulkCreateTasks(args);
                    case 'jules_screenshot':
                        return await this.takeScreenshot(args);
                    default:
                        throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
                }
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : String(error);
                throw new McpError(ErrorCode.InternalError, `Error in ${name}: ${errorMessage}`);
            }
        });
    }
    setupResourceHandlers() {
        this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
            return {
                resources: [
                    {
                        uri: 'jules://schemas/task',
                        name: 'Task Schema',
                        description: 'Complete task model with all available attributes',
                        mimeType: 'application/json'
                    },
                    {
                        uri: 'jules://current/active-tasks',
                        name: 'Active Tasks',
                        description: 'Live list of active tasks in Jules',
                        mimeType: 'application/json'
                    },
                    {
                        uri: 'jules://templates/common-tasks',
                        name: 'Common Task Templates',
                        description: 'Template examples for common development tasks',
                        mimeType: 'application/json'
                    },
                ]
            };
        });
        this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
            const uri = request.params.uri;
            switch (uri) {
                case 'jules://schemas/task':
                    return {
                        contents: [{
                                uri,
                                mimeType: 'application/json',
                                text: JSON.stringify({
                                    id: 'string',
                                    title: 'string',
                                    description: 'string',
                                    repository: 'string (owner/repo-name)',
                                    branch: 'string',
                                    status: 'pending | in_progress | completed | paused',
                                    createdAt: 'ISO timestamp',
                                    updatedAt: 'ISO timestamp',
                                    url: 'Jules task URL',
                                    chatHistory: 'array of chat messages',
                                    sourceFiles: 'array of modified files'
                                }, null, 2)
                            }]
                    };
                case 'jules://current/active-tasks':
                    const activeTasks = await this.getActiveTasks();
                    return {
                        contents: [{
                                uri,
                                mimeType: 'application/json',
                                text: JSON.stringify(activeTasks, null, 2)
                            }]
                    };
                case 'jules://templates/common-tasks':
                    return {
                        contents: [{
                                uri,
                                mimeType: 'application/json',
                                text: JSON.stringify({
                                    'bug-fix': 'Fix the [specific issue] in [filename]. The problem is [description].',
                                    'feature-add': 'Add [feature name] functionality to [location]. Requirements: [list requirements].',
                                    'refactor': 'Refactor [component/function] to improve [performance/readability/maintainability].',
                                    'test-add': 'Add comprehensive tests for [component/function] covering [test cases].',
                                    'documentation': 'Update documentation for [component] to include [new features/changes].',
                                    'dependency-update': 'Update [dependency name] to version [version] and fix any breaking changes.',
                                    'security-fix': 'Fix security vulnerability in [location]: [description of vulnerability].',
                                    'performance': 'Optimize [component/function] performance by [specific optimization approach].'
                                }, null, 2)
                            }]
                    };
                default:
                    throw new McpError(ErrorCode.InvalidRequest, `Unknown resource: ${uri}`);
            }
        });
    }
    // Browser management
    async getBrowser() {
        if (!this.browser) {
            this.browser = await chromium.launch({
                headless: this.config.headless,
                timeout: this.config.timeout
            });
        }
        return this.browser;
    }
    async getPage() {
        if (!this.page) {
            const browser = await this.getBrowser();
            this.page = await browser.newPage();
            await this.page.setViewportSize({ width: 1200, height: 800 });
        }
        return this.page;
    }
    // Data persistence
    async loadTaskData() {
        try {
            const data = await fs.readFile(this.dataPath, 'utf-8');
            return JSON.parse(data);
        }
        catch (error) {
            if (error.code === 'ENOENT') {
                return { tasks: [] };
            }
            throw error;
        }
    }
    async saveTaskData(data) {
        await fs.mkdir(path.dirname(this.dataPath), { recursive: true });
        await fs.writeFile(this.dataPath, JSON.stringify(data, null, 2));
    }
    // Task ID extraction
    extractTaskId(taskIdOrUrl) {
        if (taskIdOrUrl.includes('jules.google.com/task/')) {
            const match = taskIdOrUrl.match(/\/task\/([^/]+)/);
            return match ? match[1] : taskIdOrUrl;
        }
        return taskIdOrUrl;
    }
    // Tool implementations
    async createTask(args) {
        const { description, repository, branch = 'main' } = args;
        const page = await this.getPage();
        try {
            // Navigate to Jules task creation
            await page.goto(`${this.config.baseUrl}/task`);
            await page.waitForLoadState('networkidle');
            // Click new task button if needed
            const newTaskButton = page.locator('button.mat-mdc-tooltip-trigger svg');
            if (await newTaskButton.isVisible()) {
                await newTaskButton.click();
            }
            // Repository selection
            await page.locator("div.repo-select div.header-container").click();
            await page.locator("div.repo-select input").fill(repository);
            await page.locator("div.repo-select div.opt-list > swebot-option").first().click();
            // Branch selection
            await page.locator("div.branch-select div.header-container > div").click();
            // Try to find specific branch or select first available
            const branchOptions = page.locator("div.branch-select swebot-option");
            const branchCount = await branchOptions.count();
            if (branchCount > 0) {
                await branchOptions.first().click();
            }
            // Task description
            await page.locator("textarea").fill(description);
            await page.keyboard.press('Enter');
            // Submit
            await page.locator("div.chat-container button:nth-of-type(2)").click();
            // Wait for task creation and get URL
            await page.waitForURL('**/task/**');
            const url = page.url();
            const taskId = this.extractTaskId(url);
            // Create task object
            const task = {
                id: taskId,
                title: description.slice(0, 50) + (description.length > 50 ? '...' : ''),
                description,
                repository,
                branch,
                status: 'pending',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                url,
                chatHistory: [],
                sourceFiles: []
            };
            // Save to data
            const data = await this.loadTaskData();
            data.tasks.push(task);
            await this.saveTaskData(data);
            return {
                content: [
                    {
                        type: 'text',
                        text: `Task created successfully!\n\nTask ID: ${taskId}\nRepository: ${repository}\nBranch: ${branch}\nDescription: ${description}\nURL: ${url}\n\nTask is now pending Jules' analysis. You can check progress with jules_get_task.`
                    }
                ]
            };
        }
        catch (error) {
            throw new Error(`Failed to create task: ${error}`);
        }
    }
    async getTask(args) {
        const { taskId } = args;
        const actualTaskId = this.extractTaskId(taskId);
        const page = await this.getPage();
        try {
            // Navigate to task
            const url = taskId.includes('jules.google.com') ? taskId : `${this.config.baseUrl}/task/${actualTaskId}`;
            await page.goto(url);
            await page.waitForLoadState('networkidle');
            // Extract task information
            const taskData = await page.evaluate(() => {
                // Extract chat messages
                const chatMessages = Array.from(document.querySelectorAll('div.chat-content')).map(el => ({
                    content: el.textContent?.trim() || '',
                    timestamp: new Date().toISOString(),
                    type: 'system'
                }));
                // Extract source files
                const sourceFiles = Array.from(document.querySelectorAll('div.source-content a')).map(link => ({
                    filename: link.textContent?.trim() || '',
                    url: link.getAttribute('href') || '',
                    status: 'modified'
                }));
                // Extract task status
                const statusEl = document.querySelector('.task-status, [data-status], .status');
                const status = statusEl?.textContent?.toLowerCase() || 'unknown';
                return {
                    chatMessages,
                    sourceFiles,
                    status
                };
            });
            // Update local data
            const data = await this.loadTaskData();
            let task = data.tasks.find(t => t.id === actualTaskId);
            if (task) {
                task.chatHistory = taskData.chatMessages;
                task.sourceFiles = taskData.sourceFiles;
                task.updatedAt = new Date().toISOString();
                await this.saveTaskData(data);
            }
            return {
                content: [
                    {
                        type: 'text',
                        text: `Task Details (${actualTaskId}):\n\n` +
                            `Status: ${taskData.status}\n` +
                            `URL: ${url}\n` +
                            `Source Files (${taskData.sourceFiles.length}):\n` +
                            taskData.sourceFiles.map(f => `  - ${f.filename}`).join('\n') +
                            `\n\nRecent Chat Messages (${taskData.chatMessages.length}):\n` +
                            taskData.chatMessages.slice(-3).map(m => `  - ${m.content.slice(0, 100)}...`).join('\n')
                    }
                ]
            };
        }
        catch (error) {
            throw new Error(`Failed to get task: ${error}`);
        }
    }
    async sendMessage(args) {
        const { taskId, message } = args;
        const actualTaskId = this.extractTaskId(taskId);
        const page = await this.getPage();
        try {
            const url = taskId.includes('jules.google.com') ? taskId : `${this.config.baseUrl}/task/${actualTaskId}`;
            await page.goto(url);
            await page.waitForLoadState('networkidle');
            // Send message
            await page.locator("div.bottom-bar-container textarea").fill(message);
            await page.keyboard.press('Enter');
            // Wait for response (brief)
            await page.waitForTimeout(2000);
            return {
                content: [
                    {
                        type: 'text',
                        text: `Message sent to Jules task ${actualTaskId}: "${message}"\n\nJules is processing your request. Check back with jules_get_task to see the response.`
                    }
                ]
            };
        }
        catch (error) {
            throw new Error(`Failed to send message: ${error}`);
        }
    }
    async approvePlan(args) {
        const { taskId } = args;
        const actualTaskId = this.extractTaskId(taskId);
        const page = await this.getPage();
        try {
            const url = taskId.includes('jules.google.com') ? taskId : `${this.config.baseUrl}/task/${actualTaskId}`;
            await page.goto(url);
            await page.waitForLoadState('networkidle');
            // Look for approval button
            const approveButton = page.locator("div.approve-plan-container > button");
            if (await approveButton.isVisible()) {
                await approveButton.click();
                return {
                    content: [
                        {
                            type: 'text',
                            text: `Plan approved for task ${actualTaskId}. Jules will now execute the planned changes.`
                        }
                    ]
                };
            }
            else {
                return {
                    content: [
                        {
                            type: 'text',
                            text: `No plan approval needed for task ${actualTaskId}. The task may already be approved or not ready for approval yet.`
                        }
                    ]
                };
            }
        }
        catch (error) {
            throw new Error(`Failed to approve plan: ${error}`);
        }
    }
    async resumeTask(args) {
        const { taskId } = args;
        const actualTaskId = this.extractTaskId(taskId);
        const page = await this.getPage();
        try {
            const url = taskId.includes('jules.google.com') ? taskId : `${this.config.baseUrl}/task/${actualTaskId}`;
            await page.goto(url);
            await page.waitForLoadState('networkidle');
            // Look for resume button
            const resumeButton = page.locator("div.resume-button-container svg");
            if (await resumeButton.isVisible()) {
                await resumeButton.click();
                return {
                    content: [
                        {
                            type: 'text',
                            text: `Task ${actualTaskId} resumed successfully. Jules will continue working on this task.`
                        }
                    ]
                };
            }
            else {
                return {
                    content: [
                        {
                            type: 'text',
                            text: `Task ${actualTaskId} doesn't appear to be paused or may already be active.`
                        }
                    ]
                };
            }
        }
        catch (error) {
            throw new Error(`Failed to resume task: ${error}`);
        }
    }
    async listTasks(args) {
        const { status = 'all', limit = 10 } = args;
        const data = await this.loadTaskData();
        let filteredTasks = data.tasks;
        if (status !== 'all') {
            filteredTasks = data.tasks.filter(task => task.status === status);
        }
        const tasks = filteredTasks.slice(0, limit);
        const taskList = tasks.map(task => `${task.id} - ${task.title}\n` +
            `  Repository: ${task.repository}\n` +
            `  Status: ${task.status}\n` +
            `  Created: ${new Date(task.createdAt).toLocaleDateString()}\n` +
            `  URL: ${task.url}\n`).join('\n');
        return {
            content: [
                {
                    type: 'text',
                    text: `Jules Tasks (${tasks.length} of ${filteredTasks.length} total):\n\n${taskList || 'No tasks found.'}`
                }
            ]
        };
    }
    async analyzeCode(args) {
        const { taskId, includeSourceCode = false } = args;
        const actualTaskId = this.extractTaskId(taskId);
        const page = await this.getPage();
        try {
            const url = taskId.includes('jules.google.com') ? taskId : `${this.config.baseUrl}/task/${actualTaskId}`;
            await page.goto(url);
            await page.waitForLoadState('networkidle');
            // Extract code analysis information
            const codeData = await page.evaluate((includeSource) => {
                const sourceFiles = Array.from(document.querySelectorAll('div.source-content a')).map(link => ({
                    filename: link.textContent?.trim() || '',
                    url: link.getAttribute('href') || ''
                }));
                const codeChanges = Array.from(document.querySelectorAll('swebot-code-diff-update-card')).map(card => ({
                    type: 'code-change',
                    content: card.textContent?.trim() || ''
                }));
                return {
                    sourceFiles,
                    codeChanges,
                    totalFiles: sourceFiles.length,
                    totalChanges: codeChanges.length
                };
            }, includeSourceCode);
            const analysis = `Code Analysis for Task ${actualTaskId}:\n\n` +
                `Total Files: ${codeData.totalFiles}\n` +
                `Total Changes: ${codeData.totalChanges}\n\n` +
                `Modified Files:\n${codeData.sourceFiles.map(f => `  - ${f.filename}`).join('\n')}\n\n` +
                `Code Changes Summary:\n${codeData.codeChanges.map(c => `  - ${c.content.slice(0, 100)}...`).join('\n')}`;
            return {
                content: [
                    {
                        type: 'text',
                        text: analysis
                    }
                ]
            };
        }
        catch (error) {
            throw new Error(`Failed to analyze code: ${error}`);
        }
    }
    async bulkCreateTasks(args) {
        const { tasks } = args;
        const results = [];
        for (const taskData of tasks) {
            try {
                const result = await this.createTask(taskData);
                results.push(`✓ ${taskData.repository}: ${taskData.description.slice(0, 50)}...`);
            }
            catch (error) {
                results.push(`✗ ${taskData.repository}: Failed - ${error}`);
            }
        }
        return {
            content: [
                {
                    type: 'text',
                    text: `Bulk Task Creation Results (${tasks.length} tasks):\n\n${results.join('\n')}`
                }
            ]
        };
    }
    async takeScreenshot(args) {
        const { taskId, filename } = args;
        const page = await this.getPage();
        try {
            if (taskId) {
                const actualTaskId = this.extractTaskId(taskId);
                const url = taskId.includes('jules.google.com') ? taskId : `${this.config.baseUrl}/task/${actualTaskId}`;
                await page.goto(url);
                await page.waitForLoadState('networkidle');
            }
            const screenshotPath = filename || `jules-screenshot-${Date.now()}.png`;
            await page.screenshot({ path: screenshotPath, fullPage: true });
            return {
                content: [
                    {
                        type: 'text',
                        text: `Screenshot saved to: ${screenshotPath}`
                    }
                ]
            };
        }
        catch (error) {
            throw new Error(`Failed to take screenshot: ${error}`);
        }
    }
    async getActiveTasks() {
        const data = await this.loadTaskData();
        return data.tasks.filter(task => task.status === 'in_progress' || task.status === 'pending');
    }
    async cleanup() {
        if (this.page) {
            await this.page.close();
        }
        if (this.browser) {
            await this.browser.close();
        }
    }
    async run() {
        const transport = new StdioServerTransport();
        await this.server.connect(transport);
        console.error("Google Jules MCP Server running on stdio");
        console.error("Configuration:", {
            headless: this.config.headless,
            timeout: this.config.timeout,
            debug: this.config.debug,
            dataPath: this.config.dataPath
        });
    }
}
// Handle process cleanup
process.on('SIGINT', async () => {
    console.error('Shutting down Jules MCP Server...');
    process.exit(0);
});
process.on('SIGTERM', async () => {
    console.error('Shutting down Jules MCP Server...');
    process.exit(0);
});
// Start the server
const server = new GoogleJulesMCP();
server.run().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map