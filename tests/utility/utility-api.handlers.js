/**
 * utility-api.handlers.js
 * @file Mock Service Worker (MSW) handlers for API request interception.
 * @description This file uses the `msw` library to intercept HTTP requests and return mock data
 * for utility endpoints. This is essential for unit testing API client functions without making
 * actual network calls, ensuring tests are fast and reliable.
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

//#endregion

//#region MOCK SERVICE WORKERS - CREATE HANDLER[]

/**
 * Handler used to define our rules for what http call to intercept and what to do with them
 * @type{HttpHandler[]}
 */
export let handlers = [];

//#endregion

//#region MOCK SERVICE WORKERS - UTILITY API - SHORTEN URL

handlers.push(
  http.post(`${API_BASE_URL}/v${API_VERSION}/util/shorten-url`, async ({ request }) => {
    const { url } = await request.json();
    // In a real scenario, we'd call a URL shortener. Here, we just return a mock.
    if (typeof url === 'string' && url.startsWith('http')) {
      return HttpResponse.text('https://sh.rt/url123');
    }
    return new HttpResponse('Invalid URL provided', { status: 400 });
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - UTILITY API - IS AFTER NESTRE DAWN

handlers.push(
  http.get(`${API_BASE_URL}/v${API_VERSION}/util/is-after-nestre-dawn`, ({ request }) => {
    const url = new URL(request.url);
    const timestamp = url.searchParams.get('timestamp');

    if (!timestamp) {
      return new HttpResponse('Timestamp is required', { status: 400 });
    }

    try {
      const date = new Date(timestamp);
      // Mock Nestre dawn as 4 AM UTC for testing purposes
      const dawnHourUTC = 4; 
      const isAfter = date.getUTCHours() >= dawnHourUTC;
      
      return HttpResponse.json(isAfter);
    } catch (e) {
      return new HttpResponse('Invalid timestamp format', { status: 400 });
    }
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - UTILITY API - LOG CLIENT ERROR

handlers.push(
  http.post(`${API_BASE_URL}/v${API_VERSION}/util/log-client-error`, async ({ request }) => {
    const errorLog = await request.json();
    
    if (errorLog && errorLog.message && errorLog.log_level) {
      return HttpResponse.json('Client error logged successfully.');
    }
    
    return new HttpResponse('Invalid error log provided', { status: 400 });
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - UTILITY API - PING

handlers.push(
  http.get(`${API_BASE_URL}/ping`, () => {
    return HttpResponse.text('Hello, Appservices are alive.');
  })
);

//#endregion