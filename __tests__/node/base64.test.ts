import { base64 } from '../../src/node';
import { cases } from '../cases.base64';

// trimmed fromArrayBuffer
describe('trimmed base64.fromData with good data', () => {
  cases.fromArrayBufferTimmed.good.forEach(([value, expected]) => {
    const b64Default = base64.fromArrayBuffer(value);
    const b64 = base64.fromArrayBuffer(value, true);
    it(`should be '${expected} with '${b64Default[1]}`, () => {
      expect(b64Default[1]).toBe(expected);
    });
    it(`should be '${expected} with '${b64[1]}`, () => {
      expect(b64[1]).toBe(expected);
    });
    it(`should be Base64 with '${value}'`, () => {
      expect(base64.isBase64(b64Default)).toBeTruthy();
    });
    it(`should be Base64 with '${value}'`, () => {
      expect(base64.isBase64(b64)).toBeTruthy();
    });
  });
});

describe('base64.fromData with bad data', () => {
  cases.fromArrayBufferTimmed.bad.forEach(([value]) => {
    it(`should thro Error for '${value}'`, () => {
      expect(() => base64.fromArrayBuffer(value)).toThrowError();
    });
  });
});

// not trimmed fromArrayBuffer
describe('not trimmed base64.fromData with good data', () => {
  cases.fromArrayBufferNotTimmed.good.forEach(([value, expected]) => {
    const b64 = base64.fromArrayBuffer(value, false);
    it(`should be '${expected}' with '${b64[1]}'`, () => {
      expect(b64[1]).toBe(expected);
    });
    it(`should be Base64 with '${value}'`, () => {
      expect(base64.isBase64(b64)).toBeTruthy();
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
      expect(() => base64.toArrayBuffer(value)).toThrowError();
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
