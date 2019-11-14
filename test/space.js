var stringify = require('../');

test('space parameter', () => {
    var obj = { one: 1, two: 2 };
    expect(stringify(obj, {space: '  '})).toEqual(''
        + '{\n'
        + '  "one": 1,\n'
        + '  "two": 2\n'
        + '}'
    );
});

test('space parameter (with tabs)', () => {
    var obj = { one: 1, two: 2 };
    expect(stringify(obj, {space: '\t'})).toEqual(''
        + '{\n'
        + '\t"one": 1,\n'
        + '\t"two": 2\n'
        + '}'
    );
});

test('space parameter (with a number)', () => {
    var obj = { one: 1, two: 2 };
    expect(stringify(obj, {space: 3})).toEqual(''
        + '{\n'
        + '   "one": 1,\n'
        + '   "two": 2\n'
        + '}'
    );
});

test('space parameter (nested objects)', () => {
    var obj = { one: 1, two: { b: 4, a: [2,3] } };
    expect(stringify(obj, {space: '  '})).toEqual(''
        + '{\n'
        + '  "one": 1,\n'
        + '  "two": {\n'
        + '    "a": [\n'
        + '      2,\n'
        + '      3\n'
        + '    ],\n'
        + '    "b": 4\n'
        + '  }\n'
        + '}'
    );
});

test('space parameter (same as native)', () => {
    // for this test, properties need to be in alphabetical order
    var obj = { one: 1, two: { a: [2,3], b: 4 } };
    expect(stringify(obj, {space: '  '})).toEqual(JSON.stringify(obj, null, '  '));
});
