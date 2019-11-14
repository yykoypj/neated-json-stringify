var stringify = require('../');

test('normal json replacer', ()=>{
  var obj = {a:1,b:2, c:3};
  expect(stringify(obj, ["b", "a"])).toEqual('{"b":2,"a":1}');
})

test('replace root', ()=>{
	var obj = { a: 1, b: 2, c: false };
	var replacer = function(key, value) { return 'one'; };
	expect(stringify(obj, { replacer: replacer })).toEqual('"one"');
});

test('replace numbers', ()=>{
	var obj = { a: 1, b: 2, c: false };
	var replacer = function(key, value) {
		if(value === 1) return 'one';
		if(value === 2) return 'two';
		return value;
	};
	expect(stringify(obj, { replacer: replacer })).toEqual( '{"a":"one","b":"two","c":false}');
});

test('replace with object', ()=>{

	var obj = { a: 1, b: 2, c: false };
	var replacer = function(key, value) {
		if(key === 'b') return { d: 1 };
		if(value === 1) return 'one';
		return value;
	};

	expect(stringify(obj, { replacer: replacer })).toEqual( '{"a":"one","b":{"d":"one"},"c":false}');
});

test('replace with undefined', ()=>{

	var obj = { a: 1, b: 2, c: false };
	var replacer = function(key, value) {
		if(value === false) return;
		return value;
	};

	expect(stringify(obj, { replacer: replacer })).toEqual( '{"a":1,"b":2}');
});

test('replace with array', ()=>{

	var obj = { a: 1, b: 2, c: false };
	var replacer = function(key, value) {
		if(key === 'b') return ['one', 'two'];
		return value;
	};

	expect(stringify(obj, { replacer: replacer })).toEqual( '{"a":1,"b":["one","two"],"c":false}');
});

test('replace array item', ()=>{

	var obj = { a: 1, b: 2, c: [1,2] };
	var replacer = function(key, value) {
		if(value === 1) return 'one';
		if(value === 2) return 'two';
		return value;
	};

	expect(stringify(obj, { replacer: replacer })).toEqual( '{"a":"one","b":"two","c":["one","two"]}');
});
