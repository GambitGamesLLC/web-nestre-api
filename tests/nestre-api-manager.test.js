//#region IMPORTS

// Import the test runner functions
import { it, describe } from 'node:test';

// Import the assertion library
import assert from 'node:assert';

// Import what we want to test
import { NestreApiManager, HttpMethod } from '../src/nestre-api-manager.js';

//Import the BASE_URL from our environment-variables.js
import { API_BASE_URL } from '../examples/environment-variables.js';

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

//#endregion

//#region DESCRIBE - nestre-api-manager.js - constructor()

describe( "nestre-api-manager.js constructor()", () =>
{

    // Test case for initial instantiation
    it("should create a userApi object on first call", () => {
        // Arrange
        NestreApiManager.instance = null; // Ensure a clean state
        
        // Act
        const instance = new NestreApiManager(); // Or GetInstance()

        // Assert
        assert.notStrictEqual(instance.userApi, null);
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
        assert.strictEqual(secondInstance, firstInstance);
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
        assert.strictEqual(secondInstance.userApi, firstUserApi);
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
        assert.notStrictEqual( nestreApiManager1, null );
    });

    it( "should return the same instance of the NestreApiManager", ()=>
    {
        //Arrange

        //Act
        const nestreApiManager1 = NestreApiManager.GetInstance();
        const nestreApiManager2 = NestreApiManager.GetInstance();

        //Assert
        assert.strictEqual( nestreApiManager1, nestreApiManager2 );
    });

}); //END describe nestre-api-manager.js GetInstance() Method

//#endregion

//#region DESCRIBE - nestre-api-manager.js - SetBaseUrl

describe( "nestre-api-manager.js SetBaseUrl()", () =>
{
    it( "should throw an error if our baseUrl parameter is null", ()=>
    {
        //Arrange
        const instance = NestreApiManager.GetInstance();
        let baseUrl = null;

        //Act
        
        //Assert
        assert.throws( () =>
        {
            instance.SetBaseUrl(baseUrl);
        });

    });

    it( "should throw an error if our baseUrl parameter is undefined", ()=>
    {
        //Arrange
        const instance = NestreApiManager.GetInstance();
        let baseUrl = undefined;

        //Act
        
        //Assert
        assert.throws( () =>
        {
            instance.SetBaseUrl(baseUrl);
        });

    });

    it( "should throw an error if our baseUrl parameter is an empty string", ()=>
    {
        //Arrange
        const instance = NestreApiManager.GetInstance();
        let baseUrl = '';

        //Act
        
        //Assert
        assert.throws( () =>
        {
            instance.SetBaseUrl(baseUrl);
        });

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
        assert.throws( () =>
        {
            instance.SetAuthToken(token);
        });

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
        assert.deepEqual( NestreApiManager.GetInstance()._authToken, null);

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
        await assert.rejects(
            instance.Request(HttpMethod.GET, '/test'),
            { message: 'web-nestre-api : nestre-api-manager.js Error: NestreApiManager.instance is null or undefined' }
        );
    });

    it('should reject the promise if NestreApiManager.instance is undefined', async () => {
        // Arrange
        // Get an instance first so we can call the method, then undefine the static ref
        const instance = NestreApiManager.GetInstance();
        NestreApiManager.instance = undefined; 

        // Act & Assert
        await assert.rejects(
            instance.Request(HttpMethod.GET, '/test'),
            { message: 'web-nestre-api : nestre-api-manager.js Error: NestreApiManager.instance is null or undefined' }
        );
    });

    // -------------------------------------------------------------------------- //
    // ## Input Validation Tests - _baseUrl
    // -------------------------------------------------------------------------- //
    it('should reject the promise if NestreApiManager._baseUrl is null', async () => 
    {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance()._baseUrl = null;

        // Act

        // We expect the promise to be rejected with a specific error message.
        await assert.rejects
        (
            NestreApiManager.GetInstance().Request(HttpMethod.GET, '/test'),
            { message: 'web-nestre-api : nestre-api-manager.js Error: this._baseUrl is null, undefined, or an empty string' }
        );
    });

    it('should reject the promise if NestreApiManager._baseUrl is undefined', async () => 
    {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance()._baseUrl = undefined;

        // Act

        // We expect the promise to be rejected with a specific error message.
        await assert.rejects
        (
            NestreApiManager.GetInstance().Request(HttpMethod.GET, '/test'),
            { message: 'web-nestre-api : nestre-api-manager.js Error: this._baseUrl is null, undefined, or an empty string' }
        );
    });

    it('should reject the promise if NestreApiManager._baseUrl is an empty string', async () => 
    {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance()._baseUrl = '';

        // Act

        // We expect the promise to be rejected with a specific error message.
        await assert.rejects
        (
            NestreApiManager.GetInstance().Request(HttpMethod.GET, '/test'),
            { message: 'web-nestre-api : nestre-api-manager.js Error: this._baseUrl is null, undefined, or an empty string' }
        );
    });

    // -------------------------------------------------------------------------- //
    // ## Input Validation Tests - _authToken
    // -------------------------------------------------------------------------- //
    it('should reject the promise if NestreApiManager._authToken is null', async () => 
    {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);
        NestreApiManager.GetInstance()._authToken = null;

        // Act

        // We expect the promise to be rejected with a specific error message.
        await assert.rejects
        (
            NestreApiManager.GetInstance().Request(HttpMethod.GET, '/test'),
            { message: 'web-nestre-api : nestre-api-manager.js Error: this._authToken is null, undefined, or an empty string' }
        );
    });

    it('should reject the promise if NestreApiManager._authToken is undefined', async () => 
    {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);
        NestreApiManager.GetInstance()._authToken = undefined;

        // Act

        // We expect the promise to be rejected with a specific error message.
        await assert.rejects
        (
            NestreApiManager.GetInstance().Request(HttpMethod.GET, '/test'),
            { message: 'web-nestre-api : nestre-api-manager.js Error: this._authToken is null, undefined, or an empty string' }
        );
    });

    it('should reject the promise if NestreApiManager._authToken is an empty string', async () => 
    {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);
        NestreApiManager.GetInstance()._authToken = '';

        // Act

        // We expect the promise to be rejected with a specific error message.
        await assert.rejects
        (
            NestreApiManager.GetInstance().Request(HttpMethod.GET, '/test'),
            { message: 'web-nestre-api : nestre-api-manager.js Error: this._authToken is null, undefined, or an empty string' }
        );
    });

    // -------------------------------------------------------------------------- //
    // ## Input Validation Tests - "httpMethodValue" parameter
    // -------------------------------------------------------------------------- //
    it('should reject the promise if passed in "httpMethodValue" parameter is null', async () => 
    {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);

        // Act

        // We expect the promise to be rejected with a specific error message.
        await assert.rejects
        (
            NestreApiManager.GetInstance().Request(null, '/test'),
            { message: 'web-nestre-api : nestre-api-manager.js Error: httpMethodValue is null, undefined, or an empty string' }
        );
    });

    it('should reject the promise if passed in "httpMethodValue" parameter is undefined', async () => 
    {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);

        // Act

        // We expect the promise to be rejected with a specific error message.
        await assert.rejects
        (
            NestreApiManager.GetInstance().Request(undefined, '/test'),
            { message: 'web-nestre-api : nestre-api-manager.js Error: httpMethodValue is null, undefined, or an empty string' }
        );
    });

    it('should reject the promise if passed in "httpMethodValue" parameter is a empty string', async () => 
    {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);

        // Act

        // We expect the promise to be rejected with a specific error message.
        await assert.rejects
        (
            NestreApiManager.GetInstance().Request('', '/test'),
            { message: 'web-nestre-api : nestre-api-manager.js Error: httpMethodValue is null, undefined, or an empty string' }
        );
    });

    it('should reject the promise if passed in "httpMethodValue" parameter is not a valid httpMethodValue', async () => 
    {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);

        // Act

        // We expect the promise to be rejected with a specific error message.
        await assert.rejects
        (
            NestreApiManager.GetInstance().Request('GET1', '/test'),
            { message: 'web-nestre-api : nestre-api-manager.js Error: httpMethodValue is not a valid HttpMethodValue' }
        );
    });

    // -------------------------------------------------------------------------- //
    // ## Input Validation Tests - "endpoint" parameter
    // -------------------------------------------------------------------------- //
    it('should reject the promise if passed in "endpoint" parameter is null', async () => 
    {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);

        // Act

        // We expect the promise to be rejected with a specific error message.
        await assert.rejects
        (
            NestreApiManager.GetInstance().Request(HttpMethod.GET, null),
            { message: 'web-nestre-api : nestre-api-manager.js Error: endpoint is null, undefined, or an empty string' }
        );
    });

    it('should reject the promise if passed in "endpoint" parameter is undefined', async () => 
    {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);

        // Act

        // We expect the promise to be rejected with a specific error message.
        await assert.rejects
        (
            NestreApiManager.GetInstance().Request(HttpMethod.GET, undefined),
            { message: 'web-nestre-api : nestre-api-manager.js Error: endpoint is null, undefined, or an empty string' }
        );
    });

    it('should reject the promise if passed in "endpoint" parameter is an empty string', async () => 
    {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);

        // Act

        // We expect the promise to be rejected with a specific error message.
        await assert.rejects
        (
            NestreApiManager.GetInstance().Request(HttpMethod.GET, ''),
            { message: 'web-nestre-api : nestre-api-manager.js Error: endpoint is null, undefined, or an empty string' }
        );
    });

    // -------------------------------------------------------------------------- //
    // ## Input Validation Tests - "!response.ok"
    // -------------------------------------------------------------------------- //
    it('should reject the promise if the response is not ok (404)', async () =>
    {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);

        // Act & Assert
        await assert.rejects(
            NestreApiManager.GetInstance().Request(HttpMethod.GET, '/v2/user/error-404'),
            { message: 'web-nestre-api : nestre-api-manager.js API Error: 404 - Not Found' }
        );
    });

    it('should reject the promise if the response is not ok (500)', async () =>
    {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);

        // Act & Assert
        await assert.rejects(
            NestreApiManager.GetInstance().Request(HttpMethod.GET, '/v2/user/error-500'),
            { message: 'web-nestre-api : nestre-api-manager.js API Error: 500 - Internal Server Error' }
        );
    });

    // -------------------------------------------------------------------------- //
    // ## Input Validation Tests - "no content"
    // -------------------------------------------------------------------------- //
    it('should return null if the response status is 204', async () =>
    {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);

        // Act
        const result = await NestreApiManager.GetInstance().Request(HttpMethod.GET, '/v2/user/no-content-204');

        // Assert
        assert.strictEqual(result, null);
    });

    it('should return null if the content-length is 0', async () =>
    {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);

        // Act
        const result = await NestreApiManager.GetInstance().Request(HttpMethod.GET, '/v2/user/no-content-content-length-0');

        // Assert
        assert.strictEqual(result, null);
    });

});

//#endregion

//#region DESCRIBE - nestre-api-manager.js - Request with Body

describe("nestre-api-manager.js Request() - with body", () => {
    
    it('should correctly handle a request with a body', async () => {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);

        const requestBody = {
            test: "data",
            value: 123
        };

        // Act
        // The mock server should return the exact body we sent
        const result = await NestreApiManager.GetInstance().Request(HttpMethod.POST, '/v2/user/test-body', requestBody);

        // Assert
        assert.deepStrictEqual(result, requestBody);
    });
    
});

//#endregion

//#region DESCRIBE - nestre-api-manager.js - Request - Error Handling

describe("nestre-api-manager.js Request() - Error Handling", () => {

    it('should throw an error for a 500 server error', async () => {
        // Arrange
        server.use(
            http.get(`${API_BASE_URL}/v2/user/error`, () => {
                return new HttpResponse(JSON.stringify({ message: 'Internal Server Error' }), {
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
        instance.SetAuthToken(AUTH_TOKEN);

        // Act & Assert
        await assert.rejects(
            instance.Request(HttpMethod.GET, '/v2/user/error'),
            { message: 'web-nestre-api : nestre-api-manager.js API Error: 500 - Internal Server Error' }
        );
    });

    it('should handle non-JSON error responses gracefully', async () => {
        // Arrange
        server.use(
            http.get(`${API_BASE_URL}/v2/user/html-error`, () => {
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
        instance.SetAuthToken(AUTH_TOKEN);

        // Act & Assert
        await assert.rejects(
            instance.Request(HttpMethod.GET, '/v2/user/html-error'),
            { message: 'web-nestre-api : nestre-api-manager.js API Error: 500 - Internal Server Error' }
        );
    });
});

//#endregion