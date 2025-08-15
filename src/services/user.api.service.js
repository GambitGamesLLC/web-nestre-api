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

export class UserApiService 
{
  /**
   * @private
   * @type {RequestHandler}
   */
  _request;

  /**
   * Constructor for the UserApiService.
   * Expects a RequestHandler 
   * @param {RequestHandler} requestHandler
   */
  constructor(requestHandler) 
  {
    this._request = requestHandler;
  
  }

//#region PUBLIC - GET BASIC USER PROFILE

 /**
   * Get basic user profile, 
   * does not require that they have completed their assessement
   * @param {string} userId
   * @returns {Promise<BasicUserProfile>}
   */
  //-----------------------------------------------------------------------//
  GetBasicUserProfile(userId) 
  //-----------------------------------------------------------------------//
  {

    return this._request('GET', `/v2/user/${userId}`);

  } //END GetBasicUserProfile Method

//#endregion

//#region PUBLIC - GET FULL USER PROFILE

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

//#endregion
  
//#region PUBLIC - UPDATE USER

  /**
   * Update the user
   * @param {string} userId
   * @param {UserPatch} payload
   * @returns {Promise<UserRead>}
   */
  //---------------------------------------------------------------------//
  UpdateUser(userId, payload) 
  //---------------------------------------------------------------------//
  {

    return this._request('PATCH', `/v2/user/${userId}`, payload);
  
  } //END UpdateUser Method

  //#endregion

} //END UserApiService Class