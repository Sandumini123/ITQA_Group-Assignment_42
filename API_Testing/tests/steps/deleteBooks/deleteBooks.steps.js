


const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BookAPI = require('../../../src/pages/deleteBooks/dist/BookAPI_For_Delete');

setDefaultTimeout(30 * 1000);

let bookAPI;
let response;

Given('I am logged in as an authorized admin user', async function () {
    bookAPI = new BookAPI();
    await bookAPI.init('admin', 'password');
});

Given('I am logged in as an unauthorized user', async function () {
    bookAPI = new BookAPI();
    await bookAPI.init('user', 'password');
});

Given('I am not logged in', async function () {
    bookAPI = new BookAPI();
    await bookAPI.init(null, null);
});

When('I delete the book with ID {int}', async function (bookId) {
    response = await bookAPI.deleteBook(bookId.toString());
    console.log(`DeleteBook Response for ID ${bookId}:`, response);
});

When('I try to delete a book without authentication', async function () {
    response = await bookAPI.deleteBookWithoutAuth('103');
    console.log('Response for unauthenticated delete:', response);
});

//
Then('the response status code should be {int}', async function (expectedStatus) {
    console.log('Actual Response Status:', response.status);
    expect(response.status).toBe(expectedStatus);
});

Then('the response message should be {string}', async function (expectedMessage) {
    console.log('Actual Response Body:', response.body);
    expect(response.body.message || response.body.error).toBe(expectedMessage);
});



