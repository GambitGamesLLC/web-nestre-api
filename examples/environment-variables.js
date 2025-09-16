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
export const AUTH_TOKEN = "eyJraWQiOiJTeFlTZGZmeXFlQUpPSUVieSs4aWRBV3EwR0RLMW94Z0l0Q0ZcLzdXN05zST0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJjNjI2NGM0ZC0wZDA1LTRjOWUtODdiNy1lYjMxYjI0ZjNkOTciLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9vTnl4UlBDV1oiLCJjbGllbnRfaWQiOiI0Z2N1NW5vZDI0M3Bvb2FmZDY4bTg1dG5xNCIsIm9yaWdpbl9qdGkiOiIxYjcxMTFiMi0xM2IzLTQyODAtODUxYS02MzQzYjI0MDMxNjAiLCJldmVudF9pZCI6ImY3MGVkODQ5LTZkOGMtNDY4ZS05NWZhLTk3YTI3ODA5MWVlYyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3NTgwMzMzNDcsImV4cCI6MTc1ODExOTc0NywiaWF0IjoxNzU4MDMzMzQ3LCJqdGkiOiI1NGQ3ZTA0MS0zMDE4LTRhZTYtYmU5MC1mZmUyODMzNTlhYWYiLCJ1c2VybmFtZSI6ImM2MjY0YzRkLTBkMDUtNGM5ZS04N2I3LWViMzFiMjRmM2Q5NyJ9.NZrklw3ToipB7oElCNTmq8fG7-t2p8DhAv1ICgjqgQnN_2ptzevmTXjnp9pwXHST5ris9B2VoWV65RjiNqFoC75KKNMvUUYr_PtOxRCbX7nl2RLH2i3BjCbRx2erWnoCcSVJlhGehy3-GspN-tgZaubZxQypFNjazl9UXcDnGN-_FQd23Q-5RMWg2IPqng4Wy3KV-NlopV-JjgIZ0Zhz618Fw788EOmuujFsGmJv6XahmeMnAbZ8ATRX_3FCZy7PtnEzNxBDrBTuipAEFLmDyKO2C0in6Tc5b873s1OQ9DWYB-qP35nrbkajCcrIPCs-JE3LH_7wTh3M-LFhAJ3j6w";

/**
 * UserEmail we want to user for lookups
 * @type{string}
 */
export const USER_EMAIL = "derrick@nestrehealthandperformance.com";
