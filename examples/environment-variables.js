/**
 * environment-variables.js
 * @file Common environment variables for local testing and examples.
 * @description This file contains constant values such as the API base URL, test user ID, and a dummy authentication token. These are used to simplify running the local examples and tests.
 * @exports {string} API_BASE_URL
 * @exports {string} USER_ID
 * @exports {string} AUTH_TOKEN
 * @exports {string} USER_EMAIL
 */

/**
 * Base URL for the development NESTRE server
 * @type{string}
 */
export const API_BASE_URL = 'https://appservices.dev.nestreapp.com'; // Replace with production server if needed

/**
 * Current version of the Nestre Api to call
 * @type{number}
 */
export const API_VERSION = 2;

/**
 * UserId we want to use for user lookups
 * @type{string}
 */
export const USER_ID = "2480b679-93ca-49e8-9de0-515aac99846a";

/**
 * Authorization token granted for us to access the Nestre API
 * @type{string}
 */
export const AUTH_TOKEN = "eyJraWQiOiJTeFlTZGZmeXFlQUpPSUVieSs4aWRBV3EwR0RLMW94Z0l0Q0ZcLzdXN05zST0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJjNjI2NGM0ZC0wZDA1LTRjOWUtODdiNy1lYjMxYjI0ZjNkOTciLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9vTnl4UlBDV1oiLCJjbGllbnRfaWQiOiI0Z2N1NW5vZDI0M3Bvb2FmZDY4bTg1dG5xNCIsIm9yaWdpbl9qdGkiOiJiYjczOWQ1OC00NTdhLTRlNWYtYTgxMS1hODA3M2U4ZWIwOTgiLCJldmVudF9pZCI6IjUwZTQwZjllLWQwMjMtNGI2Yi1iN2MxLTQ4YTY1YjI4MTRiMCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3NTgxMTk4ODUsImV4cCI6MTc1ODIwNjI4NSwiaWF0IjoxNzU4MTE5ODg1LCJqdGkiOiI1ZGI1YmFhOC05ZTk2LTRmMTgtYTFmOC1kZDg1NzE1NTkzODEiLCJ1c2VybmFtZSI6ImM2MjY0YzRkLTBkMDUtNGM5ZS04N2I3LWViMzFiMjRmM2Q5NyJ9.JTEVbwtLgtdxFJmBPBPnA8Yh7EMGL5GRSyMwbvxW5Ipt_6o3iHx6-01YwnzcoIHrnpymG_nhemmOPYQMr8DATqMTjN-VCCOYhkmYEFJhKEaHpmFzvapi5EYDQ9pJairwCzKbHJztX8lKVhLFXibXelc9YtLCVZCf6mqbpLa8ZxBqH9RlMqPQc39-vTauCyi77IN_VHybum9xh4ozppuNIE06FYRAB57Pd6P7n5SLB7lssFdaZmNDpUGfbAuQm4lHndlOvNkq28MstmYXFIDEbQA0u-zGa8xE7hC4V8jIct2uhdE8lSPkt1RgqIU9zMa6QYtUQJjEdV9Kz9v8h3n1bA";

/**
 * UserEmail we want to user for lookups
 * @type{string}
 */
export const USER_EMAIL = "derrick@nestrehealthandperformance.com";
