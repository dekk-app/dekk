'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Image = function (_Component) {
  _inherits(Image, _Component);

  function Image(props) {
    _classCallCheck(this, Image);

    var _this = _possibleConstructorReturn(this, (Image.__proto__ || Object.getPrototypeOf(Image)).call(this, props));

    _this.state = {};
    _this.getImage = _this.getImage.bind(_this);
    _this.handleLoad = _this.handleLoad.bind(_this);
    return _this;
  }

  _createClass(Image, [{
    key: 'handleLoad',
    value: function handleLoad() {
      this.setState({
        loaded: true,
        height: this.image.height,
        width: this.image.width
      });
    }
  }, {
    key: 'getImage',
    value: function getImage(el) {
      this.image = el;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: this.style,
          className: (0, _classnames2.default)(this.props.className, _styles2.default.mask) },
        _react2.default.createElement('img', { ref: this.getImage,
          className: this.imageClasses,
          src: this.props.src,
          alt: this.props.alt,
          title: this.props.title,
          onLoad: this.handleLoad })
      );
    }
  }, {
    key: 'style',
    get: function get() {
      return {
        backgroundImage: 'url("' + this.props.src + '")',
        '--height': this.state.height + 'px',
        '--width': this.state.width + 'px'
      };
    }
  }, {
    key: 'imageClasses',
    get: function get() {
      return (0, _classnames2.default)(_styles2.default.image, _defineProperty({}, _styles2.default.loaded, this.state.loaded));
    }
  }]);

  return Image;
}(_react.Component);

Image.propTypes = {
  className: _propTypes2.default.string,
  alt: _propTypes2.default.string,
  title: _propTypes2.default.string,
  src: _propTypes2.default.string
};

exports.default = Image;