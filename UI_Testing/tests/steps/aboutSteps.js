const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const locators = require('../locators/aboutLocators');

setDefaultTimeout(20000);

let browser, page;

Given('I navigate to the homepage', async function () {
    browser = await chromium.launch({ headless: false }); // Launch in non-headless mode for debugging
    const context = await browser.newContext();
    page = await context.newPage();
    await page.goto('https://demoblaze.com/');
});

When('I click the About Us tab', async function () {
    // Wait for the About Us tab to be visible and click it
    await page.waitForSelector(locators.aboutUsTab, { state: 'visible' });
    await page.click(locators.aboutUsTab);
    // Wait for the video modal to appear
    await page.waitForSelector(locators.aboutUsVideoModal, { state: 'visible' });
});

Then('The video should be displayed', async function () {
    const videoVisible = await page.isVisible(locators.aboutUsVideo);
    if (!videoVisible) {
        throw new Error('The video is not displayed.');
    }
});

When('I click the close button', async function () {
    // Click the close button of the video modal
    await page.click(locators.closeButton);

    await page.waitForSelector(locators.videoModalContent, { state: 'hidden' })

});

Then('The video should not be visible', async function () {
    // Check that the video element is no longer visible
    
    const videoVisible = await page.isVisible(locators.videoModalContent);
    if (videoVisible) {
        throw new Error('The video is still visible after closing the modal.');
    }
    console.log('The video is no longer visible.');
});

    



























