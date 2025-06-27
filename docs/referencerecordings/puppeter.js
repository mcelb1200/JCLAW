const puppeteer = require('puppeteer'); // v23.0.0 or later

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    {
        const targetPage = page;
        await targetPage.setViewport({
            width: 936,
            height: 962
        })
    }
    {
        const targetPage = page;
        await targetPage.goto('https://jules.google.com/task');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Meta');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('r');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Meta');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Alt');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Alt');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(TASK : ADD GAME AND IMPROVE DESING the contrast of the top valiera is jd and text acannot be redadedn sub │ads likesumar y restas or other topics are so ugly. and allow like │ │ scrolllign between cars if many and add agame secitonwith two easy gmes u │ │ import form some cdn. dont fuckign hardcode them and can onl y play vchanging the coins \\( see the best way so they have incentive and chosoe games that its time is quick and easy to play and are nice even without memory like jumping or I dunno but simple. donf fuc k the logic ULTRA-AUTONOMY & LOOP LOGIC Begin audit/fix/enrich loop across 100% of the repo For every detected gap/bug/unfinished element, fix, complete, and enrich as described After each pass, simulate user sessions and checklists again If anything new is found or created, restart from step 1 Never exit until every essential feature, workflow, and content is perfect for user success and usability If stuck, regenerate ideas or seek more examples until block is resolved INSTRUCTIONS FOR AGENT Work completely autonomously, in extremely long, multi-pass loops—never stop after a single fix, file, or review Ignore all concerns unrelated to user-facing completeness \\(security, optimization, error handling, style, etc.\\) Focus only on what delivers a fully complete and working experience for real users If unsure, add clarity/content, but never add bloat or unnecessary detail Log every fix, loop, and finding in AGENT_LOG.md Only stop if ALL essential items are completed, and logs/reports are written OUTPUT FILES \\(PLUS REPO FIXES\\) AGENTS.md \\(this ultra-persistent workflow\\) AUDIT.md \\(audit of all gaps/issues and their status, constantly updated\\) FINAL_REPORT.md \\(summary of all completions and enrichment\\) AGENT_LOG.md \\(step-by-step, loop-by-loop log of all actions and fixes\\)) >>>> ::-p-aria([role=\\"generic\\"])'),
            targetPage.locator('div.source-content > a:nth-of-type(1) > span'),
            targetPage.locator('::-p-xpath(//*[@id=\\"start-panel\\"]/swebot-start-panel/div[3]/div[1]/div[2]/a[1]/span)'),
            targetPage.locator(':scope >>> div.source-content > a:nth-of-type(1) > span')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 125,
                y: 3.453125,
              },
            });
    }
    {
        const targetPage = page;
        await targetPage.goto('https://jules.google.com/task');
    }
    {
        const targetPage = page;
        await targetPage.goto('https://jules.google.com/task/9103172019911831130/code/AGENTS.md');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(View branch)'),
            targetPage.locator('div.chat-content a'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-view/div/div[3]/div[2]/swebot-chat/div[1]/div/swebot-submission-card/div/div[3]/div[2]/a)'),
            targetPage.locator(':scope >>> div.chat-content a'),
            targetPage.locator('::-p-text(View branch)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 79.4375,
                y: 21.8046875,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div.source-content > a:nth-of-type(2)'),
            targetPage.locator('::-p-xpath(//*[@id=\\"start-panel\\"]/swebot-start-panel/div[3]/div[1]/div[2]/a[2])'),
            targetPage.locator(':scope >>> div.source-content > a:nth-of-type(2)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 118,
                y: 2.90625,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('swebot-code-diff-update-card.ng-tns-c2680037464-57 > div'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-view/div/div[3]/div[2]/swebot-chat/div[1]/div/swebot-code-diff-update-card[7]/div)'),
            targetPage.locator(':scope >>> swebot-code-diff-update-card.ng-tns-c2680037464-57 > div')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 343,
                y: 14.3125,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('swebot-code-panel button:nth-of-type(1) svg'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-view/div/div[3]/div[3]/div[2]/swebot-code-panel/div[2]/div[3]/button[1]/mat-icon/svg)'),
            targetPage.locator(':scope >>> swebot-code-panel button:nth-of-type(1) svg')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 14,
                y: 4,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div.file-tabs > button:nth-of-type(2)'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-view/div/div[3]/div[3]/div[2]/swebot-code-panel/div[1]/button[2])'),
            targetPage.locator(':scope >>> div.file-tabs > button:nth-of-type(2)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 24.171875,
                y: 9,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('swebot-code-panel button:nth-of-type(1) svg'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-view/div/div[3]/div[3]/div[2]/swebot-code-panel/div[2]/div[3]/button[1]/mat-icon/svg)'),
            targetPage.locator(':scope >>> swebot-code-panel button:nth-of-type(1) svg')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 4,
                y: 6,
              },
            });
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Meta');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Publish branch)'),
            targetPage.locator('div.actions > button'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-view/div/div[3]/div[2]/swebot-chat/div[1]/div/swebot-submission-card[2]/div/div[3]/div[2]/button)'),
            targetPage.locator(':scope >>> div.actions > button'),
            targetPage.locator('::-p-text(Publish branch)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 86.1171875,
                y: 25.984375,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Search for repos or tasks)'),
            targetPage.locator('#start-panel input'),
            targetPage.locator('::-p-xpath(//*[@id=\\"start-panel\\"]/swebot-start-panel/div[2]/input)'),
            targetPage.locator(':scope >>> #start-panel input')
        ])
            .setTimeout(timeout)
            .click({
              count: 2,
              offset: {
                x: 125,
                y: 11.453125,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('swebot-submission-card.message-anchor a'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-view/div/div[3]/div[2]/swebot-chat/div[1]/div/swebot-submission-card[2]/div/div[3]/div[2]/a)'),
            targetPage.locator(':scope >>> swebot-submission-card.message-anchor a')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 59.4375,
                y: 14.984375,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('button.mat-mdc-tooltip-trigger svg'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/swebot-navbar/div[2]/button[1]/mat-icon/svg)'),
            targetPage.locator(':scope >>> button.mat-mdc-tooltip-trigger svg')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 10.9296875,
                y: 2,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div.repo-select div.header-container'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-creation-view/div[1]/swebot-task-creation-card/div/div[1]/div[1]/div[1]/swebot-combobox/div[1])'),
            targetPage.locator(':scope >>> div.repo-select div.header-container')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 296,
                y: 7.0390625,
              },
            });
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Meta');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div.repo-select div.header-container > div'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-creation-view/div[1]/swebot-task-creation-card/div/div[1]/div[1]/div[1]/swebot-combobox/div[1]/div)'),
            targetPage.locator(':scope >>> div.repo-select div.header-container > div')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 294,
                y: 17.0390625,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div.repo-select div.header-container > div'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-creation-view/div[1]/swebot-task-creation-card/div/div[1]/div[1]/div[1]/swebot-combobox/div[1]/div)'),
            targetPage.locator(':scope >>> div.repo-select div.header-container > div')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 318,
                y: 5.0390625,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Select a repository)'),
            targetPage.locator('div.repo-select input'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-creation-view/div[1]/swebot-task-creation-card/div/div[1]/div[1]/div[1]/swebot-combobox/div[1]/div/span/input)'),
            targetPage.locator(':scope >>> div.repo-select input')
        ])
            .setTimeout(timeout)
            .fill('samihalawa/2025');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Meta');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Shift');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Meta');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Meta');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Meta');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Meta');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Meta');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Meta');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Select a repository)'),
            targetPage.locator('div.repo-select input'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-creation-view/div[1]/swebot-task-creation-card/div/div[1]/div[1]/div[1]/swebot-combobox/div[1]/div/span/input)'),
            targetPage.locator(':scope >>> div.repo-select input')
        ])
            .setTimeout(timeout)
            .click({
              count: 2,
              offset: {
                x: 109,
                y: 7.0390625,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Select a repository)'),
            targetPage.locator('div.repo-select input'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-creation-view/div[1]/swebot-task-creation-card/div/div[1]/div[1]/div[1]/swebot-combobox/div[1]/div/span/input)'),
            targetPage.locator(':scope >>> div.repo-select input')
        ])
            .setTimeout(timeout)
            .fill('samihalawa/2025-FINAL-PUBLISHED-IAEXPERTOS-SAMIHALAWA');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Enter');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Enter');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Select a branch)'),
            targetPage.locator('div.branch-select input'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-creation-view/div[1]/swebot-task-creation-card/div/div[1]/div[1]/div[2]/swebot-combobox/div[1]/div/span/input)'),
            targetPage.locator(':scope >>> div.branch-select input')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 79.796875,
                y: 9.0390625,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div.repo-select div.header-container > div'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-creation-view/div[1]/swebot-task-creation-card/div/div[1]/div[1]/div[1]/swebot-combobox/div[1]/div)'),
            targetPage.locator(':scope >>> div.repo-select div.header-container > div')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 297,
                y: 3.0390625,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Select a repository)'),
            targetPage.locator('div.repo-select input'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-creation-view/div[1]/swebot-task-creation-card/div/div[1]/div[1]/div[1]/swebot-combobox/div[1]/div/span/input)'),
            targetPage.locator(':scope >>> div.repo-select input')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 180,
                y: 9.0390625,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Select a repository)'),
            targetPage.locator('div.repo-select input'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-creation-view/div[1]/swebot-task-creation-card/div/div[1]/div[1]/div[1]/swebot-combobox/div[1]/div/span/input)'),
            targetPage.locator(':scope >>> div.repo-select input')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 213,
                y: 1.0390625,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Select a repository)'),
            targetPage.locator('div.repo-select input'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-creation-view/div[1]/swebot-task-creation-card/div/div[1]/div[1]/div[1]/swebot-combobox/div[1]/div/span/input)'),
            targetPage.locator(':scope >>> div.repo-select input')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 230,
                y: 2.0390625,
              },
            });
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Meta');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('a');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Meta');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('ArrowRight');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('ArrowRight');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Select a repository)'),
            targetPage.locator('div.repo-select input'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-creation-view/div[1]/swebot-task-creation-card/div/div[1]/div[1]/div[1]/swebot-combobox/div[1]/div/span/input)'),
            targetPage.locator(':scope >>> div.repo-select input')
        ])
            .setTimeout(timeout)
            .fill('samihalawa/2025-FINAL-PUBLISHED-IAEXPERTOS-SAMIHALAW');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div.repo-select div.opt-list > swebot-option'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-creation-view/div[1]/swebot-task-creation-card/div/div[1]/div[1]/div[1]/swebot-combobox/div[2]/swebot-option)'),
            targetPage.locator(':scope >>> div.repo-select div.opt-list > swebot-option')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 245,
                y: 6.0390625,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div.branch-select div.header-container > div'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-creation-view/div[1]/swebot-task-creation-card/div/div[1]/div[1]/div[2]/swebot-combobox/div[1]/div)'),
            targetPage.locator(':scope >>> div.branch-select div.header-container > div')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 189.796875,
                y: 6.0390625,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div.branch-select swebot-option:nth-of-type(1)'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-creation-view/div[1]/swebot-task-creation-card/div/div[1]/div[1]/div[2]/swebot-combobox/div[2]/swebot-option[1])'),
            targetPage.locator(':scope >>> div.branch-select swebot-option:nth-of-type(1)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 196.796875,
                y: 9.0390625,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div.card-content-entry'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-creation-view/div[1]/swebot-task-creation-card/div/div[1])'),
            targetPage.locator(':scope >>> div.card-content-entry')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 268,
                y: 55.0390625,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Ask Jules to work on a task)'),
            targetPage.locator('textarea'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-creation-view/div[1]/swebot-task-creation-card/div/div[1]/div[2]/div/textarea)'),
            targetPage.locator(':scope >>> textarea')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 219,
                y: 42.0390625,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Ask Jules to work on a task)'),
            targetPage.locator('textarea'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-creation-view/div[1]/swebot-task-creation-card/div/div[1]/div[2]/div/textarea)'),
            targetPage.locator(':scope >>> textarea')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 212,
                y: 48.0390625,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Ask Jules to work on a task)'),
            targetPage.locator('textarea'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-creation-view/div[1]/swebot-task-creation-card/div/div[1]/div[2]/div/textarea)'),
            targetPage.locator(':scope >>> textarea')
        ])
            .setTimeout(timeout)
            .fill('ezxtend');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Meta');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('a');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Meta');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Meta');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Meta');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Meta');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Meta');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Ask Jules to work on a task)'),
            targetPage.locator('textarea'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-creation-view/div[1]/swebot-task-creation-card/div/div[1]/div[2]/div/textarea)'),
            targetPage.locator(':scope >>> textarea')
        ])
            .setTimeout(timeout)
            .click({
              count: 2,
              offset: {
                x: 244,
                y: 22.0390625,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Ask Jules to work on a task)'),
            targetPage.locator('textarea'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-creation-view/div[1]/swebot-task-creation-card/div/div[1]/div[2]/div/textarea)'),
            targetPage.locator(':scope >>> textarea')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 244,
                y: 22.0390625,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Ask Jules to work on a task)'),
            targetPage.locator('textarea'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-creation-view/div[1]/swebot-task-creation-card/div/div[1]/div[2]/div/textarea)'),
            targetPage.locator(':scope >>> textarea')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 244,
                y: 22.0390625,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Ask Jules to work on a task)'),
            targetPage.locator('textarea'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-creation-view/div[1]/swebot-task-creation-card/div/div[1]/div[2]/div/textarea)'),
            targetPage.locator(':scope >>> textarea')
        ])
            .setTimeout(timeout)
            .click({
              count: 2,
              offset: {
                x: 25,
                y: 10.0390625,
              },
            });
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Meta');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('c');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Meta');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Ask Jules to work on a task)'),
            targetPage.locator('textarea'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-creation-view/div[1]/swebot-task-creation-card/div/div[1]/div[2]/div/textarea)'),
            targetPage.locator(':scope >>> textarea')
        ])
            .setTimeout(timeout)
            .fill('ezxtend');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Meta');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Meta');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Ask Jules to work on a task)'),
            targetPage.locator('textarea'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-creation-view/div[1]/swebot-task-creation-card/div/div[1]/div[2]/div/textarea)'),
            targetPage.locator(':scope >>> textarea')
        ])
            .setTimeout(timeout)
            .fill('ezxtendextend all the services section and make sure all navigation fully works as expected');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Ask Jules to work on a task)'),
            targetPage.locator('textarea'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-creation-view/div[1]/swebot-task-creation-card/div/div[1]/div[2]/div/textarea)'),
            targetPage.locator(':scope >>> textarea')
        ])
            .setTimeout(timeout)
            .click({
              count: 2,
              offset: {
                x: 41,
                y: 8.0390625,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Ask Jules to work on a task)'),
            targetPage.locator('textarea'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-creation-view/div[1]/swebot-task-creation-card/div/div[1]/div[2]/div/textarea)'),
            targetPage.locator(':scope >>> textarea')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 41,
                y: 8.0390625,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Ask Jules to work on a task)'),
            targetPage.locator('textarea'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-creation-view/div[1]/swebot-task-creation-card/div/div[1]/div[2]/div/textarea)'),
            targetPage.locator(':scope >>> textarea')
        ])
            .setTimeout(timeout)
            .fill('extend all the services section and make sure all navigation fully works as expected');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Meta');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Enter');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Meta');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Enable)'),
            targetPage.locator('div.chat-container button:nth-of-type(2)'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-view/div/div[3]/div[2]/swebot-chat/div[1]/div/div[2]/div/button[2])'),
            targetPage.locator(':scope >>> div.chat-container button:nth-of-type(2)'),
            targetPage.locator('::-p-text(Enable)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 47.1171875,
                y: 13.8125,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div:nth-of-type(1) > div.source-content > a:nth-of-type(3) > span'),
            targetPage.locator('::-p-xpath(//*[@id=\\"start-panel\\"]/swebot-start-panel/div[3]/div[1]/div[2]/a[3]/span)'),
            targetPage.locator(':scope >>> div:nth-of-type(1) > div.source-content > a:nth-of-type(3) > span')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 138,
                y: 10.359375,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('swebot-submission-card.message-anchor a'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-view/div/div[3]/div[2]/swebot-chat/div[1]/div/swebot-submission-card[2]/div/div[3]/div[2]/a)'),
            targetPage.locator(':scope >>> swebot-submission-card.message-anchor a')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 80.4375,
                y: 9.03125,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div:nth-of-type(1) > div.source-content'),
            targetPage.locator('::-p-xpath(//*[@id=\\"start-panel\\"]/swebot-start-panel/div[3]/div[1]/div[2])'),
            targetPage.locator(':scope >>> div:nth-of-type(1) > div.source-content')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 153,
                y: 93.453125,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div:nth-of-type(1) > div.source-content > a:nth-of-type(4) > span'),
            targetPage.locator('::-p-xpath(//*[@id=\\"start-panel\\"]/swebot-start-panel/div[3]/div[1]/div[2]/a[4]/span)'),
            targetPage.locator(':scope >>> div:nth-of-type(1) > div.source-content > a:nth-of-type(4) > span')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 117,
                y: 3.8125,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(View branch)'),
            targetPage.locator('div.chat-content a'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-view/div/div[3]/div[2]/swebot-chat/div[1]/div/swebot-submission-card/div/div[3]/div[2]/a)'),
            targetPage.locator(':scope >>> div.chat-content a'),
            targetPage.locator('::-p-text(View branch)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 59.4375,
                y: 24.09375,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('form'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-view/div/div[3]/div[2]/swebot-chat/div[2]/div/swebot-input-box/form)'),
            targetPage.locator(':scope >>> form')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 132,
                y: 9.1875,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div.bottom-bar-container textarea'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-view/div/div[3]/div[2]/swebot-chat/div[2]/div/swebot-input-box/form/div/textarea)'),
            targetPage.locator(':scope >>> div.bottom-bar-container textarea')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 95,
                y: 14.1875,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div.bottom-bar-container textarea'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-view/div/div[3]/div[2]/swebot-chat/div[2]/div/swebot-input-box/form/div/textarea)'),
            targetPage.locator(':scope >>> div.bottom-bar-container textarea')
        ])
            .setTimeout(timeout)
            .fill('proceed');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Shift');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Shift');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div.bottom-bar-container textarea'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-view/div/div[3]/div[2]/swebot-chat/div[2]/div/swebot-input-box/form/div/textarea)'),
            targetPage.locator(':scope >>> div.bottom-bar-container textarea')
        ])
            .setTimeout(timeout)
            .fill('proceed!!!');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Enter');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Enter');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Shift');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Shift');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div:nth-of-type(1) > div.source-header span'),
            targetPage.locator('::-p-xpath(//*[@id=\\"start-panel\\"]/swebot-start-panel/div[3]/div[1]/div[1]/div[1]/span)'),
            targetPage.locator(':scope >>> div:nth-of-type(1) > div.source-header span'),
            targetPage.locator('::-p-text(Recent tasks)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 101,
                y: 9.2265625,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div:nth-of-type(1) > div.source-header span'),
            targetPage.locator('::-p-xpath(//*[@id=\\"start-panel\\"]/swebot-start-panel/div[3]/div[1]/div[1]/div[1]/span)'),
            targetPage.locator(':scope >>> div:nth-of-type(1) > div.source-header span'),
            targetPage.locator('::-p-text(Recent tasks)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 102,
                y: 6.2265625,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div:nth-of-type(1) > div.source-content'),
            targetPage.locator('::-p-xpath(//*[@id=\\"start-panel\\"]/swebot-start-panel/div[3]/div[1]/div[2])'),
            targetPage.locator(':scope >>> div:nth-of-type(1) > div.source-content')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 110,
                y: 29.453125,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(extend all the services section and make sure all navigation fully works as expected) >>>> ::-p-aria([role=\\"generic\\"])'),
            targetPage.locator('div:nth-of-type(1) > div.source-content > a:nth-of-type(1) > span'),
            targetPage.locator('::-p-xpath(//*[@id=\\"start-panel\\"]/swebot-start-panel/div[3]/div[1]/div[2]/a[1]/span)'),
            targetPage.locator(':scope >>> div:nth-of-type(1) > div.source-content > a:nth-of-type(1) > span')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 93,
                y: 0.453125,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('swebot-expansion-panel-row.ng-tns-c3846547482-85 > div.row-header'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-view/div/div[3]/div[2]/swebot-chat/div[1]/div/swebot-plan/div/swebot-expansion-panel-row[1]/div[1])'),
            targetPage.locator(':scope >>> swebot-expansion-panel-row.ng-tns-c3846547482-85 > div.row-header')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 504,
                y: 7.7109375,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('swebot-expansion-panel-row.ng-tns-c3846547482-86 svg'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-view/div/div[3]/div[2]/swebot-chat/div[1]/div/swebot-plan/div/swebot-expansion-panel-row[2]/div[1]/mat-icon/svg)'),
            targetPage.locator(':scope >>> swebot-expansion-panel-row.ng-tns-c3846547482-86 svg')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 4,
                y: 9.28125,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('swebot-expansion-panel-row.ng-tns-c3846547482-87 > div.row-header'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-view/div/div[3]/div[2]/swebot-chat/div[1]/div/swebot-plan/div/div/swebot-expansion-panel-row[1]/div[1])'),
            targetPage.locator(':scope >>> swebot-expansion-panel-row.ng-tns-c3846547482-87 > div.row-header')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 505,
                y: 37.0390625,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('swebot-expansion-panel-row.ng-tns-c3846547482-88 > div.row-header'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-view/div/div[3]/div[2]/swebot-chat/div[1]/div/swebot-plan/div/div/swebot-expansion-panel-row[2]/div[1])'),
            targetPage.locator(':scope >>> swebot-expansion-panel-row.ng-tns-c3846547482-88 > div.row-header')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 481,
                y: 41.7578125,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Approve plan?)'),
            targetPage.locator('div.approve-plan-container > button'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-view/div/div[3]/div[2]/swebot-chat/div[1]/div/div[3]/button)'),
            targetPage.locator(':scope >>> div.approve-plan-container > button'),
            targetPage.locator('::-p-text(Approve plan?)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 90.8515625,
                y: 9.2421875,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div.source-content > div:nth-of-type(2)'),
            targetPage.locator('::-p-xpath(//*[@id=\\"start-panel\\"]/swebot-start-panel/div[3]/div[1]/div[2]/div[2])'),
            targetPage.locator(':scope >>> div.source-content > div:nth-of-type(2)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 119,
                y: 5.984375,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div:nth-of-type(1) > div.source-content > a:nth-of-type(3) > span'),
            targetPage.locator('::-p-xpath(//*[@id=\\"start-panel\\"]/swebot-start-panel/div[3]/div[1]/div[2]/a[3]/span)'),
            targetPage.locator(':scope >>> div:nth-of-type(1) > div.source-content > a:nth-of-type(3) > span')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 136,
                y: 7.359375,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(AGENTS.md OBJECTIVE Create a comprehensive and autonomous workflow for Google Jules \\(Codex\\) to: Analyze the current state of blog posts on https://samihalawa.com/blog and https://samihalawa.com/blog/guia-tfm-machine-learning Fix, enrich, and enhance all existing posts \\(improving content, formatting, structure, image use, code blocks, etc.\\) Automatically generate and publish 20 new, high-quality, relevant blog posts for samihalawa.com, with strong formatting and attractive images from free CDN sources \\(e.g., Unsplash, Pexels, Pixabay\\) Ensure all posts \\(existing + new\\) have consistent style, advanced Markdown/HTML, SEO best practices, and visual polish AUTONOMOUS AGENT WORKFLOW 1. INITIAL ANALYSIS & AUDIT 2. ENRICH & FIX EXISTING POSTS 3. GENERATE 20 NEW BLOG POSTS 4. QUALITY REVIEW & PUBLISH 5. EXIT CONDITIONS CHECKLIST FOR EACH POST AGENT AUTONOMY LOOP Loop through all steps for all existing posts Loop through 20 new post generations and enhancements Repeat quality review until all exit conditions are met Only stop when every blog post \\(old + new\\) is fully enriched, reviewed, published, and logged INSTRUCTIONS FOR AGENT Work autonomously. Never stop after a single post. Use advanced Markdown and HTML for all posts. Select images only from CDN sources \\(Unsplash, Pexels, Pixabay, etc.\\) using direct links. Document every action in AGENT_LOG.md. Always perform a quality control loop at the end and after every major batch of changes. Follow the outlined checklists strictly for every post. OUTPUT FILES APART FROM MODIFICATIONS AGENTS.md \\(this file\\) FINAL_REPORT.md \\(summary of all work\\)) >>>> ::-p-aria([role=\\"generic\\"])'),
            targetPage.locator('div:nth-of-type(1) > div.source-content > a:nth-of-type(5) > span'),
            targetPage.locator('::-p-xpath(//*[@id=\\"start-panel\\"]/swebot-start-panel/div[3]/div[1]/div[2]/a[5]/span)'),
            targetPage.locator(':scope >>> div:nth-of-type(1) > div.source-content > a:nth-of-type(5) > span')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 127,
                y: 14.265625,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div:nth-of-type(1) > div.source-content > a:nth-of-type(4) > span'),
            targetPage.locator('::-p-xpath(//*[@id=\\"start-panel\\"]/swebot-start-panel/div[3]/div[1]/div[2]/a[4]/span)'),
            targetPage.locator(':scope >>> div:nth-of-type(1) > div.source-content > a:nth-of-type(4) > span')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 69,
                y: 5.8125,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(samihalawa / email-crawler-LANDING-FINAL 1)'),
            targetPage.locator('div.sources-container > div:nth-of-type(2) a:nth-of-type(9)'),
            targetPage.locator('::-p-xpath(//*[@id=\\"start-panel\\"]/swebot-start-panel/div[3]/div[2]/div[2]/a[9])'),
            targetPage.locator(':scope >>> div.sources-container > div:nth-of-type(2) a:nth-of-type(9)'),
            targetPage.locator('::-p-text(samihalawa/email-crawler-LANDING-FINAL1)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 201,
                y: 17.765625,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('swebot-source-view'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-source-view)'),
            targetPage.locator(':scope >>> swebot-source-view')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 147,
                y: 38,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Configuration)'),
            targetPage.locator('div.main-content-inner > div button:nth-of-type(2)'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-source-view/div/div/button[2])'),
            targetPage.locator(':scope >>> div.main-content-inner > div button:nth-of-type(2)'),
            targetPage.locator('::-p-text(Configuration)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 42.421875,
                y: 13,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(echo do setup)'),
            targetPage.locator('textarea'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-source-view/swebot-env-config-view/div/div[1]/swebot-env-setup-script-input/swebot-execute-script-input/textarea)'),
            targetPage.locator(':scope >>> textarea'),
            targetPage.locator('::-p-text(set -eux\ncd /app\nnpm)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 555,
                y: 57.453125,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('swebot-env-setup-script-input span'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-source-view/swebot-env-config-view/div/div[1]/swebot-env-setup-script-input/swebot-execute-script-input/div/button/div/span)'),
            targetPage.locator(':scope >>> swebot-env-setup-script-input span'),
            targetPage.locator('::-p-text(Run to Validate)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 82.7265625,
                y: 6.953125,
              },
            });
    }
    {
        const targetPage = page;
        await targetPage.goto('https://jules.google.com/repo/github/samihalawa/email-crawler-LANDING-FINAL/overview');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Configuration)'),
            targetPage.locator('div.main-content-inner > div button:nth-of-type(2)'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-source-view/div/div/button[2])'),
            targetPage.locator(':scope >>> div.main-content-inner > div button:nth-of-type(2)'),
            targetPage.locator('::-p-text(Configuration)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 49.421875,
                y: 14,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('swebot-source-view'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-source-view)'),
            targetPage.locator(':scope >>> swebot-source-view')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 55,
                y: 14,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Overview)'),
            targetPage.locator('swebot-source-view > div button:nth-of-type(1)'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-source-view/div/div/button[1])'),
            targetPage.locator(':scope >>> swebot-source-view > div button:nth-of-type(1)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 49,
                y: 9,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('swebot-tasks-view > div > div > div:nth-of-type(2) > div:nth-of-type(1) > div'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-source-view/swebot-tasks-view/div/div/div[2]/div[1]/div)'),
            targetPage.locator(':scope >>> swebot-tasks-view > div > div > div:nth-of-type(2) > div:nth-of-type(1) > div')
        ])
            .setTimeout(timeout)
            .click({
              count: 2,
              offset: {
                x: 391,
                y: 94,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div.bottom-bar-container textarea'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-view/div/div[3]/div[2]/swebot-chat/div[3]/div/swebot-input-box/form/div/textarea)'),
            targetPage.locator(':scope >>> div.bottom-bar-container textarea')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 211,
                y: 15.1875,
              },
            });
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Meta');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Meta');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Meta');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Meta');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Shift');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Shift');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Meta');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Meta');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Shift');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Shift');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Meta');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Meta');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('swebot-chat'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-view/div/div[3]/div[2]/swebot-chat)'),
            targetPage.locator(':scope >>> swebot-chat')
        ])
            .setTimeout(timeout)
            .click({
              delay: 611,
              offset: {
                x: 359,
                y: 738,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div.bottom-bar-container textarea'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-view/div/div[3]/div[2]/swebot-chat/div[3]/div/swebot-input-box/form/div/textarea)'),
            targetPage.locator(':scope >>> div.bottom-bar-container textarea')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 131,
                y: 12.1875,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div.bottom-bar-container textarea'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-view/div/div[3]/div[2]/swebot-chat/div[3]/div/swebot-input-box/form/div/textarea)'),
            targetPage.locator(':scope >>> div.bottom-bar-container textarea')
        ])
            .setTimeout(timeout)
            .fill('you decide all that to your best. go ahead!.  ');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Enter');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Enter');
    }
    {
        const targetPage = page;
        await targetPage.goto('https://jules.google.com/repo/github/samihalawa/email-crawler-LANDING-FINAL/overview');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div.main-content-inner > div mat-icon.ng-star-inserted > svg'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-source-view/swebot-tasks-view/div/div/div[2]/div[1]/div/div[2]/div/div/mat-icon[1]/svg)'),
            targetPage.locator(':scope >>> div.main-content-inner > div mat-icon.ng-star-inserted > svg')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 14.9375,
                y: 9,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(no mockups no shit always test with real search terms and previous records even email must be really sent \\(not analytic the results of the email marketing campaign though as that can be very slow but objectively analizign and critiquizing if for a goal a specific email is sent will it really make sense or not? Does it include the info and links needed? Is language right ? Is something that the receiver will have the decision power & economic power and necessity? DONT fucking use supabase or things or technologies additional try to keep it with the services we use now and in the easiest possible way. I don’t want u to hardcode queues technology or things already existing but don’t use additional services and leverage on the current implementation. And ENHANCE THE UX UI A LOT MAKE IT FEEL MORE SMART AND EASIER TO USE AND LIKE AN AI AGENT SIMILAR TO YOU This task is paused Paused) >>>> ::-p-aria([role=\\"paragraph\\"])'),
            targetPage.locator('swebot-tasks-view > div > div > div:nth-of-type(2) > div:nth-of-type(1) p'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-source-view/swebot-tasks-view/div/div/div[2]/div[1]/div/div[1]/swebot-markdown-viewer/div/p)'),
            targetPage.locator(':scope >>> swebot-tasks-view > div > div > div:nth-of-type(2) > div:nth-of-type(1) p')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 398,
                y: 12,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div.chat-header svg'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-view/div/div[1]/div[1]/button/mat-icon/svg)'),
            targetPage.locator(':scope >>> div.chat-header svg')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 11,
                y: 19,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div.chat-content > div'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-view/div/div[3]/div[2]/swebot-chat/div[2]/div)'),
            targetPage.locator(':scope >>> div.chat-content > div')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 249,
                y: 31916,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div.resume-button-container svg'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-view/div/div[3]/div[2]/swebot-chat/div[2]/div/div[14]/button/mat-icon/svg)'),
            targetPage.locator(':scope >>> div.resume-button-container svg')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 5.625,
                y: 13.2265625,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(TASK : ADD GAME AND IMPROVE DESING the contrast of the top valiera is jd and text acannot be redadedn sub │ads likesumar y restas or other topics are so ugly. and allow like │ │ scrolllign between cars if many and add agame secitonwith two easy gmes u │ │ import form some cdn. dont fuckign hardcode them and can onl y play vchanging the coins \\( see the best way so they have incentive and chosoe games that its time is quick and easy to play and are nice even without memory like jumping or I dunno but simple. donf fuc k the logic ULTRA-AUTONOMY & LOOP LOGIC Begin audit/fix/enrich loop across 100% of the repo For every detected gap/bug/unfinished element, fix, complete, and enrich as described After each pass, simulate user sessions and checklists again If anything new is found or created, restart from step 1 Never exit until every essential feature, workflow, and content is perfect for user success and usability If stuck, regenerate ideas or seek more examples until block is resolved INSTRUCTIONS FOR AGENT Work completely autonomously, in extremely long, multi-pass loops—never stop after a single fix, file, or review Ignore all concerns unrelated to user-facing completeness \\(security, optimization, error handling, style, etc.\\) Focus only on what delivers a fully complete and working experience for real users If unsure, add clarity/content, but never add bloat or unnecessary detail Log every fix, loop, and finding in AGENT_LOG.md Only stop if ALL essential items are completed, and logs/reports are written OUTPUT FILES \\(PLUS REPO FIXES\\) AGENTS.md \\(this ultra-persistent workflow\\) AUDIT.md \\(audit of all gaps/issues and their status, constantly updated\\) FINAL_REPORT.md \\(summary of all completions and enrichment\\) AGENT_LOG.md \\(step-by-step, loop-by-loop log of all actions and fixes\\)) >>>> ::-p-aria([role=\\"generic\\"])'),
            targetPage.locator('div:nth-of-type(1) > div.source-content > a:nth-of-type(2) > span'),
            targetPage.locator('::-p-xpath(//*[@id=\\"start-panel\\"]/swebot-start-panel/div[3]/div[1]/div[2]/a[2]/span)'),
            targetPage.locator(':scope >>> div:nth-of-type(1) > div.source-content > a:nth-of-type(2) > span')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 111,
                y: 5.90625,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('form'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-view/div/div[3]/div[2]/swebot-chat/div[2]/div/swebot-input-box/form)'),
            targetPage.locator(':scope >>> form')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 135,
                y: 6.1875,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('form'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-view/div/div[3]/div[2]/swebot-chat/div[2]/div/swebot-input-box/form)'),
            targetPage.locator(':scope >>> form')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 117,
                y: 35.1875,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div.bottom-bar-container textarea'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-view/div/div[3]/div[2]/swebot-chat/div[2]/div/swebot-input-box/form/div/textarea)'),
            targetPage.locator(':scope >>> div.bottom-bar-container textarea')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 105,
                y: 5.1875,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div.bottom-bar-container textarea'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-view/div/div[3]/div[2]/swebot-chat/div[2]/div/swebot-input-box/form/div/textarea)'),
            targetPage.locator(':scope >>> div.bottom-bar-container textarea')
        ])
            .setTimeout(timeout)
            .fill('make anuy final afju');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Meta');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Meta');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Meta');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Meta');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div.bottom-bar-container textarea'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-view/div/div[3]/div[2]/swebot-chat/div[2]/div/swebot-input-box/form/div/textarea)'),
            targetPage.locator(':scope >>> div.bottom-bar-container textarea')
        ])
            .setTimeout(timeout)
            .click({
              count: 2,
              offset: {
                x: 108,
                y: 11.1875,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div.bottom-bar-container textarea'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-view/div/div[3]/div[2]/swebot-chat/div[2]/div/swebot-input-box/form/div/textarea)'),
            targetPage.locator(':scope >>> div.bottom-bar-container textarea')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 108,
                y: 11.1875,
              },
            });
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Meta');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('a');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Meta');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div.bottom-bar-container textarea'),
            targetPage.locator('::-p-xpath(/html/body/swebot-site-root/swebot-root/div/div[2]/div/swebot-task-view/div/div[3]/div[2]/swebot-chat/div[2]/div/swebot-input-box/form/div/textarea)'),
            targetPage.locator(':scope >>> div.bottom-bar-container textarea')
        ])
            .setTimeout(timeout)
            .fill('make any final adjsutements neede');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Enter');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Enter');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Meta');
    }

    await browser.close();

})().catch(err => {
    console.error(err);
    process.exit(1);
});
