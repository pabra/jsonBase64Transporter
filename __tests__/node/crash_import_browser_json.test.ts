import { json } from '../../src/browser';

it('should throw when importing bowser json into node', () => {
  expect(() => {
    json.assertRightEnvironment();
  }).toThrowError('looks like running in node');
});
