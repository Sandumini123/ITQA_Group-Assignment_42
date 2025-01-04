"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('@playwright/test'),
    request = _require.request;

var BookAPI =
/*#__PURE__*/
function () {
  function BookAPI() {
    _classCallCheck(this, BookAPI);

    this.baseURL = 'http://localhost:7081/api/books';
    this.context = null;
  }

  _createClass(BookAPI, [{
    key: "init",
    value: function init(username, password) {
      return regeneratorRuntime.async(function init$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(request.newContext({
                baseURL: 'http://localhost:7081',
                extraHTTPHeaders: {
                  'Authorization': "Basic ".concat(Buffer.from("".concat(username, ":").concat(password)).toString('base64')),
                  'Content-Type': 'application/json'
                }
              }));

            case 2:
              this.context = _context.sent;

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "createBook",
    value: function createBook(bookDetails) {
      var response;
      return regeneratorRuntime.async(function createBook$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return regeneratorRuntime.awrap(this.context.post(this.baseURL, {
                data: bookDetails
              }));

            case 3:
              response = _context2.sent;
              _context2.t0 = response.status();
              _context2.next = 7;
              return regeneratorRuntime.awrap(response.json()["catch"](function () {
                return {};
              }));

            case 7:
              _context2.t1 = _context2.sent;
              return _context2.abrupt("return", {
                status: _context2.t0,
                body: _context2.t1
              });

            case 11:
              _context2.prev = 11;
              _context2.t2 = _context2["catch"](0);
              console.error('Error creating book:', _context2.t2);
              return _context2.abrupt("return", {
                status: 500,
                body: {
                  message: _context2.t2.message
                }
              });

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this, [[0, 11]]);
    }
  }, {
    key: "getAllBooks",
    value: function getAllBooks() {
      var response;
      return regeneratorRuntime.async(function getAllBooks$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return regeneratorRuntime.awrap(this.context.get(this.baseURL));

            case 3:
              response = _context3.sent;
              _context3.t0 = response.status();
              _context3.next = 7;
              return regeneratorRuntime.awrap(response.json()["catch"](function () {
                return {};
              }));

            case 7:
              _context3.t1 = _context3.sent;
              return _context3.abrupt("return", {
                status: _context3.t0,
                body: _context3.t1
              });

            case 11:
              _context3.prev = 11;
              _context3.t2 = _context3["catch"](0);
              console.error('Error fetching all books:', _context3.t2);
              return _context3.abrupt("return", {
                status: 500,
                body: {
                  message: _context3.t2.message
                }
              });

            case 15:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this, [[0, 11]]);
    }
  }]);

  return BookAPI;
}();

module.exports = BookAPI;