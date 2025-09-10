/**
 * content-interaction-api.js
 * @file Handles API requests related to content-interactions.
 * @description Provides a singleton class, `ContentInteractionApi`. 
 * This file centralizes all content-interaction specific API logic.
 * The `ContentInteractionApi` class here is created automatically by the NestreApiManager class during construction
 * @exports {ContentInteractionApi}
 * @requires {NestreApiManager} from '../nestre-api-manager.js'
 * @requires {Joi} for schema validation
 */

//#region IMPORTS

import {NestreApiManager, HttpMethod} from '../nestre-api-manager.js';
import { ActivateInteractionSchema } from './content-interaction-schemas.js';

/**
 * @typedef {import('./content-interaction-types.js').ActivateInteraction } ActivateInteraction
 * @typedef {import('./content-interaction-types.js').ActivateInteractionSuccessMessage } ActivateInteractionSuccessMessage
*/

//#endregion

/**
 * Handles API Requests that access the 'content-interaction' portion of the API
 */
export class ContentInteractionApi 
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

//#region PUBLIC - CREATE ACTIVATE INTERACTION

 /**
   * Record a user's interaction with activate content.
   * 
   * @param {string} userId
   * @param {ActivateInteraction} activateInteraction
   * @returns {Promise<ActivateInteractionSuccessMessage>}
   */
  //-----------------------------------------------------------------------//
  CreateActivateContentInteraction(userId, activateInteraction) 
  //-----------------------------------------------------------------------//
  {
    // Check if the userId is a valid non-empty string.
    if (typeof userId !== 'string' || userId.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : content-interaction-api.js CreateActivateContentInteraction() Invalid userId: The userId must be a non-empty string."));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.POST, `user/${userId}/assessment/activate-interaction`);

  } //END CreateActivateContentInteraction Method

//#endregion

} //END ContentInteractionApi Class