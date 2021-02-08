export const cases: Record<'fromData', Record<'good' | 'bad', [any, any][]>> = {
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
};
