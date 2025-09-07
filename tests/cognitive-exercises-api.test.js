/**
 * cognitive-exercises-api.test.js
 * @file Unit tests for the CognitiveExercisesApi class.
 * @description This file provides a comprehensive test suite for the `cognitive-exercises-api.js` script,
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
 * @typedef {import('../src/cognitive-exercises/cognitive-exercises-types.js').CognitiveExercisesRecommendation } CognitiveExercisesRecommendation
 * @typedef {import('../src/cognitive-exercises/cognitive-exercises-types.js').CognitiveExerciseRecord } CognitiveExerciseRecord
 * @typedef {import('../src/cognitive-exercises/cognitive-exercises-types.js').RecordExerciseInteractionConfirmationMessage } RecordExerciseInteractionConfirmationMessage
 * @typedef {import('../src/cognitive-exercises/cognitive-exercises-types.js').UserProgressForExercise } UserProgressForExercise
 * @typedef {import('../src/cognitive-exercises/cognitive-exercises-types.js').CogexId } CogexId
 */

//#endregion

//#region DESCRIBE - cognitive-exercises-api.js - constructor()

describe( "cognitive-exercises-api.js constructor", ()=>
{
    it("should create an instance of the CognitiveExercisesApi object on NestreApiManager", ()=>
    {
        //Arrange
        NestreApiManager.instance = null;

        //Act
        const manager = NestreApiManager.GetInstance();

        //Assert
        expect( manager ).not.toBe( null );
        expect( manager.cognitiveExercisesApi ).not.toBe( null );
    });
});

//#endregion

//#region DESCRIBE - cognitive-exercises-api.js - GetCurrentLevelForCognitiveExercise()

describe( "cognitive-exercises-api.js GetCurrentLevelForCognitiveExercise()", () =>
{
    it('should fetch the current level for a cognitive exercise successfully', async () =>
    {
        // Arrange
        /** @type {CogexId} */
        const cogexId = 'IMPULSE-1';

        /** @type {UserProgressForExercise} */
        const mockProgress = {
            cogex_id: cogexId,
            current_level: 5,
            current_round: 2,
            is_baseline_training: false,
            completed_today: true
        };

        server.use(
            http.get(`${API_BASE_URL}/v${API_VERSION}/user/${USER_ID}/cogex/${cogexId}/progress`, () => {
                return HttpResponse.json(mockProgress, { status: 200 });
            })
        );

        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        manager.SetBaseUrl(API_BASE_URL);
        manager.SetApiVersion(API_VERSION);
        manager.SetAuthToken(AUTH_TOKEN);

        const cognitiveExercisesApi = manager.cognitiveExercisesApi;

        // Act
        const userProgress = await cognitiveExercisesApi.GetCurrentLevelForCognitiveExercise(USER_ID, cogexId);

        // Assert
        expect(userProgress).toEqual(mockProgress);
    });
});

//#endregion

//#region DESCRIBE - cognitive-exercises-api.js - GetCurrentLevelForCognitiveExercise() - Error Handling

describe("cognitive-exercises-api.js GetCurrentLevelForCognitiveExercise() - Error Handling", () => {

    /** @type {CogexId} */
    const validCogexId = 'ATTENTION-1';

    it('should throw an error if the passed in userId value is invalid', async()=>{
        //Arrange
        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        manager.SetBaseUrl(API_BASE_URL);
        manager.SetApiVersion(API_VERSION);
        manager.SetAuthToken(AUTH_TOKEN);

        const cognitiveExercisesApi = manager.cognitiveExercisesApi;

        // Act & Assert
        await expect(
            cognitiveExercisesApi.GetCurrentLevelForCognitiveExercise("", validCogexId)
        ).rejects.toThrow('web-nestre-api : cognitive-exercises-api.js GetCurrentLevelForCognitiveExercise() Invalid userId: The userId must be a non-empty string.');
        
        await expect(
            cognitiveExercisesApi.GetCurrentLevelForCognitiveExercise("   ", validCogexId)
        ).rejects.toThrow('web-nestre-api : cognitive-exercises-api.js GetCurrentLevelForCognitiveExercise() Invalid userId: The userId must be a non-empty string.');

        await expect(
            cognitiveExercisesApi.GetCurrentLevelForCognitiveExercise(null, validCogexId)
        ).rejects.toThrow('web-nestre-api : cognitive-exercises-api.js GetCurrentLevelForCognitiveExercise() Invalid userId: The userId must be a non-empty string.');
    });

    it('should throw an error if the passed in cogexId value is invalid', async()=>{
        //Arrange
        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        manager.SetBaseUrl(API_BASE_URL);
        manager.SetApiVersion(API_VERSION);
        manager.SetAuthToken(AUTH_TOKEN);

        const cognitiveExercisesApi = manager.cognitiveExercisesApi;

        const expectedError = 'web-nestre-api : cognitive-exercises-api.js GetCurrentLevelForCognitiveExercise() Invalid cogexId: The cogexId must be a non-empty string and one of the following: ATTENTION-1, IMPULSE-1, SALIENCE-1, MEMORY-1.';

        // Act & Assert
        await expect(
            cognitiveExercisesApi.GetCurrentLevelForCognitiveExercise(USER_ID, "")
        ).rejects.toThrow(expectedError);
        
        await expect(
            cognitiveExercisesApi.GetCurrentLevelForCognitiveExercise(USER_ID, "   ")
        ).rejects.toThrow(expectedError);

        await expect(
            cognitiveExercisesApi.GetCurrentLevelForCognitiveExercise(USER_ID, null)
        ).rejects.toThrow(expectedError);

        await expect(
            cognitiveExercisesApi.GetCurrentLevelForCognitiveExercise(USER_ID, "INVALID-ID")
        ).rejects.toThrow(expectedError);
    });

    it('should throw an error if the server returns an error', async () => {
        // Arrange
        const cogexId = 'MEMORY-1';
        server.use(
            http.get(`${API_BASE_URL}/v${API_VERSION}/user/${USER_ID}/cogex/${cogexId}/progress`, () => {
                return HttpResponse.json({ message: 'Progress not found' }, { status: 404 });
            })
        );

        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        manager.SetBaseUrl(API_BASE_URL);
        manager.SetApiVersion(API_VERSION);
        manager.SetAuthToken(AUTH_TOKEN);

        const cognitiveExercisesApi = manager.cognitiveExercisesApi;

        // Act & Assert
        await expect(
            cognitiveExercisesApi.GetCurrentLevelForCognitiveExercise(USER_ID, cogexId)
        ).rejects.toThrow('web-nestre-api : nestre-api-manager.js API Error: 404 - Progress not found');
    });
});

//#endregion

//#region DESCRIBE - cognitive-exercises-api.js - RecordCognitiveExerciseInteraction()

describe( "cognitive-exercises-api.js RecordCognitiveExerciseInteraction()", () =>
{
    it('should record a cognitive exercise interaction successfully', async () =>
    {
        // Arrange
        /** @type {CognitiveExerciseRecord} */
        const mockRecord = {
            cogex_id: "IMPULSE-1",
            user_id: USER_ID,
            context: "daily_workout",
            version: "alpha",
            level: 1,
            round_number: 1,
            correct_assertiveness: 10,
            incorrect_assertiveness: 2,
            correct_prudence: 8,
            incorrect_prudence: 1,
            no_answer: 1,
            average_reaction_time_correct: 500.5,
            average_reaction_time_incorrect: 750.2,
            score: 95,
            interaction_duration: 120.5,
            user_subscription_level_id: 1
        };

        /** @type {RecordExerciseInteractionConfirmationMessage} */
        const mockConfirmation = "Interaction recorded successfully.";

        server.use(
            http.post(`${API_BASE_URL}/v${API_VERSION}/user/${USER_ID}/cogex/interaction`, async ({ request }) => {
                const body = await request.json();
                expect(body).toEqual(mockRecord);
                return HttpResponse.json(mockConfirmation, { status: 200 });
            })
        );

        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        manager.SetBaseUrl(API_BASE_URL);
        manager.SetApiVersion(API_VERSION);
        manager.SetAuthToken(AUTH_TOKEN);

        const cognitiveExercisesApi = manager.cognitiveExercisesApi;

        // Act
        const confirmation = await cognitiveExercisesApi.RecordCognitiveExerciseInteraction(USER_ID, mockRecord);

        // Assert
        expect(confirmation).toEqual(mockConfirmation);
    });
});

//#endregion

//#region DESCRIBE - cognitive-exercises-api.js - RecordCognitiveExerciseInteraction() - Error Handling

describe("cognitive-exercises-api.js RecordCognitiveExerciseInteraction() - Error Handling", () => {

    /** @type {CognitiveExerciseRecord} */
    const validRecord = {
        cogex_id: "IMPULSE-1",
        user_id: USER_ID,
        context: "daily_workout",
        version: "alpha",
        level: 1,
        round_number: 1,
        correct_assertiveness: 10,
        incorrect_assertiveness: 2,
        correct_prudence: 8,
        incorrect_prudence: 1,
        no_answer: 1,
        average_reaction_time_correct: 500.5,
        average_reaction_time_incorrect: 750.2,
        score: 95,
        interaction_duration: 120.5,
        user_subscription_level_id: 1
    };

    it('should throw an error if the passed in userId value is invalid', async()=>{
        //Arrange
        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        manager.SetBaseUrl(API_BASE_URL);
        manager.SetApiVersion(API_VERSION);
        manager.SetAuthToken(AUTH_TOKEN);

        const cognitiveExercisesApi = manager.cognitiveExercisesApi;

        // Act & Assert
        await expect(
            cognitiveExercisesApi.RecordCognitiveExerciseInteraction("", validRecord)
        ).rejects.toThrow('web-nestre-api : cognitive-exercises-api.js RecordCognitiveExerciseInteraction() Invalid userId: The userId must be a non-empty string.');
        
        await expect(
            cognitiveExercisesApi.RecordCognitiveExerciseInteraction("   ", validRecord)
        ).rejects.toThrow('web-nestre-api : cognitive-exercises-api.js RecordCognitiveExerciseInteraction() Invalid userId: The userId must be a non-empty string.');

        await expect(
            cognitiveExercisesApi.RecordCognitiveExerciseInteraction(null, validRecord)
        ).rejects.toThrow('web-nestre-api : cognitive-exercises-api.js RecordCognitiveExerciseInteraction() Invalid userId: The userId must be a non-empty string.');
    });

    it('should throw an error if the cognitiveExerciseRecord is invalid', async () => {
        // Arrange
        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        manager.SetBaseUrl(API_BASE_URL);
        manager.SetApiVersion(API_VERSION);
        manager.SetAuthToken(AUTH_TOKEN);

        const cognitiveExercisesApi = manager.cognitiveExercisesApi;

        const invalidRecord = { ...validRecord, extra_field: 'invalid' };

        // Act & Assert
        await expect(
            cognitiveExercisesApi.RecordCognitiveExerciseInteraction(USER_ID, invalidRecord)
        ).rejects.toThrow('web-nestre-api : cognitive-exercises-api.js RecordCognitiveExerciseInteraction() Validation failed for cognitiveExerciseRecord: "extra_field" is not allowed');
    });

    it('should throw an error if the server returns an error', async () => {
        // Arrange
        server.use(
            http.post(`${API_BASE_URL}/v${API_VERSION}/user/${USER_ID}/cogex/interaction`, () => {
                return new HttpResponse(JSON.stringify({ detail: 'Internal Server Error' }), {
                    status: 500,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            })
        );

        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        manager.SetBaseUrl(API_BASE_URL);
        manager.SetApiVersion(API_VERSION);
        manager.SetAuthToken(AUTH_TOKEN);

        const cognitiveExercisesApi = manager.cognitiveExercisesApi;

        // Act & Assert
        await expect(
            cognitiveExercisesApi.RecordCognitiveExerciseInteraction(USER_ID, validRecord)
        ).rejects.toThrow('web-nestre-api : nestre-api-manager.js API Error (500). Internal server error.');
    });
});

//#endregion

//#region DESCRIBE - cognitive-exercises-api.js - GetCognitiveExercisesRecommendation()

describe( "cognitive-exercises-api.js GetCognitiveExercisesRecommendation()", () =>
{
    it('should fetch the recommended cognitive excercises successfully', async () =>
    {
        // Arrange
        /**
         * @type {CognitiveExercisesRecommendation}
         */
        const mockRecommendation = {
            cognitive_exercises: 
            [
                {
                    cogex_id: "IMPULSE-1",
                    version: "alpha",
                    is_available: true,
                    completed_today: false
                },
                {
                    cogex_id: "ATTENTION-1",
                    version: null,
                    is_available: false,
                    completed_today: false
                },
                {
                    cogex_id: "SALIENCE-1",
                    version: null,
                    is_available: false,
                    completed_today: false
                },
                {
                    cogex_id: "MEMORY-1",
                    version: null,
                    is_available: false,
                    completed_today: false
                }
            ]
        };

        server.use(
            http.get(`${API_BASE_URL}/v${API_VERSION}/user/${USER_ID}/cogex`, () => {
                return HttpResponse.json(mockRecommendation, 
                {
                    status: 200,
                    headers: 
                    {
                        'Content-Type': 'application/json',
                    },
                });
            })
        );

        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        manager.SetBaseUrl(API_BASE_URL);
        manager.SetApiVersion(API_VERSION);
        manager.SetAuthToken(AUTH_TOKEN);

        const cognitiveExercisesApi = manager.cognitiveExercisesApi;

        // Act
        // This call will trigger a real `fetch`, but MSW will intercept it
        // and return the mock data from our handler.
        /**
         * @type{CognitiveExercisesRecommendation}
         */
        const cognitiveExercisesRecommendation = await cognitiveExercisesApi.GetCognitiveExercisesRecommendation(USER_ID);

        // Assert
        expect(cognitiveExercisesRecommendation).not.toBeNull();
        expect(cognitiveExercisesRecommendation).toEqual(mockRecommendation);
    });
});

//#endregion

//#region DESCRIBE - cognitive-exercises-api.js - GetCognitiveExercisesRecommendation() - Error Handling

describe("cognitive-exercises-api.js GetCognitiveExercisesRecommendation() - Error Handling", () => {

    it('should throw an error if the passed in userId value is invalid', async()=>{
        //Arrange
        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        manager.SetBaseUrl(API_BASE_URL);
        manager.SetApiVersion(API_VERSION);
        manager.SetAuthToken(AUTH_TOKEN);

        const cognitiveExercisesApi = manager.cognitiveExercisesApi;

        // Act & Assert
        await expect(
            cognitiveExercisesApi.GetCognitiveExercisesRecommendation("")
        ).rejects.toThrow('web-nestre-api : cognitive-exercises-api.js GetCognitiveExercisesRecommendation() Invalid userId: The userId must be a non-empty string.');
        
        await expect(
            cognitiveExercisesApi.GetCognitiveExercisesRecommendation("   ")
        ).rejects.toThrow('web-nestre-api : cognitive-exercises-api.js GetCognitiveExercisesRecommendation() Invalid userId: The userId must be a non-empty string.');

        await expect(
            cognitiveExercisesApi.GetCognitiveExercisesRecommendation(null)
        ).rejects.toThrow('web-nestre-api : cognitive-exercises-api.js GetCognitiveExercisesRecommendation() Invalid userId: The userId must be a non-empty string.');
    });

    it('should throw an error if the user is not found', async () => {
        // Arrange
        const nonExistentUserId = 'non-existent-user-id';
        server.use(
            http.get(`${API_BASE_URL}/v${API_VERSION}/user/${nonExistentUserId}/cogex`, () => {
                return new HttpResponse(JSON.stringify({ message: 'User not found' }), {
                    status: 404,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            })
        );

        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        manager.SetBaseUrl(API_BASE_URL);
        manager.SetApiVersion(API_VERSION);
        manager.SetAuthToken(AUTH_TOKEN);

        const cognitiveExercisesApi = manager.cognitiveExercisesApi;

        // Act & Assert
        await expect(
            cognitiveExercisesApi.GetCognitiveExercisesRecommendation(nonExistentUserId)
        ).rejects.toThrow('web-nestre-api : nestre-api-manager.js API Error: 404 - User not found');
    });
});

//#endregion