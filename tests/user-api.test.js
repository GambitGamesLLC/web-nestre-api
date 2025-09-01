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

import { server } from '../tests/mocks/server.js';
import { http, HttpResponse } from 'msw';

/**
 * @typedef {import('../src/user/user-types.js').UpdateUserProfile } UpdateUserProfile
 * @typedef {import('../src/user/user-types.js').CreateReferralCode } CreateReferralCode
 */

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

//#region DESCRIBE - user-api.js - GetBasicUserProfileByEmail() - Error Handling

describe("user-api.js GetBasicUserProfileByEmail() - Error Handling", () => {

    it('should throw an error if the passed in email value is invalid', async()=>{
        //Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);

        const userApi = NestreApiManager.GetInstance().userApi;

        // Act & Assert
        await assert.rejects(
            userApi.GetBasicUserProfileByEmail(""),
            { message: 'web-nestre-api : user-api.js GetBasicUserProfileByEmail() Invalid email: The email must be a non-empty string.' }
        );
    });

    it('should throw an error if the user is not found', async () => {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);

        const userApi = NestreApiManager.GetInstance().userApi;

        // Act & Assert
        await assert.rejects(
            userApi.GetBasicUserProfileByEmail("nonexistent@email.com"),
            { message: 'web-nestre-api : nestre-api-manager.js API Error: 404 - User not found' }
        );
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

//#region DESCRIBE - user-api.js - GetBasicUserProfile() - Error Handling

describe("user-api.js GetBasicUserProfile() - Error Handling", () => {

    it('should throw an error for an empty userId', async () => {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);

        const userApi = NestreApiManager.GetInstance().userApi;

        // Act & Assert
        await assert.rejects(
            userApi.GetBasicUserProfile(""),
            { message: 'web-nestre-api : user-api.js GetBasicUserProfile() Invalid userId: The userId must be a non-empty string.' }
        );
    });

    it('should throw an error for an invalid userId', async () => {
        // Arrange
        server.use(
            http.get(`${API_BASE_URL}/v2/user/invalid-id`, () => {
                return new HttpResponse(JSON.stringify({ message: 'User not found' }), {
                    status: 404,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            })
        );

        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);

        const userApi = NestreApiManager.GetInstance().userApi;

        // Act & Assert
        await assert.rejects(
            userApi.GetBasicUserProfile("invalid-id"),
            { message: 'web-nestre-api : nestre-api-manager.js API Error: 404 - User not found' }
        );
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

        //Get the current user profile for our test user
        //const userProfile = await userApi.GetBasicUserProfile( USER_ID );

        /**
         * @type{UpdateUserProfile}
         */
        const updatedUserProfile = {
            firstname: "Bob",
            email: "bob@gmail.com"
        };

        // Act
        const newUserProfile = await userApi.UpdateUserProfile(USER_ID, updatedUserProfile);

        // Assert
        assert.strictEqual(updatedUserProfile.firstname, newUserProfile.firstname);
        assert.strictEqual(updatedUserProfile.email, newUserProfile.email);
    });

});

//#endregion


//#region DESCRIBE - user-api.js - UpdateUserProfile() - Error Handling

describe( "user-api.js UpdateUserProfile()", () =>
{
    it('should return an error if the passed in userId is an empty string', async () => 
    {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL); 
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);

        const userApi = NestreApiManager.GetInstance().userApi;

        /**
         * @type{UpdateUserProfile}
         */
        const updatedUserProfile = {
            firstname: "Bob",
            email: "bob@gmail.com"
        };

        // Act

        // Assert
         await assert.rejects(
            userApi.UpdateUserProfile("", updatedUserProfile),
            { message: 'web-nestre-api : user-api.js GetBasicUserProfile() Invalid userId: The userId must be a non-empty string.' }
        );
    });

    it('should return an error if the passed in userProfile data to update has an incorrect shape', async () => 
    {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL); 
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);

        const userApi = NestreApiManager.GetInstance().userApi;

        /**
         * @type{UpdateUserProfile}
         */
        const updatedUserProfile = {
            id: USER_ID,
            firstname: "Bob",
            email: "bob@gmail.com"
        };

        // Act

        // Assert
        await assert.rejects(
            userApi.UpdateUserProfile(USER_ID, updatedUserProfile),
            {
                //Compares against regex string, allow anything at the end of the string, so any of our validation error message can be appended 
                message: /^web-nestre-api : user-api.js GetBasicUserProfile\(\) Validation failed for userProfile/
            }
        );

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

//#region DESCRIBE - user-api.js - GetFullUserProfile() - Error Handling

describe("user-api.js GetFullUserProfile() - Error Handling", () => {
    it('should throw an error if the user has not completed the assessment', async () => {
        // Arrange
        server.use(
            http.get(`${API_BASE_URL}/v2/user/${USER_ID}/profile`, () => {
                return new HttpResponse(JSON.stringify({ message: 'Assessment not completed' }), {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            })
        );

        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);

        const userApi = NestreApiManager.GetInstance().userApi;

        // Act & Assert
        await assert.rejects(
            userApi.GetFullUserProfile(USER_ID),
            { message: 'web-nestre-api : nestre-api-manager.js API Error: 400 - Assessment not completed' }
        );
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
        //Create the referralCode request

        /**
         * @type{CreateReferralCode}
         */
        const createReferralCode =
        {
            code: "feioavneawwa32323t2",
            is_active: true
        };
        const createReferralCodeConfirmationMessage = await userApi.CreateReferralCode( USER_ID, createReferralCode );

        // Assert
        assert.notStrictEqual(createReferralCodeConfirmationMessage, null );
        assert.notStrictEqual(createReferralCodeConfirmationMessage, "" );
    });

});

//#endregion
