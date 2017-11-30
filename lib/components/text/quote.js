'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('./styles.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Quote = function Quote(props) {
  return _react2.default.createElement(
    'figure',
    _extends({}, props, { className: (0, _classnames2.default)(props.className, _styles.figure) }),
    _react2.default.createElement(
      'blockquote',
      { className: _styles.quote, cite: props.cite },
      props.children
    ),
    _react2.default.createElement(
      'figcaption',
      { className: _styles.caption },
      props.author
    )
  );
};

Quote.propTypes = {
  cite: _propTypes2.default.string,
  author: _propTypes2.default.node,
  className: _propTypes2.default.string,
  children: _propTypes2.default.node
};

exports.default = Quote;