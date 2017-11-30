'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('./styles.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Notes = function Notes(props) {
  return _react2.default.createElement(
    'aside',
    { className: (0, _classnames2.default)(props.className, _styles.notes) },
    props.children
  );
};

Notes.propTypes = {
  className: _propTypes2.default.string,
  children: _propTypes2.default.string
};

exports.default = Notes;