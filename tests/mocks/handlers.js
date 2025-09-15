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
 * @typedef {import('../../src/mental-framing/mental-framing-types.js').MentalFramingContentIds} MentalFramingContentIds
 * @typedef {import('../../src/assessment/assessment-types.js').RandomizedAssessmentQuestions} RandomizedAssessmentQuestions
 * @typedef {import('../../src/assessment/assessment-types.js').AssessmentResult} AssessmentResult
 * @typedef {import('../../src/content-interaction/content-interaction-types.js').ContentInteractionSuccessMessage } ContentInteractionSuccessMessage
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
