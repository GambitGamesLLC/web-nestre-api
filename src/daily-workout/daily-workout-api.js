/**
 * daily-workout-api.js
 * @file Handles API requests related to daily workouts and recommendations.
 * @description Provides a singleton class, `DailyWorkoutApi`, for making HTTP requests to the '/v#/user/{user_id}/daily-workout' API endpoint. This file
 * centralizes all daily-workout-specific API logic.
 * The `DailyWorkoutApi` class here is created automatically by the NestreApiManager class during construction
 * @exports {DailyWorkoutApi}
 * @requires {NestreApiManager} from '../nestre-api-manager.js'
 * @requires {Joi} for schema validation
 */

//#region IMPORTS

import {NestreApiManager, HttpMethod} from '../nestre-api-manager.js';

/**
 * @typedef {import('./daily-workout-types.js').DailyWorkoutRecommendation} DailyWorkoutRecommendation
 */

//#endregion

/**
 * Handles API Requests that access the 'daily-workout' portion of the API
 */
export class DailyWorkoutApi 
{

//#region PRIVATE - VARIABLES

//#endregion

//#region PUBLIC - CONSTRUCTOR

  /**
   * Constructor for the DailyWorkoutApi
   */
  //----------------------------------------------//
  constructor() 
  //----------------------------------------------//
  {

  } //END Constructor Method

//#endregion

//#region PUBLIC - GET DAILY WORKOUT RECOMMENDATION

 /**
   * Retrieve personalized daily workout recommendations.
   * 
   * @param {string} userId
   * @returns {Promise<DailyWorkoutRecommendation>}
   */
  //-----------------------------------------------------------------------//
  GetDailyWorkoutRecommendation(userId) 
  //-----------------------------------------------------------------------//
  {
    // Check if the userId is a valid non-empty string.
    if (typeof userId !== 'string' || userId.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : daily-workout-api.js GetDailyWorkoutRecommendation() Invalid userId: The userId must be a non-empty string."));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.GET, `user/${userId}/daily-workout`);

  } //END GetDailyWorkoutRecommendation Method

//#endregion

} //END DailyWorkoutApi Class