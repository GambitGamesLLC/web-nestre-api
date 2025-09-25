/**
 * organization-api.handlers.js
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


//#region MOCK SERVICE WORKERS - ORGANIZATION API - LIST ORGANIZATIONS

/** @typedef {import('../../src/organization/organization-types.js').Organizations} Organizations */
/**
 * @type {Organizations}
 */
const mockOrganizations = [
    {
        id: "org_123",
        name: "Nestre",
        tags: ["health", "wellness"]
    },
    {
        id: "org_456",
        name: "Gambit Games",
        tags: ["gaming", "development"]
    }
];

handlers.push(
  http.get(`${API_BASE_URL}/v${API_VERSION}/org/list-with-tags`, () => {
    return HttpResponse.json(mockOrganizations);
  })
);

handlers.push(
  http.get(`${API_BASE_URL}/v${API_VERSION}/org/list-with-tags-404`, () => {
    return new HttpResponse('Not found', { status: 404 });
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - ORGANIZATION API - GET MEMBERS

/** @typedef {import('../../src/organization/organization-types.js').OrganizationMembers} OrganizationMembers */
/**
 * @type {OrganizationMembers}
 */
const mockOrganizationMembers = [
    {
        email: "member1@nestre.com",
        member_type: "member",
        tags: ["teamA"],
        id: "user_1",
        subscription_level: "Premium"
    },
    {
        email: "member2@nestre.com",
        member_type: "admin",
        tags: ["teamA", "teamB"],
        id: "user_2",
        subscription_level: "Premium"
    }
];

handlers.push(
  http.get(`${API_BASE_URL}/v${API_VERSION}/org/:organization_id/members`, ({ params, request }) => {
    const { organization_id } = params;
    const url = new URL(request.url);
    const tag = url.searchParams.get('tag');
    const email_search_string = url.searchParams.get('email_search_string');

    if (organization_id === 'org_not_found') {
        return new HttpResponse(JSON.stringify({ message: 'Organization not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    let members = mockOrganizationMembers;
    if (tag) {
        members = members.filter(m => m.tags.includes(tag));
    }
    if (email_search_string) {
        members = members.filter(m => m.email.includes(email_search_string));
    }
    return HttpResponse.json(members);
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - ORGANIZATION API - GET USER DETAILS

/** @typedef {import('../../src/organization/organization-types.js').OrganizationUserDetails} OrganizationUserDetails */
/**
 * @type {UserDetails[]}
 */
const mockOrganizationUserDetails = [
    {
        id: "user_1",
        email: "member1@nestre.com",
        firstname: "Alice",
        lastname: "Smith",
        date_of_birth: "1990-01-01"
    },
    {
        id: "user_2",
        email: "member2@nestre.com",
        firstname: "Bob",
        lastname: "Johnson",
        date_of_birth: "1985-05-15"
    }
];

handlers.push(
  http.get(`${API_BASE_URL}/v${API_VERSION}/org/:organization_id/users`, ({ params, request }) => {
    const { organization_id } = params;
    const url = new URL(request.url);
    const tag = url.searchParams.get('tag'); // Not directly used for UserDetails, but kept for consistency with GetMembers
    const email_search_string = url.searchParams.get('email_search_string');

    if (organization_id === 'org_not_found') {
        return new HttpResponse(JSON.stringify({ message: 'Organization not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    let users = mockOrganizationUserDetails;
    if (email_search_string) {
        users = users.filter(u => u.email.includes(email_search_string));
    }
    // Note: Tag filtering is not directly applicable to UserDetails as it's not a property of UserDetails.
    // If the API supported filtering users by tags associated with their membership, that logic would go here.
    // For now, we'll assume tag filtering is only for OrganizationMembers.

    return HttpResponse.json(users);
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - ORGANIZATION API - GET ORGANIZATION BY ID

/** @typedef {import('../../src/organization/organization-types.js').OrganizationData} OrganizationData */
/**
 * @type {OrganizationData}
 */
const mockOrganizationData = {
    name: "Nestre Organization",
    num_basic_subscriptions: 100,
    subscriptions_expiry: "2025-12-31T23:59:59Z",
    id: "org_123_data"
};

handlers.push(
  http.get(`${API_BASE_URL}/v${API_VERSION}/org/:organization_id`, ({ params }) => {
    const { organization_id } = params;

    if (organization_id === 'org_not_found') {
        return new HttpResponse(JSON.stringify({ message: 'Organization not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    if (organization_id === 'org_123') {
        return HttpResponse.json(mockOrganizationData);
    }

    return new HttpResponse(JSON.stringify({ message: 'Organization not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
  })
);

//#endregion
