# web-nestre-api
JS + JSDoc library for accessing the Nestre API

This is a JavaScript library with JSDoc for accessing the Nestre API. It is used for handling connectivity and data interaction with the Nestre endpoint for use in browser and Node.js environments.

**Package Name:** web-nestre-api

**Version:** 1.0.0

**Description:** API Manager for Nestre Services

-----

**DEMO REQUIRMENTS**

To open the demo and have it run as expected, you'll need to configure a local test server within Visual Studio Code and set it to open with the appropriate root path and port.

1. Follow this [guide](https://docs.google.com/document/d/1Yyo79u7AxequUlDg8S5QQgZv2bfs97_ulJ-lelYwQi0/edit?tab=t.0) to install and configure the `Live Server` extension in VS Code.

You will also need to retrieve an authorization token from the development server and replace the authorization key in `environment-variables.js`.

2. In the [How To Authorize](https://docs.google.com/document/d/1Yyo79u7AxequUlDg8S5QQgZv2bfs97_ulJ-lelYwQi0/edit?tab=t.0) section of the RestfulApi Guide. Use the default username and password provided in the guide to authorize within the Nestre Development Server OpenApi. This will return an authorization token that you'll need to copy+paste into `environment-variables.js`.

3. Open `environment-variables.js` in VS Code and replace the `AUTH_TOKEN` variable with your new token.

The authorization token lasts for ~24 hours before it needs to be replaced.

4. Open the project in Visual Studio Code, and in the terminal, run the `npm install` command

-----

**DEMO INSTRUCTIONS**

The package includes examples demonstrating how to use the Nestre API client in a browser environment.

**To run the demos:**
1. Click on the `Go Live` button in your `Live Server` Visual Studio Code Extension

2. Navigate to the `examples` folder in your local copy of the repository.

3. Open any of the `index.html` files within on of the subdirectories, such as `examples/user/basic-profile/index.html`.

3. The page will load with pre-filled test values as necessary, such as `User ID`, `Email`, and `Auth Token` from `environment-variables.js`.

4. Click the "Run Test" button to see the API call in action.

-----

## **INSTALLATION INSTRUCTIONS**

**Method 1: npm (Node Package Manager)**
To use this package in your project, install it via npm from this github repository:

```
npm install https://github.com/GambitGamesLLC/web-nestre-api.git
```

**Method 2: Manual Installation**
1. Download or clone this repository to your computer.

2. Include the `src/index.js` file in your project.

-----

## **BUILD STEPS**

This is a pure Vanilla JS+JSDoc library, there's no build step. 🍦

Just import this package and use it.

-----

## **UNIT TESTING INSTRUCTIONS**

Run the following command in Visual Studio Code

```
npm test
```

This will run the included unit tests using `jest` and `msw`, and also generate a coverage guide and place it in the `./coverage/` folder at the root of the project.

-----

## **USAGE INSTRUCTIONS**

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

## **DEVELOPER DEPENDENCIES**

These dependencies are used during development and testing, but are not included as part of the library when you import it.

  * **Mock Service Worker (msw)** [[Git Repo]](https://github.com/mswjs/msw)  
    Used to replace the standard `service worker`, so we can unit test our functions without actually calling the backend Api. Referred to as `msw` throughout this library and documentation.

  * **whatwg-fetch** [[Git Repo]](https://github.com/JakeChampion/fetch)
    Used to polyfil the `fetch` web Api. When we run unit tests, `msw` is expecting a pure node environment, but we are running our tests as a web environment, meaning we need to fulfill some expectations of `msw` so it will work properly.

  * **jest** [[Primary Website]](https://jestjs.io/)
    Test runner, used instead of the built in Node test runner as it supports running the browser environment instead of the Node environment.

  * **jest-environment-jsdom** [[Git Repo]](https://github.com/jsdom/jsdom)
    Used by Jest to run in the browser environment instead of the Node environment.

-----

## **DEPENDENCIES**

These dependencies are included as part of the library when you import it. They are seperated into the `vendor` folder.

  * **joi** [[Git Repo]](https://github.com/hapijs/joi)
  Used to validate JSON schema to make sure it has the right contents and shape.

-----

**SUPPORT**

Created and maintained by Gambit Games LLC.

For support or feature requests, contact: gambitgamesllc@gmail.com.