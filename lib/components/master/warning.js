'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Warning = function Warning(props) {
  var not = props.not,
      only = props.only,
      invalid = props.invalid,
      missing = props.missing,
      type = props.type;

  var message = void 0;
  var onlyMessage = void 0;
  var notMessage = void 0;

  if (only) {
    onlyMessage = _react2.default.createElement(
      'div',
      { className: _styles2.default.info },
      _react2.default.createElement(
        'strong',
        null,
        'Allowed components:'
      ),
      _react2.default.createElement(
        'ul',
        null,
        only.map(function (component, i) {
          return _react2.default.createElement(
            'li',
            { key: 'warning_item__' + i },
            component.name
          );
        })
      )
    );
  }

  if (not) {
    notMessage = _react2.default.createElement(
      'div',
      { className: _styles2.default.info },
      _react2.default.createElement(
        'strong',
        null,
        'Forbidden components:'
      ),
      _react2.default.createElement(
        'ul',
        null,
        not.map(function (component, i) {
          return _react2.default.createElement(
            'li',
            { key: 'warning_item__' + i },
            component.name
          );
        })
      )
    );
  }

  if (missing) {
    message = _react2.default.createElement(
      'div',
      { className: _styles2.default.message },
      _react2.default.createElement(
        'strong',
        null,
        'Error: Required slot'
      ),
      notMessage,
      onlyMessage
    );
  } else if (invalid) {
    message = _react2.default.createElement(
      'div',
      { className: _styles2.default.message },
      _react2.default.createElement(
        'strong',
        null,
        'Error: Invalid component'
      ),
      _react2.default.createElement(
        'p',
        null,
        'Tried to use ',
        type
      ),
      notMessage,
      onlyMessage
    );
  }
  return _react2.default.createElement(
    'div',
    { className: _styles2.default.warning },
    message
  );
};

Warning.propTypes = {
  not: _propTypes2.default.array,
  only: _propTypes2.default.array,
  type: _propTypes2.default.string,
  invalid: _propTypes2.default.bool,
  missing: _propTypes2.default.bool
};

exports.default = Warning;