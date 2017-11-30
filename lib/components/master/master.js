'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _pubnubReact = require('pubnub-react');

var _pubnubReact2 = _interopRequireDefault(_pubnubReact);

var _reactDraggable = require('react-draggable');

var _reactDraggable2 = _interopRequireDefault(_reactDraggable);

var _queryParams = require('../../helpers/query-params');

var _actions = require('../../actions');

var _slide = require('../slide');

var _slide2 = _interopRequireDefault(_slide);

var _notes = require('../notes');

var _notes2 = _interopRequireDefault(_notes);

var _warning = require('./warning');

var _warning2 = _interopRequireDefault(_warning);

var _helpers = require('./helpers');

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Master = function (_Component) {
  _inherits(Master, _Component);

  function Master(props) {
    _classCallCheck(this, Master);

    var _this = _possibleConstructorReturn(this, (Master.__proto__ || Object.getPrototypeOf(Master)).call(this, props));

    if (_typeof(props.pubnub) === 'object' && (_queryParams.LIVE || _queryParams.PRESENT)) {
      _this.pubnub = new _pubnubReact2.default({
        publishKey: props.pubnub.publishKey,
        subscribeKey: props.pubnub.subscribeKey
      });
      _this.pubnub.init(_this);
    }
    return _this;
  }

  _createClass(Master, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      if (this.pubnub && _queryParams.LIVE) {
        this.pubnub.subscribe({
          channels: ['slots'],
          withPresence: true
        });

        this.pubnub.getMessage('slots', function (msg) {
          var _msg$message = msg.message,
              offset = _msg$message.offset,
              name = _msg$message.name;

          _this2.props.setElementOffset(offset, name);
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.pubnub && _queryParams.LIVE) {
        this.pubnub.unsubscribe({
          channels: ['slots']
        });
      }
    }
  }, {
    key: 'handleStop',
    value: function handleStop(name, e, data) {
      var offset = { x: data.x, y: data.y };
      this.props.setElementOffset(offset, name);
      if (this.pubnub && _queryParams.PRESENT) {
        this.pubnub.publish({
          message: { name: name, offset: offset },
          channel: 'slots'
        });
      }
    }
  }, {
    key: 'handleDrag',
    value: function handleDrag(name, e, data) {
      var offset = { x: data.x, y: data.y };
      this.props.setElementOffset(offset, name);
      if (this.pubnub && _queryParams.PRESENT) {
        this.pubnub.publish({
          message: { name: name, offset: offset },
          channel: 'slots'
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      // All `Slot` instances
      var slots = _react.Children.toArray(this.props.children).filter(function (child) {
        return child.type === _helpers.Slot;
      });

      // All `Static` instances
      var statics = _react.Children.toArray(this.props.children).filter(function (child) {
        return child.type === _helpers.Static;
      });

      // Helper slots are filtered from the children.
      var helperSlots = [_notes2.default];

      // Filtered children of the component.
      // Excludes helperSlots
      var content = _react.Children.toArray(this.props.content).filter(function (child) {
        return !helperSlots.includes(child.type);
      });

      var filledStatics = statics.map(function (item, i) {
        return _react2.default.createElement(
          'div',
          { key: 'static__' + i,
            'data-static': item.props.name },
          item.props.children
        );
      });

      var filledSlots = slots.map(function (item, i) {
        var _item$props = item.props,
            only = _item$props.only,
            not = _item$props.not,
            required = _item$props.required,
            component = _item$props.component,
            name = _item$props.name;

        var index = content.map(function (child) {
          return child.type;
        }).indexOf(component);
        if (index < 0) {
          if (required) {
            return _react2.default.createElement(
              'div',
              { key: 'slot__' + i, 'data-slot': name, className: _styles2.default.missing },
              _react2.default.createElement(_warning2.default, _extends({}, item.props, { missing: true }))
            );
          }
          return null;
        }
        var children = _react.Children.toArray(content[index].props.children).map(function (child, idx) {
          var pageIndex = _this3.props.pageIndex;

          var slotId = pageIndex + '.' + i + '.' + idx;
          var draggableOptions = {
            position: _this3.props.offset[slotId],
            onStop: _this3.handleStop.bind(_this3, slotId),
            onDrag: _this3.handleDrag.bind(_this3, slotId),
            children: child
          };
          if (only) {
            if (only.includes(child.type)) {
              return _queryParams.EDIT ? _react2.default.createElement(_reactDraggable2.default, _extends({ key: 'slot_' + idx
              }, draggableOptions)) : child;
            }
            return _react2.default.createElement(_warning2.default, _extends({}, item.props, {
              key: 'slot_' + idx,
              type: child.type && child.type.name || '"' + child + '"',
              invalid: true }));
          }
          if (not) {
            if (not.includes(child.type)) {
              return _react2.default.createElement(_warning2.default, _extends({}, item.props, {
                key: 'slot_' + idx,
                type: child.type && child.type.name || '"' + child + '"',
                invalid: true }));
            }
            return _queryParams.EDIT ? _react2.default.createElement(_reactDraggable2.default, _extends({ key: 'slot_' + idx
            }, draggableOptions)) : child;
          }
          return _queryParams.EDIT ? _react2.default.createElement(_reactDraggable2.default, _extends({ key: 'slot_' + idx
          }, draggableOptions)) : child;
        });
        if (required && children.length === 0) {
          return _react2.default.createElement(
            'div',
            { key: 'item__' + i, 'data-slot': item.props.name, className: _styles2.default.missing },
            _react2.default.createElement(_warning2.default, _extends({}, item.props, { missing: true }))
          );
        }
        return _react2.default.createElement(
          'div',
          { key: 'item__' + i,
            'data-slot': item.props.name },
          children
        );
      }).filter(function (x) {
        return Boolean(x);
      });

      var notes = _queryParams.PRESENT ? _react2.default.createElement(
        'div',
        { className: _styles2.default.notes },
        _react.Children.toArray(this.props.content).filter(function (child) {
          return child.type === _notes2.default;
        })
      ) : null;

      return _react2.default.createElement(
        _slide2.default,
        this.props,
        filledStatics,
        filledSlots,
        notes
      );
    }
  }]);

  return Master;
}(_react.Component);

Master.propTypes = {
  children: _propTypes2.default.oneOfType([_propTypes2.default.instanceOf(_helpers.Slot), _propTypes2.default.instanceOf(_helpers.Static)]),
  content: _propTypes2.default.node,
  pubnub: _propTypes2.default.shape({
    publishKey: _propTypes2.default.string,
    subscribeKey: _propTypes2.default.string
  }),
  pageIndex: _propTypes2.default.number,
  setElementOffset: _propTypes2.default.func,
  offset: _propTypes2.default.object
};

exports.default = (0, _reactRedux.connect)(function (state) {
  return {
    page: state.goToPage.page,
    offset: state.setElementOffset.offset
  };
}, { setElementOffset: _actions.setElementOffset })(Master);