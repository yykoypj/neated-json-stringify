var test = require('tape');
const stringify = require('../');

test('nested', function (t) {
  t.plan(1);
  var obj = { c: 8, b: [{z:6,y:5,x:4},7], a: 3 };
  t.equal(stringify(obj), '{"a":3,"b":[{"x":4,"y":5,"z":6},7],"c":8}');
});

test('sorted array', function (t) {
  t.plan(1);
  var obj = {c:8, b: [3,2,1,4], a:2};
  t.equal(stringify(obj, {sortarrays: true}), '{"a":2,"b":[1,2,3,4],"c":8}');
});

test('cycle (default)', function (t) {
  t.plan(1);
  var one = { a: 1 };
  var two = { a: 1, b: one};
  one.b = two;
  try {
    stringify(one);
  } catch (ex) {
    t.equal(ex.toString(), 'TypeError: Converting circular structure to JSON');
  }
});

test('cycle (pointed)', function (t) {
  t.plan(1);
  var one = { a: 1 };
  var two = { a: 1, b: one};
  one.b = two;
  t.equal(stringify(one, {cycle: true}), '{"a":1,"b":{"a":1,"b":"__cycle__"}}');
});

test('repeat but none-cyclic value', function (t) {
  t.plan(1);
  var one = { a: 1 };
  var two = { a: one, b: one };
  t.equal(stringify(two), '{"a":{"a":1},"b":{"a":1}}');
})