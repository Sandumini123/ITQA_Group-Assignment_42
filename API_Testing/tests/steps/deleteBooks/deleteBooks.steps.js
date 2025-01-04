


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

When('I delete the book with ID {string}', async function (bookId) {
    response = await bookAPI.deleteBook(bookId);
    console.log(`DeleteBook Response for ID ${bookId}:`, response);
});

Then('the response status code should be {int}', async function (expectedStatus) {
    console.log('Actual Response Status:', response.status);
    expect(response.status).toBe(expectedStatus);
});

Then('the response message should be {string}', async function (expectedMessage) {
    console.log('Actual Response Body:', response.body);
    expect(response.body.message || response.body.error).toBe(expectedMessage);
});

// Additional test steps from the first code
Given('Delete book API is running', async function () {
    try {
        bookAPI = new BookAPI();
        console.log('Delete Book API initialized successfully');
    } catch (error) {
        console.error(`Error initializing Delete Book API: ${error.message}`);
        throw error;
    }
});

