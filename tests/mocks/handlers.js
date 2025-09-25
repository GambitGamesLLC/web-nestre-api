/**
 * handlers.js
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

//Import the BasicUserProfile used to mock the return data from the get-user-by-email call
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
 * @typedef {import('../../src/content-recommendations/content-recommendations-types.js').ContentRecommendations} ContentRecommendations
 * @typedef {import('../../src/organization/organization-types.js').UserDetails} UserDetails
 * @typedef {import('../../src/organization/organization-types.js').Organizations} Organizations
 * @typedef {import('../../src/organization/organization-types.js').OrganizationMembers} OrganizationMembers
 * @typedef {import('../../src/organization/organization-types.js').OrganizationData} OrganizationData
 * @typedef {import('../../src/development/development-types.js').AuthenticationData} AuthenticationData
 * @typedef {import('../../src/development/development-types.js').DeveloperAccessData} DeveloperAccessData
 */

//Import the BASE_URL from our environment-variables.js
import { API_BASE_URL } from '../../examples/environment-variables.js';

//Import the API_VERSION from our environment-variables.js
import { API_VERSION } from '../../examples/environment-variables.js';

//Import the USER_ID from our environment-variables.js
import { USER_ID } from '../../examples/environment-variables.js';

//Import the USER_EMAIL from our environment-variables.js
import { USER_EMAIL } from '../../examples/environment-variables.js';

//#endregion

//#region MOCK SERVICE WORKERS - CREATE MOCK BASIC USER PROFILE JSON DATA

// The mock data object that matches the BasicUserProfile shape
/**
 * Dummy user profile returned when mock testing the Request() function
 * @type{BasicUserProfile}
 */
const mockBasicUserProfile = {
  id: USER_ID,
  email: USER_EMAIL,
  firstname: "Derrick",
  lastname: "Barra",
  username: "dbarra1",
  effective_subscription_level: {
    name: "Free",
    id: 1,
    value: 0
  },
  trial_used: false,
  frame_it_unlocked: false
};

//#endregion

//#region MOCK SERVICE WORKERS - CREATE MOCK FULL USER PROFILE JSON DATA

// The mock data object that matches the BasicUserProfile shape
/**
 * Dummy user profile returned when mock testing the Request() function
 * @type{FullUserProfile}
 */
const mockFullUserProfile = {
  id: USER_ID,
  email: USER_EMAIL,
  firstname: "Derrick",
  lastname: "Barra",
  username: "dbarra1",
  effective_subscription_level: {
    name: "Free",
    id: 1,
    value: 0
  },
  trial_used: false,
  frame_it_unlocked: false,
  assessment: {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    alpha: 0,
    cerebral: 0,
    prime: 0,
    created_at: ""
  },
  streaks: {
    current_streak: 0,
    max_streak: 0
  }
};

//#endregion

//#region MOCK SERVICE WORKERS - CREATE HANDLER[]

/**
 * Handler used to define our rules for what http call to intercept and what to do with them
 * @type{HttpHandler[]}
 */
export let handlers = [];

//#endregion

//#region MOCK SERVICE WORKERS - REQUEST POST BODY

handlers.push
(
  http.post(`${API_BASE_URL}/v${API_VERSION}/user/test-body`, async ({ request }) => {
    const requestBody = await request.json();
    return HttpResponse.json(requestBody);
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - USER API - GET - ERROR - 404

handlers.push
(
  
  http.get(`${API_BASE_URL}/v${API_VERSION}/user/error-404`, async({ request }) => 
  {
    return new HttpResponse('Not found', { status: 404 });
  })
  
);

//#endregion

//#region MOCK SERVICE WORKERS - USER API - GET - ERROR - 500

handlers.push
(
  
  http.get(`${API_BASE_URL}/v${API_VERSION}/user/error-500`, async({ request }) => 
  {
    return HttpResponse.json
    (
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  })
  
);

//#endregion

//#region MOCK SERVICE WORKERS - USER API - GET - NO CONTENT - 204

handlers.push
(
  
  http.get(`${API_BASE_URL}/v${API_VERSION}/user/no-content-204`, async({ request }) => 
  {
    return new HttpResponse(null, { status: 204 });
  })
  
);

//#endregion

//#region MOCK SERVICE WORKERS - USER API - GET - NO CONTENT - CONTENT-LENGTH = 0

handlers.push
(
  
  http.get(`${API_BASE_URL}/v${API_VERSION}/user/no-content-content-length-0`, async({ request }) => 
  {
    return new Response(null, {
      status: 200,
      headers: {
        'Content-Length': '0',
      },
    });
  })
  
);

//#endregion

//#region MOCK SERVICE WORKERS - USER API - GET BASIC USER PROFILE BY EMAIL

handlers.push
(

  http.get(`${API_BASE_URL}/v${API_VERSION}/user/get-by-email`, ({ request }) => 
  {
    // You can inspect the request URL to add logic
    /**
     * Url returned by the request callback to the http fetch
     * type{URL}
     */
    const url = new URL(request.url);

    /**
     * Email found when searching through the url within the response to the http fetch
     * type{string}
     */
    const email = url.searchParams.get('email');

    // For this header, we'll return the mock profile
    // if the email matches our test email.
    if (email === USER_EMAIL) 
    {
      //Return the object.
      return HttpResponse.json(mockBasicUserProfile);
    }
    
    // If the email was not matched, return a JSON error
    return new HttpResponse(JSON.stringify({ message: 'User not found' }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  })

); 

//#endregion

//#region MOCK SERVICE WORKERS - USER API - GET BASIC USER PROFILE BY ID

handlers.push
(

  http.get(`${API_BASE_URL}/v${API_VERSION}/user/${USER_ID}`, ({ request }) => 
  {
    // You can inspect the request URL to add logic
    /**
     * Url returned by the request callback to the http fetch
     * type{URL}
     */
    const url = new URL(request.url);

    // For this header, we'll return the mock profile
    // if the url contains our test userId.
    if ( url.pathname.includes(USER_ID) ) 
    {
      //Return the object.
      return HttpResponse.json(mockBasicUserProfile);
    }
    
    // If our userId was not matched, return an error
    return new HttpResponse('User not found', { status: 404 });
  })
  
);

//#endregion

//#region MOCK SERVICE WORKERS - USER API - UPDATE USER

handlers.push
(
  
  http.patch(`${API_BASE_URL}/v${API_VERSION}/user/${USER_ID}`, async({ request }) => 
  {
    
    // You can inspect the request URL to add logic
    /**
     * Url returned by the request callback to the http fetch
     * type{URL}
     */
    const url = new URL(request.url);

    // For this header, we'll return the mock profile
    // if the url contains our test userId.
    if ( url.pathname.includes(USER_ID) ) 
    {
      //Get the updates from the PATCH request
      const updates = await request.json();

      //Return the patched user data.
      return HttpResponse.json(updates);
    }
    
    // If our userId was not matched, return an error
    return new HttpResponse('User not found', { status: 404 });
  })
  
);

//#endregion

//#region MOCK SERVICE WORKERS - USER API - GET FULL USER PROFILE BY ID

handlers.push
(
  
  http.get(`${API_BASE_URL}/v${API_VERSION}/user/${USER_ID}/profile`, async({ request }) => 
  {
    
    // You can inspect the request URL to add logic
    /**
     * Url returned by the request callback to the http fetch
     * type{URL}
     */
    const url = new URL(request.url);

    // For this header, we'll return the mock profile
    // if the url contains our test userId.
    if ( url.pathname.includes(USER_ID) ) 
    {
      //Return the patched user data.
      return HttpResponse.json(mockFullUserProfile);
    }
    
    // If our userId was not matched, return an error
    return new HttpResponse('User not found', { status: 404 });
  })
  
);

//#endregion

//#region MOCK SERVICE WORKERS - USER API - CREATE NEW USER

handlers.push
(
  
  http.post(`${API_BASE_URL}/v${API_VERSION}/user`, async({ request }) => 
  {
    return HttpResponse.json(mockBasicUserProfile);
  })
  
);

//#endregion

//#region MOCK SERVICE WORKERS - USER API - DELETE USER

handlers.push
(
  
  http.delete(`${API_BASE_URL}/v${API_VERSION}/user`, async({ request }) => 
  {
    /**
     * @type{DeleteConfirmationMessage}
     */
    const deleteConfirmationMessage = {
      message: "User deleted successfully."
    };

    return HttpResponse.json(deleteConfirmationMessage);
  })
  
);

//#endregion

//#region MOCK SERVICE WORKERS - USER API - CREATE REFERRAL CODE

handlers.push
(
  
  http.post(`${API_BASE_URL}/v${API_VERSION}/user/${USER_ID}/referral-code`, async({ request }) => 
  {
    // You can inspect the request URL to add logic
    /**
     * Url returned by the request callback to the http fetch
     * type{URL}
     */
    const url = new URL(request.url);

    // For this header, we'll return the mock profile
    // if the url contains our test userId.
    if ( url.pathname.includes(USER_ID) ) 
    {
      /**
       * @type{CreateReferralCodeConfirmationMessage}
       */
      const createReferralCodeConfirmationMessage = {
        message: "Referral code created successfully."
      };

      //Get the body from the POST request
      //const requestBody = await request.json();

      //Check if the referral code that was passed in is the same as our 'happy' path
      //console.log( requestBody );

      return HttpResponse.json(createReferralCodeConfirmationMessage);
    }
    
  })
  
);

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

//#region MOCK SERVICE WORKERS - CREATE MOCK RANDOMIZED ASSESSMENT QUESTIONS JSON DATA

/**
 * Dummy randomized assessment questions returned when mock testing
 * @type{RandomizedAssessmentQuestions}
 */
const mockRandomizedAssessmentQuestions = [
    { id: "q1", title: "Question 1", section: 1 },
    { id: "q2", title: "Question 2", section: 2 },
    { id: "q3", title: "Question 3", section: 1 }
];

//#endregion

//#region MOCK SERVICE WORKERS - CREATE MOCK ASSESSMENT RESULT JSON DATA

/**
 * Dummy assessment result returned when mock testing
 * @type{AssessmentResult}
 */
const mockAssessmentResult = {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    alpha: 0.8,
    cerebral: 0.6,
    prime: 0.9,
    created_at: "2024-01-01T12:00:00Z",
    assessment_summary: ["You are awesome.", "Keep it up."]
};

//#endregion

//#region MOCK SERVICE WORKERS - ASSESSMENT API - GET RANDOMIZED ASSESSMENT QUESTIONS

handlers.push
(
  http.get(`${API_BASE_URL}/v${API_VERSION}/user/:userId/assessment/randomized-questions`, ({ params }) => 
  {
    const { userId } = params;

    if (userId === USER_ID) {
      return HttpResponse.json(mockRandomizedAssessmentQuestions);
    }

    if (userId === 'non-existent-user') {
        return new HttpResponse(JSON.stringify({ message: 'User not found' }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - ASSESSMENT API - SUBMIT ASSESSMENT RESPONSES

handlers.push(
  http.post(`${API_BASE_URL}/v${API_VERSION}/user/:userId/assessment`, ({ params }) => {
    const { userId } = params;

    if (userId === USER_ID) {
      return HttpResponse.json(mockAssessmentResult);
    }

    if (userId === 'non-existent-user') {
        return new HttpResponse(JSON.stringify({ message: 'User not found' }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - MENTAL FRAMING API - GET CONTENT IDS

handlers.push
(
  http.get(`${API_BASE_URL}/v${API_VERSION}/user/${USER_ID}/mental-framing`, ({ request }) => 
  {
    /**
     * @type{MentalFramingContentIds}
     */
    const mockContentIds = ["mf_001", "mf_002", "mf_003"];

    return HttpResponse.json(mockContentIds);
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - CONTENT INTERACTION API - CREATE ACTIVATE CONTENT INTERACTION

handlers.push
(
  http.post(`${API_BASE_URL}/v${API_VERSION}/user/:userId/activate-interaction`, async({ request, params }) => 
  {
    const { userId } = params;

    if (userId !== USER_ID) {
        return new HttpResponse(JSON.stringify({ message: 'User not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    /**
     * @type {ContentInteractionSuccessMessage}
     */
    const successMessage = {
        message: "Activate interaction created successfully"
    };

    return HttpResponse.json(successMessage);
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - CONTENT INTERACTION API - CREATE GUIDED FRAME CONTENT INTERACTION

handlers.push
(
  http.post(`${API_BASE_URL}/v${API_VERSION}/user/:userId/guided-frame-interaction`, async({ request, params }) => 
  {
    const { userId } = params;

    if (userId !== USER_ID) {
        return new HttpResponse(JSON.stringify({ message: 'User not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    /**
     * @type {ContentInteractionSuccessMessage}
     */
    const successMessage = {
        message: "Guided frame interaction created successfully"
    };

    return HttpResponse.json(successMessage);
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - CONTENT INTERACTION API - CREATE MENTAL FRAME CONTENT INTERACTION

handlers.push
(
  http.post(`${API_BASE_URL}/v${API_VERSION}/user/:userId/mental-framing-interaction`, async({ request, params }) => 
  {
    const { userId } = params;

    if (userId !== USER_ID) {
        return new HttpResponse(JSON.stringify({ message: 'User not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    /**
     * @type {ContentInteractionSuccessMessage}
     */
    const successMessage = {
        message: "Mental frame interaction created successfully"
    };

    return HttpResponse.json(successMessage);
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - CONTENT INTERACTION API - CREATE MINDSET MINUTE CONTENT INTERACTION

handlers.push
(
  http.post(`${API_BASE_URL}/v${API_VERSION}/user/:userId/mindset-minute-interaction`, async({ request, params }) => 
  {
    const { userId } = params;

    if (userId !== USER_ID) {
        return new HttpResponse(JSON.stringify({ message: 'User not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    /**
     * @type {ContentInteractionSuccessMessage}
     */
    const successMessage = {
        message: "Mindset minute interaction created successfully"
    };

    return HttpResponse.json(successMessage);
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - CONTENT INTERACTION API - CREATE MUSIC CONTENT INTERACTION

handlers.push
(
  http.post(`${API_BASE_URL}/v${API_VERSION}/user/:userId/music-interaction`, async({ request, params }) => 
  {
    const { userId } = params;

    if (userId !== USER_ID) {
        return new HttpResponse(JSON.stringify({ message: 'User not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    /**
     * @type {ContentInteractionSuccessMessage}
     */
    const successMessage = {
        message: "Music interaction created successfully"
    };

    return HttpResponse.json(successMessage);
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - CONTENT RECOMMENDATIONS API - GET ACTIVATE RECOMMENDATIONS

handlers.push
(
  http.get(`${API_BASE_URL}/v${API_VERSION}/user/:userId/activate/recommendations`, ({ request, params }) => 
  {
    const { userId } = params;
    const url = new URL(request.url);
    const num_recommendations = parseInt(url.searchParams.get('num_recommendations'), 10);

    if (userId === 'non-existent-user') {
        return new HttpResponse(JSON.stringify({ message: 'User not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    if (userId === USER_ID) {
        /**
         * @type {ContentRecommendations}
         */
        const mockRecommendations = [
            "rec_001", 
            "rec_002", 
            "rec_003",
            "rec_004",
            "rec_005"
        ].slice(0, num_recommendations);

        return HttpResponse.json(mockRecommendations);
    }

    return new HttpResponse(JSON.stringify({ message: 'User not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - CONTENT RECOMMENDATIONS API - GET GUIDED FRAMES RECOMMENDATIONS

handlers.push
(
  http.get(`${API_BASE_URL}/v${API_VERSION}/user/:userId/guided-frames/recommendations`, ({ request, params }) => 
  {
    const { userId } = params;
    const url = new URL(request.url);
    const num_recommendations = parseInt(url.searchParams.get('num_recommendations'), 10);

    if (userId === 'non-existent-user') {
        return new HttpResponse(JSON.stringify({ message: 'User not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    if (userId === USER_ID) {
        /**
         * @type {ContentRecommendations}
         */
        const mockRecommendations = [
            "gf_rec_001", 
            "gf_rec_002", 
            "gf_rec_003"
        ].slice(0, num_recommendations);

        return HttpResponse.json(mockRecommendations);
    }

    return new HttpResponse(JSON.stringify({ message: 'User not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - CONTENT RECOMMENDATIONS API - GET MINDSET MINUTES RECOMMENDATIONS

handlers.push
(
  http.get(`${API_BASE_URL}/v${API_VERSION}/user/:userId/mindset-minutes/recommendations`, ({ request, params }) => 
  {
    const { userId } = params;
    const url = new URL(request.url);
    const num_recommendations = parseInt(url.searchParams.get('num_recommendations'), 10);

    if (userId === 'non-existent-user') {
        return new HttpResponse(JSON.stringify({ message: 'User not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    if (userId === USER_ID) {
        /**
         * @type {ContentRecommendations}
         */
        const mockRecommendations = [
            "mm_rec_001", 
            "mm_rec_002", 
            "mm_rec_003"
        ].slice(0, num_recommendations);

        return HttpResponse.json(mockRecommendations);
    }

    return new HttpResponse(JSON.stringify({ message: 'User not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - CONTENT RECOMMENDATIONS API - GET MUSIC RECOMMENDATIONS

handlers.push
(
  http.get(`${API_BASE_URL}/v${API_VERSION}/user/:userId/music/recommendations`, ({ request, params }) => 
  {
    const { userId } = params;
    const url = new URL(request.url);
    const num_recommendations = parseInt(url.searchParams.get('num_recommendations'), 10);

    if (userId === 'non-existent-user') {
        return new HttpResponse(JSON.stringify({ message: 'User not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    if (userId === USER_ID) {
        /**
         * @type {ContentRecommendations}
         */
        const mockRecommendations = [
            "music_rec_001", 
            "music_rec_002", 
            "music_rec_003"
        ].slice(0, num_recommendations);

        return HttpResponse.json(mockRecommendations);
    }

    return new HttpResponse(JSON.stringify({ message: 'User not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - FRAME IT API - CREATE PERSONALIZED FRAME

/**
 * Dummy personalized frame it object returned when mock testing
 * @type {PersonalizedFrameIt}
 */
const mockPersonalizedFrameIt = {
    updated_at: "2024-01-01T12:00:00Z",
    created_at: "2024-01-01T12:00:00Z",
    id: "frame_123abc",
    phrases: [], // This will be populated from the request body
    wins: [],
    completed: false,
    image_url: "https://nestre-development.s3.amazonaws.com/frame-it/frame_123abc.png"
};

handlers.push(
  http.post(`${API_BASE_URL}/v${API_VERSION}/user/:userId/frame`, async ({ request, params }) => {
    const { userId } = params;
    const body = await request.json();

    if (userId === 'non-existent-user') {
      return new HttpResponse(JSON.stringify({ message: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (userId === USER_ID) {
      const response = { ...mockPersonalizedFrameIt, phrases: body };
      return HttpResponse.json(response);
    }

    return new HttpResponse(JSON.stringify({ message: 'User not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - FRAME IT API - GET FRAME BY ID

handlers.push(
  http.get(`${API_BASE_URL}/v${API_VERSION}/user/:userId/frame/:frameId`, ({ params }) => {
    const { userId, frameId } = params;

    if (userId !== USER_ID) {
      return new HttpResponse(JSON.stringify({ message: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (frameId === 'some-frame-id') {
      const response = { 
        ...mockPersonalizedFrameIt, 
        id: frameId,
        phrases: ["I am strong", "I am capable"],
        image_url: `https://nestre-development.s3.amazonaws.com/frame-it/${frameId}.png`
      };
      return HttpResponse.json(response);
    }

    return new HttpResponse(JSON.stringify({ message: 'Frame not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - FRAME IT API - UPDATE FRAME

handlers.push(
  http.patch(`${API_BASE_URL}/v${API_VERSION}/user/:userId/frame/:frameId`, async ({ request, params }) => {
    const { userId, frameId } = params;
    const updateData = await request.json();

    if (userId === 'non-existent-user') {
      return new HttpResponse(JSON.stringify({ message: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (frameId === 'non-existent-frame') {
      return new HttpResponse(JSON.stringify({ message: 'Frame not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (userId === USER_ID && frameId === 'some-frame-id') {
      const existingFrame = { 
        ...mockPersonalizedFrameIt, 
        id: frameId,
        phrases: ["I am strong", "I am capable"],
        image_url: `https://nestre-development.s3.amazonaws.com/frame-it/${frameId}.png`
      };

      const updatedFrame = { ...existingFrame, ...updateData };
      
      return HttpResponse.json(updatedFrame);
    }

    return new HttpResponse(JSON.stringify({ message: 'Frame not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - FRAME IT API - GET FRAME GALLERY

/**
 * Dummy personalized frame gallery object returned when mock testing
 * @type {PersonalizedFrameGallery}
 */
const mockPersonalizedFrameGallery = {
    frames: [
        {
            updated_at: "2024-01-01T12:00:00Z",
            created_at: "2024-01-01T12:00:00Z",
            id: "frame_123abc",
            phrases: ["I am strong", "I am capable"],
            wins: [],
            completed: false,
            image_url: "https://nestre-development.s3.amazonaws.com/frame-it/frame_123abc.png"
        },
        {
            updated_at: "2024-01-02T12:00:00Z",
            created_at: "2024-01-02T12:00:00Z",
            id: "frame_456def",
            phrases: ["I am focused", "I am calm"],
            wins: ["Completed a project"],
            completed: true,
            image_url: "https://nestre-development.s3.amazonaws.com/frame-it/frame_456def.png"
        }
    ]
};

handlers.push(
  http.get(`${API_BASE_URL}/v${API_VERSION}/user/:userId/frames`, ({ params }) => {
    const { userId } = params;

    if (userId === 'non-existent-user') {
      return new HttpResponse(JSON.stringify({ message: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (userId === USER_ID) {
      return HttpResponse.json(mockPersonalizedFrameGallery);
    }

    return new HttpResponse(JSON.stringify({ message: 'User not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - FRAME IT API - DELETE FRAME BY ID

handlers.push(
  http.delete(`${API_BASE_URL}/v${API_VERSION}/user/:userId/frame/:frameId`, ({ params }) => {
    const { userId, frameId } = params;

    if (userId === 'non-existent-user') {
      return new HttpResponse(JSON.stringify({ message: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (frameId === 'non-existent-frame') {
      return new HttpResponse(JSON.stringify({ message: 'Frame not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (userId === USER_ID && frameId === 'some-frame-id') {
      /** @type {DeleteFrameConfirmationMessage} */
      const response = { message: 'Frame deleted successfully.' };
      return HttpResponse.json(response);
    }

    return new HttpResponse(JSON.stringify({ message: 'Frame not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - LOOKUP API - GET GENDER OPTIONS

/**
 * Dummy gender options returned when mock testing
 * @type {import('../../src/lookup/lookup-types.js').GenderOptions}
 */
const mockGenderOptions = {
    gender_options: [
        { id: 1, name: 'Male' },
        { id: 2, name: 'Female' },
        { id: 3, name: 'Non-binary / Non-conforming' }
    ]
};

handlers.push(
  http.get(`${API_BASE_URL}/v${API_VERSION}/lookup/gender`, () => {
    return HttpResponse.json(mockGenderOptions);
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - LOOKUP API - GET EDUCATION OPTIONS

/**
 * Dummy education options returned when mock testing
 * @type {import('../../src/lookup/lookup-types.js').EducationOptions}
 */
const mockEducationOptions = {
    education_options: [
        { id: 1, name: 'Less than High School', value: 1 },
        { id: 2, name: 'High School', value: 2 },
        { id: 3, name: 'Vocational or Trade Qualification', value: 3 },
        { id: 4, name: 'Bachelor Degree', value: 4 },
        { id: 5, name: 'Master Degree', value: 5 },
        { id: 6, name: 'Doctorate Degree', value: 6 }
    ]
};

handlers.push(
  http.get(`${API_BASE_URL}/v${API_VERSION}/lookup/education-level`, () => {
    return HttpResponse.json(mockEducationOptions);
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - LOOKUP API - GET MARITAL OPTIONS

/**
 * Dummy marital options returned when mock testing
 * @type {import('../../src/lookup/lookup-types.js').MaritalOptions}
 */
const mockMaritalOptions = {
    marital_options: [
        { id: 1, name: 'Single, never married' },
        { id: 2, name: 'Married or domestic partnership' },
        { id: 3, name: 'Widowed' },
        { id: 4, name: 'Divorced or separated' }
    ]
};

handlers.push(
  http.get(`${API_BASE_URL}/v${API_VERSION}/lookup/marital-status`, () => {
    return HttpResponse.json(mockMaritalOptions);
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - LOOKUP API - GET SUBSCRIPTION OPTIONS

/**
 * Dummy subscription options returned when mock testing
 * @type {import('../../src/lookup/lookup-types.js').SubscriptionOptions}
 */
const mockSubscriptionOptions = {
    subscription_options: [
        { id: 1, name: 'Free', value: 0 },
        { id: 2, name: 'Trial', value: 1 },
        { id: 3, name: 'Basic', value: 1 },
        { id: 4, name: 'Premium', value: 2 }
    ]
};

handlers.push(
  http.get(`${API_BASE_URL}/v${API_VERSION}/lookup/subscription-level`, () => {
    return HttpResponse.json(mockSubscriptionOptions);
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - UTILITY API - SHORTEN URL

handlers.push(
  http.post(`${API_BASE_URL}/v${API_VERSION}/util/shorten-url`, async ({ request }) => {
    const originalUrl = await request.json();
    // In a real scenario, we'd call a URL shortener. Here, we just return a mock.
    if (typeof originalUrl === 'string' && originalUrl.startsWith('http')) {
      return HttpResponse.json('https://sh.rt/url123');
    }
    return new HttpResponse('Invalid URL provided', { status: 400 });
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - UTILITY API - IS AFTER NESTRE DAWN

handlers.push(
  http.get(`${API_BASE_URL}/v${API_VERSION}/util/is-after-nestre-dawn`, ({ request }) => {
    const url = new URL(request.url);
    const timestamp = url.searchParams.get('timestamp');

    if (!timestamp) {
      return new HttpResponse('Timestamp is required', { status: 400 });
    }

    try {
      const date = new Date(timestamp);
      // Mock Nestre dawn as 4 AM UTC for testing purposes
      const dawnHourUTC = 4; 
      const isAfter = date.getUTCHours() >= dawnHourUTC;
      
      return HttpResponse.json(isAfter);
    } catch (e) {
      return new HttpResponse('Invalid timestamp format', { status: 400 });
    }
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - UTILITY API - LOG CLIENT ERROR

handlers.push(
  http.post(`${API_BASE_URL}/v${API_VERSION}/util/log-client-error`, async ({ request }) => {
    const errorLog = await request.json();
    
    if (errorLog && errorLog.message && errorLog.log_level) {
      return HttpResponse.json('Client error logged successfully.');
    }
    
    return new HttpResponse('Invalid error log provided', { status: 400 });
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - UTILITY API - PING

handlers.push(
  http.get(`${API_BASE_URL}/ping`, () => {
    return HttpResponse.text('Hello, Appservices are alive.');
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - ORGANIZATION API - LIST ORGANIZATIONS

/**
 * @type {Organizations}
 */
const mockOrganizations = [
    {
        id: "org_123",
        name: "Nestre",
        tags: ["health", "wellness"]
    },
    {
        id: "org_456",
        name: "Gambit Games",
        tags: ["gaming", "development"]
    }
];

handlers.push(
  http.get(`${API_BASE_URL}/v${API_VERSION}/org/list-with-tags`, () => {
    return HttpResponse.json(mockOrganizations);
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - ORGANIZATION API - GET MEMBERS

/**
 * @type {OrganizationMembers}
 */
const mockOrganizationMembers = [
    {
        email: "member1@nestre.com",
        member_type: "member",
        tags: ["teamA"],
        id: "user_1",
        subscription_level: "Premium"
    },
    {
        email: "member2@nestre.com",
        member_type: "admin",
        tags: ["teamA", "teamB"],
        id: "user_2",
        subscription_level: "Premium"
    }
];

handlers.push(
  http.get(`${API_BASE_URL}/v${API_VERSION}/org/:organization_id/members`, ({ params, request }) => {
    const { organization_id } = params;
    const url = new URL(request.url);
    const tag = url.searchParams.get('tag');
    const email_search_string = url.searchParams.get('email_search_string');

    if (organization_id === 'org_not_found') {
        return new HttpResponse(JSON.stringify({ message: 'Organization not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    let members = mockOrganizationMembers;
    if (tag) {
        members = members.filter(m => m.tags.includes(tag));
    }
    if (email_search_string) {
        members = members.filter(m => m.email.includes(email_search_string));
    }
    return HttpResponse.json(members);
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - ORGANIZATION API - GET USER DETAILS

/**
 * @type {UserDetails[]}
 */
const mockOrganizationUserDetails = [
    {
        id: "user_1",
        email: "member1@nestre.com",
        firstname: "Alice",
        lastname: "Smith",
        date_of_birth: "1990-01-01"
    },
    {
        id: "user_2",
        email: "member2@nestre.com",
        firstname: "Bob",
        lastname: "Johnson",
        date_of_birth: "1985-05-15"
    }
];

handlers.push(
  http.get(`${API_BASE_URL}/v${API_VERSION}/org/:organization_id/users`, ({ params, request }) => {
    const { organization_id } = params;
    const url = new URL(request.url);
    const tag = url.searchParams.get('tag'); // Not directly used for UserDetails, but kept for consistency with GetMembers
    const email_search_string = url.searchParams.get('email_search_string');

    if (organization_id === 'org_not_found') {
        return new HttpResponse(JSON.stringify({ message: 'Organization not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    let users = mockOrganizationUserDetails;
    if (email_search_string) {
        users = users.filter(u => u.email.includes(email_search_string));
    }
    // Note: Tag filtering is not directly applicable to UserDetails as it's not a property of UserDetails.
    // If the API supported filtering users by tags associated with their membership, that logic would go here.
    // For now, we'll assume tag filtering is only for OrganizationMembers.

    return HttpResponse.json(users);
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - ORGANIZATION API - GET ORGANIZATION BY ID

/**
 * @type {OrganizationData}
 */
const mockOrganizationData = {
    name: "Nestre Organization",
    num_basic_subscriptions: 100,
    subscriptions_expiry: "2025-12-31T23:59:59Z",
    id: "org_123_data"
};

handlers.push(
  http.get(`${API_BASE_URL}/v${API_VERSION}/org/:organization_id`, ({ params }) => {
    const { organization_id } = params;

    if (organization_id === 'org_not_found') {
        return new HttpResponse(JSON.stringify({ message: 'Organization not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    if (organization_id === 'org_123') {
        return HttpResponse.json(mockOrganizationData);
    }

    return new HttpResponse(JSON.stringify({ message: 'Organization not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - ASSESSMENT SEARCH API - GET LATEST ASSESSMENT SCORES FOR GROUP

/**
 * @typedef {import('../../src/assessment-search/assessment-search-types.js').AdditionalProperties} AdditionalProperties
 */

handlers.push(
  http.post(`${API_BASE_URL}/v${API_VERSION}/search/latest-assessment-scores-for-group`, async ({ request }) => {
    const userIds = await request.json();

    if (userIds.includes('not-found-user')) {
        return new HttpResponse(JSON.stringify({ message: 'Scores not found for any user' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    /**
     * @type {AdditionalProperties}
     */
    const mockScores = {
        [USER_ID]: {
            alpha: 0.8,
            cerebral: 0.6,
            prime: 0.9
        }
    };

    return HttpResponse.json(mockScores);
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - ASSESSMENT SEARCH API - GET ASSESSMENTS WITH RESPONSES

/**
 * @type {import('../../src/assessment-search/assessment-search-types.js').AssessmentsWithResponses}
 */
const mockAssessmentsWithResponses = [
    {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        created_at: "2024-01-01T12:00:00Z",
        alpha: 0.8,
        cerebral: 0.6,
        prime: 0.9,
        responses: [
            { question_id: "bCZ7FSju7aQdUbNFQ7hfd", score: "4" },
            { question_id: "3JTBUeVqS7mum6YErk0e0Y", score: "5" }
        ]
    }
];

handlers.push(
  http.get(`${API_BASE_URL}/v${API_VERSION}/search/assessments-with-responses`, ({ request }) => {
    const url = new URL(request.url);
    const assessmentIds = url.searchParams.getAll('assessment_ids');

    if (assessmentIds.includes('not-found-assessment')) {
        return new HttpResponse(JSON.stringify({ message: 'Assessments not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    if (assessmentIds.includes("3fa85f64-5717-4562-b3fc-2c963f66afa6")) {
        return HttpResponse.json(mockAssessmentsWithResponses);
    }

    return new HttpResponse(JSON.stringify({ message: 'Assessments not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - CREATE MOCK USERS MATCHING ASSESSMENT CRITERIA JSON DATA

/**
 * @type {import('../../src/assessment-search/assessment-search-types.js').UsersMatchingAssessmentCriteria}
 */
const mockUsersMatchingAssessmentCriteria = [
    {
        id: USER_ID,
        name: "Derrick Barra",
        email: USER_EMAIL,
        date_of_birth: "1980-01-01",
        assessments: [
            {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                alpha: 0.8,
                cerebral: 0.6,
                prime: 0.9,
                created_at: "2024-01-01T12:00:00Z"
            }
        ],
        source: "nestre"
    }
];

//#endregion

//#region MOCK SERVICE WORKERS - ASSESSMENT SEARCH API - GET USERS WITH THEIR ASSESSMENTS

handlers.push(
  http.get(`${API_BASE_URL}/v${API_VERSION}/search/user-assessments`, ({ request }) => {
    const url = new URL(request.url);
    const firstname = url.searchParams.get('firstname');

    if (firstname === 'not-found') {
        return new HttpResponse(JSON.stringify({ message: 'No users found matching the criteria' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    return HttpResponse.json(mockUsersMatchingAssessmentCriteria);
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - DEVELOPMENT API - AUTHENTICATE

/**
 * @type {AuthenticationData}
 */
const mockAuthenticationData = {
    AccessToken: "mock-access-token",
    ExpiresIn: 3600,
    TokenType: "Bearer",
    RefreshToken: "mock-refresh-token",
    IdToken: "mock-id-token"
};

handlers.push(
  http.post(`${API_BASE_URL}/dev/app-user-cognito-login`, async ({ request }) => {
    const body = await request.json();

    if (body.username === 'testuser' && body.password === 'testpassword') {
      return HttpResponse.json(mockAuthenticationData);
    }

    return new HttpResponse(JSON.stringify({ message: 'Incorrect username or password.' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  })
);


//#endregion

//#region MOCK SERVICE WORKERS - DEVELOPMENT API - GET STAFF ACCESS TOKEN

/**
 * @type {DeveloperAccessData}
 */
const mockDeveloperAccessData = {
    AccessToken: "mock-staff-access-token"
};

handlers.push(
  http.get(`${API_BASE_URL}/dev/staff-access-token`, ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(mockDeveloperAccessData);
    }

    return new HttpResponse(JSON.stringify({ message: 'Authorization header missing or invalid.' }), { status: 401 });
  })
);

//#endregion
