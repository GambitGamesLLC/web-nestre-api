/**
 * user-search-api.js
 * @file Handles API requests related to searching using the user profile.
 * @description Provides a singleton class, `UserSearchApi`, for making HTTP requests to the '/v#/search' API endpoint. This file
 * centralizes all user-search-specific API logic.
 * The `UserSearchApi` class here is created automatically by the NestreApiManager class during construction
 * @exports {UserSearchApi}
 * @requires {NestreApiManager} from '../nestre-api-manager.js'
 * @requires {Joi} for schema validation
 */

//#region IMPORTS

import {NestreApiManager, HttpMethod} from '../nestre-api-manager.js';

/**
 * @typedef {import('./user-search-types.js').UserProfileData} UserProfileData
 */

/**
 * Handles API Requests that access the 'user-search' portion of the API
 */
export class UserSearchApi 
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

//#region PUBLIC - GET USER PROFILE FROM ASSESSMENT

 /**
   * Retrieve a user profile using an assessment ID.
   * @param {string} assessment_id 
   * @returns {Promise<UserProfileData>}
   */
  //-----------------------------------------------------------------------//
  GetUserProfileFromAssessment(assessment_id) 
  //-----------------------------------------------------------------------//
  {
    // Check if the email is a valid non-empty string.
    if (typeof assessment_id !== 'string' || assessment_id.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : user-search-api.js GetUserProfileFromAssessment() Invalid assessment_id: The assessment_id must be a non-empty string."));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.GET, `search/profile-for-assessment?assessment_id=${assessment_id}`);

  } //END GetUserProfileFromAssessment Method


//#endregion

} //END UserSearchApi Class

//#endregion
