/**
 * index.js
 * @file Frontend script for the user-assessments example web page.
 * @description This script demonstrates how to use the `web-nestre-api` library 
 * to search for users and their assessments based on various criteria.
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

/** @type{HTMLElement | null} */
let firstnameInput;
/** @type{HTMLElement | null} */
let lastnameInput;
/** @type{HTMLElement | null} */
let emailInput;
/** @type{HTMLElement | null} */
let dobInput;
/** @type{HTMLElement | null} */
let createdFromInput;
/** @type{HTMLElement | null} */
let createdToInput;
/** @type{HTMLElement | null} */
let authTokenInput;
/** @type{HTMLElement | null} */
let runTestBtn;
/** @type{HTMLElement | null} */
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
    firstnameInput = document.getElementById('firstnameInput');
    lastnameInput = document.getElementById('lastnameInput');
    emailInput = document.getElementById('emailInput');
    dobInput = document.getElementById('dobInput');
    createdFromInput = document.getElementById('createdFromInput');
    createdToInput = document.getElementById('createdToInput');
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
    
    const searchParams = {
        firstname: firstnameInput.value,
        lastname: lastnameInput.value,
        email: emailInput.value,
        date_of_birth: dobInput.value,
        account_created_date_from: createdFromInput.value,
        account_created_date_to: createdToInput.value
    };
    const authToken = authTokenInput.value;
    
    RunTest(searchParams, authToken);
}

//#endregion

//#region PRIVATE - RUN TEST

/**
 * Runs the test, requires search parameters and an authentication token
 * @param {object} searchParams 
 * @param {string} authToken 
 */
//------------------------------------------------------------//
async function RunTest(searchParams, authToken) 
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
        Log(`Searching for users with parameters: ${JSON.stringify(searchParams)}...`);
        
        const users = await NestreApiManager.GetInstance().assessmentSearchApi.GetUsersWithTheirAssessments(
            searchParams.firstname,
            searchParams.lastname,
            searchParams.email,
            searchParams.date_of_birth,
            searchParams.account_created_date_from,
            searchParams.account_created_date_to
        );

        Log('✅ Test successful!');
        Log('Users Found:');
        
        const usersString = JSON.stringify(users, null, 2);
        outputDiv.innerHTML += `<pre>${usersString}</pre>`;
        
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