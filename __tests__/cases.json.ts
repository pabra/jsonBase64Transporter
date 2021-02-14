import { fromData } from '../src/common/json';
const jSymbol = fromData(null)[0];
const jErrSymbol = fromData(BigInt(123) as any)[0];

export const cases: Record<
  'fromData' | 'isJson' | 'isJsonError' | 'toRaw' | 'toData' | 'toArrayBuffer',
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
    bad: [
      [
        BigInt(123),
        [
          'Symbol(json-error)',
          'TypeError: Do not know how to serialize a BigInt',
        ],
      ],
    ],
  },

  isJson: {
    good: [
      [[jSymbol, 'some kind of string'], true],
      [[jSymbol, 42], true],
      [[jSymbol, false], true],
      [[jSymbol, new Error()], true],
    ],
    bad: [
      [undefined, false],
      [true, false],
      [[], false],
      [[Symbol('other'), 'some data'], false],
      [[true, 'some data'], false],
      [[jSymbol, 23, 42], false],
      [[jSymbol], false],
      [[jErrSymbol, 'some kind of string'], false],
    ],
  },

  isJsonError: {
    good: [
      [[jErrSymbol, 'some kind of string'], true],
      [[jErrSymbol, 42], true],
      [[jErrSymbol, false], true],
      [[jErrSymbol, new Error()], true],
    ],
    bad: [
      [undefined, false],
      [true, false],
      [[], false],
      [[Symbol('other'), 'some data'], false],
      [[true, 'some data'], false],
      [[jErrSymbol, 23, 42], false],
      [[jErrSymbol], false],
      [[jSymbol, 'some kind of string'], false],
    ],
  },

  toRaw: {
    good: [
      [[jSymbol, 'some kind of string'], 'some kind of string'],
      [[jSymbol, 42], 42],
      [[jSymbol, false], false],
      [[jSymbol, '{"a":1}'], '{"a":1}'],
      [[undefined, '{"a":1}'], '{"a":1}'],
      [[42, '{"a":1}'], '{"a":1}'],
    ],
    bad: [],
  },

  toData: {
    good: [
      [[jSymbol, '"true"'], 'true'],
      [[jSymbol, 'true'], true],
      [[jSymbol, 'null'], null],
      [[jSymbol, '{"a":1}'], { a: 1 }],
      [[undefined, '{"ä":1}'], { ä: 1 }],
      [[42, '{"a":1}'], { a: 1 }],
    ],
    bad: [
      [
        [jSymbol, 'some string'],
        'SyntaxError: Unexpected token s in JSON at position 0',
      ],
    ],
  },

  toArrayBuffer: {
    good: [
      [
        [jSymbol, '{"a":1}'],
        [123, 34, 97, 34, 58, 49, 125],
      ],
      [
        [jSymbol, '{"ä":"aü€☺¥人間"}'],
        [
          123,
          34,
          195,
          164,
          34,
          58,
          34,
          97,
          195,
          188,
          226,
          130,
          172,
          226,
          152,
          186,
          194,
          165,
          228,
          186,
          186,
          233,
          150,
          147,
          34,
          125,
        ],
      ],
    ],
    bad: [],
  },
};
