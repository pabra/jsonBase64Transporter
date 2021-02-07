import { run } from '../../src/browser';

test('run', () => {
  expect(run()).toBe('hi from browser');
});
