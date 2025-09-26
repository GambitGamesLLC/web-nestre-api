/**
 * admin-app-api.js
 * @file Handles API requests related to the admin-app.
 * @description Provides a singleton class, `AdminAppApi`. 
 * This file centralizes all admin-app specific API logic.
 * The `AdminAppApi` class here is created automatically by the NestreApiManager class during construction
 * @exports {AdminAppApi}
 * @requires {NestreApiManager} from '../nestre-api-manager.js'
 * @requires {Joi} for schema validation
 */


//#region IMPORTS

import {NestreApiManager, HttpMethod} from '../nestre-api-manager.js';

/**
 * @typedef {import('./admin-app-types.js').UsersMatchingSearch } UsersMatchingSearch
 */


//#endregion

/**
 * Handles API Requests that access the 'admin-app' portion of the API
 */
export class AdminAppApi 
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
   * Generate a shortened URL using the Blink service.
   * 
   * @param {string} url
   * @returns {Promise<string>}
   */
  //-----------------------------------------------------------------------//
  ShortenUrl(url) 
  //-----------------------------------------------------------------------//
  {
    // Check if the url is a valid non-empty string.
    if (typeof url !== 'string' || url.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : admin-app-api.js ShortenUrl() Invalid url: The url must be a non-empty string."));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.GET, `admin/shorten-url?url=${url}`);

  } //END ShortenUrl Method

//#endregion

//#region PUBLIC - DELETE USER BY EMAIL

 /**
   * Delete a user from the system by their email address.
   * 
   * @param {string} email
   * @returns {Promise<>}
   */
  //-----------------------------------------------------------------------//
  DeleteUserByEmail(email) 
  //-----------------------------------------------------------------------//
  {
    // Check if the email is a valid non-empty string.
    if (typeof email !== 'string' || email.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : admin-app-api.js DeleteUserByEmail() Invalid email: The email must be a non-empty string."));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.DELETE, `admin/delete-user-by-email?email=${email}`);

  } //END DeleteUserByEmail Method

//#endregion

//#region PUBLIC - SEARCH USERS

 /**
   * Search for users by a search string (minimum 3 characters).
   * 
   * @param {string} search_string
   * @returns {Promise<UsersMatchingSearch>}
   */
  //-----------------------------------------------------------------------//
  SearchUsers(search_string) 
  //-----------------------------------------------------------------------//
  {
    // Check if the search_string is a valid non-empty string.
    if (typeof search_string !== 'string' || search_string.trim().length < 3) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : admin-app-api.js SearchUsers() Invalid search_string: The search_string must be a non-empty string."));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.GET, `admin/search-users?search_string=${search_string}`);

  } //END SearchUsers Method

//#endregion

} //END AdminAppApi