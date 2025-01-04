const locators = require('../locators/contactLocators');

class ContactPage {
  constructor(page) {
    this.page = page;
  }

  async openContactForm() {
    await page.waitForSelector(locators.contactButton, { state: 'visible', timeout: 15000 });  // Increase the timeout to 15 seconds
    await page.click(locators.contactButton);
    await page.waitForSelector(locators.contactForm, { state: 'visible', timeout: 15000 });


  }
}

module.exports = ContactPage;
