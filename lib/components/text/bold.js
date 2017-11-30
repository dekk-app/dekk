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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bold = {
  'text': '_text_cusqb_1',
  'title': '_title_cusqb_6',
  'subtitle': '_subtitle_cusqb_12',
  'code': '_code_cusqb_18',
  'figure': '_figure_cusqb_22',
  'quote': '_quote_cusqb_26',
  'caption': '_caption_cusqb_30',
  'center': '_center_cusqb_34',
  'bold': '_bold_cusqb_38',
  'uppercase': '_uppercase_cusqb_42'
}; // @related-file ./styles.css

var Bold = function Bold(props) {
  return _react2.default.createElement(
    'strong',
    _extends({}, props, { className: (0, _classnames2.default)(props.className, bold) }),
    props.children
  );
};

Bold.propTypes = {
  className: _propTypes2.default.string,
  children: _propTypes2.default.node
};

exports.default = Bold;