//#region IMPORTS

import Joi from 'joi';

//#endregion

//#region USER API - UPDATE USER PROFILE

/**
 * Joi schema for validating the UpdateUserProfile object.
 */
export const UpdateUserProfileSchema = Joi.object({
    firstname: Joi.string().allow(null, ''),
    lastname: Joi.string().allow(null, ''),
    username: Joi.string().allow(null, ''),
    email: Joi.string().email().allow(null, ''),
    profile_photo_s3_key: Joi.string().allow(null, ''),
    subscription_level_id: Joi.number().integer(),
    referred_by_code: Joi.number().integer().allow(null),
    trial_used: Joi.boolean(),
    date_of_birth: Joi.string().allow(null, ''),
    gender_id: Joi.number().integer().allow(null),
    education_level_id: Joi.number().integer().allow(null),
    marital_status_id: Joi.number().integer().allow(null),
    organization: Joi.string().allow(null, ''),
    frame_it_unlocked: Joi.boolean(),
    app_version: Joi.string().allow(null, ''),
    os_version: Joi.string().allow(null, '')
}).unknown(false); // Prevents unknown keys

//#endregion