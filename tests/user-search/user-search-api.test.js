/**
 * user-search-api.test.js
 * @file Unit tests for the UserSearchApi class.
 * @description This file provides a comprehensive test suite for the `user-search-api.js` script,
 * validating each method that interacts with the user-search-related API endpoints.
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
 * @typedef {import('../../src/user-search/user-search-types.js').UserProfileData } UserProfileData
 */

//#endregion

const ASSESSMENT_ID = "3fa85f64-5717-4562-b3fc-2c963f66afa6";

//#region DESCRIBE - user-search-api.js - constructor()

describe( "user-search-api.js constructor", ()=>
{

    it("should create an instance of the UserSearchApi object", ()=>
    {

        //Arrange
         NestreApiManager.instance = null;

        //Act
        const manager = NestreApiManager.GetInstance();

        //Assert
        expect( manager.userSearchApi ).not.toBe( null );
        expect( manager.userSearchApi ).toBeDefined();

    })

});

//#endregion

//#region DESCRIBE - user-search-api.js - GetUserProfileFromAssessment()

describe( "user-search-api.js GetUserProfileFromAssessment()", () =>
{
    it('should fetch a user profile from an assessment ID successfully', async () =>
    {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetApiVersion(API_VERSION);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);

        const userSearchApi = NestreApiManager.GetInstance().userSearchApi;

        // Act
        const userProfile = await userSearchApi.GetUserProfileFromAssessment(ASSESSMENT_ID);

        // Assert
        expect(userProfile.user_id).toBe(USER_ID);
        expect(userProfile.mindset_profile.id).toBe(ASSESSMENT_ID);
    });

});

//#endregion

//#region DESCRIBE - user-search-api.js - GetUserProfileFromAssessment() - Error Handling

describe("user-search-api.js GetUserProfileFromAssessment() - Error Handling", () => {

    beforeEach(() => {
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetApiVersion(API_VERSION);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);
    });

    it('should throw an error if the passed in assessment_id value is invalid', async()=>{
        //Arrange
        const userSearchApi = NestreApiManager.GetInstance().userSearchApi;

        // Act & Assert
        await expect(
            userSearchApi.GetUserProfileFromAssessment("")
        ).rejects.toThrow('web-nestre-api : user-search-api.js GetUserProfileFromAssessment() Invalid assessment_id: The assessment_id must be a non-empty string.');
    });

    it('should throw an error if the assessment is not found', async () => {
        // Arrange
        const userSearchApi = NestreApiManager.GetInstance().userSearchApi;

        // Act & Assert
        await expect(
            userSearchApi.GetUserProfileFromAssessment("non-existent-assessment-id")
        ).rejects.toThrow('web-nestre-api : nestre-api-manager.js API Error: 404 - Assessment not found');
    });
});

//#endregion