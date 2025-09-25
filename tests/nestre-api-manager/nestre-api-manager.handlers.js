/**
 * nestre-api-manager.handlers.js
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


//#endregion

//#region MOCK SERVICE WORKERS - CREATE HANDLER[]

/**
 * Handler used to define our rules for what http call to intercept and what to do with them
 * @type{HttpHandler[]}
 */
export let handlers = [];

//#endregion

//#region MOCK SERVICE WORKERS - NESTRE API MANAGER - UNKNOWN ERROR

// Handler for a 404 with a JSON body that does NOT contain a `message` property
handlers.push(
  http.get(`${API_BASE_URL}/v${API_VERSION}/user/unknown-error`, () => {
    return HttpResponse.json({ detail: "Some detail about the error" }, { status: 404 });
  })
);

//#endregion
//#region MOCK SERVICE WORKERS - NESTRE API MANAGER - ERROR/SPECIAL CASE HANDLING

// Handler for a 400 General Error response
handlers.push(
  http.get(`${API_BASE_URL}/v${API_VERSION}/user/general-error`, () => {
    return new HttpResponse('General Error', {
      status: 400,
      headers: { 'Content-Type': 'text/html' },
    });
  })
);

// Handler for a 401 Authorization Error response
handlers.push(
  http.get(`${API_BASE_URL}/v${API_VERSION}/user/no-auth-token`, () => {
    return new HttpResponse('Authorization failed', {
      status: 401,
      headers: { 'Content-Type': 'text/html' },
    });
  })
);

// Handler for a 403 Forbidden Error response
handlers.push(
  http.get(`${API_BASE_URL}/v${API_VERSION}/user/forbidden`, () => {
    return new HttpResponse('Forbidden', {
      status: 403,
      headers: { 'Content-Type': 'text/html' },
    });
  })
);

// Handler for a 422 Validation Error with a JSON response
handlers.push(
  http.get(`${API_BASE_URL}/v${API_VERSION}/user/error-422`, () => {
    const mockValidationErrorResponse = {
      "detail": [
        {
          "loc": ["body", "firstname"],
          "msg": "field required",
          "type": "value_error.missing"
        }
      ]
    };
    return HttpResponse.json(mockValidationErrorResponse, { status: 422 });
  })
);

// Handler for a 422 Validation Error with a non-JSON response
handlers.push(
  http.get(`${API_BASE_URL}/v${API_VERSION}/user/error-422-non-json`, () => {
    return new HttpResponse('Validation failed', {
      status: 422,
      headers: { 'Content-Type': 'text/html' },
    });
  })
);

// Handler for a generic 500 Internal Server Error
handlers.push(
  http.get(`${API_BASE_URL}/v${API_VERSION}/user/error`, () => {
    return new HttpResponse("Internal Server Error", {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  })
);

// Handler for a 500 Internal Server Error with an HTML response
handlers.push(
  http.get(`${API_BASE_URL}/v${API_VERSION}/user/html-error`, () => {
    return new HttpResponse('<h1>Server Error</h1>', {
      status: 500,
      headers: { 'Content-Type': 'text/html' },
    });
  })
);

// Handler for a successful response with plain text
handlers.push(
  http.get(`${API_BASE_URL}/v${API_VERSION}/user/text-response`, () => {
    return new HttpResponse('OK', {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });
  })
);

// Handler for a successful (200) response with content-length 0
handlers.push(
  http.get(`${API_BASE_URL}/v${API_VERSION}/user/no-content-content-length-0`, () => {
    return new HttpResponse(null, {
      status: 200,
      headers: {
        'Content-Length': '0',
      },
    });
  })
);


//#endregion