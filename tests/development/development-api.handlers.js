/**
 * development-api.handlers.js
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
 * @typedef {import('../../src/development/development-types.js').AuthenticationData} AuthenticationData
 * @typedef {import('../../src/development/development-types.js').DeveloperAccessData} DeveloperAccessData
 */

//#endregion

//#region MOCK SERVICE WORKERS - CREATE HANDLER[]

/**
 * Handler used to define our rules for what http call to intercept and what to do with them
 * @type{HttpHandler[]}
 */
export let handlers = [];

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
