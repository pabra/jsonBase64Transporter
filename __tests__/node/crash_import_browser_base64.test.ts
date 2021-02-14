import { base64 as base64Browser } from '../../src/browser';
import { base64 as base64Node } from '../../src/node';

it('should throw when importing bowser base64 into node', () => {
  expect(() => {
    base64Browser.assertRightEnvironment();
  }).toThrowError('looks like running in node');
});

it('should not throw when importing node base64 into node', () => {
  expect(() => {
    base64Node.assertRightEnvironment();
  }).not.toThrow();
});
