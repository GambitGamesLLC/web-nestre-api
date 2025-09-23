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
export const AUTH_TOKEN = "eyJraWQiOiJTeFlTZGZmeXFlQUpPSUVieSs4aWRBV3EwR0RLMW94Z0l0Q0ZcLzdXN05zST0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJjNjI2NGM0ZC0wZDA1LTRjOWUtODdiNy1lYjMxYjI0ZjNkOTciLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9vTnl4UlBDV1oiLCJjbGllbnRfaWQiOiI0Z2N1NW5vZDI0M3Bvb2FmZDY4bTg1dG5xNCIsIm9yaWdpbl9qdGkiOiIwYjJkNDdlNS1iYzlhLTRiMjctYjJlNC0xYTIxMmE0NzAzNDEiLCJldmVudF9pZCI6IjYwZGI2NzhmLTA5ZjUtNDk2Yy1iOGUzLTVlNWIzMmJhMGI0MCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3NTg2MzAwNTMsImV4cCI6MTc1ODcxNjQ1MywiaWF0IjoxNzU4NjMwMDUzLCJqdGkiOiJlYjlmMjNkYS00YTQyLTQ3MmUtOWI4Ny00MGI2NTcwZWRiNGIiLCJ1c2VybmFtZSI6ImM2MjY0YzRkLTBkMDUtNGM5ZS04N2I3LWViMzFiMjRmM2Q5NyJ9.jxf5N7tijBX_jOnXlLHhNHGJTit_yeviz6UZ9I66fkk4sY6gQUljjMmhoIifHJHIOvv6-igZ1xM9LUkk5Eejn1Joe5c6gLHP-2It7uRYLCthL7NuEMEYORdryuFlguMXO4DOR6hQtldw4G06qvoi8kbeIh7IaNt0AVol3A5CQQi6Uj7RWIPMlfwpdY0qMvtM16rtwbtGs76vx9wCwjJ82_jkxnKaZs2ICUrKpd5OgMHZuTmkq1skW3GP8t0z0Etp3Gcppt5toPYthx6tdNC-Dv9jG4blFWChRvxzCsgNaf3tsqGvcyCUmIORzZtlW8iyqzZgLzUd5Z4oWz_sgcJwhA";

/**
 * UserEmail we want to user for lookups
 * @type{string}
 */
export const USER_EMAIL = "derrick@nestrehealthandperformance.com";
