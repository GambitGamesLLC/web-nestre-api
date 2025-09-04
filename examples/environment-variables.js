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
export const AUTH_TOKEN = "eyJraWQiOiJTeFlTZGZmeXFlQUpPSUVieSs4aWRBV3EwR0RLMW94Z0l0Q0ZcLzdXN05zST0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJjNjI2NGM0ZC0wZDA1LTRjOWUtODdiNy1lYjMxYjI0ZjNkOTciLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9vTnl4UlBDV1oiLCJjbGllbnRfaWQiOiI0Z2N1NW5vZDI0M3Bvb2FmZDY4bTg1dG5xNCIsIm9yaWdpbl9qdGkiOiI2NTAwNmRjOC0xMGQwLTQyYjAtOTI1NS0yOTczN2FiNGY2MjgiLCJldmVudF9pZCI6IjIyYTkwYmNkLTgxYTQtNDVhYS04ZmU2LTg3NzIxMTg5YWVhZiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3NTY5ODQ5NTQsImV4cCI6MTc1NzA3MTM1NCwiaWF0IjoxNzU2OTg0OTU0LCJqdGkiOiIzZWI5NTcxZC0wNzU2LTQ0M2EtYTVjZS03OWJmZjg3ZDg0MGMiLCJ1c2VybmFtZSI6ImM2MjY0YzRkLTBkMDUtNGM5ZS04N2I3LWViMzFiMjRmM2Q5NyJ9.Xq3VwsfUKnlnJ-Kgxziry0tkfT6rRo3E0YlshhIFC5QaCUwrIAjsUKLRwvt4eHy-2Kqeb-UY9U7I9CIaTbYG0mNIY5r1kWBMZwXOSLbun-2fyXhgwiVzjpCo7sB57Oynrj4Qo0bA9PqbX2xPQAIx0fE3hm1-z-hhISFNtgRmRIA6I3utvsN3lKbgOmHdLDBgG2ZYDIouNMICwYz-XiTV_PNwsIYc_ylRQaDVGWaBX0EVl2oF8FpGUFM35KK6h39tDQ6jTMLZ266YHux5M4yQO9r_tH0LWBAJcN1p_LUKUjC9dX6htXEy3GAPG4n4KbGNrI2ItVXk54C8d1sjsP5HYw";

/**
 * UserEmail we want to user for lookups
 * @type{string}
 */
export const USER_EMAIL = "derrick@nestrehealthandperformance.com";
