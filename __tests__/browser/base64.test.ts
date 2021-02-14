import { base64 } from '../../src/browser';
import { cases } from '../cases.base64';

// trimmed fromArrayBuffer
describe('trimmed base64.fromData with good data', () => {
  it('should return expected values', () => {
    cases.fromArrayBufferTimmed.good.forEach(([value, expected]) => {
      const b64Default = base64.fromArrayBuffer(value);
      const b64 = base64.fromArrayBuffer(value, true);
      expect(b64Default[1]).toBe(expected);
      expect(b64[1]).toBe(expected);
      expect(base64.isBase64(b64Default)).toBeTruthy();
      expect(base64.isBase64(b64)).toBeTruthy();
      expect(base64.isBase64Error(b64Default)).not.toBeTruthy();
      expect(base64.isBase64Error(b64)).not.toBeTruthy();
    });
  });
});

describe('base64.fromData with bad data', () => {
  it('should detect bad return values', () => {
    cases.fromArrayBufferTimmed.bad.forEach(([value, expected]) => {
      const d = base64.fromArrayBuffer(value);
      expect(String(d[0])).toEqual(expected);
      expect(base64.isBase64Error(d)).toBeTruthy();
      expect(base64.isBase64(d)).not.toBeTruthy();
    });
  });
});

// not trimmed fromArrayBuffer
describe('not trimmed base64.fromData with good data', () => {
  it('should return expected values', () => {
    cases.fromArrayBufferNotTimmed.good.forEach(([value, expected]) => {
      const b64 = base64.fromArrayBuffer(value, false);
      expect(b64[1]).toBe(expected);
      expect(base64.isBase64(b64)).toBeTruthy();
      expect(base64.isBase64Error(b64)).not.toBeTruthy();
    });
  });
});

// toArrayBuffer
describe('base64.toArrayBuffer with good data', () => {
  it('should return expected values', () => {
    cases.toArrayBuffer.good.forEach(([value, expected]) => {
      const buf = base64.toArrayBuffer(value) as any;
      expect(Array.from(new Uint8Array(buf))).toEqual(expected);
      expect(base64.isBase64Error(buf)).not.toBeTruthy();
      expect(base64.isBase64(buf)).not.toBeTruthy();
    });
  });
});

describe('base64.toArrayBuffer with bad data', () => {
  it('should detect bad return values', () => {
    cases.toArrayBuffer.bad.forEach(([value, expected]) => {
      const buf = base64.toArrayBuffer(value) as any;
      expect(String(buf[0])).toBe(expected);
      expect(base64.isBase64Error(buf)).toBeTruthy();
      expect(base64.isBase64(buf)).not.toBeTruthy();
    });
  });
});
