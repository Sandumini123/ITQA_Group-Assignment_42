const { chromium } = require('@playwright/test');
const checkoutLocators = require('../locators/checkoutLocators');

class CheckoutPage {
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

  async navigateToIndexPage() {
    await this.launchBrowser();
    await this.page.goto('https://demoblaze.com/index.html',{ timeout: 10000 });
    await this.page.waitForLoadState();
    console.log("Navigation completed");
  }

  async navigateBackToIndexPage() {
    await this.page.goto('https://demoblaze.com/index.html',{ timeout: 10000 });
    await this.page.waitForLoadState();
    console.log("Navigation completed");
  }

  async clickOnProduct() {
    await this.page.click(checkoutLocators.productCard);
  }

  async navigateToProductPage() {
    await this.page.goto('https://demoblaze.com/prod.html?idp_=1');
  }

  async addProductToCart() {
    const test = await this.page.getByRole('link', { name: 'Add to cart' })
    test.click()
    await this.page.waitForSelector(checkoutLocators.cartModal);
  }

  async navigateToCartPage() {
    await this.launchBrowser();
    await this.page.goto('https://demoblaze.com/cart.html');
  }


  async proceedToCheckout() {
    await this.page.click(checkoutLocators.placeOrderButton);
    //await this.page.waitForSelector(checkoutLocators.checkoutForm);
  }

  async fillCheckoutForm() {
    await this.page.fill(checkoutLocators.nameInput, 'John Doe');
    await this.page.fill(checkoutLocators.countryInput, 'Sri Lanka');
    await this.page.fill(checkoutLocators.cityInput, 'Colombo');
    await this.page.fill(checkoutLocators.creditCardInput,'378282246310005');
    await this.page.fill(checkoutLocators.monthInput, 'January');
    await this.page.fill(checkoutLocators.yearInput, '2020');
    await this.page.click(checkoutLocators.purchaseButton); 
  }

  async enterNullValuesInForm(){
    await this.page.fill(checkoutLocators.nameInput, '  ');
    await this.page.fill(checkoutLocators.countryInput, '  ');
    await this.page.fill(checkoutLocators.cityInput, '  ');
    await this.page.fill(checkoutLocators.creditCardInput, '  ');
    await this.page.fill(checkoutLocators.monthInput, '  ');
    await this.page.fill(checkoutLocators.yearInput, '  ');
  }

  async enterFutureYearInForm() {
    const nextYear = new Date().getFullYear() + 1;  // This will always set the year to next year

    // Assuming the form fields are already filled, except the year which we will set to the future year
    await this.page.fill(checkoutLocators.nameInput, 'John Doe');
    await this.page.fill(checkoutLocators.countryInput, 'Neverland');
    await this.page.fill(checkoutLocators.cityInput, 'Fiction');
    await this.page.fill(checkoutLocators.creditCardInput, '1234 5678 9012 3456');
    await this.page.fill(checkoutLocators.monthInput, '12');
    await this.page.fill(checkoutLocators.yearInput, nextYear.toString());  // Convert year to string
}

  async verifyOrderConfirmation() {
    await this.page.waitForSelector(checkoutLocators.thankYouModal);
    const confirmationText = await this.page.textContent(checkoutLocators.thankYouMessage);
    if (!confirmationText.includes('Thank you for your purchase!')) {
      throw new Error('Order was not successful');
    }
  }

  async placeOrder() {
    await this.page.click(checkoutLocators.placeOrderButton);
  }

  async verifyErrorMessageForInvalidYear() {
    // Wait for an error message to appear or check the form state after submission
    const errorMessage = await this.page.textContent(locators.errorMessage);  // Assuming error message selector
    if (!errorMessage.includes('Invalid year')) {
        throw new Error('Expected error message for invalid year not found');
    }
}

  async verifyErrorMessageForEmptyFields() {
    const error = await this.page.textContent(checkoutLocators.errorMessageBox);
    if (!error.includes('Please fill out this field.')) {
      throw new Error('Expected error message not received');
    }
  }

  async closeBrowser() {
    await this.browser.close();
  }

  async clickOnOk() {
    await this.page.click(checkoutLocators.okButton);
  }

  async purchaseButton() {
    await this.page.click(checkoutLocators.purchaseButton);
  }

}

module.exports = new CheckoutPage();
