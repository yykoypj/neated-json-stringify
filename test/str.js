var stringify = require('../');

test('simple object', () => {
  var obj = { c: 6, b: [4, 5], a: 3, z: null };
  expect(stringify(obj)).toEqual('{"a":3,"b":[4,5],"c":6,"z":null}');
});

test('object with undefined', () => {
  var obj = { a: 3, z: undefined };
  expect(stringify(obj)).toEqual('{"a":3}');
});

test('array with undefined', () => {
  var obj = [4, undefined, 6];
  expect(stringify(obj)).toEqual('[4,null,6]');
});

test('object with empty string', () => {
  var obj = { a: 3, z: '' };
  expect(stringify(obj)).toEqual('{"a":3,"z":""}');
});

test('array with empty string', () => {
  var obj = [4, '', 6];
  expect(stringify(obj)).toEqual('[4,"",6]');
});
