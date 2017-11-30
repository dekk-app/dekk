'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setElementOffset = exports.goToPage = undefined;

var _constants = require('../constants');

var goToPage = exports.goToPage = function goToPage(page) {
  return {
    page: page,
    type: _constants.GO_TO_PAGE
  };
};

var setElementOffset = exports.setElementOffset = function setElementOffset(offset, name) {
  return {
    offset: offset,
    name: name,
    type: _constants.SET_ELEMENT_OFFSET
  };
};