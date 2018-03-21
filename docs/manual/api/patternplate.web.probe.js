window["patternplate-probe"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 427);
/******/ })
/************************************************************************/
/******/ ({

/***/ 13:
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 427:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/* eslint-env browser */
/* eslint-disable no-var */
const querystring = __webpack_require__(428);
const ARSON = __webpack_require__(64);
const { WebSocketClient } = __webpack_require__(436);

main();

function main() {
  const query = querystring.parse(global.location.search.slice(1));

  if (query.resize === "true") {
    __webpack_require__(439).iframeResizerContentWindow;
  }

  if (query.reload === "true") {
    const ws = new WebSocketClient({
      src: `ws://${global.location.host}/api/`,
      reconnect: true,
      interval: 1000
    });

    ws.open();

    ws.onMessage(envelope => {
      const message = ARSON.parse(envelope.data);
      if (message.type === "start") {
        window.location.reload();
      }
    });
  }

  window.addEventListener("keydown", e => {
    top.postMessage(ARSON.stringify({
      type: "keydown",
      payload: {
        keyCode: (e.data || e).keyCode,
        altKey: e.altKey,
        ctrlKey: e.ctrlKey
      }
    }), "*");
  });
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ }),

/***/ 428:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(429);
exports.encode = exports.stringify = __webpack_require__(430);


/***/ }),

/***/ 429:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),

/***/ 430:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),

/***/ 431:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {var toString = Object.prototype.toString;
var dateTag = "[object Date]";
var regExpTag = "[object RegExp]";
var setTag = "[object Set]";
var mapTag = "[object Map]";

var arson = __webpack_require__(64);

typeof Buffer === "function" &&
typeof Buffer.isBuffer === "function" &&
arson.registerType("Buffer", {
  deconstruct: function (buf) {
    return Buffer.isBuffer(buf) && [buf.toString("base64"), "base64"];
  },

  // The reconstruct function will be called twice: once with no
  // arguments, which allows it to return a placeholder object reference;
  // and once with one argument, a copy of the array returned by the
  // deconstruct function. For immutable types like Buffer, Date, and
  // RegExp, the reconstruct function should return a falsy value when it
  // receives no arguments, since there is no way to create an empty
  // Buffer or Date and later fill in its contents.  For container types
  // like Map and Set, the reconstruct function must return an empty
  // instance of the container when it receives no arguments, so that we
  // can fill in that empty container later. This two-phased strategy is
  // essential for decoding containers that contain themselves.
  reconstruct: function (args) {
    return args && new Buffer(args[0], args[1]);
  }
});

arson.registerType("Date", {
  deconstruct: function (date) {
    return toString.call(date) === dateTag && [date.toJSON()];
  },

  reconstruct: function (args) {
    return args && new Date(args[0]);
  }
});

arson.registerType("RegExp", {
  deconstruct: function (exp) {
    if (toString.call(exp) === regExpTag) {
      var args = [exp.source];
      var flags = "";

      if (exp.ignoreCase) flags += "i";
      if (exp.multiline) flags += "m";
      if (exp.global) flags += "g";

      if (flags) {
        args.push(flags);
      }

      return args;
    }
  },

  reconstruct: function (args) {
    return args && new RegExp(args[0], args[1]);
  }
});

typeof Set === "function" &&
typeof Array.from === "function" &&
arson.registerType("Set", {
  deconstruct: function (set) {
    if (toString.call(set) === setTag) {
      return Array.from(set);
    }
  },

  reconstruct: function (values) {
    if (values) {
      values.forEach(this.add, this);
    } else {
      return new Set;
    }
  }
});

typeof Map === "function" &&
typeof Array.from === "function" &&
arson.registerType("Map", {
  deconstruct: function (map) {
    if (toString.call(map) === mapTag) {
      return Array.from(map);
    }
  },

  reconstruct: function (entries) {
    if (entries) {
      entries.forEach(function (entry) {
        this.set(entry[0], entry[1]);
      }, this);
    } else {
      return new Map;
    }
  }
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(432).Buffer))

/***/ }),

/***/ 432:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(433)
var ieee754 = __webpack_require__(434)
var isArray = __webpack_require__(435)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ }),

/***/ 433:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr((len * 3 / 4) - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0; i < l; i += 4) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = ((uint8[i] << 16) & 0xFF0000) + ((uint8[i + 1] << 8) & 0xFF00) + (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),

/***/ 434:
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ 435:
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ 436:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(437);


/***/ }),

/***/ 437:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {const _require = __webpack_require__(438),
      EventEmitter = _require.EventEmitter;

module.exports.WebSocketClient = class WebSocketClient {
  constructor({
    src,
    reconnect,
    interval
  }) {
    this.src = src;
    this.reconnect = reconnect;
    this.interval = interval;
    this.opened = false;
    this.ended = false;
    this.ee = new EventEmitter();
  }

  open() {
    const exec = (type, args) => this.ee.listeners(type).forEach(l => l(...args));

    const open = () => {
      this.instance = new global.WebSocket(this.src); // Make Chrome behave and close the websocket connection
      // before unloading the browsing context. Ref: https://github.com/websockets/ws/issues/1256

      global.addEventListener("beforeunload", this.close);
      this.instance.addEventListener("open", (...args) => {
        this.opened = true;
        exec("open", args);
      });
      this.instance.addEventListener("close", (...args) => {
        global.removeEventListener("beforeunload", this.close);
        this.opened = false;
        exec("close", args);
      });
      this.instance.addEventListener("error", (...args) => {
        global.removeEventListener("beforeunload", this.close);
        this.opened = false;
        exec("error", args);
      });
      this.instance.addEventListener("message", (...args) => {
        exec("message", args);
      });
    };

    open();

    if (this.reconnect) {
      this.loop = setInterval(() => {
        if (this.ended || this.opened) {
          return;
        }

        open();
      }, this.interval);
    }
  }

  close() {
    this.ended = true;

    if (this.opened) {
      this.instance.close();
    }
  }

  onOpen(handler) {
    this.ee.on("open", handler);
  }

  onClose(handler) {
    this.ee.on("close", handler);
    this.instance.addEventListener("close", handler);
  }

  onError(handler) {
    this.ee.on("error", handler);
    this.instance.addEventListener("error", handler);
  }

  onMessage(handler) {
    this.ee.on("message", handler);
    this.instance.addEventListener("message", handler);
  }

};
//# sourceMappingURL=index.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ }),

/***/ 438:
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),

/***/ 439:
/***/ (function(module, exports, __webpack_require__) {

"use strict";



module.exports = __webpack_require__(440);


/***/ }),

/***/ 440:
/***/ (function(module, exports, __webpack_require__) {

exports.iframeResizer = __webpack_require__(441);
exports.iframeResizerContentWindow = __webpack_require__(442);


/***/ }),

/***/ 441:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 * File: iframeResizer.js
 * Desc: Force iframes to size to content.
 * Requires: iframeResizer.contentWindow.js to be loaded into the target frame.
 * Doc: https://github.com/davidjbradshaw/iframe-resizer
 * Author: David J. Bradshaw - dave@bradshaw.net
 * Contributor: Jure Mav - jure.mav@gmail.com
 * Contributor: Reed Dadoune - reed@dadoune.com
 */


;(function(undefined) {
  'use strict';

  if(typeof window === 'undefined') return; // don't run for server side render

  var
    count                 = 0,
    logEnabled            = false,
    hiddenCheckEnabled    = false,
    msgHeader             = 'message',
    msgHeaderLen          = msgHeader.length,
    msgId                 = '[iFrameSizer]', //Must match iframe msg ID
    msgIdLen              = msgId.length,
    pagePosition          = null,
    requestAnimationFrame = window.requestAnimationFrame,
    resetRequiredMethods  = {max:1,scroll:1,bodyScroll:1,documentElementScroll:1},
    settings              = {},
    timer                 = null,
    logId                 = 'Host Page',

    defaults              = {
      autoResize                : true,
      bodyBackground            : null,
      bodyMargin                : null,
      bodyMarginV1              : 8,
      bodyPadding               : null,
      checkOrigin               : true,
      inPageLinks               : false,
      enablePublicMethods       : true,
      heightCalculationMethod   : 'bodyOffset',
      id                        : 'iFrameResizer',
      interval                  : 32,
      log                       : false,
      maxHeight                 : Infinity,
      maxWidth                  : Infinity,
      minHeight                 : 0,
      minWidth                  : 0,
      resizeFrom                : 'parent',
      scrolling                 : false,
      sizeHeight                : true,
      sizeWidth                 : false,
      warningTimeout            : 5000,
      tolerance                 : 0,
      widthCalculationMethod    : 'scroll',
      closedCallback            : function() {},
      initCallback              : function() {},
      messageCallback           : function() {warn('MessageCallback function not defined');},
      resizedCallback           : function() {},
      scrollCallback            : function() {return true;}
    };

  function addEventListener(obj,evt,func) {
    /* istanbul ignore else */ // Not testable in PhantonJS
    if ('addEventListener' in window) {
      obj.addEventListener(evt,func, false);
    } else if ('attachEvent' in window) {//IE
      obj.attachEvent('on'+evt,func);
    }
  }

  function removeEventListener(el,evt,func) {
    /* istanbul ignore else */ // Not testable in phantonJS
    if ('removeEventListener' in window) {
      el.removeEventListener(evt,func, false);
    } else if ('detachEvent' in window) { //IE
      el.detachEvent('on'+evt,func);
    }
  }

  function setupRequestAnimationFrame() {
    var
      vendors = ['moz', 'webkit', 'o', 'ms'],
      x;

    // Remove vendor prefixing if prefixed and break early if not
    for (x = 0; x < vendors.length && !requestAnimationFrame; x += 1) {
      requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    }

    if (!(requestAnimationFrame)) {
      log('setup','RequestAnimationFrame not supported');
    }
  }

  function getMyID(iframeId) {
    var retStr = 'Host page: '+iframeId;

    if (window.top !== window.self) {
      if (window.parentIFrame && window.parentIFrame.getId) {
        retStr = window.parentIFrame.getId()+': '+iframeId;
      } else {
        retStr = 'Nested host page: '+iframeId;
      }
    }

    return retStr;
  }

  function formatLogHeader(iframeId) {
    return msgId + '[' + getMyID(iframeId) + ']';
  }

  function isLogEnabled(iframeId) {
    return settings[iframeId] ? settings[iframeId].log : logEnabled;
  }

  function log(iframeId,msg) {
    output('log',iframeId,msg,isLogEnabled(iframeId));
  }

  function info(iframeId,msg) {
    output('info',iframeId,msg,isLogEnabled(iframeId));
  }

  function warn(iframeId,msg) {
    output('warn',iframeId,msg,true);
  }

  function output(type,iframeId,msg,enabled) {
    if (true === enabled && 'object' === typeof window.console) {
      console[type](formatLogHeader(iframeId),msg);
    }
  }

  function iFrameListener(event) {
    function resizeIFrame() {
      function resize() {
        setSize(messageData);
        setPagePosition(iframeId);
        callback('resizedCallback',messageData);
      }

      ensureInRange('Height');
      ensureInRange('Width');

      syncResize(resize,messageData,'init');
    }

    function processMsg() {
      var data = msg.substr(msgIdLen).split(':');

      return {
        iframe: settings[data[0]] && settings[data[0]].iframe,
        id:     data[0],
        height: data[1],
        width:  data[2],
        type:   data[3]
      };
    }

    function ensureInRange(Dimension) {
      var
        max  = Number(settings[iframeId]['max' + Dimension]),
        min  = Number(settings[iframeId]['min' + Dimension]),
        dimension = Dimension.toLowerCase(),
        size = Number(messageData[dimension]);

      log(iframeId,'Checking ' + dimension + ' is in range ' + min + '-' + max);

      if (size<min) {
        size=min;
        log(iframeId,'Set ' + dimension + ' to min value');
      }

      if (size>max) {
        size=max;
        log(iframeId,'Set ' + dimension + ' to max value');
      }

      messageData[dimension] = '' + size;
    }


    function isMessageFromIFrame() {
      function checkAllowedOrigin() {
        function checkList() {
          var
            i = 0,
            retCode = false;

          log(iframeId,'Checking connection is from allowed list of origins: ' + checkOrigin);

          for (; i < checkOrigin.length; i++) {
            if (checkOrigin[i] === origin) {
              retCode = true;
              break;
            }
          }
          return retCode;
        }

        function checkSingle() {
          var remoteHost  = settings[iframeId] && settings[iframeId].remoteHost;
          log(iframeId,'Checking connection is from: '+remoteHost);
          return origin === remoteHost;
        }

        return checkOrigin.constructor === Array ? checkList() : checkSingle();
      }

      var
        origin      = event.origin,
        checkOrigin = settings[iframeId] && settings[iframeId].checkOrigin;

      if (checkOrigin && (''+origin !== 'null') && !checkAllowedOrigin()) {
        throw new Error(
          'Unexpected message received from: ' + origin +
          ' for ' + messageData.iframe.id +
          '. Message was: ' + event.data +
          '. This error can be disabled by setting the checkOrigin: false option or by providing of array of trusted domains.'
        );
      }

      return true;
    }

    function isMessageForUs() {
      return msgId === (('' + msg).substr(0,msgIdLen)) && (msg.substr(msgIdLen).split(':')[0] in settings); //''+Protects against non-string msg
    }

    function isMessageFromMetaParent() {
      //Test if this message is from a parent above us. This is an ugly test, however, updating
      //the message format would break backwards compatibity.
      var retCode = messageData.type in {'true':1,'false':1,'undefined':1};

      if (retCode) {
        log(iframeId,'Ignoring init message from meta parent page');
      }

      return retCode;
    }

    function getMsgBody(offset) {
      return msg.substr(msg.indexOf(':')+msgHeaderLen+offset);
    }

    function forwardMsgFromIFrame(msgBody) {
      log(iframeId,'MessageCallback passed: {iframe: '+ messageData.iframe.id + ', message: ' + msgBody + '}');
      callback('messageCallback',{
        iframe: messageData.iframe,
        message: JSON.parse(msgBody)
      });
      log(iframeId,'--');
    }

    function getPageInfo() {
      var
        bodyPosition   = document.body.getBoundingClientRect(),
        iFramePosition = messageData.iframe.getBoundingClientRect();

      return JSON.stringify({
        iframeHeight: iFramePosition.height,
        iframeWidth:  iFramePosition.width,
        clientHeight: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
        clientWidth:  Math.max(document.documentElement.clientWidth,  window.innerWidth  || 0),
        offsetTop:    parseInt(iFramePosition.top  - bodyPosition.top,  10),
        offsetLeft:   parseInt(iFramePosition.left - bodyPosition.left, 10),
        scrollTop:    window.pageYOffset,
        scrollLeft:   window.pageXOffset
      });
    }

    function sendPageInfoToIframe(iframe,iframeId) {
      function debouncedTrigger() {
        trigger(
          'Send Page Info',
          'pageInfo:' + getPageInfo(),
          iframe,
          iframeId
        );
      }

      debouce(debouncedTrigger,32);
    }


    function startPageInfoMonitor() {
      function setListener(type,func) {
        function sendPageInfo() {
          if (settings[id]) {
            sendPageInfoToIframe(settings[id].iframe,id);
          } else {
            stop();
          }
        }

        ['scroll','resize'].forEach(function(evt) {
          log(id, type +  evt + ' listener for sendPageInfo');
          func(window,evt,sendPageInfo);
        });
      }

      function stop() {
        setListener('Remove ', removeEventListener);
      }

      function start() {
        setListener('Add ', addEventListener);
      }

      var id = iframeId; //Create locally scoped copy of iFrame ID

      start();

      if (settings[id]) {
        settings[id].stopPageInfo = stop;
      }
    }

    function stopPageInfoMonitor() {
      if (settings[iframeId] && settings[iframeId].stopPageInfo) {
        settings[iframeId].stopPageInfo();
        delete settings[iframeId].stopPageInfo;
      }
    }

    function checkIFrameExists() {
      var retBool = true;

      if (null === messageData.iframe) {
        warn(iframeId,'IFrame ('+messageData.id+') not found');
        retBool = false;
      }
      return retBool;
    }

    function getElementPosition(target) {
      var iFramePosition = target.getBoundingClientRect();

      getPagePosition(iframeId);

      return {
        x: Math.floor( Number(iFramePosition.left) + Number(pagePosition.x) ),
        y: Math.floor( Number(iFramePosition.top)  + Number(pagePosition.y) )
      };
    }

    function scrollRequestFromChild(addOffset) {
      /* istanbul ignore next */  //Not testable in Karma
      function reposition() {
        pagePosition = newPosition;
        scrollTo();
        log(iframeId,'--');
      }

      function calcOffset() {
        return {
          x: Number(messageData.width) + offset.x,
          y: Number(messageData.height) + offset.y
        };
      }

      function scrollParent() {
        if (window.parentIFrame) {
          window.parentIFrame['scrollTo'+(addOffset?'Offset':'')](newPosition.x,newPosition.y);
        } else {
          warn(iframeId,'Unable to scroll to requested position, window.parentIFrame not found');
        }
      }

      var
        offset = addOffset ? getElementPosition(messageData.iframe) : {x:0,y:0},
        newPosition = calcOffset();

      log(iframeId,'Reposition requested from iFrame (offset x:'+offset.x+' y:'+offset.y+')');

      if(window.top !== window.self) {
        scrollParent();
      } else {
        reposition();
      }
    }

    function scrollTo() {
      if (false !== callback('scrollCallback',pagePosition)) {
        setPagePosition(iframeId);
      } else {
        unsetPagePosition();
      }
    }

    function findTarget(location) {
      function jumpToTarget() {
        var jumpPosition = getElementPosition(target);

        log(iframeId,'Moving to in page link (#'+hash+') at x: '+jumpPosition.x+' y: '+jumpPosition.y);
        pagePosition = {
          x: jumpPosition.x,
          y: jumpPosition.y
        };

        scrollTo();
        log(iframeId,'--');
      }

      function jumpToParent() {
        if (window.parentIFrame) {
          window.parentIFrame.moveToAnchor(hash);
        } else {
          log(iframeId,'In page link #'+hash+' not found and window.parentIFrame not found');
        }
      }

      var
        hash     = location.split('#')[1] || '',
        hashData = decodeURIComponent(hash),
        target   = document.getElementById(hashData) || document.getElementsByName(hashData)[0];

      if (target) {
        jumpToTarget();
      } else if(window.top!==window.self) {
        jumpToParent();
      } else {
        log(iframeId,'In page link #'+hash+' not found');
      }
    }

    function callback(funcName,val) {
      return chkCallback(iframeId,funcName,val);
    }

    function actionMsg() {

      if(settings[iframeId] && settings[iframeId].firstRun) firstRun();

      switch(messageData.type) {
      case 'close':
        if(settings[iframeId].closeRequestCallback) chkCallback(iframeId, 'closeRequestCallback', settings[iframeId].iframe);
        else closeIFrame(messageData.iframe);
        break;
      case 'message':
        forwardMsgFromIFrame(getMsgBody(6));
        break;
      case 'scrollTo':
        scrollRequestFromChild(false);
        break;
      case 'scrollToOffset':
        scrollRequestFromChild(true);
        break;
      case 'pageInfo':
        sendPageInfoToIframe(settings[iframeId] && settings[iframeId].iframe,iframeId);
        startPageInfoMonitor();
        break;
      case 'pageInfoStop':
        stopPageInfoMonitor();
        break;
      case 'inPageLink':
        findTarget(getMsgBody(9));
        break;
      case 'reset':
        resetIFrame(messageData);
        break;
      case 'init':
        resizeIFrame();
        callback('initCallback',messageData.iframe);
        break;
      default:
        resizeIFrame();
      }
    }

    function hasSettings(iframeId) {
      var retBool = true;

      if (!settings[iframeId]) {
        retBool = false;
        warn(messageData.type + ' No settings for ' + iframeId + '. Message was: ' + msg);
      }

      return retBool;
    }

    function iFrameReadyMsgReceived() {
      for (var iframeId in settings) {
        trigger('iFrame requested init',createOutgoingMsg(iframeId),document.getElementById(iframeId),iframeId);
      }
    }

    function firstRun() {
      if (settings[iframeId]) {
        settings[iframeId].firstRun = false;
      }
    }

    function clearWarningTimeout() {
      if (settings[iframeId]) {
        clearTimeout(settings[iframeId].msgTimeout);
        settings[iframeId].warningTimeout = 0;
      }
    }

    var
      msg = event.data,
      messageData = {},
      iframeId = null;

    if('[iFrameResizerChild]Ready' === msg) {
      iFrameReadyMsgReceived();
    } else if (isMessageForUs()) {
      messageData = processMsg();
      iframeId    = logId = messageData.id;
      if (settings[iframeId]) {
        settings[iframeId].loaded = true;
      }

      if (!isMessageFromMetaParent() && hasSettings(iframeId)) {
        log(iframeId,'Received: '+msg);

        if ( checkIFrameExists() && isMessageFromIFrame() ) {
          actionMsg();
        }
      }
    } else {
      info(iframeId,'Ignored: '+msg);
    }

  }


  function chkCallback(iframeId,funcName,val) {
    var
      func = null,
      retVal = null;

    if(settings[iframeId]) {
      func = settings[iframeId][funcName];

      if( 'function' === typeof func) {
        retVal = func(val);
      } else {
        throw new TypeError(funcName+' on iFrame['+iframeId+'] is not a function');
      }
    }

    return retVal;
  }

  function closeIFrame(iframe) {
    var iframeId = iframe.id;

    log(iframeId,'Removing iFrame: '+iframeId);
    if (iframe.parentNode) { iframe.parentNode.removeChild(iframe); }
    chkCallback(iframeId,'closedCallback',iframeId);
    log(iframeId,'--');
    delete settings[iframeId];
  }

  function getPagePosition(iframeId) {
    if(null === pagePosition) {
      pagePosition = {
        x: (window.pageXOffset !== undefined) ? window.pageXOffset : document.documentElement.scrollLeft,
        y: (window.pageYOffset !== undefined) ? window.pageYOffset : document.documentElement.scrollTop
      };
      log(iframeId,'Get page position: '+pagePosition.x+','+pagePosition.y);
    }
  }

  function setPagePosition(iframeId) {
    if(null !== pagePosition) {
      window.scrollTo(pagePosition.x,pagePosition.y);
      log(iframeId,'Set page position: '+pagePosition.x+','+pagePosition.y);
      unsetPagePosition();
    }
  }

  function unsetPagePosition() {
    pagePosition = null;
  }

  function resetIFrame(messageData) {
    function reset() {
      setSize(messageData);
      trigger('reset','reset',messageData.iframe,messageData.id);
    }

    log(messageData.id,'Size reset requested by '+('init'===messageData.type?'host page':'iFrame'));
    getPagePosition(messageData.id);
    syncResize(reset,messageData,'reset');
  }

  function setSize(messageData) {
    function setDimension(dimension) {
      messageData.iframe.style[dimension] = messageData[dimension] + 'px';
      log(
        messageData.id,
        'IFrame (' + iframeId +
        ') ' + dimension +
        ' set to ' + messageData[dimension] + 'px'
      );
    }

    function chkZero(dimension) {
      //FireFox sets dimension of hidden iFrames to zero.
      //So if we detect that set up an event to check for
      //when iFrame becomes visible.

      /* istanbul ignore next */  //Not testable in PhantomJS
      if (!hiddenCheckEnabled && '0' === messageData[dimension]) {
        hiddenCheckEnabled = true;
        log(iframeId,'Hidden iFrame detected, creating visibility listener');
        fixHiddenIFrames();
      }
    }

    function processDimension(dimension) {
      setDimension(dimension);
      chkZero(dimension);
    }

    var iframeId = messageData.iframe.id;

    if(settings[iframeId]) {
      if( settings[iframeId].sizeHeight) { processDimension('height'); }
      if( settings[iframeId].sizeWidth ) { processDimension('width'); }
    }
  }

  function syncResize(func,messageData,doNotSync) {
    /* istanbul ignore if */  //Not testable in PhantomJS
    if(doNotSync!==messageData.type && requestAnimationFrame) {
      log(messageData.id,'Requesting animation frame');
      requestAnimationFrame(func);
    } else {
      func();
    }
  }

  function trigger(calleeMsg, msg, iframe, id, noResponseWarning) {
    function postMessageToIFrame() {
      var target = settings[id] && settings[id].targetOrigin;
      log(id,'[' + calleeMsg + '] Sending msg to iframe['+id+'] ('+msg+') targetOrigin: '+target);
      iframe.contentWindow.postMessage( msgId + msg, target );
    }

    function iFrameNotFound() {
      warn(id,'[' + calleeMsg + '] IFrame('+id+') not found');
    }

    function chkAndSend() {
      if(iframe && 'contentWindow' in iframe && (null !== iframe.contentWindow)) { //Null test for PhantomJS
        postMessageToIFrame();
      } else {
        iFrameNotFound();
      }
    }

    function warnOnNoResponse() {
      function warning() {
        if (settings[id] && !settings[id].loaded && !errorShown) {
          errorShown = true;
          warn(id, 'IFrame has not responded within '+ settings[id].warningTimeout/1000 +' seconds. Check iFrameResizer.contentWindow.js has been loaded in iFrame. This message can be ingored if everything is working, or you can set the warningTimeout option to a higher value or zero to suppress this warning.');
        }
      }

      if (!!noResponseWarning && settings[id] && !!settings[id].warningTimeout) {
        settings[id].msgTimeout = setTimeout(warning, settings[id].warningTimeout);
      }
    }

    var errorShown = false;

    id = id || iframe.id;

    if(settings[id]) {
      chkAndSend();
      warnOnNoResponse();
    }

  }

  function createOutgoingMsg(iframeId) {
    return iframeId +
      ':' + settings[iframeId].bodyMarginV1 +
      ':' + settings[iframeId].sizeWidth +
      ':' + settings[iframeId].log +
      ':' + settings[iframeId].interval +
      ':' + settings[iframeId].enablePublicMethods +
      ':' + settings[iframeId].autoResize +
      ':' + settings[iframeId].bodyMargin +
      ':' + settings[iframeId].heightCalculationMethod +
      ':' + settings[iframeId].bodyBackground +
      ':' + settings[iframeId].bodyPadding +
      ':' + settings[iframeId].tolerance +
      ':' + settings[iframeId].inPageLinks +
      ':' + settings[iframeId].resizeFrom +
      ':' + settings[iframeId].widthCalculationMethod;
  }

  function setupIFrame(iframe,options) {
    function setLimits() {
      function addStyle(style) {
        if ((Infinity !== settings[iframeId][style]) && (0 !== settings[iframeId][style])) {
          iframe.style[style] = settings[iframeId][style] + 'px';
          log(iframeId,'Set '+style+' = '+settings[iframeId][style]+'px');
        }
      }

      function chkMinMax(dimension) {
        if (settings[iframeId]['min'+dimension]>settings[iframeId]['max'+dimension]) {
          throw new Error('Value for min'+dimension+' can not be greater than max'+dimension);
        }
      }

      chkMinMax('Height');
      chkMinMax('Width');

      addStyle('maxHeight');
      addStyle('minHeight');
      addStyle('maxWidth');
      addStyle('minWidth');
    }

    function newId() {
      var id = ((options && options.id) || defaults.id + count++);
      if  (null !== document.getElementById(id)) {
        id = id + count++;
      }
      return id;
    }

    function ensureHasId(iframeId) {
      logId=iframeId;
      if (''===iframeId) {
        iframe.id = iframeId =  newId();
        logEnabled = (options || {}).log;
        logId=iframeId;
        log(iframeId,'Added missing iframe ID: '+ iframeId +' (' + iframe.src + ')');
      }


      return iframeId;
    }

    function setScrolling() {
      log(iframeId,'IFrame scrolling ' + (settings[iframeId] && settings[iframeId].scrolling ? 'enabled' : 'disabled') + ' for ' + iframeId);
      iframe.style.overflow = false === (settings[iframeId] && settings[iframeId].scrolling) ? 'hidden' : 'auto';
      switch(settings[iframeId] && settings[iframeId].scrolling) {
        case true:
          iframe.scrolling = 'yes';
          break;
        case false:
          iframe.scrolling = 'no';
          break;
        default:
          iframe.scrolling = settings[iframeId] ? settings[iframeId].scrolling : 'no';
      }
    }

    //The V1 iFrame script expects an int, where as in V2 expects a CSS
    //string value such as '1px 3em', so if we have an int for V2, set V1=V2
    //and then convert V2 to a string PX value.
    function setupBodyMarginValues() {
      if (('number'===typeof(settings[iframeId] && settings[iframeId].bodyMargin)) || ('0'===(settings[iframeId] && settings[iframeId].bodyMargin))) {
        settings[iframeId].bodyMarginV1 = settings[iframeId].bodyMargin;
        settings[iframeId].bodyMargin   = '' + settings[iframeId].bodyMargin + 'px';
      }
    }

    function checkReset() {
      // Reduce scope of firstRun to function, because IE8's JS execution
      // context stack is borked and this value gets externally
      // changed midway through running this function!!!
      var
        firstRun           = settings[iframeId] && settings[iframeId].firstRun,
        resetRequertMethod = settings[iframeId] && settings[iframeId].heightCalculationMethod in resetRequiredMethods;

      if (!firstRun && resetRequertMethod) {
        resetIFrame({iframe:iframe, height:0, width:0, type:'init'});
      }
    }

    function setupIFrameObject() {
      if(Function.prototype.bind && settings[iframeId]) { //Ignore unpolyfilled IE8.
        settings[iframeId].iframe.iFrameResizer = {

          close        : closeIFrame.bind(null,settings[iframeId].iframe),

          resize       : trigger.bind(null,'Window resize', 'resize', settings[iframeId].iframe),

          moveToAnchor : function(anchor) {
            trigger('Move to anchor','moveToAnchor:'+anchor, settings[iframeId].iframe,iframeId);
          },

          sendMessage  : function(message) {
            message = JSON.stringify(message);
            trigger('Send Message','message:'+message, settings[iframeId].iframe, iframeId);
          }
        };
      }
    }

    //We have to call trigger twice, as we can not be sure if all
    //iframes have completed loading when this code runs. The
    //event listener also catches the page changing in the iFrame.
    function init(msg) {
      function iFrameLoaded() {
        trigger('iFrame.onload', msg, iframe, undefined , true);
        checkReset();
      }

      addEventListener(iframe,'load',iFrameLoaded);
      trigger('init', msg, iframe, undefined, true);
    }

    function checkOptions(options) {
      if ('object' !== typeof options) {
        throw new TypeError('Options is not an object');
      }
    }

    function copyOptions(options) {
      for (var option in defaults) {
        if (defaults.hasOwnProperty(option)) {
          settings[iframeId][option] = options.hasOwnProperty(option) ? options[option] : defaults[option];
        }
      }
    }

    function getTargetOrigin (remoteHost) {
      return ('' === remoteHost || 'file://' === remoteHost) ? '*' : remoteHost;
    }

    function processOptions(options) {
      options = options || {};
      settings[iframeId] = {
        firstRun	: true,
        iframe		: iframe,
        remoteHost	: iframe.src.split('/').slice(0,3).join('/')
      };

      checkOptions(options);
      copyOptions(options);

      if (settings[iframeId]) {
        settings[iframeId].targetOrigin = true === settings[iframeId].checkOrigin ? getTargetOrigin(settings[iframeId].remoteHost) : '*';
      }
    }

    function beenHere() {
      return (iframeId in settings && 'iFrameResizer' in iframe);
    }

    var iframeId = ensureHasId(iframe.id);

    if (!beenHere()) {
      processOptions(options);
      setScrolling();
      setLimits();
      setupBodyMarginValues();
      init(createOutgoingMsg(iframeId));
      setupIFrameObject();
    } else {
      warn(iframeId,'Ignored iFrame, already setup.');
    }
  }

  function debouce(fn,time) {
    if (null === timer) {
      timer = setTimeout(function() {
        timer = null;
        fn();
      }, time);
    }
  }

  /* istanbul ignore next */  //Not testable in PhantomJS
  function fixHiddenIFrames() {
    function checkIFrames() {
      function checkIFrame(settingId) {
        function chkDimension(dimension) {
          return '0px' === (settings[settingId] && settings[settingId].iframe.style[dimension]);
        }

        function isVisible(el) {
          return (null !== el.offsetParent);
        }

        if (settings[settingId] && isVisible(settings[settingId].iframe) && (chkDimension('height') || chkDimension('width'))) {
          trigger('Visibility change', 'resize', settings[settingId].iframe, settingId);
        }
      }

      for (var settingId in settings) {
        checkIFrame(settingId);
      }
    }

    function mutationObserved(mutations) {
      log('window','Mutation observed: ' + mutations[0].target + ' ' + mutations[0].type);
      debouce(checkIFrames,16);
    }

    function createMutationObserver() {
      var
        target = document.querySelector('body'),

        config = {
          attributes            : true,
          attributeOldValue     : false,
          characterData         : true,
          characterDataOldValue : false,
          childList             : true,
          subtree               : true
        },

        observer = new MutationObserver(mutationObserved);

      observer.observe(target, config);
    }

    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

    if (MutationObserver) createMutationObserver();
  }


  function resizeIFrames(event) {
    function resize() {
      sendTriggerMsg('Window '+event,'resize');
    }

    log('window','Trigger event: '+event);
    debouce(resize,16);
  }

  /* istanbul ignore next */  //Not testable in PhantomJS
  function tabVisible() {
    function resize() {
      sendTriggerMsg('Tab Visable','resize');
    }

    if('hidden' !== document.visibilityState) {
      log('document','Trigger event: Visiblity change');
      debouce(resize,16);
    }
  }

  function sendTriggerMsg(eventName,event) {
    function isIFrameResizeEnabled(iframeId) {
      return	settings[iframeId] &&
          'parent' === settings[iframeId].resizeFrom &&
          settings[iframeId].autoResize &&
          !settings[iframeId].firstRun;
    }

    for (var iframeId in settings) {
      if(isIFrameResizeEnabled(iframeId)) {
        trigger(eventName, event, document.getElementById(iframeId), iframeId);
      }
    }
  }

  function setupEventListeners() {
    addEventListener(window,'message',iFrameListener);

    addEventListener(window,'resize', function() {resizeIFrames('resize');});

    addEventListener(document,'visibilitychange',tabVisible);
    addEventListener(document,'-webkit-visibilitychange',tabVisible); //Andriod 4.4
    addEventListener(window,'focusin',function() {resizeIFrames('focus');}); //IE8-9
    addEventListener(window,'focus',function() {resizeIFrames('focus');});
  }


  function factory() {
    function init(options,element) {
      function chkType() {
        if(!element.tagName) {
          throw new TypeError('Object is not a valid DOM element');
        } else if ('IFRAME' !== element.tagName.toUpperCase()) {
          throw new TypeError('Expected <IFRAME> tag, found <'+element.tagName+'>');
        }
      }

      if(element) {
        chkType();
        setupIFrame(element, options);
        iFrames.push(element);
      }
    }

    function warnDeprecatedOptions(options) {
      if (options && options.enablePublicMethods) {
        warn('enablePublicMethods option has been removed, public methods are now always available in the iFrame');
      }
    }

    var iFrames;

    setupRequestAnimationFrame();
    setupEventListeners();

    return function iFrameResizeF(options,target) {
      iFrames = []; //Only return iFrames past in on this call

      warnDeprecatedOptions(options);

      switch (typeof(target)) {
      case 'undefined':
      case 'string':
        Array.prototype.forEach.call(
          document.querySelectorAll( target || 'iframe' ),
          init.bind(undefined, options)
        );
        break;
      case 'object':
        init(options,target);
        break;
      default:
        throw new TypeError('Unexpected data type ('+typeof(target)+')');
      }

      return iFrames;
    };
  }

  function createJQueryPublicMethod($) {
    if (!$.fn) {
      info('','Unable to bind to jQuery, it is not fully loaded.');
    } else if (!$.fn.iFrameResize) {
      $.fn.iFrameResize = function $iFrameResizeF(options) {
        function init(index, element) {
          setupIFrame(element, options);
        }

        return this.filter('iframe').each(init).end();
      };
    }
  }

  if (window.jQuery) { createJQueryPublicMethod(window.jQuery); }

  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof module === 'object' && typeof module.exports === 'object') { //Node for browserfy
    module.exports = factory();
  } else {
    window.iFrameResize = window.iFrameResize || factory();
  }

})();


/***/ }),

/***/ 442:
/***/ (function(module, exports) {

/*
 * File: iframeResizer.contentWindow.js
 * Desc: Include this file in any page being loaded into an iframe
 *       to force the iframe to resize to the content size.
 * Requires: iframeResizer.js on host page.
 * Doc: https://github.com/davidjbradshaw/iframe-resizer
 * Author: David J. Bradshaw - dave@bradshaw.net
 * Contributor: Jure Mav - jure.mav@gmail.com
 * Contributor: Ian Caunce - ian@hallnet.co.uk
 */


;(function(undefined) {
  'use strict';

  if(typeof window === 'undefined') return; // don't run for server side render

  var
    autoResize            = true,
    base                  = 10,
    bodyBackground        = '',
    bodyMargin            = 0,
    bodyMarginStr         = '',
    bodyObserver          = null,
    bodyPadding           = '',
    calculateWidth        = false,
    doubleEventList       = {'resize':1,'click':1},
    eventCancelTimer      = 128,
    firstRun              = true,
    height                = 1,
    heightCalcModeDefault = 'bodyOffset',
    heightCalcMode        = heightCalcModeDefault,
    initLock              = true,
    initMsg               = '',
    inPageLinks           = {},
    interval              = 32,
    intervalTimer         = null,
    logging               = false,
    msgID                 = '[iFrameSizer]',  //Must match host page msg ID
    msgIdLen              = msgID.length,
    myID                  = '',
    observer              = null,
    resetRequiredMethods  = {max:1,min:1,bodyScroll:1,documentElementScroll:1},
    resizeFrom            = 'child',
    sendPermit            = true,
    target                = window.parent,
    targetOriginDefault   = '*',
    tolerance             = 0,
    triggerLocked         = false,
    triggerLockedTimer    = null,
    throttledTimer        = 16,
    width                 = 1,
    widthCalcModeDefault  = 'scroll',
    widthCalcMode         = widthCalcModeDefault,
    win                   = window,
    messageCallback       = function() { warn('MessageCallback function not defined'); },
    readyCallback         = function() {},
    pageInfoCallback      = function() {},
    customCalcMethods     = {
      height: function() {
        warn('Custom height calculation function not defined');
        return document.documentElement.offsetHeight;
      },
      width: function() {
        warn('Custom width calculation function not defined');
        return document.body.scrollWidth;
      }
    },
    eventHandlersByName   = {};


  function addEventListener(el,evt,func) {
    /* istanbul ignore else */ // Not testable in phantonJS
    if ('addEventListener' in window) {
      el.addEventListener(evt,func, false);
    } else if ('attachEvent' in window) { //IE
      el.attachEvent('on'+evt,func);
    }
  }

  function removeEventListener(el,evt,func) {
    /* istanbul ignore else */ // Not testable in phantonJS
    if ('removeEventListener' in window) {
      el.removeEventListener(evt,func, false);
    } else if ('detachEvent' in window) { //IE
      el.detachEvent('on'+evt,func);
    }
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  //Based on underscore.js
  function throttle(func) {
    var
      context, args, result,
      timeout = null,
      previous = 0,
      later = function() {
        previous = getNow();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) {
          context = args = null;
        }
      };

    return function() {
      var now = getNow();

      if (!previous) {
        previous = now;
      }

      var remaining = throttledTimer - (now - previous);

      context = this;
      args = arguments;

      if (remaining <= 0 || remaining > throttledTimer) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }

        previous = now;
        result = func.apply(context, args);

        if (!timeout) {
          context = args = null;
        }

      } else if (!timeout) {
        timeout = setTimeout(later, remaining);
      }

      return result;
    };
  }

  var getNow = Date.now || function() {
    /* istanbul ignore next */ // Not testable in PhantonJS
    return new Date().getTime();
  };

  function formatLogMsg(msg) {
    return msgID + '[' + myID + ']' + ' ' + msg;
  }

  function log(msg) {
    if (logging && ('object' === typeof window.console)) {
      console.log(formatLogMsg(msg));
    }
  }

  function warn(msg) {
    if ('object' === typeof window.console) {
      console.warn(formatLogMsg(msg));
    }
  }


  function init() {
    readDataFromParent();
    log('Initialising iFrame ('+location.href+')');
    readDataFromPage();
    setMargin();
    setBodyStyle('background',bodyBackground);
    setBodyStyle('padding',bodyPadding);
    injectClearFixIntoBodyElement();
    checkHeightMode();
    checkWidthMode();
    stopInfiniteResizingOfIFrame();
    setupPublicMethods();
    startEventListeners();
    inPageLinks = setupInPageLinks();
    sendSize('init','Init message from host page');
    readyCallback();
  }

  function readDataFromParent() {

    function strBool(str) {
      return 'true' === str ? true : false;
    }

    var data = initMsg.substr(msgIdLen).split(':');

    myID               = data[0];
    bodyMargin         = (undefined !== data[1]) ? Number(data[1])   : bodyMargin; //For V1 compatibility
    calculateWidth     = (undefined !== data[2]) ? strBool(data[2])  : calculateWidth;
    logging            = (undefined !== data[3]) ? strBool(data[3])  : logging;
    interval           = (undefined !== data[4]) ? Number(data[4])   : interval;
    autoResize         = (undefined !== data[6]) ? strBool(data[6])  : autoResize;
    bodyMarginStr      = data[7];
    heightCalcMode     = (undefined !== data[8]) ? data[8]           : heightCalcMode;
    bodyBackground     = data[9];
    bodyPadding        = data[10];
    tolerance          = (undefined !== data[11]) ? Number(data[11]) : tolerance;
    inPageLinks.enable = (undefined !== data[12]) ? strBool(data[12]): false;
    resizeFrom         = (undefined !== data[13]) ? data[13]         : resizeFrom;
    widthCalcMode      = (undefined !== data[14]) ? data[14]         : widthCalcMode;
  }

  function readDataFromPage() {
    function readData() {
      var data = window.iFrameResizer;

      log('Reading data from page: ' + JSON.stringify(data));

      messageCallback     = ('messageCallback'         in data) ? data.messageCallback         : messageCallback;
      readyCallback       = ('readyCallback'           in data) ? data.readyCallback           : readyCallback;
      targetOriginDefault = ('targetOrigin'            in data) ? data.targetOrigin            : targetOriginDefault;
      heightCalcMode      = ('heightCalculationMethod' in data) ? data.heightCalculationMethod : heightCalcMode;
      widthCalcMode       = ('widthCalculationMethod'  in data) ? data.widthCalculationMethod  : widthCalcMode;
    }

    function setupCustomCalcMethods(calcMode, calcFunc) {
      if ('function' === typeof calcMode) {
        log('Setup custom ' + calcFunc + 'CalcMethod');
        customCalcMethods[calcFunc] = calcMode;
        calcMode = 'custom';
      }

      return calcMode;
    }

    if(('iFrameResizer' in window) && (Object === window.iFrameResizer.constructor)) {
      readData();
      heightCalcMode = setupCustomCalcMethods(heightCalcMode, 'height');
      widthCalcMode  = setupCustomCalcMethods(widthCalcMode,  'width');
    }

    log('TargetOrigin for parent set to: ' + targetOriginDefault);
  }


  function chkCSS(attr,value) {
    if (-1 !== value.indexOf('-')) {
      warn('Negative CSS value ignored for '+attr);
      value='';
    }
    return value;
  }

  function setBodyStyle(attr,value) {
    if ((undefined !== value) && ('' !== value) && ('null' !== value)) {
      document.body.style[attr] = value;
      log('Body '+attr+' set to "'+value+'"');
    }
  }

  function setMargin() {
    //If called via V1 script, convert bodyMargin from int to str
    if (undefined === bodyMarginStr) {
      bodyMarginStr = bodyMargin+'px';
    }

    setBodyStyle('margin',chkCSS('margin',bodyMarginStr));
  }

  function stopInfiniteResizingOfIFrame() {
    document.documentElement.style.height = '';
    document.body.style.height = '';
    log('HTML & body height set to "auto"');
  }


  function manageTriggerEvent(options) {

    var listener = {
      add:    function(eventName) {
        function handleEvent() {
          sendSize(options.eventName,options.eventType);
        }

        eventHandlersByName[eventName] = handleEvent;

        addEventListener(window,eventName,handleEvent);
      },
      remove: function(eventName) {
        var handleEvent = eventHandlersByName[eventName];
        delete eventHandlersByName[eventName];

        removeEventListener(window,eventName,handleEvent);
      }
    };

    if(options.eventNames && Array.prototype.map) {
      options.eventName = options.eventNames[0];
      options.eventNames.map(listener[options.method]);
    } else {
      listener[options.method](options.eventName);
    }

    log(capitalizeFirstLetter(options.method) + ' event listener: ' + options.eventType);
  }

  function manageEventListeners(method) {
    manageTriggerEvent({method:method, eventType: 'Animation Start',           eventNames: ['animationstart','webkitAnimationStart'] });
    manageTriggerEvent({method:method, eventType: 'Animation Iteration',       eventNames: ['animationiteration','webkitAnimationIteration'] });
    manageTriggerEvent({method:method, eventType: 'Animation End',             eventNames: ['animationend','webkitAnimationEnd'] });
    manageTriggerEvent({method:method, eventType: 'Input',                     eventName:  'input' });
    manageTriggerEvent({method:method, eventType: 'Mouse Up',                  eventName:  'mouseup' });
    manageTriggerEvent({method:method, eventType: 'Mouse Down',                eventName:  'mousedown' });
    manageTriggerEvent({method:method, eventType: 'Orientation Change',        eventName:  'orientationchange' });
    manageTriggerEvent({method:method, eventType: 'Print',                     eventName:  ['afterprint', 'beforeprint'] });
    manageTriggerEvent({method:method, eventType: 'Ready State Change',        eventName:  'readystatechange' });
    manageTriggerEvent({method:method, eventType: 'Touch Start',               eventName:  'touchstart' });
    manageTriggerEvent({method:method, eventType: 'Touch End',                 eventName:  'touchend' });
    manageTriggerEvent({method:method, eventType: 'Touch Cancel',              eventName:  'touchcancel' });
    manageTriggerEvent({method:method, eventType: 'Transition Start',          eventNames: ['transitionstart','webkitTransitionStart','MSTransitionStart','oTransitionStart','otransitionstart'] });
    manageTriggerEvent({method:method, eventType: 'Transition Iteration',      eventNames: ['transitioniteration','webkitTransitionIteration','MSTransitionIteration','oTransitionIteration','otransitioniteration'] });
    manageTriggerEvent({method:method, eventType: 'Transition End',            eventNames: ['transitionend','webkitTransitionEnd','MSTransitionEnd','oTransitionEnd','otransitionend'] });
    if('child' === resizeFrom) {
      manageTriggerEvent({method:method, eventType: 'IFrame Resized',        eventName:  'resize' });
    }
  }

  function checkCalcMode(calcMode,calcModeDefault,modes,type) {
    if (calcModeDefault !== calcMode) {
      if (!(calcMode in modes)) {
        warn(calcMode + ' is not a valid option for '+type+'CalculationMethod.');
        calcMode=calcModeDefault;
      }
      log(type+' calculation method set to "'+calcMode+'"');
    }

    return calcMode;
  }

  function checkHeightMode() {
    heightCalcMode = checkCalcMode(heightCalcMode,heightCalcModeDefault,getHeight,'height');
  }

  function checkWidthMode() {
    widthCalcMode = checkCalcMode(widthCalcMode,widthCalcModeDefault,getWidth,'width');
  }

  function startEventListeners() {
    if ( true === autoResize ) {
      manageEventListeners('add');
      setupMutationObserver();
    }
    else {
      log('Auto Resize disabled');
    }
  }

  function stopMsgsToParent() {
    log('Disable outgoing messages');
    sendPermit = false;
  }

  function removeMsgListener() {
    log('Remove event listener: Message');
    removeEventListener(window, 'message', receiver);
  }

  function disconnectMutationObserver() {
    if (null !== bodyObserver) {
      /* istanbul ignore next */ // Not testable in PhantonJS
      bodyObserver.disconnect();
    }
  }

  function stopEventListeners() {
    manageEventListeners('remove');
    disconnectMutationObserver();
    clearInterval(intervalTimer);
  }

  function teardown() {
    stopMsgsToParent();
    removeMsgListener();
    if (true === autoResize) stopEventListeners();
  }

  function injectClearFixIntoBodyElement() {
    var clearFix = document.createElement('div');
    clearFix.style.clear   = 'both';
    clearFix.style.display = 'block'; //Guard against this having been globally redefined in CSS.
    document.body.appendChild(clearFix);
  }

  function setupInPageLinks() {

    function getPagePosition () {
      return {
        x: (window.pageXOffset !== undefined) ? window.pageXOffset : document.documentElement.scrollLeft,
        y: (window.pageYOffset !== undefined) ? window.pageYOffset : document.documentElement.scrollTop
      };
    }

    function getElementPosition(el) {
      var
        elPosition   = el.getBoundingClientRect(),
        pagePosition = getPagePosition();

      return {
        x: parseInt(elPosition.left,10) + parseInt(pagePosition.x,10),
        y: parseInt(elPosition.top,10)  + parseInt(pagePosition.y,10)
      };
    }

    function findTarget(location) {
      function jumpToTarget(target) {
        var jumpPosition = getElementPosition(target);

        log('Moving to in page link (#'+hash+') at x: '+jumpPosition.x+' y: '+jumpPosition.y);
        sendMsg(jumpPosition.y, jumpPosition.x, 'scrollToOffset'); // X&Y reversed at sendMsg uses height/width
      }

      var
        hash     = location.split('#')[1] || location, //Remove # if present
        hashData = decodeURIComponent(hash),
        target   = document.getElementById(hashData) || document.getElementsByName(hashData)[0];

      if (undefined !== target) {
        jumpToTarget(target);
      } else {
        log('In page link (#' + hash + ') not found in iFrame, so sending to parent');
        sendMsg(0,0,'inPageLink','#'+hash);
      }
    }

    function checkLocationHash() {
      if ('' !== location.hash && '#' !== location.hash) {
        findTarget(location.href);
      }
    }

    function bindAnchors() {
      function setupLink(el) {
        function linkClicked(e) {
          e.preventDefault();

          /*jshint validthis:true */
          findTarget(this.getAttribute('href'));
        }

        if ('#' !== el.getAttribute('href')) {
          addEventListener(el,'click',linkClicked);
        }
      }

      Array.prototype.forEach.call( document.querySelectorAll( 'a[href^="#"]' ), setupLink );
    }

    function bindLocationHash() {
      addEventListener(window,'hashchange',checkLocationHash);
    }

    function initCheck() { //check if page loaded with location hash after init resize
      setTimeout(checkLocationHash,eventCancelTimer);
    }

    function enableInPageLinks() {
      /* istanbul ignore else */ // Not testable in phantonJS
      if(Array.prototype.forEach && document.querySelectorAll) {
        log('Setting up location.hash handlers');
        bindAnchors();
        bindLocationHash();
        initCheck();
      } else {
        warn('In page linking not fully supported in this browser! (See README.md for IE8 workaround)');
      }
    }

    if(inPageLinks.enable) {
      enableInPageLinks();
    } else {
      log('In page linking not enabled');
    }

    return {
      findTarget:findTarget
    };
  }

  function setupPublicMethods() {
    log('Enable public methods');

    win.parentIFrame = {

      autoResize: function autoResizeF(resize) {
        if (true === resize && false === autoResize) {
          autoResize=true;
          startEventListeners();
          //sendSize('autoResize','Auto Resize enabled');
        } else if (false === resize && true === autoResize) {
          autoResize=false;
          stopEventListeners();
        }

        return autoResize;
      },

      close: function closeF() {
        sendMsg(0,0,'close');
        teardown();
      },

      getId: function getIdF() {
        return myID;
      },

      getPageInfo: function getPageInfoF(callback) {
        if ('function' === typeof callback) {
          pageInfoCallback = callback;
          sendMsg(0,0,'pageInfo');
        } else {
          pageInfoCallback = function() {};
          sendMsg(0,0,'pageInfoStop');
        }
      },

      moveToAnchor: function moveToAnchorF(hash) {
        inPageLinks.findTarget(hash);
      },

      reset: function resetF() {
        resetIFrame('parentIFrame.reset');
      },

      scrollTo: function scrollToF(x,y) {
        sendMsg(y,x,'scrollTo'); // X&Y reversed at sendMsg uses height/width
      },

      scrollToOffset: function scrollToF(x,y) {
        sendMsg(y,x,'scrollToOffset'); // X&Y reversed at sendMsg uses height/width
      },

      sendMessage: function sendMessageF(msg,targetOrigin) {
        sendMsg(0,0,'message',JSON.stringify(msg),targetOrigin);
      },

      setHeightCalculationMethod: function setHeightCalculationMethodF(heightCalculationMethod) {
        heightCalcMode = heightCalculationMethod;
        checkHeightMode();
      },

      setWidthCalculationMethod: function setWidthCalculationMethodF(widthCalculationMethod) {
        widthCalcMode = widthCalculationMethod;
        checkWidthMode();
      },

      setTargetOrigin: function setTargetOriginF(targetOrigin) {
        log('Set targetOrigin: '+targetOrigin);
        targetOriginDefault = targetOrigin;
      },

      size: function sizeF(customHeight, customWidth) {
        var valString = ''+(customHeight?customHeight:'')+(customWidth?','+customWidth:'');
        //lockTrigger();
        sendSize('size','parentIFrame.size('+valString+')', customHeight, customWidth);
      }
    };
  }

  function initInterval() {
    if ( 0 !== interval ) {
      log('setInterval: '+interval+'ms');
      intervalTimer = setInterval(function() {
        sendSize('interval','setInterval: '+interval);
      },Math.abs(interval));
    }
  }

  /* istanbul ignore next */  //Not testable in PhantomJS
  function setupBodyMutationObserver() {
    function addImageLoadListners(mutation) {
      function addImageLoadListener(element) {
        if (false === element.complete) {
          log('Attach listeners to ' + element.src);
          element.addEventListener('load', imageLoaded, false);
          element.addEventListener('error', imageError, false);
          elements.push(element);
        }
      }

      if (mutation.type === 'attributes' && mutation.attributeName === 'src') {
        addImageLoadListener(mutation.target);
      } else if (mutation.type === 'childList') {
        Array.prototype.forEach.call(
          mutation.target.querySelectorAll('img'),
          addImageLoadListener
        );
      }
    }

    function removeFromArray(element) {
      elements.splice(elements.indexOf(element),1);
    }

    function removeImageLoadListener(element) {
      log('Remove listeners from ' + element.src);
      element.removeEventListener('load', imageLoaded, false);
      element.removeEventListener('error', imageError, false);
      removeFromArray(element);
    }

    function imageEventTriggered(event,type,typeDesc) {
      removeImageLoadListener(event.target);
      sendSize(type, typeDesc + ': ' + event.target.src, undefined, undefined);
    }

    function imageLoaded(event) {
      imageEventTriggered(event,'imageLoad','Image loaded');
    }

    function imageError(event) {
      imageEventTriggered(event,'imageLoadFailed','Image load failed');
    }

    function mutationObserved(mutations) {
      sendSize('mutationObserver','mutationObserver: ' + mutations[0].target + ' ' + mutations[0].type);

      //Deal with WebKit asyncing image loading when tags are injected into the page
      mutations.forEach(addImageLoadListners);
    }

    function createMutationObserver() {
      var
        target = document.querySelector('body'),

        config = {
          attributes            : true,
          attributeOldValue     : false,
          characterData         : true,
          characterDataOldValue : false,
          childList             : true,
          subtree               : true
        };

      observer = new MutationObserver(mutationObserved);

      log('Create body MutationObserver');
      observer.observe(target, config);

      return observer;
    }

    var
      elements         = [],
      MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
      observer         = createMutationObserver();

    return {
      disconnect: function () {
        if ('disconnect' in observer) {
          log('Disconnect body MutationObserver');
          observer.disconnect();
          elements.forEach(removeImageLoadListener);
        }
      }
    };
  }

  function setupMutationObserver() {
    var	forceIntervalTimer = 0 > interval;

    /* istanbul ignore if */ // Not testable in PhantomJS
    if (window.MutationObserver || window.WebKitMutationObserver) {
      if (forceIntervalTimer) {
        initInterval();
      } else {
        bodyObserver = setupBodyMutationObserver();
      }
    } else {
      log('MutationObserver not supported in this browser!');
      initInterval();
    }
  }


  // document.documentElement.offsetHeight is not reliable, so
  // we have to jump through hoops to get a better value.
  function getComputedStyle(prop,el) {
    /* istanbul ignore next */  //Not testable in PhantomJS
    function convertUnitsToPxForIE8(value) {
      var PIXEL = /^\d+(px)?$/i;

      if (PIXEL.test(value)) {
        return parseInt(value,base);
      }

      var
        style = el.style.left,
        runtimeStyle = el.runtimeStyle.left;

      el.runtimeStyle.left = el.currentStyle.left;
      el.style.left = value || 0;
      value = el.style.pixelLeft;
      el.style.left = style;
      el.runtimeStyle.left = runtimeStyle;

      return value;
    }

    var retVal = 0;
    el =  el || document.body;

    /* istanbul ignore else */ // Not testable in phantonJS
    if (('defaultView' in document) && ('getComputedStyle' in document.defaultView)) {
      retVal = document.defaultView.getComputedStyle(el, null);
      retVal = (null !== retVal) ? retVal[prop] : 0;
    } else {//IE8
      retVal =  convertUnitsToPxForIE8(el.currentStyle[prop]);
    }

    return parseInt(retVal,base);
  }

  function chkEventThottle(timer) {
    if(timer > throttledTimer/2) {
      throttledTimer = 2*timer;
      log('Event throttle increased to ' + throttledTimer + 'ms');
    }
  }

  //Idea from https://github.com/guardian/iframe-messenger
  function getMaxElement(side,elements) {
    var
      elementsLength = elements.length,
      elVal          = 0,
      maxVal         = 0,
      Side           = capitalizeFirstLetter(side),
      timer          = getNow();

    for (var i = 0; i < elementsLength; i++) {
      elVal = elements[i].getBoundingClientRect()[side] + getComputedStyle('margin'+Side,elements[i]);
      if (elVal > maxVal) {
        maxVal = elVal;
      }
    }

    timer = getNow() - timer;

    log('Parsed '+elementsLength+' HTML elements');
    log('Element position calculated in ' + timer + 'ms');

    chkEventThottle(timer);

    return maxVal;
  }

  function getAllMeasurements(dimention) {
    return [
      dimention.bodyOffset(),
      dimention.bodyScroll(),
      dimention.documentElementOffset(),
      dimention.documentElementScroll()
    ];
  }

  function getTaggedElements(side,tag) {
    function noTaggedElementsFound() {
      warn('No tagged elements ('+tag+') found on page');
      return document.querySelectorAll('body *');
    }

    var elements = document.querySelectorAll('['+tag+']');

    if (0 === elements.length) noTaggedElementsFound();

    return getMaxElement(side,elements);
  }

  function getAllElements() {
    return document.querySelectorAll('body *');
  }

  var
    getHeight = {
      bodyOffset: function getBodyOffsetHeight() {
        return  document.body.offsetHeight + getComputedStyle('marginTop') + getComputedStyle('marginBottom');
      },

      offset: function() {
        return getHeight.bodyOffset(); //Backwards compatability
      },

      bodyScroll: function getBodyScrollHeight() {
        return document.body.scrollHeight;
      },

      custom: function getCustomWidth() {
        return customCalcMethods.height();
      },

      documentElementOffset: function getDEOffsetHeight() {
        return document.documentElement.offsetHeight;
      },

      documentElementScroll: function getDEScrollHeight() {
        return document.documentElement.scrollHeight;
      },

      max: function getMaxHeight() {
        return Math.max.apply(null,getAllMeasurements(getHeight));
      },

      min: function getMinHeight() {
        return Math.min.apply(null,getAllMeasurements(getHeight));
      },

      grow: function growHeight() {
        return getHeight.max(); //Run max without the forced downsizing
      },

      lowestElement: function getBestHeight() {
        return Math.max(getHeight.bodyOffset(), getMaxElement('bottom',getAllElements()));
      },

      taggedElement: function getTaggedElementsHeight() {
        return getTaggedElements('bottom','data-iframe-height');
      }
    },

    getWidth = {
      bodyScroll: function getBodyScrollWidth() {
        return document.body.scrollWidth;
      },

      bodyOffset: function getBodyOffsetWidth() {
        return document.body.offsetWidth;
      },

      custom: function getCustomWidth() {
        return customCalcMethods.width();
      },

      documentElementScroll: function getDEScrollWidth() {
        return document.documentElement.scrollWidth;
      },

      documentElementOffset: function getDEOffsetWidth() {
        return document.documentElement.offsetWidth;
      },

      scroll: function getMaxWidth() {
        return Math.max(getWidth.bodyScroll(), getWidth.documentElementScroll());
      },

      max: function getMaxWidth() {
        return Math.max.apply(null,getAllMeasurements(getWidth));
      },

      min: function getMinWidth() {
        return Math.min.apply(null,getAllMeasurements(getWidth));
      },

      rightMostElement: function rightMostElement() {
        return getMaxElement('right', getAllElements());
      },

      taggedElement: function getTaggedElementsWidth() {
        return getTaggedElements('right', 'data-iframe-width');
      }
    };


  function sizeIFrame(triggerEvent, triggerEventDesc, customHeight, customWidth) {

    function resizeIFrame() {
      height = currentHeight;
      width  = currentWidth;

      sendMsg(height,width,triggerEvent);
    }

    function isSizeChangeDetected() {
      function checkTolarance(a,b) {
        var retVal = Math.abs(a-b) <= tolerance;
        return !retVal;
      }

      currentHeight = (undefined !== customHeight)  ? customHeight : getHeight[heightCalcMode]();
      currentWidth  = (undefined !== customWidth )  ? customWidth  : getWidth[widthCalcMode]();

      return	checkTolarance(height,currentHeight) || (calculateWidth && checkTolarance(width,currentWidth));
    }

    function isForceResizableEvent() {
      return !(triggerEvent in {'init':1,'interval':1,'size':1});
    }

    function isForceResizableCalcMode() {
      return (heightCalcMode in resetRequiredMethods) || (calculateWidth && widthCalcMode in resetRequiredMethods);
    }

    function logIgnored() {
      log('No change in size detected');
    }

    function checkDownSizing() {
      if (isForceResizableEvent() && isForceResizableCalcMode()) {
        resetIFrame(triggerEventDesc);
      } else if (!(triggerEvent in {'interval':1})) {
        logIgnored();
      }
    }

    var	currentHeight,currentWidth;

    if (isSizeChangeDetected() || 'init' === triggerEvent) {
      lockTrigger();
      resizeIFrame();
    } else {
      checkDownSizing();
    }
  }

  var sizeIFrameThrottled = throttle(sizeIFrame);

  function sendSize(triggerEvent, triggerEventDesc, customHeight, customWidth) {
    function recordTrigger() {
      if (!(triggerEvent in {'reset':1,'resetPage':1,'init':1})) {
        log( 'Trigger event: ' + triggerEventDesc );
      }
    }

    function isDoubleFiredEvent() {
      return  triggerLocked && (triggerEvent in doubleEventList);
    }

    if (!isDoubleFiredEvent()) {
      recordTrigger();
      if (triggerEvent === 'init') {
        sizeIFrame(triggerEvent, triggerEventDesc, customHeight, customWidth);
      } else {
        sizeIFrameThrottled(triggerEvent, triggerEventDesc, customHeight, customWidth);
      }
    } else {
      log('Trigger event cancelled: '+triggerEvent);
    }
  }

  function lockTrigger() {
    if (!triggerLocked) {
      triggerLocked = true;
      log('Trigger event lock on');
    }
    clearTimeout(triggerLockedTimer);
    triggerLockedTimer = setTimeout(function() {
      triggerLocked = false;
      log('Trigger event lock off');
      log('--');
    },eventCancelTimer);
  }

  function triggerReset(triggerEvent) {
    height = getHeight[heightCalcMode]();
    width  = getWidth[widthCalcMode]();

    sendMsg(height,width,triggerEvent);
  }

  function resetIFrame(triggerEventDesc) {
    var hcm = heightCalcMode;
    heightCalcMode = heightCalcModeDefault;

    log('Reset trigger event: ' + triggerEventDesc);
    lockTrigger();
    triggerReset('reset');

    heightCalcMode = hcm;
  }

  function sendMsg(height,width,triggerEvent,msg,targetOrigin) {
    function setTargetOrigin() {
      if (undefined === targetOrigin) {
        targetOrigin = targetOriginDefault;
      } else {
        log('Message targetOrigin: '+targetOrigin);
      }
    }

    function sendToParent() {
      var
        size  = height + ':' + width,
        message = myID + ':' +  size + ':' + triggerEvent + (undefined !== msg ? ':' + msg : '');

      log('Sending message to host page (' + message + ')');
      target.postMessage( msgID + message, targetOrigin);
    }

    if(true === sendPermit) {
      setTargetOrigin();
      sendToParent();
    }
  }

  function receiver(event) {
    var processRequestFromParent = {
      init: function initFromParent() {
        function fireInit() {
          initMsg = event.data;
          target  = event.source;

          init();
          firstRun = false;
          setTimeout(function() { initLock = false;},eventCancelTimer);
        }

        if (document.readyState === "interactive" || document.readyState === "complete") {
          fireInit();
        } else {
          log('Waiting for page ready');
          addEventListener(window,'readystatechange',processRequestFromParent.initFromParent);
        }
      },

      reset: function resetFromParent() {
        if (!initLock) {
          log('Page size reset by host page');
          triggerReset('resetPage');
        } else {
          log('Page reset ignored by init');
        }
      },

      resize: function resizeFromParent() {
        sendSize('resizeParent','Parent window requested size check');
      },

      moveToAnchor: function moveToAnchorF() {
        inPageLinks.findTarget(getData());
      },
      inPageLink: function inPageLinkF() {this.moveToAnchor();}, //Backward compatability

      pageInfo: function pageInfoFromParent() {
        var msgBody = getData();
        log('PageInfoFromParent called from parent: ' + msgBody );
        pageInfoCallback(JSON.parse(msgBody));
        log(' --');
      },

      message: function messageFromParent() {
        var msgBody = getData();

        log('MessageCallback called from parent: ' + msgBody );
        messageCallback(JSON.parse(msgBody));
        log(' --');
      }
    };

    function isMessageForUs() {
      return msgID === (''+event.data).substr(0,msgIdLen); //''+ Protects against non-string messages
    }

    function getMessageType() {
      return event.data.split(']')[1].split(':')[0];
    }

    function getData() {
      return event.data.substr(event.data.indexOf(':')+1);
    }

    function isMiddleTier() {
      return !(typeof module !== 'undefined' && module.exports) && ('iFrameResize' in window);
    }

    function isInitMsg() {
      //Test if this message is from a child below us. This is an ugly test, however, updating
      //the message format would break backwards compatibity.
      return event.data.split(':')[2] in {'true':1,'false':1};
    }

    function callFromParent() {
      var messageType = getMessageType();

      if (messageType in processRequestFromParent) {
        processRequestFromParent[messageType]();
      } else if (!isMiddleTier() && !isInitMsg()) {
        warn('Unexpected message ('+event.data+')');
      }
    }

    function processMessage() {
      if (false === firstRun) {
        callFromParent();
      } else if (isInitMsg()) {
        processRequestFromParent.init();
      } else {
        log('Ignored message of type "' + getMessageType() + '". Received before initialization.');
      }
    }

    if (isMessageForUs()) {
      processMessage();
    }
  }

  //Normally the parent kicks things off when it detects the iFrame has loaded.
  //If this script is async-loaded, then tell parent page to retry init.
  function chkLateLoaded() {
    if('loading' !== document.readyState) {
      window.parent.postMessage('[iFrameResizerChild]Ready','*');
    }
  }

  addEventListener(window, 'message', receiver);
  chkLateLoaded();

  

})();


/***/ }),

/***/ 64:
/***/ (function(module, exports, __webpack_require__) {

var UNDEFINED_INDEX = -1;
var ARRAY_HOLE_INDEX = -2;
var NAN_INDEX = -3;
var POS_INF_INDEX = -4;
var NEG_INF_INDEX = -5;
var customTypes = Object.create(null);

exports.registerType = function (typeName, handlers) {
  function check(methodName) {
    if (typeof handlers[methodName] !== "function") {
      throw new Error(
        "second argument to ARSON.registerType(" +
          JSON.stringify(typeName) + ", ...) " +
          "must be an object with a " + methodName + " method"
      );
    }
  }

  check("deconstruct");
  check("reconstruct");

  customTypes[typeName] = handlers;

  return exports;
};

__webpack_require__(431);

exports.encode = exports.stringify =
function encode(value) {
  return JSON.stringify(toTable(value));
}

// This array will grow as needed so that we can slice arrays filled with
// ARRAY_HOLE_INDEX from it.
var HOLY_ARRAY = [];

// Returns an array of the given length filled with ARRAY_HOLE_INDEX.
function getArrayOfHoles(length) {
  var holyLen = HOLY_ARRAY.length;
  if (length > holyLen) {
    HOLY_ARRAY.length = length;
    for (var i = holyLen; i < length; ++i) {
      HOLY_ARRAY[i] = ARRAY_HOLE_INDEX;
    }
  }

  return HOLY_ARRAY.slice(0, length);
}

function toTable(value) {
  var values = [];
  var getIndex = makeGetIndexFunction(values);

  function copy(value) {
    var result = value;

    if (value && typeof value === "object") {
      var keys = Object.keys(value);

      if (isPlainObject(value)) {
        result = {};

      } else if (Array.isArray(value)) {
        result = getArrayOfHoles(value.length);

      } else {
        for (var typeName in customTypes) {
          // If value is not a plain Object, but something exotic like a
          // Date or a RegExp, serialize it as an array with typeName as
          // its first element. These arrays can be distinguished from
          // normal arrays, because all other non-empty arrays will be
          // serialized with a numeric value as their first element.
          var args = customTypes[typeName].deconstruct(value);
          if (args) {
            for (var i = 0; i < args.length; ++i) {
              args[i] = getIndex(args[i]);
            }
            args.unshift(typeName);
            return args;
          }
        }

        result = {};
      }

      keys.forEach(function (key) {
        result[key] = getIndex(value[key]);
      });
    }

    return result;
  }

  // Assigns the root value to values[0].
  var index0 = getIndex(value);
  if (index0 < 0) {
    // If value is something special that gets a negative index, then we
    // don't need to build a table at all, and we can simply return that
    // negative index as a complete serialization. This avoids ambiguity
    // about indexes versus primitive literal values.
    return index0;
  }

  // Note that this for loop cannot be a forEach loop, because
  // values.length is expected to change during iteration.
  for (var table = [], v = 0; v < values.length; ++v) {
    table[v] = copy(values[v]);
  }

  return table;
}

function isPlainObject(value) {
  var isObject = value && typeof value === "object";
  if (isObject) {
    var proto = Object.getPrototypeOf
      ? Object.getPrototypeOf(value)
      : value.__proto__;
    return proto === Object.prototype;
  }
  return false;
}

function makeGetIndexFunction(values) {
  var indexMap = typeof Map === "function" && new Map;

  return function getIndex(value) {
    switch (typeof value) {
    case "undefined":
      return UNDEFINED_INDEX;

    case "number":
      if (isNaN(value)) {
        return NAN_INDEX;
      }

      if (! isFinite(value)) {
        return value < 0 ? NEG_INF_INDEX : POS_INF_INDEX;
      }

      // fall through...
    }

    var index;

    if (indexMap) {
      // If we have Map, use it instead of values.indexOf to accelerate
      // object lookups.
      index = indexMap.get(value);
      if (typeof index === "undefined") {
        index = values.push(value) - 1;
        indexMap.set(value, index);
      }
    } else {
      index = values.indexOf(value);
      if (index < 0) {
        index = values.push(value) - 1;
      }
    }

    return index;
  };
}

exports.decode = exports.parse =
function decode(encoding) {
  return fromTable(JSON.parse(encoding));
}

function fromTable(table) {
  if (typeof table === "number" && table < 0) {
    return getValueWithoutCache(table);
  }

  var getValueCache = new Array(table.length);

  function getValue(index) {
    return index in getValueCache
      ? getValueCache[index]
      : getValueCache[index] = getValueWithoutCache(index);
  }

  function getValueWithoutCache(index) {
    if (index < 0) {
      if (index === UNDEFINED_INDEX) {
        return;
      }

      if (index === ARRAY_HOLE_INDEX) {
        // Never reached because handled specially below.
        return;
      }

      if (index === NAN_INDEX) {
        return NaN;
      }

      if (index === POS_INF_INDEX) {
        return Infinity;
      }

      if (index === NEG_INF_INDEX) {
        return -Infinity;
      }

      throw new Error("invalid ARSON index: " + index);
    }

    var entry = table[index];

    if (entry && typeof entry === "object") {
      if (Array.isArray(entry)) {
        var elem0 = entry[0];
        if (typeof elem0 === "string" && elem0 in customTypes) {
          var rec = customTypes[elem0].reconstruct;
          var empty = rec();
          if (empty) {
            // If the reconstruct handler returns an object, treat it as
            // an empty instance of the desired type, and schedule it to
            // be filled in later. This two-stage process allows exotic
            // container objects to contain themselves.
            containers.push({
              reconstruct: rec,
              empty: empty,
              argIndexes: entry.slice(1)
            });
          }

          // If the reconstruct handler returned a falsy value, then we
          // assume none of its arguments refer to exotic containers, so
          // we can reconstruct the object immediately. Examples: Buffer,
          // Date, RegExp.
          return table[index] = empty || rec(entry.slice(1).map(getValue));
        }
      }

      // Here entry is already the correct array or object reference for
      // this index, but its values are still indexes that will need to be
      // resolved later.
      objects.push(entry);
    }

    return entry;
  }

  var containers = [];
  var objects = [];

  // First pass: make sure all exotic objects are deserialized fist, and
  // keep track of all plain object entries for later.
  table.forEach(function (entry, i) {
    getValue(i);
  });

  // Second pass: now that we have final object references for all exotic
  // objects, we can safely resolve argument indexes for the empty ones.
  containers.forEach(function (c) {
    c.args = c.argIndexes.map(getValue);
  });

  // Third pass: resolve value indexes for ordinary arrays and objects.
  objects.forEach(function (obj) {
    Object.keys(obj).forEach(function (key) {
      var index = obj[key];

      if (typeof index !== "number") {
        // Leave non-numeric indexes untouched.
        return;
      }

      if (index < 0) {
        if (index === ARRAY_HOLE_INDEX) {
          // Array holes have to be handled specially here, since getValue
          // does not have a reference to obj.
          delete obj[key];
          return;
        }

        // This recursion is guaranteed not to add more objects, because
        // we know the index is negative.
        obj[key] = getValue(index);

      } else {
        // Non-negative indexes refer to normal table values.
        obj[key] = table[index];
      }
    });
  });

  // Fourth pass: all possible object references have been established, so
  // we can finally initialize the empty container objects.
  containers.forEach(function (c) {
    c.reconstruct.call(c.empty, c.args);
  });

  return table[0];
}


/***/ })

/******/ });