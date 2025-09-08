/**
 * index.js
 * @file Frontend script for the cogex-catchme-sequence example web page.
 * @description This script demonstrates how to use the `web-nestre-api` library 
 * to fetch a CatchMe sequence. 
 * It handles DOM interactions, sets the authentication token, 
 * and displays the API response on the page.
 * @requires {NestreApiManager} from '../../../src/index.js'
 * @requires {API_BASE_URL} from '../../environment-variables.js'
 */

//#region IMPORTS

// Import directly from the source file for local testing
import { NestreApiManager } from '../../../src/index.js';
import { API_BASE_URL, API_VERSION } from '../../environment-variables.js';

//#endregion

//#region PRIVATE - VARIABLES - DOM ELEMENTS

/** @type{HTMLInputElement | null} */
let userIdInput;

/** @type{HTMLInputElement | null} */
let levelInput;

/** @type{HTMLSelectElement | null} */
let versionInput;

/** @type{HTMLInputElement | null} */
let criteriaInput;

/** @type{HTMLSelectElement | null} */
let criteriaTypeInput;

/** @type{HTMLInputElement | null} */
let authTokenInput;

/** @type{HTMLElement | null} */
let runTestBtn;

/** @type{HTMLElement | null} */
let outputDiv;

//#endregion

//#region PRIVATE - LIFECYCLE - ADD EVENT LISTENER - DOM CONTENT LOADED

document.addEventListener('DOMContentLoaded', () => {
    AttachDomReferences();
    AddEventListeners();
    CreateNestreApi();
});

//#endregion

//#region PRIVATE - GET DOM REFERENCES

function AttachDomReferences() {
    userIdInput = document.getElementById('userIdInput');
    levelInput = document.getElementById('levelInput');
    versionInput = document.getElementById('versionInput');
    criteriaInput = document.getElementById('criteriaInput');
    criteriaTypeInput = document.getElementById('criteriaTypeInput');
    authTokenInput = document.getElementById('authTokenInput');
    runTestBtn = document.getElementById('runTestBtn');
    outputDiv = document.getElementById('output');
}

//#endregion

//#region PRIVATE - ADD EVENT LISTENERS TO DOM OBJECTS

function AddEventListeners() {
    runTestBtn.addEventListener('click', RunButtonClicked);
}

//#endregion

//#region PRIVATE - CREATE NESTRE API CLIENT

function CreateNestreApi() {
    let nestreApiManager = NestreApiManager.GetInstance();
    nestreApiManager.SetBaseUrl(API_BASE_URL);
    nestreApiManager.SetApiVersion(API_VERSION);
}

//#endregion

//#region PRIVATE - RUN BUTTON CLICKED

function RunButtonClicked() {
    outputDiv.innerHTML = '';
    
    const userId = userIdInput.value;
    const level = parseInt(levelInput.value, 10);
    const version = versionInput.value;
    const criteria = criteriaInput.value;
    const criteriaType = criteriaTypeInput.value;
    const authToken = authTokenInput.value;
    
    RunTest(userId, level, version, criteria, criteriaType, authToken);
}

//#endregion

//#region PRIVATE - RUN TEST

async function RunTest(userId, level, version, criteria, criteriaType, authToken) {
    if (!userId) {
        Log('❌ Error: User ID is required.');
        return;
    }
    if (isNaN(level) || level <= 0) {
        Log('❌ Error: Level must be a positive number.');
        return;
    }
    if (!version) {
        Log('❌ Error: Version is required.');
        return;
    }
    if (!criteria) {
        Log('❌ Error: Criteria is required.');
        return;
    }
    if (!criteriaType) {
        Log('❌ Error: Criteria Type is required.');
        return;
    }

    Log('Initializing test...');

    if (authToken) {
        NestreApiManager.GetInstance().SetAuthToken(authToken);
        Log('Auth token has been set.');
    } else {
        NestreApiManager.GetInstance().ClearAuthToken();
        Log('No auth token provided. Making unauthenticated request.');
    }
    
    try {
        Log(`Fetching CatchMe sequence for user: ${userId} at level: ${level} with version: ${version}, criteria: ${criteria}, and criteriaType: ${criteriaType}...`);
        
        const catchMeSequence = await NestreApiManager.GetInstance().cognitiveExercisesApi.GetCatchMeSequence(userId, level, version, criteria, criteriaType);

        Log('✅ Test successful!');
        Log('CatchMe Sequence Loaded:');
        
        const resultString = JSON.stringify(catchMeSequence, null, 2);
        outputDiv.innerHTML += `<pre>${resultString}</pre>`;
        
    } catch (error) {
        Log(`❌ Test failed: ${error.message} : ${error.details}`);
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