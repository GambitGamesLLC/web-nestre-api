/**
 * cognitive-exercises-types.js
 * @file Type definitions for the Nestre Cognitive Exercises API data objects.
 * @description This file provides JSDoc `@typedefs` for all data structures used by the Nestre API. 
 * These types are crucial for static analysis, autocompletion in IDEs, 
 * and ensuring consistent data handling throughout the codebase.
 * @exports {object}
 */

//#region COGNITIVE EXERCISES API - GET EXCERCISES RECOMMENDATION

/**
 * @typedef {object} CognitiveExercisesRecommendation
 * @property {string} cogex_id
 * @property {string} version
 * @property {boolean} is_available
 * @property {boolean} completed_today
 */

//#endregion

// We just need to export an empty object for this file to be treated as a module.
export {};