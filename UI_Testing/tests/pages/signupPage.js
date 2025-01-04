const signupLocators = require('../locators/signupLocators');

class SignUpPage {
    constructor(page) {
      this.page = page;
      this.locators = require('../locators/signupLocators');
    }
  
    async openHomePage() {
      await this.page.goto('https://demoblaze.com/');
    }
  
    async clickSignUpButton() {
      await this.page.waitForSelector(this.locators.signUpButton, { state: 'visible' });
      await this.page.click(this.locators.signUpButton);
    }
  
    async fillUsername(username) {
      await this.page.fill(this.locators.usernameField, username);
    }
  
    async fillPassword(password) {
      await this.page.fill(this.locators.passwordField, password);
    }
  
    async submitSignUpForm() {
      await this.page.click(this.locators.signUpSubmitButton);
    }
  
    async verifyAlertMessage(expectedMessage) {
      this.page.on('dialog', async (dialog) => {
        const message = dialog.message();
        if (message !== expectedMessage) {
          throw new Error(`Expected alert message "${expectedMessage}", got "${message}"`);
        }
        await dialog.accept();
      });
    }
  }
  
  module.exports = SignUpPage;
