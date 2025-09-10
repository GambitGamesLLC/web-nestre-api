/**
 * assessment-types.js
 * @file Type definitions for the Nestre Assessment API data objects.
 * @description This file provides JSDoc `@typedefs` for all data structures used by the Nestre API. 
 * These types are crucial for static analysis, autocompletion in IDEs, 
 * and ensuring consistent data handling throughout the codebase.
 * @exports {object}
 */


//#region ASSESSMENT API - GET RANDOMIZED ASSESSMENT QUESTIONS

/**
 * @typedef {object} RandomizedQuestion
 * @property {string} id
 * @property {string} title
 * @property {number} section
 */

/**
 * List of assessment questions in randomized order
 * @typedef {RandomizedQuestion[]} RandomizedAssessmentQuestions
 */

//#endregion

//#region ASSESSMENT API - ASSESSMENT RESULT

/**
 * Submit completed assessment responses and receive calculated mindset profile with personalized summaries
 * @typedef {object} AssessmentResult
 * @property {string} id
 * @property {number} alpha
 * @property {number} cerebral
 * @property {number} prime
 * @property {string} created_at
 * @property {string[]} assessment_summary
 */

//#endregion

//#region ASSESSMENT API - ASSESSMENT RESPONSES

/**
 * @typedef {'bCZ7FSju7aQdUbNFQ7hfd' | '3JTBUeVqS7mum6YErk0e0Y' | '3CNimutSbaAnAucrVvyupx' | '6ugahfvmQqZW9vohWKfvte' | '5EnjhhFBhH7KammXba4xcO' | '2Dku9IfXzhSmv0erxeVMV2' | '4j72p4Jznmtpticm5atZno' | '2MQ1V0J6QHrf9YjvdBKNab' | '6DubZxJIfXNviGzfbITLCA' | '3FQ1q8nghtsasGTzGgKC8I' | '41UrVk57Uo7XgvAgUqOPLb' | '6a6hUC7nw4n6XcvYnEJzUZ' | 'X5a4NftS4NxGXkoPStBrs' | '45suVW99wXZmhKQruO8Lme' | '6eGU3dzh9kiXR5n90mZgVN' | 'lSSWizDYp3JQOTrT9Jmpi' | '30W6xGxvRZyFraQcXjojNy' | 'nTOUJAPWlTSRDvEf5q5O3' | '7F22NiUUeufVbZr0mpTetn' | '1DwjIVJ3pFYzHYEZYlmCzB' | '5c256kPsJKNzqt5vp5yIcM' | '7FmYy5koR7SzrVie1bhDgi' | '5ouWXQfAjExsx3FMFLc1yq' | '52m7uUJaR1cTorbiQGATbS' | '6Bmjw1yK7FbS5wjbMjRTFj'} AssessmentQuestionId
 */

/**
 * @typedef {object} AssessmentResponse
 * @property {AssessmentQuestionId} question_id
 * @property {number} score
 */

/**
 * @typedef {object} AssessmentResponses
 * @property {AssessmentResponse[]} responses
 */

//#endregion

// We just need to export an empty object for this file to be treated as a module.
export {};