var stringify = require('../');

test('custom comparison function', () => {
  var obj = { c: 8, b: [{z:6,y:5,x:4},7], a: 3 };
  expect( stringify(obj, function (a, b) {
      return a.key < b.key ? 1 : -1;
  }) ).toEqual('{"c":8,"b":[{"z":6,"y":5,"x":4},7],"a":3}');
});
