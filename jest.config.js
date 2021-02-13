module.exports = {
  // projects: [
  //   // {
  //   //   displayName: 'browser',
  //   //   testEnvironment: 'jsdom',
  //   //   testMatch: ['**/__tests__/browser/**/*.test.ts'],
  //   //   preset: 'ts-jest',
  //   //   cache: false,
  //   //   coverageReporters: [],
  //   // },
  //   {
  //     displayName: 'node',
  //     testEnvironment: 'node',
  //     testMatch: ['**/__tests__/node/**/*.test.ts'],
  //     preset: 'ts-jest',
  //     cache: false,
  //   },
  // ],
  displayName: 'node',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/node/**/*.test.ts'],
  preset: 'ts-jest',
  cache: false,
  coverageDirectory: 'coverage/node',
  coverageReporters: ['lcov'],
  coveragePathIgnorePatterns: ['/node_modules/', '/__tests__/', '/src/browser'],
};
