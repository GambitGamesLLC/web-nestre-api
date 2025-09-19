/**
 * utility-api.js
 * @file Handles API requests related to the utility endpoint.
 * @description Provides a singleton class, `UtilityApi`. 
 * This file centralizes all utility specific API logic.
 * The `UtilityApi` class here is created automatically by the NestreApiManager class during construction
 * @exports {UtilityApi}
 * @requires {NestreApiManager} from '../nestre-api-manager.js'
 * @requires {Joi} for schema validation
 */


//#region IMPORTS

import {NestreApiManager, HttpMethod} from '../nestre-api-manager.js';
import { UrlSchema, ErrorLogSchema } from './utility-schemas.js';

/**
 * @typedef {import('./utility-types.js').Url } Url
 * @typedef {import('./utility-types.js').ErrorLog } ErrorLog
 * @typedef {import('./utility-types.js').ErrorLoggedSuccessMessage } ErrorLoggedSuccessMessage
*/

//#endregion


/**
 * Handles API Requests that access the 'utility' portion of the API
 */
export class UtilityApi 
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

//#region PUBLIC - SHORTEN URL

 /**
   * Create a shortened URL using the Blink URL shortening service.
   * 
   * @param {Url} url
   * @returns {Promise<Url>}
   */
  //-----------------------------------------------------------------------//
  CreateShortenedUrl(url) 
  //-----------------------------------------------------------------------//
  {
    // Validate the url string against the imported Joi schema
    const { error } = UrlSchema.validate(url);

    if (error) {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error(`web-nestre-api : utility-api.js CreateShortenedUrl() Validation failed for url: ${error.details[0].message}`));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.POST, `util/shorten-url`, url);

  } //END CreateShortenedUrl Method

//#endregion

//#region PUBLIC - IS AFTER NESTRE DAWN

 /**
   * Determine if a given timestamp occurs after the Nestre dawn cutoff time for the current day.
   * 
   * @param {Date} date
   * @returns {Promise<boolean>}
   */
  //-----------------------------------------------------------------------//
  IsAfterNestreDawn(date) 
  //-----------------------------------------------------------------------//
  {
    // Check if the date is a valid Date object.
    if (!(date instanceof Date) || isNaN(date)) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : utility-api.js IsAfterNestreDawn() Invalid date: The date must be a valid Date object."));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.GET, `util/is-after-nestre-dawn?timestamp=${date.toISOString()}`);

  } //END IsAfterNestreDawn Method

//#endregion

//#region PUBLIC - LOG CLIENT ERROR

 /**
   * Record client-side errors for monitoring and debugging purposes. Logs are sent to CloudWatch with user context.
   * 
   * @param {ErrorLog} errorLog
   * @returns {Promise<ErrorLoggedSuccessMessage>}
   */
  //-----------------------------------------------------------------------//
  LogClientError(errorLog) 
  //-----------------------------------------------------------------------//
  {
    // Validate the errorLog against the imported Joi schema
    const { error } = ErrorLogSchema.validate(errorLog);

    if (error) {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error(`web-nestre-api : utility-api.js LogClientError() Validation failed for errorLog: ${error.details[0].message}`));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.POST, `util/log-client-error`, errorLog);

  } //END LogClientError Method

//#endregion

//#region PUBLIC - PING

 /**
   * Simple ping endpoint to verify service availability.
   * 
   * @returns {Promise<string>} A simple text response indicating the service is running.
   */
  //-----------------------------------------------------------------------//
  Ping() 
  //-----------------------------------------------------------------------//
  {

    return NestreApiManager.GetInstance().Request( HttpMethod.GET, `ping`, null, true);

  } //END Ping Method

//#endregion


} //END UtilityApi Class
