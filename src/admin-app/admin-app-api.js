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
import { CreateOrganizationDataSchema } from './admin-app-schemas.js';

/**
 * @typedef {import('./admin-app-types.js').UsersMatchingSearch } UsersMatchingSearch
 * @typedef {import('./admin-app-types.js').UserData } UserData
 * @typedef {import('./admin-app-types.js').CreateOrganizationData } CreateOrganizationData
 * @typedef {import('./admin-app-types.js').NewlyCreatedOrganizationData } NewlyCreatedOrganizationData
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

//#region PUBLIC - GET USER

 /**
   * Retrieve a user by their unique identifier.
   * 
   * @param {string} user_id
   * @returns {Promise<UserData>}
   */
  //-----------------------------------------------------------------------//
  GetUser(user_id) 
  //-----------------------------------------------------------------------//
  {
    // Check if the user_id is a valid non-empty string.
    if (typeof user_id !== 'string' || user_id.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : admin-app-api.js GetUser() Invalid user_id: The user_id must be a non-empty string."));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.GET, `admin/user/${user_id}`);

  } //END GetUser Method

//#endregion

//#region PUBLIC - UPDATE USER

 /**
   * Update a user's profile information by their unique identifier.
   * 
   * @param {string} user_id
   * @param {object} updateData
   * @returns {Promise<UserData>}
   */
  //-----------------------------------------------------------------------//
  UpdateUser(user_id, updateData) 
  //-----------------------------------------------------------------------//
  {
    // Check if the user_id is a valid non-empty string.
    if (typeof user_id !== 'string' || user_id.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : admin-app-api.js UpdateUser() Invalid user_id: The user_id must be a non-empty string."));
    }

    // Check if updateData is a valid object.
    if (updateData === null || typeof updateData !== 'object' || Array.isArray(updateData)) {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : admin-app-api.js UpdateUser() Invalid updateData: The updateData must be a non-null object."));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.PATCH, `admin/user/${user_id}/update`, updateData);

  } //END UpdateUser Method

//#endregion

//#region PUBLIC - CREATE ORGANIZATION

 /**
   * Create a new organization with the provided details
   * 
   * @param {CreateOrganizationData} orgData
   * @returns {Promise<NewlyCreatedOrganizationData>}
   */
  //-----------------------------------------------------------------------//
  CreateOrganization(orgData) 
  //-----------------------------------------------------------------------//
  {
    // Validate the orgData object against the imported Joi schema
    const { error } = CreateOrganizationDataSchema.validate(orgData);

    if (error) {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error(`web-nestre-api : admin-app-api.js CreateOrganization() Validation failed for orgData: ${error.details[0].message}`));
    }
    
    return NestreApiManager.GetInstance().Request( HttpMethod.POST, `admin/organization`, orgData);

  } //END CreateOrganization Method

//#endregion

} //END AdminAppApi