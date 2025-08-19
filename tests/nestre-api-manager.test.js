//#region IMPORTS

// Import the test runner functions
import { it, describe, beforeEach, mock } from 'node:test';

// Import the assertion library
import assert from 'node:assert';

// Import what we want to test
import { NestreApiManager } from '../src/nestre-api-manager.js';

/**
 * @typedef {import('../src/types.js').NestreApiManagerConfig} NestreApiManagerConfig 
 */

//Import the BASE_URL from our environment-variables.js
import { API_BASE_URL } from '../examples/environment-variables.js';

//Import the AUTH_TOKEN from our environment-variables.js
import { AUTH_TOKEN } from '../examples/environment-variables.js';

//Import the USER_ID from our environment-variables.js
import { USER_ID } from '../examples/environment-variables.js';

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

//#region DESCRIBE - nestre-api-manager.js - Initialize()

describe( "nestre-api-manager.js Initialize()", () =>
{

    it("should throw an error if our config parameter is null", ()=>
    {
        //Arrange
        const instance = NestreApiManager.GetInstance();
        let config = null;

        //Act
        
        //Assert
        assert.throws( () =>
        {
            instance.Initialize(config);
        });
        
    });

    it( "should throw an error if our config parameter is undefined", ()=>
    {
        //Arrange
        const instance = NestreApiManager.GetInstance();
        let config = undefined;

        //Act
        
        //Assert
        assert.throws( () =>
        {
            instance.Initialize(config);
        });

    });

    it( "should throw an error if our config parameter is a blank string", ()=>
    {
        //Arrange
        const instance = NestreApiManager.GetInstance();
        let config = '';

        //Act
        
        //Assert
        assert.throws( () =>
        {
            instance.Initialize(config);
        });

    });

    it( "should throw an error if our config.baseUrl parameter is null", ()=>
    {
        //Arrange
        const instance = NestreApiManager.GetInstance();

        /**
         * @type{NestreApiManagerConfig}
         */
        let config = 
        { 
            baseUrl: null 
        };

        //Act
        
        //Assert
        assert.throws( () =>
        {
            instance.Initialize(config);
        });

    });

    it( "should throw an error if our config.baseUrl parameter is undefined", ()=>
    {
        //Arrange
        const instance = NestreApiManager.GetInstance();

        /**
         * @type{NestreApiManagerConfig}
         */
        let config = 
        { 
            baseUrl: undefined 
        };

        //Act
        
        //Assert
        assert.throws( () =>
        {
            instance.Initialize(config);
        });

    });

    it( "should throw an error if our config.baseUrl parameter is a blank string", ()=>
    {
        //Arrange
        const instance = NestreApiManager.GetInstance();

        /**
         * @type{NestreApiManagerConfig}
         */
        let config = 
        { 
            baseUrl: '' 
        };

        //Act
        
        //Assert
        assert.throws( () =>
        {
            instance.Initialize(config);
        });

    });

    it( "should create a userApi object", ()=>{

        //Arrange
        const instance = NestreApiManager.GetInstance();

        //Act
        /**
         * @type{NestreApiManagerConfig}
         */
        let config = 
        { 
            baseUrl: 'www.dummyapi.com/api/v1' 
        };

        instance.Initialize(config);

        //Assert
        assert.notStrictEqual( instance.userAPI, null);

    });

}); //END describe nestre-api-manager.js - Initialize

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
    // ## Input Validation and Pre-condition Tests
    // -------------------------------------------------------------------------- //
    it('should reject the promise if NestreApiManager._baseUrl is null', async () => 
    {
        NestreApiManager.GetInstance()._baseUrl = null;

        // We expect the promise to be rejected with a specific error message.
        await assert.rejects
        (
            NestreApiManager.GetInstance().Request('GET', '/test'),
            { message: '"web-nestre-api : nestre-api-manager.js Error: this._baseUrl is null or undefined"' }
        );
    });

});

//#endregion