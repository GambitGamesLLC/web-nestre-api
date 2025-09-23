/**
 * organization-types.js
 * @file Type definitions for the Nestre Organization API data objects.
 * @description This file provides JSDoc `@typedefs` for all data structures used by the Nestre API. 
 * These types are crucial for static analysis, autocompletion in IDEs, 
 * and ensuring consistent data handling throughout the codebase.
 * @exports {object}
 */

//#region ORGANIZATION API - ORGANIZATIONS

/**
 * @typedef {object} Organization
 * @property {string} id
 * @property {string} name
 * @property {string[]} tags
 */

/**
 * List of organizations
 * @typedef {Organization[]} Organizations
 */

//#endregion

//#region ORGANIZATION API - ORGANIZATION MEMBERS

/**
 * @typedef {object} OrganizationMember
 * @property {string} email
 * @property {string} member_type
 * @property {string[]} tags
 * @property {string} id
 * @property {string} subscription_level
 */

/**
 * List of organization members matching the criteria
 * @typedef {OrganizationMember[]} OrganizationMembers
 */

//#endregion

//#region ORGANIZATION API - ORGANIZATION USER DETAILS

/**
 * @typedef {object} UserDetails
 * @property {string} id
 * @property {string} email
 * @property {string} firstname
 * @property {string} lastname
 * @property {string} date_of_birth
 */

/**
 * List of user details for organization members who are registered users
 * @typedef {UserDetails[]} OrganizationUserDetails
 */

//#endregion

//#region ORGANIZATION API - ORGANIZATION DATA

/**
 * @typedef {object} OrganizationData
 * @property {string} name
 * @property {number} num_basic_subscriptions
 * @property {string} subscriptions_expiry
 * @property {string} id
 */

//#endregion

// We just need to export an empty object for this file to be treated as a module.
export {};