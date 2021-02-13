import { json } from '../../src/node';

it('should throw when importing node json into browser', () => {
  expect(() => {
    json.assertRightEnvironment();
  }).toThrowError('looks like running in browser');
});
