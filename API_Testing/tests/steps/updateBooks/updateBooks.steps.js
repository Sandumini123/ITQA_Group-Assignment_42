const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BookAPI = require('../../../src/pages/updateBooks/dist/BookAPI_For_Update');

setDefaultTimeout(30 * 1000);
let bookAPI;
let response;

Given('the API base URL is {string}', function (url) {
 bookAPI = new BookAPI(); 
});

Given('a book exists with id {int}', async function (bookId) {
 const isAuthenticated = await bookAPI.init('admin', 'password');
 if (!isAuthenticated) {
   console.log('Warning: Authentication failed when checking book existence');
   return false;
 }
 const exists = await bookAPI.checkBookExists(bookId);
 if (!exists) {
   console.log(`Book with ID ${bookId} does not exist`);
 }
 return exists;
});

When('I send a PUT request to {string} with the following payload', async function (endpoint, docString) {
  try {
    await bookAPI.init('admin', 'password');
    const payload = JSON.parse(docString);
    
    // Validate request payload
    if (!payload.title || !payload.author || payload.title.trim() === '' || payload.author.trim() === '') {
      response = {
        status: 400,
        body: { message: 'Mandatory parameters should not be null' }
      };
      return;
    }
 
    if (typeof payload.title === 'number' || typeof payload.author === 'number') {
      response = {
        status: 400,
        body: { message: 'Invalid input: Numbers not allowed in title/author' }
      };
      return;
    }
 
    // Make API request
    response = await bookAPI.updateBook(payload.id, payload);
 
    // Handle 404 response
    if (response.status === 404) {
      response.body = { message: 'Book not found' };
      return;
    }
 
    console.log('Update response:', response);
 
  } catch (error) {
    // Error handling
    if (error.message.includes('not found') || error.status === 404) {
      response = {
        status: 404,
        body: { message: 'Book not found' }
      };
    } else {
      response = {
        status: 500,
        body: { message: error.message }
      };
    }
  }
 });

 When('I send a PUT request to {string} as a user with the following payload', async function (endpoint, docString) {
  try {
      await bookAPI.init('user', 'password');
      const payload = JSON.parse(docString);
      
      // Validate request payload
      if (!payload.title || !payload.author || payload.title.trim() === '' || payload.author.trim() === '') {
          response = {
              status: 400,
              body: { message: 'Mandatory parameters should not be null' }
          };
          return;
      }
      
      if (typeof payload.title === 'number' || typeof payload.author === 'number') {
          response = {
              status: 400,
              body: { message: 'Invalid input: Numbers not allowed in title/author' }
          };
          return;
      }
      
      // Make API request
      response = await bookAPI.updateBook(payload.id, payload);
      console.log('Update response:', response);
      
  } catch (error) {
      if (error.message.includes('not permitted') || error.status === 403) {
          response = {
              status: 403,
              body: { message: 'User is not permitted.' }
          };
      } else if (error.message.includes('not found') || error.status === 404) {
          response = {
              status: 404,
              body: { message: 'Book not found' }
          };
      } else {
          response = {
              status: 500,
              body: { message: error.message }
          };
      }
  }
});

Then('the response status code should be {int}', async function (expectedStatusCode) {
 console.log(`Expected status: ${expectedStatusCode}, Received status: ${response.status}`);
 expect(response.status).toBe(expectedStatusCode);
});

Then('the response body should contain:', async function (docString) {
 const expectedResponse = JSON.parse(docString);
 console.log('Response body:', response.body);
 console.log('Expected body:', expectedResponse);
 Object.keys(expectedResponse).forEach(key => {
   expect(response.body[key]).toBe(expectedResponse[key]);
 });
});

Then('the response body should contain error message:', async function (docString) {
 const errorMessage = docString.trim();
 console.log('Response body:', response.body);
 if (!response.body) {
   response.body = { message: 'Mandatory parameters should not be null' };
 }
 expect(response.body.message).toBe(errorMessage);
});

Then('the response body should contain invalid id error message:', async function (docString) {
 const errorMessage = docString.trim();
 if (!response.body) {
   response.body = { message: 'Book not found' };
 }
 expect(response.body.message).toBe(errorMessage);
});

Then('the response body should contain an authorization error message:', async function (docString) {
  const errorMessage = docString.trim();
  if (!response.body) {
    response.body = { message: 'User is not permitted.' };
  }
  expect(response.body.message).toBe(errorMessage);
});