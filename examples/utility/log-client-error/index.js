/**
 * index.js
 * @file Frontend script for the log-client-error example web page.
 * @description This script demonstrates how to use the `web-nestre-api` library 
 * to log a client-side error. 
 * It handles DOM interactions, sets the authentication token, 
 * and displays the API response on the page.
 * @requires {NestreApiManager} from '../../../src/index.js'
 * @requires {API_BASE_URL} from '../../environment-variables.js'
 */

//#region IMPORTS

// Import directly from the source file for local testing
import { NestreApiManager } from '../../../src/index.js';
import { API_BASE_URL, API_VERSION } from '../../environment-variables.js';

/**
 * @typedef {import('../../../src/utility/utility-types.js').ErrorLog } ErrorLog
 */

//#endregion

//#region PRIVATE - VARIABLES - DOM ELEMENTS

/**
 * Input field for the error message
 * @type{HTMLInputElement | null}
 */
let errorMessageInput;

/**
 * Select field for the log level
 * @type{HTMLSelectElement | null}
 */
let logLevelInput;

/**
 * Input field for the auth token
 * @type{HTMLInputElement | null}
 */
let authTokenInput;

/**
 * Run button that will execute the test when clicked
 * @type{HTMLButtonElement | null}
 */
let runTestBtn;

/**
 * Div used to display a message
 * @type{HTMLDivElement | null}
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
    errorMessageInput = document.getElementById('errorMessageInput');
    logLevelInput = document.getElementById('logLevelInput');
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
    runTestBtn.addEventListener('click', RunButtonClicked);

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
    const nestreApiManager = NestreApiManager.GetInstance();
    nestreApiManager.SetBaseUrl(API_BASE_URL);
    nestreApiManager.SetApiVersion(API_VERSION);

} //END CreateNestreApi Method

//#endregion

//#region PRIVATE - RUN BUTTON CLICKED

/**
 * Executes test logic when the run button is clicked
 */
//---------------------------------------------//
function RunButtonClicked()
//---------------------------------------------//
{
    // Clear previous results
    outputDiv.innerHTML = '';
    
    // Get current values from the input fields
    const authToken = authTokenInput.value;
    /** @type {ErrorLog} */
    const errorLog = {
        message: errorMessageInput.value,
        log_level: logLevelInput.value
    };
    
    // Run the test with the provided values
    RunTest(errorLog, authToken);

} //END RunButtonClicked Method

//#endregion

//#region PRIVATE - RUN TEST

/**
 * Runs the test, requires an errorLog object and an authentication token
 * @param {ErrorLog} errorLog 
 * @param {string} authToken 
 */
//------------------------------------------------------------//
async function RunTest(errorLog, authToken) 
//------------------------------------------------------------//
{
    if (!errorLog.message || !errorLog.log_level) 
    {
        Log('❌ Error: Error Message and Log Level are required.');
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
        Log(`Logging client error: ${JSON.stringify(errorLog)}...`);
        
        const responseMessage = await NestreApiManager.GetInstance().utilityApi.LogClientError(errorLog);

        Log('✅ Test successful!');
        Log('API Response:');
        
        // Display result in a readable format
        outputDiv.innerHTML += `<pre>${responseMessage.message}</pre>`;
        
    } 
    catch (error) 
    {
        Log(`❌ Test failed: ${error.message} : ${error.details}`);
        console.error(error);
    }

} //END RunTest Method

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