/**
 * frame-it-api.test.js
 * @file Unit tests for the FrameItApi class.
 * @description This file provides a comprehensive test suite for the `frame-it-api.js` script,
 * validating each method that interacts with the related API endpoints.
 * It uses a mock server using the `msw` library package to test request/response flows without hitting a real server.
 * @requires {NestreApiManager}
 * @requires {msw}
 */

//#region IMPORTS

// Import what we want to test
import { NestreApiManager } from '../src/nestre-api-manager.js';
import { server } from './mocks/server.js';
import { API_BASE_URL, API_VERSION, USER_ID, AUTH_TOKEN } from '../examples/environment-variables.js';

/**
 * @typedef {import('../src/frame-it/frame-it-api.js').FrameItApi } FrameItApi
 */

//#endregion

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());

describe('FrameItApi', () => {
    let nestreApiManager;

    /**
     * @type {FrameItApi}
     */
    let frameItApi;

    beforeEach(() => {
        nestreApiManager = NestreApiManager.GetInstance();
        nestreApiManager.SetBaseUrl(API_BASE_URL);
        nestreApiManager.SetApiVersion(API_VERSION);
        nestreApiManager.SetAuthToken(AUTH_TOKEN);
        frameItApi = nestreApiManager.frameItApi;
    });

    afterEach(() => {
        // Clear the singleton instance
        NestreApiManager.instance = null;
    });

    describe('CreatePersonalizedFrame', () => {
        const validPhrases = ["I am strong", "I am capable"];

        test('should create a personalized frame successfully', async () => {
            const response = await frameItApi.CreatePersonalizedFrame(USER_ID, validPhrases);
            expect(response).toHaveProperty('id');
            expect(response).toHaveProperty('image_url');
            expect(response.phrases).toEqual(validPhrases);
        });

        test('should reject if userId is not a non-empty string', async () => {
            await expect(frameItApi.CreatePersonalizedFrame(null, validPhrases))
                .rejects
                .toThrow('web-nestre-api : frame-it-api.js CreatePersonalizedFrame() Invalid userId: The userId must be a non-empty string.');
            
            await expect(frameItApi.CreatePersonalizedFrame('  ', validPhrases))
                .rejects
                .toThrow('web-nestre-api : frame-it-api.js CreatePersonalizedFrame() Invalid userId: The userId must be a non-empty string.');

            await expect(frameItApi.CreatePersonalizedFrame(123, validPhrases))
                .rejects
                .toThrow('web-nestre-api : frame-it-api.js CreatePersonalizedFrame() Invalid userId: The userId must be a non-empty string.');
        });

        test('should reject if frameItPhrases object is invalid', async () => {
            const invalidPhrases = []; // Schema requires min(1)

            await expect(frameItApi.CreatePersonalizedFrame(USER_ID, invalidPhrases))
                .rejects
                .toThrow('web-nestre-api : frame-it-api.js CreatePersonalizedFrame() Validation failed for frameItPhrases: \"value\" does not contain 1 required value(s)');
        });

        test('should fail if a non-existent userId is provided for the API call', async () => {
            const differentUserId = 'non-existent-user';
            await expect(frameItApi.CreatePersonalizedFrame(differentUserId, validPhrases))
                .rejects
                .toThrow('web-nestre-api : nestre-api-manager.js API Error: 404 - User not found');
        });
    });
});