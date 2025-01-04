const { Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
// tests/support/hooks.js
const { setDefaultTimeout } = require('@cucumber/cucumber');

let browser;
let page;
let context;

Before(async function () {
  // Launch Playwright browser before each scenario
  browser = await chromium.launch({
    headless: true,
    args: ["--start-maximized"],
 });
 context = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  javaScriptEnabled: true,
});
  page = await browser.newPage();
  this.page = page; // Attach the page to the context
});

After(async function () {
  // Close the browser after each scenario
  if (browser) {
    await browser.close();
  }
});
module.exports = { browser, context, page };
// Set the default timeout globally to 30 seconds (30000 ms) to cover all steps
//setDefaultTimeout(30000);  // 30 seconds
setDefaultTimeout(60000);