/**
 * mental-framing-api.handlers.js
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
 * @typedef {import('../../src/mental-framing/mental-framing-types.js').MentalFramingContentIds} MentalFramingContentIds
 */

//#endregion

//#region MOCK SERVICE WORKERS - CREATE HANDLER[]

/**
 * Handler used to define our rules for what http call to intercept and what to do with them
 * @type{HttpHandler[]}
 */
export let handlers = [];

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

//#region MOCK SERVICE WORKERS - MENTAL FRAMING API - GET CONTENT IDS - 500 ERROR

handlers.push
(
  http.get(`${API_BASE_URL}/v${API_VERSION}/user/error-user/mental-framing`, () => 
  {
    return HttpResponse.json({ detail: 'Internal Server Error' }, { status: 500 });
  })
);

//#endregion
