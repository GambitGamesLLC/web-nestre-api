/**
 * user-search-api.handlers.js
 * @file Mock Service Worker (MSW) handlers for API request interception.
 * @description This file uses the `msw` library to intercept HTTP requests and return mock data. 
 * This is essential for unit testing API client functions without making actual network calls, 
 * ensuring tests are fast and reliable.
 * @requires {msw}
 * @exports {HttpHandler[]} handlers
 */

//Not included in unit testing code coverage

//#region IMPORTS

//Import the msw (mock-service-worker) package so we can fake our Api responses
import { http, HttpResponse } from 'msw';

//Import the BASE_URL from our environment-variables.js
import { API_BASE_URL } from '../../examples/environment-variables.js';

//Import the API_VERSION from our environment-variables.js
import { API_VERSION } from '../../examples/environment-variables.js';

//Import the USER_ID from our environment-variables.js
import { USER_ID } from '../../examples/environment-variables.js';

//Import the USER_EMAIL from our environment-variables.js
import { USER_EMAIL } from '../../examples/environment-variables.js';

//Import the typedefs used to define request and return data
/**
 * @typedef {import('../../src/user/user-types.js').BasicUserProfile } BasicUserProfile
 * @typedef {import('../../src/user/user-types.js').FullUserProfile } FullUserProfile
 * @typedef {import('../../src/user/user-types.js').DeleteConfirmationMessage } DeleteConfirmationMessage
 * @typedef {import('../../src/user/user-types.js').CreateReferralCode } CreateReferralCode
 * @typedef {import('../../src/user/user-types.js').CreateReferralCodeConfirmationMessage } CreateReferralCodeConfirmationMessage
 * @typedef {import('../../src/user-search/user-search-types.js').UserProfileData} UserProfileData
 * @typedef {import('../../src/mental-framing/mental-framing-types.js').MentalFramingContentIds} MentalFramingContentIds
 * @typedef {import('../../src/frame-it/frame-it-types.js').PersonalizedFrameIt} PersonalizedFrameIt
 * @typedef {import('../../src/frame-it/frame-it-types.js').DeleteFrameConfirmationMessage} DeleteFrameConfirmationMessage
 * @typedef {import('../../src/frame-it/frame-it-types.js').PersonalizedFrameGallery} PersonalizedFrameGallery
 * @typedef {import('../../src/assessment/assessment-types.js').RandomizedAssessmentQuestions} RandomizedAssessmentQuestions
 * @typedef {import('../../src/assessment/assessment-types.js').AssessmentResult} AssessmentResult
 * @typedef {import('../../src/content-interaction/content-interaction-types.js').ContentInteractionSuccessMessage } ContentInteractionSuccessMessage
 * @typedef {import('../../src/organization/organization-types.js').UserDetails} UserDetails
 * @typedef {import('../../src/organization/organization-types.js').Organizations} Organizations
 * @typedef {import('../../src/organization/organization-types.js').OrganizationMembers} OrganizationMembers
 * @typedef {import('../../src/organization/organization-types.js').OrganizationData} OrganizationData
 */

//#endregion

//#region MOCK SERVICE WORKERS - CREATE HANDLER[]

/**
 * Handler used to define our rules for what http call to intercept and what to do with them
 * @type{HttpHandler[]}
 */
export let handlers = [];

//#endregion

//#region MOCK SERVICE WORKERS - CREATE MOCK USER PROFILE DATA JSON DATA

/**
 * Dummy user profile data returned when mock testing
 * @type {UserProfileData}
 */
const mockUserProfileData = {
    user_id: USER_ID,
    firstname: "Derrick",
    lastname: "Barra",
    email: USER_EMAIL,
    date_of_birth: "1980-01-01",
    profile_photo: "https://example.com/photo.jpg",
    mindset_profile: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        alpha: 0.8,
        cerebral: 0.6,
        prime: 0.9,
        created_at: "2024-01-01T12:00:00Z",
        assessment_summary: ["You are awesome.", "Keep it up."]
    }
};

//#endregion

//#region MOCK SERVICE WORKERS - USER SEARCH API - GET USER PROFILE FROM ASSESSMENT

handlers.push(
  http.get(`${API_BASE_URL}/v${API_VERSION}/search/profile-for-assessment`, ({ request }) => {
    const url = new URL(request.url);
    const assessmentId = url.searchParams.get('assessment_id');
    const ASSESSMENT_ID = "3fa85f64-5717-4562-b3fc-2c963f66afa6";

    if (assessmentId === ASSESSMENT_ID) {
      return HttpResponse.json(mockUserProfileData);
    }

    return new HttpResponse(JSON.stringify({ message: 'Assessment not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - USER SEARCH API - GET USER PROFILE FROM ASSESSMENT - 500 ERROR

handlers.push(
  http.get(`${API_BASE_URL}/v${API_VERSION}/search/profile-for-assessment-500`, () => {
    return HttpResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  })
);

//#endregion
