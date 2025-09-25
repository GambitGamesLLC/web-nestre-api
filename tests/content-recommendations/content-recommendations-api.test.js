/**
 * content-recommendations-api.test.js
 * @file Unit tests for the ContentRecommendationsApi class.
 * @description This file provides a comprehensive test suite for the `content-recommendations-api.js` script,
 * validating each method that interacts with the related API endpoints.
 * It uses a mock server using the `msw` library package to test request/response flows without hitting a real server.
 * @requires {NestreApiManager}
 * @requires {msw}
 */

//#region IMPORTS

// Import what we want to test
import { NestreApiManager } from '../../src/nestre-api-manager.js';
import { server } from '../mocks/server.js';
import { API_BASE_URL, API_VERSION, USER_ID, AUTH_TOKEN } from '../../examples/environment-variables.js';

/**
 * @typedef {import('../../src/content-recommendations/content-recommendations-api.js').ContentRecommendationsApi } ContentRecommendationsApi
 */

//#endregion

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());

describe('ContentRecommendationsApi', () => {
    let nestreApiManager;

    /**
     * @type {ContentRecommendationsApi}
     */
    let contentRecommendationsApi;

    beforeEach(() => {
        nestreApiManager = NestreApiManager.GetInstance();
        nestreApiManager.SetBaseUrl(API_BASE_URL);
        nestreApiManager.SetApiVersion(API_VERSION);
        nestreApiManager.SetAuthToken(AUTH_TOKEN);
        contentRecommendationsApi = nestreApiManager.contentRecommendationsApi;
    });

    afterEach(() => {
        // Clear the singleton instance
        NestreApiManager.instance = null;
    });

    describe('GetActivateContentRecommendations', () => {
        const num_recommendations = 5;

        test('should retrieve content recommendations successfully', async () => {
            const response = await contentRecommendationsApi.GetActivateContentRecommendations(USER_ID, num_recommendations);
            expect(response).toBeInstanceOf(Array);
            expect(response.length).toBeGreaterThan(0);
            expect(typeof response[0]).toBe('string');
        });

        test('should reject if userId is not a non-empty string', async () => {
            await expect(contentRecommendationsApi.GetActivateContentRecommendations(null, num_recommendations))
                .rejects
                .toThrow('web-nestre-api : content-recommendations-api.js GetActivateContentRecommendations() Invalid userId: The userId must be a non-empty string.');
            
            await expect(contentRecommendationsApi.GetActivateContentRecommendations('  ', num_recommendations))
                .rejects
                .toThrow('web-nestre-api : content-recommendations-api.js GetActivateContentRecommendations() Invalid userId: The userId must be a non-empty string.');

            await expect(contentRecommendationsApi.GetActivateContentRecommendations(123, num_recommendations))
                .rejects
                .toThrow('web-nestre-api : content-recommendations-api.js GetActivateContentRecommendations() Invalid userId: The userId must be a non-empty string.');
        });

        test('should reject if num_recommendations is not a positive integer', async () => {
            await expect(contentRecommendationsApi.GetActivateContentRecommendations(USER_ID, null))
                .rejects
                .toThrow('web-nestre-api : content-recommendations-api.js GetActivateContentRecommendations() Invalid num_recommendations: The num_recommendations must be a positive integer value.');
            
            await expect(contentRecommendationsApi.GetActivateContentRecommendations(USER_ID, 0))
                .rejects
                .toThrow('web-nestre-api : content-recommendations-api.js GetActivateContentRecommendations() Invalid num_recommendations: The num_recommendations must be a positive integer value.');

            await expect(contentRecommendationsApi.GetActivateContentRecommendations(USER_ID, -1))
                .rejects
                .toThrow('web-nestre-api : content-recommendations-api.js GetActivateContentRecommendations() Invalid num_recommendations: The num_recommendations must be a positive integer value.');
            
            await expect(contentRecommendationsApi.GetActivateContentRecommendations(USER_ID, 5.5))
                .rejects
                .toThrow('web-nestre-api : content-recommendations-api.js GetActivateContentRecommendations() Invalid num_recommendations: The num_recommendations must be a positive integer value.');
            
            await expect(contentRecommendationsApi.GetActivateContentRecommendations(USER_ID, 'a'))
                .rejects
                .toThrow('web-nestre-api : content-recommendations-api.js GetActivateContentRecommendations() Invalid num_recommendations: The num_recommendations must be a positive integer value.');
        });

        test('should fail if a non-existent userId is provided for the API call', async () => {
            const differentUserId = 'non-existent-user';
            // The mock handler will return a 404 for this user ID.
            await expect(contentRecommendationsApi.GetActivateContentRecommendations(differentUserId, num_recommendations))
                .rejects
                .toThrow('web-nestre-api : nestre-api-manager.js API Error: 404 - User not found');
        });
    });

    describe('GetGuidedFramesContentRecommendations', () => {
        const num_recommendations = 5;

        test('should retrieve content recommendations successfully', async () => {
            const response = await contentRecommendationsApi.GetGuidedFramesContentRecommendations(USER_ID, num_recommendations);
            expect(response).toBeInstanceOf(Array);
            expect(response.length).toBeGreaterThan(0);
            expect(typeof response[0]).toBe('string');
        });

        test('should reject if userId is not a non-empty string', async () => {
            await expect(contentRecommendationsApi.GetGuidedFramesContentRecommendations(null, num_recommendations))
                .rejects
                .toThrow('web-nestre-api : content-recommendations-api.js GetGuidedFramesContentRecommendations() Invalid userId: The userId must be a non-empty string.');
            
            await expect(contentRecommendationsApi.GetGuidedFramesContentRecommendations('  ', num_recommendations))
                .rejects
                .toThrow('web-nestre-api : content-recommendations-api.js GetGuidedFramesContentRecommendations() Invalid userId: The userId must be a non-empty string.');

            await expect(contentRecommendationsApi.GetGuidedFramesContentRecommendations(123, num_recommendations))
                .rejects
                .toThrow('web-nestre-api : content-recommendations-api.js GetGuidedFramesContentRecommendations() Invalid userId: The userId must be a non-empty string.');
        });

        test('should reject if num_recommendations is not a positive integer', async () => {
            await expect(contentRecommendationsApi.GetGuidedFramesContentRecommendations(USER_ID, null))
                .rejects
                .toThrow('web-nestre-api : content-recommendations-api.js GetGuidedFramesContentRecommendations() Invalid num_recommendations: The num_recommendations must be a positive integer value.');
            
            await expect(contentRecommendationsApi.GetGuidedFramesContentRecommendations(USER_ID, 0))
                .rejects
                .toThrow('web-nestre-api : content-recommendations-api.js GetGuidedFramesContentRecommendations() Invalid num_recommendations: The num_recommendations must be a positive integer value.');

            await expect(contentRecommendationsApi.GetGuidedFramesContentRecommendations(USER_ID, -1))
                .rejects
                .toThrow('web-nestre-api : content-recommendations-api.js GetGuidedFramesContentRecommendations() Invalid num_recommendations: The num_recommendations must be a positive integer value.');
            
            await expect(contentRecommendationsApi.GetGuidedFramesContentRecommendations(USER_ID, 5.5))
                .rejects
                .toThrow('web-nestre-api : content-recommendations-api.js GetGuidedFramesContentRecommendations() Invalid num_recommendations: The num_recommendations must be a positive integer value.');
            
            await expect(contentRecommendationsApi.GetGuidedFramesContentRecommendations(USER_ID, 'a'))
                .rejects
                .toThrow('web-nestre-api : content-recommendations-api.js GetGuidedFramesContentRecommendations() Invalid num_recommendations: The num_recommendations must be a positive integer value.');
        });

        test('should fail if a non-existent userId is provided for the API call', async () => {
            const differentUserId = 'non-existent-user';
            // The mock handler will return a 404 for this user ID.
            await expect(contentRecommendationsApi.GetGuidedFramesContentRecommendations(differentUserId, num_recommendations))
                .rejects
                .toThrow('web-nestre-api : nestre-api-manager.js API Error: 404 - User not found');
        });
    });

    describe('GetMindsetMinutesContentRecommendations', () => {
        const num_recommendations = 5;

        test('should retrieve content recommendations successfully', async () => {
            const response = await contentRecommendationsApi.GetMindsetMinutesContentRecommendations(USER_ID, num_recommendations);
            expect(response).toBeInstanceOf(Array);
            expect(response.length).toBeGreaterThan(0);
            expect(typeof response[0]).toBe('string');
        });

        test('should reject if userId is not a non-empty string', async () => {
            await expect(contentRecommendationsApi.GetMindsetMinutesContentRecommendations(null, num_recommendations))
                .rejects
                .toThrow('web-nestre-api : content-recommendations-api.js GetMindsetMinutesContentRecommendations() Invalid userId: The userId must be a non-empty string.');
            
            await expect(contentRecommendationsApi.GetMindsetMinutesContentRecommendations('  ', num_recommendations))
                .rejects
                .toThrow('web-nestre-api : content-recommendations-api.js GetMindsetMinutesContentRecommendations() Invalid userId: The userId must be a non-empty string.');

            await expect(contentRecommendationsApi.GetMindsetMinutesContentRecommendations(123, num_recommendations))
                .rejects
                .toThrow('web-nestre-api : content-recommendations-api.js GetMindsetMinutesContentRecommendations() Invalid userId: The userId must be a non-empty string.');
        });

        test('should reject if num_recommendations is not a positive integer', async () => {
            await expect(contentRecommendationsApi.GetMindsetMinutesContentRecommendations(USER_ID, null))
                .rejects
                .toThrow('web-nestre-api : content-recommendations-api.js GetMindsetMinutesContentRecommendations() Invalid num_recommendations: The num_recommendations must be a positive integer value.');
            
            await expect(contentRecommendationsApi.GetMindsetMinutesContentRecommendations(USER_ID, 0))
                .rejects
                .toThrow('web-nestre-api : content-recommendations-api.js GetMindsetMinutesContentRecommendations() Invalid num_recommendations: The num_recommendations must be a positive integer value.');

            await expect(contentRecommendationsApi.GetMindsetMinutesContentRecommendations(USER_ID, -1))
                .rejects
                .toThrow('web-nestre-api : content-recommendations-api.js GetMindsetMinutesContentRecommendations() Invalid num_recommendations: The num_recommendations must be a positive integer value.');
            
            await expect(contentRecommendationsApi.GetMindsetMinutesContentRecommendations(USER_ID, 5.5))
                .rejects
                .toThrow('web-nestre-api : content-recommendations-api.js GetMindsetMinutesContentRecommendations() Invalid num_recommendations: The num_recommendations must be a positive integer value.');
            
            await expect(contentRecommendationsApi.GetMindsetMinutesContentRecommendations(USER_ID, 'a'))
                .rejects
                .toThrow('web-nestre-api : content-recommendations-api.js GetMindsetMinutesContentRecommendations() Invalid num_recommendations: The num_recommendations must be a positive integer value.');
        });

        test('should fail if a non-existent userId is provided for the API call', async () => {
            const differentUserId = 'non-existent-user';
            // The mock handler will return a 404 for this user ID.
            await expect(contentRecommendationsApi.GetMindsetMinutesContentRecommendations(differentUserId, num_recommendations))
                .rejects
                .toThrow('web-nestre-api : nestre-api-manager.js API Error: 404 - User not found');
        });
    });

    describe('GetMindsetMusicContentRecommendations', () => {
        const num_recommendations = 5;

        test('should retrieve content recommendations successfully', async () => {
            const response = await contentRecommendationsApi.GetMindsetMusicContentRecommendations(USER_ID, num_recommendations);
            expect(response).toBeInstanceOf(Array);
            expect(response.length).toBeGreaterThan(0);
            expect(typeof response[0]).toBe('string');
        });

        test('should reject if userId is not a non-empty string', async () => {
            await expect(contentRecommendationsApi.GetMindsetMusicContentRecommendations(null, num_recommendations))
                .rejects
                .toThrow('web-nestre-api : content-recommendations-api.js GetMindsetMusicContentRecommendations() Invalid userId: The userId must be a non-empty string.');
            
            await expect(contentRecommendationsApi.GetMindsetMusicContentRecommendations('  ', num_recommendations))
                .rejects
                .toThrow('web-nestre-api : content-recommendations-api.js GetMindsetMusicContentRecommendations() Invalid userId: The userId must be a non-empty string.');

            await expect(contentRecommendationsApi.GetMindsetMusicContentRecommendations(123, num_recommendations))
                .rejects
                .toThrow('web-nestre-api : content-recommendations-api.js GetMindsetMusicContentRecommendations() Invalid userId: The userId must be a non-empty string.');
        });

        test('should reject if num_recommendations is not a positive integer', async () => {
            await expect(contentRecommendationsApi.GetMindsetMusicContentRecommendations(USER_ID, null))
                .rejects
                .toThrow('web-nestre-api : content-recommendations-api.js GetMindsetMusicContentRecommendations() Invalid num_recommendations: The num_recommendations must be a positive integer value.');
            
            await expect(contentRecommendationsApi.GetMindsetMusicContentRecommendations(USER_ID, 0))
                .rejects
                .toThrow('web-nestre-api : content-recommendations-api.js GetMindsetMusicContentRecommendations() Invalid num_recommendations: The num_recommendations must be a positive integer value.');

            await expect(contentRecommendationsApi.GetMindsetMusicContentRecommendations(USER_ID, -1))
                .rejects
                .toThrow('web-nestre-api : content-recommendations-api.js GetMindsetMusicContentRecommendations() Invalid num_recommendations: The num_recommendations must be a positive integer value.');
            
            await expect(contentRecommendationsApi.GetMindsetMusicContentRecommendations(USER_ID, 5.5))
                .rejects
                .toThrow('web-nestre-api : content-recommendations-api.js GetMindsetMusicContentRecommendations() Invalid num_recommendations: The num_recommendations must be a positive integer value.');
            
            await expect(contentRecommendationsApi.GetMindsetMusicContentRecommendations(USER_ID, 'a'))
                .rejects
                .toThrow('web-nestre-api : content-recommendations-api.js GetMindsetMusicContentRecommendations() Invalid num_recommendations: The num_recommendations must be a positive integer value.');
        });

        test('should fail if a non-existent userId is provided for the API call', async () => {
            const differentUserId = 'non-existent-user';
            // The mock handler will return a 404 for this user ID.
            await expect(contentRecommendationsApi.GetMindsetMusicContentRecommendations(differentUserId, num_recommendations))
                .rejects
                .toThrow('web-nestre-api : nestre-api-manager.js API Error: 404 - User not found');
        });
    });
});