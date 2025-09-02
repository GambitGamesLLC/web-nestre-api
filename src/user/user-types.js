/**
 * user-types.js
 * @file Type definitions for the Nestre User API data objects.
 * @description This file provides JSDoc `@typedefs` for all data structures used by the Nestre User API. 
 * These types are crucial for static analysis, autocompletion in IDEs, 
 * and ensuring consistent data handling throughout the codebase.
 * @exports {object}
 */

//#region USER API - BASIC USER PROFILE

/**
 * @typedef {object} EffectiveSubscriptionLevel
 * @property {number} id
 * @property {string} name
 * @property {number} value
 */

/**
 * @typedef {object} BasicUserProfile
 * @property {string} id
 * @property {string} email
 * @property {string} firstname
 * @property {string} lastname
 * @property {string} username
 * @property {EffectiveSubscriptionLevel} effective_subscription_level
 * @property {boolean} trial_used
 * @property {boolean} frame_it_unlocked
 */

//#endregion

//#region USER API - UPDATE USER PROFILE

/**
 * @typedef {object} UpdateUserProfile
 * @property {string} firstname
 * @property {string} lastname
 * @property {string} username
 * @property {string} email
 * @property {string} profile_photo_s3_key
 * @property {number} subscription_level_id
 * @property {number} referred_by_code
 * @property {boolean} trial_used
 * @property {string} date_of_birth
 * @property {number} gender_id
 * @property {number} education_level_id
 * @property {number} marital_status_id
 * @property {string} organization
 * @property {boolean} frame_it_unlocked
 * @property {string} app_version
 * @property {string} os_version
 */

//#endregion

//#region USER API - FULL USER PROFILE

/**
 * @typedef {object} Assessment
 * @property {string} id
 * @property {number} alpha
 * @property {number} cerebral
 * @property {number} prime
 * @property {string} created_at
 */

/**
 * @typedef {object} Streaks
 * @property {number} current_streak
 * @property {number} max_streak
 */

/**
 * @typedef {object} FullUserProfile
 * @property {string} id
 * @property {string} email
 * @property {string} firstname
 * @property {string} lastname
 * @property {string} username
 * @property {EffectiveSubscriptionLevel} effective_subscription_level
 * @property {boolean} trial_used
 * @property {boolean} frame_it_unlocked
 * @property {Assessment} assessment
 * @property {Streaks} streaks
 */

//#endregion

//#region USER API - DELETE USER PROFILE

/**
 * @typedef {object} DeleteConfirmationMessage
 * @property {string} message
 */

//#endregion

//#region USER API - CREATE REFERRAL CODE

/**
 * @typedef {object} CreateReferralCode
 * @property {string} code
 * @property {boolean} is_active
 */

//#endregion

//#region USER API - CREATE REFERRAL CODE CONFIRMATION MESSAGE

/**
 * @typedef {object} CreateReferralCodeConfirmationMessage
 * @property {string} message
 */

//#endregion

// We just need to export an empty object for this file to be treated as a module.
export {};