var stringify = require('../');

test('toJSON function',()=> {
    var obj = { one: 1, two: 2, toJSON: function() { return { one: 1 }; } };
    expect(stringify(obj)).toEqual('{"one":1}' );
});

test('toJSON returns string',()=> {
	var obj = { one: 1, two: 2, toJSON: function() { return 'one'; } };
	expect(stringify(obj)).toEqual('"one"');
});

test('toJSON returns array',()=> {
	var obj = { one: 1, two: 2, toJSON: function() { return ['one']; } };
	expect(stringify(obj)).toEqual('["one"]');
});