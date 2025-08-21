//#region IMPORTS

// Import the test runner functions
import { it, describe } from 'node:test';

// Import the assertion library
import assert from 'node:assert';

// Import what we want to test
import { NestreApiManager } from '../src/nestre-api-manager.js';

//Import the BASE_URL from our environment-variables.js
import { API_BASE_URL } from '../examples/environment-variables.js';

//Import the AUTH_TOKEN from our environment-variables.js
import { AUTH_TOKEN } from '../examples/environment-variables.js';

//Import the USER_ID from our environment-variables.js
import { USER_ID } from '../examples/environment-variables.js';

//Import the USER_EMAIL from our environment-variables.js
import { USER_EMAIL } from '../examples/environment-variables.js';

//#endregion


//#region DESCRIBE - user-api.js - constructor()

describe( "user-api.js constructor", ()=>
{

    it("should create an instance of the UserApi object", ()=>
    {

        //Arrange
         NestreApiManager.instance = null;
        
        //Act
        NestreApiManager.GetInstance();

        //Assert
        assert.notStrictEqual( NestreApiManager.instance, null );

    })

});

//#endregion

//#region DESCRIBE - user-api.js - GetBasicUserProfileByEmail()

describe( "user-api.js GetBasicUserProfileByEmail()", () =>
{
    it('should fetch a basic user profile by email successfully', async () => 
    {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL); 
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);

        const userApi = NestreApiManager.GetInstance().userApi;

        // Act
        // This call will trigger a real `fetch`, but MSW will intercept it
        // and return the mock data from our handler.
        const userProfile = await userApi.GetBasicUserProfileByEmail(USER_EMAIL);

        // Assert
        assert.strictEqual(userProfile.id, USER_ID);
        assert.strictEqual(userProfile.email, USER_EMAIL);
    });

});

//#endregion

//#region DESCRIBE - user-api.js - GetBasicUserProfile()

describe( "user-api.js GetBasicUserProfile()", () =>
{
    it('should fetch a basic user profile by userId successfully', async () => 
    {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL); 
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);

        const userApi = NestreApiManager.GetInstance().userApi;

        // Act
        // This call will trigger a real `fetch`, but MSW will intercept it
        // and return the mock data from our handler.
        const userProfile = await userApi.GetBasicUserProfile(USER_ID);

        // Assert
        assert.strictEqual(userProfile.id, USER_ID);
        assert.strictEqual(userProfile.email, USER_EMAIL);
    });

});

//#endregion

//#region DESCRIBE - user-api.js - UpdateUserProfile()

describe( "user-api.js UpdateUserProfile()", () =>
{
    it('should update a user profile and return the basic user profile', async () => 
    {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL); 
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);

        const userApi = NestreApiManager.GetInstance().userApi;

        //Get the user profile for our test user
        const userProfile = await userApi.GetBasicUserProfile( USER_ID );

        // Act
        userProfile.firstname = "Bob";
        userProfile.email = "bob@gmail.com"
        const newUserProfile = await userApi.UpdateUserProfile(USER_ID, userProfile);

        // Assert
        assert.strictEqual(userProfile.firstname, newUserProfile.firstname);
        assert.strictEqual(userProfile.email, newUserProfile.email);
    });

});

//#endregion

//#region DESCRIBE - user-api.js - GetFullUserProfile()

describe( "user-api.js GetFullUserProfile()", () =>
{
    it('should return the full user profile', async () => 
    {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL); 
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);

        const userApi = NestreApiManager.GetInstance().userApi;

        // Act
        //Get the user profile for our test user
        const userProfile = await userApi.GetFullUserProfile( USER_ID );

        // Assert
        assert.strictEqual(userProfile.id, USER_ID);
        assert.strictEqual(userProfile.email, USER_EMAIL);
    });

});

//#endregion

//#region DESCRIBE - user-api.js - CreateNewUserAccount()

describe( "user-api.js CreateNewUserAccount()", () =>
{
    it('should return the basic user profile of the new user', async () => 
    {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL); 
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);

        const userApi = NestreApiManager.GetInstance().userApi;

        // Act
        //Get the user profile for our test user
        const userProfile = await userApi.CreateNewUserAccount();

        // Assert
        assert.strictEqual(userProfile.id, USER_ID);
        assert.strictEqual(userProfile.email, USER_EMAIL);
    });

});

//#endregion

//#region DESCRIBE - user-api.js - DeleteUserAccount()

describe( "user-api.js DeleteUserAccount()", () =>
{
    it('should delete the user account of the authorized user', async () => 
    {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL); 
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);

        const userApi = NestreApiManager.GetInstance().userApi;

        // Act
        //Get the user profile for our test user
        const deleteConfirmationMessage = await userApi.DeleteUserAccount();

        // Assert
        assert.notStrictEqual(deleteConfirmationMessage, null );
        assert.notStrictEqual(deleteConfirmationMessage, "" );
    });

});

//#endregion

//#region DESCRIBE - user-api.js - CreateReferralCode()

describe( "user-api.js CreateReferralCode()", () =>
{
    it('should create a new referral code', async () => 
    {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL); 
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);

        const userApi = NestreApiManager.GetInstance().userApi;

        // Act
        //Get the user profile for our test user
        const deleteConfirmationMessage = await userApi.CreateReferralCode( USER_ID, );

        // Assert
        assert.notStrictEqual(deleteConfirmationMessage, null );
        assert.notStrictEqual(deleteConfirmationMessage, "" );
    });

});

//#endregion