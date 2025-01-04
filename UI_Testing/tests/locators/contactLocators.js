module.exports = {
  contactButton: '.nav-link[data-target="#exampleModal"]', // Contact button in the navbar
  contactForm: '#exampleModal .modal-content', // Modal content of the contact form
  sendMessageButton: '#exampleModal .btn.btn-primary', // "Send Message" button inside the contact form
  // No need for popupMessage or alert handling since the alert is a browser dialog

  // Locators for input fields
  contactEmailField: '#recipient-email', // Locator for "Contact Email" field
  contactNameField: '#recipient-name', // Locator for "Contact Name" field
  messageField: '#message-text', // Locator for "Message" field

  closeButton: '#exampleModal .btn.btn-secondary', // "Close" button in the contact form

};