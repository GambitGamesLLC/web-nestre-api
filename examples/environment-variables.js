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
 * Assessment identifier to user for lookups
 * @type{string}
 */
export const ASSESSMENT_ID = "2480b679-93ca-49e8-9de0-515aac99846a";

/**
 * Authorization token granted for us to access the Nestre API
 * @type{string}
 */
export const AUTH_TOKEN = "eyJraWQiOiJTeFlTZGZmeXFlQUpPSUVieSs4aWRBV3EwR0RLMW94Z0l0Q0ZcLzdXN05zST0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJjNjI2NGM0ZC0wZDA1LTRjOWUtODdiNy1lYjMxYjI0ZjNkOTciLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9vTnl4UlBDV1oiLCJjbGllbnRfaWQiOiI0Z2N1NW5vZDI0M3Bvb2FmZDY4bTg1dG5xNCIsIm9yaWdpbl9qdGkiOiI1MTQ3YTMwOS1mMDM5LTQ0NTctYjViMS04MGVkZThiOTBiNGMiLCJldmVudF9pZCI6IjRlODY0YzI1LTA5MTItNDk3MC1hNTdhLTBmZTBjODk5MjRhMiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3NTg1NDcyNTIsImV4cCI6MTc1ODYzMzY1MiwiaWF0IjoxNzU4NTQ3MjUyLCJqdGkiOiJlZjk1MTVjMS1jMGRlLTQ5MDMtODhjZS1jYWU4ZjBhMTIyMjMiLCJ1c2VybmFtZSI6ImM2MjY0YzRkLTBkMDUtNGM5ZS04N2I3LWViMzFiMjRmM2Q5NyJ9.Rv40926PLhSVh0bCd_NoTMqejLxe0P-QsPjP_8GuthzzraHrPZW24KYkgvP8cj3D2HuZGfUu7hnlMA7CnRe44KtM5FVPYmaZge7Yrlx1pjDgWKQgdnQJ45ZWKY8vCI5Jq-j193szBw60qGCEwdHtB-9zN2XmCaaXlBE4XqfDalBQ3zQq6S6xbpZ1E3ltZ-alCIar7Z8SMf7VEefOrVvn5eyprhA2UQNrDu-68MwB0Ex8OOEJvbmSa5eOPmINPfvmZ9vq_SmpPR7-pnvU4f70X6aE7vk7djV-zERAx0zgR5cbFam2whf4GfXs9jA1_4z3JAmw6Jqb_sA100lRmaclEA";

/**
 * UserEmail we want to user for lookups
 * @type{string}
 */
export const USER_EMAIL = "derrick@nestrehealthandperformance.com";
