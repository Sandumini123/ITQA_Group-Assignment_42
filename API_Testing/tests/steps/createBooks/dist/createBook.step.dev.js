"use strict";

var _require = require('@cucumber/cucumber'),
    Given = _require.Given,
    When = _require.When,
    Then = _require.Then,
    setDefaultTimeout = _require.setDefaultTimeout;

var _require2 = require('@playwright/test'),
    expect = _require2.expect;

var BookAPI = require('../../../src/pages/createBooks/BookAPI_For_Post'); // Increase timeout to 30 seconds


setDefaultTimeout(30 * 1000);
var bookAPI;
var response;
Given('I am logged in as {string} with password {string}', function _callee(username, password) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          bookAPI = new BookAPI();
          _context.next = 4;
          return regeneratorRuntime.awrap(bookAPI.init(username, password));

        case 4:
          _context.next = 10;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          console.error("Error during login: ".concat(_context.t0.message));
          throw _context.t0;

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
When('I create a book with the following details:', function _callee2(dataTable) {
  var rows, headers, values, bookDetails;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          rows = dataTable.rawTable; // Get the raw table as a 2D array

          headers = rows[0]; // The first row contains the column names

          values = rows[1]; // The second row contains the values

          bookDetails = {}; // Initialize an empty object to store key-value pairs
          // Loop through the headers and assign values

          headers.forEach(function (header, index) {
            bookDetails[header] = values[index]; // Map headers to their corresponding values
          });
          _context2.prev = 5;
          _context2.next = 8;
          return regeneratorRuntime.awrap(bookAPI.createBook(bookDetails));

        case 8:
          response = _context2.sent;
          _context2.next = 15;
          break;

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](5);
          console.error("Error during book creation: ".concat(_context2.t0.message));
          throw _context2.t0;

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[5, 11]]);
});
Then('the response status code should be {int}', function _callee3(statusCode) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          expect(response.status).toBe(statusCode);

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
});
Then('the response message should be {string}', function _callee4(message) {
  var responseBody;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(response.json());

        case 2:
          responseBody = _context4.sent;
          expect(responseBody.message).toBe(message);

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
}); // Additional Scenarios

When('I create a book without bookname', function _callee5() {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(bookAPI.createBook({
            author: "Author Name"
          }));

        case 3:
          response = _context5.sent;
          _context5.next = 10;
          break;

        case 6:
          _context5.prev = 6;
          _context5.t0 = _context5["catch"](0);
          console.error("Error during book creation: ".concat(_context5.t0.message));
          throw _context5.t0;

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
When('I create a book without author', function _callee6() {
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(bookAPI.createBook({
            title: "Book Title"
          }));

        case 3:
          response = _context6.sent;
          _context6.next = 10;
          break;

        case 6:
          _context6.prev = 6;
          _context6.t0 = _context6["catch"](0);
          console.error("Error during book creation: ".concat(_context6.t0.message));
          throw _context6.t0;

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
When('I create a new book with the existing bookname and author', function _callee7() {
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(bookAPI.createBook({
            title: "Existing Book",
            author: "Existing Author"
          }));

        case 3:
          response = _context7.sent;
          _context7.next = 10;
          break;

        case 6:
          _context7.prev = 6;
          _context7.t0 = _context7["catch"](0);
          console.error("Error during book creation: ".concat(_context7.t0.message));
          throw _context7.t0;

        case 10:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 6]]);
});