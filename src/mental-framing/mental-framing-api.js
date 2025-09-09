/**
 * mental-framing-api.js
 * @file Handles API requests related to mental framing content.
 * @description Provides a singleton class, `MentalFramingApi`. 
 * This file centralizes all mental-framing specific API logic.
 * The `MentalFramingApi` class here is created automatically by the NestreApiManager class during construction
 * @exports {MentalFramingApi}
 * @requires {NestreApiManager} from '../nestre-api-manager.js'
 * @requires {Joi} for schema validation
 */


//#region IMPORTS

import {NestreApiManager, HttpMethod} from '../nestre-api-manager.js';

/**
 * @typedef {import('./mental-framing-types.js').MentalFramingContentIds} MentalFramingContentIds
*/

//#endregion


/**
 * Handles API Requests that access the 'mental-framing' portion of the API
 */
export class MentalFramingApi 
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

//#region PUBLIC - GET MENTAL FRAMING CONTENT IDS

 /**
   * Retrieve mental framing content ids for the userId
   * 
   * @param {string} userId
   * @returns {Promise<MentalFramingContentIds>}
   */
  //-----------------------------------------------------------------------//
  GetMentalFramingContentIds(userId) 
  //-----------------------------------------------------------------------//
  {
    // Check if the userId is a valid non-empty string.
    if (typeof userId !== 'string' || userId.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : mental-framing-api.js GetMentalFramingContentIds() Invalid userId: The userId must be a non-empty string."));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.GET, `user/${userId}/mental-framing`);

  } //END GetMentalFramingContentIds Method

//#endregion

} //END MentalFramingApi Class
