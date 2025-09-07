/**
 * index.js
 * @file Frontend script for the record-cognitive-exercise-interaction example web page.
 * @description This script demonstrates how to use the `web-nestre-api` library 
 * to record a cognitive exercise interaction. 
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
 * Textarea for the cognitive exercise record
 * @type{HTMLElement | null}
 */
let recordInput;

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

}); //END DOMContentLoaded Method

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
    recordInput = document.getElementById('recordInput');
    runTestBtn = document.getElementById('runTestBtn');
    outputDiv = document.getElementById('output');

} //END AttachDomReferences Method

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
    runTestBtn.addEventListener( 'click', RunButtonClicked );

} //END AddEventListeners Method

//#endregion

//#region PRIVATE - CREATE NESTRE API CLIENT

/**
 * Creates the Nestre API client, preparring it for use
 */
//-----------------------------------------------------//
function CreateNestreApi()
//-----------------------------------------------------//
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
//-----------------------------------------------------//
function RunButtonClicked()
//-----------------------------------------------------//
{
    // Clear previous results
    outputDiv.innerHTML = '';
    
    // Get current values from the input fields
    const userId = userIdInput.value;
    const authToken = authTokenInput.value;
    const recordText = recordInput.value;
    
    // Run the test with the provided values
    RunTest(userId, authToken, recordText);

} //END RunButtonClicked Method

//#endregion

//#region PRIVATE - RUN TEST

/**
 * Runs the test, requires a userId, authentication token, and record data
 * @param {string} userId 
 * @param {string} authToken 
 * @param {string} recordText
 * @returns 
 */
//------------------------------------------------------------//
async function RunTest(userId, authToken, recordText) 
//------------------------------------------------------------//
{
    if (!userId) 
    {
        Log('❌ Error: User ID is required.');
        return;
    }

    if (!recordText) {
        Log('❌ Error: Cognitive Exercise Record is required.');
        return;
    }

    let cognitiveExerciseRecord;
    try {
        cognitiveExerciseRecord = JSON.parse(recordText);
    } catch (e) {
        Log(`❌ Error: Invalid JSON in Cognitive Exercise Record. ${e.message}`);
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
        Log('❌ Error: Auth Token is required.');
        return;
    }
    
    try 
    {
        Log(`Recording cognitive exercise interaction for user: ${userId}...`);
        
        // Because of JSDoc, you get autocompletion here in VS Code!
        const confirmation = await NestreApiManager.GetInstance().cognitiveExercisesApi.RecordCognitiveExerciseInteraction(userId, cognitiveExerciseRecord);

        Log('✅ Test successful!');
        Log('Interaction Recorded:');
        
        // Display result in a readable format
        const confirmationString = JSON.stringify(confirmation, null, 2);
        outputDiv.innerHTML += `<pre>${confirmationString}</pre>`;
        
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