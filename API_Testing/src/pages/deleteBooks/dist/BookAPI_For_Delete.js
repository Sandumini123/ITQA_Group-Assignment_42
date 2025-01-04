const { request } = require('@playwright/test');

class BookAPI {
  constructor() {
    this.baseURL = 'http://localhost:7081/api/books';
    this.context = null;
  }

  async init(username, password) {
    try {
      await this.waitForBackendService();
      if (username && password) {
        this.context = await request.newContext({
          baseURL: 'http://localhost:7081',
          extraHTTPHeaders: {
            'Authorization': `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
            'Content-Type': 'application/json'
          }
        });
      } else {
        console.log('Initializing without credentials (unauthenticated requests).');
        this.context = null;
      }
    } catch (error) {
      console.error('Error initializing BookAPI:', error);
      throw new Error('Failed to initialize BookAPI');
    }
  }

  async waitForBackendService(maxRetries = 5, interval = 2000) {
    for (let i = 0; i < maxRetries; i++) {
      try {
        const response = await fetch(this.baseURL);
        if (response.status === 401) {
          return true;
        }
      } catch (error) {
        console.log(`Waiting for backend service... Attempt ${i + 1}/${maxRetries}`);
        if (i === maxRetries - 1) {
          throw new Error('Backend service not available. Please ensure the JAR file is running.');
        }
        await new Promise((resolve) => setTimeout(resolve, interval));
      }
    }
  }

  async deleteBook(bookId) {
    if (!this.context) {
      throw new Error('API context is not initialized. Call init() first.');
    }
    if (!/^\d+$/.test(bookId)) {
      console.warn(`Invalid book ID format: ${bookId}`);
      return {
        status: 400,
        body: { message: "Invalid parameter 'id'." }
      };
    }

    try {
      const response = await this.context.delete(`${this.baseURL}/${bookId}`);
      const responseBody = await response.json().catch(() => ({}));
      return {
        status: response.status(),
        body: responseBody
      };
    } catch (error) {
      console.error('Error deleting book:', error);
      return {
        status: 500,
        body: { message: error.message }
      };
    }
  }

  async deleteBookWithoutAuth(bookId) {
    try {
      const response = await fetch(`${this.baseURL}/${bookId}`, { method: 'DELETE' });
      const responseBody = await response.json().catch(() => ({}));
      return {
        status: response.status,
        body: responseBody
      };
    } catch (error) {
      console.error('Error deleting book without auth:', error);
      return {
        status: 500,
        body: { message: error.message }
      };
    }
  }
}


///check

module.exports = BookAPI;