// tests/support/hooks.js
const { setDefaultTimeout } = require('@cucumber/cucumber');

// Set the default timeout globally to 30 seconds (30000 ms) to cover all steps
setDefaultTimeout(30000);  // 30 seconds
