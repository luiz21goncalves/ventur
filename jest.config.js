module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./tests/setupTests.ts'],
  testEnvironment: 'jsdom'
}
