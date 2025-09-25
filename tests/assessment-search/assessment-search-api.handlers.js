/**
 * assessment-search-api.handlers.js
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

/**
 * @typedef {import('../../src/assessment-search/assessment-search-types.js').AdditionalProperties} AdditionalProperties
 * @typedef {import('../../src/assessment-search/assessment-search-types.js').AssessmentsWithResponses} AssessmentsWithResponses
 * @typedef {import('../../src/assessment-search/assessment-search-types.js').UsersMatchingAssessmentCriteria} UsersMatchingAssessmentCriteria
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

//#region MOCK SERVICE WORKERS - ASSESSMENT SEARCH API - GET LATEST ASSESSMENT SCORES FOR GROUP

/**
 * @type {AdditionalProperties}
 */

handlers.push(
  http.post(`${API_BASE_URL}/v${API_VERSION}/search/latest-assessment-scores-for-group`, async ({ request }) => {
    const userIds = await request.json();

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

    // Handle case where a user is not found
    if (userIds.some(id => !Object.keys(mockScores).includes(id))) {
        return new HttpResponse(JSON.stringify({ message: 'Scores not found for any user' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    return HttpResponse.json(mockScores);
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - ASSESSMENT SEARCH API - GET ASSESSMENTS WITH RESPONSES

/**
 * @type {AssessmentsWithResponses}
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
 
    if (assessmentIds.includes("3fa85f64-5717-4562-b3fc-2c963f66afa6")) {
        return HttpResponse.json(mockAssessmentsWithResponses);
    }

    // Default to not found if the happy path ID isn't present
    return new HttpResponse(JSON.stringify({ message: 'Assessments not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
    });

    return new HttpResponse(JSON.stringify({ message: 'Assessments not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - CREATE MOCK USERS MATCHING ASSESSMENT CRITERIA JSON DATA

/**
 * @type {UsersMatchingAssessmentCriteria}
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
