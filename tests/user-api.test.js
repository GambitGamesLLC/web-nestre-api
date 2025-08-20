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