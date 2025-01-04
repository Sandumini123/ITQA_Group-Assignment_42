const { Given, When, Then } = require('@cucumber/cucumber');

Given('checking demo', function () {
  console.log('Test started');
});

When('print some message', function () {
  console.log('Test is running');
});

Then('result values', function () {
  console.log('Test passed');
});


