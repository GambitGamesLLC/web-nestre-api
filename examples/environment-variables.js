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
export const AUTH_TOKEN = "eyJraWQiOiJTeFlTZGZmeXFlQUpPSUVieSs4aWRBV3EwR0RLMW94Z0l0Q0ZcLzdXN05zST0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJjNjI2NGM0ZC0wZDA1LTRjOWUtODdiNy1lYjMxYjI0ZjNkOTciLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9vTnl4UlBDV1oiLCJjbGllbnRfaWQiOiI0Z2N1NW5vZDI0M3Bvb2FmZDY4bTg1dG5xNCIsIm9yaWdpbl9qdGkiOiJmY2Q4YTYwNC0wZTk5LTQwMGUtYmUyYi1lOGQyMmJhMGJhY2UiLCJldmVudF9pZCI6IjI3YWFhMWQwLWFkYWEtNGYwYS05NjhmLWFmYjZmMjEyNGEwMCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3NTc4MDEyNzksImV4cCI6MTc1Nzg4NzY3OSwiaWF0IjoxNzU3ODAxMjc5LCJqdGkiOiI3OTE0ZGNiNy0zNjRmLTQ3OGMtYjFjMS00ODg0MTNlZTdhZWMiLCJ1c2VybmFtZSI6ImM2MjY0YzRkLTBkMDUtNGM5ZS04N2I3LWViMzFiMjRmM2Q5NyJ9.ltDtNyZdF6X3OPyALAoAUfqhTa0-YQU5KgPRKGoW5TlvoFyMkbLyjfhXwoVHDyTcyAHf4csHfgBF6F656IIY6hD0rnxjtlC2KiwmucAC670uoPV8zZcDjkN4fjnMl48-YMEy8vcEKId9k1047Gsox0JxgFE3Bs_e2FjeBepCjBVbJ6OQES0HMh-olxqB-fh-bz2oChAfPbOEN8itCh8gY_fgZ3HI5syRuZ7nvmfVqF_n-S0WIzQ9T9xBrjfWyXanDuC8D41e1ATQ5UsJltN7yRkDAzbENmWjCKJmhbLSYQUEue6G4Gc1rhpPM2tgK1Yzj_hpdOSOVusoFOwyaUA0gw";

/**
 * UserEmail we want to user for lookups
 * @type{string}
 */
export const USER_EMAIL = "derrick@nestrehealthandperformance.com";
