module.exports = {
  projects: [
    {
      displayName: 'browser',
      testEnvironment: 'jsdom',
      testMatch: ['**/__tests__/browser/**/*.test.ts?(x)'],
      preset: 'ts-jest',
      cache: false,
      coverageReporters: ['lcov', 'text', 'html'],
      coverageDirectory: './coverage',
    },
    {
      displayName: 'node',
      testEnvironment: 'node',
      testMatch: ['**/__tests__/node/**/*.test.ts?(x)'],
      preset: 'ts-jest',
      cache: false,
      coverageReporters: ['lcov', 'text', 'html'],
      coverageDirectory: './coverage',
    },
  ],
};
