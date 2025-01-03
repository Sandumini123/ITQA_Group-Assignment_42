const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const locators = require('../locators/signupLocators');

setDefaultTimeout(20000);

let browser, page;

Given('I am navigate to home page', async function () {
  browser = await chromium.launch({ headless: false }); // Set headless: true in production
  const context = await browser.newContext();
  page = await context.newPage();
  await page.goto('https://demoblaze.com/');
});

When('I click the "Sign Up" tab', async function () {
  await page.waitForSelector(locators.signUpButton, { state: 'visible', timeout: 20000 });
  await page.click(locators.signUpButton);
});

Then('It should display the Sign Up form', async function () {
    // Wait for the modal content to appear and be visible
    await page.waitForSelector(locators.signUpForm, { state: 'visible', timeout: 20000 });

    const formVisible = await page.isVisible(locators.signUpForm);
    if (!formVisible) {
        throw new Error('The Sign Up form is not displayed.');
    }

    console.log('Sign Up form displayed successfully.');
});


Then('I enter the username field with {string}', async function (username) {
  await page.fill(locators.usernameField, username);
  console.log(`Entered username: ${username}`);
});

Then('I enter the password field with {string}', async function (password) {
  await page.fill(locators.passwordField, password);
  console.log(`Entered password: ${password}`);
});

Then('I click the "Sign Up" button', async function () {
  await page.click(locators.signUpSubmitButton);
});

Then('It should display an alert message {string}', async function (expectedAlertMessage) {
  page.on('dialog', async (dialog) => {
    const message = dialog.message();
    if (message !== expectedAlertMessage) {
      throw new Error(`Expected alert message "${expectedAlertMessage}", got "${message}"`);
    }
    console.log(`Alert message displayed: ${message}`);
    await dialog.accept();
  });
});