test.describe("jules", () => {
  test("tests jules", async ({ page }) => {
    await page.setViewportSize({
          width: 936,
          height: 962
        })
    await page.goto("https://jules.google.com/task");
    await page.locator("div.source-content > a:nth-of-type(1) > span").click()
    await page.goto("https://jules.google.com/task");
    await page.goto("https://jules.google.com/task/9103172019911831130/code/AGENTS.md");
    await page.locator("div.chat-content a").click()
    await page.locator("div.source-content > a:nth-of-type(2)").click()
    await page.locator("swebot-code-diff-update-card.ng-tns-c2680037464-57 > div").click()
    await page.locator("swebot-code-panel button:nth-of-type(1) svg").click()
    await page.locator("div.file-tabs > button:nth-of-type(2)").click()
    await page.locator("swebot-code-panel button:nth-of-type(1) svg").click()
    await page.locator("div.actions > button").click()
    await page.locator("#start-panel input").dblclick();
    await page.locator("swebot-submission-card.message-anchor a").click()
    await page.locator("button.mat-mdc-tooltip-trigger svg").click()
    await page.locator("div.repo-select div.header-container").click()
    await page.locator("div.repo-select div.header-container > div").click()
    await page.locator("div.repo-select div.header-container > div").click()
    await page.locator("div.repo-select input").type("samihalawa/2025");
    await page.locator("div.repo-select input").dblclick();
    await page.locator("div.repo-select input").type("samihalawa/2025-FINAL-PUBLISHED-IAEXPERTOS-SAMIHALAWA");
    page.keyboard.down("{Enter}");
    await page.locator("div.branch-select input").click()
    await page.locator("div.repo-select div.header-container > div").click()
    await page.locator("div.repo-select input").click()
    await page.locator("div.repo-select input").click()
    await page.locator("div.repo-select input").click()
    await page.locator("div.repo-select input").type("samihalawa/2025-FINAL-PUBLISHED-IAEXPERTOS-SAMIHALAW");
    await page.locator("div.repo-select div.opt-list > swebot-option").click()
    await page.locator("div.branch-select div.header-container > div").click()
    await page.locator("div.branch-select swebot-option:nth-of-type(1)").click()
    await page.locator("div.card-content-entry").click()
    await page.locator("textarea").click()
    await page.locator("textarea").click()
    await page.locator("textarea").type("ezxtend");
    await page.locator("textarea").dblclick();
    await page.locator("textarea").click()
    await page.locator("textarea").click()
    await page.locator("textarea").dblclick();
    await page.locator("textarea").type("ezxtend");
    await page.locator("textarea").type("ezxtendextend all the services section and make sure all navigation fully works as expected");
    await page.locator("textarea").dblclick();
    await page.locator("textarea").click()
    await page.locator("textarea").type("extend all the services section and make sure all navigation fully works as expected");
    page.keyboard.down("{Enter}");
    await page.locator("div.chat-container button:nth-of-type(2)").click()
    await page.locator("div:nth-of-type(1) > div.source-content > a:nth-of-type(3) > span").click()
    await page.locator("swebot-submission-card.message-anchor a").click()
    await page.locator("div:nth-of-type(1) > div.source-content").click()
    await page.locator("div:nth-of-type(1) > div.source-content > a:nth-of-type(4) > span").click()
    await page.locator("div.chat-content a").click()
    await page.locator("form").click()
    await page.locator("div.bottom-bar-container textarea").click()
    await page.locator("div.bottom-bar-container textarea").type("proceed");
    await page.locator("div.bottom-bar-container textarea").type("proceed!!!");
    page.keyboard.down("{Enter}");
    await page.locator("div:nth-of-type(1) > div.source-header span").click()
    await page.locator("div:nth-of-type(1) > div.source-header span").click()
    await page.locator("div:nth-of-type(1) > div.source-content").click()
    await page.locator("div:nth-of-type(1) > div.source-content > a:nth-of-type(1) > span").click()
    await page.locator("swebot-expansion-panel-row.ng-tns-c3846547482-85 > div.row-header").click()
    await page.locator("swebot-expansion-panel-row.ng-tns-c3846547482-86 svg").click()
    await page.locator("swebot-expansion-panel-row.ng-tns-c3846547482-87 > div.row-header").click()
    await page.locator("swebot-expansion-panel-row.ng-tns-c3846547482-88 > div.row-header").click()
    await page.locator("div.approve-plan-container > button").click()
    await page.locator("div.source-content > div:nth-of-type(2)").click()
    await page.locator("div:nth-of-type(1) > div.source-content > a:nth-of-type(3) > span").click()
    await page.locator("div:nth-of-type(1) > div.source-content > a:nth-of-type(5) > span").click()
    await page.locator("div:nth-of-type(1) > div.source-content > a:nth-of-type(4) > span").click()
    await page.locator("div.sources-container > div:nth-of-type(2) a:nth-of-type(9)").click()
    await page.locator("swebot-source-view").click()
    await page.locator("div.main-content-inner > div button:nth-of-type(2)").click()
    await page.locator("textarea").click()
    await page.locator("swebot-env-setup-script-input span").click()
    await page.goto("https://jules.google.com/repo/github/samihalawa/email-crawler-LANDING-FINAL/overview");
    await page.locator("div.main-content-inner > div button:nth-of-type(2)").click()
    await page.locator("swebot-source-view").click()
    await page.locator("swebot-source-view > div button:nth-of-type(1)").click()
    await page.locator("swebot-tasks-view > div > div > div:nth-of-type(2) > div:nth-of-type(1) > div").dblclick();
    await page.locator("div.bottom-bar-container textarea").click()
    await page.locator("swebot-chat").click()
    await page.locator("div.bottom-bar-container textarea").click()
    await page.locator("div.bottom-bar-container textarea").type("you decide all that to your best. go ahead!.  ");
    page.keyboard.down("{Enter}");
    await page.goto("https://jules.google.com/repo/github/samihalawa/email-crawler-LANDING-FINAL/overview");
    await page.locator("div.main-content-inner > div mat-icon.ng-star-inserted > svg").click()
    await page.locator("swebot-tasks-view > div > div > div:nth-of-type(2) > div:nth-of-type(1) p").click()
    await page.locator("div.chat-header svg").click()
    await page.locator("div.chat-content > div").click()
    await page.locator("div.resume-button-container svg").click()
    await page.locator("div:nth-of-type(1) > div.source-content > a:nth-of-type(2) > span").click()
    await page.locator("form").click()
    await page.locator("form").click()
    await page.locator("div.bottom-bar-container textarea").click()
    await page.locator("div.bottom-bar-container textarea").type("make anuy final afju");
    await page.locator("div.bottom-bar-container textarea").dblclick();
    await page.locator("div.bottom-bar-container textarea").click()
    await page.locator("div.bottom-bar-container textarea").type("make any final adjsutements neede");
    page.keyboard.down("{Enter}");
  });
});
