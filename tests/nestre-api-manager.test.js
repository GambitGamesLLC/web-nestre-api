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

//#endregion

//#region DESCRIBE - nestre-api-manager.js - constructor()

describe( "nestre-api-manager.js constructor()", () =>
{

    it( "should create a userApi object", ()=>{

        //Arrange
        NestreApiManager.instance = null;
        const instance = NestreApiManager.GetInstance();

        //Assert
        assert.notStrictEqual( instance.userAPI, null);

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

});

//#endregion