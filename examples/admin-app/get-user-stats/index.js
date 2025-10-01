/**
 * index.js
 * @file Frontend script for the admin-app/get-user-stats example web page.
 * @description This script demonstrates how to use the `web-nestre-api` library 
 * to fetch user statistics using the AdminAppApi.
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

let fromDateInput;
let toDateInput;
let authTokenInput;
let runTestBtn;
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
    fromDateInput = document.getElementById('fromDateInput');
    toDateInput = document.getElementById('toDateInput');
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
    
    const fromDate = fromDateInput.valueAsDate;
    const toDate = toDateInput.valueAsDate;
    const authToken = authTokenInput.value;
    
    RunTest(fromDate, toDate, authToken);
}

//#endregion

//#region PRIVATE - RUN TEST

async function RunTest(fromDate, toDate, authToken) {
    if (!fromDate || !toDate) {
        Log('❌ Error: Both From Date and To Date are required.');
        return;
    }

    Log('Initializing test...');

    if (authToken) {
        NestreApiManager.GetInstance().SetAuthToken(authToken);
        Log('Auth token has been set.');
    } else {
        NestreApiManager.GetInstance().ClearAuthToken();
        Log('No auth token provided. Making unauthenticated request.');
    }
    
    try {
        Log(`Fetching user stats from ${fromDate.toISOString().split('T')[0]} to ${toDate.toISOString().split('T')[0]}...`);
        
        const userStats = await NestreApiManager.GetInstance().adminAppApi.GetUserStats(fromDate, toDate);

        Log('✅ Test successful!');
        Log('User Stats Loaded:');
        outputDiv.innerHTML += `<pre>${JSON.stringify(userStats, null, 2)}</pre>`;
    } catch (error) {
        Log(`❌ Test failed: ${error.message} : ${error.details}`);
        console.error(error);
    }
}

//#endregion

//#region PRIVATE - LOG

function Log(message) {
    console.log(message);
    outputDiv.innerHTML += `<p>${message}</p>`;
}

//#endregion