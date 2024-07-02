const tsconfig = require('./tsconfig.json');
const moduleNameMapper = require('tsconfig-paths-jest')(tsconfig);

module.exports = {
  moduleNameMapper,
  preset: 'ts-jest',
  testEnvironment: 'node',

  rootDir: './',

  collectCoverage: true,
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageProvider: 'v8',
  resetModules: true,
  setupFiles: ['dotenv/config'],
  verbose: false,
};
