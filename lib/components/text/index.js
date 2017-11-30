'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Uppercase = exports.Bold = exports.Center = exports.Quote = exports.colorSchemes = exports.Code = exports.Subtitle = exports.Title = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _title = require('./title');

Object.defineProperty(exports, 'Title', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_title).default;
  }
});

var _subtitle = require('./subtitle');

Object.defineProperty(exports, 'Subtitle', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_subtitle).default;
  }
});

var _code = require('./code');

Object.defineProperty(exports, 'Code', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_code).default;
  }
});
Object.defineProperty(exports, 'colorSchemes', {
  enumerable: true,
  get: function get() {
    return _code.colorSchemes;
  }
});

var _quote = require('./quote');

Object.defineProperty(exports, 'Quote', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_quote).default;
  }
});

var _center = require('./center');

Object.defineProperty(exports, 'Center', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_center).default;
  }
});

var _bold = require('./bold');

Object.defineProperty(exports, 'Bold', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_bold).default;
  }
});

var _uppercase = require('./uppercase');

Object.defineProperty(exports, 'Uppercase', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_uppercase).default;
  }
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('./styles.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Text = function Text(props) {
  return _react2.default.createElement(
    'div',
    _extends({}, props, { className: (0, _classnames2.default)(props.className, _styles.text) }),
    props.children
  );
};

Text.propTypes = {
  className: _propTypes2.default.string,
  children: _propTypes2.default.node
};

exports.default = Text;