//#region IMPORTS

import {GetNestreApiManager} from '../nestre-api-manager.js';

/**
 * @typedef {import('./user-types.js').BasicUserProfile} BasicUserProfile
 * @typedef {import('./user-types.js').UpdateUserProfile} UpdateUserProfile
 * @typedef {import('./user-types.js').FullUserProfile} FullUserProfile
 * @typedef {import('./user-types.js').DeleteConfirmationMessage } DeleteConfirmationMessage
 * @typedef {import('./user-types.js').CreateReferralAccountConfirmationMessage } CreateReferralAccountConfirmationMessage
 */

//#endregion

/**
 * Handles API Requests that access the 'user' portion of the API
 */
export class UserApi 
{

//#region PRIVATE - VARIABLES

//#endregion

//#region PUBLIC - CONSTRUCTOR

  /**
   * Constructor for the UserAPI
   */
  //----------------------------------------------//
  constructor() 
  //----------------------------------------------//
  {

  } //END Constructor Method

//#endregion

//#region PUBLIC - GET BASIC USER PROFILE BY EMAIL

 /**
   * Get basic user profile by email, 
   * does not require that they have completed their assessement
   * Typically used during authentication flow before user ID is available.
   * If the email is not in the database, it attempts to migrate the user from the legacy 8base system.
   * @param {string} email
   * @returns {Promise<BasicUserProfile>}
   */
  //-----------------------------------------------------------------------//
  GetBasicUserProfileByEmail(email) 
  //-----------------------------------------------------------------------//
  {
    return GetNestreApiManager().Request('GET', `/v2/user/get-by-email?email=${email}`);

  } //END GetBasicUserProfileByEmail Method


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
    return GetNestreApiManager().Request('GET', `/v2/user/${userId}`);

  } //END GetBasicUserProfile Method

//#endregion

//#region PUBLIC - UPDATE USER

 /**
   * Updates the user profile
   * @param {string} userId The id of the user to update
   * @param {UpdateUserProfile} userProfile updated user profile
   * @returns {Promise<BasicUserProfile>}
   */
  //-----------------------------------------------------------------------//
  UpdateUserProfile(userId, userProfile) 
  //-----------------------------------------------------------------------//
  {
    return GetNestreApiManager().Request('PATCH', `/v2/user/${userId}`, userProfile);

  } //END UpdateUserProfile Method

//#endregion

//#region PUBLIC - GET FULL USER PROFILE

  /**
   * Retrieve comprehensive user profile including assessment data and activity streaks.
   * Requires user has completed their assessement.
   * Otherwise returns a 400 error
   * @param {string} userId
   * @returns {Promise<FullUserProfile>}
   */
  //--------------------------------------------------------------//
  GetFullUserProfile(userId) 
  //--------------------------------------------------------------//
  {
   
    return GetNestreApiManager().Request('GET', `/v2/user/${userId}/profile`);
  
  } //END GetFullUserProfile Method

//#endregion

//#region PUBLIC - CREATE NEW USER ACCOUNT

  /**
   * Create a new user account using authenticated Cognito credentials
   * @returns {Promise<BasicUserProfile>} Newly created user account profile with default subscription
   */
  //--------------------------------------------------------------//
  CreateNewUserAccount() 
  //--------------------------------------------------------------//
  {
   
    return GetNestreApiManager().Request('POST', `/v2/user`);
  
  } //END CreateNewUserAccount Method

//#endregion

//#region PUBLIC - DELETE USER ACCOUNT

  /**
   * Permanently delete the authenticated user's account and all associated data
   * @returns {Promise<DeleteConfirmationMessage>} Newly created user account profile with default subscription
   */
  //--------------------------------------------------------------//
  DeleteUserAccount() 
  //--------------------------------------------------------------//
  {
   
    return GetNestreApiManager().Request('DELETE', `/v2/user`);
  
  } //END DeleteUserAccount Method

//#endregion

//#region PUBLIC - CREATE REFERRAL ACCOUNT

  /**
   * Permanently delete the authenticated user's account and all associated data
   * @param {string} userId
   * @returns {Promise<CreateReferralAccountConfirmationMessage>} Newly created user account profile with default subscription
   */
  //--------------------------------------------------------------//
  CreateReferralAccount(userId) 
  //--------------------------------------------------------------//
  {
   
    return GetNestreApiManager().Request('POST', `/v2/user/${userId}/referral-code`);
  
  } //END CreateReferralAccount Method

//#endregion

} //END UserApiService Class