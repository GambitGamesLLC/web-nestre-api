/**
 * index.js
 * @file Frontend script for the get-user-details example web page.
 * @description This script demonstrates how to use the `web-nestre-api` library 
 * to fetch detailed user information for organization members who are registered users.
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
let tagInput;
/** @type{HTMLElement | null} */
let emailSearchInput;
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
    tagInput = document.getElementById('tagInput');
    emailSearchInput = document.getElementById('emailSearchInput');
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
    const tag = tagInput.value || null;
    const emailSearch = emailSearchInput.value || null;
    const authToken = authTokenInput.value;
    
    RunTest(organizationId, tag, emailSearch, authToken);
}

//#endregion

//#region PRIVATE - RUN TEST

/**
 * Runs the test
 * @param {string} organizationId 
 * @param {string | null} tag 
 * @param {string | null} emailSearch 
 * @param {string} authToken 
 */
//------------------------------------------------------------//
async function RunTest(organizationId, tag, emailSearch, authToken) 
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
        Log(`Fetching user details for organization: ${organizationId}...`);
        
        const userDetails = await NestreApiManager.GetInstance().organizationApi.GetUserDetails(organizationId, tag, emailSearch);

        Log('✅ Test successful!');
        Log('Organization User Details Loaded:');
        
        const userDetailsString = JSON.stringify(userDetails, null, 2);
        outputDiv.innerHTML += `<pre>${userDetailsString}</pre>`;
        
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