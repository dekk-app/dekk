'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactMotion = require('react-motion');

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A single slide.
 * Renders a slide inside a `react-motion` wrapper.
 * Assigns css-variables to allow various transitions
 *
 */
var Slide = function (_Component) {
  _inherits(Slide, _Component);

  function Slide() {
    _classCallCheck(this, Slide);

    return _possibleConstructorReturn(this, (Slide.__proto__ || Object.getPrototypeOf(Slide)).apply(this, arguments));
  }

  _createClass(Slide, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          previous = _props.previous,
          next = _props.next,
          children = _props.children,
          springSettings = _props.springSettings,
          background = _props.background;

      var springStyle = {
        time: (0, _reactMotion.spring)(previous || next ? 1 : 0, springSettings)
      };
      return _react2.default.createElement(
        _reactMotion.Motion,
        { style: springStyle },
        function (_ref) {
          var time = _ref.time;

          var style = {
            '--time': ~~(time * 1000) / 1000,
            '--slide-background': background
          };
          return _react2.default.createElement(
            'div',
            { className: _this2.classNames,
              style: style },
            children
          );
        }
      );
    }
  }, {
    key: 'classNames',
    get: function get() {
      var _classNames;

      return (0, _classnames2.default)(this.props.className, _styles2.default.slide, (_classNames = {}, _defineProperty(_classNames, _styles2.default.current, this.props.current), _defineProperty(_classNames, _styles2.default.previous, this.props.previous), _defineProperty(_classNames, _styles2.default.next, this.props.next), _defineProperty(_classNames, _styles2.default.fromPrevious, this.props.fromPrevious), _defineProperty(_classNames, _styles2.default.toPrevious, this.props.toPrevious), _defineProperty(_classNames, _styles2.default.fromNext, this.props.fromNext), _defineProperty(_classNames, _styles2.default.toNext, this.props.toNext), _classNames));
    }
  }]);

  return Slide;
}(_react.Component);

Slide.propTypes = {
  current: _propTypes2.default.bool,
  previous: _propTypes2.default.bool,
  next: _propTypes2.default.bool,
  toPrevious: _propTypes2.default.bool,
  fromPrevious: _propTypes2.default.bool,
  toNext: _propTypes2.default.bool,
  fromNext: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  children: _propTypes2.default.node,
  springSettings: _propTypes2.default.object,
  background: _propTypes2.default.string
};

exports.default = (0, _reactRedux.connect)(function (state) {
  return state;
}, {})(Slide);