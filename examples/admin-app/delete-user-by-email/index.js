/**
 * index.js
 * @file Frontend script for the delete-user-by-email example web page.
 * @description This script demonstrates how to use the `web-nestre-api` library 
 * to delete a user by their email address. 
 * It handles DOM interactions, sets the authentication token, 
 * and displays the API response on the page.
 * @requires {NestreApiManager} from '../../../src/index.js'
 * @requires {API_BASE_URL, API_VERSION} from '../../environment-variables.js'
 */

//#region IMPORTS

import { NestreApiManager } from '../../../src/index.js';
import { API_BASE_URL, API_VERSION } from '../../environment-variables.js';

//#endregion

//#region PRIVATE - VARIABLES - DOM ELEMENTS

/** @type{HTMLElement | null} */
let emailInput;

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

/**
 * Attaches our DOM references to our variables
 */
//------------------------------------------------------//
function AttachDomReferences()
//------------------------------------------------------//
{
    emailInput = document.getElementById('emailInput');
    authTokenInput = document.getElementById('authTokenInput');
    runTestBtn = document.getElementById('runTestBtn');
    outputDiv = document.getElementById('output');
}

//#endregion

//#region PRIVATE - ADD EVENT LISTENERS TO DOM OBJECTS

/**
 * Attach all event listeners to their DOM objects
 */
//------------------------------------------------------//
function AddEventListeners()
//------------------------------------------------------//
{
    runTestBtn.addEventListener('click', RunButtonClicked);
}

//#endregion

//#region PRIVATE - CREATE NESTRE API CLIENT

/**
 * Creates the Nestre API client, preparing it for use
 */
//-------------------------------------------------------//
function CreateNestreApi()
//-------------------------------------------------------//
{
    let nestreApiManager = NestreApiManager.GetInstance();
    nestreApiManager.SetBaseUrl(API_BASE_URL);
    nestreApiManager.SetApiVersion(API_VERSION);
}

//#endregion

//#region PRIVATE - RUN BUTTON CLICKED

/**
 * Executes test logic when the run button is clicked
 */
//---------------------------------------------//
function RunButtonClicked()
//---------------------------------------------//
{
    outputDiv.innerHTML = '';
    const email = emailInput.value;
    const authToken = authTokenInput.value;
    RunTest(email, authToken);
}

//#endregion

//#region PRIVATE - RUN TEST

/**
 * Runs the test to delete a user by email.
 * @param {string} email 
 * @param {string} authToken 
 */
//------------------------------------------------------------//
async function RunTest(email, authToken) 
//------------------------------------------------------------//
{
    if (!email) {
        Log('❌ Error: Email is required.');
        return;
    }

    Log('Initializing test...');
    NestreApiManager.GetInstance().SetAuthToken(authToken);
    Log('Auth token has been set.');

    try {
        Log(`Attempting to delete user with email: ${email}...`);
        const response = await NestreApiManager.GetInstance().adminAppApi.DeleteUserByEmail(email);
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

function Log(message) {
    console.log(message);
    outputDiv.innerHTML += `<p>${message}</p>`;
}

//#endregion