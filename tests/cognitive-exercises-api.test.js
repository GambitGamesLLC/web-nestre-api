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
 * @typedef {import('../src/cognitive-exercises/cognitive-exercises-types.js').InteractionsForCurrentSession } InteractionsForCurrentSession
 * @typedef {import('../src/cognitive-exercises/cognitive-exercises-types.js').CurrentStatisticsForExercises } CurrentStatisticsForExercises
 * @typedef {import('../src/cognitive-exercises/cognitive-exercises-types.js').CurrentRoundStatisticsForExercise } CurrentRoundStatisticsForExercise
 * @typedef {import('../src/cognitive-exercises/cognitive-exercises-types.js').NBackDifficulty } NBackDifficulty
 * @typedef {import('../src/cognitive-exercises/cognitive-exercises-types.js').NBackSequence } NBackSequence
 * @typedef {import('../src/cognitive-exercises/cognitive-exercises-types.js').NBackFrame } NBackFrame
 * @typedef {import('../src/cognitive-exercises/cognitive-exercises-types.js').CatchMeDifficulty } CatchMeDifficulty
 * @typedef {import('../src/cognitive-exercises/cognitive-exercises-types.js').CatchMeSequence } CatchMeSequence
 * @typedef {import('../src/cognitive-exercises/cognitive-exercises-types.js').CatchMeVersion } CatchMeVersion
 * @typedef {import('../src/cognitive-exercises/cognitive-exercises-types.js').CatchMeCriteriaType } CatchMeCriteriaType
 * @typedef {import('../src/cognitive-exercises/cognitive-exercises-types.js').SalienceDifficulty } SalienceDifficulty
 * @typedef {import('../src/cognitive-exercises/cognitive-exercises-types.js').SalienceSequence } SalienceSequence
 * @typedef {import('../src/cognitive-exercises/cognitive-exercises-types.js').SalienceVersion } SalienceVersion
 * @typedef {import('../src/cognitive-exercises/cognitive-exercises-types.js').ImpulseDifficulty } ImpulseDifficulty
 * @typedef {import('../src/cognitive-exercises/cognitive-exercises-types.js').ImpulseSequence } ImpulseSequence
 * @typedef {import('../src/cognitive-exercises/cognitive-exercises-types.js').ImpulseVersion } ImpulseVersion
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

//#region DESCRIBE - cognitive-exercises-api.js - GetImpulseDifficulty()

describe( "cognitive-exercises-api.js GetImpulseDifficulty()", () =>
{
    it('should fetch the Impulse difficulty successfully', async () =>
    {
        // Arrange
        const level = 1;
        /** @type {ImpulseDifficulty} */
        const mockDifficulty = {
            level_progression_score: 85,
            level_progression_sessions: 2,
            spawn_rate: 1000,
            start_speed: 1.5,
            fall_speed: 0.1
        };

        server.use(
            http.get(`${API_BASE_URL}/v${API_VERSION}/user/${USER_ID}/cogex/impulse/difficulty`, ({request}) => {
                const url = new URL(request.url);
                expect(url.searchParams.get('level')).toBe(level.toString());
                return HttpResponse.json(mockDifficulty, { status: 200 });
            })
        );

        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        manager.SetBaseUrl(API_BASE_URL);
        manager.SetApiVersion(API_VERSION);
        manager.SetAuthToken(AUTH_TOKEN);

        const cognitiveExercisesApi = manager.cognitiveExercisesApi;

        // Act
        const difficulty = await cognitiveExercisesApi.GetImpulseDifficulty(USER_ID, level);

        // Assert
        expect(difficulty).toEqual(mockDifficulty);
    });
});

//#endregion

//#region DESCRIBE - cognitive-exercises-api.js - GetImpulseDifficulty() - Error Handling

describe("cognitive-exercises-api.js GetImpulseDifficulty() - Error Handling", () => {

    const validLevel = 1;

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
            cognitiveExercisesApi.GetImpulseDifficulty("", validLevel)
        ).rejects.toThrow('web-nestre-api : cognitive-exercises-api.js GetImpulseDifficulty() Invalid userId: The userId must be a non-empty string.');
        
        await expect(
            cognitiveExercisesApi.GetImpulseDifficulty("   ", validLevel)
        ).rejects.toThrow('web-nestre-api : cognitive-exercises-api.js GetImpulseDifficulty() Invalid userId: The userId must be a non-empty string.');

        await expect(
            cognitiveExercisesApi.GetImpulseDifficulty(null, validLevel)
        ).rejects.toThrow('web-nestre-api : cognitive-exercises-api.js GetImpulseDifficulty() Invalid userId: The userId must be a non-empty string.');
    });

    it('should throw an error if the passed in level value is invalid', async()=>{
        //Arrange
        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        manager.SetBaseUrl(API_BASE_URL);
        manager.SetApiVersion(API_VERSION);
        manager.SetAuthToken(AUTH_TOKEN);

        const cognitiveExercisesApi = manager.cognitiveExercisesApi;

        const expectedError = "web-nestre-api : cognitive-exercises-api.js GetImpulseDifficulty() Invalid level: The level must be a positive number that's greater than or equal to 1";

        // Act & Assert
        await expect(cognitiveExercisesApi.GetImpulseDifficulty(USER_ID, 0)).rejects.toThrow(expectedError);
        await expect(cognitiveExercisesApi.GetImpulseDifficulty(USER_ID, -1)).rejects.toThrow(expectedError);
        await expect(cognitiveExercisesApi.GetImpulseDifficulty(USER_ID, null)).rejects.toThrow(expectedError);
        await expect(cognitiveExercisesApi.GetImpulseDifficulty(USER_ID, "a")).rejects.toThrow(expectedError);
    });

    it('should throw an error if the server returns an error', async () => {
        // Arrange
        const level = 1;
        server.use(
            http.get(`${API_BASE_URL}/v${API_VERSION}/user/${USER_ID}/cogex/impulse/difficulty`, () => {
                return HttpResponse.json({ message: 'Difficulty not found' }, { status: 404 });
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
            cognitiveExercisesApi.GetImpulseDifficulty(USER_ID, level)
        ).rejects.toThrow('web-nestre-api : nestre-api-manager.js API Error: 404 - Difficulty not found');
    });
});

//#endregion

//#region DESCRIBE - cognitive-exercises-api.js - GetImpulseSequence()

describe( "cognitive-exercises-api.js GetImpulseSequence()", () =>
{
    it('should fetch the Impulse sequence successfully', async () =>
    {
        // Arrange
        const level = 1;
        const roundNumber = 1;
        /** @type {ImpulseVersion} */
        const version = 'alpha';
        /** @type {ImpulseSequence} */
        const mockSequence = [
            ["11b"],["23b"],["41w","22w"],["11b","21w"],["14b"],["33w"],["31b","13b"]
        ];

        server.use(
            http.get(`${API_BASE_URL}/v${API_VERSION}/user/${USER_ID}/cogex/impulse/sequence`, ({request}) => {
                const url = new URL(request.url);
                expect(url.searchParams.get('level')).toBe(level.toString());
                expect(url.searchParams.get('round_number')).toBe(roundNumber.toString());
                expect(url.searchParams.get('version')).toBe(version);
                return HttpResponse.json(mockSequence, { status: 200 });
            })
        );

        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        manager.SetBaseUrl(API_BASE_URL);
        manager.SetApiVersion(API_VERSION);
        manager.SetAuthToken(AUTH_TOKEN);

        const cognitiveExercisesApi = manager.cognitiveExercisesApi;

        // Act
        const sequence = await cognitiveExercisesApi.GetImpulseSequence(USER_ID, level, roundNumber, version);

        // Assert
        expect(sequence).toEqual(mockSequence);
    });
});

//#endregion

//#region DESCRIBE - cognitive-exercises-api.js - GetImpulseSequence() - Error Handling

describe("cognitive-exercises-api.js GetImpulseSequence() - Error Handling", () => {

    const validLevel = 1;
    const validRoundNumber = 1;
    /** @type {ImpulseVersion} */
    const validVersion = 'alpha';

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
            cognitiveExercisesApi.GetImpulseSequence("", validLevel, validRoundNumber, validVersion)
        ).rejects.toThrow('web-nestre-api : cognitive-exercises-api.js GetImpulseSequence() Invalid userId: The userId must be a non-empty string.');
        
        await expect(
            cognitiveExercisesApi.GetImpulseSequence("   ", validLevel, validRoundNumber, validVersion)
        ).rejects.toThrow('web-nestre-api : cognitive-exercises-api.js GetImpulseSequence() Invalid userId: The userId must be a non-empty string.');

        await expect(
            cognitiveExercisesApi.GetImpulseSequence(null, validLevel, validRoundNumber, validVersion)
        ).rejects.toThrow('web-nestre-api : cognitive-exercises-api.js GetImpulseSequence() Invalid userId: The userId must be a non-empty string.');
    });

    it('should throw an error if the passed in level value is invalid', async()=>{
        //Arrange
        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        manager.SetBaseUrl(API_BASE_URL);
        manager.SetApiVersion(API_VERSION);
        manager.SetAuthToken(AUTH_TOKEN);

        const cognitiveExercisesApi = manager.cognitiveExercisesApi;

        const expectedError = "web-nestre-api : cognitive-exercises-api.js GetImpulseSequence() Invalid level: The level must be a positive number that's greater than or equal to 1";

        // Act & Assert
        await expect(cognitiveExercisesApi.GetImpulseSequence(USER_ID, 0, validRoundNumber, validVersion)).rejects.toThrow(expectedError);
        await expect(cognitiveExercisesApi.GetImpulseSequence(USER_ID, -1, validRoundNumber, validVersion)).rejects.toThrow(expectedError);
        await expect(cognitiveExercisesApi.GetImpulseSequence(USER_ID, null, validRoundNumber, validVersion)).rejects.toThrow(expectedError);
        await expect(cognitiveExercisesApi.GetImpulseSequence(USER_ID, "a", validRoundNumber, validVersion)).rejects.toThrow(expectedError);
    });

    it('should throw an error if the passed in roundNumber value is invalid', async()=>{
        //Arrange
        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        manager.SetBaseUrl(API_BASE_URL);
        manager.SetApiVersion(API_VERSION);
        manager.SetAuthToken(AUTH_TOKEN);

        const cognitiveExercisesApi = manager.cognitiveExercisesApi;

        const expectedError = "web-nestre-api : cognitive-exercises-api.js GetImpulseSequence() Invalid roundNumber: The roundNumber must be a positive number that's between 1 and 5";

        // Act & Assert
        await expect(cognitiveExercisesApi.GetImpulseSequence(USER_ID, validLevel, 0, validVersion)).rejects.toThrow(expectedError);
        await expect(cognitiveExercisesApi.GetImpulseSequence(USER_ID, validLevel, 6, validVersion)).rejects.toThrow(expectedError);
        await expect(cognitiveExercisesApi.GetImpulseSequence(USER_ID, validLevel, null, validVersion)).rejects.toThrow(expectedError);
        await expect(cognitiveExercisesApi.GetImpulseSequence(USER_ID, validLevel, "a", validVersion)).rejects.toThrow(expectedError);
    });

    it('should throw an error if the passed in version value is invalid', async()=>{
        //Arrange
        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        manager.SetBaseUrl(API_BASE_URL);
        manager.SetApiVersion(API_VERSION);
        manager.SetAuthToken(AUTH_TOKEN);

        const cognitiveExercisesApi = manager.cognitiveExercisesApi;

        const expectedError = "web-nestre-api : cognitive-exercises-api.js GetImpulseSequence() Invalid version: The version must be a non-empty string and one of the following: 'alpha', 'cerebral', 'prime'.";

        // Act & Assert
        await expect(cognitiveExercisesApi.GetImpulseSequence(USER_ID, validLevel, validRoundNumber, "")).rejects.toThrow(expectedError);
        await expect(cognitiveExercisesApi.GetImpulseSequence(USER_ID, validLevel, validRoundNumber, "   ")).rejects.toThrow(expectedError);
        await expect(cognitiveExercisesApi.GetImpulseSequence(USER_ID, validLevel, validRoundNumber, null)).rejects.toThrow(expectedError);
        await expect(cognitiveExercisesApi.GetImpulseSequence(USER_ID, validLevel, validRoundNumber, "invalid-version")).rejects.toThrow(expectedError);
    });

    it('should throw an error if the server returns an error', async () => {
        // Arrange
        server.use(
            http.get(`${API_BASE_URL}/v${API_VERSION}/user/${USER_ID}/cogex/impulse/sequence`, () => {
                return HttpResponse.json({ detail: 'Sequence generation failed' }, { status: 500 });
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
            cognitiveExercisesApi.GetImpulseSequence(USER_ID, validLevel, validRoundNumber, validVersion)
        ).rejects.toThrow('web-nestre-api : nestre-api-manager.js API Error (500). Internal server error.');
    });
});

//#endregion

//#region DESCRIBE - cognitive-exercises-api.js - GetSalienceDifficulty()

describe( "cognitive-exercises-api.js GetSalienceDifficulty()", () =>
{
    it('should fetch the Salience difficulty successfully', async () =>
    {
        // Arrange
        const level = 1;
        /** @type {SalienceDifficulty} */
        const mockDifficulty = {
            level_progression_score: 85,
            level_progression_sessions: 2,
            sample_exposure: 1500,
            multispawn_exposure: 3000
        };

        server.use(
            http.get(`${API_BASE_URL}/v${API_VERSION}/user/${USER_ID}/cogex/salience/difficulty`, ({request}) => {
                const url = new URL(request.url);
                expect(url.searchParams.get('level')).toBe(level.toString());
                return HttpResponse.json(mockDifficulty, { status: 200 });
            })
        );

        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        manager.SetBaseUrl(API_BASE_URL);
        manager.SetApiVersion(API_VERSION);
        manager.SetAuthToken(AUTH_TOKEN);

        const cognitiveExercisesApi = manager.cognitiveExercisesApi;

        // Act
        const difficulty = await cognitiveExercisesApi.GetSalienceDifficulty(USER_ID, level);

        // Assert
        expect(difficulty).toEqual(mockDifficulty);
    });
});

//#endregion

//#region DESCRIBE - cognitive-exercises-api.js - GetSalienceDifficulty() - Error Handling

describe("cognitive-exercises-api.js GetSalienceDifficulty() - Error Handling", () => {

    const validLevel = 1;

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
            cognitiveExercisesApi.GetSalienceDifficulty("", validLevel)
        ).rejects.toThrow('web-nestre-api : cognitive-exercises-api.js GetSalienceDifficulty() Invalid userId: The userId must be a non-empty string.');
        
        await expect(
            cognitiveExercisesApi.GetSalienceDifficulty("   ", validLevel)
        ).rejects.toThrow('web-nestre-api : cognitive-exercises-api.js GetSalienceDifficulty() Invalid userId: The userId must be a non-empty string.');

        await expect(
            cognitiveExercisesApi.GetSalienceDifficulty(null, validLevel)
        ).rejects.toThrow('web-nestre-api : cognitive-exercises-api.js GetSalienceDifficulty() Invalid userId: The userId must be a non-empty string.');
    });

    it('should throw an error if the passed in level value is invalid', async()=>{
        //Arrange
        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        manager.SetBaseUrl(API_BASE_URL);
        manager.SetApiVersion(API_VERSION);
        manager.SetAuthToken(AUTH_TOKEN);

        const cognitiveExercisesApi = manager.cognitiveExercisesApi;

        const expectedError = "web-nestre-api : cognitive-exercises-api.js GetSalienceDifficulty() Invalid level: The level must be a positive number that's greater than or equal to 1";

        // Act & Assert
        await expect(cognitiveExercisesApi.GetSalienceDifficulty(USER_ID, 0)).rejects.toThrow(expectedError);
        await expect(cognitiveExercisesApi.GetSalienceDifficulty(USER_ID, -1)).rejects.toThrow(expectedError);
        await expect(cognitiveExercisesApi.GetSalienceDifficulty(USER_ID, null)).rejects.toThrow(expectedError);
        await expect(cognitiveExercisesApi.GetSalienceDifficulty(USER_ID, "a")).rejects.toThrow(expectedError);
    });

    it('should throw an error if the server returns an error', async () => {
        // Arrange
        const level = 1;
        server.use(
            http.get(`${API_BASE_URL}/v${API_VERSION}/user/${USER_ID}/cogex/salience/difficulty`, () => {
                return HttpResponse.json({ message: 'Difficulty not found' }, { status: 404 });
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
            cognitiveExercisesApi.GetSalienceDifficulty(USER_ID, level)
        ).rejects.toThrow('web-nestre-api : nestre-api-manager.js API Error: 404 - Difficulty not found');
    });
});

//#endregion

//#region DESCRIBE - cognitive-exercises-api.js - GetSalienceSequence()

describe( "cognitive-exercises-api.js GetSalienceSequence()", () =>
{
    it('should fetch the Salience sequence successfully', async () =>
    {
        // Arrange
        const level = 1;
        /** @type {SalienceVersion} */
        const version = 'alpha';
        /** @type {SalienceSequence} */
        const mockSequence = [
            { "shape": ["1132", "2134", "1313"] },
            { "color": ["2214", "2231", "1214"] }
        ];

        server.use(
            http.get(`${API_BASE_URL}/v${API_VERSION}/user/${USER_ID}/cogex/salience/sequence`, ({request}) => {
                const url = new URL(request.url);
                expect(url.searchParams.get('level')).toBe(level.toString());
                expect(url.searchParams.get('version')).toBe(version);
                return HttpResponse.json(mockSequence, { status: 200 });
            })
        );

        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        manager.SetBaseUrl(API_BASE_URL);
        manager.SetApiVersion(API_VERSION);
        manager.SetAuthToken(AUTH_TOKEN);

        const cognitiveExercisesApi = manager.cognitiveExercisesApi;

        // Act
        const sequence = await cognitiveExercisesApi.GetSalienceSequence(USER_ID, level, version);

        // Assert
        expect(sequence).toEqual(mockSequence);
    });
});

//#endregion

//#region DESCRIBE - cognitive-exercises-api.js - GetSalienceSequence() - Error Handling

describe("cognitive-exercises-api.js GetSalienceSequence() - Error Handling", () => {

    const validLevel = 1;
    /** @type {SalienceVersion} */
    const validVersion = 'alpha';

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
            cognitiveExercisesApi.GetSalienceSequence("", validLevel, validVersion)
        ).rejects.toThrow('web-nestre-api : cognitive-exercises-api.js GetSalienceSequence() Invalid userId: The userId must be a non-empty string.');
        
        await expect(
            cognitiveExercisesApi.GetSalienceSequence("   ", validLevel, validVersion)
        ).rejects.toThrow('web-nestre-api : cognitive-exercises-api.js GetSalienceSequence() Invalid userId: The userId must be a non-empty string.');

        await expect(
            cognitiveExercisesApi.GetSalienceSequence(null, validLevel, validVersion)
        ).rejects.toThrow('web-nestre-api : cognitive-exercises-api.js GetSalienceSequence() Invalid userId: The userId must be a non-empty string.');
    });

    it('should throw an error if the passed in level value is invalid', async()=>{
        //Arrange
        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        manager.SetBaseUrl(API_BASE_URL);
        manager.SetApiVersion(API_VERSION);
        manager.SetAuthToken(AUTH_TOKEN);

        const cognitiveExercisesApi = manager.cognitiveExercisesApi;

        const expectedError = "web-nestre-api : cognitive-exercises-api.js GetSalienceSequence() Invalid level: The level must be a positive number that's greater than or equal to 1";

        // Act & Assert
        await expect(cognitiveExercisesApi.GetSalienceSequence(USER_ID, 0, validVersion)).rejects.toThrow(expectedError);
        await expect(cognitiveExercisesApi.GetSalienceSequence(USER_ID, -1, validVersion)).rejects.toThrow(expectedError);
        await expect(cognitiveExercisesApi.GetSalienceSequence(USER_ID, null, validVersion)).rejects.toThrow(expectedError);
        await expect(cognitiveExercisesApi.GetSalienceSequence(USER_ID, "a", validVersion)).rejects.toThrow(expectedError);
    });

    it('should throw an error if the passed in version value is invalid', async()=>{
        //Arrange
        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        manager.SetBaseUrl(API_BASE_URL);
        manager.SetApiVersion(API_VERSION);
        manager.SetAuthToken(AUTH_TOKEN);

        const cognitiveExercisesApi = manager.cognitiveExercisesApi;

        const expectedError = "web-nestre-api : cognitive-exercises-api.js GetSalienceSequence() Invalid version: The version must be a non-empty string and one of the following: 'alpha', 'cerebral'.";

        // Act & Assert
        await expect(cognitiveExercisesApi.GetSalienceSequence(USER_ID, validLevel, "")).rejects.toThrow(expectedError);
        await expect(cognitiveExercisesApi.GetSalienceSequence(USER_ID, validLevel, "   ")).rejects.toThrow(expectedError);
        await expect(cognitiveExercisesApi.GetSalienceSequence(USER_ID, validLevel, null)).rejects.toThrow(expectedError);
        await expect(cognitiveExercisesApi.GetSalienceSequence(USER_ID, validLevel, "invalid-version")).rejects.toThrow(expectedError);
    });

    it('should throw an error if the server returns an error', async () => {
        // Arrange
        server.use(
            http.get(`${API_BASE_URL}/v${API_VERSION}/user/${USER_ID}/cogex/salience/sequence`, () => {
                return HttpResponse.json({ detail: 'Sequence generation failed' }, { status: 500 });
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
            cognitiveExercisesApi.GetSalienceSequence(USER_ID, validLevel, validVersion)
        ).rejects.toThrow('web-nestre-api : nestre-api-manager.js API Error (500). Internal server error.');
    });
});

//#endregion

//#region DESCRIBE - cognitive-exercises-api.js - GetCatchMeDifficulty()

describe( "cognitive-exercises-api.js GetCatchMeDifficulty()", () =>
{
    it('should fetch the CatchMe difficulty successfully', async () =>
    {
        // Arrange
        const level = 3;
        /** @type {CatchMeDifficulty} */
        const mockDifficulty = {
            level_progression_score: 90,
            level_progression_sessions: 2,
            insect_lifetime: 2000,
            spawn_rate: 1000,
            synchronous_spawns: 2
        };

        server.use(
            http.get(`${API_BASE_URL}/v${API_VERSION}/user/${USER_ID}/cogex/catchme/difficulty`, ({request}) => {
                const url = new URL(request.url);
                expect(url.searchParams.get('level')).toBe(level.toString());
                return HttpResponse.json(mockDifficulty, { status: 200 });
            })
        );

        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        manager.SetBaseUrl(API_BASE_URL);
        manager.SetApiVersion(API_VERSION);
        manager.SetAuthToken(AUTH_TOKEN);

        const cognitiveExercisesApi = manager.cognitiveExercisesApi;

        // Act
        const difficulty = await cognitiveExercisesApi.GetCatchMeDifficulty(USER_ID, level);

        // Assert
        expect(difficulty).toEqual(mockDifficulty);
    });
});

//#endregion

//#region DESCRIBE - cognitive-exercises-api.js - GetCatchMeDifficulty() - Error Handling

describe("cognitive-exercises-api.js GetCatchMeDifficulty() - Error Handling", () => {

    const validLevel = 1;

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
            cognitiveExercisesApi.GetCatchMeDifficulty("", validLevel)
        ).rejects.toThrow('web-nestre-api : cognitive-exercises-api.js GetCatchMeDifficulty() Invalid userId: The userId must be a non-empty string.');
        
        await expect(
            cognitiveExercisesApi.GetCatchMeDifficulty("   ", validLevel)
        ).rejects.toThrow('web-nestre-api : cognitive-exercises-api.js GetCatchMeDifficulty() Invalid userId: The userId must be a non-empty string.');

        await expect(
            cognitiveExercisesApi.GetCatchMeDifficulty(null, validLevel)
        ).rejects.toThrow('web-nestre-api : cognitive-exercises-api.js GetCatchMeDifficulty() Invalid userId: The userId must be a non-empty string.');
    });

    it('should throw an error if the passed in level value is invalid', async()=>{
        //Arrange
        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        manager.SetBaseUrl(API_BASE_URL);
        manager.SetApiVersion(API_VERSION);
        manager.SetAuthToken(AUTH_TOKEN);

        const cognitiveExercisesApi = manager.cognitiveExercisesApi;

        const expectedError = "web-nestre-api : cognitive-exercises-api.js GetCatchMeDifficulty() Invalid level: The level must be a positive number that's greater than or equal to 1";

        // Act & Assert
        await expect(cognitiveExercisesApi.GetCatchMeDifficulty(USER_ID, 0)).rejects.toThrow(expectedError);
        await expect(cognitiveExercisesApi.GetCatchMeDifficulty(USER_ID, -1)).rejects.toThrow(expectedError);
        await expect(cognitiveExercisesApi.GetCatchMeDifficulty(USER_ID, null)).rejects.toThrow(expectedError);
        await expect(cognitiveExercisesApi.GetCatchMeDifficulty(USER_ID, "a")).rejects.toThrow(expectedError);
    });

    it('should throw an error if the server returns an error', async () => {
        // Arrange
        const level = 1;
        server.use(
            http.get(`${API_BASE_URL}/v${API_VERSION}/user/${USER_ID}/cogex/catchme/difficulty`, () => {
                return HttpResponse.json({ message: 'Difficulty not found' }, { status: 404 });
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
            cognitiveExercisesApi.GetCatchMeDifficulty(USER_ID, level)
        ).rejects.toThrow('web-nestre-api : nestre-api-manager.js API Error: 404 - Difficulty not found');
    });
});

//#endregion

//#region DESCRIBE - cognitive-exercises-api.js - GetCurrentRoundExerciseStatistics()

describe( "cognitive-exercises-api.js GetCurrentRoundExerciseStatistics()", () =>
{
    it('should fetch the current round exercise statistics successfully', async () =>
    {
        // Arrange
        /** @type {CogexId} */
        const cogexId = 'IMPULSE-1';

        /** @type {CurrentRoundStatisticsForExercise} */
        const mockStats = {
            current_round_statistics: [
                {
                    level: 1,
                    accuracy: "90%",
                    speed: "500ms"
                },
                {
                    level: 2,
                    accuracy: "92%",
                    speed: "480ms"
                }
            ]
        };

        server.use(
            http.get(`${API_BASE_URL}/v${API_VERSION}/user/${USER_ID}/cogex/stats/${cogexId}`, () => {
                return HttpResponse.json(mockStats, { status: 200 });
            })
        );

        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        manager.SetBaseUrl(API_BASE_URL);
        manager.SetApiVersion(API_VERSION);
        manager.SetAuthToken(AUTH_TOKEN);

        const cognitiveExercisesApi = manager.cognitiveExercisesApi;

        // Act
        const stats = await cognitiveExercisesApi.GetCurrentRoundExerciseStatistics(USER_ID, cogexId);

        // Assert
        expect(stats).toEqual(mockStats);
    });
});

//#endregion

//#region DESCRIBE - cognitive-exercises-api.js - GetCurrentRoundExerciseStatistics() - Error Handling

describe("cognitive-exercises-api.js GetCurrentRoundExerciseStatistics() - Error Handling", () => {

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
            cognitiveExercisesApi.GetCurrentRoundExerciseStatistics("", validCogexId)
        ).rejects.toThrow('web-nestre-api : cognitive-exercises-api.js GetCurrentRoundExerciseStatistics() Invalid userId: The userId must be a non-empty string.');
        
        await expect(
            cognitiveExercisesApi.GetCurrentRoundExerciseStatistics("   ", validCogexId)
        ).rejects.toThrow('web-nestre-api : cognitive-exercises-api.js GetCurrentRoundExerciseStatistics() Invalid userId: The userId must be a non-empty string.');

        await expect(
            cognitiveExercisesApi.GetCurrentRoundExerciseStatistics(null, validCogexId)
        ).rejects.toThrow('web-nestre-api : cognitive-exercises-api.js GetCurrentRoundExerciseStatistics() Invalid userId: The userId must be a non-empty string.');
    });

    it('should throw an error if the passed in cogexId value is invalid', async()=>{
        //Arrange
        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        manager.SetBaseUrl(API_BASE_URL);
        manager.SetApiVersion(API_VERSION);
        manager.SetAuthToken(AUTH_TOKEN);

        const cognitiveExercisesApi = manager.cognitiveExercisesApi;

        const expectedError = 'web-nestre-api : cognitive-exercises-api.js GetCurrentRoundExerciseStatistics() Invalid cogexId: The cogexId must be a non-empty string and one of the following: ATTENTION-1, IMPULSE-1, SALIENCE-1, MEMORY-1.';

        // Act & Assert
        await expect(
            cognitiveExercisesApi.GetCurrentRoundExerciseStatistics(USER_ID, "")
        ).rejects.toThrow(expectedError);
        
        await expect(
            cognitiveExercisesApi.GetCurrentRoundExerciseStatistics(USER_ID, "   ")
        ).rejects.toThrow(expectedError);

        await expect(
            cognitiveExercisesApi.GetCurrentRoundExerciseStatistics(USER_ID, null)
        ).rejects.toThrow(expectedError);

        await expect(
            cognitiveExercisesApi.GetCurrentRoundExerciseStatistics(USER_ID, "INVALID-ID")
        ).rejects.toThrow(expectedError);
    });

    it('should throw an error if the server returns an error', async () => {
        // Arrange
        const cogexId = 'MEMORY-1';
        server.use(
            http.get(`${API_BASE_URL}/v${API_VERSION}/user/${USER_ID}/cogex/stats/${cogexId}`, () => {
                return HttpResponse.json({ message: 'Statistics not found' }, { status: 404 });
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
            cognitiveExercisesApi.GetCurrentRoundExerciseStatistics(USER_ID, cogexId)
        ).rejects.toThrow('web-nestre-api : nestre-api-manager.js API Error: 404 - Statistics not found');
    });
});

//#endregion

//#region DESCRIBE - cognitive-exercises-api.js - GetCurrentExerciseStatistics()

describe( "cognitive-exercises-api.js GetCurrentExerciseStatistics()", () =>
{
    it('should fetch the current exercise statistics successfully', async () =>
    {
        // Arrange
        /** @type {CurrentStatisticsForExercises} */
        const mockStats = {
            current_statistics: [
                {
                    exercise_id: "IMPULSE-1",
                    average_accuracy: "92.5%",
                    highest_accuracy: "98.0%",
                    average_speed: "550ms",
                    fastest_speed: "400ms",
                    level_improvement: "+2",
                    workout_improvement: "+5%"
                },
                {
                    exercise_id: "ATTENTION-1",
                    average_accuracy: "88.0%",
                    highest_accuracy: "95.0%",
                    average_speed: "600ms",
                    fastest_speed: "450ms",
                    level_improvement: "+1",
                    workout_improvement: "+3%"
                }
            ]
        };

        server.use(
            http.get(`${API_BASE_URL}/v${API_VERSION}/user/${USER_ID}/cogex/stats`, () => {
                return HttpResponse.json(mockStats, { status: 200 });
            })
        );

        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        manager.SetBaseUrl(API_BASE_URL);
        manager.SetApiVersion(API_VERSION);
        manager.SetAuthToken(AUTH_TOKEN);

        const cognitiveExercisesApi = manager.cognitiveExercisesApi;

        // Act
        const stats = await cognitiveExercisesApi.GetCurrentExerciseStatistics(USER_ID);

        // Assert
        expect(stats).toEqual(mockStats);
    });
});

//#endregion

//#region DESCRIBE - cognitive-exercises-api.js - GetCurrentExerciseStatistics() - Error Handling

describe("cognitive-exercises-api.js GetCurrentExerciseStatistics() - Error Handling", () => {

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
            cognitiveExercisesApi.GetCurrentExerciseStatistics("")
        ).rejects.toThrow('web-nestre-api : cognitive-exercises-api.js GetCurrentExerciseStatistics() Invalid userId: The userId must be a non-empty string.');
        
        await expect(
            cognitiveExercisesApi.GetCurrentExerciseStatistics("   ")
        ).rejects.toThrow('web-nestre-api : cognitive-exercises-api.js GetCurrentExerciseStatistics() Invalid userId: The userId must be a non-empty string.');

        await expect(
            cognitiveExercisesApi.GetCurrentExerciseStatistics(null)
        ).rejects.toThrow('web-nestre-api : cognitive-exercises-api.js GetCurrentExerciseStatistics() Invalid userId: The userId must be a non-empty string.');
    });

    it('should throw an error if the server returns an error', async () => {
        // Arrange
        server.use(
            http.get(`${API_BASE_URL}/v${API_VERSION}/user/${USER_ID}/cogex/stats`, () => {
                return HttpResponse.json({ message: 'Statistics not found' }, { status: 404 });
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
            cognitiveExercisesApi.GetCurrentExerciseStatistics(USER_ID)
        ).rejects.toThrow('web-nestre-api : nestre-api-manager.js API Error: 404 - Statistics not found');
    });
});

//#endregion

//#region DESCRIBE - cognitive-exercises-api.js - GetCurrentSessionInteractions()

describe( "cognitive-exercises-api.js GetCurrentSessionInteractions()", () =>
{
    it('should fetch the current session interactions for a cognitive exercise successfully', async () =>
    {
        // Arrange
        /** @type {CogexId} */
        const cogexId = 'IMPULSE-1';

        /** @type {InteractionsForCurrentSession} */
        const mockInteractions = {
            created_at: "2023-10-27T10:00:00Z",
            cogex_id: cogexId,
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
            score: "95",
            interaction_duration: 120.5,
            user_subscription_level_id: 1,
            id: "some-interaction-id",
            is_baseline_round: false
        };

        server.use(
            http.get(`${API_BASE_URL}/v${API_VERSION}/user/${USER_ID}/cogex/${cogexId}/interactions-for-current-session`, () => {
                return HttpResponse.json(mockInteractions, { status: 200 });
            })
        );

        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        manager.SetBaseUrl(API_BASE_URL);
        manager.SetApiVersion(API_VERSION);
        manager.SetAuthToken(AUTH_TOKEN);

        const cognitiveExercisesApi = manager.cognitiveExercisesApi;

        // Act
        const interactions = await cognitiveExercisesApi.GetCurrentSessionInteractions(USER_ID, cogexId);

        // Assert
        expect(interactions).toEqual(mockInteractions);
    });
});

//#endregion

//#region DESCRIBE - cognitive-exercises-api.js - GetCurrentSessionInteractions() - Error Handling

describe("cognitive-exercises-api.js GetCurrentSessionInteractions() - Error Handling", () => {

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
            cognitiveExercisesApi.GetCurrentSessionInteractions("", validCogexId)
        ).rejects.toThrow('web-nestre-api : cognitive-exercises-api.js GetCurrentSessionInteractions() Invalid userId: The userId must be a non-empty string.');
        
        await expect(
            cognitiveExercisesApi.GetCurrentSessionInteractions("   ", validCogexId)
        ).rejects.toThrow('web-nestre-api : cognitive-exercises-api.js GetCurrentSessionInteractions() Invalid userId: The userId must be a non-empty string.');

        await expect(
            cognitiveExercisesApi.GetCurrentSessionInteractions(null, validCogexId)
        ).rejects.toThrow('web-nestre-api : cognitive-exercises-api.js GetCurrentSessionInteractions() Invalid userId: The userId must be a non-empty string.');
    });

    it('should throw an error if the passed in cogexId value is invalid', async()=>{
        //Arrange
        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        manager.SetBaseUrl(API_BASE_URL);
        manager.SetApiVersion(API_VERSION);
        manager.SetAuthToken(AUTH_TOKEN);

        const cognitiveExercisesApi = manager.cognitiveExercisesApi;

        const expectedError = 'web-nestre-api : cognitive-exercises-api.js GetCurrentSessionInteractions() Invalid cogexId: The cogexId must be a non-empty string and one of the following: ATTENTION-1, IMPULSE-1, SALIENCE-1, MEMORY-1.';

        // Act & Assert
        await expect(
            cognitiveExercisesApi.GetCurrentSessionInteractions(USER_ID, "")
        ).rejects.toThrow(expectedError);
        
        await expect(
            cognitiveExercisesApi.GetCurrentSessionInteractions(USER_ID, "   ")
        ).rejects.toThrow(expectedError);

        await expect(
            cognitiveExercisesApi.GetCurrentSessionInteractions(USER_ID, null)
        ).rejects.toThrow(expectedError);

        await expect(
            cognitiveExercisesApi.GetCurrentSessionInteractions(USER_ID, "INVALID-ID")
        ).rejects.toThrow(expectedError);
    });

    it('should throw an error if the server returns an error', async () => {
        // Arrange
        const cogexId = 'MEMORY-1';
        server.use(
            http.get(`${API_BASE_URL}/v${API_VERSION}/user/${USER_ID}/cogex/${cogexId}/interactions-for-current-session`, () => {
                return HttpResponse.json({ message: 'Interactions not found' }, { status: 404 });
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
            cognitiveExercisesApi.GetCurrentSessionInteractions(USER_ID, cogexId)
        ).rejects.toThrow('web-nestre-api : nestre-api-manager.js API Error: 404 - Interactions not found');
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

//#region DESCRIBE - cognitive-exercises-api.js - GetNBackDifficulty()

describe( "cognitive-exercises-api.js GetNBackDifficulty()", () =>
{
    it('should fetch the N-Back difficulty successfully', async () =>
    {
        // Arrange
        const level = 5;
        /** @type {NBackDifficulty} */
        const mockDifficulty = {
            level_progression_score: 80,
            level_progression_sessions: 3,
            n_back: 2,
            num_objects: 8
        };

        server.use(
            http.get(`${API_BASE_URL}/v${API_VERSION}/user/${USER_ID}/cogex/nback/difficulty`, ({request}) => {
                const url = new URL(request.url);
                expect(url.searchParams.get('level')).toBe(level.toString());
                return HttpResponse.json(mockDifficulty, { status: 200 });
            })
        );

        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        manager.SetBaseUrl(API_BASE_URL);
        manager.SetApiVersion(API_VERSION);
        manager.SetAuthToken(AUTH_TOKEN);

        const cognitiveExercisesApi = manager.cognitiveExercisesApi;

        // Act
        const difficulty = await cognitiveExercisesApi.GetNBackDifficulty(USER_ID, level);

        // Assert
        expect(difficulty).toEqual(mockDifficulty);
    });
});

//#endregion

//#region DESCRIBE - cognitive-exercises-api.js - GetNBackDifficulty() - Error Handling

describe("cognitive-exercises-api.js GetNBackDifficulty() - Error Handling", () => {

    const validLevel = 1;

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
            cognitiveExercisesApi.GetNBackDifficulty("", validLevel)
        ).rejects.toThrow('web-nestre-api : cognitive-exercises-api.js GetNBackDifficulty() Invalid userId: The userId must be a non-empty string.');
        
        await expect(
            cognitiveExercisesApi.GetNBackDifficulty("   ", validLevel)
        ).rejects.toThrow('web-nestre-api : cognitive-exercises-api.js GetNBackDifficulty() Invalid userId: The userId must be a non-empty string.');

        await expect(
            cognitiveExercisesApi.GetNBackDifficulty(null, validLevel)
        ).rejects.toThrow('web-nestre-api : cognitive-exercises-api.js GetNBackDifficulty() Invalid userId: The userId must be a non-empty string.');
    });

    it('should throw an error if the passed in level value is invalid', async()=>{
        //Arrange
        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        manager.SetBaseUrl(API_BASE_URL);
        manager.SetApiVersion(API_VERSION);
        manager.SetAuthToken(AUTH_TOKEN);

        const cognitiveExercisesApi = manager.cognitiveExercisesApi;

        const expectedError = "web-nestre-api : cognitive-exercises-api.js GetNBackDifficulty() Invalid level: The level must be a positive number that's greater than or equal to 1";

        // Act & Assert
        await expect(cognitiveExercisesApi.GetNBackDifficulty(USER_ID, 0)).rejects.toThrow(expectedError);
        await expect(cognitiveExercisesApi.GetNBackDifficulty(USER_ID, -1)).rejects.toThrow(expectedError);
        await expect(cognitiveExercisesApi.GetNBackDifficulty(USER_ID, null)).rejects.toThrow(expectedError);
        await expect(cognitiveExercisesApi.GetNBackDifficulty(USER_ID, "a")).rejects.toThrow(expectedError);
    });

    it('should throw an error if the server returns an error', async () => {
        // Arrange
        const level = 1;
        server.use(
            http.get(`${API_BASE_URL}/v${API_VERSION}/user/${USER_ID}/cogex/nback/difficulty`, () => {
                return HttpResponse.json({ message: 'Difficulty not found' }, { status: 404 });
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
            cognitiveExercisesApi.GetNBackDifficulty(USER_ID, level)
        ).rejects.toThrow('web-nestre-api : nestre-api-manager.js API Error: 404 - Difficulty not found');
    });
});

//#endregion

//#region DESCRIBE - cognitive-exercises-api.js - GetNBackSequence()

describe( "cognitive-exercises-api.js GetNBackSequence()", () =>
{
    it('should fetch the N-Back sequence successfully', async () =>
    {
        // Arrange
        const level = 5;
        const version = 'alpha';
        /** @type {NBackSequence} */
        const mockSequence = [
            [1], [2], [3, 4], [1], [2]
        ];

        server.use(
            http.get(`${API_BASE_URL}/v${API_VERSION}/user/${USER_ID}/cogex/nback/sequence`, ({request}) => {
                const url = new URL(request.url);
                expect(url.searchParams.get('level')).toBe(level.toString());
                expect(url.searchParams.get('version')).toBe(version);
                return HttpResponse.json(mockSequence, { status: 200 });
            })
        );

        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        manager.SetBaseUrl(API_BASE_URL);
        manager.SetApiVersion(API_VERSION);
        manager.SetAuthToken(AUTH_TOKEN);

        const cognitiveExercisesApi = manager.cognitiveExercisesApi;

        // Act
        const sequence = await cognitiveExercisesApi.GetNBackSequence(USER_ID, level, version);

        // Assert
        expect(sequence).toEqual(mockSequence);
    });
});

//#endregion

//#region DESCRIBE - cognitive-exercises-api.js - GetNBackSequence() - Error Handling

describe("cognitive-exercises-api.js GetNBackSequence() - Error Handling", () => {

    const validLevel = 1;
    const validVersion = 'alpha';

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
            cognitiveExercisesApi.GetNBackSequence("", validLevel, validVersion)
        ).rejects.toThrow('web-nestre-api : cognitive-exercises-api.js GetNBackSequence() Invalid userId: The userId must be a non-empty string.');
        
        await expect(
            cognitiveExercisesApi.GetNBackSequence("   ", validLevel, validVersion)
        ).rejects.toThrow('web-nestre-api : cognitive-exercises-api.js GetNBackSequence() Invalid userId: The userId must be a non-empty string.');

        await expect(
            cognitiveExercisesApi.GetNBackSequence(null, validLevel, validVersion)
        ).rejects.toThrow('web-nestre-api : cognitive-exercises-api.js GetNBackSequence() Invalid userId: The userId must be a non-empty string.');
    });

    it('should throw an error if the passed in level value is invalid', async()=>{
        //Arrange
        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        manager.SetBaseUrl(API_BASE_URL);
        manager.SetApiVersion(API_VERSION);
        manager.SetAuthToken(AUTH_TOKEN);

        const cognitiveExercisesApi = manager.cognitiveExercisesApi;

        const expectedError = "web-nestre-api : cognitive-exercises-api.js GetNBackSequence() Invalid level: The level must be a positive number that's greater than or equal to 1";

        // Act & Assert
        await expect(cognitiveExercisesApi.GetNBackSequence(USER_ID, 0, validVersion)).rejects.toThrow(expectedError);
        await expect(cognitiveExercisesApi.GetNBackSequence(USER_ID, -1, validVersion)).rejects.toThrow(expectedError);
        await expect(cognitiveExercisesApi.GetNBackSequence(USER_ID, null, validVersion)).rejects.toThrow(expectedError);
        await expect(cognitiveExercisesApi.GetNBackSequence(USER_ID, "a", validVersion)).rejects.toThrow(expectedError);
    });

    it('should throw an error if the passed in version value is invalid', async()=>{
        //Arrange
        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        manager.SetBaseUrl(API_BASE_URL);
        manager.SetApiVersion(API_VERSION);
        manager.SetAuthToken(AUTH_TOKEN);

        const cognitiveExercisesApi = manager.cognitiveExercisesApi;

        const expectedError = "web-nestre-api : cognitive-exercises-api.js GetNBackSequence() Invalid version: The version must be a non-empty string and one of the following: 'alpha', 'cerebral', 'prime'.";

        // Act & Assert
        await expect(cognitiveExercisesApi.GetNBackSequence(USER_ID, validLevel, "")).rejects.toThrow(expectedError);
        await expect(cognitiveExercisesApi.GetNBackSequence(USER_ID, validLevel, "   ")).rejects.toThrow(expectedError);
        await expect(cognitiveExercisesApi.GetNBackSequence(USER_ID, validLevel, null)).rejects.toThrow(expectedError);
        await expect(cognitiveExercisesApi.GetNBackSequence(USER_ID, validLevel, "invalid-version")).rejects.toThrow(expectedError);
    });

    it('should throw an error if the server returns an error', async () => {
        // Arrange
        const level = 1;
        const version = 'alpha';
        server.use(
            http.get(`${API_BASE_URL}/v${API_VERSION}/user/${USER_ID}/cogex/nback/sequence`, () => {
                return HttpResponse.json({ detail: 'Sequence generation failed' }, { status: 500 });
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
            cognitiveExercisesApi.GetNBackSequence(USER_ID, level, version)
        ).rejects.toThrow('web-nestre-api : nestre-api-manager.js API Error (500). Internal server error.');
    });
});

//#endregion

//#region DESCRIBE - cognitive-exercises-api.js - GetCatchMeSequence()

describe( "cognitive-exercises-api.js GetCatchMeSequence()", () =>
{
    it('should fetch the CatchMe sequence successfully', async () =>
    {
        // Arrange
        const level = 1;
        /** @type {CatchMeVersion} */
        const version = 'alpha';
        const criteria = '113';
        /** @type {CatchMeCriteriaType} */
        const criteriaType = 'assertiveness';
        /** @type {CatchMeSequence} */
        const mockSequence = ["113", "213", "313", "413", "113", "213", "313"];

        server.use(
            http.get(`${API_BASE_URL}/v${API_VERSION}/user/${USER_ID}/cogex/catchme/sequence`, ({request}) => {
                const url = new URL(request.url);
                expect(url.searchParams.get('level')).toBe(level.toString());
                expect(url.searchParams.get('version')).toBe(version);
                expect(url.searchParams.get('criteria')).toBe(criteria);
                expect(url.searchParams.get('criteria_type')).toBe(criteriaType);
                return HttpResponse.json(mockSequence, { status: 200 });
            })
        );

        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        manager.SetBaseUrl(API_BASE_URL);
        manager.SetApiVersion(API_VERSION);
        manager.SetAuthToken(AUTH_TOKEN);

        const cognitiveExercisesApi = manager.cognitiveExercisesApi;

        // Act
        const sequence = await cognitiveExercisesApi.GetCatchMeSequence(USER_ID, level, version, criteria, criteriaType);

        // Assert
        expect(sequence).toEqual(mockSequence);
    });
});

//#endregion

//#region DESCRIBE - cognitive-exercises-api.js - GetCatchMeSequence() - Error Handling

describe("cognitive-exercises-api.js GetCatchMeSequence() - Error Handling", () => {

    const validLevel = 1;
    /** @type {CatchMeVersion} */
    const validVersion = 'alpha';
    const validCriteria = '113';
    /** @type {CatchMeCriteriaType} */
    const validCriteriaType = 'assertiveness';

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
            cognitiveExercisesApi.GetCatchMeSequence("", validLevel, validVersion, validCriteria, validCriteriaType)
        ).rejects.toThrow('web-nestre-api : cognitive-exercises-api.js GetCatchMeSequence() Invalid userId: The userId must be a non-empty string.');
        
        await expect(
            cognitiveExercisesApi.GetCatchMeSequence("   ", validLevel, validVersion, validCriteria, validCriteriaType)
        ).rejects.toThrow('web-nestre-api : cognitive-exercises-api.js GetCatchMeSequence() Invalid userId: The userId must be a non-empty string.');

        await expect(
            cognitiveExercisesApi.GetCatchMeSequence(null, validLevel, validVersion, validCriteria, validCriteriaType)
        ).rejects.toThrow('web-nestre-api : cognitive-exercises-api.js GetCatchMeSequence() Invalid userId: The userId must be a non-empty string.');
    });

    it('should throw an error if the passed in level value is invalid', async()=>{
        //Arrange
        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        manager.SetBaseUrl(API_BASE_URL);
        manager.SetApiVersion(API_VERSION);
        manager.SetAuthToken(AUTH_TOKEN);

        const cognitiveExercisesApi = manager.cognitiveExercisesApi;

        const expectedError = "web-nestre-api : cognitive-exercises-api.js GetCatchMeSequence() Invalid level: The level must be a positive number that's greater than or equal to 1";

        // Act & Assert
        await expect(cognitiveExercisesApi.GetCatchMeSequence(USER_ID, 0, validVersion, validCriteria, validCriteriaType)).rejects.toThrow(expectedError);
        await expect(cognitiveExercisesApi.GetCatchMeSequence(USER_ID, -1, validVersion, validCriteria, validCriteriaType)).rejects.toThrow(expectedError);
        await expect(cognitiveExercisesApi.GetCatchMeSequence(USER_ID, null, validVersion, validCriteria, validCriteriaType)).rejects.toThrow(expectedError);
        await expect(cognitiveExercisesApi.GetCatchMeSequence(USER_ID, "a", validVersion, validCriteria, validCriteriaType)).rejects.toThrow(expectedError);
    });

    it('should throw an error if the passed in version value is invalid', async()=>{
        //Arrange
        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        manager.SetBaseUrl(API_BASE_URL);
        manager.SetApiVersion(API_VERSION);
        manager.SetAuthToken(AUTH_TOKEN);

        const cognitiveExercisesApi = manager.cognitiveExercisesApi;

        const expectedError = "web-nestre-api : cognitive-exercises-api.js GetCatchMeSequence() Invalid version: The version must be a non-empty string and one of the following: 'alpha', 'cerebral', 'prime'.";

        // Act & Assert
        await expect(cognitiveExercisesApi.GetCatchMeSequence(USER_ID, validLevel, "", validCriteria, validCriteriaType)).rejects.toThrow(expectedError);
        await expect(cognitiveExercisesApi.GetCatchMeSequence(USER_ID, validLevel, "   ", validCriteria, validCriteriaType)).rejects.toThrow(expectedError);
        await expect(cognitiveExercisesApi.GetCatchMeSequence(USER_ID, validLevel, null, validCriteria, validCriteriaType)).rejects.toThrow(expectedError);
        await expect(cognitiveExercisesApi.GetCatchMeSequence(USER_ID, validLevel, "invalid-version", validCriteria, validCriteriaType)).rejects.toThrow(expectedError);
    });

    it('should throw an error if the passed in criteria value is invalid', async()=>{
        //Arrange
        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        manager.SetBaseUrl(API_BASE_URL);
        manager.SetApiVersion(API_VERSION);
        manager.SetAuthToken(AUTH_TOKEN);

        const cognitiveExercisesApi = manager.cognitiveExercisesApi;

        const expectedError = "web-nestre-api : cognitive-exercises-api.js GetCatchMeSequence() Invalid criteria: The criteria must be a non-empty string.";

        // Act & Assert
        await expect(cognitiveExercisesApi.GetCatchMeSequence(USER_ID, validLevel, validVersion, "", validCriteriaType)).rejects.toThrow(expectedError);
        await expect(cognitiveExercisesApi.GetCatchMeSequence(USER_ID, validLevel, validVersion, "   ", validCriteriaType)).rejects.toThrow(expectedError);
        await expect(cognitiveExercisesApi.GetCatchMeSequence(USER_ID, validLevel, validVersion, null, validCriteriaType)).rejects.toThrow(expectedError);
    });

    it('should throw an error if the passed in criteriaType value is invalid', async()=>{
        //Arrange
        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        manager.SetBaseUrl(API_BASE_URL);
        manager.SetApiVersion(API_VERSION);
        manager.SetAuthToken(AUTH_TOKEN);

        const cognitiveExercisesApi = manager.cognitiveExercisesApi;

        const expectedError = "web-nestre-api : cognitive-exercises-api.js GetCatchMeSequence() Invalid criteriaType: The criteriaType must be a non-empty string and one of the following: 'assertiveness', 'prudence'.";

        // Act & Assert
        await expect(cognitiveExercisesApi.GetCatchMeSequence(USER_ID, validLevel, validVersion, validCriteria, "")).rejects.toThrow(expectedError);
        await expect(cognitiveExercisesApi.GetCatchMeSequence(USER_ID, validLevel, validVersion, validCriteria, "   ")).rejects.toThrow(expectedError);
        await expect(cognitiveExercisesApi.GetCatchMeSequence(USER_ID, validLevel, validVersion, validCriteria, null)).rejects.toThrow(expectedError);
        await expect(cognitiveExercisesApi.GetCatchMeSequence(USER_ID, validLevel, validVersion, validCriteria, "invalid-type")).rejects.toThrow(expectedError);
    });

    it('should throw an error if the server returns an error', async () => {
        // Arrange
        server.use(
            http.get(`${API_BASE_URL}/v${API_VERSION}/user/${USER_ID}/cogex/catchme/sequence`, () => {
                return HttpResponse.json({ detail: 'Sequence generation failed' }, { status: 500 });
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
            cognitiveExercisesApi.GetCatchMeSequence(USER_ID, validLevel, validVersion, validCriteria, validCriteriaType)
        ).rejects.toThrow('web-nestre-api : nestre-api-manager.js API Error (500). Internal server error.');
    });
});

//#endregion