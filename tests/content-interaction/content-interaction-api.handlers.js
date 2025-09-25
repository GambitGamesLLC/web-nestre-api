/**
 * content-interaction-api.handlers.js
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
 * @typedef {import('../../src/content-interaction/content-interaction-types.js').ContentInteractionSuccessMessage } ContentInteractionSuccessMessage
 */

//#endregion

//#region MOCK SERVICE WORKERS - CREATE HANDLER[]

/**
 * Handler used to define our rules for what http call to intercept and what to do with them
 * @type{HttpHandler[]}
 */
export let handlers = [];

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
