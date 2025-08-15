/**
 * @typedef {import('../types.js').UserRead} UserRead
 * @typedef {import('../types.js').UserPatch} UserPatch
 * @typedef {import('../types.js').BasicUserProfile} BasicUserProfile
 * @typedef {import('../types.js').ReferralCode} ReferralCode
 */

/**
 * A function that handles API requests.
 * @callback RequestHandler
 * @template T
 * @param {string} method
 * @param {string} endpoint
 * @param {object} [body]
 * @returns {Promise<T>}
 */

export class UserApiService {
  /**
   * @private
   * @type {RequestHandler}
   */
  _request;

  /**
   * @param {RequestHandler} requestHandler
   */
  constructor(requestHandler) {
    this._request = requestHandler;
  }

  /**
   * Get user by email address
   * @param {string} email
   * @returns {Promise<UserRead>}
   */
  getUserByEmail(email) {
    const encodedEmail = encodeURIComponent(email);
    return this._request('GET', `/v2/user/get-by-email?email=${encodedEmail}`);
  }

 /**
   * Get basic user profile, 
   * does not require that they have completed their assessement
   * @param {string} userId
   * @returns {Promise<BasicUserProfile>}
   */
  getBasicUserProfile(userId) {
    return this._request('GET', `/v2/user/${userId}`);
  }

  /**
   * Get the full user profile, 
   * requires they have completed their assessement
   * Otherwise returns a 400 error
   * @param {string} userId
   * @returns {Promise<FullUserProfile>}
   */
  getFullUserProfile(userId) {
    return this._request('GET', `/v2/user/${userId}/profile`);
  }
  
  /**
   * Update the user
   * @param {string} userId
   * @param {UserPatch} payload
   * @returns {Promise<UserRead>}
   */
  updateUser(userId, payload) {
    return this._request('PATCH', `/v2/user/${userId}`, payload);
  }
}