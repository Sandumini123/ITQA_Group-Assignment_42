const { expect } = require('chai');
const locators = require('../locators/cartLocators');

class CartPage {
  constructor(page) {
    this.page = page; // Assign page object to this.page
  }

  // Open the home page
  async openHomePage() {
    await this.page.goto(locators.homePageUrl);
  }

  // Click the Phones category
  async clickPhonesCategory() {
    console.log('Waiting for Phones category to be visible...');
    await this.page.waitForSelector(locators.phonesCategory, { state: 'visible', timeout: 15000 });
    console.log('Phones category is visible, clicking...');
    await this.page.click(locators.phonesCategory);
  }

  // Verify that the title of the page matches the expected title
  // async verifyPhonesTitle(Phones) {
  //   const title = await this.page.textContent(locators.phonesTitle);
  //   expect(title).to.include(Phones);
  // }
  // Verify that the title of the page matches the expected title
async verifyPhonesTitle(expectedTitle) {
  console.log('Waiting for the title to appear...');
  const titleElement = await this.page.waitForSelector('.title', { state: 'visible', timeout: 15000 }); // Wait for title to appear
  const title = await titleElement.textContent(); // Get the title text
  console.log(`Title found: ${title}`);
  expect(title.trim()).to.include(expectedTitle); // Verify the title
}

async selectProduct() {
  console.log('Selecting the first product...');
  await this.page.waitForSelector(locators.productLink, { state: 'visible', timeout: 15000 });
  await this.page.click(locators.productLink); // Click the first product link
}

// Click the "Add to cart" button on the product page
async clickAddToCartButton() {
  console.log('Clicking the "Add to cart" button...');
  await this.page.waitForSelector(locators.addToCartButton, { state: 'visible', timeout: 15000 });
  await this.page.click(locators.addToCartButton);
}

// Get the current page URL
async getCurrentUrl() {
  return await this.page.url();
}

// Accept the browser alert (success message after adding to cart)
async acceptAlert() {
  const alertMessage = await this.page.waitForEvent('dialog', { timeout: 5000 });
  console.log(`Alert message: ${alertMessage.message()}`);
  await alertMessage.accept();
}


//deleting product

async clickCartTab() {
  console.log('Navigating to the cart page...');
  await this.page.waitForSelector(locators.cartTab, { state: 'visible', timeout: 15000 });
  await this.page.click(locators.cartTab);
  await this.page.waitForURL(locators.cartPageUrl, { timeout: 15000 });
  await this.page.waitForSelector(locators.cartItems, { state: 'visible', timeout: 15000 }); // Ensure items are loaded
}

async verifyProductInCart() {
  console.log('Checking for product in the cart...');
  await this.page.waitForSelector(locators.cartItems, { state: 'visible', timeout: 15000 });
  const cartItems = await this.page.$$(locators.cartItems);
  expect(cartItems.length).to.be.greaterThan(0, 'No items found in the cart');

  // Verify the specific product (e.g., Samsung galaxy s6)
  const productTitle = await this.page.textContent('tbody#tbodyid tr.success td:nth-child(2)');
  console.log(`Product in cart: ${productTitle}`);
  expect(productTitle).to.include('Samsung galaxy s6', 'The expected product is not in the cart');
}

async deleteProductFromCart() {
  console.log('Deleting product from the cart...');
  await this.page.waitForSelector(locators.deleteButton, { state: 'visible', timeout: 15000 });
  await this.page.click(locators.deleteButton);
  console.log('Product deleted.');
}

async verifyCartIsEmpty() {
  console.log('Verifying the cart is empty...');
  await this.page.waitForTimeout(2000);  // Ensure the page is updated
  const cartItems = await this.page.$$(locators.cartItems);
  console.log(`Cart items count after deletion: ${cartItems.length}`);
  expect(cartItems.length).to.equal(0, 'Cart is not empty');
}

}

module.exports = CartPage;
