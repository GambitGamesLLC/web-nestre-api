//#region IMPORTS

// Import directly from the source file for local testing
import { NestreApiManager } from '../../../src/index.js';
import { API_BASE_URL } from '../../environment-variables.js'

/** 
 * @typedef {import('../../../src/types.js').NestreApiManagerConfig} NestreApiManagerConfig 
 **/

//#endregion

//#region PRIVATE - VARIABLES

/**
 * The Nestre API client, used to make API calls
 * @type{NestreApiManager}
 */
let nestreApiManager;

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
 * This lifecycle event does not guarantee a 
 * specific callback order for any 
 * Methods attached to it from other scripts. 
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
 * 
 * @returns
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
//------------------------------------------------------//
function AddEventListeners()
//------------------------------------------------------//
{

    runTestBtn.addEventListener( 'click', RunButtonClicked );

} //END AddEventListeners Method

//#endregion

//#region PRIVATE - CREATE NESTRE API CLIENT

/**
 * Creates the Nestre API client, preparring it for use
 */
//-------------------------------------------------------//
function CreateNestreApi()
//-------------------------------------------------------//
{
    /**
     * @type{NestreApiManagerConfig}
     */
    let nestreAPIManagerConfig = 
    { 
        baseUrl: API_BASE_URL 
    };

    nestreApiManager = new NestreApiManager(nestreAPIManagerConfig);
    
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
    const userId = userIdInput.value;
    const authToken = authTokenInput.value;
    
    // Run the test with the provided values
    RunTest(userId, authToken);

} //END RunButtonClicked Method

//#endregion

//#region PRIVATE - RUN TEST

/**
 * Runs the test, requires a userId and authentication token
 * @param {string} userId 
 * @param {string} authToken 
 * @returns 
 */
//------------------------------------------------------------//
async function RunTest(userId, authToken) 
//------------------------------------------------------------//
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
        nestreApiManager.SetAuthToken(authToken);
        Log('Auth token has been set.');
    } 
    else 
    {
        nestreApiManager.ClearAuthToken();
        Log('No auth token provided. Making unauthenticated request.');
    }
    
    try 
    {
        Log(`Fetching profile for user: ${userId}...`);
        
        // Because of JSDoc, you get autocompletion here in VS Code!
        const basicProfile = await nestreApiManager.userAPI.GetBasicUserProfile(userId);

        Log('✅ Test successful!');
        Log('Basic User Profile Loaded:');
        
        // Display result in a readable format
        const profileString = JSON.stringify(basicProfile, null, 2);
        outputDiv.innerHTML += `<pre>${profileString}</pre>`;
        
    } 
    catch (error) 
    {
        Log(`❌ Test failed: ${error.message}`);
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

//#endregion