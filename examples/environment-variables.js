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
export const AUTH_TOKEN = "eyJraWQiOiJTeFlTZGZmeXFlQUpPSUVieSs4aWRBV3EwR0RLMW94Z0l0Q0ZcLzdXN05zST0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJjNjI2NGM0ZC0wZDA1LTRjOWUtODdiNy1lYjMxYjI0ZjNkOTciLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9vTnl4UlBDV1oiLCJjbGllbnRfaWQiOiI0Z2N1NW5vZDI0M3Bvb2FmZDY4bTg1dG5xNCIsIm9yaWdpbl9qdGkiOiI4MTc1MWQ1YS02YmNmLTQxNjktODk3Zi1kNjEzYTNjNDRkNWYiLCJldmVudF9pZCI6Ijc3NzA2ZWUzLTA4MDktNDg1Yy05OWQ3LWJmMTg0YzJlZGFhMiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3NTc5NjkzMTgsImV4cCI6MTc1ODA1NTcxOCwiaWF0IjoxNzU3OTY5MzE4LCJqdGkiOiJhMTJiMzAzOC1hYmUxLTRmMDctYmViMC02ZmFmOGI3MDM5NjIiLCJ1c2VybmFtZSI6ImM2MjY0YzRkLTBkMDUtNGM5ZS04N2I3LWViMzFiMjRmM2Q5NyJ9.hYSrhJ_Rwtflr6wEmDqRZlyV7G0287yig8n_Fn9Wv7Ui_j-Gz9ZU2R8X2hoHY7f4QoQspLBHiRmHdAWivawCLuQ7t9V1PA0e7HT4_0eTYjFslxGtIkIme9_Lwu-7J1rH3ZWIqs4jhCtYPXmXbLnEeHOMXWuK4HsjEtwBkE05j47IXWLXm8n813FHktV4F70BKJIX_Dt6t1quSZQ7OTZkmZArHcv1gJReagWCaNCThwt6B88eXdnMqmaX9eZ9jEd6D1VqU0ksc_wHplaJ4WvNG0nIKGXXDLKRvzW1cJQI-Ax4agWhjMTfFYSbJORWAXL2k-T1qgaq5yfgCFtjqsbRIQ";

/**
 * UserEmail we want to user for lookups
 * @type{string}
 */
export const USER_EMAIL = "derrick@nestrehealthandperformance.com";
