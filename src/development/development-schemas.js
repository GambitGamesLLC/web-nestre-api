/**
 * development-schemas.js
 * @file Joi schemas for validating development data objects.
 * @description This file exports Joi validation schemas for the objects used in the Development API. 
 * These schemas are used to ensure the data sent to the API functions has the correct shape and type.
 * @exports {AuthenticationRequestSchema}
 */

//#region IMPORTS

import Joi from '../../vendor/joi/joi.js';

//#endregion

//#region DEVELOPMENT API - AUTHENTICATION REQUEST SCHEMA

/**
 * Joi schema for validating the AuthenticationRequest object.
 */
export const AuthenticationRequestSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});

//#endregion