const { request } = require('@playwright/test');

class BookAPI {
  constructor() {
      this.baseURL = 'http://localhost:7081/api/books';
      this.context = null;
  }

  async init(username, password) {
      try {
          this.context = await request.newContext({
              baseURL: 'http://localhost:7081',
              extraHTTPHeaders: {
                  'Authorization': `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
                  'Content-Type': 'application/json'
              }
          });
      } catch (error) {
          console.error('Error initializing API context:', error);
          throw error;
      }
  }

  async getBookById(bookId) {
      try {
          const response = await this.context.get(`${this.baseURL}/${bookId}`);
          const body = await response.json().catch(() => ({
              message: response.status() === 404 ? 'Book not found' : 'Unknown error'
          }));
          
          return {
              status: response.status(),
              body
          };
      } catch (error) {
          // Enhanced error handling
          if (error.response) {
              const errorBody = await error.response.json().catch(() => ({
                  message: error.response.status() === 404 ? 'Book not found' : 'Unknown error'
              }));
              
              return {
                  status: error.response.status(),
                  body: errorBody
              };
          }
          
          return {
              status: 500,
              body: { message: error.message }
          };
      }
  }

  async getBookByInvalidId(invalidId) {
      try {
          const response = await this.context.get(`${this.baseURL}/${invalidId}`);
          return {
              status: response.status(),
              body: await response.json().catch(() => ({
                  message: 'Invalid book ID format'
              }))
          };
      } catch (error) {
          return {
              status: 400,
              body: { message: 'Invalid book ID format' }
          };
      }
  }
}


module.exports = BookAPI;