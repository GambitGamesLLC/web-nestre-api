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

//#region COGNITIVE EXERCISES API - RECORD EXERCISE INTERACTION

/**
 * @typedef {object} CognitiveExerciseRecord
 * @property {string} cogex_id
 * @property {string} user_id
 * @property {string} context
 * @property {string} version
 * @property {number} level
 * @property {number} round_number
 * @property {number} correct_assertiveness
 * @property {number} incorrect_assertiveness
 * @property {number} correct_prudence
 * @property {number} incorrect_prudence
 * @property {number} no_answer
 * @property {number} average_reaction_time_correct
 * @property {number} average_reaction_time_incorrect
 * @property {number} score
 * @property {number} interaction_duration
 * @property {number} user_subscription_level_id
 */

//#endregion

//#region COGNITIVE EXERCISES API - RECORD EXERCISE INTERACTION CONFIRMATION MESSAGE

/**
 * A confirmation message string returned upon successfully recording a cognitive exercise interaction.
 * @typedef {string} RecordExerciseInteractionConfirmationMessage
 */

//#endregion

// We just need to export an empty object for this file to be treated as a module.
export {};