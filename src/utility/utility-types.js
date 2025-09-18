/**
 * utility-types.js
 * @file Type definitions for the Nestre Utility API data objects.
 * @description This file provides JSDoc `@typedefs` for all data structures used by the Nestre API. 
 * These types are crucial for static analysis, autocompletion in IDEs, 
 * and ensuring consistent data handling throughout the codebase.
 * @exports {object}
 */

//#region UTILITY API - URL

/**
 * Request body for CreateShortenedUrl() in the utility-api
 * @typedef {string} Url
 */

//#endregion

//#region UTILITY API - ERROR LOG

/**
 * @typedef {'TRACE' | 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'FATAL'} LogLevel
 */

/**
 * Request body for LogClientError() in the utility-api
 * @typedef {object} ErrorLog
 * @property {string} message
 * @property {LogLevel} log_level
 */

//#endregion

//#region UTILITY API - ERROR LOGGED SUCCESS MESSAGE

/**
 * Response for LogClientError() in the utility-api
 * @typedef {object} ErrorLoggedSuccessMessage
 * @property {string} message
 */

//#endregion

// We just need to export an empty object for this file to be treated as a module.
export {};