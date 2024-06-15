/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

require('dotenv').config({ path: '.env' });

export default {
  automock: false,
  clearMocks: true,
  coveragePathIgnorePatterns: ['/node_modules/'],
  setupFiles: ['<rootDir>/src/utilities/jest/setup-integration.ts'],

  transform: {
    '^.+\\.ts$': ['ts-jest', { diagnostics: false }],
  },

  moduleDirectories: ['node_modules'],

  moduleFileExtensions: ['js', 'json', 'ts', 'node'],

  roots: ['<rootDir>/src'],

  testMatch: ['/**/__integration__/**/*.ts'],

  preset: 'ts-jest',

  testPathIgnorePatterns: [],
};
