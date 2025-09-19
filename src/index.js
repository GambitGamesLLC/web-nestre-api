/**
 * index.js
 * @file Primary entry point for the web-nestre-api package.
 * @description This file consolidates the main components of the package, re-exporting the core NestreApiManager and HttpMethod enum, as well as all JSDoc type definitions, to provide a single, clean import path for consumers of the library.
 * @exports {NestreApiManager}
 * @exports {HttpMethod}
 * @exports {object} all JSDoc type definitions
 */

// Export the main manager class so users can instantiate it.
export { NestreApiManager, HttpMethod } from './nestre-api-manager.js';

// Re-export the empty object for each types definition file. This allows JSDoc-aware
// editors to find and use the JSDoc @typedefs for type checking.
export * from './user/user-types.js';
export * from './daily-workout/daily-workout-types.js';
export * from './cognitive-exercises/cognitive-exercises-types.js';
export * from './mental-framing/mental-framing-types.js';
export * from './assessment/assessment-types.js';
export * from './content-interaction/content-interaction-types.js';
export * from './content-recommendations/content-recommendations-types.js';
export * from './frame-it/frame-it-types.js';
export * from './lookup/lookup-types.js';
export * from './utility/utility-types.js';
export * from './user-search/user-search-types.js';
export * from './assessment-search/assessment-search-types.js';

// Re-export the error classes
export * from './errors/authorization-error.js';
export * from './errors/forbidden-error.js';
export * from './errors/general-error.js';
export * from './errors/internal-server-error.js';
export * from './errors/validation-error.js';