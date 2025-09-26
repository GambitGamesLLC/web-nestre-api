/**
 * admin-app-types.js
 * @file Type definitions for the Nestre Admin-App API data objects.
 * @description This file provides JSDoc `@typedefs` for all data structures used by the Nestre API. 
 * These types are crucial for static analysis, autocompletion in IDEs, 
 * and ensuring consistent data handling throughout the codebase.
 * @exports {object}
 */


//#region ADMIN APP API - USERS MATCHING SEARCH

/**
 * @typedef {object} MatchingUser
 * @property {string} id
 * @property {string} created_at
 * @property {string} email
 * @property {string} firstname
 * @property {string} lastname
 * @property {string} gender
 * @property {string} date_of_birth
 * @property {string} username
 * @property {string} subscription_level
 * @property {string} subscription_type
 * @property {boolean} trial_used
 * @property {boolean} frame_it_unlocked
 * @property {string} last_activity
 */

/**
 * A list of users that match the search criteria.
 * @typedef {MatchingUser[]} UsersMatchingSearch
 */

//#endregion

// We just need to export an empty object for this file to be treated as a module.
export {};