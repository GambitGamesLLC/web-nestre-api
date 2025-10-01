/**
 * index.js
 * @file Frontend script for the delete-organization-members example web page.
 * @description This script demonstrates how to use the `web-nestre-api` library 
 * to delete members from an organization.
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

let organizationIdInput;
let memberIdsInput;
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

/**
 * Attaches our DOM references to our variables
 */
function AttachDomReferences() {
    organizationIdInput = document.getElementById('organizationIdInput');
    memberIdsInput = document.getElementById('memberIdsInput');
    authTokenInput = document.getElementById('authTokenInput');
    runTestBtn = document.getElementById('runTestBtn');
    outputDiv = document.getElementById('output');
}

//#endregion

//#region PRIVATE - ADD EVENT LISTENERS TO DOM OBJECTS

/**
 * Attach all event listeners to their DOM objects
 */
function AddEventListeners() {
    runTestBtn.addEventListener('click', RunButtonClicked);
}

//#endregion

//#region PRIVATE - CREATE NESTRE API CLIENT

/**
 * Creates the Nestre API client, preparing it for use
 */
function CreateNestreApi() {
    let nestreApiManager = NestreApiManager.GetInstance();
    nestreApiManager.SetBaseUrl(API_BASE_URL);
    nestreApiManager.SetApiVersion(API_VERSION);
}

//#endregion

//#region PRIVATE - RUN BUTTON CLICKED

/**
 * Executes test logic when the run button is clicked
 */
function RunButtonClicked() {
    // Clear previous results
    outputDiv.innerHTML = '';
    
    // Get current values from the input fields
    const organizationId = organizationIdInput.value;
    const authToken = authTokenInput.value;
    let memberIds;

    try {
        memberIds = JSON.parse(memberIdsInput.value);
    } catch (e) {
        Log(`❌ Error: Invalid JSON in Member IDs field. ${e.message}`);
        return;
    }
    
    // Run the test with the provided values
    RunTest(organizationId, memberIds, authToken);
}

//#endregion

//#region PRIVATE - RUN TEST

/**
 * Runs the test to delete organization members.
 * @param {string} organizationId 
 * @param {string[]} memberIds
 * @param {string} authToken 
 */
async function RunTest(organizationId, memberIds, authToken) {
    
    if (!organizationId) {
        Log('❌ Error: Organization ID is required.');
        return;
    }

    Log('Initializing test...');

    // Set the auth token for this request
    if (authToken) {
        NestreApiManager.GetInstance().SetAuthToken(authToken);
        Log('Auth token has been set.');
    } else {
        NestreApiManager.GetInstance().ClearAuthToken();
        Log('No auth token provided. Making unauthenticated request.');
    }
    
    try {
        Log(`Deleting members from organization: ${organizationId}...`);
        
        const response = await NestreApiManager.GetInstance().adminAppApi.DeleteOrganizationMembers(organizationId, memberIds);

        Log('✅ Test successful!');
        Log('API Response:');
        
        // Display result
        outputDiv.innerHTML += `<pre>${response}</pre>`;
        
    } catch (error) {
        Log(`❌ Test failed: ${error.message} : ${error.details}`);
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