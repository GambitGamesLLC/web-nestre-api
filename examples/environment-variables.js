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
export const AUTH_TOKEN = "eyJraWQiOiJTeFlTZGZmeXFlQUpPSUVieSs4aWRBV3EwR0RLMW94Z0l0Q0ZcLzdXN05zST0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJjNjI2NGM0ZC0wZDA1LTRjOWUtODdiNy1lYjMxYjI0ZjNkOTciLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9vTnl4UlBDV1oiLCJjbGllbnRfaWQiOiI0Z2N1NW5vZDI0M3Bvb2FmZDY4bTg1dG5xNCIsIm9yaWdpbl9qdGkiOiJkY2E2MDVlMS1hYWJhLTRlNDMtOTFiZS01NGQ5ZmY0ZTZmYTkiLCJldmVudF9pZCI6Ijg5N2FlYWFkLTNmNTctNGQ2OS04YTg0LWVjYWQ1ZTViNmYwZSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3NTgyMDA5NjMsImV4cCI6MTc1ODI4NzM2MywiaWF0IjoxNzU4MjAwOTYzLCJqdGkiOiIxMGRmOTY4NS0xMTkxLTQ3NjYtYjI1OS1lODY2MDEyNDI2NzIiLCJ1c2VybmFtZSI6ImM2MjY0YzRkLTBkMDUtNGM5ZS04N2I3LWViMzFiMjRmM2Q5NyJ9.m0dL8oSXLpTumuSN29MAKMS6Vw3SrFlsxeSHP2xV0rFBxdQ2_p03eKlgvhDGL76DkkSwiR8tEzyTSRFYCkpoQqIlrni6D-vrhsxjpdC2D5_wBcCa9VTbJl-Z_IoYPGImQC-4rTEuWhqU8Dh809zus4EjrXocCopJK2G-pqmXk0j3QX3MxemmTlkHcZKS4hP4CgVpS97-rAj12xZYYs0rrp8GHcPVYHdjmMoxjIzX_-i7n-oYkKyiPj9T3AQJk9HefnYw8Kv6q150rRU8u6r6f8M1MkjNJ74bcnCtEu7dGRPf4ccTkjlcuKzZKn_S8iRrJPltUS6yVX_JZBQjYOaZUg";

/**
 * UserEmail we want to user for lookups
 * @type{string}
 */
export const USER_EMAIL = "derrick@nestrehealthandperformance.com";
