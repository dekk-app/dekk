'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.colorSchemes = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactSyntaxHighlighter = require('react-syntax-highlighter');

var _reactSyntaxHighlighter2 = _interopRequireDefault(_reactSyntaxHighlighter);

var _styles = require('react-syntax-highlighter/dist/styles');

var colorSchemes = _interopRequireWildcard(_styles);

var _styles2 = require('./styles.scss');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Code = function Code(props) {
  return _react2.default.createElement(_reactSyntaxHighlighter2.default, _extends({}, props, { className: (0, _classnames2.default)(props.className, _styles2.code) }));
};

Code.propTypes = {
  className: _propTypes2.default.string,
  children: _propTypes2.default.string
};

exports.colorSchemes = colorSchemes;
exports.default = Code;