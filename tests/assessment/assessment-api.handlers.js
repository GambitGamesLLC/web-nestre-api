/**
 * assessment-api.handlers.js
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
 * @typedef {import('../../src/assessment/assessment-types.js').RandomizedAssessmentQuestions} RandomizedAssessmentQuestions
 * @typedef {import('../../src/assessment/assessment-types.js').AssessmentResult} AssessmentResult
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

//#region MOCK SERVICE WORKERS - CREATE HANDLER[]

/**
 * Handler used to define our rules for what http call to intercept and what to do with them
 * @type{HttpHandler[]}
 */
export let handlers = [];

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
