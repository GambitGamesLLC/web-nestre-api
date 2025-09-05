/**
 * cognitive-exercises-api.js
 * @file Handles API requests related to cognitive exercises and recommendations.
 * @description Provides a singleton class, `CognitiveExercisesApi`. 
 * This file centralizes all cognitive-exercises specific API logic.
 * The `CognitiveExerciesApi` class here is created automatically by the NestreApiManager class during construction
 * @exports {CognitiveExerciesApi}
 * @requires {NestreApiManager} from '../nestre-api-manager.js'
 * @requires {Joi} for schema validation
 */

//#region IMPORTS

import {NestreApiManager, HttpMethod} from '../nestre-api-manager.js';

/**
 * @typedef {import('./cognitive-exercises-types.js').CognitiveExercisesRecommendation} CognitiveExercisesRecommendation
 */

//#endregion

/**
 * Handles API Requests that access the 'cognitive-exercises' portion of the API
 */
export class CognitiveExercisesApi 
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

//#region PUBLIC - GET COGNITIVE EXERCISES RECOMMENDATION

 /**
   * Retrieve personalized cognitive exercise recommendations based on user's mindset profile and training goals
   * 
   * @param {string} userId
   * @returns {Promise<CognitiveExercisesRecommendation>}
   */
  //-----------------------------------------------------------------------//
  GetCognitiveExercisesRecommendation(userId) 
  //-----------------------------------------------------------------------//
  {
    // Check if the userId is a valid non-empty string.
    if (typeof userId !== 'string' || userId.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : cognitive-exercises-api.js GetCognitiveExercisesRecommendation() Invalid userId: The userId must be a non-empty string."));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.GET, `user/${userId}/cogex`);

  } //END GetCognitiveExercisesRecommendation Method

//#endregion

} //END CognitiveExercisesApi Class