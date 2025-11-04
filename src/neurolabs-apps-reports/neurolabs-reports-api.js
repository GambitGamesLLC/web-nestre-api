/**
 * neurolabs-reports-api.js
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