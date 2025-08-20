/**
 * web-nestre-api
 * 
 * Primary entry point for this package
 */

// Export the main manager class so users can instantiate it.
export { NestreApiManager, HttpMethod } from './nestre-api-manager.js';

// Re-export the empty object for each types definition file. This allows JSDoc-aware
// editors to find and use the JSDoc @typedefs for type checking.
export * from './user/user-types.js';