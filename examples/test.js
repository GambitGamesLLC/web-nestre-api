// Import directly from the source file for local testing
import { NestreApiClient } from '../src/index.js';

// --- Test Configuration ---
const API_BASE_URL = 'https://appservices.dev.nestreapp.com'; // Replace production server if needed

// --- DOM Elements ---
const userIdInput = document.getElementById('userIdInput');
const authTokenInput = document.getElementById('authTokenInput');
const runTestBtn = document.getElementById('runTestBtn');
const outputDiv = document.getElementById('output');

// --- Initialize API Client ---
const apiClient = new NestreApiClient({ baseUrl: API_BASE_URL });

function log(message) {
    console.log(message);
    outputDiv.innerHTML += `<p>${message}</p>`;
}

// --- Main Test Function ---
async function runTest(userId, authToken) {
    if (!userId) {
        log('❌ Error: User ID is required.');
        return;
    }

    log('Initializing test...');

    // Set the auth token for this request
    if (authToken) {
        apiClient.setAuthToken(authToken);
        log('Auth token has been set.');
    } else {
        apiClient.clearAuthToken();
        log('No auth token provided. Making unauthenticated request.');
    }
    
    try {
        log(`Fetching profile for user: ${userId}...`);
        
        // Because of JSDoc, you get autocompletion here in VS Code!
        const profile = await apiClient.user.getBasicUserProfile(userId);

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

// --- Event Listener ---
runTestBtn.addEventListener('click', () => {
    // Clear previous results
    outputDiv.innerHTML = '';
    
    // Get current values from the input fields
    const userId = userIdInput.value;
    const authToken = authTokenInput.value;
    
    // Run the test with the provided values
    runTest(userId, authToken);
});