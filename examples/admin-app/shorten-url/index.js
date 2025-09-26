/**
 * index.js
 * @file Frontend script for the shorten-url example web page.
 * @description This script demonstrates how to use the `web-nestre-api` library 
 * to shorten a URL via the admin endpoint. 
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
 * Input field for the URL to shorten
 * @type{HTMLInputElement | null}
 */
let urlInput;

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
    urlInput = document.getElementById('urlInput');
    authTokenInput = document.getElementById('authTokenInput');
    runTestBtn = document.getElementById('runTestBtn');
    outputDiv = document.getElementById('output');

} //END AttachDomReferences Method

//#endregion

//#region PRIVATE - ADD EVENT LISTENERS TO DOM OBJECTS

/**
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
    outputDiv.innerHTML = 'Initializing test...';
    
    // Get current values from the input fields
    const urlToShorten = urlInput.value;
    const authToken = authTokenInput.value;

    if (!urlToShorten) {
        outputDiv.innerHTML = '❌ Error: URL to shorten is required.';
        return;
    }

    NestreApiManager.GetInstance().SetAuthToken(authToken);
    
    try {
        const shortenedUrl = await NestreApiManager.GetInstance().adminAppApi.ShortenUrl(urlToShorten);
        outputDiv.innerHTML = `✅ Test successful!<br>Shortened URL: ${shortenedUrl}`;
    } catch (error) {
        outputDiv.innerHTML = `❌ Test failed: ${error.message} : ${error.details || ''}`;
        console.error(error);
    }
} //END RunButtonClicked Method

//#endregion