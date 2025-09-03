# web-nestre-api
JS + JSDoc library for accessing the Nestre API

This is a JavaScript library with JSDoc for accessing the Nestre API. It is used for handling connectivity and data interaction with the Nestre endpoint for use in browser and Node.js environments.

**Package Name:** web-nestre-api

**Version:** 1.0.0

**Description:** API Manager for Nestre Services

-----

**DEMO INSTRUCTIONS**

The package includes examples demonstrating how to use the Nestre API client in a browser environment.

**To run the demos:**
1. Navigate to the `examples` folder in your local copy of the repository.

2. Open any of the `index.html` files in a web browser.

3. The page will load with pre-filled test values for User ID, Email, and Auth Token from `environment-variables.js`.

4. Click the "Run Test" button to see the API call in action.

-----

**INSTALLATION INSTRUCTIONS**

**Method 1: npm (Node Package Manager)**
To use this package in your project, install it from npm:

```
npm install web-nestre-api
```

**Method 2: Manual Installation**
1. Download or clone this repository to your computer.

2. Include the `src/index.js` file in your project.

-----

**USAGE INSTRUCTIONS**

The core of this package is the `NestreApiManager` class, a singleton that centralizes all HTTP requests to the Nestre API endpoints. It handles setting the base URL, authentication tokens, and includes a generic request handler with built-in error handling.

After initialization, each API endpoint is available under a separate public object. For example, the `User` portion of the API is accessed via the `userApi` object.

▶ **Initialization & Usage**
Step 1: Get the singleton instance and configure it.

```
import { NestreApiManager } from 'web-nestre-api';

// Get the singleton instance
const nestreApiManager = NestreApiManager.GetInstance();

// Set the base URL and authentication token
nestreApiManager.SetBaseUrl('https://api.yourserver.com');
nestreApiManager.SetAuthToken('your_jwt_token');

// Now you can access the API modules
const userApi = nestreApiManager.userApi;
```

Step 2: Use an API method, for example, to get a user profile.

```
// ... after initialization
async function getUserProfile(userId) {
  try {
    const userProfile = await userApi.GetBasicUserProfile(userId);
    console.log('User Profile:', userProfile);
  } catch (error) {
    console.error('Failed to fetch user profile:', error.message);
  }
}

getUserProfile('your_user_id');
```

-----

**DEPENDENCIES**

This package relies on other open-source packages to function correctly, such as Jest for testing and MSW (Mock Service Worker) for mocking API responses during development.

-----

**SUPPORT**

Created and maintained by Gambit Games LLC.

For support or feature requests, contact: gambitgamesllc@gmail.com.