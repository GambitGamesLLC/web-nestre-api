/**
 * nestre-api-manager.test.js
 * @file Unit tests for the NestreApiManager class.
 * @description This file contains a suite of tests that validate the functionality
 * of the `nestre-api-manager.js` script.
 * It covers constructor behavior, validation, and request handling,
 * ensuring the core API client works as expected.
 * @requires {NestreApiManager}
 * @requires {HttpMethod}
 * @requires {msw}
 */

//#region IMPORTS

// Import what we want to test
import { NestreApiManager, HttpMethod } from '../src/nestre-api-manager.js';

//Import the BASE_URL from our environment-variables.js
import { API_BASE_URL } from '../examples/environment-variables.js';

//Import the API_VERSION from our environment-variables.js
import { API_VERSION } from '../examples/environment-variables.js';

//Import the AUTH_TOKEN from our environment-variables.js
import { AUTH_TOKEN } from '../examples/environment-variables.js';

//Import the USER_ID from our environment-variables.js
import { USER_ID } from '../examples/environment-variables.js';

//Import the USER_EMAIL from our environment-variables.js
import { USER_EMAIL } from '../examples/environment-variables.js';

//Import the BasicUserProfile used to mock the return data from the get-user-by-email call
/**
 * @typedef {import('../src/user/user-types.js').BasicUserProfile } BasicUserProfile
 */

import { server } from '../tests/mocks/server.js';
import { http, HttpResponse } from 'msw';

//Custom error class returned by our nestre-api-manager.js Request() when we have a 422 status code in our server Api response
import { ValidationError } from '../src/errors/validation-error.js';
import { AuthorizationError } from '../src/errors/authorization-error.js';

//#endregion

//#region DESCRIBE - nestre-api-manager.js - constructor()

describe( "nestre-api-manager.js constructor()", () =>
{

    // Test case for initial instantiation branch
    it("should create a new instance and return it on the first call", () => {
        // Arrange & Act
        NestreApiManager.instance = null; // Ensure a clean state
        const instance = NestreApiManager.GetInstance();

        // Assert
        expect(instance).not.toBeNull();
        expect(NestreApiManager.instance).toBe(instance);
    });

    // Test case for initial instantiation
    it("should create a userApi object on first call", () => {
        // Arrange
        NestreApiManager.instance = null; // Ensure a clean state

        // Act
        const instance = new NestreApiManager(); // Or GetInstance()

        // Assert
        expect(instance.userApi).not.toBe(null);
    });

    // Test case for subsequent calls (covers the early return) 🎯
    it("should return the existing instance on subsequent calls", () => {
        // Arrange
        NestreApiManager.instance = null; // Ensure a clean state
        const firstInstance = new NestreApiManager();

        // Act
        const secondInstance = new NestreApiManager();

        // Assert
        // This confirms the constructor returned the pre-existing instance
        expect(secondInstance).toBe(firstInstance);
    });

    // Make sure we only create a userApi object on the first call
    it("should only create the userApi object when first called", () => {
        // Arrange
        NestreApiManager.instance = null; // Reset the singleton for a clean test
        const firstInstance = new NestreApiManager();
        const firstUserApi = firstInstance.userApi; // Get a reference to the initial userAPI object

        // Act
        const secondInstance = new NestreApiManager(); // Call the constructor again

        // Assert
        // This proves the userAPI object is the exact same one from the first call,
        // and was not re-created.
        expect(secondInstance.userApi).toBe(firstUserApi);
    });

}); //END describe nestre-api-manager.js - constructor

//#endregion

//#region DESCRIBE - nestre-api-manager.js - GetInstance()

//describe is used to group related tests together
describe( "nestre-api-manager.js GetInstance()", () =>
{

    it("should return an instance of the NestreApiManager", ()=>
    {
        //Arrange


        //Act
        const nestreApiManager1 = NestreApiManager.GetInstance();

        //Assert
        expect(nestreApiManager1).not.toBe(null);
    });

    it( "should return the same instance of the NestreApiManager", ()=>
    {
        //Arrange

        //Act
        const nestreApiManager1 = NestreApiManager.GetInstance();
        const nestreApiManager2 = NestreApiManager.GetInstance();

        //Assert
        expect(nestreApiManager1).toBe(nestreApiManager2);
    });

}); //END describe nestre-api-manager.js GetInstance() Method

//#endregion

//#region DESCRIBE - nestre-api-manager.js - SetBaseUrl

describe( "nestre-api-manager.js SetBaseUrl()", () =>
{
    it("should set the baseUrl parameter when a valid url is passed in", ()=>
    {
        //Arrange
        const instance = NestreApiManager.GetInstance();
        const baseUrl = 'http://test.url';
        
        //Act
        instance.SetBaseUrl(baseUrl);

        //Assert
        expect(instance._baseUrl).toEqual(baseUrl);
    });

    it( "should throw an error if our baseUrl parameter is null", ()=>
    {
        //Arrange
        const instance = NestreApiManager.GetInstance();
        let baseUrl = null;

        //Act

        //Assert
        expect(() => {
            instance.SetBaseUrl(baseUrl);
        }).toThrow();

    });

    it( "should throw an error if our baseUrl parameter is undefined", ()=>
    {
        //Arrange
        const instance = NestreApiManager.GetInstance();
        let baseUrl = undefined;

        //Act

        //Assert
        expect(() => {
            instance.SetBaseUrl(baseUrl);
        }).toThrow();

    });

    it( "should throw an error if our baseUrl parameter is an empty string", ()=>
    {
        //Arrange
        const instance = NestreApiManager.GetInstance();
        let baseUrl = '';

        //Act

        //Assert
        expect(() => {
            instance.SetBaseUrl(baseUrl);
        }).toThrow();

    });

});

//#endregion

//#region DESCRIBE - nestre-api-manager.js - SetApiVersion

describe( "nestre-api-manager.js SetApiVersion()", () =>
{
    it("should set the version parameter when a valid number is passed in", ()=>
    {
        //Arrange
        const instance = NestreApiManager.GetInstance();
        const version = API_VERSION;
        
        //Act
        instance.SetApiVersion(version);

        //Assert
        expect(instance._version).toEqual(version);
    });

    it( "should throw an error if our version parameter is null", ()=>
    {
        //Arrange
        const instance = NestreApiManager.GetInstance();
        let version = null;

        //Act

        //Assert
        expect(() => {
            instance.SetApiVersion(version);
        }).toThrow();

    });

    it( "should throw an error if our version parameter is undefined", ()=>
    {
        //Arrange
        const instance = NestreApiManager.GetInstance();
        let version = undefined;

        //Act

        //Assert
        expect(() => {
            instance.SetApiVersion(version);
        }).toThrow();

    });

    it( "should throw an error if our version parameter is not a type of number", ()=>
    {
        //Arrange
        const instance = NestreApiManager.GetInstance();
        let version = '';

        //Act

        //Assert
        expect(() => {
            instance.SetApiVersion(version);
        }).toThrow();

    });

});

//#endregion

//#region DESCRIBE - nestre-api-manager.js - SetAuthToken

describe( "nestre-api-manager.js SetAuthToken()", () =>
{
    it( "should throw an error if our token parameter is null", ()=>
    {
        //Arrange
        const instance = NestreApiManager.GetInstance();
        let token = null;

        //Act

        //Assert
        expect(() => {
            instance.SetAuthToken(token);
        }).toThrow();

    });

    it( "should throw an error if our token parameter is undefined", ()=>
    {
        //Arrange
        const instance = NestreApiManager.GetInstance();
        let token = undefined;

        //Act

        //Assert
        expect(() => {
            instance.SetAuthToken(token);
        }).toThrow();

    });

    it( "should throw an error if our token parameter is an empty string", ()=>
    {
        //Arrange
        const instance = NestreApiManager.GetInstance();
        let token = '';

        //Act

        //Assert
        expect(() => {
            instance.SetAuthToken(token);
        }).toThrow();

    });

});

//#endregion

//#region DESCRIBE - nestre-api-manager.js - ClearAuthToken

describe( "nestre-api-manager.js ClearAuthToken()", () =>
{
    it( "should set the authToken to null", ()=>
    {
        //Arrange
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);

        //Act
        NestreApiManager.GetInstance().ClearAuthToken();

        //Assert
        expect(NestreApiManager.GetInstance()._authToken).toEqual(null);

    });

});

//#endregion

//#region DESCRIBE - nestre-api-manager.js - Request

describe( "nestre-api-manager.js Request()", () =>
{

    // -------------------------------------------------------------------------- //
    // ## Input Validation Tests - NestreApiManager.instance
    // -------------------------------------------------------------------------- //
    it('should reject the promise if NestreApiManager.instance is null', async () => {
        // Arrange
        // Get an instance first so we can call the method, then nullify the static ref
        const instance = NestreApiManager.GetInstance();
        NestreApiManager.instance = null;

        // Act & Assert
        await expect(
            instance.Request(HttpMethod.GET, '/test')
        ).rejects.toThrow('web-nestre-api : nestre-api-manager.js Error: NestreApiManager.instance is null or undefined');
    });

    it('should reject the promise if NestreApiManager.instance is undefined', async () => {
        // Arrange
        // Get an instance first so we can call the method, then undefine the static ref
        const instance = NestreApiManager.GetInstance();
        NestreApiManager.instance = undefined;

        // Act & Assert
        await expect(
            instance.Request(HttpMethod.GET, '/test')
        ).rejects.toThrow('web-nestre-api : nestre-api-manager.js Error: NestreApiManager.instance is null or undefined');
    });

    // -------------------------------------------------------------------------- //
    // ## Input Validation Tests - _baseUrl
    // -------------------------------------------------------------------------- //
    it('should reject the promise if NestreApiManager._baseUrl is null', async () =>
    {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetApiVersion(API_VERSION);
        NestreApiManager.GetInstance()._baseUrl = null;

        // Act

        // We expect the promise to be rejected with a specific error message.
        await expect(
            NestreApiManager.GetInstance().Request(HttpMethod.GET, '/test')
        ).rejects.toThrow('web-nestre-api : nestre-api-manager.js Error: this._baseUrl is null, undefined, or an empty string');
    });

    it('should reject the promise if NestreApiManager._baseUrl is undefined', async () =>
    {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetApiVersion(API_VERSION);
        NestreApiManager.GetInstance()._baseUrl = undefined;

        // Act

        // We expect the promise to be rejected with a specific error message.
        await expect(
            NestreApiManager.GetInstance().Request(HttpMethod.GET, '/test')
        ).rejects.toThrow('web-nestre-api : nestre-api-manager.js Error: this._baseUrl is null, undefined, or an empty string');
    });

    it('should reject the promise if NestreApiManager._baseUrl is an empty string', async () =>
    {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetApiVersion(API_VERSION);
        NestreApiManager.GetInstance()._baseUrl = '';

        // Act

        // We expect the promise to be rejected with a specific error message.
        await expect(
            NestreApiManager.GetInstance().Request(HttpMethod.GET, '/test')
        ).rejects.toThrow('web-nestre-api : nestre-api-manager.js Error: this._baseUrl is null, undefined, or an empty string');
    });

    // -------------------------------------------------------------------------- //
    // ## Input Validation Tests - _version
    // -------------------------------------------------------------------------- //
    it('should reject the promise if NestreApiManager._version is null', async () =>
    {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetApiVersion(API_VERSION);
        NestreApiManager.GetInstance()._version = null;

        // Act

        // We expect the promise to be rejected with a specific error message.
        await expect(
            NestreApiManager.GetInstance().Request(HttpMethod.GET, '/test')
        ).rejects.toThrow('web-nestre-api : nestre-api-manager.js Error: this._version is null, undefined, or not a number');
    });

    it('should reject the promise if NestreApiManager._version is undefined', async () =>
    {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetApiVersion(API_VERSION);
        NestreApiManager.GetInstance()._version = undefined;

        // Act

        // We expect the promise to be rejected with a specific error message.
        await expect(
            NestreApiManager.GetInstance().Request(HttpMethod.GET, '/test')
        ).rejects.toThrow('web-nestre-api : nestre-api-manager.js Error: this._version is null, undefined, or not a number');
    });

    it('should reject the promise if NestreApiManager._version is not a number', async () =>
    {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetApiVersion(API_VERSION);
        NestreApiManager.GetInstance()._version = '';

        // Act

        // We expect the promise to be rejected with a specific error message.
        await expect(
            NestreApiManager.GetInstance().Request(HttpMethod.GET, '/test')
        ).rejects.toThrow('web-nestre-api : nestre-api-manager.js Error: this._version is null, undefined, or not a number');
    });

    // -------------------------------------------------------------------------- //
    // ## Input Validation Tests - _authToken
    // -------------------------------------------------------------------------- //
    it('should reject the promise if NestreApiManager._authToken is null', async () =>
    {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetApiVersion(API_VERSION);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);
        NestreApiManager.GetInstance()._authToken = null;

        // Act

        // We expect the promise to be rejected with a specific error message.
        await expect(
            NestreApiManager.GetInstance().Request(HttpMethod.GET, '/test')
        ).rejects.toThrow('web-nestre-api : nestre-api-manager.js Error: this._authToken is null, undefined, or an empty string');
    });

    it('should reject the promise if NestreApiManager._authToken is undefined', async () =>
    {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetApiVersion(API_VERSION);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);
        NestreApiManager.GetInstance()._authToken = undefined;

        // Act

        // We expect the promise to be rejected with a specific error message.
        await expect(
            NestreApiManager.GetInstance().Request(HttpMethod.GET, '/test')
        ).rejects.toThrow('web-nestre-api : nestre-api-manager.js Error: this._authToken is null, undefined, or an empty string');
    });

    it('should reject the promise if NestreApiManager._authToken is an empty string', async () =>
    {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetApiVersion(API_VERSION);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);
        NestreApiManager.GetInstance()._authToken = '';

        // Act

        // We expect the promise to be rejected with a specific error message.
        await expect(
            NestreApiManager.GetInstance().Request(HttpMethod.GET, '/test')
        ).rejects.toThrow('web-nestre-api : nestre-api-manager.js Error: this._authToken is null, undefined, or an empty string');
    });

    // -------------------------------------------------------------------------- //
    // ## Input Validation Tests - "httpMethodValue" parameter
    // -------------------------------------------------------------------------- //
    it('should reject the promise if passed in "httpMethodValue" parameter is null', async () =>
    {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetApiVersion(API_VERSION);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);

        // Act

        // We expect the promise to be rejected with a specific error message.
        await expect(
            NestreApiManager.GetInstance().Request(null, '/test')
        ).rejects.toThrow('web-nestre-api : nestre-api-manager.js Error: httpMethodValue is null, undefined, or an empty string');
    });

    it('should reject the promise if passed in "httpMethodValue" parameter is undefined', async () =>
    {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetApiVersion(API_VERSION);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);

        // Act

        // We expect the promise to be rejected with a specific error message.
        await expect(
            NestreApiManager.GetInstance().Request(undefined, '/test')
        ).rejects.toThrow('web-nestre-api : nestre-api-manager.js Error: httpMethodValue is null, undefined, or an empty string');
    });

    it('should reject the promise if passed in "httpMethodValue" parameter is a empty string', async () =>
    {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetApiVersion(API_VERSION);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);

        // Act

        // We expect the promise to be rejected with a specific error message.
        await expect(
            NestreApiManager.GetInstance().Request('', '/test')
        ).rejects.toThrow('web-nestre-api : nestre-api-manager.js Error: httpMethodValue is null, undefined, or an empty string');
    });

    it('should reject the promise if passed in "httpMethodValue" parameter is not a valid httpMethodValue', async () =>
    {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetApiVersion(API_VERSION);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);

        // Act

        // We expect the promise to be rejected with a specific error message.
        await expect(
            NestreApiManager.GetInstance().Request('GET1', '/test')
        ).rejects.toThrow('web-nestre-api : nestre-api-manager.js Error: httpMethodValue is not a valid HttpMethodValue');
    });

    // -------------------------------------------------------------------------- //
    // ## Input Validation Tests - "endpoint" parameter
    // -------------------------------------------------------------------------- //
    it('should reject the promise if passed in "endpoint" parameter is null', async () =>
    {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetApiVersion(API_VERSION);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);

        // Act

        // We expect the promise to be rejected with a specific error message.
        await expect(
            NestreApiManager.GetInstance().Request(HttpMethod.GET, null)
        ).rejects.toThrow('web-nestre-api : nestre-api-manager.js Error: endpoint is null, undefined, or an empty string');
    });

    it('should reject the promise if passed in "endpoint" parameter is undefined', async () =>
    {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetApiVersion(API_VERSION);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);

        // Act

        // We expect the promise to be rejected with a specific error message.
        await expect(
            NestreApiManager.GetInstance().Request(HttpMethod.GET, undefined)
        ).rejects.toThrow('web-nestre-api : nestre-api-manager.js Error: endpoint is null, undefined, or an empty string');
    });

    it('should reject the promise if passed in "endpoint" parameter is an empty string', async () =>
    {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetApiVersion(API_VERSION);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);

        // Act

        // We expect the promise to be rejected with a specific error message.
        await expect(
            NestreApiManager.GetInstance().Request(HttpMethod.GET, '')
        ).rejects.toThrow('web-nestre-api : nestre-api-manager.js Error: endpoint is null, undefined, or an empty string');
    });

    // -------------------------------------------------------------------------- //
    // ## Input Validation Tests - "!response.ok"
    // -------------------------------------------------------------------------- //
    it('should reject the promise if the response is not ok (404)', async () =>
    {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetApiVersion(API_VERSION);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);

        // Act & Assert
        await expect(
            NestreApiManager.GetInstance().Request(HttpMethod.GET, `user/error-404`)
        ).rejects.toThrow('web-nestre-api : nestre-api-manager.js API Error: 404 - Not Found');
    });

    it('should reject the promise if the response is not ok (500)', async () =>
    {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetApiVersion(API_VERSION);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);

        // Act & Assert
        await expect(
            NestreApiManager.GetInstance().Request(HttpMethod.GET, `user/error-500`)
        ).rejects.toThrow('web-nestre-api : nestre-api-manager.js API Error: 500 - Internal Server Error');
    });

    // -------------------------------------------------------------------------- //
    // ## Input Validation Tests - "no content"
    // -------------------------------------------------------------------------- //
    it('should return null if the response status is 204', async () =>
    {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetApiVersion(API_VERSION);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);

        // Act
        const result = await NestreApiManager.GetInstance().Request(HttpMethod.GET, `user/no-content-204`);

        // Assert
        expect(result).toBe(null);
    });

    it('should return null if the content-length is 0', async () =>
    {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetApiVersion(API_VERSION);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);

        // Act
        const result = await NestreApiManager.GetInstance().Request(HttpMethod.GET, `user/no-content-content-length-0`);

        // Assert
        expect(result).toBe(null);
    });

});

//#endregion

//#region DESCRIBE - nestre-api-manager.js - Request with Body

describe("nestre-api-manager.js Request() - with body", () => {

    it('should correctly handle a request with a body', async () => {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetApiVersion(API_VERSION);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);

        const requestBody = {
            test: "data",
            value: 123
        };

        // Act
        // The mock server should return the exact body we sent
        const result = await NestreApiManager.GetInstance().Request(HttpMethod.POST, `user/test-body`, requestBody);

        // Assert
        expect(result).toStrictEqual(requestBody);
    });

});

//#endregion

//#region DESCRIBE - nestre-api-manager.js - Request - Error Handling

describe("nestre-api-manager.js Request() - Error Handling", () => {

    it('should return null if the response status is 200 and the content-length is 0', async () =>
    {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetApiVersion(API_VERSION);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);

        // Act
        const result = await NestreApiManager.GetInstance().Request(HttpMethod.GET, `user/no-content-content-length-0`);

        // Assert
        expect(result).toBe(null);
    });

    it('should return an Authorization Error if the response status is 401', async () =>
    {
        // Arrange
        server.use(
            http.get(`${API_BASE_URL}/v${API_VERSION}/user/no-auth-token`, () => {
                return new HttpResponse('Authorization failed', {
                    status: 401,
                    headers: {
                        'Content-Type': 'text/html',
                    },
                });
            })
        );

        NestreApiManager.instance = null;
        const instance = NestreApiManager.GetInstance();
        instance.SetBaseUrl(API_BASE_URL);
        instance.SetApiVersion(API_VERSION);
        instance.SetAuthToken("totally-not-an-auth-token");

        // Act
        await expect(
            instance.Request(HttpMethod.GET, `user/no-auth-token`)
        ).rejects.toThrow(AuthorizationError);
    });

    it('should reject the promise with a ValidationError for a 422 status code', async () =>
    {
        // Arrange
        const instance = NestreApiManager.GetInstance();
        instance.SetBaseUrl(API_BASE_URL);
        instance.SetApiVersion(API_VERSION);
        instance.SetAuthToken(AUTH_TOKEN);

        const mockValidationErrorResponse = {
            "detail": [
                {
                    "loc": [ "body", "firstname" ],
                    "msg": "field required",
                    "type": "value_error.missing"
                }
            ]
        };

        // Add a mock handler for this specific test
        server.use(
            http.get(`${API_BASE_URL}/v${API_VERSION}/user/error-422`, () => {
                return HttpResponse.json(mockValidationErrorResponse, { status: 422 });
            })
        );

        // Act & Assert
        await expect(
            instance.Request(HttpMethod.GET, `user/error-422`)
        ).rejects.toThrow(ValidationError);
    });

    it('should reject the promise with a generic error for a 422 status with a non-JSON body', async () => {
        // Arrange
        server.use(
            http.get(`${API_BASE_URL}/v${API_VERSION}/user/error-422-non-json`, () => {
                return new HttpResponse('Validation failed', {
                    status: 422,
                    headers: {
                        'Content-Type': 'text/html',
                    },
                });
            })
        );

        NestreApiManager.instance = null;
        const instance = NestreApiManager.GetInstance();
        instance.SetBaseUrl(API_BASE_URL);
        instance.SetApiVersion(API_VERSION);
        instance.SetAuthToken(AUTH_TOKEN);

        // Act & Assert
        await expect(
            instance.Request(HttpMethod.GET, `user/error-422-non-json`)
        ).rejects.toThrow('web-nestre-api : nestre-api-manager.js API Error: 422 - Unprocessable Entity');
    });

    it('should throw an error for a 500 server error', async () => {
        // Arrange
        server.use(
            http.get(`${API_BASE_URL}/v${API_VERSION}/user/error`, () => {
                return new HttpResponse( "Internal Server Error", {
                    status: 500,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            })
        );

        NestreApiManager.instance = null;
        const instance = NestreApiManager.GetInstance();
        instance.SetBaseUrl(API_BASE_URL);
        instance.SetApiVersion(API_VERSION);
        instance.SetAuthToken(AUTH_TOKEN);

        // Act & Assert
        await expect(
            instance.Request(HttpMethod.GET, `user/error`)
        ).rejects.toThrow('web-nestre-api : nestre-api-manager.js API Error: 500 - Internal Server Error');
    });

    // Test for the `Request` method branch that handles non-JSON errors
    it('should handle non-JSON error responses gracefully (500 status)', async () => {
        // Arrange
        server.use(
            http.get(`${API_BASE_URL}/v${API_VERSION}/user/html-error`, () => {
                return new HttpResponse('<h1>Server Error</h1>', {
                    status: 500,
                    headers: {
                        'Content-Type': 'text/html',
                    },
                });
            })
        );
        const instance = NestreApiManager.GetInstance();
        instance.SetBaseUrl(API_BASE_URL);
        instance.SetApiVersion(API_VERSION);
        instance.SetAuthToken(AUTH_TOKEN);

        // Act & Assert
        await expect(
            instance.Request(HttpMethod.GET, `user/html-error`)
        ).rejects.toThrow('web-nestre-api : nestre-api-manager.js API Error: 500 - Internal Server Error');
    });

    // Test for the `Request` method branch that handles 422 with a non-JSON body
    it('should reject the promise with a generic error for a 422 status with a non-JSON body', async () => {
        // Arrange
        server.use(
            http.get(`${API_BASE_URL}/v${API_VERSION}/user/error-422-non-json`, () => {
                return new HttpResponse('Validation failed', {
                    status: 422,
                    headers: {
                        'Content-Type': 'text/html',
                    },
                });
            })
        );
        const instance = NestreApiManager.GetInstance();
        instance.SetBaseUrl(API_BASE_URL);
        instance.SetApiVersion(API_VERSION);
        instance.SetAuthToken(AUTH_TOKEN);

        // Act & Assert
        await expect(
            instance.Request(HttpMethod.GET, `user/error-422-non-json`)
        ).rejects.toThrow('web-nestre-api : nestre-api-manager.js API Error: 422 - Unprocessable Entity');
    });

    // Test to ensure the content-length: 0 branch is properly covered
    it('should return null if the response status is 200 and the content-length is 0', async () => {
        // Arrange
        server.use(
            http.get(`${API_BASE_URL}/v${API_VERSION}/user/no-content-content-length-0`, () => {
                return new HttpResponse(null, {
                    status: 200,
                    headers: {
                        'Content-Length': '0',
                    },
                });
            })
        );
        const instance = NestreApiManager.GetInstance();
        instance.SetBaseUrl(API_BASE_URL);
        instance.SetApiVersion(API_VERSION);
        instance.SetAuthToken(AUTH_TOKEN);

        // Act
        const result = await instance.Request(HttpMethod.GET, `user/no-content-content-length-0`);

        // Assert
        expect(result).toBeNull();
    });

    it('should handle non-JSON error responses gracefully', async () => {
        // Arrange
        server.use(
            http.get(`${API_BASE_URL}/v${API_VERSION}/user/html-error`, () => {
                return new HttpResponse('<h1>Server Error</h1>', {
                    status: 500,
                    headers: {
                        'Content-Type': 'text/html',
                    },
                });
            })
        );

        NestreApiManager.instance = null;
        const instance = NestreApiManager.GetInstance();
        instance.SetBaseUrl(API_BASE_URL);
        instance.SetApiVersion(API_VERSION);
        instance.SetAuthToken(AUTH_TOKEN);

        // Act & Assert
        await expect(
            instance.Request(HttpMethod.GET, `user/html-error`)
        ).rejects.toThrow('web-nestre-api : nestre-api-manager.js API Error: 500 - Internal Server Error');
    });
});

//#endregion