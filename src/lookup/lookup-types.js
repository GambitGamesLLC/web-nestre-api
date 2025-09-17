/**
 * lookup-types.js
 * @file Type definitions for the Nestre Lookup API data objects.
 * @description This file provides JSDoc `@typedefs` for all data structures used by the Nestre API. 
 * These types are crucial for static analysis, autocompletion in IDEs, 
 * and ensuring consistent data handling throughout the codebase.
 * @exports {object}
 */

//#region LOOKUP API - GENDER OPTIONS

/**
 * @typedef {object} GenderOption
 * @property {number} id
 * @property {string} name
 */

/**
 * List of gender options with IDs and display names
 * @typedef {object} GenderOptions
 * @property {GenderOption[]} gender_options
 */

//#endregion

//#region LOOKUP API - EDUCATION OPTIONS

/**
 * @typedef {object} EducationOption
 * @property {number} id
 * @property {string} name
 * @property {number} value
 */

/**
 * List of education levels with IDs and descriptions
 * @typedef {object} EducationOptions
 * @property {EducationOption[]} education_options
 */

//#endregion

//#region LOOKUP API - MARITAL OPTIONS

/**
 * @typedef {object} MaritalOption
 * @property {number} id
 * @property {string} name
 */

/**
 * List of marital status options with IDs and labels
 * @typedef {object} MaritalOptions
 * @property {MaritalOption[]} marital_options
 */

//#endregion

//#region LOOKUP API - SUBSCRIPTION OPTIONS

/**
 * @typedef {object} SubscriptionOption
 * @property {number} id
 * @property {string} name
 * @property {number} value
 */

/**
 * List of subscription levels with details and feature access
 * @typedef {object} SubscriptionOptions
 * @property {SubscriptionOption[]} subscription_options
 */

//#endregion

// We just need to export an empty object for this file to be treated as a module.
export {};