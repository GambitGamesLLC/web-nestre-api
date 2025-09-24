/**
 * index.js
 * @file Frontend script for the staff-access-token example web page.
 * @description This script demonstrates how to use the `web-nestre-api` library 
 * to fetch a staff access token. 
 * It handles DOM interactions, sets the authentication token, 
 * and displays the API response on the page.
 * @requires {NestreApiManager} from '../../../src/index.js'
 * @requires {API_BASE_URL} from '../../environment-variables.js'
 */

//#region IMPORTS

// Import directly from the source file for local testing
import { NestreApiManager } from '../../../src/index.js';
import { API_BASE_URL } from '../../environment-variables.js'
import { API_VERSION } from '../../environment-variables.js';

//#endregion

//#region PRIVATE - VARIABLES - DOM ELEMENTS

/**
 * Input field for the auth token
 * @type{HTMLInputElement | null}
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

}); //END DOMContentLoaded Event Listener Hook

//#endregion

//#region PRIVATE - GET DOM REFERENCES

/**
 * Attaches our DOM references to our variables
 */
//------------------------------------------------------//
function AttachDomReferences()
//------------------------------------------------------//
{
    // --- DOM Elements ---
    authTokenInput = document.getElementById('authTokenInput');
    runTestBtn = document.getElementById('runTestBtn');
    outputDiv = document.getElementById('output');

} //END AttachDomReferences Method

//#endregion

//#region PRIVATE - ADD EVENT LISTENERS TO DOM OBJECTS

/**
 * Called as part of the 'DOMContentLoaded' lifecycle event
 * Attach all event listeners to their DOM objects
 */
//------------------------------------------------------//
function AddEventListeners()
//------------------------------------------------------//
{
    runTestBtn.addEventListener( 'click', RunButtonClicked );

} //END AddEventListeners Method

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

} //END CreateNestreApi Method

//#endregion

//#region PRIVATE - RUN BUTTON CLICKED

/**
 * Executes test logic when the run button is clicked
 */
//---------------------------------------------//
async function RunButtonClicked()
//---------------------------------------------//
{
    // Clear previous results
    outputDiv.innerHTML = '';
    
    // Get current values from the input fields
    const authToken = authTokenInput.value;
    
    Log('Initializing staff access token test...');

    if (authToken) {
        NestreApiManager.GetInstance().SetAuthToken(authToken);
        Log('Auth token has been set.');
    } else {
        Log('❌ Error: Auth Token is required.');
        return;
    }
    
    try 
    {
        Log(`Attempting to get staff access token...`);
        
        const staffAccessData = await NestreApiManager.GetInstance().developmentApi.GetStaffAccessToken();

        Log('✅ Test successful!');
        Log('Staff Access Data Loaded:');
        
        // Display result in a readable format
        const staffAccessDataString = JSON.stringify(staffAccessData, null, 2);
        outputDiv.innerHTML += `<pre>${staffAccessDataString}</pre>`;
        
    } 
    catch (error) 
    {
        Log(`❌ Test failed: ${error.message} : ${error.details}`);
        console.error(error);
    }

} //END RunButtonClicked Method

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

} //END Log Method

//#endregion