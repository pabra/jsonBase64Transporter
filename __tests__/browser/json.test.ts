import { json } from '../../src/browser';
import { cases } from '../cases';

describe('json good data', () => {
  it('should return expected values', () => {
    cases.fromData.good.forEach(([value, expected]) => {
      expect(json.fromData(value)[1]).toBe(expected);
      expect(json.isJson(json.fromData(value))).toBeTruthy();
      expect(json.isJsonError(json.fromData(value))).not.toBeTruthy();
    });
  });
});

describe('json bad data', () => {
  it('should detect bad return values', () => {
    cases.fromData.bad.forEach(([value, expected]) => {
      const d = json.fromData(value);
      expect([String(d[0]), String(d[1])]).toEqual(expected);
      expect(json.isJsonError(json.fromData(value))).toBeTruthy();
      expect(json.isJson(json.fromData(value))).not.toBeTruthy();
    });
  });
});
