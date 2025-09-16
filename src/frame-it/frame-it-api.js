/**
 * frame-it-api.js
 * @file Handles API requests related to frame-it.
 * @description Provides a singleton class, `FrameItApi`. 
 * This file centralizes all frame-it specific API logic.
 * The `FrameItApi` class here is created automatically by the NestreApiManager class during construction
 * @exports {FrameItApi}
 * @requires {NestreApiManager} from '../nestre-api-manager.js'
 * @requires {Joi} for schema validation
 */


//#region IMPORTS

import {NestreApiManager, HttpMethod} from '../nestre-api-manager.js';
import { FrameItPhrasesSchema } from './frame-it-schema.js';

/**
 * @typedef {import('./frame-it-types.js').FrameItPhrases } FrameItPhrases
 * @typedef {import('./frame-it-types.js').PersonalizedFrameIt } PersonalizedFrameIt
*/

//#endregion


/**
 * Handles API Requests that access the 'frame-it' portion of the API
 */
export class FrameItApi 
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

//#region PUBLIC - CREATE PERSONALIZED FRAME

 /**
   * Create a new visual frame with personalized phrases and return the generated image URL
   * 
   * @param {string} userId
   * @param {FrameItPhrases} frameItPhrases
   * @returns {Promise<PersonalizedFrameIt>}
   */
  //-----------------------------------------------------------------------//
  CreatePersonalizedFrame(userId, frameItPhrases) 
  //-----------------------------------------------------------------------//
  {
    // Check if the userId is a valid non-empty string.
    if (typeof userId !== 'string' || userId.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : frame-it-api.js CreatePersonalizedFrame() Invalid userId: The userId must be a non-empty string."));
    }

    // Validate the frameItPhrases object against the imported Joi schema
    const { error } = FrameItPhrasesSchema.validate(frameItPhrases);

    if (error) {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error(`web-nestre-api : frame-it-api.js CreatePersonalizedFrame() Validation failed for frameItPhrases: ${error.details[0].message}`));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.POST, `user/${userId}/frame`, frameItPhrases);

  } //END CreatePersonalizedFrame Method

//#endregion

} //END FrameItApi Class