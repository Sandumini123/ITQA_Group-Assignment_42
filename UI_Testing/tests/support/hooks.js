const { Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

let browser;

Before(async function () {
    console.log('Launching browser...');
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    // Attach the page to the Cucumber context
    this.page = page;
});

After(async function () {
    if (browser) {
        console.log('Closing browser...');
        await browser.close();
    }
});
