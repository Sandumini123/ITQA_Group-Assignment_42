// loginPage.js
const { chromium } = require('@playwright/test');
const loginLocators = require('../locators/loginLocators');

class LoginPage {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async launchBrowser() {
    console.log('Launching browser...');
    this.browser = await chromium.launch({ headless: false });
    const context = await this.browser.newContext();
    this.page = await context.newPage();
    console.log('Browser launched');
  }
 // loginPage.js
async navigateToUrl(url) {
  await this.page.goto(url, { timeout: 10000 }); // Set timeout to 10 seconds for this action
}


  async openLoginModal() {
    await this.page.click(loginLocators.loginButton);
    await this.page.waitForSelector(loginLocators.loginModal);
  }

  async enterCredentials(username, password) {
    await this.page.fill(loginLocators.usernameInput, username);
    await this.page.fill(loginLocators.passwordInput, password);
  }

  async submitLogin() {
    await this.page.click(loginLocators.loginSubmitButton);
  }

  async verifyLoginSuccess(username) {
    await this.page.waitForSelector(loginLocators.userGreeting, { timeout: 10000 });
    const userGreeting = await this.page.textContent(loginLocators.userGreeting);
    if (!userGreeting.includes(`Welcome ${username}`)) {
      throw new Error('Login failed or greeting not found');
    }
    console.log('Login successful!');
  }

  async closeBrowser() {
    await this.browser.close();
  }
}

module.exports = new LoginPage();
