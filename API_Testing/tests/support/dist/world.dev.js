"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = require('@cucumber/cucumber'),
    setWorldConstructor = _require.setWorldConstructor;

var _require2 = require('@playwright/test'),
    request = _require2.request;

var CustomWorld = function CustomWorld() {
  _classCallCheck(this, CustomWorld);

  this.request = request;
};

setWorldConstructor(CustomWorld);