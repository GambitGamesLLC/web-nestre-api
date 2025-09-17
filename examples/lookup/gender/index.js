/**
 * index.js
 * @file Frontend script for the lookup/gender example web page.
 * @description This script demonstrates how to use the `web-nestre-api` library 
 * to fetch gender options from the lookup API. 
 * It handles DOM interactions, sets the authentication token, 
 * and displays the API response on the page.
 * @requires {NestreApiManager} from '../../../src/index.js'
 * @requires {API_BASE_URL} from '../../environment-variables.js'
 */

//#region IMPORTS

// Import directly from the source file for local testing
import { NestreApiManager } from '../../../src/index.js';
import { API_BASE_URL, API_VERSION } from '../../environment-variables.js';

//#endregion

//#region PRIVATE - VARIABLES - DOM ELEMENTS

/**
 * Input field for the auth token
 * @type{HTMLElement | null}
 */
let authTokenInput;

/**
 * Run button that will execute the test when clicked
 * @type{HTMLElement | null}
 */
let runTestBtn;

/**
 * Div used to display a message
 * @type{HTMLElement | null}
 */
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
    // Clear previous results
    outputDiv.innerHTML = '';
    
    // Get current values from the input fields
    const authToken = authTokenInput.value;
    
    // Run the test with the provided values
    RunTest(authToken);
}

//#endregion

//#region PRIVATE - RUN TEST

async function RunTest(authToken) {
    if (!authToken) {
        Log('❌ Error: Auth Token is required.');
        return;
    }

    Log('Initializing test...');

    // Set the auth token for this request
    NestreApiManager.GetInstance().SetAuthToken(authToken);
    Log('Auth token has been set.');
    
    try {
        Log(`Fetching gender options...`);
        
        const genderOptions = await NestreApiManager.GetInstance().lookupApi.GetGenderOptions();

        Log('✅ Test successful!');
        Log('Gender Options Loaded:');
        
        const optionsString = JSON.stringify(genderOptions, null, 2);
        outputDiv.innerHTML += `<pre>${optionsString}</pre>`;
        
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