/**
 * utility-schema.js
 * @file Joi schemas for validating utility data objects.
 * @description This file exports Joi validation schemas for the objects used in the Utility API. 
 * These schemas are used to ensure the data sent to the API functions has the correct shape and type.
 * @exports {UrlSchema, ErrorLogSchema}
 */

//#region IMPORTS

import Joi from '../../vendor/joi/joi.js';

//#endregion

//#region UTILITY API - URL

/**
 * Joi schema for validating the Url object.
 */
export const UrlSchema = Joi.string().uri().required();

//#endregion

//#region UTILITY API - ERROR LOG

/**
 * Joi schema for validating the ErrorLog object.
 */
export const ErrorLogSchema = Joi.object({
    message: Joi.string().required(),
    log_level: Joi.string().required()
}).unknown(false); // Prevents unknown keys

//#endregion