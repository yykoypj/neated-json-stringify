var test = require('tape');
var stringify = require('../');

test('custom comparison function', function (t) {
  t.plan(1);
  var obj = { c: 8, b: [{z:6,y:5,x:4},7], a: 3 };
  t.equal(stringify(obj, function (a, b) {
      return a.key < b.key ? 1 : -1;
  }), '{"c":8,"b":[{"z":6,"y":5,"x":4},7],"a":3}');
});
