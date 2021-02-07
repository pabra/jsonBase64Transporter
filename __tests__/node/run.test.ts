import { run } from '../../src/node';

test('run', () => {
  expect(run()).toBe('hi from node');
});
