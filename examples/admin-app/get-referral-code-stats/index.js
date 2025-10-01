/**
 * index.js
 * @file Frontend script for the get-referral-code-stats example web page.
 * @description This script demonstrates how to use the `web-nestre-api` library 
 * to fetch referral code statistics via the Admin App API.
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
let nameInput;
/** @type{HTMLElement | null} */
let codeInput;
/** @type{HTMLElement | null} */
let fromDateInput;
/** @type{HTMLElement | null} */
let toDateInput;
/** @type{HTMLElement | null} */
let aggregateCodesSelect;
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
    nameInput = document.getElementById('nameInput');
    codeInput = document.getElementById('codeInput');
    fromDateInput = document.getElementById('fromDateInput');
    toDateInput = document.getElementById('toDateInput');
    aggregateCodesSelect = document.getElementById('aggregateCodesSelect');
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
    
    const name = nameInput.value || null;
    const code = codeInput.value || null;
    const fromDate = fromDateInput.valueAsDate;
    const toDate = toDateInput.valueAsDate;
    const aggregateCodesValue = aggregateCodesSelect.value;
    const aggregateCodes = aggregateCodesValue === 'null' ? null : aggregateCodesValue === 'true';
    const authToken = authTokenInput.value;
    
    RunTest(name, code, fromDate, toDate, aggregateCodes, authToken);
}

//#endregion

//#region PRIVATE - RUN TEST

async function RunTest(name, code, fromDate, toDate, aggregateCodes, authToken) {
    Log('Initializing test...');

    NestreApiManager.GetInstance().SetAuthToken(authToken);
    Log(authToken ? 'Auth token has been set.' : 'No auth token provided. Making unauthenticated request.');
    
    try {
        Log(`Fetching referral code stats...`);
        
        const response = await NestreApiManager.GetInstance().adminAppApi.GetReferralCodeStats(name, code, fromDate, toDate, aggregateCodes);

        Log('✅ Test successful!');
        Log('API Response:');
        outputDiv.innerHTML += `<pre>${JSON.stringify(response, null, 2)}</pre>`;
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