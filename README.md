# neated-json-stringify
a variation of json-stable-stringify for deterministic JSON.stringify().

## API

This repository is modified from [json-stable-stringify](https://github.com/substack/json-stable-stringify).

## Base

The usage is similar to json-stable-stringify.
If you used json-stable-stringify before,you can use this repository without changing your code.
This repository passed all the tests of json-stable-stringify.

## Difference

#### pretty
[according to a pull request of the json-stable-stringify](https://github.com/substack/json-stable-stringify/pull/9 "according to a pull request to the")
```js
var obj = { one: 1, two: { b: 4, a: [2,3] } };
var s = stringify(obj, { pretty: true });
console.log(s);
```

which outputs:
```js
{one:1,two:{a:[2,3],b:4}}
```
#### sortarrays
```js
var obj = { one: 1, two: { b: 4, a: [9,3] } };
var s = stringify(obj, { sortarrays: true });
console.log(s);
```

which outputs:
```js
{"one":1,"two":{"a":[3,9],"b":4}}
```
#### array replacer
[according to normal JSON.stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify "according to normal JSON.stringify")
when you pass an array as the replacer argument,the array's values indicate the names of the properties in the object that should be included in the resulting JSON string
```js
var obj = {a:1,b:2, c:3};
var s = stringify(obj, ["b", "a"]);
console.log(s);
```

which outputs:
```js
{"b":2,"a":1}
```