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