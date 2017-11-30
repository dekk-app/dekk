'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (master) {
  var _master$props = master.props,
      children = _master$props.children,
      className = _master$props.className;

  var Component = function Component(props) {
    return _react2.default.createElement(
      _master2.default,
      _extends({}, props, {
        className: (0, _classnames2.default)(props.className, className),
        content: props.children }),
      _react.Children.toArray(children).map(function (child, i) {
        if (child.type === _helpers.Slot) {
          return (0, _react.cloneElement)(child, {
            key: 'master-slot__' + i,
            component: Component[child.props.name]
          });
        }
        return child;
      })
    );
  };

  _react.Children.toArray(children).filter(function (child) {
    return child.type === _helpers.Slot;
  }).forEach(function (slot) {
    Component[slot.props.name] = function () {
      return null;
    };
  });

  Component.propTypes = {
    children: _propTypes2.default.node,
    className: _propTypes2.default.string
  };

  return Component;
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _master = require('./master');

var _master2 = _interopRequireDefault(_master);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }