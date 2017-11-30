"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (n, max) {
  var min = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  return n >= min && n <= max;
};