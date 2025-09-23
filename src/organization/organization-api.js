/**
 * organization-api.js
 * @file Handles API requests related to organizations.
 * @description Provides a singleton class, `OrganizationApi`. 
 * This file centralizes all organization specific API logic.
 * The `OrganizationApi` class here is created automatically by the NestreApiManager class during construction
 * @exports {OrganizationApi}
 * @requires {NestreApiManager} from '../nestre-api-manager.js'
 * @requires {Joi} for schema validation
 */


//#region IMPORTS

import {NestreApiManager, HttpMethod} from '../nestre-api-manager.js';

/**
 * @typedef {import('./organization-types.js').Organizations } Organizations
 * @typedef {import('./organization-types.js').OrganizationMembers } OrganizationMembers
 * @typedef {import('./organization-types.js').OrganizationUserDetails } OrganizationUserDetails
 * @typedef {import('./organization-types.js').OrganizationData } OrganizationData
*/

//#endregion

/**
 * Handles API Requests that access the 'organization' portion of the API
 */
export class OrganizationApi 
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

//#region PUBLIC - LIST ORGANIZATIONS

 /**
   * Retrieve all organizations along with their associated tags.
   * 
   * @returns {Promise<Organizations>}
   */
  //-----------------------------------------------------------------------//
  ListOrganizations() 
  //-----------------------------------------------------------------------//
  {

    return NestreApiManager.GetInstance().Request( HttpMethod.GET, `org/list-with-tags`);

  } //END ListOrganizations Method

//#endregion

//#region PUBLIC - GET MEMBERS

 /**
   * Retrieve all members in an organization with optional filtering by tag or email search string
   * 
   * @param {string} organization_id 
   * @param {string | null} tag
   * @param {string | null} email_search_string
   * @returns {Promise<OrganizationMembers>}
   */
  //-----------------------------------------------------------------------//
  GetMembers(organization_id, tag, email_search_string) 
  //-----------------------------------------------------------------------//
  {
    // Validate organization_id
    if (typeof organization_id !== 'string' || organization_id.trim().length === 0) 
    {
        return Promise.reject(new Error("web-nestre-api : organization-api.js GetMembers() Invalid organization_id: The organization_id must be a non-empty string."));
    }

    // Validate tag
    if (tag && typeof tag !== 'string') 
    {
        return Promise.reject(new Error("web-nestre-api : organization-api.js GetMembers() Invalid tag: If provided, the tag must be a string."));
    }

    // Validate email_search_string
    if (email_search_string && (typeof email_search_string !== 'string' || email_search_string.trim().length < 3)) 
    {
        return Promise.reject(new Error("web-nestre-api : organization-api.js GetMembers() Invalid email_search_string: If provided, the email_search_string must be a string with at least 3 characters."));
    }

    const params = new URLSearchParams();
    if (tag) 
    {
        params.append('tag', tag);
    }
    if (email_search_string) 
    {
        params.append('email_search_string', email_search_string);
    }

    let endpoint = `org/${organization_id}/members`;
    const queryString = params.toString();
    if (queryString) {
        endpoint += `?${queryString}`;
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.GET, endpoint);

  } //END GetMembers Method

//#endregion

//#region PUBLIC - GET USER DETAILS

 /**
   * Retrieve detailed user information for all registered users in an organization with optional filtering
   * 
   * @param {string} organization_id 
   * @param {string | null} tag
   * @param {string | null} email_search_string
   * @returns {Promise<OrganizationUserDetails>}
   */
  //-----------------------------------------------------------------------//
  GetUserDetails(organization_id, tag, email_search_string) 
  //-----------------------------------------------------------------------//
  {
    // Validate organization_id
    if (typeof organization_id !== 'string' || organization_id.trim().length === 0) 
    {
        return Promise.reject(new Error("web-nestre-api : organization-api.js GetUserDetails() Invalid organization_id: The organization_id must be a non-empty string."));
    }

    // Validate tag
    if (tag && typeof tag !== 'string') 
    {
        return Promise.reject(new Error("web-nestre-api : organization-api.js GetUserDetails() Invalid tag: If provided, the tag must be a string."));
    }

    // Validate email_search_string
    if (email_search_string && (typeof email_search_string !== 'string' || email_search_string.trim().length < 3)) 
    {
        return Promise.reject(new Error("web-nestre-api : organization-api.js GetUserDetails() Invalid email_search_string: If provided, the email_search_string must be a string with at least 3 characters."));
    }

    const params = new URLSearchParams();
    if (tag) 
    {
        params.append('tag', tag);
    }
    if (email_search_string) 
    {
        params.append('email_search_string', email_search_string);
    }

    let endpoint = `org/${organization_id}/users`;
    const queryString = params.toString();
    if (queryString) {
        endpoint += `?${queryString}`;
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.GET, endpoint);

  } //END GetUserDetails Method

//#endregion

//#region PUBLIC - GET ORGANIZATION DETAIL

 /**
   * Retrieve an organization by its unique identifier
   * 
   * @param {string} organization_id
   * @returns {Promise<OrganizationData>}
   */
  //-----------------------------------------------------------------------//
  GetOrganizationById(organization_id) 
  //-----------------------------------------------------------------------//
  {
    // Validate organization_id
    if (typeof organization_id !== 'string' || organization_id.trim().length === 0) 
    {
        return Promise.reject(new Error("web-nestre-api : organization-api.js GetOrganizationById() Invalid organization_id: The organization_id must be a non-empty string."));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.GET, `org/${organization_id}`);

  } //END GetOrganizationById Method

//#endregion


} //END OrganizationApi Class