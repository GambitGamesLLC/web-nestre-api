/**
 * content-recommendations-api.handlers.js
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
 * @typedef {import('../../src/content-recommendations/content-recommendations-types.js').ContentRecommendations} ContentRecommendations
 */

//#endregion

//#region MOCK SERVICE WORKERS - CREATE HANDLER[]

/**
 * Handler used to define our rules for what http call to intercept and what to do with them
 * @type{HttpHandler[]}
 */
export let handlers = [];

//#endregion


//#region MOCK SERVICE WORKERS - CONTENT RECOMMENDATIONS API - GET ACTIVATE RECOMMENDATIONS

handlers.push
(
  http.get(`${API_BASE_URL}/v${API_VERSION}/user/:userId/activate/recommendations`, ({ request, params }) => 
  {
    const { userId } = params;
    const url = new URL(request.url);
    const num_recommendations = parseInt(url.searchParams.get('num_recommendations'), 10);

    if (userId === 'non-existent-user') {
        return new HttpResponse(JSON.stringify({ message: 'User not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    if (userId === USER_ID) {
        /**
         * @type {ContentRecommendations}
         */
        const mockRecommendations = [
            "rec_001", 
            "rec_002", 
            "rec_003",
            "rec_004",
            "rec_005"
        ].slice(0, num_recommendations);

        return HttpResponse.json(mockRecommendations);
    }

    return new HttpResponse(JSON.stringify({ message: 'User not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - CONTENT RECOMMENDATIONS API - GET GUIDED FRAMES RECOMMENDATIONS

handlers.push
(
  http.get(`${API_BASE_URL}/v${API_VERSION}/user/:userId/guided-frames/recommendations`, ({ request, params }) => 
  {
    const { userId } = params;
    const url = new URL(request.url);
    const num_recommendations = parseInt(url.searchParams.get('num_recommendations'), 10);

    if (userId === 'non-existent-user') {
        return new HttpResponse(JSON.stringify({ message: 'User not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    if (userId === USER_ID) {
        /**
         * @type {ContentRecommendations}
         */
        const mockRecommendations = [
            "gf_rec_001", 
            "gf_rec_002", 
            "gf_rec_003"
        ].slice(0, num_recommendations);

        return HttpResponse.json(mockRecommendations);
    }

    return new HttpResponse(JSON.stringify({ message: 'User not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - CONTENT RECOMMENDATIONS API - GET MINDSET MINUTES RECOMMENDATIONS

handlers.push
(
  http.get(`${API_BASE_URL}/v${API_VERSION}/user/:userId/mindset-minutes/recommendations`, ({ request, params }) => 
  {
    const { userId } = params;
    const url = new URL(request.url);
    const num_recommendations = parseInt(url.searchParams.get('num_recommendations'), 10);

    if (userId === 'non-existent-user') {
        return new HttpResponse(JSON.stringify({ message: 'User not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    if (userId === USER_ID) {
        /**
         * @type {ContentRecommendations}
         */
        const mockRecommendations = [
            "mm_rec_001", 
            "mm_rec_002", 
            "mm_rec_003"
        ].slice(0, num_recommendations);

        return HttpResponse.json(mockRecommendations);
    }

    return new HttpResponse(JSON.stringify({ message: 'User not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - CONTENT RECOMMENDATIONS API - GET MUSIC RECOMMENDATIONS

handlers.push
(
  http.get(`${API_BASE_URL}/v${API_VERSION}/user/:userId/music/recommendations`, ({ request, params }) => 
  {
    const { userId } = params;
    const url = new URL(request.url);
    const num_recommendations = parseInt(url.searchParams.get('num_recommendations'), 10);

    if (userId === 'non-existent-user') {
        return new HttpResponse(JSON.stringify({ message: 'User not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    if (userId === USER_ID) {
        /**
         * @type {ContentRecommendations}
         */
        const mockRecommendations = [
            "music_rec_001", 
            "music_rec_002", 
            "music_rec_003"
        ].slice(0, num_recommendations);

        return HttpResponse.json(mockRecommendations);
    }

    return new HttpResponse(JSON.stringify({ message: 'User not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
  })
);

//#endregion
