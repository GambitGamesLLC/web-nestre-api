/**
 * index.js
 * @file Frontend script for the delete-frame example web page.
 * @description This script demonstrates how to use the `web-nestre-api` library 
 * to delete a specific frame-it object by its ID.
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
let userIdInput;

/** @type{HTMLElement | null} */
let authTokenInput;

/** @type{HTMLElement | null} */
let frameIdInput;

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

//#region PRIVATE - ATTACH DOM REFERENCES

function AttachDomReferences() {
    userIdInput = document.getElementById('userIdInput');
    authTokenInput = document.getElementById('authTokenInput');
    frameIdInput = document.getElementById('frameIdInput');
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
    
    const userId = userIdInput.value;
    const authToken = authTokenInput.value;
    const frameId = frameIdInput.value;
    
    RunTest(userId, authToken, frameId);
}

//#endregion

//#region PRIVATE - RUN TEST

async function RunTest(userId, authToken, frameId) {
    if (!userId) {
        Log('❌ Error: User ID is required.');
        return;
    }

    if (!authToken) {
        Log('❌ Error: Auth Token is required.');
        return;
    }

    if (!frameId) {
        Log('❌ Error: Frame ID is required.');
        return;
    }

    Log('Initializing test...');

    NestreApiManager.GetInstance().SetAuthToken(authToken);
    Log('Auth token has been set.');
    
    try {
        Log(`Deleting frame for user: ${userId} with frame ID: ${frameId}...`);
        
        const result = await NestreApiManager.GetInstance().frameItApi.DeleteFrameById(userId, frameId);

        Log('✅ Test successful!');
        
        const resultString = result ? JSON.stringify(result, null, 2) : "Frame deleted successfully (204 No Content).";
        outputDiv.innerHTML += `<pre>${resultString}</pre>`;
        
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