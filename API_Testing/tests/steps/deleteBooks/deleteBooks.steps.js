


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

// When('I delete the book with ID {string}', async function (bookId) {
//     response = await bookAPI.deleteBook(bookId);
//     console.log(`DeleteBook Response for ID ${bookId}:`, response);
// });

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

Given('I am logged in as {string} with password {string}', async function (username, password) {
    bookAPI = new BookAPI();
    await bookAPI.init(username, password);
});

When('I send a DELETE request to {string} with valid user credentials and valid book id', async function (endpoint) {
    const validBookId = '123';
    response = await bookAPI.deleteBook(validBookId);
    console.log(`Delete request sent for book ID: ${validBookId}`);
});

When('I send a DELETE request to {string} with valid user credentials and non-existing book id', async function (endpoint) {
    const nonExistingBookId = '999999';
    response = await bookAPI.deleteBook(nonExistingBookId);
    console.log(`Delete request sent for non-existing book ID: ${nonExistingBookId}`);
});

When('I send a DELETE request to {string} with valid admin credentials and valid book id', async function (endpoint) {
    const validBookId = '123';
    response = await bookAPI.deleteBook(validBookId);
    console.log(`Admin delete request sent for book ID: ${validBookId}`);
});

When('I send a DELETE request to {string} with valid admin credentials and non-existing book id', async function (endpoint) {
    const nonExistingBookId = '999999';
    response = await bookAPI.deleteBook(nonExistingBookId);
    console.log(`Admin delete request sent for non-existing book ID: ${nonExistingBookId}`);
});

When('I send a DELETE request to {string} with valid admin credentials and invalid parameter type', async function (endpoint) {
    const invalidBookId = 'invalid-id';
    response = await bookAPI.deleteBook(invalidBookId);
    console.log(`Delete request sent with invalid book ID type: ${invalidBookId}`);
});

Then('I should receive a response for deleting a book with status code {int}', async function (expectedStatusCode) {
    expect(response.status).toBe(expectedStatusCode);
});

Then('the response should indicate the book was successfully deleted', async function () {
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
});

Then('the response should indicate the book was not found', async function () {
    expect(response.status).toBe(404);
});