/**
 * content-interaction-types.js
 * @file Type definitions for the Nestre Content Interaction API data objects.
 * @description This file provides JSDoc `@typedefs` for all data structures used by the Nestre API. 
 * These types are crucial for static analysis, autocompletion in IDEs, 
 * and ensuring consistent data handling throughout the codebase.
 * @exports {object}
 */

//#region CONTENT INTERACTION API - CONTENT INTERACTION

/**
 * Request body for the functions the content-interaction-api
 * @typedef {object} ContentInteraction
 * @property {string} user_id
 * @property {number} interaction_duration
 * @property {number[]} interaction_record
 * @property {number} last_position
 * @property {string} context
 * @property {number} cms_version
 * @property {number} user_subscription_level_id
 * @property {string} content_id                    matches the content_id for a piece of content in 'contentful'
 */

//#endregion

//#region CONTENT INTERACTION API - CONTENT INTERACTION SUCCESS MESSAGE

/**
 * @typedef {object} ContentInteractionSuccessMessage
 * @property {string} message
 */

//#endregion

// We just need to export an empty object for this file to be treated as a module.
export {};