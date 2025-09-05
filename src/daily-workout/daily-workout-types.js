/**
 * daily-workout-types.js
 * @file Type definitions for the Nestre Daily Workout API data objects.
 * @description This file provides JSDoc `@typedefs` for all data structures used by the Nestre Daily Workout API. 
 * These types are crucial for static analysis, autocompletion in IDEs, 
 * and ensuring consistent data handling throughout the codebase.
 * @exports {object}
 */

//#region DAILY WORKOUT API - DAILY WORKOUT RECOMMENDATION

/**
 * @typedef {object} CognitiveExercise
 * @property {string} cogex_id
 * @property {string} version
 * @property {boolean} is_available
 * @property {boolean} completed_today
 */

/**
 * @typedef {object} Content
 * @property {string} content_id
 * @property {boolean} completed_today
 */

/**
 * @typedef {object} DailyWorkoutRecommendation
 * @property {CognitiveExercise[]} cognitive_exercises
 * @property {Content[]} contents
 */

//#endregion

// We just need to export an empty object for this file to be treated as a module.
export {};