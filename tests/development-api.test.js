/**
 * development-api.test.js
 * @file Unit tests for the DevelopmentApi class.
 * @description This file provides a comprehensive test suite for the `development-api.js` script,
 * validating each method that interacts with the development-related API endpoints.
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

/**
 * @typedef {import('../src/development/development-types.js').AuthenticationRequest } AuthenticationRequest
 * @typedef {import('../src/development/development-types.js').AuthenticationData } AuthenticationData
 */

//#endregion

//#region DESCRIBE - development-api.js - constructor()

describe( "development-api.js constructor", ()=>
{
    it("should create an instance of the DevelopmentApi object", ()=>
    {
        //Arrange
        NestreApiManager.instance = null;

        //Act
        const manager = NestreApiManager.GetInstance();

        //Assert
        expect( manager.developmentApi ).not.toBe( null );
        expect( manager.developmentApi ).toBeDefined();
    });
});

//#endregion

//#region DESCRIBE - development-api.js - Authenticate()

describe( "development-api.js Authenticate()", () =>
{
    beforeEach(() => {
        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        manager.SetBaseUrl(API_BASE_URL);
        manager.SetApiVersion(API_VERSION);
        // The Authenticate endpoint doesn't require a bearer token, so we don't set one.
    });

    it('should authenticate a user and return authentication data', async () =>
    {
        // Arrange
        const developmentApi = NestreApiManager.GetInstance().developmentApi;
        
        /** @type {AuthenticationRequest} */
        const authRequest = {
            username: 'testuser',
            password: 'testpassword'
        };

        // Act
        const authData = await developmentApi.Authenticate(authRequest);

        // Assert
        expect(authData).toBeDefined();
        expect(authData.AccessToken).toBe('mock-access-token');
        expect(authData.IdToken).toBe('mock-id-token');
    });

    it('should throw a validation error for an invalid request body', async () => {
        // Arrange
        const developmentApi = NestreApiManager.GetInstance().developmentApi;
        /** @type {any} */
        const invalidAuthRequest = {
            username: 'testuser' // Missing password
        };

        // Act & Assert
        await expect(
            developmentApi.Authenticate(invalidAuthRequest)
        ).rejects.toThrow('web-nestre-api : development-api.js Authenticate() Validation failed for authenticationRequest: "password" is required');
    });
});

//#endregion