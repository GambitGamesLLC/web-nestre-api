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
export const AUTH_TOKEN = "eyJraWQiOiJTeFlTZGZmeXFlQUpPSUVieSs4aWRBV3EwR0RLMW94Z0l0Q0ZcLzdXN05zST0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJjNjI2NGM0ZC0wZDA1LTRjOWUtODdiNy1lYjMxYjI0ZjNkOTciLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9vTnl4UlBDV1oiLCJjbGllbnRfaWQiOiI0Z2N1NW5vZDI0M3Bvb2FmZDY4bTg1dG5xNCIsIm9yaWdpbl9qdGkiOiJmMGFhZWVjMS1lNzc2LTRlMmMtYmVjYS1hMmM5OTU0Y2Y1MTAiLCJldmVudF9pZCI6IjA4MTk1NDRkLTljZmUtNGRiZC1iNjRkLWM1OWZlOWZlMzhhOSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3NTczMzU0NjQsImV4cCI6MTc1NzQyMTg2NCwiaWF0IjoxNzU3MzM1NDY0LCJqdGkiOiJhMzZjZTZiNi03NjUxLTQ2NjktOTU1Yy04Mzk3ZTI2ZjM3Y2MiLCJ1c2VybmFtZSI6ImM2MjY0YzRkLTBkMDUtNGM5ZS04N2I3LWViMzFiMjRmM2Q5NyJ9.QSXlKPMYz4TaKHDyZd-BB4Ivb-5Oidi9CQXrbz0Bf-w72pujnrEPPOOGmF84oBKvSVygFti8ZeNLidJ1pLUuD-wkagAtptSBsUDhoG-lOfE1PJsDDHiFCVBzApvMkF-uX8wZ_7VXDi_ljW5_jxMJkS21JrAdi0QytVtN0W_1rOuFcHQ296Bv1ADhf0a08OOurBu5TCUSOiuj_4XgNW10UvOL9O9OSwEIIIgQbMjsArSrwNdQMaC2HVIJ9FNevYZEB_NXU1YptW5-lyJ4RN8XzMmfwpsbvOIhqMr1VANFi0qfSaNYFW4Ft8T1MljIBcdp6B7KdjLH7RaD3NRhjyQHeQ";

/**
 * UserEmail we want to user for lookups
 * @type{string}
 */
export const USER_EMAIL = "derrick@nestrehealthandperformance.com";
