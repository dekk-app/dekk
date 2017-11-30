'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setElementOffset = exports.goToPage = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _constants = require('../constants');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var goToPage = exports.goToPage = function goToPage() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { page: 0 };
  var _ref = arguments[1];
  var type = _ref.type,
      page = _ref.page;

  if (type === _constants.GO_TO_PAGE) {
    return _extends({}, state, { page: page });
  }
  return state;
};

var setElementOffset = exports.setElementOffset = function setElementOffset() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { offset: {} };
  var _ref2 = arguments[1];
  var type = _ref2.type,
      offset = _ref2.offset,
      name = _ref2.name;

  if (type === _constants.SET_ELEMENT_OFFSET) {
    return _extends({}, state, { offset: _extends({}, state.offset, _defineProperty({}, name, offset)) });
  }
  return state;
};