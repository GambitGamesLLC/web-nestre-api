/**
 * daily-workout-api.handlers.js
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
 * @typedef {import('../../src/daily-workout/daily-workout-types.js').DailyWorkoutRecommendation} DailyWorkoutRecommendation 
 **/


//#endregion

//#region MOCK SERVICE WORKERS - CREATE HANDLER[]

/**
 * Handler used to define our rules for what http call to intercept and what to do with them
 * @type{HttpHandler[]}
 */
export let handlers = [];

//#endregion

//#region MOCK DATA

/**
 * @type {DailyWorkoutRecommendation}
 */
const mockRecommendation = {
    cognitive_exercises: [
        {
            cogex_id: 'test-cogex-1',
            version: '1.0.0',
            is_available: true,
            completed_today: false,
        },
    ],
    contents: [
        {
            content_id: 'test-content-1',
            completed_today: false,
        },
    ],
};

//#endregion

//#region MOCK SERVICE WORKERS - DAILY WORKOUT API - GET DAILY WORKOUT RECOMMENDATION

handlers.push
(
    http.get(`${API_BASE_URL}/v${API_VERSION}/user/${USER_ID}/daily-workout`, () => {
        return HttpResponse.json(mockRecommendation, 
        {
            status: 200,
            headers: 
            {
                'Content-Type': 'application/json',
            },
        });
    })
);

const nonExistentUserId = 'non-existent-user-id';

handlers.push
(
    http.get(`${API_BASE_URL}/v${API_VERSION}/user/${nonExistentUserId}/daily-workout`, () => {
        return new HttpResponse(JSON.stringify({ message: 'User not found' }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    })
);

//#endregion