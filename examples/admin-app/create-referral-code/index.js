/**
 * index.js
 * @file Frontend script for the create-referral-code example web page.
 * @description This script demonstrates how to use the `web-nestre-api` library 
 * to create a new referral code for an organization via the Admin App API.
 * It handles DOM interactions, sets the authentication token, 
 * and displays the API response on the page.
 * @requires {NestreApiManager} from '../../../src/index.js'
 * @requires {API_BASE_URL, API_VERSION} from '../../environment-variables.js'
 */

//#region IMPORTS

// Import directly from the source file for local testing
import { NestreApiManager } from '../../../src/index.js';
import { API_BASE_URL, API_VERSION } from '../../environment-variables.js';

//#endregion

//#region PRIVATE - VARIABLES - DOM ELEMENTS

/** @type{HTMLElement | null} */
let organizationIdInput;
/** @type{HTMLElement | null} */
let codeInput;
/** @type{HTMLElement | null} */
let isActiveSelect;
/** @type{HTMLElement | null} */
let authTokenInput;
/** @type{HTMLElement | null} */
let runTestBtn;
/** @type{HTMLElement | null} */
let outputDiv;

//#endregion

//#region PRIVATE - LIFECYCLE - ADD EVENT LISTENER - DOM CONTENT LOADED

document.addEventListener('DOMContentLoaded', () => {
    AttachDomReferences();
    AddEventListeners();
    CreateNestreApi();
});

//#endregion

//#region PRIVATE - GET DOM REFERENCES

function AttachDomReferences() {
    organizationIdInput = document.getElementById('organizationIdInput');
    codeInput = document.getElementById('codeInput');
    isActiveSelect = document.getElementById('isActiveSelect');
    authTokenInput = document.getElementById('authTokenInput');
    runTestBtn = document.getElementById('runTestBtn');
    outputDiv = document.getElementById('output');
}

//#endregion

//#region PRIVATE - ADD EVENT LISTENERS TO DOM OBJECTS

function AddEventListeners() {
    runTestBtn.addEventListener('click', RunButtonClicked);
}

//#endregion

//#region PRIVATE - CREATE NESTRE API CLIENT

function CreateNestreApi() {
    let nestreApiManager = NestreApiManager.GetInstance();
    nestreApiManager.SetBaseUrl(API_BASE_URL);
    nestreApiManager.SetApiVersion(API_VERSION);
}

//#endregion

//#region PRIVATE - RUN BUTTON CLICKED

function RunButtonClicked() {
    outputDiv.innerHTML = '';
    
    const organizationId = organizationIdInput.value;
    const referralCode = {
        code: codeInput.value,
        is_active: isActiveSelect.value === 'true'
    };
    const authToken = authTokenInput.value;
    
    RunTest(organizationId, referralCode, authToken);
}

//#endregion

//#region PRIVATE - RUN TEST

/**
 * Runs the test
 * @param {string} organizationId
 * @param {import('../../../src/admin-app/admin-app-types.js').CreateReferralCode} referralCode 
 * @param {string} authToken 
 */
async function RunTest(organizationId, referralCode, authToken) {
    Log('Initializing test...');

    if (authToken) {
        NestreApiManager.GetInstance().SetAuthToken(authToken);
        Log('Auth token has been set.');
    } else {
        NestreApiManager.GetInstance().ClearAuthToken();
        Log('No auth token provided. Making unauthenticated request.');
        Log('❌ Error: Auth token is required for this endpoint.');
        return;
    }
    
    try {
        Log(`Creating referral code for organization: ${organizationId}...`);
        
        const response = await NestreApiManager.GetInstance().adminAppApi.CreateReferralCodeForOrganization(organizationId, referralCode);

        Log('✅ Test successful!');
        Log('API Response:');
        
        outputDiv.innerHTML += `<pre>${response}</pre>`;
        
    } catch (error) {
        Log(`❌ Test failed: ${error.message} : ${error.details || ''}`);
        console.error(error);
    }
}

//#endregion

//#region PRIVATE - LOG

/**
 * Logs a message to the console and the outputDiv
 * @param {string} message 
 */
function Log(message) {
    console.log(message);
    outputDiv.innerHTML += `<p>${message}</p>`;
}

//#endregion