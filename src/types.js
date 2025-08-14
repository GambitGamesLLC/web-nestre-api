/**
 * @typedef {object} NestreApiClientConfig
 * @property {string} baseUrl - The base URL for the NESTRE API.
 */

/**
 * @typedef {object} UserRead
 * @property {string} id
 * @property {string} email
 * @property {string} first_name
 * @property {string} last_name
 */

/**
 * @typedef {object} UserPatch
 * @property {string} [first_name] - The user's first name (optional).
 * @property {string} [last_name] - The user's last name (optional).
 */

/**
 * @typedef {object} UserProfile
 * @property {UserRead} user
 * @property {Array<object>} streaks - Replace 'object' with a proper Streak type.
 * @property {Array<object>} assessments - Replace 'object' with a proper Assessment type.
 */

/**
 * @typedef {object} ReferralCode
 * @property {string} code
 * @property {string} user_id
 */

// We just need to export an empty object for this file to be treated as a module.
export {};