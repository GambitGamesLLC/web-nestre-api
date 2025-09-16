/**
 * frame-it-schema.js
 * @file Joi schemas for validating frame-it data objects.
 * @description This file exports Joi validation schemas for the objects used in the Frame It API. 
 * These schemas are used to ensure the data sent to the API functions has the correct shape and type.
 * @exports {FrameItPhrasesSchema}
 */

//#region IMPORTS

import Joi from '../../vendor/joi/joi.js';

//#endregion

//#region FRAME IT API - FRAME IT PHRASES

/**
 * Joi schema for validating the FrameItPhrases object.
 */
export const FrameItPhrasesSchema = Joi.array().items(Joi.string().required()).min(1);

//#endregion