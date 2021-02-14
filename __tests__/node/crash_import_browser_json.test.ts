import { json as jsonBrowser } from '../../src/browser';
import { json as jsonNode } from '../../src/node';

it('should throw when importing bowser json into node', () => {
  expect(() => {
    jsonBrowser.assertRightEnvironment();
  }).toThrowError('looks like running in node');
});

it('should not throw when importing node json into node', () => {
  expect(() => {
    jsonNode.assertRightEnvironment();
  }).not.toThrow();
});
