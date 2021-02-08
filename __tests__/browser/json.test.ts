import { json } from '../../src/index.browser';
import { cases } from '../cases';

describe('json good data', () => {
  test.each(cases.fromData.good)('gc', (value, expected) => {
    expect(json.fromData(value)[1]).toBe(expected);
    expect(json.isJson(json.fromData(value))).toBeTruthy();
    expect(json.isJsonError(json.fromData(value))).not.toBeTruthy();
  });
});

describe('json bad data', () => {
  test.each(cases.fromData.bad)('bc', (value, expected) => {
    const d = json.fromData(value);
    expect([String(d[0]), String(d[1])]).toEqual(expected);
    expect(json.isJsonError(json.fromData(value))).toBeTruthy();
    expect(json.isJson(json.fromData(value))).not.toBeTruthy();
  });
});
