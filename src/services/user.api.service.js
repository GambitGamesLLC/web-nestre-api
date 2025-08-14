/**
 * @typedef {import('../types.js').UserRead} UserRead
 * @typedef {import('../types.js').UserPatch} UserPatch
 * @typedef {import('../types.js').UserProfile} UserProfile
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
   * Get user profile
   * @param {string} userId
   * @returns {Promise<UserProfile>}
   */
  getUserProfile(userId) {
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