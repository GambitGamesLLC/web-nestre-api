/**
 * development-types.js
 * @file Type definitions for the Nestre Assessment API data objects.
 * @description This file provides JSDoc `@typedefs` for all data structures used by the Nestre API. 
 * These types are crucial for static analysis, autocompletion in IDEs, 
 * and ensuring consistent data handling throughout the codebase.
 * @exports {object}
 */


//#region DEVELOPMENT API - AUTHENTICATION REQUEST

/**
 * @typedef {object} AuthenticationRequest
 * @property {string} username
 * @property {string} password
 */

//#endregion

//#region DEVELOPMENT API - AUTHENTICATION REQUEST

/**
 * @typedef {object} AuthenticationData
 * @property {string} AccessToken
 * @property {number} ExpiresIn
 * @property {number} TokenType
 * @property {string} RefreshToken
 * @property {string} IdToken
 */

//#endregion

// We just need to export an empty object for this file to be treated as a module.
export {};