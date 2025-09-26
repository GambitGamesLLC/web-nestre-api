/**
 * index.js
 * @file Frontend script for the get-user example web page.
 * @description This script demonstrates how to use the `web-nestre-api` library 
 * to fetch a user's data via the Admin App API. 
 * It handles DOM interactions, sets the authentication token, 
 * and displays the API response on the page.
 * @requires {NestreApiManager} from '../../../src/index.js'
 * @requires {API_BASE_URL} from '../../environment-variables.js'
 */

//#region IMPORTS

// Import directly from the source file for local testing
import { NestreApiManager } from '../../../src/index.js';
import { API_BASE_URL } from '../../environment-variables.js';
import { API_VERSION } from '../../environment-variables.js';

//#endregion

//#region PRIVATE - VARIABLES - DOM ELEMENTS

/**
 * Input field for the user id
 * @type{HTMLElement | null}
 */
let userIdInput;

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
    userIdInput = document.getElementById('userIdInput');
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
function AddEventListeners()
{
    runTestBtn.addEventListener( 'click', RunButtonClicked );
}

//#endregion

//#region PRIVATE - CREATE NESTRE API CLIENT

/**
 * Creates the Nestre API client, preparing it for use
 */
function CreateNestreApi()
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
function RunButtonClicked()
{
    // Clear previous results
    outputDiv.innerHTML = '';
    
    // Get current values from the input fields
    const userId = userIdInput.value;
    const authToken = authTokenInput.value;
    
    // Run the test with the provided values
    RunTest(userId, authToken);
}

//#endregion

//#region PRIVATE - RUN TEST

/**
 * Runs the test, requires a userId and authentication token
 * @param {string} userId 
 * @param {string} authToken 
 */
async function RunTest(userId, authToken) 
{
    if (!userId) 
    {
        Log('❌ Error: User ID is required.');
        return;
    }

    Log('Initializing test...');

    // Set the auth token for this request
    if(authToken) 
    {
        NestreApiManager.GetInstance().SetAuthToken(authToken);
        Log('Auth token has been set.');
    } 
    else
    {
        NestreApiManager.GetInstance().ClearAuthToken();
        Log('No auth token provided. Making unauthenticated request.');
    }
    
    try 
    {
        Log(`Fetching user data for user: ${userId}...`);
        
        // Because of JSDoc, you get autocompletion here in VS Code!
        const userData = await NestreApiManager.GetInstance().adminAppApi.GetUser(userId);

        Log('✅ Test successful!');
        Log('User Data Loaded:');
        
        // Display result in a readable format
        const userDataString = JSON.stringify(userData, null, 2);
        outputDiv.innerHTML += `<pre>${userDataString}</pre>`;
        
    } 
    catch (error) 
    {
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
function Log(message) 
{
    console.log(message);
    outputDiv.innerHTML += `<p>${message}</p>`;
}

//#endregion