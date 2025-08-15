/**
 * @typedef {object} NestreApiClientConfig
 * @property {string} baseUrl - The base URL for the NESTRE API.
 */

//#region USER API - BASIC USER PROFILE

/**
 * @typedef {object} effective_subscription_level
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
 * @property {effective_subscription_level} effective_subscription_level
 * @property {boolean} trial_used
 * @property {boolean} frame_it_unlocked
 */

//#endregion

//#region USER API - FULL USER PROFILE

/**
 * @typedef {object} FullUserProfile
 * @property {UserRead} user
 * @property {Array<object>} streaks - Replace 'object' with a proper Streak type.
 * @property {Array<object>} assessments - Replace 'object' with a proper Assessment type.
 */

//#endregion

//#endregion

// We just need to export an empty object for this file to be treated as a module.
export {};