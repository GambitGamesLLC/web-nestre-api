/**
 * web-nestre-api
 * 
 * Primary entry point for this package
 */

// Export the main client class so users can instantiate it.
export {NestreAPIManager} from './nestre-api-manager.js';

// Re-export the empty object from types.js. This allows TypeScript-aware
// editors to find and use the JSDoc @typedefs for type checking.
export * from './types.js';
export * from './user/user-types.js';