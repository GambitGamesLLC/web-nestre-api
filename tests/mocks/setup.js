/**
 * setup.js
 * @file Manages the lifecycle of the MSW mock server within the Node.js test runner.
 * @description This script ensures the mock server is started before all tests, 
 * that handlers are reset after each test, 
 * and the server is closed after all tests are finished. 
 * This provides a clean and predictable testing environment.
 * @requires {before} from 'node:test'
 * @requires {after} from 'node:test'
 * @requires {afterEach} from 'node:test'
 * @requires {server} from './server.js'
 */

//#region IMPORTS

import { before, after, afterEach } from 'node:test';
import { server } from './server.js';

//#endregion

//#region MSW (MOCK SERVICE WORKER) SETUP - RUNS AT THE START OF A TEST

// Establish API mocking before all tests.
before
(
    () => 
    { 
        //console.log( "node test runner : before()" );
        server.listen({ onUnhandledRequest: 'error' } ); 
    }
);

// Reset any request handlers that we may add during the tests.
afterEach
(
    () => 
    {
        //console.log( "node test runner : afterEach()" ); 
        server.resetHandlers(); 
    }
);

// Clean up after the tests are finished.
after
(
    () => 
    {
        //console.log( "node test runner : after()"); 
        server.close(); 
    }
);

//#endregion

//console.log( "node test runner: end of setup.js" );