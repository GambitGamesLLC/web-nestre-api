module.exports = {
  // Use the jsdom environment for browser APIs
  testEnvironment: 'jsdom',

  // Treat .js files as ES Modules
  extensionsToTreatAsEsm: ['.js'],

  // Use this custom transformer for ES Modules
  transform: {},

  // Define the root directory for your tests
  roots: ['<rootDir>/tests'],

  // Run a setup file to configure MSW before tests
  setupFilesAfterEnv: ['<rootDir>/tests/mocks/setup.js'],
};