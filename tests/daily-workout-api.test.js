/**
 * daily-workout-api.test.js
 * @file Unit tests for the DailyWorkoutApi class.
 * @description This file provides a comprehensive test suite for the `daily-workout-api.js` script,
 * validating each method that interacts with the daily workout-related API endpoints.
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

import { server } from '../tests/mocks/server.js';
import { http, HttpResponse } from 'msw';

/**
 * @typedef {import('../src/daily-workout/daily-workout-types.js').DailyWorkoutRecommendation } DailyWorkoutRecommendation
 */

//#endregion

//#region DESCRIBE - daily-workout-api.js - constructor()

describe( "daily-workout-api.js constructor", ()=>
{
    it("should create an instance of the DailyWorkoutApi object on NestreApiManager", ()=>
    {
        //Arrange
        NestreApiManager.instance = null;

        //Act
        const manager = NestreApiManager.GetInstance();

        //Assert
        expect( manager ).not.toBe( null );
        expect( manager.dailyWorkoutApi ).not.toBe( null );
    });
});

//#endregion

//#region DESCRIBE - daily-workout-api.js - GetDailyWorkoutRecommendation()

describe( "daily-workout-api.js GetDailyWorkoutRecommendation()", () =>
{
    it('should fetch a daily-workout recommendation successfully', async () =>
    {
        // Arrange
        /**
         * @type {DailyWorkoutRecommendation}
         */
        const mockRecommendation = {
            cognitive_exercises: [
                {
                    cogex_id: 'test-cogex-1',
                    version: '1.0.0',
                    is_available: true,
                    completed_today: false,
                },
            ],
            contents: [
                {
                    content_id: 'test-content-1',
                    completed_today: false,
                },
            ],
        };

        server.use(
            http.get(`${API_BASE_URL}/v${API_VERSION}/user/${USER_ID}/daily-workout`, () => {
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

        const dailyWorkoutApi = manager.dailyWorkoutApi;

        // Act
        // This call will trigger a real `fetch`, but MSW will intercept it
        // and return the mock data from our handler.
        /**
         * @type{DailyWorkoutRecommendation}
         */
        const dailyWorkoutRecommendation = await dailyWorkoutApi.GetDailyWorkoutRecommendation(USER_ID);

        // Assert
        expect(dailyWorkoutRecommendation).not.toBeNull();
        expect(dailyWorkoutRecommendation).toEqual(mockRecommendation);
        expect(dailyWorkoutRecommendation.cognitive_exercises).toBeDefined();
        expect(dailyWorkoutRecommendation.contents).toBeDefined();
        expect(dailyWorkoutRecommendation.cognitive_exercises.length).toBeGreaterThan(0);
        expect(dailyWorkoutRecommendation.contents.length).toBeGreaterThan(0);
    });
});

//#endregion

//#region DESCRIBE - daily-workout-api.js - GetDailyWorkoutRecommendation() - Error Handling

describe("daily-workout-api.js GetDailyWorkoutRecommendation() - Error Handling", () => {

    it('should throw an error if the passed in userId value is invalid', async()=>{
        //Arrange
        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        manager.SetBaseUrl(API_BASE_URL);
        manager.SetApiVersion(API_VERSION);
        manager.SetAuthToken(AUTH_TOKEN);

        const dailyWorkoutApi = manager.dailyWorkoutApi;

        // Act & Assert
        await expect(
            dailyWorkoutApi.GetDailyWorkoutRecommendation("")
        ).rejects.toThrow('web-nestre-api : daily-workout-api.js GetDailyWorkoutRecommendation() Invalid userId: The userId must be a non-empty string.');
        
        await expect(
            dailyWorkoutApi.GetDailyWorkoutRecommendation("   ")
        ).rejects.toThrow('web-nestre-api : daily-workout-api.js GetDailyWorkoutRecommendation() Invalid userId: The userId must be a non-empty string.');

        await expect(
            dailyWorkoutApi.GetDailyWorkoutRecommendation(null)
        ).rejects.toThrow('web-nestre-api : daily-workout-api.js GetDailyWorkoutRecommendation() Invalid userId: The userId must be a non-empty string.');
    });

    it('should throw an error if the user is not found', async () => {
        // Arrange
        const nonExistentUserId = 'non-existent-user-id';
        server.use(
            http.get(`${API_BASE_URL}/v${API_VERSION}/user/${nonExistentUserId}/daily-workout`, () => {
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

        const dailyWorkoutApi = manager.dailyWorkoutApi;

        // Act & Assert
        await expect(
            dailyWorkoutApi.GetDailyWorkoutRecommendation(nonExistentUserId)
        ).rejects.toThrow('web-nestre-api : nestre-api-manager.js API Error: 404 - User not found');
    });
});

//#endregion