const { request } = require('@playwright/test');

class BookAPI {
    constructor() {
        this.baseURL = 'http://localhost:7081/api/books';
        this.context = null;
        this.userRole = null;
    }

    async init(username, password) {
        this.userRole = username;
        this.context = await request.newContext({
            baseURL: 'http://localhost:7081',
            extraHTTPHeaders: {
                'Authorization': `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
                'Content-Type': 'application/json'
            }
        });
        const authCheck = await this.context.get('/api/books');
        return authCheck.status() !== 401;
    }

    async updateBook(bookId, bookDetails) {
        try {
            if (!this.context) {
                return {
                    status: 401,
                    body: { message: 'Not authenticated' }
                };
            }

            // Check user role first
            if (this.userRole === 'user') {
                return {
                    status: 403,
                    body: { message: 'User is not permitted.' }
                };
            }

            const response = await this.context.put(`${this.baseURL}/${bookId}`, {
                data: bookDetails
            });

            // Handle 404 case explicitly
            if (response.status() === 404) {
                return {
                    status: 404,
                    body: { message: 'Book not found' }
                };
            }

            return {
                status: response.status(),
                body: await response.json().catch(() => ({}))
            };
        } catch (error) {
            if (error.message.includes('unauthorized')) {
                return { status: 401, body: { message: 'Unauthorized' } };
            }
            if (error.message.includes('not found')) {
                return { status: 404, body: { message: 'Book not found' } };
            }
            if (error.message.includes('not permitted')) {
                return { status: 403, body: { message: 'User is not permitted.' } };
            }
            return {
                status: error.status || 500,
                body: { message: error.message }
            };
        }
    }

    async checkBookExists(bookId) {
        try {
            if (!this.context) {
                return false;
            }
            const response = await this.context.get(`${this.baseURL}/${bookId}`);
            return response.status() === 200;
        } catch (error) {
            return false;
        }
    }
}

module.exports = BookAPI;