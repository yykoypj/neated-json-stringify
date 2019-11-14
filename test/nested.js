const stringify = require('../');

test('nested', function () {
  var obj = { c: 8, b: [{z:6,y:5,x:4},7], a: 3 };
  expect(stringify(obj)).toEqual('{"a":3,"b":[{"x":4,"y":5,"z":6},7],"c":8}');
});

test('sorted array', ()=>{
  var obj = {c:8, b: [3,2,1,4], a:2};
  expect( stringify(obj, {sortarrays: true}) ).toEqual('{"a":2,"b":[1,2,3,4],"c":8}');
});

test('cycle (default)', ()=>{
  var one = { a: 1 };
  var two = { a: 1, b: one};
  one.b = two;
  expect( ()=>stringify(one) ).toThrow(new TypeError('Converting circular structure to JSON'));
});

test('cycle (pointed)', ()=>{
  var one = { a: 1 };
  var two = { a: 1, b: one};
  one.b = two;
  expect( stringify(one, {cycle: true}) ).toEqual('{"a":1,"b":{"a":1,"b":"__cycle__"}}');
});

test('repeat but none-cyclic value', ()=>{
  var one = { a: 1 };
  var two = { a: one, b: one };
  expect( stringify(two) ).toEqual('{"a":{"a":1},"b":{"a":1}}');
})