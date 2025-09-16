/**
 * index.js
 * @file Frontend script for the get-guided-frames-content-recommendations example web page.
 * @description This script demonstrates how to use the `web-nestre-api` library 
 * to fetch guided frames content recommendations for a user.
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

//#region PRIVATE - ATTACH DOM REFERENCES

/**
 * Attaches our DOM references to our variables
 */
//-----------------------------------------------------//
function AttachDomReferences() 
//-----------------------------------------------------//
{
    userIdInput = document.getElementById('userIdInput');
    authTokenInput = document.getElementById('authTokenInput');
    numRecommendationsInput = document.getElementById('numRecommendationsInput');
    runTestBtn = document.getElementById('runTestBtn');
    outputDiv = document.getElementById('output');
}

//#endregion

//#region PRIVATE - ADD EVENT LISTENERS TO DOM OBJECTS

/**
 * Called as part of the 'DOMContentLoaded' lifecycle event
 * Attach all event listeners to their DOM objects
 */
//-----------------------------------------------------//
function AddEventListeners() 
//-----------------------------------------------------//
{
    runTestBtn.addEventListener('click', RunButtonClicked);
}

//#endregion

//#region PRIVATE - CREATE NESTRE API CLIENT

/**
 * Creates the Nestre API client, preparing it for use
 */
//-----------------------------------------------------//
function CreateNestreApi() 
//-----------------------------------------------------//
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
//-----------------------------------------------------//
function RunButtonClicked() 
//-----------------------------------------------------//
{
    outputDiv.innerHTML = '';
    
    const userId = userIdInput.value;
    const authToken = authTokenInput.value;
    const numRecommendations = parseInt(numRecommendationsInput.value, 10);
    
    RunTest(userId, authToken, numRecommendations);
}

//#endregion

//#region PRIVATE - RUN TEST

/**
 * Runs the test, requires a userId, authentication token, and number of recommendations
 * @param {string} userId 
 * @param {string} authToken 
 * @param {number} numRecommendations
 */
//------------------------------------------------------------//
async function RunTest(userId, authToken, numRecommendations) 
//------------------------------------------------------------//
{
    if (!userId) {
        Log('❌ Error: User ID is required.');
        return;
    }

    if (!authToken) {
        Log('❌ Error: Auth Token is required.');
        return;
    }

    if (isNaN(numRecommendations) || numRecommendations <= 0) {
        Log('❌ Error: Number of recommendations must be a positive number.');
        return;
    }

    Log('Initializing test...');

    NestreApiManager.GetInstance().SetAuthToken(authToken);
    Log('Auth token has been set.');
    
    try {
        Log(`Fetching guided frames recommendations for user: ${userId}...`);
        
        const recommendations = await NestreApiManager.GetInstance().contentRecommendationsApi.GetGuidedFramesContentRecommendations(userId, numRecommendations);

        Log('✅ Test successful!');
        Log('Recommendations Loaded:');
        
        const recommendationsString = JSON.stringify(recommendations, null, 2);
        outputDiv.innerHTML += `<pre>${recommendationsString}</pre>`;
        
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