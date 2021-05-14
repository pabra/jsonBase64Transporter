import { fromData } from '../src/common/json';
const jSymbol = fromData(null)[0];

export const cases: Record<
  'fromData' | 'isJson' | 'toValue' | 'toData' | 'toArrayBuffer',
  Record<'good' | 'bad', [any, any][]>
> = {
  fromData: {
    good: [
      ['aü€☺¥人間', '"aü€☺¥人間"'],
      [123, '123'],
      [null, 'null'],
      [undefined, undefined],
      [new Date(1234567890123), '"2009-02-13T23:31:30.123Z"'],
      [NaN, 'null'],
      [Infinity, 'null'],
      [new Uint8Array(4), '{"0":0,"1":0,"2":0,"3":0}'],
      [Symbol('X'), undefined],
      [true, 'true'],
      [false, 'false'],
      [
        [
          1,
          'a€',
          true,
          null,
          undefined,
          Symbol('X'),
          NaN,
          -Infinity,
          new Date(1234567890123),
        ],
        '[1,"a€",true,null,null,null,null,null,"2009-02-13T23:31:30.123Z"]',
      ],
      [[], '[]'],
      [
        { a: 'A', b: 2, 3: '3', '€': [1, 'B', true, {}] },
        '{"3":"3","a":"A","b":2,"€":[1,"B",true,{}]}',
      ],
      [{}, '{}'],
    ],
    bad: [[BigInt(123), undefined]],
  },

  isJson: {
    good: [
      [[jSymbol, '"some kind of string"', 'some kind of string', null], true],
      [[jSymbol, '"true"', 'true', null], true],
      [[jSymbol, 'true', true, null], true],
      [[jSymbol, '"42"', '42', null], true],
      [[jSymbol, '42', 42, null], true],
      [[jSymbol, '{"a":1}', { a: 1 }, null], true],
      [[jSymbol, '{}', new Error(), null], true],
    ],
    bad: [
      [undefined, false],
      [true, false],
      [[], false],
      [[Symbol('other'), 'some data', null, null], false],
      [[true, 'some data', null, null], false],
      [[jSymbol, 23, 42], false],
      [[jSymbol], false],
      [[Symbol('some'), 'some kind of string'], false],
    ],
  },

  toValue: {
    good: [
      [
        [jSymbol, '"some kind of string"', 'some kind of string', null],
        '"some kind of string"',
      ],
      [[jSymbol, '"true"', 'true', null], '"true"'],
      [[jSymbol, 'true', true, null], 'true'],
      [[jSymbol, '"42"', '42', null], '"42"'],
      [[jSymbol, '42', 42, null], '42'],
      [[jSymbol, '{"a":1}', { a: 1 }, null], '{"a":1}'],
      [[jSymbol, '{}', new Error(), null], '{}'],
    ],
    bad: [],
  },

  toData: {
    good: [
      [
        [jSymbol, '"some kind of string"', 'some kind of string', null],
        'some kind of string',
      ],
      [[jSymbol, '"true"', 'true', null], 'true'],
      [[jSymbol, 'true', true, null], true],
      [[jSymbol, '"42"', '42', null], '42'],
      [[jSymbol, '42', 42, null], 42],
      [[jSymbol, '{"a":1}', { a: 1 }, null], { a: 1 }],
      [[jSymbol, '{}', new Error(), null], new Error()],
    ],
    bad: [],
  },

  toArrayBuffer: {
    good: [
      [
        [jSymbol, '{"a":1}', { a: 1 }, null],
        [123, 34, 97, 34, 58, 49, 125],
      ],
      [
        [jSymbol, '{"ä":"aü€☺¥人間"}', { ä: 'aü€☺¥人間' }, null],
        [
          123, 34, 195, 164, 34, 58, 34, 97, 195, 188, 226, 130, 172, 226, 152,
          186, 194, 165, 228, 186, 186, 233, 150, 147, 34, 125,
        ],
      ],
    ],
    bad: [],
  },
};
