module.exports = {
  // Use the jsdom environment for browser APIs
  testEnvironment: 'jsdom',

  // Treat .js files as ES Modules
  // This is no longer necessary as it's handled by "type": "module" in package.json
  // extensionsToTreatAsEsm: ['.js'],


  // Define the root directory for your tests
  roots: ['<rootDir>/tests'],

  // Run a setup file to configure MSW before tests
  setupFilesAfterEnv: ['<rootDir>/tests/mocks/setup.js'],
};