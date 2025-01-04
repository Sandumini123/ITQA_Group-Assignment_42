// locators/logoutLocators.js

module.exports = {
  // Login Form Locators
  loginButton: '#login2',  // Login button locator
  usernameField: '#loginusername',  // Username input field
  passwordField: '#loginpassword',  // Password input field
  loginSubmitButton: '#logInModal .btn-primary',  // Submit button for login

  // Logout Button and Confirmation
  logoutButton: '#logout2',  // Logout button locator
  confirmationMessage: 'Are you sure you want to logout',  // Logout confirmation text
  confirmLogoutButton: 'button:has-text("OK")',  // Confirm logout button
};
