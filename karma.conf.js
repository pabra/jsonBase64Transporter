const puppeteer = require('puppeteer');

process.env.CHROME_BIN = puppeteer.executablePath();

module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', 'karma-typescript'],

    files: [
      { pattern: '__tests__/browser/*.test.ts' },
      '__tests__/*.ts',
      'src/common/*.ts',
      'src/browser/*.ts',
      'src/node/*.ts',
    ],

    preprocessors: {
      '__tests__/*.ts': ['karma-typescript'],
      '__tests__/browser/*.ts': ['karma-typescript'],
      'src/common/*.ts': ['karma-typescript', 'coverage'],
      'src/browser/*.ts': ['karma-typescript', 'coverage'],
      'src/node/*.ts': ['karma-typescript'],
    },

    // reporters: ['dots', 'coverage'],
    reporters: ['progress', 'coverage'],

    coverageReporter: { type: 'lcov', dir: 'coverage/chrome' },

    browsers: ['ChromeHeadless'],

    singleRun: true,
  });
};
