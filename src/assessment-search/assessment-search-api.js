/**
 * assessment-search-api.js
 * @file Handles API requests related to assessments.
 * @description Provides a singleton class, `AssessmentSearchApi`. 
 * This file centralizes all assessment search specific API logic.
 * The `AssessmentSearchApi` class here is created automatically by the NestreApiManager class during construction
 * @exports {AssessmentSearchApi}
 * @requires {NestreApiManager} from '../nestre-api-manager.js'
 * @requires {Joi} for schema validation
 */


//#region IMPORTS

import {NestreApiManager, HttpMethod} from '../nestre-api-manager.js';
import { UserIdsSchema, AssessmentIdsSchema, UserSearchSchema } from './assessment-search-schemas.js';

/**
 * @typedef {import('./assessment-search-types.js').UserIds } UserIds
 * @typedef {import('./assessment-search-types.js').AdditionalProperties } AdditionalProperties
 * @typedef {import('./assessment-search-types.js').AssessmentIds } AssessmentIds
 * @typedef {import('./assessment-search-types.js').AssessmentsWithResponses } AssessmentsWithResponses
 * @typedef {import('./assessment-search-types.js').UsersMatchingAssessmentCriteria } UsersMatchingAssessmentCriteria
*/

//#endregion

/**
 * Handles API Requests that access the 'assessment-search' portion of the API
 */
export class AssessmentSearchApi 
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

//#region PUBLIC - GET LATEST ASSESSMENTS SCORES FOR USERS

 /**
   * Given a list of user IDs, return the most recent assessment scores for each user.
   * 
   * @param {UserIds} userIds
   * @returns {Promise<AdditionalProperties>}
   */
  //-----------------------------------------------------------------------//
  GetLatestAssessmentsScoresForUsers(userIds) 
  //-----------------------------------------------------------------------//
  {
    // Validate the userIds object against the imported Joi schema
    const { error } = UserIdsSchema.validate(userIds);

    if (error) {
      // Return a rejected promise with a descriptive error.
      return Promise.reject(
        new Error(`web-nestre-api : assessment-search-api.js GetLatestAssessmentsScoresForUsers() Validation failed for userIds: ${error.details[0].message}`)
      );
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.POST, `search/latest-assessment-scores-for-group`, userIds);

  } //END GetLatestAssessmentsScoresForUsers Method


//#endregion

//#region PUBLIC - GET ASSESSMENTS WITH RESPONSES

 /**
   * Given a list of assessment IDs, return the full assessment objects including responses.
   * 
   * @param {AssessmentIds} assessmentIds
   * @returns {Promise<AssessmentsWithResponses>}
   */
  //-----------------------------------------------------------------------//
  GetAssessmentsWithResponses(assessmentIds) 
  //-----------------------------------------------------------------------//
  {
    // Validate the assessmentIds object against the imported Joi schema
    const { error } = AssessmentIdsSchema.validate(assessmentIds);

    if (error) {
      // Return a rejected promise with a descriptive error.
      return Promise.reject(
        new Error(`web-nestre-api : assessment-search-api.js GetAssessmentsWithResponses() Validation failed for assessmentIds: ${error.details[0].message}`)
      );
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.GET, `search/assessments-with-responses?assessment_ids=${assessmentIds.join('&assessment_ids=')}`);

  } //END GetAssessmentsWithResponses Method


//#endregion

//#region PUBLIC - GET USERS WITH THEIR ASSESSMENTS

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
  //-----------------------------------------------------------------------//
  GetUsersWithTheirAssessments(firstname, lastname, email, date_of_birth, account_created_date_from, account_created_date_to) 
  //-----------------------------------------------------------------------//
  {
    const searchParams = {
      firstname,
      lastname,
      email,
      date_of_birth,
      account_created_date_from,
      account_created_date_to
    };

    // Validate the search parameters object against the imported Joi schema
    const { error } = UserSearchSchema.validate(searchParams);

    if (error) {
      // Return a rejected promise with a descriptive error.
      return Promise.reject(
        new Error(`web-nestre-api : assessment-search-api.js GetUsersWithTheirAssessments() Validation failed: ${error.details[0].message}`)
      );
    }

    const query = new URLSearchParams();

    // Append parameters to the query string if they are provided and not empty.
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) {
        const paramValue = value instanceof Date ? value.toISOString() : value;
        query.append(key, paramValue);
      }
    });

    return NestreApiManager.GetInstance().Request( HttpMethod.GET, `search/user-assessments?${query.toString()}`);

  } //END GetUsersWithTheirAssessments Method


//#endregion

} //END AssessmentSearchApi Class