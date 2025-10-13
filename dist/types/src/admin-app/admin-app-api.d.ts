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
/**
 * Handles API Requests that access the 'admin-app' portion of the API
 */
export class AdminAppApi {
    /**
      * Generate a shortened URL using the Blink service.
      *
      * @param {string} url
      * @returns {Promise<string>}
      */
    ShortenUrl(url: string): Promise<string>;
    /**
      * Delete a user from the system by their email address.
      *
      * @param {string} email
      * @returns {Promise<>}
      */
    DeleteUserByEmail(email: string): Promise<any>;
    /**
      * Search for users by a search string (minimum 3 characters).
      *
      * @param {string} search_string
      * @returns {Promise<UsersMatchingSearch>}
      */
    SearchUsers(search_string: string): Promise<UsersMatchingSearch>;
    /**
      * Retrieve a user by their unique identifier.
      *
      * @param {string} user_id
      * @returns {Promise<UserData>}
      */
    GetUser(user_id: string): Promise<UserData>;
    /**
      * Update a user's profile information by their unique identifier.
      *
      * @param {string} user_id
      * @param {object} updateData
      * @returns {Promise<UserData>}
      */
    UpdateUser(user_id: string, updateData: object): Promise<UserData>;
    /**
      * Create a new organization with the provided details
      *
      * @param {CreateOrganizationData} orgData
      * @returns {Promise<NewlyCreatedOrganizationData>}
      */
    CreateOrganization(orgData: CreateOrganizationData): Promise<NewlyCreatedOrganizationData>;
    /**
      * Create a new organization with the provided details
      *
      * @param {string} organization_id
      * @param {UpdateOrganizationData} organization_update
      * @returns {Promise<UpdatedOrganization>}
      */
    UpdateOrganization(organization_id: string, organization_update: UpdateOrganizationData): Promise<UpdatedOrganization>;
    /**
      * Delete an organization by its unique identifier
      *
      * @param {string} organization_id
      * @returns {Promise<>}
      */
    DeleteOrganization(organization_id: string): Promise<any>;
    /**
      * Retrieve an organization by its unique identifier. Includes referral codes and team codes.
      *
      * @param {string} organization_id
      * @returns {Promise<RetrievedOrganizationData>}
      */
    GetOrganization(organization_id: string): Promise<RetrievedOrganizationData>;
    /**
      * Create a new team code for a specific organization.
      *
      * @param {string} organization_id
      * @param {TeamCode} team_code
      * @returns {Promise<string>}
      */
    CreateTeamCodeForOrganization(organization_id: string, team_code: TeamCode): Promise<string>;
    /**
      * Create a new referral code for a specific organization.
      *
      * @param {string} organization_id
      * @param {CreateReferralCode} referral_code
      * @returns {Promise<string>}
      */
    CreateReferralCodeForOrganization(organization_id: string, referral_code: CreateReferralCode): Promise<string>;
    /**
      * Create new members in an organization
      *
      * @param {string} organization_id
      * @param {OrganizationMembers} organization_members
      * @returns {Promise<string>}
      */
    CreateOrganizationMembers(organization_id: string, organization_members: OrganizationMembers): Promise<string>;
    /**
      * Delete members from an organization by their IDs
      *
      * @param {string} organization_id
      * @param {MemberIds} member_ids
      * @returns {Promise<string>}
      */
    DeleteOrganizationMembers(organization_id: string, member_ids: MemberIds): Promise<string>;
    /**
      * Retrieve user statistics for the app within a date range.
      *
      * @param {Date} from_date
      * @param {Date} to_date
      * @returns {Promise<UserStatsData>}
      */
    GetUserStats(from_date: Date, to_date: Date): Promise<UserStatsData>;
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
    GetReferralCodeStats(name: string | null, code: string | null, from_date: Date | null, to_date: Date | null, aggregate_codes: boolean): Promise<ReferralCodeStats>;
    /**
      * Retrieve referral code statistics for members of a specific organization, optionally filtered by date range.
      *
      * @param {string} organization_id
      * @param {Date | null} from_date
      * @param {Date | null} to_date
      * @param {boolean} aggregate_codes
      * @returns {Promise<ReferralCodeStats>}
      */
    GetMemberReferralCodeStats(organization_id: string, from_date: Date | null, to_date: Date | null, aggregate_codes: boolean): Promise<ReferralCodeStats>;
}
export type UsersMatchingSearch = import("./admin-app-types.js").UsersMatchingSearch;
export type UserData = import("./admin-app-types.js").UserData;
export type CreateOrganizationData = import("./admin-app-types.js").CreateOrganizationData;
export type NewlyCreatedOrganizationData = import("./admin-app-types.js").NewlyCreatedOrganizationData;
export type UpdateOrganizationData = import("./admin-app-types.js").UpdateOrganizationData;
export type UpdatedOrganization = import("./admin-app-types.js").UpdatedOrganization;
export type RetrievedOrganizationData = import("./admin-app-types.js").RetrievedOrganizationData;
export type TeamCode = import("./admin-app-types.js").TeamCode;
export type CreateReferralCode = import("./admin-app-types.js").AdminAppCreateReferralCode;
export type OrganizationMembers = import("./admin-app-types.js").AdminAppOrganizationMembers;
export type MemberIds = import("./admin-app-types.js").MemberIds;
export type UserStatsData = import("./admin-app-types.js").UserStatsData;
export type ReferralCodeStats = import("./admin-app-types.js").ReferralCodeStats;
