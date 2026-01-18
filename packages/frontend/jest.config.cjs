const base = require('../../jest.config.base.cjs');

module.exports = {
  ...base,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: ['<rootDir>/**/*.test.(js|jsx|ts|tsx)'],
};
