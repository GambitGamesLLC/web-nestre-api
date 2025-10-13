/**
 * @typedef {import('./assessment-types.js').RandomizedAssessmentQuestions } RandomizedAssessmentQuestions
 * @typedef {import('./assessment-types.js').AssessmentResult } AssessmentResult
 * @typedef {import('./assessment-types.js').AssessmentResponses } AssessmentResponses
*/
/**
 * Handles API Requests that access the 'assessment' portion of the API
 */
export class AssessmentApi {
    /**
      * Retrieve a randomized set of assessment questions for mindset evaluation
      *
      * @param {string} userId
      * @returns {Promise<RandomizedAssessmentQuestions>}
      */
    GetRandomizedAssessmentQuestions(userId: string): Promise<RandomizedAssessmentQuestions>;
    /**
      * Submit completed assessment responses and receive calculated mindset profile with personalized summaries
      *
      * @param {string} userId
      * @param {AssessmentResponses} assessmentResponses
      * @returns {Promise<AssessmentResult>}
      */
    SubmitAssessmentResponses(userId: string, assessmentResponses: AssessmentResponses): Promise<AssessmentResult>;
}
export type RandomizedAssessmentQuestions = import("./assessment-types.js").RandomizedAssessmentQuestions;
export type AssessmentResult = import("./assessment-types.js").AssessmentResult;
export type AssessmentResponses = import("./assessment-types.js").AssessmentResponses;
