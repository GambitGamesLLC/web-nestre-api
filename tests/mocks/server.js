/**
 * server.js
 * @file Configures and exports a mock server for Node.js test environments.
 * @description This file sets up a request mocking server using `msw/node`, 
 * which is configured with the handlers defined in `handlers.js`. 
 * This allows the unit tests to run in a Node.js context and intercept API calls.
 * @requires {setupServer} from 'msw/node'
 * @requires {handlers} from './handlers.js'
 * @exports {setupServer} server
 */

// src/mocks/server.js
import { setupServer } from 'msw/node';
import { handlers } from './handlers.js';

// This configures a request mocking server with the given request handlers.
export const server = setupServer(...handlers);