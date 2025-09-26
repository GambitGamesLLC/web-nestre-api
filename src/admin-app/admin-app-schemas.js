/**
 * admin-app-schemas.js
 * @file Joi schemas for validating admin-app data objects.
 * @description This file exports Joi validation schemas for the objects used in the Admin App API.
 * These schemas are used to ensure the data sent to the API functions has the correct shape and type.
 * @exports {CreateOrganizationDataSchema}
 */

//#region IMPORTS

import Joi from '../../vendor/joi/joi.js';

//#endregion

//#region ADMIN APP API - CREATE ORGANIZATION DATA

/**
 * Joi schema for validating the CreateOrganizationData object.
 */
export const CreateOrganizationDataSchema = Joi.object({
    name: Joi.string().required(),
    num_basic_subscriptions: Joi.number().integer().min(0).required(),
    subscriptions_expiry: Joi.string().isoDate().required()
}).unknown(false); // Prevents unknown keys

//#endregion