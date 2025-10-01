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
 * @typedef {import('../../src/admin-app/admin-app-types.js').UserData} UserData
 * @typedef {import('../../src/admin-app/admin-app-types.js').NewlyCreatedOrganizationData} NewlyCreatedOrganizationData
 * @typedef {import('../../src/admin-app/admin-app-types.js').UpdatedOrganization} UpdatedOrganization
 * @typedef {import('../../src/admin-app/admin-app-types.js').RetrievedOrganizationData} RetrievedOrganizationData
 */
/** @typedef {import('../../src/admin-app/admin-app-types.js').UserStatsData} UserStatsData */
/** @typedef {import('../../src/admin-app/admin-app-types.js').ReferralCodeStats} ReferralCodeStats */

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

//#region MOCK SERVICE WORKERS - ADMIN APP API - GET REFERRAL CODE STATS

/**
 * @type {ReferralCodeStats}
 */
const mockReferralCodeStats = {
    codes: [
        {
            code: "REF123",
            name: "Test User",
            user_type: "user",
            total_referred_users: 10,
            basic_monthly_subscribers: 2,
            basic_annual_subscribers: 1,
            total_referred_subscribers: 3
        }
    ],
    total_referred_users: 10,
    total_referred_subscribers: 3,
    total_basic_monthly_subscribers: 2,
    total_basic_annual_subscribers: 1
};

handlers.push(
  http.get(`${API_BASE_URL}/v${API_VERSION}/admin/referral-code-stats`, ({ request }) => {
    const url = new URL(request.url);
    const name = url.searchParams.get('name');
    const code = url.searchParams.get('code');

    if (name === 'invalid-date-user') {
        return new HttpResponse('Invalid date provided', { status: 400 });
    }

    if (code === 'NOTFOUND') {
        return new HttpResponse(JSON.stringify({ message: 'Stats not found' }), { status: 404 });
    }

    return HttpResponse.json(mockReferralCodeStats);
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - ADMIN APP API - GET USER STATS

/**
 * @type {UserStatsData}
 */
const mockUserStatsData = {
  total_users: 1000,
  new_users: 50,
  active_users: 300
};

handlers.push(
  http.get(`${API_BASE_URL}/v${API_VERSION}/admin/user-stats`, ({ request }) => {
    const url = new URL(request.url);
    const fromDate = url.searchParams.get('from_date');
    const toDate = url.searchParams.get('to_date');

    if (fromDate && toDate) {
      return HttpResponse.json(mockUserStatsData);
    }

    return new HttpResponse('Invalid date range provided', { status: 400 });
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - ADMIN APP API - GET ORGANIZATION

/**
 * @type {RetrievedOrganizationData}
 */
const mockRetrievedOrganizationData = {
  id: 'org_123',
  name: 'Mock Org',
  num_basic_subscriptions: 100,
  subscriptions_expiry: '2025-12-31T23:59:59.000Z',
  team_codes: [
    { code: 'TEAM1', is_active: true },
    { code: 'TEAM2', is_active: false }
  ],
  referral_codes: [
    { code: 'REF1', is_active: true, created_at: '2024-01-01T00:00:00Z' }
  ]
};

handlers.push(
  http.get(`${API_BASE_URL}/v${API_VERSION}/admin/organization/:organization_id`, ({ params }) => {
    const { organization_id } = params;

    if (organization_id === 'org_123') {
      return HttpResponse.json(mockRetrievedOrganizationData);
    }

    if (organization_id === 'org_not_found') {
      return new HttpResponse(JSON.stringify({ message: 'Organization not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new HttpResponse('Invalid organization ID provided', { status: 400 });
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - ADMIN APP API - UPDATE ORGANIZATION

handlers.push(
  http.patch(`${API_BASE_URL}/v${API_VERSION}/admin/organization/:organization_id`, async ({ request, params }) => {
    const { organization_id } = params;
    const updateData = await request.json();

    if (organization_id) {
      /** @type {UpdatedOrganization} */
      const updatedOrg = {
        id: organization_id,
        ...updateData,
      };
      return HttpResponse.json(updatedOrg);
    }
    return new HttpResponse('Invalid organization ID provided', { status: 400 });
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - ADMIN APP API - CREATE ORGANIZATION

handlers.push(
  http.post(`${API_BASE_URL}/v${API_VERSION}/admin/organization`, async ({ request }) => {
    const orgData = await request.json();

    if (!orgData.name || typeof orgData.num_basic_subscriptions !== 'number' || !orgData.subscriptions_expiry) {
      return new HttpResponse('Invalid organization data provided', { status: 400 });
    }

    /** @type {NewlyCreatedOrganizationData} */
    const newOrg = {
      ...orgData,
      id: `org_${Date.now()}`
    };

    return HttpResponse.json(newOrg);
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - ADMIN APP API - DELETE ORGANIZATION

handlers.push(
  http.delete(`${API_BASE_URL}/v${API_VERSION}/admin/organization/:organization_id`, ({ params }) => {
    const { organization_id } = params;

    if (organization_id === 'org_123') {
      // Return 204 No Content for successful deletion
      return new HttpResponse(null, { status: 204 });
    }

    return new HttpResponse('Invalid organization ID provided', { status: 400 });
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - ADMIN APP API - GET USER

/**
 * @type {UserData}
 */
const mockUserData = {
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
  referral_codes: [
    {
      code: 'REF123',
      is_active: true,
      created_at: '2024-02-01T11:00:00Z',
    },
  ],
};

handlers.push(
  http.get(`${API_BASE_URL}/v${API_VERSION}/admin/user/:user_id`, ({ params }) => {
    if (params.user_id) {
      return HttpResponse.json(mockUserData);
    }
    return new HttpResponse('Invalid user ID provided', { status: 400 });
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

//#region MOCK SERVICE WORKERS - ADMIN APP API - UPDATE USER

handlers.push(
  http.patch(`${API_BASE_URL}/v${API_VERSION}/admin/user/:user_id/update`, async ({ request, params }) => {
    if (params.user_id) {
      const updateData = await request.json();
      const updatedUser = {
        ...mockUserData,
        ...updateData,
      };
      return HttpResponse.json(updatedUser);
    }
    return new HttpResponse('Invalid user ID provided', { status: 400 });
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - ADMIN APP API - CREATE TEAM CODE

handlers.push(
  http.post(`${API_BASE_URL}/v${API_VERSION}/admin/organization/:organization_id/team-code`, async ({ request, params }) => {
    const { organization_id } = params;
    const teamCode = await request.json();

    if (organization_id === 'org_123' && teamCode.code && typeof teamCode.is_active === 'boolean') {
      return HttpResponse.text(`Team code '${teamCode.code}' created successfully for organization '${organization_id}'.`);
    }

    return new HttpResponse('Invalid data provided', { status: 400 });
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - ADMIN APP API - CREATE REFERRAL CODE

handlers.push(
  http.post(`${API_BASE_URL}/v${API_VERSION}/admin/organization/:organization_id/referral-code`, async ({ request, params }) => {
    const { organization_id } = params;
    const referralCode = await request.json();

    if (organization_id === 'org_123' && referralCode.code && typeof referralCode.is_active === 'boolean') {
      return HttpResponse.text(`Referral code '${referralCode.code}' created successfully for organization '${organization_id}'.`);
    }

    return new HttpResponse('Invalid data provided', { status: 400 });
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - ADMIN APP API - CREATE ORGANIZATION MEMBERS

handlers.push(
  http.post(`${API_BASE_URL}/v${API_VERSION}/admin/organization/:organization_id/members`, async ({ request, params }) => {
    const { organization_id } = params;
    const membersData = await request.json();

    if (organization_id === 'org_123' && membersData.members && Array.isArray(membersData.members)) {
      return HttpResponse.text(`${membersData.members.length} member(s) created successfully for organization '${organization_id}'.`);
    }

    return new HttpResponse('Invalid data provided', { status: 400 });
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - ADMIN APP API - DELETE ORGANIZATION MEMBERS

handlers.push(
  http.delete(`${API_BASE_URL}/v${API_VERSION}/admin/organization/:organization_id/members`, async ({ request, params }) => {
    const { organization_id } = params;
    const memberIds = await request.json();

    if (organization_id === 'org_123' && Array.isArray(memberIds) && memberIds.length > 0) {
      return HttpResponse.text(`${memberIds.length} member(s) deleted successfully.`);
    }

    return new HttpResponse('Invalid data provided', { status: 400 });
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - ADMIN APP API - GET MEMBER REFERRAL CODE STATS

handlers.push(
  http.get(`${API_BASE_URL}/v${API_VERSION}/admin/organization/:organization_id/member-referral-code-stats`, ({ params }) => {
    const { organization_id } = params;

    if (organization_id === 'org_not_found') {
        return new HttpResponse(JSON.stringify({ message: 'Stats not found' }), { status: 404 });
    }

    if (organization_id === 'org_123') {
        /** @type {ReferralCodeStats} */
        const mockMemberReferralCodeStats = {
            ...mockReferralCodeStats,
            codes: [{
                ...mockReferralCodeStats.codes[0],
                name: "Org Member"
            }]
        };
        return HttpResponse.json(mockMemberReferralCodeStats);
    }

    return new HttpResponse('Invalid organization ID provided', { status: 400 });
  })
);

//#endregion