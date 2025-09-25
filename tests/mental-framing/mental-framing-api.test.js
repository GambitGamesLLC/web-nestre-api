/**
 * mental-framing-api.test.js
 * @file Unit tests for the MentalFramingApi class.
 * @description This file provides a comprehensive test suite for the `mental-framing-api.js` script,
 * validating each method that interacts with the related API endpoints.
 * It uses a mock server using the `msw` library package to test request/response flows without hitting a real server.
 * @requires {NestreApiManager}
 * @requires {msw}
 */


//#region IMPORTS

// Import what we want to test
import { NestreApiManager } from '../../src/nestre-api-manager.js';

//Import the BASE_URL from our environment-variables.js
import { API_BASE_URL } from '../../examples/environment-variables.js';

//Import the API_VERSION from our environment-variables.js
import { API_VERSION } from '../../examples/environment-variables.js';

//Import the AUTH_TOKEN from our environment-variables.js
import { AUTH_TOKEN } from '../../examples/environment-variables.js';

//Import the USER_ID from our environment-variables.js
import { USER_ID } from '../../examples/environment-variables.js';

import { server } from '../mocks/server.js';
import { http, HttpResponse } from 'msw';

/**
 * @typedef {import('../../src/mental-framing/mental-framing-types.js').MentalFramingContentIds } MentalFramingContentIds
 */

//#endregion

//#region DESCRIBE - cognitive-exercises-api.js - constructor()

describe( "mental-framing-api.js constructor", ()=>
{
    it("should create an instance of the MentalFramingApi object on NestreApiManager", ()=>
    {
        //Arrange
        NestreApiManager.instance = null;

        //Act
        const manager = NestreApiManager.GetInstance();

        //Assert
        expect( manager ).not.toBe( null );
        expect( manager.mentalFramingApi ).not.toBe( null );
    });
});

//#endregion

//#region DESCRIBE - mental-framing-api.js - GetMentalFramingContentIds()

describe("mental-framing-api.js GetMentalFramingContentIds", () => 
{
    // Setup before each test
    beforeEach(() => 
    {
        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        manager.SetBaseUrl(API_BASE_URL);
        manager.SetApiVersion(API_VERSION);
        manager.SetAuthToken(AUTH_TOKEN);
    });

    // Test for successful retrieval of content IDs
    it("should return mental framing content IDs for a valid user ID", async () => 
    {
        // Arrange
        const manager = NestreApiManager.GetInstance();

        // Act
        const contentIds = await manager.mentalFramingApi.GetMentalFramingContentIds(USER_ID);

        // Assert
        expect(contentIds).not.toBe(null);
        expect(Array.isArray(contentIds)).toBe(true);
        expect(contentIds.length).toBeGreaterThan(0);
        expect(contentIds[0]).toBe("mf_001");
    });

});

//#endregion


//#region DESCRIBE - mental-framing-api.js - GetMentalFramingContentIds() - ERROR HANDLING

describe("mental-framing-api.js GetMentalFramingContentIds - Error Handling", () => 
{
    
    // Test for invalid user ID - null
    it("should reject with an error for a null user ID", async () => 
    {
        // Arrange
        const manager = NestreApiManager.GetInstance();

        // Act & Assert
        await expect(manager.mentalFramingApi.GetMentalFramingContentIds(null)).rejects.toThrow("web-nestre-api : mental-framing-api.js GetMentalFramingContentIds() Invalid userId: The userId must be a non-empty string.");
    });

    // Test for invalid user ID - empty string
    it("should reject with an error for an empty user ID", async () => 
    {
        // Arrange
        const manager = NestreApiManager.GetInstance();

        // Act & Assert
        await expect(manager.mentalFramingApi.GetMentalFramingContentIds("")).rejects.toThrow("web-nestre-api : mental-framing-api.js GetMentalFramingContentIds() Invalid userId: The userId must be a non-empty string.");
    });

    // Test for invalid user ID - whitespace
    it("should reject with an error for a whitespace user ID", async () => 
    {
        // Arrange
        const manager = NestreApiManager.GetInstance();

        // Act & Assert
        await expect(manager.mentalFramingApi.GetMentalFramingContentIds("   ")).rejects.toThrow("web-nestre-api : mental-framing-api.js GetMentalFramingContentIds() Invalid userId: The userId must be a non-empty string.");
    });

    // Test for API error
    it("should throw an error when the API returns an error", async () => 
    {
        // Arrange
        const manager = NestreApiManager.GetInstance();
        const errorUserId = 'error-user';

        // Act & Assert
        await expect(manager.mentalFramingApi.GetMentalFramingContentIds(errorUserId)).rejects.toThrow("web-nestre-api : nestre-api-manager.js API Error (500). Internal server error.");
    });
});

//#endregion
