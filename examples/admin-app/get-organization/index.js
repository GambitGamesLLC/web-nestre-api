/**
 * index.js
 * @file Frontend script for the get-organization example web page.
 * @description This script demonstrates how to use the `web-nestre-api` library 
 * to fetch an organization's details by its ID via the Admin App API.
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
let authTokenInput;
/** @type{HTMLElement | null} */
let runTestBtn;
/** @type{HTMLElement | null} */
let outputDiv;

//#endregion

//#region PRIVATE - LIFECYCLE - ADD EVENT LISTENER - DOM CONTENT LOADED

/**
 * Called when the DOM is fully initialized.
 */
//-----------------------------------------------------//
document.addEventListener('DOMContentLoaded', () => 
//-----------------------------------------------------//
{
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
    organizationIdInput = document.getElementById('organizationIdInput');
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
    
    const organizationId = organizationIdInput.value;
    const authToken = authTokenInput.value;
    
    RunTest(organizationId, authToken);
}

//#endregion

//#region PRIVATE - RUN TEST

/**
 * Runs the test
 * @param {string} organizationId 
 * @param {string} authToken 
 */
//------------------------------------------------------------//
async function RunTest(organizationId, authToken) 
//------------------------------------------------------------//
{
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
        Log(`Fetching organization: ${organizationId}...`);
        
        const orgData = await NestreApiManager.GetInstance().adminAppApi.GetOrganization(organizationId);

        Log('✅ Test successful!');
        Log('Retrieved Organization Data:');
        
        const orgDataString = JSON.stringify(orgData, null, 2);
        outputDiv.innerHTML += `<pre>${orgDataString}</pre>`;
        
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
//------------------------------------------------------//
function Log(message) 
//------------------------------------------------------//
{
    console.log(message);
    outputDiv.innerHTML += `<p>${message}</p>`;
}

//#endregion