/**
 * lookup-api.test.js
 * @file Unit tests for the LookupApi class.
 * @description This file provides a comprehensive test suite for the `lookup-api.js` script,
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
 * @typedef {import('../../src/lookup/lookup-api.js').LookupApi } LookupApi
 */

//#endregion

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());

//#region DESCRIBE - lookup-api.js - GetGenderOptions()

describe("lookup-api.js GetGenderOptions()", () => {
    it('should fetch gender options successfully', async () => {
        // Arrange
        NestreApiManager.instance = null;
        const nestreApiManager = NestreApiManager.GetInstance();
        nestreApiManager.SetBaseUrl(API_BASE_URL);
        nestreApiManager.SetApiVersion(API_VERSION);
        nestreApiManager.SetAuthToken(AUTH_TOKEN);

        const lookupApi = nestreApiManager.lookupApi;

        // Act
        const genderOptions = await lookupApi.GetGenderOptions();

        // Assert
        expect(genderOptions).toBeDefined();
        expect(Array.isArray(genderOptions.gender_options)).toBe(true);
        expect(genderOptions.gender_options.length).toBeGreaterThan(0);
        expect(genderOptions.gender_options[0]).toHaveProperty('id');
        expect(genderOptions.gender_options[0]).toHaveProperty('name');
    });

    it('should throw an error if auth token is not set', async () => {
        // Arrange
        NestreApiManager.instance = null;
        const nestreApiManager = NestreApiManager.GetInstance();
        nestreApiManager.SetBaseUrl(API_BASE_URL);
        nestreApiManager.SetApiVersion(API_VERSION);
        // No auth token set

        const lookupApi = nestreApiManager.lookupApi;

        // Act & Assert
        await expect(lookupApi.GetGenderOptions()).rejects.toThrow('web-nestre-api : nestre-api-manager.js Error: this._authToken is null, undefined, or an empty string');
    });
});

//#endregion

//#region DESCRIBE - lookup-api.js - GetEducationOptions()

describe("lookup-api.js GetEducationOptions()", () => {
    it('should fetch education options successfully', async () => {
        // Arrange
        NestreApiManager.instance = null;
        const nestreApiManager = NestreApiManager.GetInstance();
        nestreApiManager.SetBaseUrl(API_BASE_URL);
        nestreApiManager.SetApiVersion(API_VERSION);
        nestreApiManager.SetAuthToken(AUTH_TOKEN);

        const lookupApi = nestreApiManager.lookupApi;

        // Act
        const educationOptions = await lookupApi.GetEducationOptions();

        // Assert
        expect(educationOptions).toBeDefined();
        expect(Array.isArray(educationOptions.education_options)).toBe(true);
        expect(educationOptions.education_options.length).toBeGreaterThan(0);
        expect(educationOptions.education_options[0]).toHaveProperty('id');
        expect(educationOptions.education_options[0]).toHaveProperty('name');
        expect(educationOptions.education_options[0]).toHaveProperty('value');
    });

    it('should throw an error if auth token is not set', async () => {
        // Arrange
        NestreApiManager.instance = null;
        const nestreApiManager = NestreApiManager.GetInstance();
        nestreApiManager.SetBaseUrl(API_BASE_URL);
        nestreApiManager.SetApiVersion(API_VERSION);
        // No auth token set

        const lookupApi = nestreApiManager.lookupApi;

        // Act & Assert
        await expect(lookupApi.GetEducationOptions()).rejects.toThrow('web-nestre-api : nestre-api-manager.js Error: this._authToken is null, undefined, or an empty string');
    });
});

//#endregion

//#region DESCRIBE - lookup-api.js - GetMaritalOptions()

describe("lookup-api.js GetMaritalOptions()", () => {
    it('should fetch marital options successfully', async () => {
        // Arrange
        NestreApiManager.instance = null;
        const nestreApiManager = NestreApiManager.GetInstance();
        nestreApiManager.SetBaseUrl(API_BASE_URL);
        nestreApiManager.SetApiVersion(API_VERSION);
        nestreApiManager.SetAuthToken(AUTH_TOKEN);

        const lookupApi = nestreApiManager.lookupApi;

        // Act
        const maritalOptions = await lookupApi.GetMaritalOptions();

        // Assert
        expect(maritalOptions).toBeDefined();
        expect(Array.isArray(maritalOptions.marital_options)).toBe(true);
        expect(maritalOptions.marital_options.length).toBeGreaterThan(0);
        expect(maritalOptions.marital_options[0]).toHaveProperty('id');
        expect(maritalOptions.marital_options[0]).toHaveProperty('name');
    });

    it('should throw an error if auth token is not set', async () => {
        // Arrange
        NestreApiManager.instance = null;
        const nestreApiManager = NestreApiManager.GetInstance();
        nestreApiManager.SetBaseUrl(API_BASE_URL);
        nestreApiManager.SetApiVersion(API_VERSION);
        // No auth token set

        const lookupApi = nestreApiManager.lookupApi;

        // Act & Assert
        await expect(lookupApi.GetMaritalOptions()).rejects.toThrow('web-nestre-api : nestre-api-manager.js Error: this._authToken is null, undefined, or an empty string');
    });
});

//#endregion

//#region DESCRIBE - lookup-api.js - GetSubscriptionOptions()

describe("lookup-api.js GetSubscriptionOptions()", () => {
    it('should fetch subscription options successfully', async () => {
        // Arrange
        NestreApiManager.instance = null;
        const nestreApiManager = NestreApiManager.GetInstance();
        nestreApiManager.SetBaseUrl(API_BASE_URL);
        nestreApiManager.SetApiVersion(API_VERSION);
        nestreApiManager.SetAuthToken(AUTH_TOKEN);

        const lookupApi = nestreApiManager.lookupApi;

        // Act
        const subscriptionOptions = await lookupApi.GetSubscriptionOptions();

        // Assert
        expect(subscriptionOptions).toBeDefined();
        expect(Array.isArray(subscriptionOptions.subscription_options)).toBe(true);
        expect(subscriptionOptions.subscription_options.length).toBeGreaterThan(0);
        expect(subscriptionOptions.subscription_options[0]).toHaveProperty('id');
        expect(subscriptionOptions.subscription_options[0]).toHaveProperty('name');
        expect(subscriptionOptions.subscription_options[0]).toHaveProperty('value');
    });

    it('should throw an error if auth token is not set', async () => {
        // Arrange
        NestreApiManager.instance = null;
        const nestreApiManager = NestreApiManager.GetInstance();
        nestreApiManager.SetBaseUrl(API_BASE_URL);
        nestreApiManager.SetApiVersion(API_VERSION);
        // No auth token set

        const lookupApi = nestreApiManager.lookupApi;

        // Act & Assert
        await expect(lookupApi.GetSubscriptionOptions()).rejects.toThrow('web-nestre-api : nestre-api-manager.js Error: this._authToken is null, undefined, or an empty string');
    });
});

//#endregion