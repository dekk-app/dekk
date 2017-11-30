'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reducers = require('./reducers');

var reducers = _interopRequireWildcard(_reducers);

var _deck = require('./components/deck');

var _deck2 = _interopRequireDefault(_deck);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reducer = (0, _redux.combineReducers)(_extends({}, reducers));

var store = (0, _redux.createStore)(reducer);
var Dekk = function Dekk(props) {
  return _react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    props.slave ? _react2.default.createElement(_deck.Deck, props) : _react2.default.createElement(_deck2.default, props)
  );
};

Dekk.propTypes = {
  slave: _propTypes2.default.bool
};

exports.default = Dekk;