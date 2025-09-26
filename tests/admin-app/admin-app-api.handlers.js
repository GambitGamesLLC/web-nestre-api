/**
 * admin-app-api.handlers.js
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

/**
 * @typedef {import('../../src/admin-app/admin-app-types.js').UsersMatchingSearch} UsersMatchingSearch
 */

//#endregion

//#region MOCK SERVICE WORKERS - CREATE HANDLER[]

/**
 * Handler used to define our rules for what http call to intercept and what to do with them
 * @type{HttpHandler[]}
 */
export let handlers = [];

//#endregion

//#region MOCK SERVICE WORKERS - ADMIN APP API - SHORTEN URL

handlers.push(
  http.get(`${API_BASE_URL}/v${API_VERSION}/admin/shorten-url`, ({ request }) => {
    const url = new URL(request.url);
    const longUrl = url.searchParams.get('url');

    if (longUrl && longUrl.startsWith('http')) {
      return HttpResponse.text('https://sh.rt/mock-url');
    }
    return new HttpResponse('Invalid URL provided', { status: 400 });
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - ADMIN APP API - SEARCH USERS

/**
 * @type {UsersMatchingSearch}
 */
const mockUsers = [
  {
    id: 'user_123',
    created_at: '2024-01-15T10:00:00Z',
    email: 'test.user@example.com',
    firstname: 'Test',
    lastname: 'User',
    gender: 'other',
    date_of_birth: '1990-01-01',
    username: 'testuser',
    subscription_level: 'premium',
    subscription_type: 'monthly',
    trial_used: false,
    frame_it_unlocked: true,
    last_activity: '2024-05-20T14:30:00Z',
  },
];

handlers.push(
  http.get(`${API_BASE_URL}/v${API_VERSION}/admin/search-users`, ({ request }) => {
    const url = new URL(request.url);
    const searchString = url.searchParams.get('search_string');

    if (searchString && searchString.length >= 3) {
      return HttpResponse.json(mockUsers);
    }

    return new HttpResponse('Invalid search string provided', { status: 400 });
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - ADMIN APP API - DELETE USER BY EMAIL

handlers.push(
  http.delete(`${API_BASE_URL}/v${API_VERSION}/admin/delete-user-by-email`, ({ request }) => {
    const url = new URL(request.url);
    const email = url.searchParams.get('email');

    if (email && email.includes('@')) {
      return HttpResponse.json({ message: 'User deleted successfully.' });
    }

    return new HttpResponse('Invalid email provided', { status: 400 });
  })
);

//#endregion