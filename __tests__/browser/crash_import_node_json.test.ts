import { json as jsonBrowser } from '../../src/browser';
import { json as jsonNode } from '../../src/node';

it('should throw when importing node json into browser', () => {
  expect(() => {
    jsonNode.assertRightEnvironment();
  }).toThrowError('looks like running in browser');
});

it('should not throw when importing browser json into browser', () => {
  expect(() => {
    jsonBrowser.assertRightEnvironment();
  }).not.toThrow();
});
