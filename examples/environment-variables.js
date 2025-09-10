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
export const AUTH_TOKEN = "eyJraWQiOiJTeFlTZGZmeXFlQUpPSUVieSs4aWRBV3EwR0RLMW94Z0l0Q0ZcLzdXN05zST0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJjNjI2NGM0ZC0wZDA1LTRjOWUtODdiNy1lYjMxYjI0ZjNkOTciLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9vTnl4UlBDV1oiLCJjbGllbnRfaWQiOiI0Z2N1NW5vZDI0M3Bvb2FmZDY4bTg1dG5xNCIsIm9yaWdpbl9qdGkiOiJkMGE4MmNjZC1lNmU3LTRhY2UtYjVmZS1mODM2ZTBhZWY1OTYiLCJldmVudF9pZCI6IjEyNjNiYTZiLTc2NDItNDFmNC1hOTAzLWViZDgxNmE2YmI5YSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3NTc1MDc0MTQsImV4cCI6MTc1NzU5MzgxNCwiaWF0IjoxNzU3NTA3NDE0LCJqdGkiOiJjYTk0MGM5ZS0yOGIxLTQ1OGQtYWZhYS05Y2YzNGM4ZDZmM2QiLCJ1c2VybmFtZSI6ImM2MjY0YzRkLTBkMDUtNGM5ZS04N2I3LWViMzFiMjRmM2Q5NyJ9.kAHIf5EUO-ugjqQ_Tk3cJm81fuopIaqH2ulh92aBUBeFlkRfl1PG2Eb0qkwCGmCxg8asS6Ji7WuW04nJZCqGs0xVHdtBhBz4F7pVMX4Civ3cLF6pcDefMLkNu5w4bW3wF4hGbujNwudLmJCSpHBDCR_VJglJJE_4twCREhSy0xFcm5i8v40p8N5tUsiXIGlFgy3H2cbzbt6lDWzrpQF0uXHNiwhjpSS1Q6A7JVDG2wSOFfBXQMbh4LNsQMk3p8gAC1eU2jwNkGQ_67035ha36ZsgTnxyk6R0AocXMWZWxHg0bUUtmrYeuBqsR-eszrJik4mjPMTm15qpFecgtzEaWQ";

/**
 * UserEmail we want to user for lookups
 * @type{string}
 */
export const USER_EMAIL = "derrick@nestrehealthandperformance.com";
