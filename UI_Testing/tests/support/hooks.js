const { Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

let browser;
let page;
let context;

Before(async function () {
  // Launch Playwright browser before each scenario
  browser = await chromium.launch({ headless: false }); // You can set headless: true for no UI
  context = await browser.newContext();
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
