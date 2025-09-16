/**
 * content-recommendations-api.js
 * @file Handles API requests related to content-recommendations.
 * @description Provides a singleton class, `ContentRecommendationsApi`. 
 * This file centralizes all content-recommendations specific API logic.
 * The `ContentRecommendationsApi` class here is created automatically by the NestreApiManager class during construction
 * @exports {ContentRecommendationsApi}
 * @requires {NestreApiManager} from '../nestre-api-manager.js'
 * @requires {Joi} for schema validation
 */


//#region IMPORTS

import {NestreApiManager, HttpMethod} from '../nestre-api-manager.js';

/**
 * @typedef {import('./content-recommendations-types.js').ContentRecommendations } ContentRecommendations
*/

//#endregion

/**
 * Handles API Requests that access the 'content-recommendations' portion of the API
 */
export class ContentRecommendationsApi 
{

//#region PRIVATE - VARIABLES

//#endregion

//#region PUBLIC - CONSTRUCTOR

  /**
   * Constructor for the Api
   */
  //----------------------------------------------//
  constructor() 
  //----------------------------------------------//
  {

  } //END Constructor Method

//#endregion

//#region PUBLIC - GET ACTIVATE RECOMMENDATIONS

 /**
   * Retrieve personalized activate content recommendations for the authenticated user based on their preferences and interaction history.
   * 
   * @param {string} userId
   * @param {number} num_recommendations
   * @returns {Promise<ContentRecommendations>}
   */
  //-----------------------------------------------------------------------//
  GetActivateContentRecommendations(userId, num_recommendations) 
  //-----------------------------------------------------------------------//
  {
    // Check if the userId is a valid non-empty string.
    if (typeof userId !== 'string' || userId.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : content-recommendations-api.js GetActivateContentRecommendations() Invalid userId: The userId must be a non-empty string."));
    }

    //Check if the 'num_recommendations' is a valid number
    if (typeof num_recommendations !== 'number' || !Number.isInteger(num_recommendations) || num_recommendations <= 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : content-recommendations-api.js GetActivateContentRecommendations() Invalid num_recommendations: The num_recommendations must be a positive integer value."));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.GET, `user/${userId}/activate/recommendations?num_recommendations=${num_recommendations}`);

  } //END GetActivateContentRecommendations Method

//#endregion

//#region PUBLIC - GET GUIDED FRAMES RECOMMENDATIONS

 /**
   * Retrieve personalized guided-frames content recommendations for the authenticated user based on their preferences and interaction history.
   * 
   * @param {string} userId
   * @param {number} num_recommendations
   * @returns {Promise<ContentRecommendations>}
   */
  //-----------------------------------------------------------------------//
  GetGuidedFramesContentRecommendations(userId, num_recommendations) 
  //-----------------------------------------------------------------------//
  {
    // Check if the userId is a valid non-empty string.
    if (typeof userId !== 'string' || userId.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : content-recommendations-api.js GetGuidedFramesContentRecommendations() Invalid userId: The userId must be a non-empty string."));
    }

    //Check if the 'num_recommendations' is a valid number
    if (typeof num_recommendations !== 'number' || !Number.isInteger(num_recommendations) || num_recommendations <= 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : content-recommendations-api.js GetGuidedFramesContentRecommendations() Invalid num_recommendations: The num_recommendations must be a positive integer value."));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.GET, `user/${userId}/guided-frames/recommendations?num_recommendations=${num_recommendations}`);

  } //END GetGuidedFramesContentRecommendations Method

//#endregion

//#region PUBLIC - GET MINDSET MINUTE RECOMMENDATIONS

 /**
   * Retrieve personalized mindset-minutes content recommendations for the authenticated user based on their preferences and interaction history.
   * 
   * @param {string} userId
   * @param {number} num_recommendations
   * @returns {Promise<ContentRecommendations>}
   */
  //-----------------------------------------------------------------------//
  GetMindsetMinutesContentRecommendations(userId, num_recommendations) 
  //-----------------------------------------------------------------------//
  {
    // Check if the userId is a valid non-empty string.
    if (typeof userId !== 'string' || userId.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : content-recommendations-api.js GetMindsetMinutesContentRecommendations() Invalid userId: The userId must be a non-empty string."));
    }

    //Check if the 'num_recommendations' is a valid number
    if (typeof num_recommendations !== 'number' || !Number.isInteger(num_recommendations) || num_recommendations <= 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : content-recommendations-api.js GetMindsetMinutesContentRecommendations() Invalid num_recommendations: The num_recommendations must be a positive integer value."));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.GET, `user/${userId}/mindset-minutes/recommendations?num_recommendations=${num_recommendations}`);

  } //END GetMindsetMinutesContentRecommendations Method

//#endregion

//#region PUBLIC - GET MUSIC RECOMMENDATIONS

 /**
   * Retrieve personalized music content recommendations for the authenticated user based on their preferences and interaction history.
   * 
   * @param {string} userId
   * @param {number} num_recommendations
   * @returns {Promise<ContentRecommendations>}
   */
  //-----------------------------------------------------------------------//
  GetMindsetMusicContentRecommendations(userId, num_recommendations) 
  //-----------------------------------------------------------------------//
  {
    // Check if the userId is a valid non-empty string.
    if (typeof userId !== 'string' || userId.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : content-recommendations-api.js GetMindsetMusicContentRecommendations() Invalid userId: The userId must be a non-empty string."));
    }

    //Check if the 'num_recommendations' is a valid number
    if (typeof num_recommendations !== 'number' || !Number.isInteger(num_recommendations) || num_recommendations <= 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : content-recommendations-api.js GetMindsetMusicContentRecommendations() Invalid num_recommendations: The num_recommendations must be a positive integer value."));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.GET, `user/${userId}/music/recommendations?num_recommendations=${num_recommendations}`);

  } //END GetMindsetMusicContentRecommendations Method

//#endregion


} //END ContentRecommendationsApi Class
