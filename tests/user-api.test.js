//#region IMPORTS

// Import the test runner functions
import { it, describe } from 'node:test';

// Import the assertion library
import assert from 'node:assert';

// Import what we want to test
import { NestreApiManager, HttpMethod } from '../src/nestre-api-manager.js';

import { UserApi } from '../src/user/user-api.js';

//Import the BASE_URL from our environment-variables.js
import { API_BASE_URL } from '../examples/environment-variables.js';

//Import the AUTH_TOKEN from our environment-variables.js
import { AUTH_TOKEN } from '../examples/environment-variables.js';

//Import the USER_ID from our environment-variables.js
import { USER_ID } from '../examples/environment-variables.js';

//#endregion

