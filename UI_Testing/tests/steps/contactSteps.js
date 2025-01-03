const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const locators = require('../locators/contactLocators');
setDefaultTimeout(20000);

let browser;
let page;


Given('I navigate to the home page', async function () {
    browser = await chromium.launch({
        headless: false, // Set to true in production for faster tests
        devtools: false,
    });
    const context = await browser.newContext();
    page = await context.newPage();
    await page.goto('https://demoblaze.com/');


});

When('I click the "Contact" button', async function () {

    await page.waitForSelector(locators.contactButton, { state: 'visible', timeout: 20000 });
    await page.click(locators.contactButton);
    await page.waitForSelector(locators.contactForm, { state: 'visible', timeout: 20000 });
});

Then('The contact form should be displayed', async function () {
    const formVisible = await page.isVisible(locators.contactForm);
    if (!formVisible) {
        throw new Error(`Contact form with locator "${locators.contactForm}" is not displayed.`);
    }
    console.log('Contact form opened successfully');
});

let alertMessage = '';

When('I click the "Send Message" button', async function () {
    // Listen for the alert dialog before clicking the "Send Message" button
    page.on('dialog', async (dialog) => {
        alertMessage = dialog.message(); // Capture the alert message
        console.log('Alert message:', alertMessage); // Log the alert message (optional for debugging)
        await dialog.accept(); // Accept the alert
    });

    // Click the "Send Message" button, triggering the alert
    await page.waitForSelector(locators.sendMessageButton, { state: 'visible', timeout: 20000 });
    await page.click(locators.sendMessageButton);
});

Then('An error message should be displayed', async function () {
    // Expected error message when fields are empty
    const expectedErrorMessage = 'Please fill out all fields.'; // Replace with your expected error message

    // Assert that the captured alert message matches the expected error message
    if (alertMessage !== expectedErrorMessage) {
        throw new Error(`Test failed: Expected alert message to be "${expectedErrorMessage}", but got "${alertMessage}".`);
    }

    console.log('Error message was displayed as expected:', alertMessage);
});






















// When('I click the "Send Message" button', async function () {
//     // Listen for the alert dialog before clicking the "Send Message" button
//     page.on('dialog', async (dialog) => {
//         console.log('Alert message:', dialog.message()); // Log the alert message (optional for debugging)
//         await dialog.accept(); // Accept the alert (you can also dismiss it with dialog.dismiss() if needed)
//     });

//     // Click the "Send Message" button, triggering the alert
//     await page.waitForSelector(locators.sendMessageButton, { state: 'visible', timeout: 20000 });
//     await page.click(locators.sendMessageButton);
// });

// Then('An error message should be displayed', async function () {
//     // If an error message is expected, it will be in the alert message, which we already accepted in the previous step
//     console.log('Alert message has been accepted.');
// });










// // Hook to close the browser after the test
// // After(async function () {
// //     if (browser) {
// //         await browser.close();
// //     }
// // });