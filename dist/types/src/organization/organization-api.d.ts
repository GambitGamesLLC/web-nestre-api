/**
 * @typedef {import('./organization-types.js').Organizations } Organizations
 * @typedef {import('./organization-types.js').OrganizationMembers } OrganizationMembers
 * @typedef {import('./organization-types.js').OrganizationUserDetails } OrganizationUserDetails
 * @typedef {import('./organization-types.js').OrganizationData } OrganizationData
*/
/**
 * Handles API Requests that access the 'organization' portion of the API
 */
export class OrganizationApi {
    /**
      * Retrieve all organizations along with their associated tags.
      *
      * @returns {Promise<Organizations>}
      */
    ListOrganizations(): Promise<Organizations>;
    /**
      * Retrieve all members in an organization with optional filtering by tag or email search string
      *
      * @param {string} organization_id
      * @param {string | null} tag
      * @param {string | null} email_search_string
      * @returns {Promise<OrganizationMembers>}
      */
    GetMembers(organization_id: string, tag: string | null, email_search_string: string | null): Promise<OrganizationMembers>;
    /**
      * Retrieve detailed user information for all registered users in an organization with optional filtering
      *
      * @param {string} organization_id
      * @param {string | null} tag
      * @param {string | null} email_search_string
      * @returns {Promise<OrganizationUserDetails>}
      */
    GetUserDetails(organization_id: string, tag: string | null, email_search_string: string | null): Promise<OrganizationUserDetails>;
    /**
      * Retrieve an organization by its unique identifier
      *
      * @param {string} organization_id
      * @returns {Promise<OrganizationData>}
      */
    GetOrganizationById(organization_id: string): Promise<OrganizationData>;
}
export type Organizations = import("./organization-types.js").Organizations;
export type OrganizationMembers = import("./organization-types.js").OrganizationMembers;
export type OrganizationUserDetails = import("./organization-types.js").OrganizationUserDetails;
export type OrganizationData = import("./organization-types.js").OrganizationData;
