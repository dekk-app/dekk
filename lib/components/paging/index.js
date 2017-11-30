'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _actions = require('../../actions');

var _queryParams = require('../../helpers/query-params');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Paging = function (_Component) {
  _inherits(Paging, _Component);

  function Paging(props) {
    _classCallCheck(this, Paging);

    var _this = _possibleConstructorReturn(this, (Paging.__proto__ || Object.getPrototypeOf(Paging)).call(this, props));

    _this.goToPage = _this.goToPage.bind(_this);
    return _this;
  }

  _createClass(Paging, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      window.addEventListener(this.props.trigger, this.goToPage);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener(this.props.trigger, this.goToPage);
    }
  }, {
    key: 'goToPage',
    value: function goToPage(_ref) {
      var which = _ref.which;

      if (_queryParams.LIVE) {
        return;
      }
      var _props = this.props,
          page = _props.page,
          pages = _props.pages,
          goToPage = _props.goToPage;

      var previous = Math.max(0, page - 1);
      var next = Math.min(pages - 1, page + 1);

      switch (which) {
        case 39:
          return goToPage(next);
        case 37:
          return goToPage(previous);
        default:
          return false;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return Paging;
}(_react.Component);

Paging.propTypes = {
  trigger: _propTypes2.default.oneOf(['keyup', 'keydown']).isRequired,
  page: _propTypes2.default.number.isRequired,
  pages: _propTypes2.default.number.isRequired,
  goToPage: _propTypes2.default.func.isRequired
};

exports.default = (0, _reactRedux.connect)(function (state) {
  return { page: state.goToPage.page };
}, { goToPage: _actions.goToPage })(Paging);