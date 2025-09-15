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
import { ContentInteractionSchema } from './content-interaction-schema.js';

/**
 * @typedef {import('./content-interaction-types.js').ContentInteraction } ContentInteraction
 * @typedef {import('./content-interaction-types.js').ContentInteractionSuccessMessage } ContentInteractionSuccessMessage
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
   * @param {ContentInteraction} contentInteraction
   * @returns {Promise<ContentInteractionSuccessMessage>}
   */
  //-----------------------------------------------------------------------//
  CreateActivateContentInteraction(userId, contentInteraction) 
  //-----------------------------------------------------------------------//
  {
    // Check if the userId is a valid non-empty string.
    if (typeof userId !== 'string' || userId.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : content-interaction-api.js CreateActivateContentInteraction() Invalid userId: The userId must be a non-empty string."));
    }

    // Validate the contentInteraction object against the imported Joi schema
    const { error } = ContentInteractionSchema.validate(contentInteraction);

    if (error) {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error(`web-nestre-api : content-interaction-api.js CreateActivateContentInteraction() Validation failed for contentInteraction: ${error.details[0].message}`));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.POST, `user/${userId}/activate-interaction`, contentInteraction);

  } //END CreateActivateContentInteraction Method

//#endregion

//#region PUBLIC - CREATE GUIDE FRAME INTERACTION

 /**
   * Record a user's interaction with guided frame content.
   * 
   * @param {string} userId
   * @param {ContentInteraction} contentInteraction
   * @returns {Promise<ContentInteractionSuccessMessage>}
   */
  //-----------------------------------------------------------------------//
  CreateGuidedFrameContentInteraction(userId, contentInteraction) 
  //-----------------------------------------------------------------------//
  {
    // Check if the userId is a valid non-empty string.
    if (typeof userId !== 'string' || userId.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : content-interaction-api.js CreateGuidedFrameContentInteraction() Invalid userId: The userId must be a non-empty string."));
    }

    // Validate the contentInteraction object against the imported Joi schema
    const { error } = ContentInteractionSchema.validate(contentInteraction);

    if (error) {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error(`web-nestre-api : content-interaction-api.js CreateGuidedFrameContentInteraction() Validation failed for contentInteraction: ${error.details[0].message}`));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.POST, `user/${userId}/guided-frame-interaction`, contentInteraction);

  } //END CreateGuidedFrameContentInteraction Method

//#endregion

//#region PUBLIC - CREATE MENTAL FRAME INTERACTION

 /**
   * Record a user's interaction with mental frame content.
   * 
   * @param {string} userId
   * @param {ContentInteraction} contentInteraction
   * @returns {Promise<ContentInteractionSuccessMessage>}
   */
  //-----------------------------------------------------------------------//
  CreateMentalFrameContentInteraction(userId, contentInteraction) 
  //-----------------------------------------------------------------------//
  {
    // Check if the userId is a valid non-empty string.
    if (typeof userId !== 'string' || userId.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : content-interaction-api.js CreateMentalFrameContentInteraction() Invalid userId: The userId must be a non-empty string."));
    }

    // Validate the contentInteraction object against the imported Joi schema
    const { error } = ContentInteractionSchema.validate(contentInteraction);

    if (error) {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error(`web-nestre-api : content-interaction-api.js CreateMentalFrameContentInteraction() Validation failed for contentInteraction: ${error.details[0].message}`));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.POST, `user/${userId}/mental-framing-interaction`, contentInteraction);

  } //END CreateMentalFrameContentInteraction Method

//#endregion

//#region PUBLIC - CREATE MINDSET MINUTE INTERACTION

 /**
   * Record a user's interaction with mindset minute content.
   * 
   * @param {string} userId
   * @param {ContentInteraction} contentInteraction
   * @returns {Promise<ContentInteractionSuccessMessage>}
   */
  //-----------------------------------------------------------------------//
  CreateMindsetMinuteContentInteraction(userId, contentInteraction) 
  //-----------------------------------------------------------------------//
  {
    // Check if the userId is a valid non-empty string.
    if (typeof userId !== 'string' || userId.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : content-interaction-api.js CreateMindsetMinuteContentInteraction() Invalid userId: The userId must be a non-empty string."));
    }

    // Validate the contentInteraction object against the imported Joi schema
    const { error } = ContentInteractionSchema.validate(contentInteraction);

    if (error) {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error(`web-nestre-api : content-interaction-api.js CreateMindsetMinuteContentInteraction() Validation failed for contentInteraction: ${error.details[0].message}`));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.POST, `user/${userId}/mindset-minute-interaction`, contentInteraction);

  } //END CreateMindsetMinuteContentInteraction Method

//#endregion

//#region PUBLIC - CREATE MUSIC INTERACTION

 /**
   * Record a user's interaction with music content.
   * 
   * @param {string} userId
   * @param {ContentInteraction} contentInteraction
   * @returns {Promise<ContentInteractionSuccessMessage>}
   */
  //-----------------------------------------------------------------------//
  CreateMusicContentInteraction(userId, contentInteraction) 
  //-----------------------------------------------------------------------//
  {
    // Check if the userId is a valid non-empty string.
    if (typeof userId !== 'string' || userId.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : content-interaction-api.js CreateMusicContentInteraction() Invalid userId: The userId must be a non-empty string."));
    }

    // Validate the contentInteraction object against the imported Joi schema
    const { error } = ContentInteractionSchema.validate(contentInteraction);

    if (error) {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error(`web-nestre-api : content-interaction-api.js CreateMusicContentInteraction() Validation failed for contentInteraction: ${error.details[0].message}`));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.POST, `user/${userId}/music-interaction`, contentInteraction);

  } //END CreateMusicContentInteraction Method

//#endregion

} //END ContentInteractionApi Class