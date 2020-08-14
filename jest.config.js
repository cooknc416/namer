module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./test-utils/setupTests.ts'],
  coverageDirectory: './coverage/',
  collectCoverage: true
};
