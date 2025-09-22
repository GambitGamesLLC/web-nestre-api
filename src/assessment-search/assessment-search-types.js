/**
 * assessment-search-types.js
 * @file Type definitions for the Nestre Assessment Search API data objects.
 * @description This file provides JSDoc `@typedefs` for all data structures used by the Nestre API. 
 * These types are crucial for static analysis, autocompletion in IDEs, 
 * and ensuring consistent data handling throughout the codebase.
 * @exports {object}
 */


//#region ASSESSMENT SEARCH API - USER IDS

/**
 * List of userIds
 * @typedef {string[]} UserIds
 */

//#endregion

//#region ASSESSMENT SEARCH API - ADDITIONAL PROPERTIES

/**
 * @typedef {object} AdditionalProperty
 * @property {number} additionalProp1
 * @property {number} additionalProp2
 * @property {number} additionalProp3
 */

/**
 * Dictionary mapping user IDs to their latest assessment scores.
 * @typedef {object} AdditionalProperties
 * @property {AdditionalProperty} additionalProp1
 * @property {AdditionalProperty} additionalProp2
 * @property {AdditionalProperty} additionalProp3
 */

//#endregion

//#region ASSESSMENT SEARCH API - ASSESSMENT IDS

/**
 * List of assessment IDs
 * @typedef {string[]} AssessmentIds
 */

//#endregion

//#region ASSESSMENT SEARCH API - ASSESSMENT WITH RESPONSES

/**
 * @typedef {object} AssessmentSearchResponse
 * @property {string} question_id
 * @property {string} score
 */

/**
 * @typedef {object} AssessmentWithResponses
 * @property {string} id
 * @property {string} created_at
 * @property {number} alpha
 * @property {number} cerebral
 * @property {number} prime
 * @property {AssessmentSearchResponse[]} responses
 */

/**
 * List of assessments with their responses
 * @typedef {AssessmentWithResponses[]} AssessmentsWithResponses
 */

//#endregion

//#region ASSESSMENT SEARCH API - USERS MATCHING ASSESSMENT CRITERIA

/**
 * @typedef {object} UserAssessmentSummary
 * @property {string} id
 * @property {number} alpha
 * @property {number} cerebral
 * @property {number} prime
 * @property {string} created_at
 */

/**
 * @typedef {object} UserMatch
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} date_of_birth
 * @property {UserAssessmentSummary[]} assessments
 * @property {string} source
 */

/**
 * A list of users that match the assessment criteria.
 * @typedef {UserMatch[]} UsersMatchingAssessmentCriteria
 */

//#endregion

// We just need to export an empty object for this file to be treated as a module.
export {};