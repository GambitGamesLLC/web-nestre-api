/**
 * frame-it-api.handlers.js
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
