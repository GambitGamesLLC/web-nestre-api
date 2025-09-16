/**
 * frame-it-types.js
 * @file Type definitions for the Nestre Frame It API data objects.
 * @description This file provides JSDoc `@typedefs` for all data structures used by the Nestre API. 
 * These types are crucial for static analysis, autocompletion in IDEs, 
 * and ensuring consistent data handling throughout the codebase.
 * @exports {object}
 */

//#region FRAME IT API - FRAME IT PHRASES

/**
 * Request body for CreatePersonalizedFrame() in the frame-it-api
 * @typedef {string[]} FrameItPhrases
 */

//#endregion

//#region FRAME IT API - PERSONALIZED FRAME IT

/**
 * Represents a personalized frame-it object.
 * @typedef {object} PersonalizedFrameIt
 * @property {string} updated_at
 * @property {string} created_at
 * @property {string} id
 * @property {string[]} phrases
 * @property {string[]} wins
 * @property {boolean} completed
 * @property {string} image_url
 */

//#endregion

// We just need to export an empty object for this file to be treated as a module.
export {};