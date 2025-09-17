/**
 * index.js
 * @file Frontend script for the create-personalized-frame example web page.
 * @description This script demonstrates how to use the `web-nestre-api` library 
 * to create a personalized frame-it image.
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
let userIdInput;

/** @type{HTMLElement | null} */
let authTokenInput;

/** @type{HTMLElement | null} */
let phrasesInput;

/** @type{HTMLElement | null} */
let runTestBtn;

/** @type{HTMLElement | null} */
let outputDiv;

/** @type{HTMLImageElement | null} */
let frameImage;

//#endregion

//#region PRIVATE - LIFECYCLE - ADD EVENT LISTENER - DOM CONTENT LOADED

document.addEventListener('DOMContentLoaded', () => {
    AttachDomReferences();
    AddEventListeners();
    CreateNestreApi();
});

//#endregion

//#region PRIVATE - ATTACH DOM REFERENCES

function AttachDomReferences() {
    userIdInput = document.getElementById('userIdInput');
    authTokenInput = document.getElementById('authTokenInput');
    phrasesInput = document.getElementById('phrasesInput');
    runTestBtn = document.getElementById('runTestBtn');
    outputDiv = document.getElementById('output');
    frameImage = document.getElementById('frameImage');
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
    frameImage.style.display = 'none';
    frameImage.src = '';
    
    const userId = userIdInput.value;
    const authToken = authTokenInput.value;
    const phrasesText = phrasesInput.value;
    
    RunTest(userId, authToken, phrasesText);
}

//#endregion

//#region PRIVATE - RUN TEST

async function RunTest(userId, authToken, phrasesText) {
    if (!userId) {
        Log('❌ Error: User ID is required.');
        return;
    }

    if (!authToken) {
        Log('❌ Error: Auth Token is required.');
        return;
    }

    if (!phrasesText) {
        Log('❌ Error: Frame It Phrases data is required.');
        return;
    }

    let phrasesObject;
    try {
        phrasesObject = JSON.parse(phrasesText);
    } catch (e) {
        Log(`❌ Error: Invalid JSON in Frame It Phrases data. ${e.message}`);
        return;
    }

    Log('Initializing test...');

    NestreApiManager.GetInstance().SetAuthToken(authToken);
    Log('Auth token has been set.');
    
    try {
        Log(`Creating personalized frame for user: ${userId}...`);
        
        const personalizedFrame = await NestreApiManager.GetInstance().frameItApi.CreatePersonalizedFrame(userId, phrasesObject);

        Log('✅ Test successful!');
        Log('Personalized Frame Created:');
        
        const resultString = JSON.stringify(personalizedFrame, null, 2);
        outputDiv.innerHTML += `<pre>${resultString}</pre>`;

        if (personalizedFrame.image_url) {
            Log('Displaying frame image...');
            frameImage.src = personalizedFrame.image_url;
            frameImage.style.display = 'block';
        }
        
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