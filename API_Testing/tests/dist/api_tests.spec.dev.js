"use strict";

var _require = require('@playwright/test'),
    test = _require.test,
    expect = _require.expect;

test('Demo API Test', function _callee(_ref) {
  var request, response, text;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          request = _ref.request;
          _context.next = 3;
          return regeneratorRuntime.awrap(request.get('https://reqres.in/api/users/2'));

        case 3:
          response = _context.sent;
          expect(response.status()).toBe(200);
          _context.next = 7;
          return regeneratorRuntime.awrap(response.text());

        case 7:
          text = _context.sent;
          expect(text).toContain('Janet');
          _context.t0 = console;
          _context.next = 12;
          return regeneratorRuntime.awrap(response.json());

        case 12:
          _context.t1 = _context.sent;

          _context.t0.log.call(_context.t0, _context.t1);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  });
});