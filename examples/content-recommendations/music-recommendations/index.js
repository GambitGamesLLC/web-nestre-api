/**
 * index.js
 * @file Frontend script for the music-recommendations example web page.
 * @description This script demonstrates how to use the `web-nestre-api` library 
 * to fetch music content recommendations. 
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

//#region PRIVATE - VARIABLES

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
 * Input field for the number of recommendations
 * @type{HTMLElement | null}
 */
let numRecommendationsInput;

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
    numRecommendationsInput = document.getElementById('numRecommendationsInput');
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
    const userId = userIdInput.value;
    const authToken = authTokenInput.value;
    const numRecommendations = parseInt(numRecommendationsInput.value, 10);
    
    // Run the test with the provided values
    RunTest(userId, authToken, numRecommendations);

} //END RunButtonClicked Method

//#endregion

//#region PRIVATE - RUN TEST

/**
 * Runs the test, requires a userId, authentication token, and number of recommendations
 * @param {string} userId 
 * @param {string} authToken 
 * @param {number} numRecommendations
 * @returns 
 */
//------------------------------------------------------------//
async function RunTest(userId, authToken, numRecommendations) 
//------------------------------------------------------------//
{
    
    if (!userId) 
    {
        Log('❌ Error: User ID is required.');
        return;
    }

    if (!numRecommendations || numRecommendations <= 0) {
        Log('❌ Error: Number of recommendations must be a positive number.');
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
        Log(`Fetching music recommendations for user: ${userId}...`);
        
        // Because of JSDoc, you get autocompletion here in VS Code!
        const recommendations = await NestreApiManager.GetInstance().contentRecommendationsApi.GetMindsetMusicContentRecommendations(userId, numRecommendations);

        Log('✅ Test successful!');
        Log('Music Recommendations Loaded:');
        
        // Display result in a readable format
        const resultString = JSON.stringify(recommendations, null, 2);
        outputDiv.innerHTML += `<pre>${resultString}</pre>`;
        
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