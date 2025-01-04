// cucumber.js
module.exports = {
  default: `--publish-quiet --format progress --format json:./reports/cucumber-report.json --timeout 20000 --require tests/hooks.js --require tests/steps/*.js`
};
