import { base64 } from '../../src/node';
import { data } from '../cases.base64';

describe('base64.isBase64', () => {
  it('should detect non base64', () => {
    expect(base64.isBase64([1, 2, 3, 4])).toBe(false);
    expect(base64.isBase64([1, 2, 3])).toBe(false);
    expect(base64.isBase64({ a: 1 })).toBe(false);
    expect(base64.isBase64(true)).toBe(false);
  });

  data.forEach((entry, i) => {
    const b64 = base64.load(entry[0]);

    it(`should detect base64 for '${i}' ${entry[0]}`, () => {
      expect(base64.isBase64(b64)).toBe(true);
    });
  });
});

describe('base64.load', () => {
  data.forEach((entry, i) => {
    const b64_1 = base64.load(entry[0]);
    const b64_2 = base64.load(entry[0]);
    const b64_3 = base64.load(entry[0]);

    it(`should get expected value, text, ArrayBuffer for '${i}' ${entry[0]}`, () => {
      expect(base64.toValue(b64_1)).toBe(entry[0]);
      expect(base64.toText(b64_1)).toBe(entry[1]);
      expect(Array.from(new Uint8Array(base64.toArrayBuffer(b64_1)))).toEqual(
        entry[2],
      );
    });

    it(`should get expected text, ArrayBuffer, value for '${i}' ${entry[0]}`, () => {
      expect(base64.toText(b64_2)).toBe(entry[1]);
      expect(Array.from(new Uint8Array(base64.toArrayBuffer(b64_2)))).toEqual(
        entry[2],
      );
      expect(base64.toValue(b64_2)).toBe(entry[0]);
    });

    it(`should get expected ArrayBuffer, value, text for '${i}' ${entry[0]}`, () => {
      expect(Array.from(new Uint8Array(base64.toArrayBuffer(b64_3)))).toEqual(
        entry[2],
      );
      expect(base64.toValue(b64_3)).toBe(entry[0]);
      expect(base64.toText(b64_3)).toBe(entry[1]);
    });
  });
});

describe('base64.fromArrayBuffer', () => {
  data.forEach((entry, i) => {
    const b64_1 = base64.fromArrayBuffer(new Uint8Array(entry[2]));
    const b64_2 = base64.fromArrayBuffer(new Uint8Array(entry[2]));
    const b64_3 = base64.fromArrayBuffer(new Uint8Array(entry[2]));

    it(`should get expected value, text, ArrayBuffer for '${i}' ${entry[0]}`, () => {
      expect(base64.toValue(b64_1)).toBe(entry[0]);
      expect(base64.toText(b64_1)).toBe(entry[1]);
      expect(Array.from(new Uint8Array(base64.toArrayBuffer(b64_1)))).toEqual(
        entry[2],
      );
    });

    it(`should get expected text, ArrayBuffer, value for '${i}' ${entry[0]}`, () => {
      expect(base64.toText(b64_2)).toBe(entry[1]);
      expect(Array.from(new Uint8Array(base64.toArrayBuffer(b64_2)))).toEqual(
        entry[2],
      );
      expect(base64.toValue(b64_2)).toBe(entry[0]);
    });

    it(`should get expected ArrayBuffer, value, text for '${i}' ${entry[0]}`, () => {
      expect(Array.from(new Uint8Array(base64.toArrayBuffer(b64_3)))).toEqual(
        entry[2],
      );
      expect(base64.toValue(b64_3)).toBe(entry[0]);
      expect(base64.toText(b64_3)).toBe(entry[1]);
    });
  });
});

describe('base64.fromText', () => {
  data.forEach((entry, i) => {
    const b64_1 = base64.fromText(entry[1]);
    const b64_2 = base64.fromText(entry[1]);
    const b64_3 = base64.fromText(entry[1]);

    it(`should get expected value, text, ArrayBuffer for '${i}' ${entry[0]}`, () => {
      expect(base64.toValue(b64_1)).toBe(entry[0]);
      expect(base64.toText(b64_1)).toBe(entry[1]);
      expect(Array.from(new Uint8Array(base64.toArrayBuffer(b64_1)))).toEqual(
        entry[2],
      );
    });

    it(`should get expected text, ArrayBuffer, value for '${i}' ${entry[0]}`, () => {
      expect(base64.toText(b64_2)).toBe(entry[1]);
      expect(Array.from(new Uint8Array(base64.toArrayBuffer(b64_2)))).toEqual(
        entry[2],
      );
      expect(base64.toValue(b64_2)).toBe(entry[0]);
    });

    it(`should get expected ArrayBuffer, value, text for '${i}' ${entry[0]}`, () => {
      expect(Array.from(new Uint8Array(base64.toArrayBuffer(b64_3)))).toEqual(
        entry[2],
      );
      expect(base64.toValue(b64_3)).toBe(entry[0]);
      expect(base64.toText(b64_3)).toBe(entry[1]);
    });
  });
});
