'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Deck = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _pubnubReact = require('pubnub-react');

var _pubnubReact2 = _interopRequireDefault(_pubnubReact);

var _reactRedux = require('react-redux');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _paging = require('../paging');

var _paging2 = _interopRequireDefault(_paging);

var _range = require('../../helpers/range');

var _range2 = _interopRequireDefault(_range);

var _queryParams = require('../../helpers/query-params');

var _actions = require('../../actions');

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @private
 * A wrapper around the slides.
 * Includes a paging component to allow navigating the slides.
 * `Deck` itself should not be used. Instead you can use `Dekk`
 * which wraps `Deck` in a store provider.
 * Renders 3 slides (previous, current, next) to allow various transitions
 * between slides.
 */
var Deck = function (_Component) {
  _inherits(Deck, _Component);

  function Deck(props) {
    _classCallCheck(this, Deck);

    var _this = _possibleConstructorReturn(this, (Deck.__proto__ || Object.getPrototypeOf(Deck)).call(this, props));

    _this.state = {
      direction: 0
    };
    if (_typeof(props.pubnub) === 'object' && (_queryParams.LIVE || _queryParams.PRESENT)) {
      _this.pubnub = new _pubnubReact2.default({
        publishKey: props.pubnub.publishKey,
        subscribeKey: props.pubnub.subscribeKey
      });
      _this.pubnub.init(_this);
    }
    return _this;
  }

  _createClass(Deck, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (newProps.page === this.props.page) {
        return;
      }
      this.setState({
        direction: this.props.page > newProps.page ? -1 : 1
      });
      if (this.pubnub && _queryParams.PRESENT) {
        this.pubnub.publish({
          message: {
            page: newProps.page
          },
          channel: 'paging'
        });
      }
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      if (this.pubnub && _queryParams.LIVE) {
        this.pubnub.subscribe({
          channels: ['paging'],
          withPresence: true
        });

        this.pubnub.getMessage('paging', function (msg) {
          var page = msg.message.page;

          _this2.props.goToPage(page);
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.pubnub && _queryParams.LIVE) {
        this.pubnub.unsubscribe({
          channels: ['paging']
        });
      }
    }

    /**
     * Filters the `children` by a range of `+-1` around the current slide.
     * Therefore renders a maximum of 3 slides (previous, current, next)
     * This allows various transitions between slides.
     *
     * @return {array} returns an array of max 3 slides
     */

  }, {
    key: 'render',
    value: function render() {
      // Inject the paging logic
      // and render the slides
      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(this.props.className, _styles2.default.deck) },
        this.paging,
        this.slides
      );
    }
  }, {
    key: 'slides',
    get: function get() {
      var _this3 = this;

      var _props = this.props,
          page = _props.page,
          children = _props.children;
      var direction = this.state.direction;

      return _react.Children.map(children, function (child, i) {
        return (
          // Clone the element and add properties
          (0, _react.cloneElement)(child, {
            pageIndex: i,
            current: page === i,
            previous: page === i + 1,
            next: page === i - 1,
            fromPrevious: page === i && direction === -1,
            fromNext: page === i && direction === 1,
            toPrevious: page === i + 1 && direction === 1,
            toNext: page === i - 1 && direction === -1,
            direction: _this3.state.direction,
            pubnub: _this3.props.pubnub
          })
        );
      })
      // Filter by a range of `+-1`
      .filter(function (c, i) {
        return (0, _range2.default)(i, page + 1, page - 1);
      });
    }
  }, {
    key: 'paging',
    get: function get() {
      if (this.props.slave) {
        return false;
      }
      var _props2 = this.props,
          page = _props2.page,
          children = _props2.children;

      return _react2.default.createElement(_paging2.default, { page: page,
        pages: children.length,
        trigger: 'keyup' });
    }
  }]);

  return Deck;
}(_react.Component);

Deck.propTypes = {
  className: _propTypes2.default.string,
  children: _propTypes2.default.node,
  slave: _propTypes2.default.bool,
  goToPage: _propTypes2.default.func,
  pubnub: _propTypes2.default.shape({
    publishKey: _propTypes2.default.string,
    subscribeKey: _propTypes2.default.string
  }),
  page: _propTypes2.default.number.isRequired
};

exports.Deck = Deck;
exports.default = (0, _reactRedux.connect)(function (state) {
  return { page: state.goToPage.page };
}, { goToPage: _actions.goToPage })(Deck);