const { request } = require('@playwright/test');

class GetBooksAPI {
    constructor() {
        this.baseURL = 'http://localhost:7081/api/books';
        this.context = null;
    }

    async init(username, password) {
        this.context = await request.newContext({
            baseURL: 'http://localhost:7081',
            extraHTTPHeaders: {
                'Authorization': `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
                'Content-Type': 'application/json'
            }
        });
    }

    async getAllBooks() {
        try {
            const response = await this.context.get(this.baseURL);
            return {
                status: response.status(),
                body: await response.json().catch(() => ({}))
            };
        } catch (error) {
            console.error('Error fetching all books:', error);
            return {
                status: 500,
                body: { message: error.message }
            };
        }
    }

    async getBookById(bookId) {
        try {
            const response = await this.context.get(`${this.baseURL}/${bookId}`);
            return {
                status: response.status(),
                body: await response.json().catch(() => ({}))
            };
        } catch (error) {
            console.error(`Error fetching book with ID ${bookId}:`, error);
            return {
                status: 500,
                body: { message: error.message }
            };
        }
    }

    async getBooksByAuthor(author) {
        try {
            const response = await this.context.get(`${this.baseURL}?author=${encodeURIComponent(author)}`);
            return {
                status: response.status(),
                body: await response.json().catch(() => ({}))
            };
        } catch (error) {
            console.error(`Error fetching books by author ${author}:`, error);
            return {
                status: 500,
                body: { message: error.message }
            };
        }
    }

    async getBooksByTitle(title) {
        try {
            const response = await this.context.get(`${this.baseURL}?title=${encodeURIComponent(title)}`);
            return {
                status: response.status(),
                body: await response.json().catch(() => ({}))
            };
        } catch (error) {
            console.error(`Error fetching books by title ${title}:`, error);
            return {
                status: 500,
                body: { message: error.message }
            };
        }
    }
}

module.exports = GetBooksAPI;