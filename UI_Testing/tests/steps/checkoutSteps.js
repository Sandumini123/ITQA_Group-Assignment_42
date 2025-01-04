const { Given, When, Then } = require('@cucumber/cucumber');
const checkoutPage = require('../pages/checkoutPage');
const { clear } = require('console');

//Scenario: Complete a purchase with valid data

Given('I am on the index page main page', async function ()  {
  await checkoutPage.navigateToIndexPage();
});

When('I click on a product', async function () {
  await checkoutPage.clickOnProduct();
});

When('I proceed to the product page', async function () {
  await checkoutPage.navigateToProductPage();
});

When('I add a product to the cart', async function () {
    await checkoutPage.addProductToCart();
  });

When('I navigate to the cart page',async function () {
    await checkoutPage.navigateToCartPage();
  })

When('I proceed to checkout', async function () {
    await checkoutPage.proceedToCheckout();
});

When('I fill the form with valid data', async function () {
    await checkoutPage.fillCheckoutForm();
  });
  
When('I should see a confirmation message', async function () {
    await checkoutPage.verifyOrderConfirmation();
});

When('I click ok', async function () {
    await checkoutPage.clickOnOk();
});

Then('I should proceed to index page', async function () {
    await checkoutPage.navigateBackToIndexPage();

});
    




//Scenario: Submit empty checkout form

Given('I am on the Cart page with items', async function () {
  await checkoutPage.navigateToCartPage(); 
});

When('I attempt to place an order by clicking place order button', async function () {
  await checkoutPage.proceedToCheckout();
});

When('I enter null values to the given form', async function () {
  await checkoutPage.enterNullValuesInForm();
});

When('I click purchese button', async function () {
    await checkoutPage.purchaseButton();
});

Then('it should give a empty error message', async function () {
  await checkoutPage.verifyErrorMessageForEmptyFields();
});


//Scenario:checking whether the year of the credit card is valid

When('I enter a future year to the year column', async function () {
    await checkoutPage.enterFutureYearInForm();
  });

When('I click the purchese button', async function () {
    await checkoutPage.purchaseButton();
});
  
Then('it should give an error message', async function () {
    await checkoutPage.verifyErrorMessageForInvalidYear();
});

