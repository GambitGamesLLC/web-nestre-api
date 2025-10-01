/**
 * admin-app-schemas.js
 * @file Joi schemas for validating admin-app data objects.
 * @description This file exports Joi validation schemas for the objects used in the Admin App API.
 * These schemas are used to ensure the data sent to the API functions has the correct shape and type.
 * @exports {CreateOrganizationDataSchema}
 */
/* eslint-disable no-dupe-keys */

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

//#region ADMIN APP API - CREATE ORGANIZATION MEMBERS

/**
 * Joi schema for validating the OrganizationMembers object.
 */
export const OrganizationMembersSchema = Joi.object({
    members: Joi.array().items(Joi.object({
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        member_type: Joi.string().required(),
        tags: Joi.array().items(Joi.string()).required(),
        subscription_level_id: Joi.number().integer().min(1).required()
    })).min(1).required()
}).unknown(false); // Prevents unknown keys


//#endregion

//#region ADMIN APP API - UPDATE ORGANIZATION DATA

/**
 * Joi schema for validating the UpdateOrganizationData object.
 */
export const UpdateOrganizationDataSchema = Joi.object({
    name: Joi.string().required(),
    num_basic_subscriptions: Joi.number().integer().min(0).required(),
    subscriptions_expiry: Joi.string().isoDate().required()
}).unknown(false); // Prevents unknown keys

//#endregion

//#region ADMIN APP API - TEAM CODE

/**
 * Joi schema for validating the UpdateOrganizationData object.
 */
export const TeamCodeSchema = Joi.object({
    code: Joi.string().required(),
    is_active: Joi.boolean().required()
}).unknown(false); // Prevents unknown keys

//#endregion

//#region ADMIN APP API - CREATE REFERRAL

/**
 * Joi schema for validating the CreateReferralCode object.
 */
export const CreateReferralCodeSchema = Joi.object({
    code: Joi.string().required(),
    is_active: Joi.boolean().required()
}).unknown(false); // Prevents unknown keys

//#endregion

//#region ADMIN APP API - DELETE ORGANIZATION MEMBERS

/**
 * Joi schema for validating the MemberIds object, which is an array of member ID strings.
 */
export const MemberIdsSchema = Joi.array().items(Joi.string().required()).min(1);

//#endregion