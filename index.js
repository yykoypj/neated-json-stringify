var json = typeof JSON !== 'undefined' ? JSON : require('jsonify');


module.exports = function (obj, options) {
  if (!options) options = {};
  if (typeof options === 'function') options = { comparator: options };

  var space = options.space || '';
  if (typeof space === 'number') space = Array(space + 1).join(' ');

  var replacer = options instanceof Array ?
    options : options.replacer || function (key, value) { return value; };

  var cycle = options.cycle === true;
  var pretty = options.pretty === true;
  var sortarrays = options.sortarrays === true;

  var comparator = options.comparator && (function (comparator) {
    return function (item) {
      return function (pre, fol) {
        var preObj = { key: pre, value: item[pre] };
        var folObj = { key: fol, value: item[fol] };
        return comparator(preObj, folObj);
      };
    };
  })(options.comparator)

  var seen = [];

  return stringify({ '': obj }, '', obj, 0);

  function stringify(parent, key, item, level) {
    var indent = space ? ('\n' + Array(level + 1).join(space)) : '';
    var separator = space ? ': ' : ':';

    if (item && item.toJSON && typeof item.toJSON === 'function') {
      item = item.toJSON()
    }

    if (typeof replacer === 'function') item = replacer.call(parent, key, item);

    if (item === undefined) {
      return
    }
    if (pretty && typeof node === 'string') {
      return "'" + node.replace("'", "\\\'", 'g') + "'";
    }
    if (typeof item !== 'object' || item === null) {
      return json.stringify(item)
    }
    if (isArray(item)) {
      var out = [];
      for (var i = 0; i < item.length; i++) {
        var subvalue = stringify(item, i, item[i], level + 1) || json.stringify(null);
        out.push(indent + space + subvalue);
      }
      if (sortarrays) out.sort();
      return '[' + out.join(',') + indent + ']';
    }
    else {
      if (indexof.call(seen, item) !== -1) {
        if (cycle) return json.stringify('__cycle__');
        throw new TypeError('Converting circular structure to JSON');
      }
      else seen.push(item);

      var out = [];
      var keys;
      if (replacer instanceof Array) {
        keys = filter.call(objectKeys(item), function (x) { return indexof.call(replacer, x) !== -1 })
          .sort(function (a, b) { return indexof.call(replacer, a) > indexof.call(replacer, b) ? 1: -1 });
          
      } else {
        keys = objectKeys(item).sort(comparator && comparator(item));
      }

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var subvalue = stringify(item, key, item[key], level + 1);

        if (!subvalue) continue;

        var keyValue = pretty ? key : json.stringify(key)
          + separator
          + subvalue;

        out.push(indent + space + keyValue);
      }
      seen.splice(indexof.call(seen, item), 1);
      return '{' + out.join(',') + indent + '}'
    }
  }
}

var isArray = Array.isArray || function (x) {
  return Object.prototype.toString.call(x) === '[object Array]';
}

var objectKeys = Object.keys || function (obj) {
  var has = Object.prototype.hasOwnProperty || function () { return true; };
  var keys = [];
  for (var key in obj) {
    if (has.call(obj, key)) keys.push(key);
  }
  return keys;
}


var indexof = Array.prototype.indexOf || function (searchElement, fromIndex) {
  var k;
  if (this == null) {
    throw new TypeError('"this" is null or not defined');
  }
  var O = Object(this);
  var len = O.length >>> 0;
  if (len === 0) {
    return -1;
  }

  var n = +fromIndex || 0;

  if (Math.abs(n) === Infinity) {
    n = 0;
  }

  if (n >= len) {
    return -1;
  }

  k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

  while (k < len) {
    if (k in O && O[k] === searchElement) {
      return k;
    }
    k++;
  }
  return -1;
};

var filter = Array.prototype.filter || function(func, thisArg) {
  'use strict';
  if ( ! ((typeof func === 'Function') && this) )
      throw new TypeError();
  
  var len = this.length >>> 0,
      res = new Array(len),
      c = 0, i = -1;
  if (thisArg === undefined)
    while (++i !== len)
      if (i in this)
        if (func(t[i], i, t))
          res[c++] = t[i];
  else
    while (++i !== len)
      if (i in this)
        if (func.call(thisArg, t[i], i, t))
          res[c++] = t[i];
  
  res.length = c;
  return res;
};