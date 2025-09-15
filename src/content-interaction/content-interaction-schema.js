/**
 * content-interaction-schemas.js
 * @file Joi schemas for validating content-interaction data objects.
 * @description This file exports Joi validation schemas for the objects used in the Content Interaction API. 
 * These schemas are used to ensure the data sent to the API functions has the correct shape and type.
 * @exports {ActivateInteractionSchema}
 */

//#region IMPORTS

import Joi from '../../vendor/joi/joi.js';

//#endregion


//#region CONTENT INTERACTION - CONTENT INTERACTION SCHEMA

/**
 * Joi schema for validating the ContentInteraction object.
 */
export const ContentInteractionSchema = Joi.object({
    user_id: Joi.string().required(),
    interaction_duration: Joi.number().required(),
    interaction_record: Joi.array().items(Joi.number()).required(),
    last_position: Joi.number().required(),
    context: Joi.string().required(),
    cms_version: Joi.number().required(),
    user_subscription_level_id: Joi.number().integer().required(),
    content_id: Joi.string().required()
}).unknown(false); // Prevents unknown keys

//#endregion
