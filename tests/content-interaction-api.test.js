/**
 * content-interaction-api.test.js
 * @file Unit tests for the ContentInteractionApi class.
 * @description This file contains unit tests for the ContentInteractionApi class, 
 * ensuring that all methods behave as expected, handle errors correctly, and interact with the mock API appropriately.
 */

//#region IMPORTS

import { NestreApiManager } from '../src/nestre-api-manager.js';
import { server } from './mocks/server.js';
import { API_BASE_URL, API_VERSION, USER_ID, AUTH_TOKEN } from '../examples/environment-variables.js';

/**
 * @typedef {import('../src/content-interaction/content-interaction-api.js').ContentInteractionApi } ContentInteractionApi
 */

//#endregion

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());

describe('ContentInteractionApi', () => {
    let nestreApiManager;

    /**
     * @type {ContentInteractionApi}
     */
    let contentInteractionApi;

    beforeEach(() => {
        nestreApiManager = NestreApiManager.GetInstance();
        nestreApiManager.SetBaseUrl(API_BASE_URL);
        nestreApiManager.SetApiVersion(API_VERSION);
        nestreApiManager.SetAuthToken(AUTH_TOKEN);
        contentInteractionApi = nestreApiManager.contentInteractionApi;
    });

    afterEach(() => {
        // Clear the singleton instance
        NestreApiManager.instance = null;
    });

    describe('CreateActivateContentInteraction', () => {
        const validInteraction = {
            user_id: USER_ID,
            interaction_duration: 120.5,
            interaction_record: [1, 2, 3],
            last_position: 3,
            context: "daily_workout",
            cms_version: 1,
            user_subscription_level_id: 1,
            content_id: "some-content-id"
        };

        test('should record an content interaction successfully', async () => {
            const response = await contentInteractionApi.CreateActivateContentInteraction(USER_ID, validInteraction);
            expect(response).toEqual({ message: "Activate interaction created successfully" });
        });

        test('should reject if userId is not a non-empty string', async () => {
            await expect(contentInteractionApi.CreateActivateContentInteraction(null, validInteraction))
                .rejects
                .toThrow('web-nestre-api : content-interaction-api.js CreateActivateContentInteraction() Invalid userId: The userId must be a non-empty string.');
            
            await expect(contentInteractionApi.CreateActivateContentInteraction('  ', validInteraction))
                .rejects
                .toThrow('web-nestre-api : content-interaction-api.js CreateActivateContentInteraction() Invalid userId: The userId must be a non-empty string.');

            await expect(contentInteractionApi.CreateActivateContentInteraction(123, validInteraction))
                .rejects
                .toThrow('web-nestre-api : content-interaction-api.js CreateActivateContentInteraction() Invalid userId: The userId must be a non-empty string.');
        });

        test('should reject if contentInteraction object is invalid', async () => {
            const invalidInteraction = { ...validInteraction };
            delete invalidInteraction.content_id; // Missing required field

            await expect(contentInteractionApi.CreateActivateContentInteraction(USER_ID, invalidInteraction))
                .rejects
                .toThrow('web-nestre-api : content-interaction-api.js CreateActivateContentInteraction() Validation failed for contentInteraction: "content_id" is required');
        });

        test('should fail if a non-existent userId is provided for the API call', async () => {
            const differentUserId = 'different-user';
            // The mock handler will return a 404 for this user ID.
            // The NestreApiManager's Request method will catch this and throw a generic error.
            await expect(contentInteractionApi.CreateActivateContentInteraction(differentUserId, validInteraction))
                .rejects
                .toThrow('web-nestre-api : nestre-api-manager.js API Error: 404 - User not found');
        });
    });

    describe('CreateGuidedFrameContentInteraction', () => {
        const validInteraction = {
            user_id: USER_ID,
            interaction_duration: 180.2,
            interaction_record: [10, 20, 30],
            last_position: 30,
            context: "guided_frame",
            cms_version: 2,
            user_subscription_level_id: 1,
            content_id: "thye2n10m2TuAVXfTPE2U"
        };

        test('should record a guided frame content interaction successfully', async () => {
            const response = await contentInteractionApi.CreateGuidedFrameContentInteraction(USER_ID, validInteraction);
            expect(response).toEqual({ message: "Guided frame interaction created successfully" });
        });

        test('should reject if userId is not a non-empty string', async () => {
            await expect(contentInteractionApi.CreateGuidedFrameContentInteraction(null, validInteraction))
                .rejects
                .toThrow('web-nestre-api : content-interaction-api.js CreateGuidedFrameContentInteraction() Invalid userId: The userId must be a non-empty string.');
            
            await expect(contentInteractionApi.CreateGuidedFrameContentInteraction('  ', validInteraction))
                .rejects
                .toThrow('web-nestre-api : content-interaction-api.js CreateGuidedFrameContentInteraction() Invalid userId: The userId must be a non-empty string.');

            await expect(contentInteractionApi.CreateGuidedFrameContentInteraction(123, validInteraction))
                .rejects
                .toThrow('web-nestre-api : content-interaction-api.js CreateGuidedFrameContentInteraction() Invalid userId: The userId must be a non-empty string.');
        });

        test('should reject if contentInteraction object is invalid', async () => {
            const invalidInteraction = { ...validInteraction, content_id: undefined }; // Make it invalid

            await expect(contentInteractionApi.CreateGuidedFrameContentInteraction(USER_ID, invalidInteraction))
                .rejects
                .toThrow('web-nestre-api : content-interaction-api.js CreateGuidedFrameContentInteraction() Validation failed for contentInteraction: "content_id" is required');
        });

        test('should fail if a non-existent userId is provided for the API call', async () => {
            const differentUserId = 'different-user';
            await expect(contentInteractionApi.CreateGuidedFrameContentInteraction(differentUserId, validInteraction))
                .rejects
                .toThrow('web-nestre-api : nestre-api-manager.js API Error: 404 - User not found');
        });
    });

    describe('CreateMentalFrameContentInteraction', () => {
        const validInteraction = {
            user_id: USER_ID,
            interaction_duration: 240.7,
            interaction_record: [5, 10, 15],
            last_position: 15,
            context: "daily_workout",
            cms_version: 1,
            user_subscription_level_id: 1,
            content_id: "LSdmO2qK3Lw23A7BetNTm"
        };

        test('should record a mental frame content interaction successfully', async () => {
            const response = await contentInteractionApi.CreateMentalFrameContentInteraction(USER_ID, validInteraction);
            expect(response).toEqual({ message: "Mental frame interaction created successfully" });
        });

        test('should reject if userId is not a non-empty string', async () => {
            await expect(contentInteractionApi.CreateMentalFrameContentInteraction(null, validInteraction))
                .rejects
                .toThrow('web-nestre-api : content-interaction-api.js CreateMentalFrameContentInteraction() Invalid userId: The userId must be a non-empty string.');
            
            await expect(contentInteractionApi.CreateMentalFrameContentInteraction('  ', validInteraction))
                .rejects
                .toThrow('web-nestre-api : content-interaction-api.js CreateMentalFrameContentInteraction() Invalid userId: The userId must be a non-empty string.');

            await expect(contentInteractionApi.CreateMentalFrameContentInteraction(123, validInteraction))
                .rejects
                .toThrow('web-nestre-api : content-interaction-api.js CreateMentalFrameContentInteraction() Invalid userId: The userId must be a non-empty string.');
        });

        test('should reject if contentInteraction object is invalid', async () => {
            const invalidInteraction = { ...validInteraction, content_id: undefined }; // Make it invalid

            await expect(contentInteractionApi.CreateMentalFrameContentInteraction(USER_ID, invalidInteraction))
                .rejects
                .toThrow('web-nestre-api : content-interaction-api.js CreateMentalFrameContentInteraction() Validation failed for contentInteraction: "content_id" is required');
        });

        test('should fail if a non-existent userId is provided for the API call', async () => {
            const differentUserId = 'different-user';
            await expect(contentInteractionApi.CreateMentalFrameContentInteraction(differentUserId, validInteraction))
                .rejects
                .toThrow('web-nestre-api : nestre-api-manager.js API Error: 404 - User not found');
        });
    });
});