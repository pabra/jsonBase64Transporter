import { json } from '../../src/node';
import { data, dataThrowFromData, dataThrowToArrayBuffer } from '../cases.json';

describe('json.fromData', () => {
  it('should detect non json', () => {
    expect(json.isJson([1, 2, 3, 4])).toBe(false);
    expect(json.isJson([1, 2, 3])).toBe(false);
    expect(json.isJson({ a: 1 })).toBe(false);
    expect(json.isJson(true)).toBe(false);
  });

  data.forEach((entry, i) => {
    const j = json.fromData(entry[0]);

    it(`should detect json for '${i}' ${entry[1]}`, () => {
      expect(json.isJson(j)).toBe(true);
    });

    it(`should get same data for '${i}' ${entry[1]}`, () => {
      if (Number.isNaN(entry[0])) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(json.toData(j)).toEqual(entry[0]);
      } else {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(json.toData(j)).toBe(entry[0]);
      }
    });
  });
});

describe('json.toValue', () => {
  data.forEach((entry, i) => {
    const j = json.fromData(entry[0]);

    it(`should get expected value for '${i}' ${entry[1]}`, () => {
      expect(json.toValue(j)).toBe(entry[1]);
    });

    it(`should get expected ArrayBuffer for '${i}' ${entry[1]}`, () => {
      expect(Array.from(new Uint8Array(json.toArrayBuffer(j)))).toEqual(
        entry[2],
      );
    });
  });
});

describe('json.toArrayBuffer', () => {
  data.forEach((entry, i) => {
    const j = json.fromData(entry[0]);

    it(`should get expected ArrayBuffer for '${i}' ${entry[1]}`, () => {
      expect(Array.from(new Uint8Array(json.toArrayBuffer(j)))).toEqual(
        entry[2],
      );
    });

    it(`should get expected value for '${i}' ${entry[1]}`, () => {
      expect(json.toValue(j)).toBe(entry[1]);
    });
  });
});

describe('throw json.fromData', () => {
  dataThrowFromData.forEach((entry, i) => {
    it(`should throw for '${i}' ${entry[0]}`, () => {
      expect(() => {
        json.fromData(entry[0]);
      }).toThrowError();
    });
  });
});

describe('throw json.toArrayBuffer', () => {
  dataThrowToArrayBuffer.forEach((entry, i) => {
    const j = json.fromData(entry[0]);

    it(`should throw for '${i}' ${typeof entry[0]}`, () => {
      expect(() => {
        json.toArrayBuffer(j);
      }).toThrowError();
    });

    it(`should get expected value for '${i}' ${typeof entry[0]}`, () => {
      expect(json.toValue(j)).toBe(entry[1]);
    });
  });
});
