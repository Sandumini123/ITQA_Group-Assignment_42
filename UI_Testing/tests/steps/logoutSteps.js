// steps/logoutSteps.js

const { Given, When, Then, After } = require('@cucumber/cucumber');
const { expect } = require('chai');
const { chromium } = require('playwright');
const locators = require('../locators/logoutLocators'); // Adjusted the path to locators
const LogoutPage = require('../pages/logoutPage'); // Adjusted the path to pages

let browser;
let page;
let logoutPage;

Given('I am on the homepage', async function () {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  
  // Increase the timeout to 10 seconds (10000 milliseconds)
  await page.goto('https://demoblaze.com', { timeout: 30000 }); 
  
  logoutPage = new LogoutPage(page, locators);
});


When('I login with username {string} and password {string}', async function (username, password) {
  await logoutPage.login(username, password);
});

When('I click on the logout button', async function () {
  await logoutPage.clickLogoutButton();
});

// When('I confirm the logout', async function () {
//   await logoutPage.confirmLogout();
// });
// steps/logoutSteps.js

When('I confirm the logout', async function () {
  const confirmationMessageVisible = await page.isVisible(locators.confirmationMessage);

  if (!confirmationMessageVisible) {
    throw new Error(
      `Confirmation message with locator "${locators.confirmationMessage}" is not displayed.`
    );
  }

  // Intentionally throw an error to simulate a failure
  throw new Error('Simulated failure: User could not confirm logout.');
});


Then('I should be logged out successfully', async function () {
  const loggedOut = await logoutPage.isLoggedOut();
  expect(loggedOut).to.be.true;  // Verifying that the login button is visible after logout
});

