// pages/logoutPage.js

class LogoutPage {
  constructor(page, locators) {
    this.page = page;
    this.locators = locators;
  }

  // Method to login with the given credentials
  async login(username, password) {
    await this.page.click(this.locators.loginButton);
    await this.page.fill(this.locators.usernameField, username);
    await this.page.fill(this.locators.passwordField, password);
    await this.page.click(this.locators.loginSubmitButton);
  }

  // Method to click the logout button
  async clickLogoutButton() {
    await this.page.click(this.locators.logoutButton);
  }

  // Method to confirm logout
  async confirmLogout() {
    const confirmationMessageVisible = await this.page.locator(this.locators.confirmationMessage).isVisible();
    if (confirmationMessageVisible) {
      await this.page.click(this.locators.confirmLogoutButton);  // Click on "OK" to confirm logout
    }
  }

  // Method to verify if the user is logged out
  async isLoggedOut() {
    const loginButtonVisible = await this.page.isVisible(this.locators.loginButton);
    return loginButtonVisible;
  }
  
}



module.exports = LogoutPage;
