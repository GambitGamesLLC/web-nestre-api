//#region IMPORTS

//Import the msw (mock-service-worker) package so we can fake our Api responses
import { http, HttpResponse } from 'msw';

//Import the BasicUserProfile used to mock the return data from the get-user-by-email call
/**
 * @typedef {import('../../src/user/user-types.js').BasicUserProfile } BasicUserProfile
 */

//Import the BASE_URL from our environment-variables.js
import { API_BASE_URL } from '../../examples/environment-variables.js';

//Import the AUTH_TOKEN from our environment-variables.js
import { AUTH_TOKEN } from '../../examples/environment-variables.js';

//Import the USER_ID from our environment-variables.js
import { USER_ID } from '../../examples/environment-variables.js';

//Import the USER_EMAIL from our environment-variables.js
import { USER_EMAIL } from '../../examples/environment-variables.js';


//#endregion

//#region MOCK USER PROFILE JSON DATA

// The mock data object that matches the BasicUserProfile shape
/**
 * Dummy user profile returned when mock testing the Request() function
 * @type{BasicUserProfile}
 */
const mockUserProfile = {
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

//#region MOCK SERVICE WORKERS - DEFINE HTTP GET HANDLER

/**
 * Handler used to define our rules for what http call to intercept and what to do with them
 */
export const handlers = 
[
  // Intercept GET requests to this path
  http.get(`${API_BASE_URL}/v2/user/get-by-email`, ({ request }) => 
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

    // For this example, we'll just return the mock profile
    // if the email matches our test email.
    if (email === USER_EMAIL) 
    {
      //Return the object.
      return HttpResponse.json(mockUserProfile);
    }
    
    // You could return an error for other emails if needed
    return new HttpResponse('User not found', { status: 404 });
  })

  // We can add other handlers for POST, PATCH, etc. here
  
];

//#endregion
