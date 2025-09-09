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

//#region COGNITIVE EXERCISES API - COGEX ID's

/**
 * Enum for cognitive exercise IDs.
 * @typedef {'ATTENTION-1' | 'IMPULSE-1' | 'SALIENCE-1' | 'MEMORY-1'} CogexId
 */

//#endregion

//#region COGNITIVE EXERCISES API - USER PROGRESS FOR EXERCISE

/**
 * @typedef {object} UserProgressForExercise
 * @property {string} cogex_id
 * @property {number} current_level
 * @property {number} current_round
 * @property {boolean} is_baseline_training
 * @property {boolean} completed_today
 */

//#endregion

//#region COGNITIVE EXERCISES API - INTERACTIONS FOR CURRENT SESSION

/**
 * @typedef {object} InteractionsForCurrentSession
 * @property {string} created_at
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
 * @property {string} score
 * @property {number} interaction_duration
 * @property {number} user_subscription_level_id
 * @property {string} id
 * @property {boolean} is_baseline_round
 */

//#endregion

//#region COGNITIVE EXERCISES API - CURRENT STATISTICS FOR EXERCISES

/**
 * @typedef {object} CurrentStatisticsForExercise
 * @property {string} exercise_id
 * @property {string} average_accuracy
 * @property {string} highest_accuracy
 * @property {string} average_speed
 * @property {string} fastest_speed
 * @property {string} level_improvement
 * @property {string} workout_improvement
 */

/**
 * @typedef {object} CurrentStatisticsForExercises
 * @property {CurrentStatisticsForExercise[]} current_statistics
 */

//#endregion

//#region COGNITIVE EXERCISES API - CURRENT ROUND STATISTICS FOR EXERCISE

/**
 * @typedef {object} CurrentRountStatisticsForExercise
 * @property {number} level
 * @property {string} accuracy
 * @property {string} speed
 */

/**
 * @typedef {object} CurrentRoundStatisticsForExercise
 * @property {CurrentRountStatisticsForExercise[]} current_round_statistics
 */

//#endregion

//#region COGNITIVE EXERCISES API - NBACK - DIFFICULTY

/**
 * @typedef NBackDifficulty
 * @property {number} level_progression_score
 * @property {number} level_progression_sessions
 * @property {number} n_back
 * @property {number} num_objects
 */

//#endregion

//#region COGNITIVE EXERCISES API - NBACK - SEQUENCE

/**
 * A single frame/exposure in an N-Back sequence.
 * It contains one or two numbers, each representing a shape (integer from 1 to 4).
 * @typedef {number[]} NBackFrame
 */

/**
 * Represents a sequence for the N-Back exercise, returned as a list of frames/exposures.
 * @typedef {NBackFrame[]} NBackSequence
 */

//#endregion

//#region COGNITIVE EXERCISES API - NBACK - VERSION

/**
 * Enum for NBACK versions.
 * @typedef {'alpha' | 'cerebral' | 'prime' } NBackVersion
 */

//#endregion

//#region COGNITIVE EXERCISES API - CATCHME - DIFFICULTY

/**
 * @typedef CatchMeDifficulty
 * @property {number} level_progression_score
 * @property {number} level_progression_sessions
 * @property {number} insect_lifetime
 * @property {number} spawn_rate
 * @property {number} synchronous_spawns
 */

//#endregion

//#region COGNITIVE EXERCISES API - CATCHME - SEQUENCE

/**
 * A list of strings representing the sequence of insects that will be spawned.
 * Each element represents a tuple of species, color, and size.
 * For example ["113", "213", "313", "413", "113", "213", "313"].
 * @typedef {string[]} CatchMeSequence
 */

//#endregion

//#region COGNITIVE EXERCISES API - CATCHME - VERSION

/**
 * Enum for CATCHME versions.
 * @typedef {'alpha' | 'cerebral' | 'prime' } CatchMeVersion
 */

//#endregion

//#region COGNITIVE EXERCISES API - CATCHME - CRITERIA TYPE

/**
 * Enum for CATCHME criteria type.
 * @typedef {'assertiveness' | 'prudence' } CatchMeCriteriaType
 */

//#endregion

//#region COGNITIVE EXERCISES API - SALIENCE - DIFFICULTY

/**
 * @typedef SalienceDifficulty
 * @property {number} level_progression_score
 * @property {number} level_progression_sessions
 * @property {number} sample_exposure
 * @property {number} multispawn_exposure
 */

//#endregion

//#region COGNITIVE EXERCISES API - SALIENCE - SEQUENCE

/**
 * A list of trials for a round in the Salience game.
 * Each trial in the list is an object where keys are the trial type (e.g. "shape", "color", "size"),
 * and the value is a list of strings of the form `["1132", "2134", "2313"]`.
 * Each string in the list represents an object in the frame, and each digit represents a property
 * like shape, number of shapes, color, and size, in that order.
 * The first string in the list is the example object.
 * @typedef {Array<Object.<string, string[]>>} SalienceSequence
 */

//#endregion

//#region COGNITIVE EXERCISES API - SALIENCE - VERSION

/**
 * @typedef {'alpha' | 'cerebral'} SalienceVersion
 */

//#endregion

// We just need to export an empty object for this file to be treated as a module.
export {};