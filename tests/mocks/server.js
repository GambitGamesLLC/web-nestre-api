/**
 * server.js
 * 
 * Exports a mock server object from the 'msw' (mock-service-worker) library 
 * that works with the Node testing suite
 */

// src/mocks/server.js
import { setupServer } from 'msw/node';
import { handlers } from './handlers.js';

// This configures a request mocking server with the given request handlers.
export const server = setupServer(...handlers);