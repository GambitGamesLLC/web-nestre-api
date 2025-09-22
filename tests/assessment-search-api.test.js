/**
 * assessment-search-api.test.js
 * @file Unit tests for the AssessmentSearchApi class.
 * @description This file provides a comprehensive test suite for the `assessment-search-api.js` script,
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
 * @typedef {import('../src/assessment-search/assessment-search-types.js').UserIds } UserIds
 * @typedef {import('../src/assessment-search/assessment-search-types.js').AdditionalProperties } AdditionalProperties
 * @typedef {import('../src/assessment-search/assessment-search-types.js').AssessmentIds } AssessmentIds
 * @typedef {import('../src/assessment-search/assessment-search-types.js').AssessmentsWithResponses } AssessmentsWithResponses
 * @typedef {import('../src/assessment-search/assessment-search-types.js').UsersMatchingAssessmentCriteria } UsersMatchingAssessmentCriteria
*/

//#endregion

//#region DESCRIBE - assessment-search-api.js - constructor()

describe( "assessment-search-api.js constructor", ()=>
{
    it("should create an instance of the AssessmentSearchApi object", ()=>
    {

        //Arrange
         NestreApiManager.instance = null;

        //Act
        const manager = NestreApiManager.GetInstance();

        //Assert
        expect( manager.assessmentSearchApi ).not.toBe( null );
        expect( manager.assessmentSearchApi ).toBeDefined();

    })

});

//#endregion

//#region DESCRIBE - assessment-search-api.js - GetLatestAssessmentsScoresForUsers()

describe( "assessment-search-api.js GetLatestAssessmentsScoresForUsers()", () =>
{
    beforeEach(() => {
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetApiVersion(API_VERSION);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);
    });

    it('should fetch latest assessment scores for a group of users successfully', async () =>
    {
        // Arrange
        const assessmentSearchApi = NestreApiManager.GetInstance().assessmentSearchApi;
        const userIds = [USER_ID];

        // Act
        const scores = await assessmentSearchApi.GetLatestAssessmentsScoresForUsers(userIds);

        // Assert
        expect(scores).toBeDefined();
        expect(scores[USER_ID]).toBeDefined();
        expect(scores[USER_ID].alpha).toBe(0.8);
        expect(scores[USER_ID].cerebral).toBe(0.6);
        expect(scores[USER_ID].prime).toBe(0.9);
    });
});

//#endregion

//#region DESCRIBE - assessment-search-api.js - GetLatestAssessmentsScoresForUsers() - Error Handling

describe("assessment-search-api.js GetLatestAssessmentsScoresForUsers() - Error Handling", () => {

    beforeEach(() => {
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetApiVersion(API_VERSION);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);
    });

    it('should throw an error if userIds is not an array', async () => {
        // Arrange
        const assessmentSearchApi = NestreApiManager.GetInstance().assessmentSearchApi;

        // Act & Assert
        await expect(
            assessmentSearchApi.GetLatestAssessmentsScoresForUsers({})
        ).rejects.toThrow('web-nestre-api : assessment-search-api.js GetLatestAssessmentsScoresForUsers() Validation failed for userIds: "value" must be an array');
    });

    it('should throw an error if userIds is an empty array', async () => {
        // Arrange
        const assessmentSearchApi = NestreApiManager.GetInstance().assessmentSearchApi;

        // Act & Assert
        await expect(
            assessmentSearchApi.GetLatestAssessmentsScoresForUsers([])
        ).rejects.toThrow('web-nestre-api : assessment-search-api.js GetLatestAssessmentsScoresForUsers() Validation failed for userIds: "value" does not contain 1 required value(s)');
    });

    it('should throw an error if userIds contains non-string items', async () => {
        // Arrange
        const assessmentSearchApi = NestreApiManager.GetInstance().assessmentSearchApi;

        // Act & Assert
        await expect(
            assessmentSearchApi.GetLatestAssessmentsScoresForUsers([123])
        ).rejects.toThrow('web-nestre-api : assessment-search-api.js GetLatestAssessmentsScoresForUsers() Validation failed for userIds: "[0]" must be a string');
    });

    it('should throw an error if the API returns an error', async () => {
        // Arrange
        const assessmentSearchApi = NestreApiManager.GetInstance().assessmentSearchApi;
        const userIds = ['not-found-user'];

        // Act & Assert
        await expect(
            assessmentSearchApi.GetLatestAssessmentsScoresForUsers(userIds)
        ).rejects.toThrow('web-nestre-api : nestre-api-manager.js API Error: 404 - Scores not found for any user');
    });
});

//#endregion

//#region DESCRIBE - assessment-search-api.js - GetAssessmentsWithResponses()

describe( "assessment-search-api.js GetAssessmentsWithResponses()", () =>
{
    beforeEach(() => {
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetApiVersion(API_VERSION);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);
    });

    it('should fetch assessments with responses successfully', async () =>
    {
        // Arrange
        const assessmentSearchApi = NestreApiManager.GetInstance().assessmentSearchApi;
        const assessmentIds = ["3fa85f64-5717-4562-b3fc-2c963f66afa6"];

        // Act
        const assessments = await assessmentSearchApi.GetAssessmentsWithResponses(assessmentIds);

        // Assert
        expect(assessments).toBeDefined();
        expect(Array.isArray(assessments)).toBe(true);
        expect(assessments.length).toBe(1);
        expect(assessments[0].id).toBe("3fa85f64-5717-4562-b3fc-2c963f66afa6");
        expect(assessments[0].responses).toBeDefined();
        expect(assessments[0].responses.length).toBeGreaterThan(0);
    });
});

//#endregion

//#region DESCRIBE - assessment-search-api.js - GetAssessmentsWithResponses() - Error Handling

describe("assessment-search-api.js GetAssessmentsWithResponses() - Error Handling", () => {

    beforeEach(() => {
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetApiVersion(API_VERSION);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);
    });

    it('should throw an error if assessmentIds is not an array', async () => {
        // Arrange
        const assessmentSearchApi = NestreApiManager.GetInstance().assessmentSearchApi;

        // Act & Assert
        await expect(
            assessmentSearchApi.GetAssessmentsWithResponses({})
        ).rejects.toThrow('web-nestre-api : assessment-search-api.js GetAssessmentsWithResponses() Validation failed for assessmentIds: "value" must be an array');
    });

    it('should throw an error if assessmentIds is an empty array', async () => {
        // Arrange
        const assessmentSearchApi = NestreApiManager.GetInstance().assessmentSearchApi;

        // Act & Assert
        await expect(
            assessmentSearchApi.GetAssessmentsWithResponses([])
        ).rejects.toThrow('web-nestre-api : assessment-search-api.js GetAssessmentsWithResponses() Validation failed for assessmentIds: "value" does not contain 1 required value(s)');
    });

    it('should throw an error if assessmentIds contains non-string items', async () => {
        // Arrange
        const assessmentSearchApi = NestreApiManager.GetInstance().assessmentSearchApi;

        // Act & Assert
        await expect(
            assessmentSearchApi.GetAssessmentsWithResponses([123])
        ).rejects.toThrow('web-nestre-api : assessment-search-api.js GetAssessmentsWithResponses() Validation failed for assessmentIds: "[0]" must be a string');
    });

    it('should throw an error if the API returns an error', async () => {
        // Arrange
        const assessmentSearchApi = NestreApiManager.GetInstance().assessmentSearchApi;
        const assessmentIds = ['not-found-assessment'];

        // Act & Assert
        await expect(
            assessmentSearchApi.GetAssessmentsWithResponses(assessmentIds)
        ).rejects.toThrow('web-nestre-api : nestre-api-manager.js API Error: 404 - Assessments not found');
    });
});

//#endregion

//#region DESCRIBE - assessment-search-api.js - GetUsersWithTheirAssessments()

describe("assessment-search-api.js GetUsersWithTheirAssessments()", () => {
    beforeEach(() => {
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetApiVersion(API_VERSION);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);
    });

    it('should fetch users with their assessments successfully', async () => {
        // Arrange
        const assessmentSearchApi = NestreApiManager.GetInstance().assessmentSearchApi;
        const searchParams = {
            firstname: "Derrick",
            lastname: null,
            email: null,
            date_of_birth: null,
            account_created_date_from: null,
            account_created_date_to: null
        };

        // Act
        const users = await assessmentSearchApi.GetUsersWithTheirAssessments(
            searchParams.firstname,
            searchParams.lastname,
            searchParams.email,
            searchParams.date_of_birth,
            searchParams.account_created_date_from,
            searchParams.account_created_date_to
        );

        // Assert
        expect(users).toBeDefined();
        expect(Array.isArray(users)).toBe(true);
        expect(users.length).toBe(1);
        expect(users[0].id).toBe(USER_ID);
        expect(users[0].name).toBe("Derrick Barra");
        expect(users[0].assessments).toBeDefined();
        expect(users[0].assessments.length).toBeGreaterThan(0);
    });
});

//#endregion

//#region DESCRIBE - assessment-search-api.js - GetUsersWithTheirAssessments() - Error Handling

describe("assessment-search-api.js GetUsersWithTheirAssessments() - Error Handling", () => {
    beforeEach(() => {
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetApiVersion(API_VERSION);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);
    });

    it('should throw an error if no search parameters are provided', async () => {
        // Arrange
        const assessmentSearchApi = NestreApiManager.GetInstance().assessmentSearchApi;

        // Act & Assert
        await expect(
            assessmentSearchApi.GetUsersWithTheirAssessments(null, null, null, null, null, null)
        ).rejects.toThrow('web-nestre-api : assessment-search-api.js GetUsersWithTheirAssessments() Validation failed: At least one search parameter (firstname, lastname, email, date_of_birth, account_created_date_from, or account_created_date_to) must be provided.');
    });

    it('should throw an error if the API returns an error', async () => {
        // Arrange
        const assessmentSearchApi = NestreApiManager.GetInstance().assessmentSearchApi;

        // Act & Assert
        await expect(
            assessmentSearchApi.GetUsersWithTheirAssessments('not-found', null, null, null, null, null)
        ).rejects.toThrow('web-nestre-api : nestre-api-manager.js API Error: 404 - No users found matching the criteria');
    });
});

//#endregion