/**
 * index.js
 * @file Frontend script for the admin-app/update-user example web page.
 * @description This script demonstrates how to use the `web-nestre-api` library 
 * to update a user's profile using the AdminAppApi.
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

let userIdInput;
let authTokenInput;
let updateDataInput;
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
    userIdInput = document.getElementById('userIdInput');
    authTokenInput = document.getElementById('authTokenInput');
    updateDataInput = document.getElementById('updateDataInput');
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
    const updateDataText = updateDataInput.value;

    let updateData;
    try {
        updateData = JSON.parse(updateDataText);
    } catch (e) {
        Log(`❌ Error: Invalid JSON in Update Data field. ${e.message}`);
        return;
    }
    
    RunTest(userId, authToken, updateData);
}

//#endregion

//#region PRIVATE - RUN TEST

async function RunTest(userId, authToken, updateData) {
    if (!userId) {
        Log('❌ Error: User ID is required.');
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
        Log(`Updating profile for user: ${userId}...`);
        
        const updatedUser = await NestreApiManager.GetInstance().adminAppApi.UpdateUser(userId, updateData);

        Log('✅ Test successful!');
        Log('Updated User Data:');
        outputDiv.innerHTML += `<pre>${JSON.stringify(updatedUser, null, 2)}</pre>`;
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