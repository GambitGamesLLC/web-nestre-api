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

    describe('GetFrameById', () => {
        const validFrameId = 'some-frame-id';

        test('should get a frame by ID successfully', async () => {
            const response = await frameItApi.GetFrameById(USER_ID, validFrameId);
            expect(response).toHaveProperty('id', validFrameId);
            expect(response).toHaveProperty('image_url');
            expect(response).toHaveProperty('phrases');
        });

        test('should reject if userId is not a non-empty string', async () => {
            await expect(frameItApi.GetFrameById(null, validFrameId))
                .rejects
                .toThrow('web-nestre-api : frame-it-api.js GetFrameById() Invalid userId: The userId must be a non-empty string.');
            
            await expect(frameItApi.GetFrameById('  ', validFrameId))
                .rejects
                .toThrow('web-nestre-api : frame-it-api.js GetFrameById() Invalid userId: The userId must be a non-empty string.');

            await expect(frameItApi.GetFrameById(123, validFrameId))
                .rejects
                .toThrow('web-nestre-api : frame-it-api.js GetFrameById() Invalid userId: The userId must be a non-empty string.');
        });

        test('should reject if frameId is not a non-empty string', async () => {
            await expect(frameItApi.GetFrameById(USER_ID, null))
                .rejects
                .toThrow('web-nestre-api : frame-it-api.js GetFrameById() Invalid frameId: The frameId must be a non-empty string.');

            await expect(frameItApi.GetFrameById(USER_ID, '  '))
                .rejects
                .toThrow('web-nestre-api : frame-it-api.js GetFrameById() Invalid frameId: The frameId must be a non-empty string.');

            await expect(frameItApi.GetFrameById(USER_ID, 456))
                .rejects
                .toThrow('web-nestre-api : frame-it-api.js GetFrameById() Invalid frameId: The frameId must be a non-empty string.');
        });

        test('should fail if a non-existent frameId is provided for the API call', async () => {
            const nonExistentFrameId = 'non-existent-frame';
            await expect(frameItApi.GetFrameById(USER_ID, nonExistentFrameId))
                .rejects
                .toThrow('web-nestre-api : nestre-api-manager.js API Error: 404 - Frame not found');
        });
    });

    describe('UpdateFrame', () => {
        const validFrameId = 'some-frame-id';
        const validUpdateData = { wins: ["New win"] };

        test('should update a frame successfully', async () => {
            const response = await frameItApi.UpdateFrame(USER_ID, validFrameId, validUpdateData);
            expect(response).toHaveProperty('id', validFrameId);
            expect(response.wins).toEqual(validUpdateData.wins);
        });

        test('should reject if userId is not a non-empty string', async () => {
            await expect(frameItApi.UpdateFrame(null, validFrameId, validUpdateData))
                .rejects
                .toThrow('web-nestre-api : frame-it-api.js UpdateFrame() Invalid userId: The userId must be a non-empty string.');
            
            await expect(frameItApi.UpdateFrame('  ', validFrameId, validUpdateData))
                .rejects
                .toThrow('web-nestre-api : frame-it-api.js UpdateFrame() Invalid userId: The userId must be a non-empty string.');
        });

        test('should reject if frameId is not a non-empty string', async () => {
            await expect(frameItApi.UpdateFrame(USER_ID, null, validUpdateData))
                .rejects
                .toThrow('web-nestre-api : frame-it-api.js UpdateFrame() Invalid frameId: The frameId must be a non-empty string.');

            await expect(frameItApi.UpdateFrame(USER_ID, '  ', validUpdateData))
                .rejects
                .toThrow('web-nestre-api : frame-it-api.js UpdateFrame() Invalid frameId: The frameId must be a non-empty string.');
        });

        test('should reject if updateFrameData object is invalid', async () => {
            const invalidUpdateData = { wins: "not an array" }; // Schema requires an array of strings

            await expect(frameItApi.UpdateFrame(USER_ID, validFrameId, invalidUpdateData))
                .rejects
                .toThrow('web-nestre-api : frame-it-api.js UpdateFrame() Validation failed for updateFrameData: "wins" must be an array');
        });

        test('should fail if a non-existent userId is provided for the API call', async () => {
            const nonExistentUserId = 'non-existent-user';
            await expect(frameItApi.UpdateFrame(nonExistentUserId, validFrameId, validUpdateData))
                .rejects
                .toThrow('web-nestre-api : nestre-api-manager.js API Error: 404 - User not found');
        });

        test('should fail if a non-existent frameId is provided for the API call', async () => {
            const nonExistentFrameId = 'non-existent-frame';
            await expect(frameItApi.UpdateFrame(USER_ID, nonExistentFrameId, validUpdateData))
                .rejects
                .toThrow('web-nestre-api : nestre-api-manager.js API Error: 404 - Frame not found');
        });
    });
});