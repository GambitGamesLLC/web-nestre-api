/**
 * assessment-schemas.js
 * @file Joi schemas for validating assessment data objects.
 * @description This file exports Joi validation schemas for the objects used in the Assessment API. 
 * These schemas are used to ensure the data sent to the API functions has the correct shape and type.
 * @exports {AssessmentResponsesSchema}
 */

//#region IMPORTS

import Joi from '../../vendor/joi/joi.js';
import { validQuestionIds } from './assessment-types.js';

//#endregion

//#region ASSESSMENT - ASSESSMENT RESPONSES SCHEMA

/**
 * Joi schema for validating the AssessmentResponses object.
 */
export const AssessmentResponsesSchema = Joi.object({
    responses: Joi.array().items(
        Joi.object({
            question_id: Joi.string().valid(...validQuestionIds).required(),
            score: Joi.number().required()
        })
    ).length(25).required()
}).unknown(false); // Prevents unknown keys

//#endregion
