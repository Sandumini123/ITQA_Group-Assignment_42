const { Given, When, Then, setWorldConstructor } = require('@cucumber/cucumber');
const { expect } = require('chai');
const { chromium } = require('playwright');
const CartPage = require('../pages/cartPage');

// World constructor to set up Playwright's browser and page
setWorldConstructor(function() {
  this.browser = null;
  this.page = null;
  this.cartPage = null;
});

Given('I am on the home page', { timeout: 20000 }, async function() {
  console.log('Launching browser...');
  this.browser = await chromium.launch({ headless: false });
  console.log('Opening new page...');
  this.page = await this.browser.newPage();
  this.cartPage = new CartPage(this.page);
  console.log('Navigating to home page...');
  await this.cartPage.openHomePage();
  console.log('Home page loaded.');
});


When('I select the {string} category', async function(category) {
  if (category === 'Phones') {
    console.log('Clicking on Phones category...');
    await this.cartPage.clickPhonesCategory();
  }
});

Then('I should see all phones displayed', async function() {
  console.log('Waiting for the list of phones to appear...');
  const phoneItems = await this.page.$$('div#tbodyid .card-title'); // Select all phone items by CSS
});

When('I select a product', async function() {
  console.log('Selecting a product...');
  await this.cartPage.selectProduct();
});

When('I am navigated to the product page', async function() {
  const currentUrl = await this.cartPage.getCurrentUrl();
  console.log(`Current URL: ${currentUrl}`);
  expect(currentUrl).to.equal('https://demoblaze.com/prod.html?idp_=1');
});

When('I click the "Add to cart" button', async function() {
  await this.cartPage.clickAddToCartButton();
});

Then('I should see a success message {string}', async function(message) {
  await this.cartPage.acceptAlert();
  console.log('Product successfully added to cart');
});

When('I click the "Cart" tab', async function() {
  await this.cartPage.clickCartTab();
});



Then('I should see the product in the cart', async function() {
  console.log('Verifying product in the cart...');
  await this.cartPage.verifyProductInCart();
});


When('I delete the product from the cart', async function() {
  await this.cartPage.deleteProductFromCart();
});

Then('I should see the cart is empty', async function() {
  await this.cartPage.verifyCartIsEmpty();
});
