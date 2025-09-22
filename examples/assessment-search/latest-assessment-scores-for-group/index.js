/**
 * index.js
 * @file Frontend script for the latest-assessment-scores-for-group example web page.
 * @description This script demonstrates how to use the `web-nestre-api` library 
 * to fetch the latest assessment scores for a group of users.
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
 * Textarea for the user ids
 * @type{HTMLElement | null}
 */
let userIdsInput;

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
    userIdsInput = document.getElementById('userIdsInput');
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
    
    const userIdsJson = userIdsInput.value;
    const authToken = authTokenInput.value;

    let userIds;
    try {
        userIds = JSON.parse(userIdsJson);
    } catch (e) {
        Log(`❌ Error: Invalid JSON in User IDs field. ${e.message}`);
        return;
    }
    
    RunTest(userIds, authToken);
}

//#endregion

//#region PRIVATE - RUN TEST

/**
 * Runs the test, requires a list of userIds and an authentication token
 * @param {string[]} userIds 
 * @param {string} authToken 
 */
//------------------------------------------------------------//
async function RunTest(userIds, authToken) 
//------------------------------------------------------------//
{
    Log('Initializing test...');

    if (authToken) {
        NestreApiManager.GetInstance().SetAuthToken(authToken);
        Log('Auth token has been set.');
    } else {
        NestreApiManager.GetInstance().ClearAuthToken();
        Log('No auth token provided. Making unauthenticated request.');
    }
    
    try {
        Log(`Fetching latest assessment scores for users: ${JSON.stringify(userIds)}...`);
        
        const scores = await NestreApiManager.GetInstance().assessmentSearchApi.GetLatestAssessmentsScoresForUsers(userIds);

        Log('✅ Test successful!');
        Log('Latest Assessment Scores Loaded:');
        
        const scoresString = JSON.stringify(scores, null, 2);
        outputDiv.innerHTML += `<pre>${scoresString}</pre>`;
        
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