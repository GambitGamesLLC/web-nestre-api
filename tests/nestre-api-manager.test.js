//#region IMPORTS

// Import the test runner functions
import { describe, it } from 'node:test';

// Import the assertion library
import assert from 'node:assert';

// Import what we want to test
import { NestreApiManager } from '../src/nestre-api-manager.js';

/**
 * @typedef {import('../src/types.js').NestreApiManagerConfig} NestreApiManagerConfig 
 */

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

//#region DESCRIBE - nestre-api-manager.js - Request

describe( "nestre-api-manager.js Request()", () =>
{
    it( "should throw an error if our token parameter is null", ()=>
    {
        

    });

});

//#endregion