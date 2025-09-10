/**
 * assessment-api.test.js
 * @file Unit tests for the AssessmentApi class.
 * @description This file provides a comprehensive test suite for the `assessment-api.js` script,
 * validating each method that interacts with the related API endpoints.
 * It uses a mock server using the `msw` library package to test request/response flows without hitting a real server.
 * @requires {NestreApiManager}
 * @requires {msw}
 */


//#region IMPORTS

// Import what we want to test
import { NestreApiManager } from '../src/nestre-api-manager.js';

//Import the BASE_URL from our environment-variables.js
import { API_BASE_URL } from '../examples/environment-variables.js';

//Import the API_VERSION from our environment-variables.js
import { API_VERSION } from '../examples/environment-variables.js';

//Import the AUTH_TOKEN from our environment-variables.js
import { AUTH_TOKEN } from '../examples/environment-variables.js';

//Import the USER_ID from our environment-variables.js
import { USER_ID } from '../examples/environment-variables.js';

import { server } from './mocks/server.js';
import { http, HttpResponse } from 'msw';

/**
 * @typedef {import('../src/assessment/assessment-types.js').RandomizedAssessmentQuestions } RandomizedAssessmentQuestions
 */
/**
 * @typedef {import('../src/assessment/assessment-types.js').AssessmentResult } AssessmentResult
 */

const validQuestionIds = [
    'bCZ7FSju7aQdUbNFQ7hfd', '3JTBUeVqS7mum6YErk0e0Y', '3CNimutSbaAnAucrVvyupx',
    '6ugahfvmQqZW9vohWKfvte', '5EnjhhFBhH7KammXba4xcO', '2Dku9IfXzhSmv0erxeVMV2',
    '4j72p4Jznmtpticm5atZno', '2MQ1V0J6QHrf9YjvdBKNab', '6DubZxJIfXNviGzfbITLCA',
    '3FQ1q8nghtsasGTzGgKC8I', '41UrVk57Uo7XgvAgUqOPLb', '6a6hUC7nw4n6XcvYnEJzUZ',
    'X5a4NftS4NxGXkoPStBrs', '45suVW99wXZmhKQruO8Lme', '6eGU3dzh9kiXR5n90mZgVN',
    'lSSWizDYp3JQOTrT9Jmpi', '30W6xGxvRZyFraQcXjojNy', 'nTOUJAPWlTSRDvEf5q5O3',
    '7F22NiUUeufVbZr0mpTetn', '1DwjIVJ3pFYzHYEZYlmCzB', '5c256kPsJKNzqt5vp5yIcM',
    '7FmYy5koR7SzrVie1bhDgi', '5ouWXQfAjExsx3FMFLc1yq', '52m7uUJaR1cTorbiQGATbS',
    '6Bmjw1yK7FbS5wjbMjRTFj'
];

//#endregion

//#region DESCRIBE - assessment-api.js - GetRandomizedAssessmentQuestions()

describe( "assessment-api.js GetRandomizedAssessmentQuestions()", () =>
{
    it('should fetch randomized assessment questions successfully', async () =>
    {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetApiVersion(API_VERSION);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);

        const assessmentApi = NestreApiManager.GetInstance().assessmentApi;

        // Act
        const questions = await assessmentApi.GetRandomizedAssessmentQuestions(USER_ID);

        // Assert
        expect(Array.isArray(questions)).toBe(true);
        expect(questions.length).toBeGreaterThan(0);
        expect(questions[0]).toHaveProperty('id');
        expect(questions[0]).toHaveProperty('title');
        expect(questions[0]).toHaveProperty('section');
    });

});

//#endregion

//#region DESCRIBE - assessment-api.js - SubmitAssessmentResponses()

describe("assessment-api.js SubmitAssessmentResponses()", () => {
    it('should submit assessment responses successfully and return an assessment result', async () => {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetApiVersion(API_VERSION);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);

        const assessmentApi = NestreApiManager.GetInstance().assessmentApi;
        const mockResponses = { responses: Array.from({ length: 25 }, (_, i) => ({ question_id: validQuestionIds[i], score: (i % 5) + 1 })) };

        // Act
        const result = await assessmentApi.SubmitAssessmentResponses(USER_ID, mockResponses);

        // Assert
        expect(result).toBeDefined();
        expect(result).toHaveProperty('id');
        expect(result).toHaveProperty('alpha');
        expect(result).toHaveProperty('cerebral');
        expect(result).toHaveProperty('prime');
        expect(result).toHaveProperty('created_at');
        expect(result).toHaveProperty('assessment_summary');
        expect(Array.isArray(result.assessment_summary)).toBe(true);
    });
});

//#endregion

//#region DESCRIBE - assessment-api.js - SubmitAssessmentResponses() - Error Handling

describe("assessment-api.js SubmitAssessmentResponses() - Error Handling", () => {
    beforeEach(() => {
        // Reset the singleton instance before each test
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetApiVersion(API_VERSION);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);
    });

    it('should throw an error if the passed in userId value is invalid', async () => {
        // Arrange
        const assessmentApi = NestreApiManager.GetInstance().assessmentApi;
        const mockResponses = { responses: [] };

        // Act & Assert
        await expect(
            assessmentApi.SubmitAssessmentResponses("", mockResponses)
        ).rejects.toThrow('web-nestre-api : assessment-api.js SubmitAssessmentResponses() Invalid userId: The userId must be a non-empty string.');
    });

    it('should throw an error if assessmentResponses does not contain 25 items', async () => {
        // Arrange
        const assessmentApi = NestreApiManager.GetInstance().assessmentApi;
        const invalidResponses = { responses: [{ question_id: validQuestionIds[0], score: 1 }] }; // Only 1 response

        // Act & Assert
        await expect(
            assessmentApi.SubmitAssessmentResponses(USER_ID, invalidResponses)
        ).rejects.toThrow('web-nestre-api : assessment-api.js SubmitAssessmentResponses() Validation failed for assessmentResponses: "responses" must contain 25 items');
    });

    it('should throw an error if assessmentResponses are invalid', async () => {
        // Arrange
        const assessmentApi = NestreApiManager.GetInstance().assessmentApi;
        const invalidResponses = { responses: [{ question_id: validQuestionIds[0] }] }; // Missing score

        // Act & Assert
        await expect(
            assessmentApi.SubmitAssessmentResponses(USER_ID, invalidResponses)
        ).rejects.toThrow('web-nestre-api : assessment-api.js SubmitAssessmentResponses() Validation failed for assessmentResponses: "responses[0].score" is required');
    });

    it('should throw an error if the user is not found', async () => {
        // Arrange
        const assessmentApi = NestreApiManager.GetInstance().assessmentApi;
        const mockResponses = { responses: Array.from({ length: 25 }, (_, i) => ({ question_id: validQuestionIds[i], score: (i % 5) + 1 })) };

        // Act & Assert
        await expect(
            assessmentApi.SubmitAssessmentResponses("non-existent-user", mockResponses)
        ).rejects.toThrow('web-nestre-api : nestre-api-manager.js API Error: 404 - User not found');
    });
});

//#endregion

//#region DESCRIBE - assessment-api.js - GetRandomizedAssessmentQuestions() - Error Handling

describe("assessment-api.js GetRandomizedAssessmentQuestions() - Error Handling", () => {

    it('should throw an error if the passed in userId value is invalid', async()=>{
        //Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetApiVersion(API_VERSION);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);

        const assessmentApi = NestreApiManager.GetInstance().assessmentApi;

        // Act & Assert
        await expect(
            assessmentApi.GetRandomizedAssessmentQuestions("")
        ).rejects.toThrow('web-nestre-api : assessment-api.js GetRandomizedAssessmentQuestions() Invalid userId: The userId must be a non-empty string.');
    });

    it('should throw an error if the user is not found', async () => {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetApiVersion(API_VERSION);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);

        const assessmentApi = NestreApiManager.GetInstance().assessmentApi;

        // Act & Assert
        await expect(
            assessmentApi.GetRandomizedAssessmentQuestions("non-existent-user")
        ).rejects.toThrow('web-nestre-api : nestre-api-manager.js API Error: 404 - User not found');
    });
});

//#endregion
