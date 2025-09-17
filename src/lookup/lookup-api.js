/**
 * lookup-api.js
 * @file Handles API requests related to the lookup endpoint.
 * @description Provides a singleton class, `LookupApi`. 
 * This file centralizes all lookup specific API logic.
 * The `LookupApi` class here is created automatically by the NestreApiManager class during construction
 * @exports {LookupApi}
 * @requires {NestreApiManager} from '../nestre-api-manager.js'
 * @requires {Joi} for schema validation
 */


//#region IMPORTS

import {NestreApiManager, HttpMethod} from '../nestre-api-manager.js';

/**
 * @typedef {import('./lookup-types.js').GenderOptions } GenderOptions
 * @typedef {import('./lookup-types.js').EducationOptions } EducationOptions
 * @typedef {import('./lookup-types.js').MaritalOptions } MaritalOptions
 * @typedef {import('./lookup-types.js').SubscriptionOptions } SubscriptionOptions
*/

//#endregion

/**
 * Handles API Requests that access the 'lookup' portion of the API
 */
export class LookupApi 
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

//#region PUBLIC - GET GENDER OPTIONS

 /**
   * Retrieve all available gender options for user profile selection
   * 
   * @returns {Promise<GenderOptions>}
   */
  //-----------------------------------------------------------------------//
  GetGenderOptions() 
  //-----------------------------------------------------------------------//
  {

    return NestreApiManager.GetInstance().Request( HttpMethod.GET, `lookup/gender`);

  } //END GetGenderOptions Method

//#endregion

//#region PUBLIC - GET EDUCATION OPTIONS

 /**
   * Retrieve all available education level classifications for user profiles
   * 
   * @returns {Promise<EducationOptions>}
   */
  //-----------------------------------------------------------------------//
  GetEducationOptions() 
  //-----------------------------------------------------------------------//
  {

    return NestreApiManager.GetInstance().Request( HttpMethod.GET, `lookup/education-level`);

  } //END GetEducationOptions Method

//#endregion

//#region PUBLIC - GET MARITAL OPTIONS

 /**
   * Retrieve all available marital status options for user demographic information
   * 
   * @returns {Promise<MaritalOptions>}
   */
  //-----------------------------------------------------------------------//
  GetMaritalOptions() 
  //-----------------------------------------------------------------------//
  {

    return NestreApiManager.GetInstance().Request( HttpMethod.GET, `lookup/marital-status`);

  } //END GetMaritalOptions Method

//#endregion

//#region PUBLIC - GET SUBSCRIPTION OPTIONS

 /**
   * Retrieve all available subscription levels with features and pricing information
   * 
   * @returns {Promise<SubscriptionOptions>}
   */
  //-----------------------------------------------------------------------//
  GetSubscriptionOptions() 
  //-----------------------------------------------------------------------//
  {

    return NestreApiManager.GetInstance().Request( HttpMethod.GET, `lookup/subscription-level`);

  } //END GetSubscriptionOptions Method

//#endregion

} //END LookupApi Class