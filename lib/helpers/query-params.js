'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var getQueryParams = exports.getQueryParams = function getQueryParams(search) {
  var queryParams = {};
  search.replace(/^\?/, '').split('&').forEach(function (str) {
    var _str$split = str.split('='),
        _str$split2 = _slicedToArray(_str$split, 2),
        key = _str$split2[0],
        value = _str$split2[1];

    switch (value) {
      case 'true':
        queryParams[key] = true;
        break;
      case 'false':
        queryParams[key] = false;
        break;
      default:
        queryParams[key] = value;
        break;
    }
  });
  return queryParams;
};

var _getQueryParams = getQueryParams(window.location.search),
    live = _getQueryParams.live,
    present = _getQueryParams.present,
    edit = _getQueryParams.edit;

exports.EDIT = edit;
exports.LIVE = live;
exports.PRESENT = present;