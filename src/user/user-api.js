//#region IMPORTS

import { NestreApiManager } from '../nestre-api-manager.js';

/**
 * @typedef {import('./user-types.js').basic-user-profile} BasicUserProfile
 * @typedef {import('./user-types.js').full-user-profile} FullUserProfile
 */

//#endregion

/**
 * Handles API Requests that access the 'user' portion of the API
 */
export class UserApi 
{

//#region PRIVATE - VARIABLES

  /**
   * Reference to the Nestre API Manager
   * @type{NestreApiManager} nestreAPIManager
   */
  nestreApiManager;

//#endregion

//#region PUBLIC - CONSTRUCTOR

  /**
   * Constructor for the UserAPI
   * Requires a reference to the NestreAPIManager
   * @param {NestreApiManager} nestreApiManager
   */
  //----------------------------------------------//
  constructor(nestreApiManager) 
  //----------------------------------------------//
  {
    this.nestreApiManager = nestreApiManager;

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

    return this.nestreApiManager.Request('GET', `/v2/user/${userId}`);

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
   
    return this.nestreApiManager.Request('GET', `/v2/user/${userId}/profile`);
  
  } //END GetFullUserProfile Method

//#endregion

} //END UserApiService Class