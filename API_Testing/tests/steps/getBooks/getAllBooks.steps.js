const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BookAPI = require('../../../src/pages/getBooks/dist/BookAPI_For_Get');

// Increase timeout to 30 seconds
setDefaultTimeout(30 * 1000);

let bookAPI;
let response;

Given('I am logged in as {string} with password {string}', async function (username, password) {
    try {
        bookAPI = new BookAPI();
        await bookAPI.init(username, password);
    } catch (error) {
        console.error(`Error during login: ${error.message}`);
        throw error;
    }
});

Given('the GetAllBooks API is up and running', async function () {
    try {
        bookAPI = bookAPI || new BookAPI();
        console.log('GetAllBooks API is ready for testing');
    } catch (error) {
        console.error('Failed to verify API status:', error);
        throw new Error('API is not accessible');
    }
});

When('I send a {string} GETBooks request to {string}', async function (credentialType, endpoint) {
    try {
        if (credentialType === 'invalid') {
            await bookAPI.init('invalid_user', 'invalid_password');
        }
        
        response = await bookAPI.getAllBooks();
        console.log(`Get books response (${credentialType}):`, response.status);
        // Log the full response for debugging
        console.log('Response body:', response.body);
    } catch (error) {
        console.error(`Error during GET books request (${credentialType}):`, error);
        response = {
            status: error.response?.status || 500,
            body: error.response?.body || {}
        };
    }
});

Then('the {string} GetBooks response status code should be {int}', async function (credentialType, expectedStatusCode) {
    try {
        expect(response.status).toBe(expectedStatusCode);
        console.log(`Status code verification passed for ${credentialType} credentials: ${expectedStatusCode}`);
    } catch (error) {
        console.error(`Status code verification failed for ${credentialType} credentials`);
        throw error;
    }
});

Then('the {string} response should contain a list of books or indicate no books are available', async function (credentialType) {
    try {
        if (credentialType === 'valid') {
            expect(response.body).toBeDefined();
            
            if (Array.isArray(response.body)) {
                // Verify each book has required properties
                response.body.forEach(book => {
                    expect(book).toHaveProperty('id');
                    expect(book).toHaveProperty('title');
                    expect(book).toHaveProperty('author');
                });
                console.log(`Found ${response.body.length} books in response`);
            } else {
                // Check for empty books message
                expect(response.body).toHaveProperty('message', 'No books available');
                console.log('No books available message verified');
            }
        } else {
            // For invalid credentials, we only check the status code
            // since the body might be empty or have a different structure
            expect(response.status).toBe(401);
            console.log('Unauthorized access verified through status code');
            
            // Log the actual response body for debugging
            console.log('Actual response body for invalid credentials:', response.body);
            
            // Check if response body exists and has any content
            if (response.body) {
                if (typeof response.body === 'string') {
                    expect(response.body).toContain('Unauthorized');
                } else if (typeof response.body === 'object') {
                    // Accept either an error message or empty object
                    const hasError = response.body.error || response.body.message || Object.keys(response.body).length === 0;
                    expect(hasError).toBeTruthy();
                }
            }
        }
    } catch (error) {
        console.error(`Error verifying response content for ${credentialType} credentials:`, error);
        console.error('Actual response:', response);
        throw error;
    }
});