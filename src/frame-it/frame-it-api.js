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
import { FrameItPhrasesSchema, UpdateFrameDataSchema } from './frame-it-schemas.js';

/**
 * @typedef {import('./frame-it-types.js').FrameItPhrases } FrameItPhrases
 * @typedef {import('./frame-it-types.js').PersonalizedFrameIt } PersonalizedFrameIt
 * @typedef {import('./frame-it-types.js').UpdateFrameData } UpdateFrameData
 * @typedef {import('./frame-it-types.js').DeleteFrameConfirmationMessage } DeleteFrameConfirmationMessage
 * @typedef {import('./frame-it-types.js').PersonalizedFrameGallery } PersonalizedFrameGallery
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

//#region PUBLIC - GET FRAME BY ID

 /**
   * Retrieve a specific frame by its unique identifier
   * 
   * @param {string} userId
   * @param {string} frameId
   * @returns {Promise<PersonalizedFrameIt>}
   */
  //-----------------------------------------------------------------------//
  GetFrameById(userId, frameId) 
  //-----------------------------------------------------------------------//
  {
    // Check if the userId is a valid non-empty string.
    if (typeof userId !== 'string' || userId.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : frame-it-api.js GetFrameById() Invalid userId: The userId must be a non-empty string."));
    }

    // Check if the frameId is a valid non-empty string.
    if (typeof frameId !== 'string' || frameId.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : frame-it-api.js GetFrameById() Invalid frameId: The frameId must be a non-empty string."));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.GET, `user/${userId}/frame/${frameId}`);

  } //END GetFrameById Method

//#endregion

//#region PUBLIC - UPDATE FRAME DATA

 /**
   * Update frame metadata or properties using partial data
   * 
   * @param {string} userId
   * @param {string} frameId
   * @param {UpdateFrameData} updateFrameData
   * @returns {Promise<PersonalizedFrameIt>}
   */
  //-----------------------------------------------------------------------//
  UpdateFrame(userId, frameId, updateFrameData) 
  //-----------------------------------------------------------------------//
  {
    // Check if the userId is a valid non-empty string.
    if (typeof userId !== 'string' || userId.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : frame-it-api.js UpdateFrame() Invalid userId: The userId must be a non-empty string."));
    }

    // Check if the frameId is a valid non-empty string.
    if (typeof frameId !== 'string' || frameId.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : frame-it-api.js UpdateFrame() Invalid frameId: The frameId must be a non-empty string."));
    }

    // Validate the updateFrameData object against the imported Joi schema
    const { error } = UpdateFrameDataSchema.validate(updateFrameData);

    if (error) {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error(`web-nestre-api : frame-it-api.js UpdateFrame() Validation failed for updateFrameData: ${error.details[0].message}`));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.PATCH, `user/${userId}/frame/${frameId}`, updateFrameData);

  } //END UpdateFrame Method

//#endregion

//#region PUBLIC - DELETE FRAME BY ID

 /**
   * Permanently delete a frame and its associated image
   * 
   * @param {string} userId
   * @param {string} frameId
   * @returns {Promise<DeleteFrameConfirmationMessage>}
   */
  //-----------------------------------------------------------------------//
  DeleteFrameById(userId, frameId) 
  //-----------------------------------------------------------------------//
  {
    // Check if the userId is a valid non-empty string.
    if (typeof userId !== 'string' || userId.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : frame-it-api.js DeleteFrameById() Invalid userId: The userId must be a non-empty string."));
    }

    // Check if the frameId is a valid non-empty string.
    if (typeof frameId !== 'string' || frameId.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : frame-it-api.js DeleteFrameById() Invalid frameId: The frameId must be a non-empty string."));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.DELETE, `user/${userId}/frame/${frameId}`);

  } //END DeleteFrameById Method

//#endregion

//#region PUBLIC - GET FRAME GALLERY

 /**
   * Retrieve all frames created by the authenticated user
   * 
   * @param {string} userId
   * @returns {Promise<PersonalizedFrameGallery>}
   */
  //-----------------------------------------------------------------------//
  GetFrameGallery(userId) 
  //-----------------------------------------------------------------------//
  {
    // Check if the userId is a valid non-empty string.
    if (typeof userId !== 'string' || userId.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : frame-it-api.js GetFrameGallery() Invalid userId: The userId must be a non-empty string."));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.GET, `user/${userId}/frames`);

  } //END GetFrameGallery Method

//#endregion

} //END FrameItApi Class