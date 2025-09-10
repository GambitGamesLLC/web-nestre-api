/**
 * assessment-api.js
 * @file Handles API requests related to assessments.
 * @description Provides a singleton class, `AssessmentApi`. 
 * This file centralizes all cognitive-exercises specific API logic.
 * The `CognitiveExerciesApi` class here is created automatically by the NestreApiManager class during construction
 * @exports {AssessmentApi}
 * @requires {NestreApiManager} from '../nestre-api-manager.js'
 * @requires {Joi} for schema validation
 */


//#region IMPORTS

import {NestreApiManager, HttpMethod} from '../nestre-api-manager.js';
import { AssessmentResponsesSchema } from './assessment-schemas.js';

/**
 * @typedef {import('./assessment-types.js').RandomizedAssessmentQuestions } RandomizedAssessmentQuestions
 * @typedef {import('./assessment-types.js').AssessmentResult } AssessmentResult
 * @typedef {import('./assessment-types.js').AssessmentResponses } AssessmentResponses
*/

//#endregion

/**
 * Handles API Requests that access the 'assessment' portion of the API
 */
export class AssessmentApi 
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

//#region PUBLIC - GET RANDOMIZED ASSESSMENT QUESTIONS

 /**
   * Retrieve a randomized set of assessment questions for mindset evaluation
   * 
   * @param {string} userId
   * @returns {Promise<RandomizedAssessmentQuestions>}
   */
  //-----------------------------------------------------------------------//
  GetRandomizedAssessmentQuestions(userId) 
  //-----------------------------------------------------------------------//
  {
    // Check if the userId is a valid non-empty string.
    if (typeof userId !== 'string' || userId.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : assessment-api.js GetRandomizedAssessmentQuestions() Invalid userId: The userId must be a non-empty string."));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.GET, `user/${userId}/assessment/randomized-questions`);

  } //END GetRandomizedAssessmentQuestions Method

//#endregion

//#region PUBLIC - SUBMIT ASSESSMENT RESPONSES

 /**
   * Submit completed assessment responses and receive calculated mindset profile with personalized summaries
   * 
   * @param {string} userId
   * @param {AssessmentResponses} assessmentResponses
   * @returns {Promise<AssessmentResult>}
   */
  //-----------------------------------------------------------------------//
  SubmitAssessmentResponses(userId, assessmentResponses) 
  //-----------------------------------------------------------------------//
  {
    // Check if the userId is a valid non-empty string.
    if (typeof userId !== 'string' || userId.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : assessment-api.js SubmitAssessmentResponses() Invalid userId: The userId must be a non-empty string."));
    }

    // Validate the assessmentResponses object against the imported Joi schema
    const { error } = AssessmentResponsesSchema.validate(assessmentResponses);

    if (error) {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error(`web-nestre-api : assessment-api.js SubmitAssessmentResponses() Validation failed for assessmentResponses: ${error.details[0].message}`));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.POST, `user/${userId}/assessment`, assessmentResponses);

  } //END SubmitAssessmentResponses Method


//#endregion

} //END AssessmentApi
