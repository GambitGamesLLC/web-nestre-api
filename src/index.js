// Export the main client class so users can instantiate it.
export { NestreApiClient } from './nestre-api-client.js';

// Re-export the empty object from types.js. This allows TypeScript-aware
// editors to find and use the JSDoc @typedefs for type checking.
export * from './types.js';