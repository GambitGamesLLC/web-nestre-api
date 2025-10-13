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
import { UpdateOrganizationDataSchema } from './admin-app-schemas.js';
import { TeamCodeSchema } from './admin-app-schemas.js'; 
import { AdminAppCreateReferralCodeSchema } from './admin-app-schemas.js';
import { AdminAppOrganizationMembersSchema } from './admin-app-schemas.js';
import { MemberIdsSchema } from './admin-app-schemas.js';

/**
 * @typedef {import('./admin-app-types.js').UsersMatchingSearch } UsersMatchingSearch
 * @typedef {import('./admin-app-types.js').UserData } UserData
 * @typedef {import('./admin-app-types.js').CreateOrganizationData } CreateOrganizationData
 * @typedef {import('./admin-app-types.js').NewlyCreatedOrganizationData } NewlyCreatedOrganizationData
 * @typedef {import('./admin-app-types.js').UpdateOrganizationData } UpdateOrganizationData
 * @typedef {import('./admin-app-types.js').UpdatedOrganization } UpdatedOrganization 
 * @typedef {import('./admin-app-types.js').RetrievedOrganizationData } RetrievedOrganizationData
 * @typedef {import('./admin-app-types.js').TeamCode } TeamCode
 * @typedef {import('./admin-app-types.js').AdminAppCreateReferralCode } CreateReferralCode
 * @typedef {import('./admin-app-types.js').AdminAppOrganizationMembers } OrganizationMembers
 * @typedef {import('./admin-app-types.js').MemberIds } MemberIds
 * @typedef {import('./admin-app-types.js').UserStatsData } UserStatsData
 * @typedef {import('./admin-app-types.js').ReferralCodeStats } ReferralCodeStats
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

//#region PUBLIC - UPDATE ORGANIZATION

 /**
   * Create a new organization with the provided details
   * 
   * @param {string} organization_id
   * @param {UpdateOrganizationData} organization_update
   * @returns {Promise<UpdatedOrganization>}
   */
  //-----------------------------------------------------------------------//
  UpdateOrganization(organization_id, organization_update) 
  //-----------------------------------------------------------------------//
  {
    // Check if the organization_id is a valid non-empty string.
    if (typeof organization_id !== 'string' || organization_id.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : admin-app-api.js UpdateOrganization() Invalid organization_id: The organization_id must be a non-empty string."));
    }

    // Validate the organization_update object against the imported Joi schema
    const { error } = UpdateOrganizationDataSchema.validate(organization_update);

    if (error) {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error(`web-nestre-api : admin-app-api.js UpdateOrganization() Validation failed for organization_update: ${error.details[0].message}`));
    }
    
    return NestreApiManager.GetInstance().Request( HttpMethod.PATCH, `admin/organization/${organization_id}`, organization_update);

  } //END UpdateOrganization Method

//#endregion

//#region PUBLIC - DELETE ORGANIZATION

 /**
   * Delete an organization by its unique identifier
   * 
   * @param {string} organization_id
   * @returns {Promise<>}
   */
  //-----------------------------------------------------------------------//
  DeleteOrganization(organization_id) 
  //-----------------------------------------------------------------------//
  {
    // Check if the organization_id is a valid non-empty string.
    if (typeof organization_id !== 'string' || organization_id.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : admin-app-api.js DeleteOrganization() Invalid organization_id: The organization_id must be a non-empty string."));
    }
    
    return NestreApiManager.GetInstance().Request( HttpMethod.DELETE, `admin/organization/${organization_id}` );

  } //END DeleteOrganization Method

//#endregion

//#region PUBLIC - GET ORGANIZATION

 /**
   * Retrieve an organization by its unique identifier. Includes referral codes and team codes.
   * 
   * @param {string} organization_id
   * @returns {Promise<RetrievedOrganizationData>}
   */
  //-----------------------------------------------------------------------//
  GetOrganization(organization_id) 
  //-----------------------------------------------------------------------//
  {
    // Check if the organization_id is a valid non-empty string.
    if (typeof organization_id !== 'string' || organization_id.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : admin-app-api.js GetOrganization() Invalid organization_id: The organization_id must be a non-empty string."));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.GET, `admin/organization/${organization_id}` );

  } //END GetOrganization Method

//#endregion

//#region PUBLIC - CREATE TEAM CODE FOR ORGANIZATION

 /**
   * Create a new team code for a specific organization.
   * 
   * @param {string} organization_id
   * @param {TeamCode} team_code
   * @returns {Promise<string>}
   */
  //-----------------------------------------------------------------------//
  CreateTeamCodeForOrganization(organization_id, team_code) 
  //-----------------------------------------------------------------------//
  {
    // Check if the organization_id is a valid non-empty string.
    if (typeof organization_id !== 'string' || organization_id.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : admin-app-api.js CreateTeamCodeForOrganization() Invalid organization_id: The organization_id must be a non-empty string."));
    }

    // Validate the team_code object against the imported Joi schema
    const { error } = TeamCodeSchema.validate(team_code);

    if (error) {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error(`web-nestre-api : admin-app-api.js CreateTeamCodeForOrganization() Validation failed for team_code: ${error.details[0].message}`));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.POST, `admin/organization/${organization_id}/team-code`, team_code );

  } //END CreateTeamCodeForOrganization Method

//#endregion

//#region PUBLIC - CREATE REFERRAL CODE FOR ORGANIZATION

 /**
   * Create a new referral code for a specific organization.
   * 
   * @param {string} organization_id
   * @param {CreateReferralCode} referral_code
   * @returns {Promise<string>}
   */
  //-----------------------------------------------------------------------//
  CreateReferralCodeForOrganization(organization_id, referral_code) 
  //-----------------------------------------------------------------------//
  {
    // Check if the organization_id is a valid non-empty string.
    if (typeof organization_id !== 'string' || organization_id.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : admin-app-api.js CreateReferralCodeForOrganization() Invalid organization_id: The organization_id must be a non-empty string."));
    }

    // Validate the referral_code object against the imported Joi schema
    const { error } = AdminAppCreateReferralCodeSchema.validate(referral_code);

    if (error) {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error(`web-nestre-api : admin-app-api.js CreateReferralCodeForOrganization() Validation failed for referral_code: ${error.details[0].message}`)); 
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.POST, `admin/organization/${organization_id}/referral-code`, referral_code );

  } //END CreateReferralCodeForOrganization Method

//#endregion

//#region PUBLIC - CREATE ORGANIZATION MEMBERS

 /**
   * Create new members in an organization
   * 
   * @param {string} organization_id
   * @param {OrganizationMembers} organization_members
   * @returns {Promise<string>}
   */
  //-----------------------------------------------------------------------//
  CreateOrganizationMembers(organization_id, organization_members) 
  //-----------------------------------------------------------------------//
  {
    // Check if the organization_id is a valid non-empty string.
    if (typeof organization_id !== 'string' || organization_id.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : admin-app-api.js CreateOrganizationMembers() Invalid organization_id: The organization_id must be a non-empty string."));
    }

    // Validate the referral_code object against the imported Joi schema
    const { error } = AdminAppOrganizationMembersSchema.validate(organization_members);

    if (error) {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error(`web-nestre-api : admin-app-api.js CreateOrganizationMembers() Validation failed for organization_members: ${error.details[0].message}`));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.POST, `admin/organization/${organization_id}/members`, organization_members );

  } //END CreateOrganizationMembers Method

//#endregion

//#region PUBLIC - DELETE ORGANIZATION MEMBERS

 /**
   * Delete members from an organization by their IDs
   * 
   * @param {string} organization_id
   * @param {MemberIds} member_ids
   * @returns {Promise<string>}
   */
  //-----------------------------------------------------------------------//
  DeleteOrganizationMembers(organization_id, member_ids) 
  //-----------------------------------------------------------------------//
  {
    // Check if the organization_id is a valid non-empty string.
    if (typeof organization_id !== 'string' || organization_id.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : admin-app-api.js DeleteOrganizationMembers() Invalid organization_id: The organization_id must be a non-empty string."));
    }

    // Validate the referral_code object against the imported Joi schema
    const { error } = MemberIdsSchema.validate(member_ids);

    if (error) {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error(`web-nestre-api : admin-app-api.js DeleteOrganizationMembers() Validation failed for member_ids: ${error.details[0].message}`));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.DELETE, `admin/organization/${organization_id}/members`, member_ids );

  } //END DeleteOrganizationMembers Method

//#endregion

//#region PUBLIC - GET USER STATS

 /**
   * Retrieve user statistics for the app within a date range.
   * 
   * @param {Date} from_date
   * @param {Date} to_date
   * @returns {Promise<UserStatsData>}
   */
  //-----------------------------------------------------------------------//
  GetUserStats(from_date, to_date) 
  //-----------------------------------------------------------------------//
  {
    // Check if from_date is a valid Date object.
    if (!(from_date instanceof Date) || isNaN(from_date)) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : admin-app-api.js GetUserStats() Invalid from_date: The from_date must be a valid Date object."));
    }

    // Check if to_date is a valid Date object.
    if (!(to_date instanceof Date) || isNaN(to_date)) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : admin-app-api.js GetUserStats() Invalid to_date: The to_date must be a valid Date object."));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.GET, `admin/user-stats?from_date=${from_date.toISOString()}&to_date=${to_date.toISOString()}` );

  } //END GetUserStats Method

//#endregion

//#region PUBLIC - GET REFERRAL CODE STATS

 /**
   * Retrieve referral code statistics, optionally filtered by name, code, and date range.
   * 
   * @param {string | null} name
   * @param {string | null} code
   * @param {Date | null} from_date
   * @param {Date | null} to_date
   * @param {boolean} aggregate_codes
   * @returns {Promise<ReferralCodeStats>}
   */
  //-----------------------------------------------------------------------//
  GetReferralCodeStats(name, code, from_date, to_date, aggregate_codes) 
  //-----------------------------------------------------------------------//
  {    
    const params = new URLSearchParams();

    if (name && typeof name === 'string' && name.trim().length > 0) {
        params.append('name', name);
    }

    if (code && typeof code === 'string' && code.trim().length > 0) {
        params.append('code', code);
    }

    if (from_date) {
        if (!(from_date instanceof Date) || isNaN(from_date)) {
            return Promise.reject(new Error("web-nestre-api : admin-app-api.js GetReferralCodeStats() Invalid from_date: If provided, from_date must be a valid Date object."));
        }
        params.append('from_date', from_date.toISOString());
    }

    if (to_date) {
        if (!(to_date instanceof Date) || isNaN(to_date)) {
            return Promise.reject(new Error("web-nestre-api : admin-app-api.js GetReferralCodeStats() Invalid to_date: If provided, to_date must be a valid Date object."));
        }
        params.append('to_date', to_date.toISOString());
    }

    if (typeof aggregate_codes === 'boolean') {
        params.append('aggregate_codes', aggregate_codes);
    } else if (aggregate_codes != null) {
        return Promise.reject(new Error("web-nestre-api : admin-app-api.js GetReferralCodeStats() Invalid aggregate_codes: If provided, aggregate_codes must be a boolean."));
    }

    const queryString = params.toString();
    const endpoint = `admin/referral-code-stats${queryString ? `?${queryString}` : ''}`;

    return NestreApiManager.GetInstance().Request( HttpMethod.GET, endpoint );

  } //END GetReferralCodeStats Method

//#endregion

//#region PUBLIC - GET MEMBER REFERRAL CODE STATS

 /**
   * Retrieve referral code statistics for members of a specific organization, optionally filtered by date range.
   * 
   * @param {string} organization_id 
   * @param {Date | null} from_date
   * @param {Date | null} to_date
   * @param {boolean} aggregate_codes
   * @returns {Promise<ReferralCodeStats>}
   */
  //-----------------------------------------------------------------------//
  GetMemberReferralCodeStats(organization_id, from_date, to_date, aggregate_codes) 
  //-----------------------------------------------------------------------//
  { 

    const params = new URLSearchParams();

    // Check if the organization_id is a valid non-empty string.
    if (typeof organization_id !== 'string' || organization_id.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : admin-app-api.js GetMemberReferralCodeStats() Invalid organization_id: The organization_id must be a non-empty string."));
    }
    else
    {
      params.append( 'organization_id', organization_id );
    }

    if (from_date) {
        if (!(from_date instanceof Date) || isNaN(from_date)) {
            return Promise.reject(new Error("web-nestre-api : admin-app-api.js GetMemberReferralCodeStats() Invalid from_date: If provided, from_date must be a valid Date object."));
        }
        params.append('from_date', from_date.toISOString());
    }

    if (to_date) {
        if (!(to_date instanceof Date) || isNaN(to_date)) {
            return Promise.reject(new Error("web-nestre-api : admin-app-api.js GetMemberReferralCodeStats() Invalid to_date: If provided, to_date must be a valid Date object."));
        }
        params.append('to_date', to_date.toISOString());
    }

    if (typeof aggregate_codes === 'boolean') {
        params.append('aggregate_codes', aggregate_codes);
    } else if (aggregate_codes != null) {
        return Promise.reject(new Error("web-nestre-api : admin-app-api.js GetMemberReferralCodeStats() Invalid aggregate_codes: If provided, aggregate_codes must be a boolean."));
    }

    const queryString = params.toString();
    const endpoint = `admin/organization/${organization_id}/member-referral-code-stats?${queryString}`;

    return NestreApiManager.GetInstance().Request( HttpMethod.GET, endpoint );

  } //END GetMemberReferralCodeStats Method

//#endregion

} //END AdminAppApi