window["patternplate-components"] =
webpackJsonppatternplate__name_([0],{

/***/ 100:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _styledComponents = __webpack_require__(12);

/**
 * A simple flip transition.
 * @property {Array} x
 *   Flips on the x axis
 * @property {Array} y
 *   Flips on the y axis
 */
var flip = {
  x: (0, _styledComponents.css)(['backface-visibility:hidden;transform:perspective(200vw) rotate3d(0,1,0,calc(180deg * var(--direction,-1) * var(--time,1)));']),
  y: (0, _styledComponents.css)(['backface-visibility:hidden;transform:perspective(200vh) rotate3d(1,0,0,calc(180deg * var(--direction,-1) * var(--time,1)));'])
};

exports.default = flip;
//# sourceMappingURL=flip.js.map

/***/ }),

/***/ 101:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _styledComponents = __webpack_require__(12);

var _slide = __webpack_require__(45);

var _slide2 = _interopRequireDefault(_slide);

var _fade = __webpack_require__(44);

var _fade2 = _interopRequireDefault(_fade);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A sliding fade transition.
 *
 * @public
 * @property {Array} in
 *   Fades in
 * @property {Array} in.normal
 *   Transition from left to right
 * @property {Array} in.reverse
 *   Transition from right to left
 * @property {Array} in.up
 *   Transition upwards
 * @property {Array} in.down
 *   Transition downwards
 * @property {Array} out
 *   Fades out
 * @property {Array} out.normal
 *   Transition from left to right
 * @property {Array} out.reverse
 *   Transition from right to left
 * @property {Array} out.up
 *   Transition upwards
 * @property {Array} out.down
 *   Transition downwards
 */
var fadeSlide = {
  in: {
    normal: (0, _styledComponents.css)(['--direction:1;--regulator:0;', ';', ';'], _fade2.default.in, _slide2.default.normal),
    reverse: (0, _styledComponents.css)(['--direction:1;--regulator:0;', ';', ';'], _fade2.default.in, _slide2.default.reverse),
    up: (0, _styledComponents.css)(['', ';', ';'], _fade2.default.in, _slide2.default.up),
    down: (0, _styledComponents.css)(['', ';', ';'], _fade2.default.in, _slide2.default.down)
  },
  out: {
    normal: (0, _styledComponents.css)(['--direction:1;--regulator:1;', ';', ';'], _fade2.default.out, _slide2.default.normal),
    reverse: (0, _styledComponents.css)(['--direction:1;--regulator:1;', ';', ';'], _fade2.default.out, _slide2.default.reverse),
    up: (0, _styledComponents.css)(['--direction:-1;--regulator:1;', ';', ';'], _fade2.default.out, _slide2.default.up),
    down: (0, _styledComponents.css)(['--direction:-1;--regulator:1;', ';', ';'], _fade2.default.out, _slide2.default.down)
  }
};

exports.default = fadeSlide;
//# sourceMappingURL=fade-slide.js.map

/***/ }),

/***/ 102:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(103)


/***/ }),

/***/ 103:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @public
 * @param {Object} props
 * @param {ReactElement} prosp.children
 */
var Notes = function Notes(_ref) {
  var children = _ref.children;

  return typeof children === 'string' ? children : _react.Children.toArray(children).map(function (child, i) {
    return (0, _react.cloneElement)(child, { key: i });
  });
};

/**
 * @private
 */
Notes.propTypes = {
  className: _propTypes2.default.string,
  children: _propTypes2.default.node
};

exports.default = Notes;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 104:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global window */


/**
 * @public
 * @param {Object} props
 *   The properties
 * @param {Boolean} props.isPlaying
 *   Autoplay is only enabled if this is `true`
 * @param {number} props.delay
 *   time until the next slide/fragment (in seconds)
 * @param {number} props.slideCount
 *   (Injected via Dekk)
 * @param {number} props.slideIndex
 *   (Injected via Dekk)
 * @param {number} props.fragmentCount
 *   (Injected via Dekk)
 * @param {number} props.fragmentIndex
 *   (Injected via Dekk)
 * @param {Function} props.toNextFragment
 *   (Injected via Dekk)
 * @param {Function} props.toNextSlide
 *   (Injected via Dekk)
 * @example
 * import Deck, {Plugins} from '@dekk/deck'
 * import Autoplay from '@dekk/autoplay'
 *
 * export default (
 *   <Deck>
 *     <Plugins>
 *       <Autoplay isPlaying delay={120}/>
 *     </Plugins>
 *   </Deck>
 * )
 */
var Autoplay = function (_Component) {
  _inherits(Autoplay, _Component);

  _createClass(Autoplay, null, [{
    key: 'propTypes',

    /**
     * @private
     */
    get: function get() {
      return {
        delay: _propTypes2.default.number,
        isPlaying: _propTypes2.default.bool,
        slideIndex: _propTypes2.default.number,
        slideCount: _propTypes2.default.number,
        fragmentIndex: _propTypes2.default.number,
        fragmentCount: _propTypes2.default.number,
        toNextFragment: _propTypes2.default.func,
        toNextSlide: _propTypes2.default.func
      };
    }

    /**
     * @private
     */

  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        delay: 30,
        isPlaying: false,
        slideIndex: 0,
        slideCount: 0,
        fragmentIndex: 0,
        fragmentCount: 0,
        toNextFragment: function toNextFragment() {
          return null;
        },
        toNextSlide: function toNextSlide() {
          return null;
        }
      };
    }

    /**
     * @public
     * @param {Object} props
     *   The properties
     * @param {Boolean} props.isPlaying
     *   Autoplay is only enabled if this is `true`
     * @param {number} props.delay
     *   time until the next slide/fragment (in seconds)
     * @param {number} props.slideCount
     *   (Injected via Dekk)
     * @param {number} props.slideIndex
     *   (Injected via Dekk)
     * @param {number} props.fragmentCount
     *   (Injected via Dekk)
     * @param {number} props.fragmentIndex
     *   (Injected via Dekk)
     * @param {Function} props.toNextFragment
     *   (Injected via Dekk)
     * @param {Function} props.toNextSlide
     *   (Injected via Dekk)
     */

  }]);

  function Autoplay(props) {
    _classCallCheck(this, Autoplay);

    var _this = _possibleConstructorReturn(this, (Autoplay.__proto__ || Object.getPrototypeOf(Autoplay)).call(this, props));

    _this.play = _this.play.bind(_this);
    return _this;
  }

  /**
   * @private
   */


  _createClass(Autoplay, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.isPlaying) {
        this.play();
      }
    }

    /**
     * @private
     */

  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(oldProps) {
      if (!oldProps.isPlaying && this.props.isPlaying) {
        this.play();
      } else if (oldProps.isPlaying && !this.props.isPlaying) {
        this.stop();
      }
    }

    /**
     * Waits for 1000 * `delay` ms and then navigates to the next
     * fragment or slide.
     *
     * @private
     */

  }, {
    key: 'play',
    value: function play() {
      var _this2 = this;

      var _props = this.props,
          fragmentCount = _props.fragmentCount,
          fragmentIndex = _props.fragmentIndex,
          slideCount = _props.slideCount,
          slideIndex = _props.slideIndex,
          toNextFragment = _props.toNextFragment,
          toNextSlide = _props.toNextSlide,
          isPlaying = _props.isPlaying;

      if (isPlaying) {
        this.timer = setTimeout(function () {
          if (isPlaying) {
            if (fragmentCount > fragmentIndex + 1) {
              toNextFragment();
              window.requestAnimationFrame(_this2.play);
            } else if (slideCount > slideIndex + 1) {
              toNextSlide();
              window.requestAnimationFrame(_this2.play);
            } else {
              _this2.stop();
            }
          } else {
            _this2.stop();
          }
        }, 1000 * this.props.delay);
      } else {
        this.stop();
      }
    }
  }, {
    key: 'stop',
    value: function stop() {
      clearTimeout(this.timer);
      window.cancelAnimationFrame(this.play);
    }

    /**
     * @private
     */

  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return Autoplay;
}(_react.Component);

exports.default = Autoplay;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 105:
/***/ (function(module, exports) {

module.exports = "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nexports.default = function () {\n  return _react2.default.createElement(App, null);\n};\n\nvar _react = require('react');\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styledComponents = require('styled-components');\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _deck = require('../../deck');\n\nvar _deck2 = _interopRequireDefault(_deck);\n\nvar _slide = require('../../slide');\n\nvar _slide2 = _interopRequireDefault(_slide);\n\nvar _ = require('./');\n\nvar _2 = _interopRequireDefault(_);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar OuterWrapper = _styledComponents2.default.div.withConfig({\n  displayName: 'demo__OuterWrapper'\n})(['padding-top:3rem;']);\n\nvar Wrapper = _styledComponents2.default.div.withConfig({\n  displayName: 'demo__Wrapper'\n})(['position:relative;height:10rem;overflow:visible;']);\n\nvar StyledButton = _styledComponents2.default.button.withConfig({\n  displayName: 'demo__StyledButton'\n})(['box-sizing:border-box;position:absolute;top:0;left:0;margin:0.5rem;padding:0.25rem 0.5rem;height:2rem;font-size:1rem;display:flex;align-items:center;align-content:center;justify-content:center;background:#ddd;color:#111;border:1px solid #aaa;border-radius:3px;box-shadow:0 2px 4px rgba(0,0,0,0.3);cursor:pointer;&:hover{background:#bbb;border-color:#888;}']);\n\nvar mixin = (0, _styledComponents.css)(['background:#333;color:#fff;display:flex;align-items:center;justify-content:center;font-size:3em;']);\n\nvar App = function (_Component) {\n  _inherits(App, _Component);\n\n  function App(props) {\n    _classCallCheck(this, App);\n\n    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));\n\n    _this.state = {\n      isPlaying: false\n    };\n    _this.togglePlay = _this.togglePlay.bind(_this);\n    return _this;\n  }\n\n  _createClass(App, [{\n    key: 'togglePlay',\n    value: function togglePlay() {\n      this.setState(function (prevState) {\n        return {\n          isPlaying: !prevState.isPlaying\n        };\n      });\n    }\n  }, {\n    key: 'render',\n    value: function render() {\n      return _react2.default.createElement(\n        OuterWrapper,\n        null,\n        _react2.default.createElement(\n          StyledButton,\n          { onClick: this.togglePlay },\n          this.state.isPlaying ? 'Pause' : 'Play'\n        ),\n        _react2.default.createElement(\n          Wrapper,\n          null,\n          _react2.default.createElement(\n            _deck2.default,\n            null,\n            _react2.default.createElement(\n              _deck.Plugins,\n              null,\n              _react2.default.createElement(_2.default, { delay: 3, isPlaying: this.state.isPlaying })\n            ),\n            [].concat(_toConsumableArray(new Array(60))).map(function (x, i) {\n              return _react2.default.createElement(\n                _slide2.default,\n                {\n                  key: i,\n                  background: 'hsl(' + 20 * i + ', 50%, 50%)',\n                  mixin: mixin },\n                'Slide ',\n                i + 1\n              );\n            })\n          )\n        )\n      );\n    }\n  }]);\n\n  return App;\n}(_react.Component);\n//# sourceMappingURL=demo.js.map"

/***/ }),

/***/ 106:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return _react2.default.createElement(
    Wrapper,
    null,
    _react2.default.createElement(
      _deck2.default,
      { mixin: mixin },
      _react2.default.createElement(
        _2.default,
        null,
        _react2.default.createElement(Header, null),
        _react2.default.createElement(Footer, null)
      ),
      _react2.default.createElement(
        _slide2.default,
        null,
        'Slide 1'
      )
    )
  );
};

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _styledComponents = __webpack_require__(15);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _deck = __webpack_require__(22);

var _deck2 = _interopRequireDefault(_deck);

var _slide = __webpack_require__(16);

var _slide2 = _interopRequireDefault(_slide);

var _ = __webpack_require__(21);

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StyledHeader = _styledComponents2.default.header.withConfig({
  displayName: 'demo__StyledHeader'
})(['position:absolute;top:0;left:0;right:0;height:3rem;font-size:2rem;line-height:3rem;background:black;color:white;']);

var StyledFooter = _styledComponents2.default.footer.withConfig({
  displayName: 'demo__StyledFooter'
})(['position:absolute;bottom:0;left:0;right:0;height:2rem;line-height:2rem;background:black;color:white;']);
var Header = function Header() {
  return _react2.default.createElement(
    StyledHeader,
    null,
    'Dekk Elements'
  );
};
var Footer = function Footer() {
  return _react2.default.createElement(
    StyledFooter,
    null,
    'Dekk Elements'
  );
};

var Wrapper = _styledComponents2.default.div.withConfig({
  displayName: 'demo__Wrapper'
})(['position:relative;height:10rem;']);

var mixin = (0, _styledComponents.css)(['padding:3rem 0 2rem;']);
//# sourceMappingURL=demo.js.map

/***/ }),

/***/ 107:
/***/ (function(module, exports) {

module.exports = "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function () {\n  return _react2.default.createElement(\n    Wrapper,\n    null,\n    _react2.default.createElement(\n      _deck2.default,\n      { mixin: mixin },\n      _react2.default.createElement(\n        _2.default,\n        null,\n        _react2.default.createElement(Header, null),\n        _react2.default.createElement(Footer, null)\n      ),\n      _react2.default.createElement(\n        _slide2.default,\n        null,\n        'Slide 1'\n      )\n    )\n  );\n};\n\nvar _react = require('react');\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styledComponents = require('styled-components');\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _deck = require('../deck');\n\nvar _deck2 = _interopRequireDefault(_deck);\n\nvar _slide = require('../../../slide');\n\nvar _slide2 = _interopRequireDefault(_slide);\n\nvar _ = require('./');\n\nvar _2 = _interopRequireDefault(_);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar StyledHeader = _styledComponents2.default.header.withConfig({\n  displayName: 'demo__StyledHeader'\n})(['position:absolute;top:0;left:0;right:0;height:3rem;font-size:2rem;line-height:3rem;background:black;color:white;']);\n\nvar StyledFooter = _styledComponents2.default.footer.withConfig({\n  displayName: 'demo__StyledFooter'\n})(['position:absolute;bottom:0;left:0;right:0;height:2rem;line-height:2rem;background:black;color:white;']);\nvar Header = function Header() {\n  return _react2.default.createElement(\n    StyledHeader,\n    null,\n    'Dekk Elements'\n  );\n};\nvar Footer = function Footer() {\n  return _react2.default.createElement(\n    StyledFooter,\n    null,\n    'Dekk Elements'\n  );\n};\n\nvar Wrapper = _styledComponents2.default.div.withConfig({\n  displayName: 'demo__Wrapper'\n})(['position:relative;height:10rem;']);\n\nvar mixin = (0, _styledComponents.css)(['padding:3rem 0 2rem;']);\n//# sourceMappingURL=demo.js.map"

/***/ }),

/***/ 108:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return _react2.default.createElement(
    Wrapper,
    null,
    _react2.default.createElement(
      _deck2.default,
      null,
      _react2.default.createElement(
        _2.default,
        null,
        _react2.default.createElement(MyPlugin, null)
      ),
      _react2.default.createElement(
        _slide2.default,
        null,
        'Look at the console'
      )
    )
  );
};

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _styledComponents = __webpack_require__(15);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _deck = __webpack_require__(22);

var _deck2 = _interopRequireDefault(_deck);

var _slide = __webpack_require__(16);

var _slide2 = _interopRequireDefault(_slide);

var _ = __webpack_require__(20);

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MyPlugin = function MyPlugin() {
  return null;
};

var Wrapper = _styledComponents2.default.div.withConfig({
  displayName: 'demo__Wrapper'
})(['position:relative;height:10rem;']);
//# sourceMappingURL=demo.js.map

/***/ }),

/***/ 109:
/***/ (function(module, exports) {

module.exports = "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function () {\n  return _react2.default.createElement(\n    Wrapper,\n    null,\n    _react2.default.createElement(\n      _deck2.default,\n      null,\n      _react2.default.createElement(\n        _2.default,\n        null,\n        _react2.default.createElement(MyPlugin, null)\n      ),\n      _react2.default.createElement(\n        _slide2.default,\n        null,\n        'Look at the console'\n      )\n    )\n  );\n};\n\nvar _react = require('react');\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styledComponents = require('styled-components');\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _deck = require('../deck');\n\nvar _deck2 = _interopRequireDefault(_deck);\n\nvar _slide = require('../../../slide');\n\nvar _slide2 = _interopRequireDefault(_slide);\n\nvar _ = require('./');\n\nvar _2 = _interopRequireDefault(_);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar MyPlugin = function MyPlugin() {\n  return null;\n};\n\nvar Wrapper = _styledComponents2.default.div.withConfig({\n  displayName: 'demo__Wrapper'\n})(['position:relative;height:10rem;']);\n//# sourceMappingURL=demo.js.map"

/***/ }),

/***/ 110:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return _react2.default.createElement(
    Wrapper,
    null,
    _react2.default.createElement(
      _deck2.default,
      null,
      _react2.default.createElement(
        _deck.Plugins,
        null,
        _react2.default.createElement(_2.default, null)
      ),
      _react2.default.createElement(
        _slide2.default,
        { mixin: mixin, background: 'hsl(0, 50%, 50%)' },
        'Press Arrow right'
      ),
      _react2.default.createElement(
        _slide2.default,
        { mixin: mixin, background: 'hsl(60, 50%, 50%)' },
        'Press Arrow right or left'
      ),
      _react2.default.createElement(
        _slide2.default,
        { mixin: mixin, background: 'hsl(120, 50%, 50%)' },
        'Press Arrow left'
      )
    )
  );
};

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _styledComponents = __webpack_require__(111);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _deck = __webpack_require__(33);

var _deck2 = _interopRequireDefault(_deck);

var _slide = __webpack_require__(16);

var _slide2 = _interopRequireDefault(_slide);

var _ = __webpack_require__(113);

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Wrapper = _styledComponents2.default.div.withConfig({
  displayName: 'demo__Wrapper'
})(['position:relative;height:10rem;']);

var mixin = (0, _styledComponents.css)(['background:#333;color:#fff;display:flex;align-items:center;justify-content:center;font-size:3em;']);
//# sourceMappingURL=demo.js.map

/***/ }),

/***/ 113:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global window */


/**
 * This component does not render any content but adds paging via key
 * commands.
 *
 * If a slide has fragments this component will split the slide into
 * different steps.
 * @public
 */
var Paging = function (_Component) {
  _inherits(Paging, _Component);

  _createClass(Paging, null, [{
    key: 'propTypes',

    /**
     * @private
     */
    get: function get() {
      return {
        trigger: _propTypes2.default.oneOf(['keyup', 'keydown']),
        toNextFragment: _propTypes2.default.func,
        toPrevFragment: _propTypes2.default.func,
        toNextSlide: _propTypes2.default.func,
        toPrevSlide: _propTypes2.default.func,
        slideCount: _propTypes2.default.number,
        slideIndex: _propTypes2.default.number,
        fragmentCount: _propTypes2.default.number,
        fragmentIndex: _propTypes2.default.number
      };
    }

    /**
     * @private
     */

  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        trigger: 'keyup',
        toNextFragment: function toNextFragment() {
          return null;
        },
        toPrevFragment: function toPrevFragment() {
          return null;
        },
        toNextSlide: function toNextSlide() {
          return null;
        },
        toPrevSlide: function toPrevSlide() {
          return null;
        },
        slideCount: 0,
        slideIndex: 0,
        fragmentCount: 0,
        fragmentIndex: 0
      };
    }

    /**
     * @public
     * @param {Object} props
     *   The properties
     * @param {String} [props.trigger='keyup']
     *   The event that triggers paging
     * @param {number} props.slideCount
     *   (Injected via Dekk)
     * @param {number} props.slideIndex
     *   (Injected via Dekk)
     * @param {number} props.fragmentCount
     *   (Injected via Dekk)
     * @param {number} props.fragmentIndex
     *   (Injected via Dekk)
     * @param {number} props.fragmentOrder
     *   (Injected via Dekk)
     * @param {function} props.toFragment
     *   (Injected via Dekk)
     * @param {function} props.toSlide
     *   (Injected via Dekk)
     * @param {function} props.toNextFragment
     *   (Injected via Dekk)
     * @param {function} props.toPrevFragment
     *   (Injected via Dekk)
     * @param {function} props.toNextSlide
     *   (Injected via Dekk)
     * @param {function} props.toPrevSlide
     *   (Injected via Dekk)
     * @example
     * import Deck, {Plugins} from '@dekk/deck'
     * import Paging from '@dekk/paging'
     *
     * export default (
     *   <Deck>
     *     <Plugins>
     *       <Paging/>
     *     </Plugins>
     *   </Deck>
     * )
     */

  }]);

  function Paging(props) {
    _classCallCheck(this, Paging);

    var _this = _possibleConstructorReturn(this, (Paging.__proto__ || Object.getPrototypeOf(Paging)).call(this, props));

    _this.goTo = _this.goTo.bind(_this);
    return _this;
  }

  /**
   * Listen to events before we mount the component
   * @private
   */


  _createClass(Paging, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener(this.props.trigger, this.goTo);
    }

    /**
     * Unlisten to events before we unmount the component
     * @private
     */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener(this.props.trigger, this.goTo);
    }

    /**
     * Method to navigate to fragments or slides.
     * Uses left and right arrow buttons to navigate
     * @private
     * @param  {Object} e
     *   The event
     * @param {number} e.which
     *   The keyCode that has been triggered by the event
     */

  }, {
    key: 'goTo',
    value: function goTo(_ref) {
      var which = _ref.which;
      var _props = this.props,
          slideCount = _props.slideCount,
          slideIndex = _props.slideIndex,
          fragmentIndex = _props.fragmentIndex,
          fragmentCount = _props.fragmentCount,
          toNextSlide = _props.toNextSlide,
          toPrevSlide = _props.toPrevSlide,
          toNextFragment = _props.toNextFragment,
          toPrevFragment = _props.toPrevFragment;


      var hasFragments = Boolean(fragmentCount);

      var lastFragment = Math.max(0, fragmentCount - 1);

      var previousFragment = Math.max(0, fragmentIndex - 1);
      var nextFragment = Math.min(lastFragment, fragmentIndex + 1);

      var lastSlide = Math.max(0, slideCount - 1);
      var previousSlide = Math.max(0, slideIndex - 1);
      var nextSlide = Math.min(lastSlide, slideIndex + 1);

      var handleNext = function handleNext() {
        if (hasFragments && nextFragment > fragmentIndex) {
          toNextFragment();
        } else if (nextSlide !== slideIndex) {
          toNextSlide();
        }
      };

      var handlePrev = function handlePrev() {
        if (hasFragments && previousFragment < fragmentIndex) {
          toPrevFragment();
        } else if (previousSlide !== slideIndex) {
          toPrevSlide();
        }
      };

      // Switch between left and right arrow buttons
      switch (which) {
        case 39:
          handleNext();
          break;
        case 37:
          handlePrev();
          break;
        default:
          break;
      }
    }

    /**
     * @private
     */

  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return Paging;
}(_react.Component);

exports.default = Paging;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 114:
/***/ (function(module, exports) {

module.exports = "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function () {\n  return _react2.default.createElement(\n    Wrapper,\n    null,\n    _react2.default.createElement(\n      _deck2.default,\n      null,\n      _react2.default.createElement(\n        _deck.Plugins,\n        null,\n        _react2.default.createElement(_2.default, null)\n      ),\n      _react2.default.createElement(\n        _slide2.default,\n        { mixin: mixin, background: 'hsl(0, 50%, 50%)' },\n        'Press Arrow right'\n      ),\n      _react2.default.createElement(\n        _slide2.default,\n        { mixin: mixin, background: 'hsl(60, 50%, 50%)' },\n        'Press Arrow right or left'\n      ),\n      _react2.default.createElement(\n        _slide2.default,\n        { mixin: mixin, background: 'hsl(120, 50%, 50%)' },\n        'Press Arrow left'\n      )\n    )\n  );\n};\n\nvar _react = require('react');\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styledComponents = require('styled-components');\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _deck = require('../../deck');\n\nvar _deck2 = _interopRequireDefault(_deck);\n\nvar _slide = require('../../slide');\n\nvar _slide2 = _interopRequireDefault(_slide);\n\nvar _ = require('./');\n\nvar _2 = _interopRequireDefault(_);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar Wrapper = _styledComponents2.default.div.withConfig({\n  displayName: 'demo__Wrapper'\n})(['position:relative;height:10rem;']);\n\nvar mixin = (0, _styledComponents.css)(['background:#333;color:#fff;display:flex;align-items:center;justify-content:center;font-size:3em;']);\n//# sourceMappingURL=demo.js.map"

/***/ }),

/***/ 115:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return _react2.default.createElement(
    Wrapper,
    null,
    'Lorem ipsum ',
    _react2.default.createElement(
      _2.default,
      null,
      'dolor'
    ),
    ' sit ',
    _react2.default.createElement(
      _2.default,
      { highlight: true },
      'amed'
    ),
    '.'
  );
};

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _styledComponents = __webpack_require__(3);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _ = __webpack_require__(117);

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Wrapper = _styledComponents2.default.div.withConfig({
  displayName: 'demo__Wrapper'
})(['--highlight-color:#00f;']);
//# sourceMappingURL=demo.js.map

/***/ }),

/***/ 117:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styledComponents = __webpack_require__(3);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @public
 */
var Bold = _styledComponents2.default.strong.withConfig({
  displayName: 'bold__Bold'
})(['font-weight:bold;', ';'], function (props) {
  return props.highlight ? 'color: var(--highlight-color, inherit);' : '';
});

/**
 * @private
 */
Bold.propTypes = {
  className: _propTypes2.default.string,
  highlight: _propTypes2.default.bool,
  children: _propTypes2.default.node

  /**
   * @private
   */
};Bold.displayName = 'Bold';

exports.default = Bold;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 118:
/***/ (function(module, exports) {

module.exports = "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function () {\n  return _react2.default.createElement(\n    Wrapper,\n    null,\n    'Lorem ipsum ',\n    _react2.default.createElement(\n      _2.default,\n      null,\n      'dolor'\n    ),\n    ' sit ',\n    _react2.default.createElement(\n      _2.default,\n      { highlight: true },\n      'amed'\n    ),\n    '.'\n  );\n};\n\nvar _react = require('react');\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styledComponents = require('styled-components');\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _ = require('./');\n\nvar _2 = _interopRequireDefault(_);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar Wrapper = _styledComponents2.default.div.withConfig({\n  displayName: 'demo__Wrapper'\n})(['--highlight-color:#00f;']);\n//# sourceMappingURL=demo.js.map"

/***/ }),

/***/ 119:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      _2.default,
      null,
      'Centered text'
    ),
    '.'
  );
};

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ = __webpack_require__(120);

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=demo.js.map

/***/ }),

/***/ 120:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styledComponents = __webpack_require__(3);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @public
 */
var Center = _styledComponents2.default.div.withConfig({
  displayName: 'center__Center'
})(['text-align:center;']);

/**
 * @private
 */
Center.propTypes = {
  className: _propTypes2.default.string,
  children: _propTypes2.default.node

  /**
   * @private
   */
};Center.displayName = 'Center';

exports.default = Center;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 121:
/***/ (function(module, exports) {

module.exports = "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function () {\n  return _react2.default.createElement(\n    'div',\n    null,\n    _react2.default.createElement(\n      _2.default,\n      null,\n      'Centered text'\n    ),\n    '.'\n  );\n};\n\nvar _react = require('react');\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _ = require('./');\n\nvar _2 = _interopRequireDefault(_);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n//# sourceMappingURL=demo.js.map"

/***/ }),

/***/ 122:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      _2.default,
      { style: _.colorSchemes.docco, languange: 'javascript' },
      code
    )
  );
};

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ = __webpack_require__(123);

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var code = 'function hello(name) {\n  return `hello ${name}!`\n}';
//# sourceMappingURL=demo.js.map

/***/ }),

/***/ 123:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.colorSchemes = undefined;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styledComponents = __webpack_require__(3);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _reactSyntaxHighlighter = __webpack_require__(124);

var _reactSyntaxHighlighter2 = _interopRequireDefault(_reactSyntaxHighlighter);

var _hljs = __webpack_require__(334);

var colorSchemes = _interopRequireWildcard(_hljs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @private
 */
var RawCode = function RawCode(props) {
  return _react2.default.createElement(
    _reactSyntaxHighlighter2.default,
    {
      className: props.className,
      language: props.language,
      style: props.style },
    props.children
  );
};

/**
 * @public
 */
var Code = (0, _styledComponents2.default)(RawCode).withConfig({
  displayName: 'code__Code'
})(['font-size:var(--code-font-size,1em);']);

/**
 * @private
 */
RawCode.propTypes = {
  style: _propTypes2.default.object,
  language: _propTypes2.default.string,
  className: _propTypes2.default.string,
  children: _propTypes2.default.string.isRequired

  /**
   * @private
   */
};RawCode.defaultProps = {
  style: {},
  language: '',
  className: ''

  /**
   * @private
   */
};Code.propTypes = {
  style: _propTypes2.default.object,
  language: _propTypes2.default.string,
  className: _propTypes2.default.string,
  children: _propTypes2.default.string.isRequired

  /**
   * @private
   */
};Code.displayName = 'Code';

exports.colorSchemes = colorSchemes;
exports.default = Code;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(85)


/***/ }),

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * It allows adding plugins to Dekk.
 * Plugins do not render anything.
 * Plugins usually use the Component lifecycle (componentWillMount etc.)
 * to their advantage.
 *
 * @public
 * @param {Object} props
 *   The properties
 * @param {(ReactElement|ReactElement[])} props.children
 *   One or more plugins
 * @example
 * import Deck, {Plugins} from '@dekk/deck'
 * import Url from '@dekk/url'
 * import Paging from '@dekk/paging'
 *
 * export default (
 *   <Deck>
 *     <Plugins>
 *       <Url/>
 *       <Paging/>
 *     </Plugins>
 *   </Deck>
 * )
 */
var Plugins = function Plugins(props) {
  return props.children;
};

/**
 * @private
 */
Plugins.propTypes = {
  children: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.arrayOf(_propTypes2.default.element)])
};

exports.default = Plugins;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * It allows adding global/static elements to Dekk.
 * Elements render content and are usually pure functions or stateless
 * components.
 *
 * @public
 * @param {Object} props
 *   The properties
 * @param {(ReactElement|ReactElement[])} props.children
 *   One or more elements
 * @example
 * import Deck, {Elements} from '@dekk/deck'
 *
 * const Header = () => <header>Hello Dekk!</header>
 * export default (
 *   <Deck>
 *     <Elements>
 *       <Header/>
 *     </Elements>
 *   </Deck>
 * )
 */
var Elements = function Elements(props) {
  return props.children;
};

/**
 * @private
 */
Elements.propTypes = {
  children: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.arrayOf(_propTypes2.default.element)])
};

exports.default = Elements;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _mobxReact = __webpack_require__(66);

var _utils = __webpack_require__(75);

var _store4 = __webpack_require__(79);

var _store5 = _interopRequireDefault(_store4);

var _wrapper = __webpack_require__(34);

var _wrapper2 = _interopRequireDefault(_wrapper);

var _slidesWrapper = __webpack_require__(84);

var _slidesWrapper2 = _interopRequireDefault(_slidesWrapper);

var _plugins = __webpack_require__(20);

var _plugins2 = _interopRequireDefault(_plugins);

var _elements = __webpack_require__(21);

var _elements2 = _interopRequireDefault(_elements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A wrapper around the slides.
 * `<Deck/>` renders 3 slides (previous, current, next) to allow various
 * transitions.
 *
 * The internal store is handled by mobX. {@link https://github.com/mobxjs/}
 *
 * @class Deck
 * @param {Object} props
 *   The properties
 * @param {(Slide|Slide[]|Elements|Elements[]|Plugins|Plugins[])} props.children
 * @param {(String|Array)} props.mixin
 *
 * @example
 * import React from 'react'
 * import Deck from '@dekk/deck'
 * import Slide from '@dekk/slide'
 *
 * const App = () => (
 *   <Dekk>
 *     <Slide>1</Slide>
 *     <Slide>2</Slide>
 *     <Slide>3</Slide>
 *   </Dekk>
 * )
 */
var Deck = (0, _mobxReact.observer)(_class = function (_Component) {
  _inherits(Deck, _Component);

  function Deck() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Deck);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Deck.__proto__ || Object.getPrototypeOf(Deck)).call.apply(_ref, [this].concat(args))), _this), _this.store = new _store5.default(), _temp), _possibleConstructorReturn(_this, _ret);
  }
  /**
   * Store.
   * It handles paging and fragmentOrder navigation
   * @private
   */


  _createClass(Deck, [{
    key: 'getChildContext',


    /**
     * @private
     * @return {{store: store}}
     *   The child context.
     */
    value: function getChildContext() {
      return {
        store: this.store
      };
    }

    /**
     * @private
     */

  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.buildFragmentHosts(this.props.children);
    }

    /**
     * @private
     */

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      // Rebuild fragmentHost when children change
      // this will prevent undefined hosts while reducing the number
      // of calls
      if (newProps.children !== this.props.children) {
        this.buildFragmentHosts(newProps.children);
      }
    }

    /**
     * @private
     */

  }, {
    key: 'buildFragmentHosts',
    value: function buildFragmentHosts(children) {
      var _this2 = this;

      _react.Children.toArray(children).filter(function (child) {
        return !_this2.slots.includes(child.type);
      }).forEach(function (child, index) {
        if (_this2.store.fragmentHosts.length - 1 < index) _this2.store.fragmentHosts[index] = [];
      });
    }

    /**
     * @private
     */

  }, {
    key: 'render',


    /**
     * @private
     * @return {Wrapper}
     *   The entire Deck inside a Wrapper
     */
    value: function render() {
      return _react2.default.createElement(
        _wrapper2.default,
        { mixin: this.props.mixin },
        this.plugins,
        this.elements,
        _react2.default.createElement(
          _slidesWrapper2.default,
          null,
          this.visibleSlides
        )
      );
    }
  }, {
    key: 'plugins',
    get: function get() {
      var _this3 = this;

      var _store = this.store,
          slideIndex = _store.slideIndex,
          fragmentIndex = _store.fragmentIndex,
          fragmentOrder = _store.fragmentOrder;
      var slideCount = this.slides.length;
      var fragmentCount = this.store.fragmentHosts[slideIndex].length;

      return _react.Children.toArray(this.props.children).filter(function (child) {
        return (typeof child === 'undefined' ? 'undefined' : _typeof(child)) === 'object' && child.type === _plugins2.default;
      }).reduce(function (a, b) {
        return a.concat(b.props.children);
      }, []).filter(Boolean).map(function (plugin, index) {
        return (0, _react.cloneElement)(plugin, _extends({
          key: plugin.type.name + '_' + index
        }, _this3.store.publicMethods, {
          slideIndex: slideIndex,
          slideCount: slideCount,
          fragmentIndex: fragmentIndex,
          fragmentCount: fragmentCount,
          fragmentOrder: fragmentOrder
        }));
      });
    }

    /**
     * @private
     */

  }, {
    key: 'elements',
    get: function get() {
      var _this4 = this;

      var _store2 = this.store,
          slideIndex = _store2.slideIndex,
          fragmentIndex = _store2.fragmentIndex,
          fragmentOrder = _store2.fragmentOrder;
      var slideCount = this.slides.length;
      var fragmentCount = this.store.fragmentHosts[slideIndex].length;

      return _react.Children.toArray(this.props.children).filter(function (child) {
        return (typeof child === 'undefined' ? 'undefined' : _typeof(child)) === 'object' && child.type === _elements2.default;
      }).reduce(function (a, b) {
        return a.concat(b.props.children);
      }, []).filter(Boolean).map(function (element, index) {
        return (0, _react.cloneElement)(element, _extends({
          key: element.type.name + '_' + index
        }, _this4.store.publicMethods, {
          slideIndex: slideIndex,
          slideCount: slideCount,
          fragmentIndex: fragmentIndex,
          fragmentCount: fragmentCount,
          fragmentOrder: fragmentOrder
        }));
      });
    }

    /**
     * @private
     */

  }, {
    key: 'slots',
    get: function get() {
      return [_plugins2.default, _elements2.default];
    }

    /**
     * @private
     */

  }, {
    key: 'slides',
    get: function get() {
      var _this5 = this;

      return _react.Children.toArray(this.props.children).filter(function (child) {
        return !_this5.slots.includes(child.type);
      });
    }

    /**
     * Get the `children` by a range of `+-1` around the current slide.
     * It renders a maximum of 3 slides (previous, current, next)
     * This allows various transitions between slides.
     *
     * @private
     * @return {Array<Slide>} returns an array of max 3 slides
     */

  }, {
    key: 'visibleSlides',
    get: function get() {
      var _store3 = this.store,
          slideIndex = _store3.slideIndex,
          direction = _store3.direction,
          fragmentOrder = _store3.fragmentOrder,
          fragmentHosts = _store3.fragmentHosts;

      return this.slides
      // Assign the original index for the Component
      .map(function (child, originalIndex) {
        return { child: child, originalIndex: originalIndex };
      })
      // Filter by a range of `+-1`
      // Filter first to reduce the number of clones
      // This will not allow us to get all fragments on init but
      // improves performance
      .filter(function (c, i) {
        return (0, _utils.range)(i, slideIndex + 1, slideIndex - 1);
      })
      // Modify the remaining slides (maximum of 3)
      .map(function (_ref2) {
        var child = _ref2.child,
            originalIndex = _ref2.originalIndex;
        var _fragmentHosts$origin = fragmentHosts[originalIndex].length,
            fragmentCount = _fragmentHosts$origin === undefined ? 0 : _fragmentHosts$origin;

        var lastFragment = Math.max(0, fragmentCount - 1);
        // Flags to check for value
        var isCurrent = slideIndex === originalIndex;
        var isPrev = slideIndex === originalIndex + 1;
        var isNext = slideIndex === originalIndex - 1;
        // Flags to check for directional movement
        // Slides could obviously move anywhere but this is something
        // we all understand
        var movesRight = direction === 1;
        var movesLeft = direction === -1;

        // Clone the element to add the logic
        return (0, _react.cloneElement)(child, {
          direction: direction,
          isPrev: isPrev,
          isNext: isNext,
          isCurrent: isCurrent,
          key: 'slide_' + originalIndex,
          fragmentOrder: isCurrent ? fragmentOrder : isPrev ? lastFragment : 0,
          slideIndex: originalIndex,
          fromPrev: isCurrent && movesLeft,
          fromNext: isCurrent && movesRight,
          toPrev: isPrev && movesRight,
          toNext: isNext && movesLeft
        });
      });
    }
  }], [{
    key: 'propTypes',


    /**
     * @private
     * @return {{children: (Slide|Slide[]), mixin: ?String, slave: ?Boolean}}
     *   Allowed propTypes for `<Deck/>`
     */
    get: function get() {
      return {
        children: _propTypes2.default.node.isRequired,
        mixin: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.string])
      };
    }

    /**
     * @private
     */

  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        mixin: ''
      };
    }

    /**
     * Sends context to decendants.
     * Includes the app store to allow all deck components to access the store
     * without having to include its own logic.
     * @private
     * @return {{store: Object, fragmentHost: number}}
     *   The `store` and the `fragmentHost`
     */

  }, {
    key: 'childContextTypes',
    get: function get() {
      return {
        store: _propTypes2.default.object.isRequired,
        fragmentHost: _propTypes2.default.number
      };
    }
  }]);

  return Deck;
}(_react.Component)) || _class;

exports.default = Deck;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(64)


/***/ }),

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styledComponents = __webpack_require__(15);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Styled Wrapper Component. This component is used to wrap the slides.
 * It is private but allows modification by passing a mixin to `<Deck/>`
 * @private
 * @type {StyledComponent}
 * @property {{mixin: ?String, children: Array<Deck.slides,Deck.paging>}} props
 *   A mixin to allow extending Deck's style.
 *
 *   Required Styles are declared as `!important`
 *
 *   **The following properties are locked:**
 *
 *   * `position`
 *   * `top`
 *   * `right`
 *   * `bottom`
 *   * `left`
 *   * `overflow`
 *
 *   In rare cases when these need to be modified an `!important` declaration
 *   is required.
 *   A mixin can be any valid set of CSS rules.
 *
 *   Syntax features are as defined
 *   by styled-components {@link https://www.styled-components.com/docs}
 *
 *   @example
 *   // This private Component shoulld only be used by Decck itself
 *   // It is used as follows
 *   return (
 *     <Wrapper mixin={this.props.mixin}>
 *       {this.paging}
 *       {this.slides}
 *     </Wrapper>
 *   )
 */
var Wrapper = _styledComponents2.default.div.withConfig({
  displayName: 'wrapper__Wrapper'
})(['position:absolute !important;top:0 !important;right:0 !important;bottom:0 !important;left:0 !important;display:flex !important;box-sizing:border-box !important;', ';'], function (_ref) {
  var mixin = _ref.mixin;
  return mixin || '';
});

/**
 * Display name for `<Wrapper/>`
 * @private
 * @type {String}
 */
Wrapper.displayName = 'Wapper';

/**
 * Allowed propTypes for `<Wrapper/>`
 * @private
 * @param {Array<SlidesWrapper,Deck.elements,Dekk.plugins>} children
 * @param {?(String|Array)} mixin
 * @type {Object}
 */
Wrapper.propTypes = {
  children: _propTypes2.default.node,
  mixin: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.string])
};

exports.default = Wrapper;
//# sourceMappingURL=wrapper.js.map

/***/ }),

/***/ 413:
/***/ (function(module, exports) {

module.exports = "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function () {\n  return _react2.default.createElement(\n    'div',\n    null,\n    _react2.default.createElement(\n      _2.default,\n      { style: _.colorSchemes.docco, languange: 'javascript' },\n      code\n    )\n  );\n};\n\nvar _react = require('react');\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _ = require('./');\n\nvar _2 = _interopRequireDefault(_);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar code = 'function hello(name) {\\n  return `hello ${name}!`\\n}';\n//# sourceMappingURL=demo.js.map"

/***/ }),

/***/ 414:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      _2.default,
      {
        cite: 'https://github.com/sinnerschrader/dekk',
        author: 'Gregor Adams' },
      'Presentations done right'
    )
  );
};

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ = __webpack_require__(415);

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=demo.js.map

/***/ }),

/***/ 415:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styledComponents = __webpack_require__(3);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @public
 */
var Quote = function Quote(props) {
  return _react2.default.createElement(
    Figure,
    null,
    _react2.default.createElement(
      BlockQuote,
      { className: props.className, cite: props.cite },
      props.children
    ),
    _react2.default.createElement(
      'figcaption',
      null,
      props.author
    )
  );
};

/**
 * @private
 */
var BlockQuote = _styledComponents2.default.blockquote.withConfig({
  displayName: 'quote__BlockQuote'
})(['margin:0;']);

/**
 * @private
 */
var Figure = _styledComponents2.default.figure.withConfig({
  displayName: 'quote__Figure'
})(['margin:0;']);

/**
 * @private
 */
Quote.propTypes = {
  author: _propTypes2.default.string,
  cite: _propTypes2.default.string,
  className: _propTypes2.default.string,
  children: _propTypes2.default.node.isRequired

  /**
   * @private
   */
};Quote.defaultProps = {
  author: '',
  cite: '',
  className: ''

  /**
   * @private
   */
};Quote.displayName = 'Quote';

exports.default = Quote;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 416:
/***/ (function(module, exports) {

module.exports = "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function () {\n  return _react2.default.createElement(\n    'div',\n    null,\n    _react2.default.createElement(\n      _2.default,\n      {\n        cite: 'https://github.com/sinnerschrader/dekk',\n        author: 'Gregor Adams' },\n      'Presentations done right'\n    )\n  );\n};\n\nvar _react = require('react');\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _ = require('./');\n\nvar _2 = _interopRequireDefault(_);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n//# sourceMappingURL=demo.js.map"

/***/ }),

/***/ 417:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      _2.default,
      null,
      'This is a headline'
    ),
    '.'
  );
};

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ = __webpack_require__(418);

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=demo.js.map

/***/ }),

/***/ 418:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styledComponents = __webpack_require__(3);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @public
 */
var Subtitle = _styledComponents2.default.h2.withConfig({
  displayName: 'subtitle__Subtitle'
})(['margin:0;font-size:var(--subtitle-font-size,2em);text-align:center;']);

/**
 * @private
 */
Subtitle.propTypes = {
  className: _propTypes2.default.string,
  children: _propTypes2.default.node

  /**
   * @private
   */
};Subtitle.displayName = 'Subtitle';

exports.default = Subtitle;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 419:
/***/ (function(module, exports) {

module.exports = "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function () {\n  return _react2.default.createElement(\n    'div',\n    null,\n    _react2.default.createElement(\n      _2.default,\n      null,\n      'This is a headline'\n    ),\n    '.'\n  );\n};\n\nvar _react = require('react');\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _ = require('./');\n\nvar _2 = _interopRequireDefault(_);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n//# sourceMappingURL=demo.js.map"

/***/ }),

/***/ 420:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      _2.default,
      null,
      'Lorem ipsum dolor sit amed.'
    )
  );
};

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ = __webpack_require__(421);

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=demo.js.map

/***/ }),

/***/ 421:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styledComponents = __webpack_require__(3);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @public
 */
var Text = _styledComponents2.default.p.withConfig({
  displayName: 'text__Text'
})(['padding:0;']);
/**
 * @private
 */
Text.propTypes = {
  className: _propTypes2.default.string,
  children: _propTypes2.default.node

  /**
   * @private
   */
};Text.displayName = 'Text';

exports.default = Text;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 422:
/***/ (function(module, exports) {

module.exports = "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function () {\n  return _react2.default.createElement(\n    'div',\n    null,\n    _react2.default.createElement(\n      _2.default,\n      null,\n      'Lorem ipsum dolor sit amed.'\n    )\n  );\n};\n\nvar _react = require('react');\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _ = require('./');\n\nvar _2 = _interopRequireDefault(_);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n//# sourceMappingURL=demo.js.map"

/***/ }),

/***/ 423:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      _2.default,
      null,
      'This is a headline'
    ),
    '.'
  );
};

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ = __webpack_require__(424);

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=demo.js.map

/***/ }),

/***/ 424:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styledComponents = __webpack_require__(3);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @public
 */
var Title = _styledComponents2.default.h1.withConfig({
  displayName: 'title__Title'
})(['margin:0;font-size:var(--title-font-size,4em);text-align:center;']);

/**
 * @private
 */
Title.propTypes = {
  className: _propTypes2.default.string,
  children: _propTypes2.default.node

  /**
   * @private
   */
};Title.displayName = 'Title';

exports.default = Title;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 425:
/***/ (function(module, exports) {

module.exports = "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function () {\n  return _react2.default.createElement(\n    'div',\n    null,\n    _react2.default.createElement(\n      _2.default,\n      null,\n      'This is a headline'\n    ),\n    '.'\n  );\n};\n\nvar _react = require('react');\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _ = require('./');\n\nvar _2 = _interopRequireDefault(_);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n//# sourceMappingURL=demo.js.map"

/***/ }),

/***/ 426:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return _react2.default.createElement(
    'div',
    null,
    'Lorem ipsum ',
    _react2.default.createElement(
      _2.default,
      null,
      'dolor'
    ),
    ' sit',
    ' ',
    _react2.default.createElement(
      _2.default,
      { highlight: true },
      'amed'
    ),
    '.'
  );
};

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ = __webpack_require__(427);

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=demo.js.map

/***/ }),

/***/ 427:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styledComponents = __webpack_require__(3);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @public
 */
var Uppercase = _styledComponents2.default.span.withConfig({
  displayName: 'uppercase__Uppercase'
})(['text-transform:uppercase;']);

/**
 * @private
 */
Uppercase.propTypes = {
  className: _propTypes2.default.string,
  children: _propTypes2.default.node

  /**
   * @private
   */
};Uppercase.displayName = 'Uppercase';

exports.default = Uppercase;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 428:
/***/ (function(module, exports) {

module.exports = "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function () {\n  return _react2.default.createElement(\n    'div',\n    null,\n    'Lorem ipsum ',\n    _react2.default.createElement(\n      _2.default,\n      null,\n      'dolor'\n    ),\n    ' sit',\n    ' ',\n    _react2.default.createElement(\n      _2.default,\n      { highlight: true },\n      'amed'\n    ),\n    '.'\n  );\n};\n\nvar _react = require('react');\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _ = require('./');\n\nvar _2 = _interopRequireDefault(_);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n//# sourceMappingURL=demo.js.map"

/***/ }),

/***/ 44:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _styledComponents = __webpack_require__(12);

/**
 * A simple slide transition.
 *
 * @public
 * @property {Array} in
 *   Fades in
 * @property {Array} out
 *   Fades out
 */
var fade = {
  in: (0, _styledComponents.css)(['opacity:calc(1 - var(--time));']),
  out: (0, _styledComponents.css)(['opacity:var(--time);'])
};

exports.default = fade;
//# sourceMappingURL=fade.js.map

/***/ }),

/***/ 45:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _styledComponents = __webpack_require__(12);

/**
 * A simple slide transition.
 *
 * @public
 * @property {Array} normal
 *   Transition from left to right
 * @property {Array} reverse
 *   Transition from right to left
 * @property {Array} up
 *   Transition upwards
 * @property {Array} down
 *   Transition downwards
 */
var slide = {
  normal: (0, _styledComponents.css)(['transform:translate3d( calc( -100% * var(--direction,-1) * (var(--regulator,0) - var(--time,1)) ),0,0 );']),
  reverse: (0, _styledComponents.css)(['transform:translate3d( calc( 100% * var(--direction,-1) * (var(--regulator,0) - var(--time,1)) ),0,0 );']),
  down: (0, _styledComponents.css)(['transform:translate3d( 0,calc( -100% * var(--direction,-1) * (var(--regulator,0) - var(--time,1)) ),0 );']),
  up: (0, _styledComponents.css)(['transform:translate3d( 0,calc( 100% * var(--direction,-1) * (var(--regulator,0) - var(--time,1)) ),0 );'])
};

exports.default = slide;
//# sourceMappingURL=slide.js.map

/***/ }),

/***/ 54:
/***/ (function(module, exports, __webpack_require__) {


    module.exports['@dekk/autoplay/lib/demo.js'] = __webpack_require__(55);
module.exports['@dekk/autoplay/lib/demo.js'].js = __webpack_require__(105)
module.exports['@dekk/deck/lib/elements/demo.js'] = __webpack_require__(106);
module.exports['@dekk/deck/lib/elements/demo.js'].js = __webpack_require__(107)
module.exports['@dekk/deck/lib/plugins/demo.js'] = __webpack_require__(108);
module.exports['@dekk/deck/lib/plugins/demo.js'].js = __webpack_require__(109)
module.exports['@dekk/paging/lib/demo.js'] = __webpack_require__(110);
module.exports['@dekk/paging/lib/demo.js'].js = __webpack_require__(114)
module.exports['@dekk/text/lib/bold/demo.js'] = __webpack_require__(115);
module.exports['@dekk/text/lib/bold/demo.js'].js = __webpack_require__(118)
module.exports['@dekk/text/lib/center/demo.js'] = __webpack_require__(119);
module.exports['@dekk/text/lib/center/demo.js'].js = __webpack_require__(121)
module.exports['@dekk/text/lib/code/demo.js'] = __webpack_require__(122);
module.exports['@dekk/text/lib/code/demo.js'].js = __webpack_require__(413)
module.exports['@dekk/text/lib/quote/demo.js'] = __webpack_require__(414);
module.exports['@dekk/text/lib/quote/demo.js'].js = __webpack_require__(416)
module.exports['@dekk/text/lib/subtitle/demo.js'] = __webpack_require__(417);
module.exports['@dekk/text/lib/subtitle/demo.js'].js = __webpack_require__(419)
module.exports['@dekk/text/lib/text/demo.js'] = __webpack_require__(420);
module.exports['@dekk/text/lib/text/demo.js'].js = __webpack_require__(422)
module.exports['@dekk/text/lib/title/demo.js'] = __webpack_require__(423);
module.exports['@dekk/text/lib/title/demo.js'].js = __webpack_require__(425)
module.exports['@dekk/text/lib/uppercase/demo.js'] = __webpack_require__(426);
module.exports['@dekk/text/lib/uppercase/demo.js'].js = __webpack_require__(428)
  

/***/ }),

/***/ 55:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function () {
  return _react2.default.createElement(App, null);
};

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _styledComponents = __webpack_require__(58);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _deck = __webpack_require__(33);

var _deck2 = _interopRequireDefault(_deck);

var _slide = __webpack_require__(16);

var _slide2 = _interopRequireDefault(_slide);

var _ = __webpack_require__(104);

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OuterWrapper = _styledComponents2.default.div.withConfig({
  displayName: 'demo__OuterWrapper'
})(['padding-top:3rem;']);

var Wrapper = _styledComponents2.default.div.withConfig({
  displayName: 'demo__Wrapper'
})(['position:relative;height:10rem;overflow:visible;']);

var StyledButton = _styledComponents2.default.button.withConfig({
  displayName: 'demo__StyledButton'
})(['box-sizing:border-box;position:absolute;top:0;left:0;margin:0.5rem;padding:0.25rem 0.5rem;height:2rem;font-size:1rem;display:flex;align-items:center;align-content:center;justify-content:center;background:#ddd;color:#111;border:1px solid #aaa;border-radius:3px;box-shadow:0 2px 4px rgba(0,0,0,0.3);cursor:pointer;&:hover{background:#bbb;border-color:#888;}']);

var mixin = (0, _styledComponents.css)(['background:#333;color:#fff;display:flex;align-items:center;justify-content:center;font-size:3em;']);

var App = function (_Component) {
  _inherits(App, _Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      isPlaying: false
    };
    _this.togglePlay = _this.togglePlay.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: 'togglePlay',
    value: function togglePlay() {
      this.setState(function (prevState) {
        return {
          isPlaying: !prevState.isPlaying
        };
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        OuterWrapper,
        null,
        _react2.default.createElement(
          StyledButton,
          { onClick: this.togglePlay },
          this.state.isPlaying ? 'Pause' : 'Play'
        ),
        _react2.default.createElement(
          Wrapper,
          null,
          _react2.default.createElement(
            _deck2.default,
            null,
            _react2.default.createElement(
              _deck.Plugins,
              null,
              _react2.default.createElement(_2.default, { delay: 3, isPlaying: this.state.isPlaying })
            ),
            [].concat(_toConsumableArray(new Array(60))).map(function (x, i) {
              return _react2.default.createElement(
                _slide2.default,
                {
                  key: i,
                  background: 'hsl(' + 20 * i + ', 50%, 50%)',
                  mixin: mixin },
                'Slide ',
                i + 1
              );
            })
          )
        )
      );
    }
  }]);

  return App;
}(_react.Component);
//# sourceMappingURL=demo.js.map

/***/ }),

/***/ 64:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _plugins = __webpack_require__(20);

Object.defineProperty(exports, 'Plugins', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_plugins).default;
  }
});

var _elements = __webpack_require__(21);

Object.defineProperty(exports, 'Elements', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_elements).default;
  }
});

var _wrapper = __webpack_require__(34);

Object.defineProperty(exports, 'Wrapper', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_wrapper).default;
  }
});

var _deck = __webpack_require__(22);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_deck).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 75:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(76)


/***/ }),

/***/ 76:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _checks = __webpack_require__(77);

Object.keys(_checks).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _checks[key];
    }
  });
});

var _range = __webpack_require__(78);

Object.defineProperty(exports, 'range', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_range).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 77:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable import/prefer-default-export */

/**
 * Checks if a value is numeric.
 * @private
 */
var isNumeric = function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

exports.isNumeric = isNumeric;
//# sourceMappingURL=checks.js.map

/***/ }),

/***/ 78:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = range;
/**
 * @private
 */
function range(n, max) {
  var min = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  return n >= min && n <= max;
}
//# sourceMappingURL=range.js.map

/***/ }),

/***/ 79:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(80)


/***/ }),

/***/ 80:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;

var _v = __webpack_require__(81);

var _v2 = _interopRequireDefault(_v);

var _mobx = __webpack_require__(35);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

/**
 * @private
 */
var Store = (_class = function () {

  /**
   * @private
   * @param {Object} props
   *   The properties
   * @param {number} props.slideIndex
   *   Initially active slideIndex
   */


  /**
   * A collection of hosts for fragments.
   * Each slide is a host.
   * @type {Array}
   */


  /**
   * Index of the currently active fragment
   * @type {number}
   */


  /**
   * Index of the currently active slide
   * Default to `0`. Is needed for the initial load to work correctly.
   * @see {@dekk/fragments/src/index.js~Fragment#render}
   * @type {number}
   */
  function Store() {
    _classCallCheck(this, Store);

    this.id = (0, _v2.default)();

    _initDefineProp(this, 'slideIndex', _descriptor, this);

    _initDefineProp(this, 'fragmentOrder', _descriptor2, this);

    _initDefineProp(this, 'fragmentIndex', _descriptor3, this);

    _initDefineProp(this, 'direction', _descriptor4, this);

    _initDefineProp(this, 'fragmentHosts', _descriptor5, this);

    _initDefineProp(this, 'notes', _descriptor6, this);

    // Bind methods
    this.toSlide = this.toSlide.bind(this);
    this.toNextSlide = this.toNextSlide.bind(this);
    this.toPrevSlide = this.toPrevSlide.bind(this);
    this.toFragment = this.toFragment.bind(this);
    this.toNextFragment = this.toNextFragment.bind(this);
    this.toPrevFragment = this.toPrevFragment.bind(this);
  }

  /**
   * Public methods.
   *
   * These methods can be used to modify the store.
   */


  /**
   * A collection of hosts for fragments.
   * Each slide is a host.
   * @type {Array}
   */


  /**
   * Direction of the slide movement (either -1, 0 or 1)
   * @type {number}
   */


  /**
   * Order of the currently active fragment
   * @type {number}
   */

  /**
   * Store Id
   * @type {String}
   */


  _createClass(Store, [{
    key: 'toSlide',


    /**
     * @private
     */
    value: function toSlide(slideIndex) {
      this.direction = slideIndex > this.slideIndex ? 1 : -1;
      this.slideIndex = slideIndex;
    }

    /**
     * @private
     */

  }, {
    key: 'toNextSlide',
    value: function toNextSlide() {
      this.toSlide(this.slideIndex + 1);
      this.toFragment(0);
    }

    /**
     * @private
     */

  }, {
    key: 'toPrevSlide',
    value: function toPrevSlide() {
      var _fragmentHosts$length = this.fragmentHosts[this.slideIndex - 1].length,
          prevFragmentCount = _fragmentHosts$length === undefined ? 0 : _fragmentHosts$length;

      var prevLastFragment = Math.max(0, prevFragmentCount - 1);
      this.toSlide(this.slideIndex - 1);
      this.toFragment(prevLastFragment);
    }

    /**
     * @private
     */

  }, {
    key: 'toFragment',
    value: function toFragment(fragmentIndex) {
      if (this.fragmentHosts[this.slideIndex].length - 1 >= fragmentIndex) {
        this.fragmentOrder = this.fragmentHosts[this.slideIndex][fragmentIndex];
      } else {
        this.fragmentOrder = undefined;
      }
      this.fragmentIndex = fragmentIndex;
    }

    /**
     * @private
     */

  }, {
    key: 'toNextFragment',
    value: function toNextFragment() {
      this.toFragment(this.fragmentIndex + 1);
    }

    /**
     * @private
     */

  }, {
    key: 'toPrevFragment',
    value: function toPrevFragment() {
      this.toFragment(this.fragmentIndex - 1);
    }
  }, {
    key: 'publicMethods',
    get: function get() {
      return {
        toSlide: this.toSlide,
        toNextSlide: this.toNextSlide,
        toPrevSlide: this.toPrevSlide,
        toFragment: this.toFragment,
        toNextFragment: this.toNextFragment,
        toPrevFragment: this.toPrevFragment
      };
    }
  }]);

  return Store;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'slideIndex', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'fragmentOrder', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'fragmentIndex', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'direction', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, 'fragmentHosts', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, 'notes', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return [].concat(_toConsumableArray(new Array(512))).map(function () {
      return null;
    });
  }
})), _class);
exports.default = Store;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 84:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styledComponents = __webpack_require__(15);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A wrapper around the slides.
 * This will help with the layout e.g. adding
 * padding to Deck and therefore allowing absolute posiitoned
 * static elements via the `Elements` component.
 * @private
 */
var SlidesWrapper = _styledComponents2.default.div.withConfig({
  displayName: 'slides-wrapper__SlidesWrapper'
})(['flex:1 0 100%;height:100%;width:100%;position:relative;overflow:hidden;']);

/**
 * Allowed propTypes for `<SlidesWrapper/>`
 * @private
 * @param {Array<Deck.visibleSlides>} children
 * @type {Object}
 */
SlidesWrapper.propTypes = {
  children: _propTypes2.default.arrayOf(_propTypes2.default.element)
};

exports.default = SlidesWrapper;
//# sourceMappingURL=slides-wrapper.js.map

/***/ }),

/***/ 85:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styledComponents = __webpack_require__(86);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _reactMotion = __webpack_require__(88);

var _animation = __webpack_require__(96);

var _speakerNotes = __webpack_require__(102);

var _speakerNotes2 = _interopRequireDefault(_speakerNotes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A single slide.
 * Renders a slide inside a `react-motion` wrapper.
 * Assigns css-variables to allow various transitions
 * @param {Object} props
 * @param {Boolean} props.isCurrent
 * @param {Boolean} props.isPrev
 * @param {Boolean} props.isNext
 * @param {Boolean} props.toPrev
 * @param {Boolean} props.fromPrev
 * @param {Boolean} props.toNext
 * @param {Boolean} props.fromNext
 * @param {Boolean} props.isPreview
 * @param {Boolean} props.present
 * @param {number} props.fragmentOrder
 * @param {String} props.className
 * @param {(ReactElement|ReactElement[])} props.children
 * @param {Object} props.springSettings
 * @param {number} props.springSettings.stiffness
 * @param {number} props.springSettings.damping
 * @param {number} props.springSettings.precision
 * @param {(Array|String)} props.animation
 * @param {(Array|String)} props.animationIn
 * @param {(Array|String)} props.animationOut
 * @param {(Array|String)} props.mixin
 * @param {String} props.background
 * @param {number} props.slideIndex
 */
var Slide = function (_Component) {
  _inherits(Slide, _Component);

  function Slide() {
    _classCallCheck(this, Slide);

    return _possibleConstructorReturn(this, (Slide.__proto__ || Object.getPrototypeOf(Slide)).apply(this, arguments));
  }

  _createClass(Slide, [{
    key: 'getChildContext',


    /**
     * @private
     */
    value: function getChildContext() {
      return {
        isPreview: this.props.isPreview,
        fragmentHost: this.props.slideIndex,
        fragmentOrder: this.props.fragmentOrder || 0
      };
    }

    /**
     * Helper slots are filtered from the children.
     * These slots are allowed and will be ignored.
     * state setters, notes etc should be added here
     * @private
     */

  }, {
    key: 'getNotes',


    /**
     * Get notes from Items
     * @private
     */
    value: function getNotes(items) {
      return _react.Children.toArray(items).filter(function (child) {
        return child.type === _speakerNotes2.default;
      });
    }

    /**
     * @private
     * @param {(ReactElement|ReactElement[])} notes
     * @param {number} slideIndex
     */

  }, {
    key: 'setNotes',
    value: function setNotes(notes, slideIndex) {
      this.context.store.notes.splice(slideIndex, 1, notes);
    }

    /**
     * @private
     */

  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (this.props.isCurrent) {
        this.setNotes(this.notes, this.props.slideIndex);
      }
    }

    /**
     * @private
     */

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (newProps.isCurrent && newProps.slideIndex !== this.props.slideIndex) {
        this.setNotes(this.getNotes(newProps.children), newProps.slideIndex);
      }
    }

    /**
     * @private
     */

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          isPrev = _props.isPrev,
          isNext = _props.isNext,
          isCurrent = _props.isCurrent;

      var direction = function () {
        if (_this2.props.fromPrev) {
          return -1;
        }
        if (_this2.props.fromNext) {
          return 1;
        }
        if (_this2.props.toPrev) {
          return -1;
        }
        if (_this2.props.toNext) {
          return 1;
        }
        if (isPrev) {
          return -1;
        }
        if (isNext) {
          return 1;
        }
        if (isCurrent) {
          return 0;
        }
        return -1;
      }();

      // Switch spring direction
      var springStyle = {
        time: (0, _reactMotion.spring)(isPrev || isNext ? 1 : 0, _extends({}, this.props.springSettings))
      };
      return _react2.default.createElement(
        _reactMotion.Motion,
        { style: springStyle },
        function (_ref) {
          var time = _ref.time;

          var style = {
            '--time': time
          };
          return _react2.default.createElement(
            StyledSlide,
            {
              className: _this2.props.className,
              style: style,
              direction: direction,
              present: _this2.props.present,
              background: _this2.props.background,
              mixin: _this2.props.mixin,
              animation: _this2.props.animation,
              animationIn: _this2.props.animationIn,
              animationOut: _this2.props.animationOut },
            _this2.content
          );
        }
      );
    }
  }, {
    key: 'helperSlots',
    get: function get() {
      return [_speakerNotes2.default];
    }

    /**
     * Filtered children of the component.
     * Excludes helperSlots
     * @private
     */

  }, {
    key: 'content',
    get: function get() {
      var _this3 = this;

      return _react.Children.toArray(this.props.children).filter(function (child) {
        return !_this3.helperSlots.includes(child.type);
      });
    }

    /**
     * Filtered notes of the slide.
     * @private
     */

  }, {
    key: 'notes',
    get: function get() {
      return this.getNotes(this.props.children);
    }
  }], [{
    key: 'childContextTypes',

    /**
     * @private
     */
    get: function get() {
      return {
        isPreview: _propTypes2.default.bool,
        fragmentOrder: _propTypes2.default.number,
        fragmentHost: _propTypes2.default.number
      };
    }

    /**
     * @private
     */

  }, {
    key: 'propTypes',
    get: function get() {
      return {
        isCurrent: _propTypes2.default.bool,
        isPrev: _propTypes2.default.bool,
        isNext: _propTypes2.default.bool,
        toPrev: _propTypes2.default.bool,
        fromPrev: _propTypes2.default.bool,
        toNext: _propTypes2.default.bool,
        fromNext: _propTypes2.default.bool,
        isPreview: _propTypes2.default.bool,
        present: _propTypes2.default.bool,
        fragmentOrder: _propTypes2.default.number,
        className: _propTypes2.default.string,
        children: _propTypes2.default.node.isRequired,
        springSettings: _propTypes2.default.shape({
          stiffness: _propTypes2.default.number,
          damping: _propTypes2.default.number,
          precision: _propTypes2.default.number
        }),
        animation: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.string]),
        animationIn: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.string]),
        animationOut: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.string]),
        mixin: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.string]),
        background: _propTypes2.default.string,
        slideIndex: _propTypes2.default.number
      };
    }

    /**
     * @private
     */

  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        isCurrent: false,
        isPrev: false,
        isNext: false,
        toPrev: false,
        fromPrev: false,
        toNext: false,
        fromNext: false,
        isPreview: false,
        present: false,
        fragmentOrder: 0,
        className: '',
        springSettings: _reactMotion.presets.stiff,
        animation: '',
        animationIn: '',
        animationOut: '',
        mixin: '',
        background: '',
        slideIndex: -1
      };
    }

    /**
     * Get contextTypes
     * @private
     *
     * @return {{store: store, fragmentHost: number, hostedFragmentOrder: number}}
     */

  }, {
    key: 'contextTypes',
    get: function get() {
      return {
        store: _propTypes2.default.object.isRequired
      };
    }
  }]);

  return Slide;
}(_react.Component);

/**
 * @private
 */


var SlideDirection = _styledComponents2.default.div.withConfig({
  displayName: 'src__SlideDirection'
})(['--direction:', ';z-index:', ';'], function (_ref2) {
  var direction = _ref2.direction;
  return direction;
}, function (_ref3) {
  var isCurrent = _ref3.isCurrent;
  return isCurrent ? 1 : 0;
});

/**
 * @private
 */
var switchAnimation = function switchAnimation(props) {
  if (props.direction === 1 && props.animationIn) {
    return props.animationIn;
  }
  if (props.direction === -1 && props.animationOut) {
    return props.animationOut;
  }
  return props.animation || _animation.slide.normal;
};

/**
 * @private
 */
var StyledSlide = (0, _styledComponents2.default)(SlideDirection).withConfig({
  displayName: 'src__StyledSlide'
})(['position:absolute;top:0;left:0;overflow:hidden;color:var(--slide-color,currentColor);', ';background:', ';background-size:cover;', ';'], function (_ref4) {
  var mixin = _ref4.mixin;
  return mixin || '';
}, function (_ref5) {
  var background = _ref5.background;
  return background || 'var(--slide-background, none)';
}, function (props) {
  return props.present ? '\n      transform: scale3d(var(--scale), var(--scale), 1);\n      transform-origin: 0 0;\n      width: calc(100% / var(--scale));\n      height: calc(100% / var(--scale));\n      right: auto;\n      bottom: auto;\n    ' : '\n      right: 0;\n      bottom: 0;\n      ' + switchAnimation(props) + ';\n    ';
});

exports.default = Slide;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 96:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(97)


/***/ }),

/***/ 97:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cube = __webpack_require__(98);

Object.defineProperty(exports, 'cube', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_cube).default;
  }
});

var _fade = __webpack_require__(44);

Object.defineProperty(exports, 'fade', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_fade).default;
  }
});

var _flip = __webpack_require__(100);

Object.defineProperty(exports, 'flip', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_flip).default;
  }
});

var _slide = __webpack_require__(45);

Object.defineProperty(exports, 'slide', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_slide).default;
  }
});

var _fadeSlide = __webpack_require__(101);

Object.defineProperty(exports, 'fadeSlide', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_fadeSlide).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 98:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _styledComponents = __webpack_require__(12);

/**
 * A sliding fade transition.
 * These transitions are intended to be used for slides.
 * They are based on viewport-units and therefore only look good on
 * full viewport coverage.
 *
 * @public
 * @property {Array} slideX
 *   Cube rotation on the x axis
 * @property {Array} slideY
 *   Cube rotation on the y axis
 * @property {Array} slideInvertX
 *   Inverted cube rotation on the x axis
 * @property {Array} slideInvertY
 *   Inverted cube rotation on the y axis
 */
var cube = {
  slideX: (0, _styledComponents.css)(['backface-visibility:hidden;transform:perspective(200vw) translate3d(0,0,-50vw) rotate3d(0,1,0,calc(90deg * var(--direction,-1) * var(--time,1))) translate3d(0,0,50vw);']),
  slideY: (0, _styledComponents.css)(['backface-visibility:hidden;transform:perspective(200vh) translate3d(0,0,-50vh) rotate3d(1,0,0,calc(90deg * var(--direction,-1) * var(--time,1))) translate3d(0,0,50vh);']),
  slideInvertX: (0, _styledComponents.css)(['backface-visibility:hidden;transform:perspective(200vw) translate3d(0,0,50vw) rotate3d(0,1,0,calc(-90deg * var(--direction,-1) * var(--time,1))) translate3d(0,0,-50vw);']),
  slideInvertY: (0, _styledComponents.css)(['backface-visibility:hidden;transform:perspective(200vh) translate3d(0,0,50vh) rotate3d(1,0,0,calc(-90deg * var(--direction,-1) * var(--time,1))) translate3d(0,0,-50vh);'])
};

exports.default = cube;
//# sourceMappingURL=cube.js.map

/***/ })

},[54]);