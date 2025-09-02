/**
 * @file Handles API requests related to user profiles, authentication, and referrals.
 * @description Provides a singleton class, `UserApi`, for making HTTP requests to the '/v2/user' API endpoint. This file
 * centralizes all user-specific API logic and includes methods for profile management.
 * The `UserApi` class here is created automatically by the NestreApiManager class during construction
 * @exports {UserApi}
 * @requires {NestreApiManager} from '../nestre-api-manager.js'
 * @requires {Joi} for schema validation
 */

//#region IMPORTS

import {NestreApiManager, HttpMethod} from '../nestre-api-manager.js';

/**
 * @typedef {import('./user-types.js').BasicUserProfile} BasicUserProfile
 * @typedef {import('./user-types.js').UpdateUserProfile} UpdateUserProfile
 * @typedef {import('./user-types.js').FullUserProfile} FullUserProfile
 * @typedef {import('./user-types.js').DeleteConfirmationMessage } DeleteConfirmationMessage
 * @typedef {import('./user-types.js').CreateReferralCode } CreateReferralCode
 * @typedef {import('./user-types.js').CreateReferralCodeConfirmationMessage } CreateReferralCodeConfirmationMessage
 */

//Joi Schema Validators
import { UpdateUserProfileSchema } from './user-schemas.js';
import { CreateReferralCodeSchema } from './user-schemas.js';

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
    // Check if the email is a valid non-empty string.
    if (typeof email !== 'string' || email.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : user-api.js GetBasicUserProfileByEmail() Invalid email: The email must be a non-empty string."));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.GET, `/v2/user/get-by-email?email=${email}`);

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
    // Check if the userId is a valid non-empty string.
    if (typeof userId !== 'string' || userId.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : user-api.js GetBasicUserProfile() Invalid userId: The userId must be a non-empty string."));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.GET, `/v2/user/${userId}`);

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
    // Check if the userId is a valid non-empty string.
    if (typeof userId !== 'string' || userId.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : user-api.js GetBasicUserProfile() Invalid userId: The userId must be a non-empty string."));
    }

    // Validate the UpdateUserProfile object against the imported Joi schema
    const { error } = UpdateUserProfileSchema.validate(userProfile);

    if (error) {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error(`web-nestre-api : user-api.js GetBasicUserProfile() Validation failed for userProfile: ${error.details[0].message}`));
    }

    return NestreApiManager.GetInstance().Request(HttpMethod.PATCH, `/v2/user/${userId}`, userProfile);

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
    // Check if the userId is a valid non-empty string.
    if (typeof userId !== 'string' || userId.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : user-api.js GetFullUserProfile() Invalid userId: The userId must be a non-empty string."));
    }

    return NestreApiManager.GetInstance().Request(HttpMethod.GET, `/v2/user/${userId}/profile`);
  
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
   
    return NestreApiManager.GetInstance().Request(HttpMethod.POST, `/v2/user`);
  
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
   
    return NestreApiManager.GetInstance().Request(HttpMethod.DELETE, `/v2/user`);
  
  } //END DeleteUserAccount Method

//#endregion

//#region PUBLIC - CREATE REFERRAL CODE

  /**
   * Create a referral code for the authenticated user to refer others to the application
   * @param {string} userId
   * @param {CreateReferralCode} createReferralCode 
   * @returns {Promise<CreateReferralCodeConfirmationMessage>} 
   */
  //--------------------------------------------------------------//
  CreateReferralCode(userId, createReferralCode) 
  //--------------------------------------------------------------//
  {
   
    // Check if the userId is a valid non-empty string.
    if (typeof userId !== 'string' || userId.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : user-api.js CreateReferralCode() Invalid userId: The userId must be a non-empty string."));
    }

    // Validate the CreateReferralCode object against the imported Joi schema
    const { error } = CreateReferralCodeSchema.validate(createReferralCode);

    if (error) {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error(`web-nestre-api : user-api.js CreateReferralCode() Validation failed for createReferralCode: ${error.details[0].message}`));
    }

    return NestreApiManager.GetInstance().Request(HttpMethod.POST, `/v2/user/${userId}/referral-code`, createReferralCode);
  
  } //END CreateReferralCode Method

//#endregion

} //END UserApiService Class