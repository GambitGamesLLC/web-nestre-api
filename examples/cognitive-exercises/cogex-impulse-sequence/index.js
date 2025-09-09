/**
 * index.js
 * @file Frontend script for the cogex-impulse-sequence example web page.
 * @description This script demonstrates how to use the `web-nestre-api` library 
 * to fetch an Impulse sequence. 
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
let authTokenInput;

/** @type{HTMLInputElement | null} */
let levelInput;

/** @type{HTMLInputElement | null} */
let roundNumberInput;

/** @type{HTMLSelectElement | null} */
let versionInput;

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
    authTokenInput = document.getElementById('authTokenInput');
    levelInput = document.getElementById('levelInput');
    roundNumberInput = document.getElementById('roundNumberInput');
    versionInput = document.getElementById('versionInput');
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
    const authToken = authTokenInput.value;
    const level = parseInt(levelInput.value, 10);
    const roundNumber = parseInt(roundNumberInput.value, 10);
    const version = versionInput.value;
    
    RunTest(userId, authToken, level, roundNumber, version);
}

//#endregion

//#region PRIVATE - RUN TEST

async function RunTest(userId, authToken, level, roundNumber, version) {
    if (!userId) {
        Log('❌ Error: User ID is required.');
        return;
    }
    if (isNaN(level) || level <= 0) {
        Log('❌ Error: Level must be a positive number.');
        return;
    }
    if (isNaN(roundNumber) || roundNumber < 1 || roundNumber > 5) {
        Log('❌ Error: Round Number must be between 1 and 5.');
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
        Log(`Fetching Impulse sequence for user: ${userId}, level: ${level}, round: ${roundNumber}, version: ${version}...`);
        
        const impulseSequence = await NestreApiManager.GetInstance().cognitiveExercisesApi.GetImpulseSequence(userId, level, roundNumber, version);

        Log('✅ Test successful!');
        Log('Impulse Sequence Loaded:');
        
        const resultString = JSON.stringify(impulseSequence, null, 2);
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