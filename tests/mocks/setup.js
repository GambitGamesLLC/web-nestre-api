/**
 * setup.js
 * @file Manages the lifecycle of the MSW mock server within the test runner.
 * @description This script ensures the mock server is started before all tests, 
 * that handlers are reset after each test, 
 * and the server is closed after all tests are finished. 
 * This provides a clean and predictable testing environment.
 * @requires {server} from './server.js'
 */

//#region IMPORTS

import { server } from './server.js';

//#endregion

//#region MSW (MOCK SERVICE WORKER) SETUP - RUNS AT THE START OF A TEST

// Establish API mocking before all tests.
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());

//#endregion

//console.log( "node test runner: end of setup.js" );