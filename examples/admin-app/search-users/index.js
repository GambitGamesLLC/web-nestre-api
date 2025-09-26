/**
 * index.js
 * @file Frontend script for the admin search-users example web page.
 * @description This script demonstrates how to use the `web-nestre-api` library 
 * to search for users. 
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
 * Input field for the search string
 * @type{HTMLInputElement | null}
 */
let searchInput;

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
    searchInput = document.getElementById('searchInput');
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
async function RunButtonClicked()
//---------------------------------------------//
{
    outputDiv.innerHTML = 'Initializing test...';
    
    const searchString = searchInput.value;
    const authToken = authTokenInput.value;

    if (!authToken) {
        Log('❌ Error: Auth Token is required.');
        return;
    }
    NestreApiManager.GetInstance().SetAuthToken(authToken);
    Log('Auth token has been set.');

    try {
        Log(`Searching for users with string: "${searchString}"...`);
        const users = await NestreApiManager.GetInstance().adminAppApi.SearchUsers(searchString);
        Log('✅ Test successful! Users found:');
        outputDiv.innerHTML += `<pre>${JSON.stringify(users, null, 2)}</pre>`;
    } catch (error) {
        Log(`❌ Test failed: ${error.message}`);
        console.error(error);
    }
}

//#endregion

//#region PRIVATE - LOG

function Log(message) {
    console.log(message);
    outputDiv.innerHTML += `<p>${message}</p>`;
}

//#endregion