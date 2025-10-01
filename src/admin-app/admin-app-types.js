/**
 * admin-app-types.js
 * @file Type definitions for the Nestre Admin-App API data objects.
 * @description This file provides JSDoc `@typedefs` for all data structures used by the Nestre API. 
 * These types are crucial for static analysis, autocompletion in IDEs, 
 * and ensuring consistent data handling throughout the codebase.
 * @exports {object}
 */


//#region ADMIN APP API - USERS MATCHING SEARCH

/**
 * @typedef {object} MatchingUser
 * @property {string} id
 * @property {string} created_at
 * @property {string} email
 * @property {string} firstname
 * @property {string} lastname
 * @property {string} gender
 * @property {string} date_of_birth
 * @property {string} username
 * @property {string} subscription_level
 * @property {string} subscription_type
 * @property {boolean} trial_used
 * @property {boolean} frame_it_unlocked
 * @property {string} last_activity
 */

/**
 * A list of users that match the search criteria.
 * @typedef {MatchingUser[]} UsersMatchingSearch
 */

//#endregion

//#region ADMIN APP API - USER DATA

/**
 * @typedef {object} ReferralCode
 * @property {string} code
 * @property {boolean} is_active
 * @property {string} created_at
 */

/**
 * @typedef {object} UserData
 * @property {string} id
 * @property {string} created_at
 * @property {string} email
 * @property {string} firstname
 * @property {string} lastname
 * @property {string} gender
 * @property {string} date_of_birth
 * @property {string} username
 * @property {string} subscription_level
 * @property {string} subscription_type
 * @property {boolean} trial_used
 * @property {boolean} frame_it_unlocked
 * @property {string} last_activity
 * @property {ReferralCode[]} referral_codes
 */

//#endregion

//#region ADMIN APP API - CREATE ORGANIZATION DATA

/**
 * @typedef {object} CreateOrganizationData
 * @property {string} name
 * @property {number} num_basic_subscriptions
 * @property {string} subscriptions_expiry
 **/

/**
 * @typedef {object} NewlyCreatedOrganizationData
 * @property {string} name
 * @property {number} num_basic_subscriptions
 * @property {string} subscriptions_expiry
 * @property {string} id
 **/

//#endregion

//#region ADMIN APP API - UPDATE ORGANIZATION DATA

/**
 * @typedef {object} UpdateOrganizationData
 * @property {string} name
 * @property {number} num_basic_subscriptions
 * @property {string} subscriptions_expiry
 */

/**
 * @typedef {object} UpdatedOrganization
 * @property {string} name
 * @property {number} num_basic_subscriptions
 * @property {string} subscriptions_expiry
 * @property {string} id
 **/

//#endregion

//#region ADMIN APP API - GET ORGANIZATION DATA

/**
 * @typedef {object} TeamCode
 * @property {string} code
 * @property {boolean} is_active
 */

/**
 * @typedef {object} RetrievedOrganizationData
 * @property {string} name
 * @property {number} num_basic_subscriptions
 * @property {string} subscriptions_expiry
 * @property {string} id
 * @property {TeamCode[]} team_codes
 * @property {ReferralCode[]} referral_codes
 */

//#endregion

//#region ADMIN APP API - CREATE REFERRAL CODE

/**
 * @typedef {object} CreateReferralCode
 * @property {string} code
 * @property {boolean} is_active
 */

//#endregion

//#region ADMIN APP API - CREATE ORGANIZATION MEMBERS

/**
 * @typedef {object} OrganizationMember
 * @property {string} email
 * @property {string} member_type
 * @property {string[]} tags
 * @property {number} subscription_level_id
 */

/**
 * @typedef {object} OrganizationMembers
 * @property {OrganizationMember[]} members
 */

//#endregion

//#region ADMIN APP API - DELETE ORGANIZATION MEMBERS

/**
 * @typedef {string[]} MemberIds
 */

//#endregion

// We just need to export an empty object for this file to be treated as a module.
export {};