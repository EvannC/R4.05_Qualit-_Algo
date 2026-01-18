const base = require('../../jest.config.base.cjs');

module.exports = {
  ...base,
  testEnvironment: 'node',
  testMatch: ['<rootDir>/**/*.test.(js|ts)']
};
