module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./test-utils/setupTests.ts'],
  coverageDirectory: './coverage/',
  collectCoverage: true,
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/test-utils/fileMock.js',
    '\\.(css|less)$': '<rootDir>/test-utils/styleMock.js',
    "electron": "<rootDir>/test-utils/electronMock.js"
  }
};
