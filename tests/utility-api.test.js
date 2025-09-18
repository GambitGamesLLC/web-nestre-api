/**
 * utility-api.test.js
 * @file Unit tests for the UtilityApi class.
 * @description This file provides a comprehensive test suite for the `utility-api.js` script,
 * validating each method that interacts with the utility-related API endpoints.
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

/**
 * @typedef {import('../src/utility/utility-types.js').ErrorLog } ErrorLog
 */

//#endregion

//#region DESCRIBE - utility-api.js - constructor()

describe( "utility-api.js constructor", ()=>
{
    it("should create an instance of the UtilityApi object on NestreApiManager", ()=>
    {
        //Arrange
        NestreApiManager.instance = null;

        //Act
        const manager = NestreApiManager.GetInstance();

        //Assert
        expect( manager ).not.toBe( null );
        expect( manager.utilityApi ).not.toBe( null );
    });
});

//#endregion

//#region DESCRIBE - utility-api.js - CreateShortenedUrl()

describe( "utility-api.js CreateShortenedUrl()", () =>
{
    it('should create a shortened URL successfully', async () =>
    {
        // Arrange
        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        manager.SetBaseUrl(API_BASE_URL);
        manager.SetApiVersion(API_VERSION);
        manager.SetAuthToken(AUTH_TOKEN);

        const utilityApi = manager.utilityApi;
        const longUrl = 'https://www.verylongurl.com/with/many/segments/and/query?params=true';

        // Act
        const shortenedUrl = await utilityApi.CreateShortenedUrl(longUrl);

        // Assert
        expect(shortenedUrl).toBe('https://sh.rt/url123');
    });

    it('should throw an error for an invalid URL', async () => {
        // Arrange
        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        manager.SetBaseUrl(API_BASE_URL);
        manager.SetApiVersion(API_VERSION);
        manager.SetAuthToken(AUTH_TOKEN);

        const utilityApi = manager.utilityApi;
        const invalidUrl = 'not-a-valid-url';

        // Act & Assert
        await expect(
            utilityApi.CreateShortenedUrl(invalidUrl)
        ).rejects.toThrow('web-nestre-api : utility-api.js CreateShortenedUrl() Validation failed for url: "value" must be a valid uri');
    });
});

//#endregion

//#region DESCRIBE - utility-api.js - IsAfterNestreDawn()

describe("utility-api.js IsAfterNestreDawn()", () => {
    it('should return true when the date is after Nestre dawn', async () => {
        // Arrange
        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        manager.SetBaseUrl(API_BASE_URL);
        manager.SetApiVersion(API_VERSION);
        manager.SetAuthToken(AUTH_TOKEN);

        const utilityApi = manager.utilityApi;
        const date = new Date('2024-01-01T10:00:00.000Z'); // Mock dawn is 4am UTC

        // Act
        const result = await utilityApi.IsAfterNestreDawn(date);

        // Assert
        expect(result).toBe(true);
    });

    it('should return false when the date is before Nestre dawn', async () => {
        // Arrange
        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        manager.SetBaseUrl(API_BASE_URL);
        manager.SetApiVersion(API_VERSION);
        manager.SetAuthToken(AUTH_TOKEN);

        const utilityApi = manager.utilityApi;
        const date = new Date('2024-01-01T02:00:00.000Z'); // Mock dawn is 4am UTC

        // Act
        const result = await utilityApi.IsAfterNestreDawn(date);

        // Assert
        expect(result).toBe(false);
    });

    it('should throw an error for an invalid date object', async () => {
        // Arrange
        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        const utilityApi = manager.utilityApi;
        const invalidDate = new Date('not-a-valid-date');

        // Act & Assert
        await expect(
            utilityApi.IsAfterNestreDawn(invalidDate)
        ).rejects.toThrow('web-nestre-api : utility-api.js IsAfterNestreDawn() Invalid date: The date must be a valid Date object.');
    });

    it('should throw an error if date is not a Date object', async () => {
        // Arrange
        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        const utilityApi = manager.utilityApi;

        // Act & Assert
        await expect(
            utilityApi.IsAfterNestreDawn('2024-01-01T10:00:00.000Z')
        ).rejects.toThrow('web-nestre-api : utility-api.js IsAfterNestreDawn() Invalid date: The date must be a valid Date object.');
    });
});

//#endregion

//#region DESCRIBE - utility-api.js - LogClientError()

describe("utility-api.js LogClientError()", () => {
    it('should log a client error successfully', async () => {
        // Arrange
        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        manager.SetBaseUrl(API_BASE_URL);
        manager.SetApiVersion(API_VERSION);
        manager.SetAuthToken(AUTH_TOKEN);

        const utilityApi = manager.utilityApi;
        /** @type {ErrorLog} */
        const errorLog = {
            message: 'Client-side test error',
            log_level: 'ERROR'
        };

        // Act
        const result = await utilityApi.LogClientError(errorLog);

        // Assert
        expect(result).toBe('Client error logged successfully.');
    });

    it('should throw an error for an invalid errorLog object', async () => {
        // Arrange
        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        const utilityApi = manager.utilityApi;
        const invalidErrorLog = {
            message: 'This is a message',
            // log_level is missing
        };

        // Act & Assert
        await expect(
            utilityApi.LogClientError(invalidErrorLog)
        ).rejects.toThrow('web-nestre-api : utility-api.js LogClientError() Validation failed for errorLog: "log_level" is required');
    });

    it('should throw an error for an errorLog object with extra properties', async () => {
        // Arrange
        NestreApiManager.instance = null;
        const manager = NestreApiManager.GetInstance();
        const utilityApi = manager.utilityApi;
        const invalidErrorLogWithExtra = {
            message: 'This is a message',
            log_level: 'WARN',
            extra_field: 'should not be here'
        };

        // Act & Assert
        await expect(
            utilityApi.LogClientError(invalidErrorLogWithExtra)
        ).rejects.toThrow('web-nestre-api : utility-api.js LogClientError() Validation failed for errorLog: "extra_field" is not allowed');
    });
});

//#endregion
