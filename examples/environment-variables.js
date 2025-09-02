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
 * UserId we want to use for user lookups
 * @type{string}
 */
export const USER_ID = "2480b679-93ca-49e8-9de0-515aac99846a";

/**
 * Authorization token granted for us to access the Nestre API
 * @type{string}
 */
export const AUTH_TOKEN = "eyJraWQiOiJTeFlTZGZmeXFlQUpPSUVieSs4aWRBV3EwR0RLMW94Z0l0Q0ZcLzdXN05zST0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJjNjI2NGM0ZC0wZDA1LTRjOWUtODdiNy1lYjMxYjI0ZjNkOTciLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9vTnl4UlBDV1oiLCJjbGllbnRfaWQiOiI0Z2N1NW5vZDI0M3Bvb2FmZDY4bTg1dG5xNCIsIm9yaWdpbl9qdGkiOiI5NjMxYzRlNi00MWE5LTQxZGUtOTMwZS05ODM5MjRlMDQzMTQiLCJldmVudF9pZCI6IjA5MTc2YWY5LTFmZjctNDNlYy05NzU1LTY3NGJjMzI4NTI2NCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3NTY4NTE1NzcsImV4cCI6MTc1NjkzNzk3NywiaWF0IjoxNzU2ODUxNTc3LCJqdGkiOiIxMDJlMDM3ZS1hYjg1LTRjZjItYjhjYS1lZDk0NjkxMjBmYmYiLCJ1c2VybmFtZSI6ImM2MjY0YzRkLTBkMDUtNGM5ZS04N2I3LWViMzFiMjRmM2Q5NyJ9.a8IidOEZUkzNQ_gbG0i5aRuyZmv9ygLcgmqKbiaW1NyLQ-CYOpxXM4sHC_7JDXo1fhjE_0MUFpQRfh460HiliWat822N94dotrpFcCtY9Cyg7Qq43-NlRwJsiLDGRJTN8ZVOSyBkPnvGR6Rzx7ZFnhBhjcjeD2ZLuafxx4BjWRAELEob-E4tE4qW4p9Lfrg82PGNhC6BJm1Q4RczeLJD_h8yW-IIsf7oNoEvi8pdZ8IGOaUpxlPda2T4ueAYJvUpTuMRIYma8QYqancR_ZAng7-FVchGhDFuy3Jkh61GB5hV-JS3Z3U3pct913Dy6vrW_F0KK0XOL--oSBNF8YsEKQ";

/**
 * UserEmail we want to user for lookups
 * @type{string}
 */
export const USER_EMAIL = "derrick@nestrehealthandperformance.com";
