// tests/steps/loginSteps.js
const { Given, When, Then } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');

let browser;
let page;

Given('Providing valid url', async function () {
  browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  page = await context.newPage();
  
  // Use explicit timeout for page navigation
  await page.goto('https://demoblaze.com/', { timeout: 30000 });  // Set to 30 seconds for page load
});

When('Providing valid username and password', async function () {
  await page.click('#login2', { timeout: 30000 });  // 30 seconds for login button click
  await page.waitForSelector('#logInModal', { timeout: 30000 });  // Wait for login modal
  await page.fill('#loginusername', 'panvol', { timeout: 30000 });  // 30 seconds for username fill
  await page.fill('#loginpassword', 'test@123', { timeout: 30000 });  // 30 seconds for password fill
});

Then('Clicking login button', async function () {
  await page.click('button[onclick="logIn()"]', { timeout: 30000 });  // 30 seconds for login button click
  await page.waitForSelector('#nameofuser', { timeout: 30000 });  // Wait for user greeting
  const userGreeting = await page.textContent('#nameofuser');  // Get user greeting text

  if (!userGreeting.includes('Welcome panvol')) {
    throw new Error('Login failed or greeting not found');
  }
  console.log('Login successful!');
  await browser.close();
});
