// Import directly from the source file for local testing
import { NestreApiClient } from '../src/index.js';

// --- Test Configuration ---
const API_BASE_URL = 'https://api.nestre.com'; // Replace with a mock or dev server if needed
const TEST_USER_ID = 'some-user-id-for-testing'; 

// --- DOM Element ---
const outputDiv = document.getElementById('output');

function log(message) {
    console.log(message);
    outputDiv.innerHTML += `<p>${message}</p>`;
}

// --- Main Test Function ---
async function runTest() {
    log('Initializing API client...');
    const apiClient = new NestreApiClient({ baseUrl: API_BASE_URL });
    
    // You would set this after a mock login
    // apiClient.setAuthToken('YOUR_TEST_TOKEN');

    try {
        log(`Fetching profile for user: ${TEST_USER_ID}...`);
        
        // Because of JSDoc, you get autocompletion here in VS Code!
        const profile = await apiClient.user.getUserProfile(TEST_USER_ID);

        log('✅ Test successful!');
        log('User Profile Loaded:');
        
        // Display result in a readable format
        const profileString = JSON.stringify(profile, null, 2);
        outputDiv.innerHTML += `<pre>${profileString}</pre>`;
        
    } catch (error) {
        log(`❌ Test failed: ${error.message}`);
        console.error(error);
    }
}

// --- Run the test ---
runTest();