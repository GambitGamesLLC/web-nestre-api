/**
 * index.js
 * @file Frontend script for the update-user example web page.
 * @description This script demonstrates how to use the `web-nestre-api` library 
 * to update a user profile. It handles DOM interactions, sets the authentication token, 
 * and displays the API response on the page.
 * @requires {NestreApiManager} from '../../../src/index.js'
 * @requires {API_BASE_URL} from '../../environment-variables.js'
 */

//#region IMPORTS

// Import directly from the source file for local testing
import { NestreApiManager } from '../../../src/index.js';
import { API_BASE_URL, API_VERSION } from '../../environment-variables.js';

/**
 * @typedef {import('../../../src/user/user-types.js').UpdateUserProfile } UpdateUserProfile
 */

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
 * Input field for the first name
 * @type{HTMLElement | null}
 */
let firstNameInput;

/**
 * Input field for the last name
 * @type{HTMLElement | null}
 */
let lastNameInput;

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
    firstNameInput = document.getElementById('firstNameInput');
    lastNameInput = document.getElementById('lastNameInput');
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
    const firstName = firstNameInput.value;
    const lastName = lastNameInput.value;

    // Construct the update object based on the filled fields
    /** @type {UpdateUserProfile} */
    const userProfileUpdates = {};
    if (firstName) userProfileUpdates.firstname = firstName;
    if (lastName) userProfileUpdates.lastname = lastName;
    
    // Run the test with the provided values
    RunTest(userId, authToken, userProfileUpdates);

} //END RunButtonClicked Method

//#endregion

//#region PRIVATE - RUN TEST

/**
 * Runs the test, requires a userId and authentication token
 * @param {string} userId 
 * @param {string} authToken 
 * @param {UpdateUserProfile} userProfileUpdates
 */
//-----------------------------------------------------//
async function RunTest(userId, authToken, userProfileUpdates)
//-----------------------------------------------------//
{
    if (!userId) 
    {
        Log('❌ Error: User ID is required.');
        return;
    }

    Log('Initializing test...');

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
        Log(`Updating profile for user: ${userId}...`);
        
        const updatedProfile = await NestreApiManager.GetInstance().userApi.UpdateUserProfile(userId, userProfileUpdates);

        Log('✅ Test successful!');
        Log('Updated User Profile Loaded:');
        
        const profileString = JSON.stringify(updatedProfile, null, 2);
        outputDiv.innerHTML += `<pre>${profileString}</pre>`;
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
//-----------------------------------------------------//
function Log(message)
//-----------------------------------------------------//
{
    console.log(message);
    outputDiv.innerHTML += `<p>${message}</p>`;

} //END Log Method

//#endregion