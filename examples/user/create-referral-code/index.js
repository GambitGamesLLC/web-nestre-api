/**
 * index.js
 * @file Frontend script for the create-referral-code example web page.
 * @description This script demonstrates how to use the `web-nestre-api` library 
 * to create a new referral code for a user.
 * @requires {NestreApiManager} from '../../../src/index.js'
 * @requires {API_BASE_URL, API_VERSION} from '../../environment-variables.js'
 * @requires {CreateReferralCode} from '../../../src/user/user-types.js'
 */

//#region IMPORTS

import { NestreApiManager } from '../../../src/index.js';
import { API_BASE_URL, API_VERSION } from '../../environment-variables.js';

/**
 * @typedef {import('../../../src/user/user-types.js').CreateReferralCode } CreateReferralCode
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
 * Input field for the referral code
 * @type{HTMLElement | null}
 */
let codeInput;

/**
 * Input field for the 'is_active' flag
 * @type{HTMLElement | null}
 */
let isActiveInput;

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
    codeInput = document.getElementById('codeId');
    isActiveInput = document.getElementById('isActiveId');
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
 * Creates the Nestre API client, preparring it for use
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
    const code = codeInput.value;
    const isActive = isActiveInput.value.toLowerCase() === 'true';

    /** @type {CreateReferralCode} */
    const referralCodeData = {
        code: code,
        is_active: isActive
    };
    
    RunTest(userId, authToken, referralCodeData);
}

//#endregion

//#region PRIVATE - RUN TEST

/**
 * Runs the test, requires a userId and authentication token
 * @param {string} userId 
 * @param {string} authToken 
 * @param {CreateReferralCode} referralCodeData
 */
//-----------------------------------------------------//
async function RunTest(userId, authToken, referralCodeData)
//-----------------------------------------------------//
{
    if (!userId) 
    {
        Log('❌ Error: User ID is required.');
        return;
    }
    if (!authToken)
    {
        Log('❌ Error: Auth Token is required.');
        return;
    }

    Log('Initializing test...');
    NestreApiManager.GetInstance().SetAuthToken(authToken);
    Log('Auth token has been set.');

    try 
    {
        Log(`Creating referral code for user: ${userId}...`);
        
        const confirmationMessage = await NestreApiManager.GetInstance().userApi.CreateReferralCode(userId, referralCodeData);

        Log('✅ Test successful!');
        Log('Create Referral Code Confirmation Message:');
        
        const confirmationString = JSON.stringify(confirmationMessage, null, 2);
        outputDiv.innerHTML += `<pre>${confirmationString}</pre>`;
    } 
    catch (error) 
    {
        Log(`❌ Test failed: ${error.message}`);
        console.error(error);
    }
}

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
}

//#endregion