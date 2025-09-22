/**
 * assessment-search-schemas.js
 * @file Joi schemas for validating assessment search data objects.
 * @description This file exports Joi validation schemas for the objects used in the Assessment API. 
 * These schemas are used to ensure the data sent to the API functions has the correct shape and type.
 * @exports {UserIdsSchema, AssessmentIdsSchema, UserSearchSchema}
 */

//#region IMPORTS

import Joi from '../../vendor/joi/joi.js';

//#endregion

//#region ASSESSMENT SEARCH - USER IDS SCHEMA

/**
 * Joi schema for validating the UserIds object, which is an array of user ID strings.
 */
export const UserIdsSchema = Joi.array().items(Joi.string().required()).min(1);

//#endregion

//#region ASSESSMENT SEARCH - ASSESSMENT IDS SCHEMA

/**
 * Joi schema for validating the AssessmentIds object, which is an array of assessment ID strings.
 */
export const AssessmentIdsSchema = Joi.array().items(Joi.string().required()).min(1);

//#endregion

//#region ASSESSMENT SEARCH - USER SEARCH SCHEMA

/**
 * Joi schema for validating parameters for user assessment search.
 * At least one search parameter must be provided.
 */
export const UserSearchSchema = Joi.object({
    firstname: Joi.string().allow(null, '').empty(['', null]),
    lastname: Joi.string().allow(null, '').empty(['', null]),
    email: Joi.string().email().allow(null, '').empty(['', null]),
    date_of_birth: Joi.date().iso().allow(null, '').empty(['', null]),
    account_created_date_from: Joi.date().iso().allow(null, '').empty(['', null]),
    account_created_date_to: Joi.date().iso().allow(null, '').empty(['', null])
}).or('firstname', 'lastname', 'email', 'date_of_birth', 'account_created_date_from', 'account_created_date_to')
  .messages({
    'object.missing': 'At least one search parameter (firstname, lastname, email, date_of_birth, account_created_date_from, or account_created_date_to) must be provided.'
  });

//#endregion
