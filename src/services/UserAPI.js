//#region IMPORTS

/**
 * @typedef {import('../types.js').BasicUserProfile} BasicUserProfile
 * @typedef {import('../types.js').FullUserProfile} FullUserProfile
 */

//#endregion

//#region TYPE DEFINITION - REQUEST HANDLER

/**
 * A function that handles API requests.
 * @callback RequestHandler
 * @template T
 * @param {string} method
 * @param {string} endpoint
 * @param {object} [body]
 * @returns {Promise<T>}
 */

//#endregion

/**
 * Handles API Requests that access the 'user' portion of the API
 */
export class UserAPI 
{

//#region PRIVATE - VARIABLES

  /**
   * Stores the request handler
   * @private
   * @type {RequestHandler}
   */
  _request;

//#endregion

//#region PUBLIC - CONSTRUCTOR

  /**
   * Constructor for the UserApiService.
   * Expects a RequestHandler 
   * @param {RequestHandler} requestHandler
   */
  //----------------------------------------------//
  constructor(requestHandler) 
  //----------------------------------------------//
  {
    this._request = requestHandler;
  
  } //END Constructor Method

//#endregion

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
  //--------------------------------------------------------------//
  GetFullUserProfile(userId) 
  //--------------------------------------------------------------//
  {
   
    return this._request('GET', `/v2/user/${userId}/profile`);
  
  } //END GetFullUserProfile Method

//#endregion

} //END UserApiService Class