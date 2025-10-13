/**
 * @typedef {import('./assessment-search-types.js').UserIds } UserIds
 * @typedef {import('./assessment-search-types.js').AdditionalProperties } AdditionalProperties
 * @typedef {import('./assessment-search-types.js').AssessmentIds } AssessmentIds
 * @typedef {import('./assessment-search-types.js').AssessmentsWithResponses } AssessmentsWithResponses
 * @typedef {import('./assessment-search-types.js').UsersMatchingAssessmentCriteria } UsersMatchingAssessmentCriteria
*/
/**
 * Handles API Requests that access the 'assessment-search' portion of the API
 */
export class AssessmentSearchApi {
    /**
      * Given a list of user IDs, return the most recent assessment scores for each user.
      *
      * @param {UserIds} userIds
      * @returns {Promise<AdditionalProperties>}
      */
    GetLatestAssessmentsScoresForUsers(userIds: UserIds): Promise<AdditionalProperties>;
    /**
      * Given a list of assessment IDs, return the full assessment objects including responses.
      *
      * @param {AssessmentIds} assessmentIds
      * @returns {Promise<AssessmentsWithResponses>}
      */
    GetAssessmentsWithResponses(assessmentIds: AssessmentIds): Promise<AssessmentsWithResponses>;
    /**
      * Search for users and their assessments by first name, last name, email, or date of birth. Returns a list of users with their assessments.
      *
      * @param {string | null} firstname
      * @param {string | null} lastname
      * @param {string | null} email
      * @param {string | Date | null} date_of_birth
      * @param {string | Date | null} account_created_date_from
      * @param {string | Date | null} account_created_date_to
      * @returns {Promise<UsersMatchingAssessmentCriteria>}
      */
    GetUsersWithTheirAssessments(firstname: string | null, lastname: string | null, email: string | null, date_of_birth: string | Date | null, account_created_date_from: string | Date | null, account_created_date_to: string | Date | null): Promise<UsersMatchingAssessmentCriteria>;
}
export type UserIds = import("./assessment-search-types.js").UserIds;
export type AdditionalProperties = import("./assessment-search-types.js").AdditionalProperties;
export type AssessmentIds = import("./assessment-search-types.js").AssessmentIds;
export type AssessmentsWithResponses = import("./assessment-search-types.js").AssessmentsWithResponses;
export type UsersMatchingAssessmentCriteria = import("./assessment-search-types.js").UsersMatchingAssessmentCriteria;
