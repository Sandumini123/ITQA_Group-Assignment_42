const { Given, When, Then } = require('@cucumber/cucumber');
const SignupPage = require('../pages/signupPage');

let signupPage;

Given('Navigating to the homepage', async function () {
    const { chromium } = require('playwright');
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    this.page = page; // Attach the page to the Cucumber context
    signupPage = new SignupPage(page);

    await signupPage.navigateToUrl('https://demoblaze.com/');
    console.log('Homepage launched successfully');
});

When('Clicking the "Sign up" link in the navigation bar', async function () {
    await signupPage.openSignupModal();
});

Then('The "Sign up" modal should appear on the screen', async function () {
    const isSignupModalVisible = await signupPage.isSignupModalVisible();
    if (!isSignupModalVisible) {
        // Log the modal's HTML content for debugging
        const modalContent = await this.page.innerHTML(signupLocators.signupModal);
        console.log('Modal content:', modalContent);
        throw new Error('Sign up modal did not appear');
    }
    console.log('Sign up modal appeared successfully!');
});
