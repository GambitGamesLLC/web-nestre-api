/**
 * index.js
 * @file Frontend script for the create-organization-members example web page.
 * @description This script demonstrates how to use the `web-nestre-api` library 
 * to create new organization members via the Admin App API.
 * It handles DOM interactions, sets the authentication token, 
 * and displays the API response on the page.
 * @requires {NestreApiManager} from '../../../src/index.js'
 * @requires {API_BASE_URL, API_VERSION, AUTH_TOKEN} from '../../environment-variables.js'
 */

//#region IMPORTS

// Import directly from the source file for local testing
import { NestreApiManager } from '../../../src/index.js';
import { API_BASE_URL, API_VERSION, AUTH_TOKEN } from '../../environment-variables.js';

//#endregion

//#region PRIVATE - VARIABLES - DOM ELEMENTS

/** @type{HTMLInputElement | null} */
let organizationIdInput;
/** @type{HTMLTextAreaElement | null} */
let membersInput;
/** @type{HTMLInputElement | null} */
let authTokenInput;
/** @type{HTMLButtonElement | null} */
let runTestBtn;
/** @type{HTMLDivElement | null} */
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

    authTokenInput.value = AUTH_TOKEN;
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
    membersInput = document.getElementById('membersInput');
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
    let membersData;

    try {
        membersData = JSON.parse(membersInput.value);
    } catch (e) {
        Log(`❌ Error: Invalid JSON in Members input. ${e.message}`);
        return;
    }
    
    RunTest(organizationId, membersData, authToken);
}

//#endregion

//#region PRIVATE - RUN TEST

/**
 * Runs the test
 * @param {string} organizationId
 * @param {import('../../../src/admin-app/admin-app-types.js').OrganizationMembers} membersData 
 * @param {string} authToken 
 */
//------------------------------------------------------------//
async function RunTest(organizationId, membersData, authToken) 
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
        Log(`Creating members for organization: ${organizationId}...`);
        
        const response = await NestreApiManager.GetInstance().adminAppApi.CreateOrganizationMembers(organizationId, membersData);

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
//------------------------------------------------------//
function Log(message) 
//------------------------------------------------------//
{
    console.log(message);
    outputDiv.innerHTML += `<p>${message}</p>`;
}

//#endregion