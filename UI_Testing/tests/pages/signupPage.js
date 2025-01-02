const signupLocators = require('../locators/signupLocators');

class SignupPage {
    constructor(page) {
        if (!page) {
            throw new Error('Page instance is required');
        }
        this.page = page;
    }

    async navigateToUrl(url) {
        await this.page.goto(url, { timeout: 10000 });
    }

    async openSignupModal() {
        await this.page.click(signupLocators.signupButton);
        console.log('Clicked on the "Sign up" link');

        // Wait for the modal to appear
        await this.page.waitForSelector(signupLocators.signupModal, { state: 'visible', timeout: 5000 });
    }

    async isSignupModalVisible() {
        const isModalVisible = await this.page.isVisible(signupLocators.signupModal);
        console.log(`Modal visibility state: ${isModalVisible}`);
        return isModalVisible;
    }
}

module.exports = SignupPage;
