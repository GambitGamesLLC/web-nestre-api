/**
 * @typedef {import('./user-search-types.js').UserProfileData} UserProfileData
 */
/**
 * Handles API Requests that access the 'user-search' portion of the API
 */
export class UserSearchApi {
    /**
      * Retrieve a user profile using an assessment ID.
      * @param {string} assessment_id
      * @returns {Promise<UserProfileData>}
      */
    GetUserProfileFromAssessment(assessment_id: string): Promise<UserProfileData>;
}
export type UserProfileData = import("./user-search-types.js").UserProfileData;
