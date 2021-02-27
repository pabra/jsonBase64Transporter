import { json } from '../../src/node';
import { cases } from '../cases.json';

// fromData
describe('json.fromData with good data', () => {
  cases.fromData.good.forEach(([value, expected]) => {
    const j = json.fromData(value);
    it(`JSON of '${j[1]}' to be '${expected}'`, () => {
      expect(j[1]).toBe(expected);
    });
    it(`should be Json with '${j[1]}'`, () => {
      expect(json.isJson(j)).toBeTruthy();
    });
  });
});

describe('json.fromData with bad data', () => {
  cases.fromData.bad.forEach(([value]) => {
    it(`should throw with '${value}'`, () => {
      expect(() => json.fromData(value)).toThrowError();
    });
  });
});

// isJson
describe('json.isJson with good data', () => {
  cases.isJson.good.forEach(([value, expected]) => {
    it(`'${String(value[1])}' to be '${expected}'`, () => {
      expect(json.isJson(value)).toBe(expected);
    });
  });
});

describe('json.isJson with bad data', () => {
  cases.isJson.bad.forEach(([value, expected]) => {
    it(`'${String(
      Array.isArray(value) ? value[1] : value,
    )}' to be '${expected}'`, () => {
      expect(json.isJson(value)).toBe(expected);
    });
  });
});

// toValue
describe('json.toValue with good data', () => {
  cases.toValue.good.forEach(([value, expected]) => {
    it(`'${String(value[1])}' to be '${expected}'`, () => {
      expect(json.toValue(value)).toBe(expected);
    });
  });
});

// toData
describe('json.toData with good data', () => {
  cases.toData.good.forEach(([value, expected]) => {
    it(`'${value[1]}' to be '${expected}' `, () => {
      expect(json.toData(value)).toEqual(expected);
    });
  });
});

describe('json.toData with bad data', () => {
  cases.toData.bad.forEach(([value]) => {
    it(`should throw Error with '${String(value[0])}'`, () => {
      expect(() => json.toData(value)).toThrowError();
    });
  });
});

// toArrayBuffer
describe('json.toArrayBuffer with good data', () => {
  it('should return expected values', () => {
    cases.toArrayBuffer.good.forEach(([value, expected]) => {
      expect(Array.from(new Uint8Array(json.toArrayBuffer(value)))).toEqual(
        expected,
      );
    });
  });
});
