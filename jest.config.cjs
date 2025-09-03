module.exports = {
  // Use the jsdom environment for browser APIs
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: [''],
  },

  // Define the root directory for your tests
  roots: ['<rootDir>/tests'],

  // Run a setup file to configure MSW before tests
  setupFilesAfterEnv: ['<rootDir>/tests/mocks/setup.js'],
};