const JestBaseConfiguration = require('./jest.base-config');

module.exports = Object.assign(JestBaseConfiguration, {
  roots: ['<rootDir>/src'],

  coverageDirectory: '<rootDir>/docs/coverage',
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 35,
      lines: 45,
      statements: 45,
    },
  },
  testTimeout: 30000,
});
