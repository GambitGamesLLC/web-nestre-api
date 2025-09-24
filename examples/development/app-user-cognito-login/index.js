/**
 * index.js
 * @file Frontend script for the app-user-cognito-login example web page.
 * @description This script demonstrates how to use the `web-nestre-api` library 
 * to authenticate a user via the development endpoint. 
 * It handles DOM interactions and displays the API response on the page.
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
 * Input field for the username
 * @type{HTMLInputElement | null}
 */
let usernameInput;

/**
 * Input field for the password
 * @type{HTMLInputElement | null}
 */
let passwordInput;

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
    usernameInput = document.getElementById('usernameInput');
    passwordInput = document.getElementById('passwordInput');
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
function RunButtonClicked()
//---------------------------------------------//
{
    // Clear previous results
    outputDiv.innerHTML = '';
    
    // Get current values from the input fields
    const username = usernameInput.value;
    const password = passwordInput.value;
    
    // Run the test with the provided values
    RunTest(username, password);

} //END RunButtonClicked Method

//#endregion

//#region PRIVATE - RUN TEST

/**
 * Runs the authentication test.
 * @param {string} username 
 * @param {string} password 
 */
//------------------------------------------------------------//
async function RunTest(username, password) 
//------------------------------------------------------------//
{
    if (!username || !password) 
    {
        Log('❌ Error: Username and password are required.');
        return;
    }

    Log('Initializing authentication test...');
    
    try 
    {
        Log(`Attempting to authenticate user: ${username} & password: ${password}...`);
        
        const authRequest = { username, password };
        const authData = await NestreApiManager.GetInstance().developmentApi.Authenticate(authRequest);

        Log('✅ Test successful!');
        Log('Authentication Data Loaded:');
        
        // Display result in a readable format
        const authDataString = JSON.stringify(authData, null, 2);
        outputDiv.innerHTML += `<pre>${authDataString}</pre>`;
        
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

