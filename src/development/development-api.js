/**
 * development-api.js
 * @file Handles API requests related to the development api.
 * @description Provides a singleton class, `DevelopmentApi`. 
 * This file centralizes all development specific API logic.
 * The `DevelopmentApi` class here is created automatically by the NestreApiManager class during construction
 * @exports {DevelopmentApi}
 * @requires {NestreApiManager} from '../nestre-api-manager.js'
 * @requires {Joi} for schema validation
 */


//#region IMPORTS

import {NestreApiManager, HttpMethod} from '../nestre-api-manager.js';
import { AuthenticationRequestSchema } from './development-schemas.js';

/**
 * @typedef {import('./development-types.js').AuthenticationRequest } AuthenticationRequest
 * @typedef {import('./development-types.js').AuthenticationData } AuthenticationData
*/

//#endregion

/**
 * Handles API Requests that access the 'development' portion of the API
 */
export class DevelopmentApi
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

//#region PUBLIC - AUTHENTICATE

 /**
   * This endpoint handles user authentication by validating the provided username and password against the AWS Cognito user pool for the Nestre application.
   * 
   * @param {AuthenticationRequest} authenticationRequest
   * @returns {Promise<AuthenticationData>}
   */
  //-----------------------------------------------------------------------//
  Authenticate(authenticationRequest) 
  //-----------------------------------------------------------------------//
  {
    // Validate the authenticationRequest object against the imported Joi schema
    const { error } = AuthenticationRequestSchema.validate(authenticationRequest);

    if (error) {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error(`web-nestre-api : development-api.js Authenticate() Validation failed for authenticationRequest: ${error.details[0].message}`));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.POST, `dev/app-user-cognito-login`, authenticationRequest, true, true);

  } //END Authenticate Method


//#endregion

} //END DevelopmentApi