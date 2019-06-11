module.exports = {
  testRunner: 'jest-circus/runner',
  restoreMocks: true,
  moduleNameMapper: {
    '^babel-plugin-import-visitor$': '<rootDir>/babel-plugin-import-visitor.js'
  },
  modulePaths: ['<rootDir>/node_modules'],
  testMatch: ['**/__tests__/**/*-test.js'],
  testURL: 'http://localhost/'
};
