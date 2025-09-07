/**
 * cognitive-exercises-schemas.js
 * @file Joi schemas for validating cognitive exercises data objects.
 * @description This file exports Joi validation schemas for the objects used in the Cognitive Exercises API. 
 * These schemas are used to ensure the data sent to the API functions has the correct shape and type.
 * @exports {CognitiveExerciseRecordSchema}
 */

//#region IMPORTS

import Joi from '../../vendor/joi/joi.js';

//#endregion

//#region COGNITIVE EXERCISES - RECORD EXERCISE INTERACTION SCHEMA

/**
 * Joi schema for validating the CognitiveExerciseRecord object.
 */
export const CognitiveExerciseRecordSchema = Joi.object({
    cogex_id: Joi.string().required(),
    user_id: Joi.string().required(),
    context: Joi.string().required(),
    version: Joi.string().required(),
    level: Joi.number().integer().required(),
    round_number: Joi.number().integer().required(),
    correct_assertiveness: Joi.number().integer().required(),
    incorrect_assertiveness: Joi.number().integer().required(),
    correct_prudence: Joi.number().integer().required(),
    incorrect_prudence: Joi.number().integer().required(),
    no_answer: Joi.number().integer().required(),
    average_reaction_time_correct: Joi.number().required(),
    average_reaction_time_incorrect: Joi.number().required(),
    score: Joi.number().required(),
    interaction_duration: Joi.number().required(),
    user_subscription_level_id: Joi.number().integer().required()
}).unknown(false); // Prevents unknown keys

//#endregion
