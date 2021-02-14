import { base64 as base64Browser } from '../../src/browser';
import { base64 as base64Node } from '../../src/node';

it('should throw when importing node base64 into browser', () => {
  expect(() => {
    base64Node.assertRightEnvironment();
  }).toThrowError('looks like running in browser');
});

it('should not throw when importing browser base64 into browser', () => {
  expect(() => {
    base64Browser.assertRightEnvironment();
  }).not.toThrow();
});
