import { base64 } from '../../src/browser';
import { cases } from '../cases.base64';

// trimmed fromArrayBuffer
describe('trimmed base64.fromData with good data', () => {
  cases.fromArrayBuffer.good.forEach(([value, expected]) => {
    const b64 = base64.fromArrayBuffer(value);
    it(`should be '${expected} with '${b64[1]}`, () => {
      expect(b64[1]).toBeNull();
      expect(b64[2]).not.toBeNull();
      expect(base64.toValue(b64)).toBe(expected);
      expect(b64[1]).not.toBeNull();
      expect(b64[2]).not.toBeNull();
    });
    it(`should be Base64 with '${value}'`, () => {
      expect(base64.isBase64(b64)).toBeTruthy();
    });
  });
});

describe('base64.fromData with bad data', () => {
  cases.fromArrayBuffer.bad.forEach(([value]) => {
    it(`should thro Error for '${value}'`, () => {
      expect(() =>
        base64.toValue(base64.fromArrayBuffer(value)),
      ).toThrowError();
    });
  });
});

// toArrayBuffer
describe('base64.toArrayBuffer with good data', () => {
  cases.toArrayBuffer.good.forEach(([value, expected]) => {
    const buf = base64.toArrayBuffer(value) as any;
    it(`should be expected Array '${expected}' for '${value[1]}'`, () => {
      expect(Array.from(new Uint8Array(buf))).toEqual(expected);
    });
    it(`should not be Base64 with '${value[1]}'`, () => {
      expect(base64.isBase64(buf)).not.toBeTruthy();
    });
  });
});

describe('base64.toArrayBuffer with bad data', () => {
  cases.toArrayBuffer.bad.forEach(([value]) => {
    it(`should throw with '${value[0]}'`, () => {
      expect(() => base64.toArrayBuffer(base64.load(value))).toThrowError();
    });
  });
});

describe('base64.load with good data', () => {
  cases.load.good.forEach(([value, expected]) => {
    it(`should load '${value}' as '${expected}'`, () => {
      expect(
        Array.from(new Uint8Array(base64.toArrayBuffer(base64.load(value)))),
      ).toEqual(expected);
    });
  });
});
