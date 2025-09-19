/**
 * user-search-types.js
 * @file Type definitions for the Nestre User Search API data objects.
 * @description This file provides JSDoc `@typedefs` for all data structures used by the Nestre User API. 
 * These types are crucial for static analysis, autocompletion in IDEs, 
 * and ensuring consistent data handling throughout the codebase.
 * @exports {object}
 */

//#region USER API - BASIC USER PROFILE

/**
 * @typedef {object} MindsetProfile
 * @property {string} id
 * @property {number} alpha
 * @property {number} cerebral
 * @property {number} prime
 * @property {string} created_at
 * @property {string[]} assessment_summary
 */

/**
 * User profile data
 * @typedef {object} UserProfileData
 * @property {string} user_id
 * @property {string} firstname
 * @property {string} lastname
 * @property {string} email
 * @property {string} date_of_birth
 * @property {string} profile_photo
 * @property {MindsetProfile} mindset_profile
 */

//#endregion


// We just need to export an empty object for this file to be treated as a module.
export {};