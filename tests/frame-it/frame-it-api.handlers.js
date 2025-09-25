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

//#region MOCK SERVICE WORKERS - FRAME IT API - CREATE PERSONALIZED FRAME

/**
 * Dummy personalized frame it object returned when mock testing
 * @type {PersonalizedFrameIt}
 */
const mockPersonalizedFrameIt = {
    updated_at: "2024-01-01T12:00:00Z",
    created_at: "2024-01-01T12:00:00Z",
    id: "frame_123abc",
    phrases: [], // This will be populated from the request body
    wins: [],
    completed: false,
    image_url: "https://nestre-development.s3.amazonaws.com/frame-it/frame_123abc.png"
};

handlers.push(
  http.post(`${API_BASE_URL}/v${API_VERSION}/user/:userId/frame`, async ({ request, params }) => {
    const { userId } = params;
    const body = await request.json();

    if (userId === USER_ID) {
      const response = { ...mockPersonalizedFrameIt, phrases: body };
      return HttpResponse.json(response);
    }

    return new HttpResponse(JSON.stringify({ message: 'User not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - FRAME IT API - GET FRAME BY ID

handlers.push(
  http.get(`${API_BASE_URL}/v${API_VERSION}/user/:userId/frame/:frameId`, ({ params }) => {
    const { userId, frameId } = params;

    if (userId !== USER_ID) {
      return new HttpResponse(JSON.stringify({ message: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (frameId === 'some-frame-id') {
      const response = { 
        ...mockPersonalizedFrameIt, 
        id: frameId,
        phrases: ["I am strong", "I am capable"],
        image_url: `https://nestre-development.s3.amazonaws.com/frame-it/${frameId}.png`
      };
      return HttpResponse.json(response);
    }

    return new HttpResponse(JSON.stringify({ message: 'Frame not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - FRAME IT API - UPDATE FRAME

handlers.push(
  http.patch(`${API_BASE_URL}/v${API_VERSION}/user/:userId/frame/:frameId`, async ({ request, params }) => {
    const { userId, frameId } = params;
    const updateData = await request.json();

    if (userId !== USER_ID) {
      return new HttpResponse(JSON.stringify({ message: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (userId === USER_ID && frameId === 'some-frame-id') {
      const existingFrame = { 
        ...mockPersonalizedFrameIt, 
        id: frameId,
        phrases: ["I am strong", "I am capable"],
        image_url: `https://nestre-development.s3.amazonaws.com/frame-it/${frameId}.png`
      };

      const updatedFrame = { ...existingFrame, ...updateData };
      
      return HttpResponse.json(updatedFrame);
    }

    return new HttpResponse(JSON.stringify({ message: 'Frame not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - FRAME IT API - GET FRAME GALLERY

/**
 * Dummy personalized frame gallery object returned when mock testing
 * @type {PersonalizedFrameGallery}
 */
const mockPersonalizedFrameGallery = {
    frames: [
        {
            updated_at: "2024-01-01T12:00:00Z",
            created_at: "2024-01-01T12:00:00Z",
            id: "frame_123abc",
            phrases: ["I am strong", "I am capable"],
            wins: [],
            completed: false,
            image_url: "https://nestre-development.s3.amazonaws.com/frame-it/frame_123abc.png"
        },
        {
            updated_at: "2024-01-02T12:00:00Z",
            created_at: "2024-01-02T12:00:00Z",
            id: "frame_456def",
            phrases: ["I am focused", "I am calm"],
            wins: ["Completed a project"],
            completed: true,
            image_url: "https://nestre-development.s3.amazonaws.com/frame-it/frame_456def.png"
        }
    ]
};

handlers.push(
  http.get(`${API_BASE_URL}/v${API_VERSION}/user/:userId/frames`, ({ params }) => {
    const { userId } = params;

    if (userId === USER_ID) {
      return HttpResponse.json(mockPersonalizedFrameGallery);
    }

    return new HttpResponse(JSON.stringify({ message: 'User not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
  })
);

//#endregion

//#region MOCK SERVICE WORKERS - FRAME IT API - DELETE FRAME BY ID

handlers.push(
  http.delete(`${API_BASE_URL}/v${API_VERSION}/user/:userId/frame/:frameId`, ({ params }) => {
    const { userId, frameId } = params;

    if (userId !== USER_ID) {
      return new HttpResponse(JSON.stringify({ message: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (userId === USER_ID && frameId === 'some-frame-id') {
      /** @type {DeleteFrameConfirmationMessage} */
      const response = { message: 'Frame deleted successfully.' };
      return HttpResponse.json(response);
    }

    return new HttpResponse(JSON.stringify({ message: 'Frame not found' }), { status: 404, headers: { 'Content-Type': 'application/json' }});
  })
);

//#endregion
