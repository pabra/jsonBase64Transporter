import { json } from '../../src/browser';
import { cases } from '../cases.json';

// fromData
describe('json good data', () => {
  it('should return expected values', () => {
    cases.fromData.good.forEach(([value, expected]) => {
      const j = json.fromData(value);
      expect(j[1]).toBe(expected);
      expect(json.isJson(j)).toBeTruthy();
      expect(json.isJsonError(j)).not.toBeTruthy();
    });
  });
});

describe('json bad data', () => {
  it('should detect bad return values', () => {
    cases.fromData.bad.forEach(([value, expected]) => {
      const d = json.fromData(value);
      expect([String(d[0]), String(d[1])]).toEqual(expected);
      expect(json.isJsonError(d)).toBeTruthy();
      expect(json.isJson(d)).not.toBeTruthy();
    });
  });
});

// isJson
describe('json.isJson with good data', () => {
  it('should return expected values', () => {
    cases.isJson.good.forEach(([value, expected]) => {
      expect(json.isJson(value)).toBe(expected);
    });
  });
});

describe('json.isJson with bad data', () => {
  it('should detect bad json', () => {
    cases.isJson.bad.forEach(([value, expected]) => {
      expect(json.isJson(value)).toBe(expected);
    });
  });
});

// isJsonError
describe('json.isJsonError with good data', () => {
  it('should return expected values', () => {
    cases.isJsonError.good.forEach(([value, expected]) => {
      expect(json.isJsonError(value)).toBe(expected);
    });
  });
});

describe('json.isJsonError with bad data', () => {
  it('should detect bad json', () => {
    cases.isJsonError.bad.forEach(([value, expected]) => {
      expect(json.isJsonError(value)).toBe(expected);
    });
  });
});

// toValue
describe('json.toValue with good data', () => {
  it('should return expected values', () => {
    cases.toValue.good.forEach(([value, expected]) => {
      expect(json.toValue(value)).toBe(expected);
    });
  });
});

// toData
describe('json.toData with good data', () => {
  it('should return expected values', () => {
    cases.toData.good.forEach(([value, expected]) => {
      expect(json.toData(value)).toEqual(expected);
    });
  });
});

describe('json.toData with bad data', () => {
  it('should detect bad json', () => {
    cases.toData.bad.forEach(([value, expected]) => {
      const data = json.toData(value);
      expect(json.isJsonError(data)).toBe(true);
      expect(String((data as any)[1])).toBe(expected);
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
