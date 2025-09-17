/**
 * index.js
 * @file Frontend script for the update-frame example web page.
 * @description This script demonstrates how to use the `web-nestre-api` library 
 * to update a frame-it object.
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
let updateDataInput;

/** @type{HTMLElement | null} */
let runTestBtn;

/** @type{HTMLElement | null} */
let outputDiv;

/** @type{HTMLImageElement | null} */
let frameImage;

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
    updateDataInput = document.getElementById('updateDataInput');
    runTestBtn = document.getElementById('runTestBtn');
    outputDiv = document.getElementById('output');
    frameImage = document.getElementById('frameImage');
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
    frameImage.style.display = 'none';
    frameImage.src = '';
    
    const userId = userIdInput.value;
    const authToken = authTokenInput.value;
    const frameId = frameIdInput.value;
    const updateDataText = updateDataInput.value;
    
    RunTest(userId, authToken, frameId, updateDataText);
}

//#endregion

//#region PRIVATE - RUN TEST

async function RunTest(userId, authToken, frameId, updateDataText) {
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

    if (!updateDataText) {
        Log('❌ Error: Update Frame Data is required.');
        return;
    }

    let updateDataObject;
    try {
        updateDataObject = JSON.parse(updateDataText);
    } catch (e) {
        Log(`❌ Error: Invalid JSON in Update Frame Data. ${e.message}`);
        return;
    }

    Log('Initializing test...');

    NestreApiManager.GetInstance().SetAuthToken(authToken);
    Log('Auth token has been set.');
    
    try {
        Log(`Updating frame for user: ${userId} with frame ID: ${frameId}...`);
        
        const updatedFrame = await NestreApiManager.GetInstance().frameItApi.UpdateFrame(userId, frameId, updateDataObject);

        Log('✅ Test successful!');
        Log('Frame Updated:');
        
        const resultString = JSON.stringify(updatedFrame, null, 2);
        outputDiv.innerHTML += `<pre>${resultString}</pre>`;

        if (updatedFrame.image_url) {
            Log('Displaying updated frame image...');
            frameImage.src = updatedFrame.image_url;
            frameImage.style.display = 'block';
        }
        
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