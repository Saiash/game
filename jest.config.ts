// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

export default {
  notify: false,
  setupFiles: [],

  verbose: true,

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  transform: { '^.+\\.ts$': ['ts-jest'] },
  preset: 'ts-jest',

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: ['/node_modules/'],

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: ['json', 'text', 'lcov'],

  // An array of directory names to be searched recursively up from the requiring module's location
  moduleDirectories: ['node_modules'],

  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'ts', 'node', 'json', 'mjs', 'cjs'],

  // A list of paths to directories that Jest should use to search for files in
  roots: ['<rootDir>/src'],

  // The test environment that will be used for testing
  testEnvironment: 'node',

  // The glob patterns Jest uses to detect test files
  testMatch: ['**/__tests__/**/*.ts'],

  coverageThreshold: {
    global: {
      statements: 88.7,
      branches: 72.1,
      lines: 90.2,
      functions: 87.18,
    },
  },
  collectCoverageFrom: [],
  unmockedModulePathPatterns: [],
  testPathIgnorePatterns: [],
};
