/**
 * nestre-api-manager.js
 * @file Singleton class for interacting with the Nestre API.
 * @description This file exports the NestreApiManager singleton, 
 * which centralizes all HTTP requests to the Nestre endpoint. 
 * It handles setting the base URL, authentication tokens, 
 * and includes a generic request handler with built-in error handling.
 * 
 * After construction, each of the Nestre Api endpoints is available under a seperate public object
 * For Example, the `User` portion of the Nestre Api is accessed via the `userApi` object
 * @exports {NestreApiManager}
 * @exports {HttpMethod}
 */

//#region IMPORTS

import { UserApi } from './user/user-api.js';

//Custom error class returned by our Request() when we have a 422 status code in our server Api response
import { ValidationError } from './validation-error.js';

//#endregion

//#region PUBLIC - HTTP METHOD VALUE

/**
 * The specific string values for our HTTP methods.
 * By defining this type, we get strict type-checking instead of just accepting any string.
 * @typedef {'GET' | 'POST' | 'PATCH' | 'DELETE'} HttpMethodValue
 */

/**
 * An enum representing the supported HTTP request methods.
 * @readonly
 * @enum {HttpMethodValue}
 */
export const HttpMethod = Object.freeze({
  /** Represents an HTTP GET request. */
  GET: 'GET',

  /** Represents an HTTP POST request, typically for creating a new resource. */
  POST: 'POST',

  /** Represents an HTTP PATCH request, for partial updates. */
  PATCH: 'PATCH',

  /** Represents an HTTP DELETE request. */
  DELETE: 'DELETE',
});

//#endregion

/**
 * Singleton class for interacting with the Nestre API
 * @class
 */
export class NestreApiManager 
{

//#region PRIVATE - VARIABLES

  /**
   * The first section of the server url, before the version number
   * @private
   * @type {string | null}
   */
  _baseUrl = null;

  /**
   * The authentication token
   * @private
   * @type {string | null}
   */
  _authToken = null;
  
//#endregion

//#region PUBLIC - VARIABLES

  /** 
   * Reference to the UserAPI object
   * @type {UserApi} 
   * */
  userApi = null;

//#endregion

//#region PUBLIC - CONSTRUCTOR

/**
 * Initializes the NestreApiManager singleton, preparing it for use
 */
//------------------------------------------------//
constructor() 
//------------------------------------------------//
{
    // Singleton check
    if (NestreApiManager.instance) 
    {
        return NestreApiManager.instance;
    }

    // Sets the singleton reference so we know we've already called the constructor, preventing duplicates
    NestreApiManager.instance = this;

    //We only need to generate our helper classes once
    if( this.userApi === null )
    {
      this.userApi = new UserApi(this);
    }

} //END constructor Method

//#endregion

//#region PUBLIC - GET INSTANCE

/**
 * Get the single instance of the NestreApiManager
 * @returns {NestreApiManager} The NestreApiManager instance
 */
// ----------------------------------------------------------------- //
static GetInstance() 
// ----------------------------------------------------------------- //
{
  if( !NestreApiManager.instance )
  {
    NestreApiManager.instance = new NestreApiManager();
  }

  return NestreApiManager.instance;

} //END GetInstance Method

//#endregion

//#region PUBLIC - SET BASE URL

/**
 * Sets the baseUrl for the HTTP Requests
 * @param {string} baseUrl The first section of the url used to make HTTP Requests to our endpoint
 */
//------------------------------------------------//
SetBaseUrl( baseUrl )
//------------------------------------------------//
{
    //Validation Check
    if( baseUrl === undefined || baseUrl === null || baseUrl === '' )
    {
      throw new Error('web-nestre-api : nestre-api-manager.js SetBaseUrl() Configuration error: `baseUrl` is a required property.');
    }

    this._baseUrl = baseUrl;

} //END SetBaseUrl Method

//#endregion

//#region PUBLIC - SET AUTH TOKEN

  /**
   * Sets the JWT token for subsequent API calls.
   * @param {string} token - The authentication token.
   */
  //------------------------------------------------//
  SetAuthToken(token) 
  //------------------------------------------------//
  {
    if( token == null || token == undefined || token == '')
    {
      throw new Error( "web-nestre-api : nestre-api-manager.js SetAuthToken() passed in token is invalid" );
    }

    this._authToken = token;

  } //END SetAuthToken

//#endregion
  
//#region PUBLIC - CLEAR AUTH TOKEN

  /** 
   * Clears the authentication token. 
   */
  //------------------------------------------------//
  ClearAuthToken() 
  //------------------------------------------------//
  {
    this._authToken = null;
  
  } //END ClearAuthToken

//#endregion

//#region PRIVATE - REQUEST

  /**
   * A private, generic request handler. 
   * Used by our api classes to make HTTP requests to our endpoint
   * @private
   * @template T
   * @param {HttpMethodValue} httpMethodValue - The HTTP method to use (GET, POST, PATCH, DELETE).
   * @param {string} endpoint - The API endpoint path.
   * @param {object} [body] - The request body for POST/PATCH requests.
   * @returns {Promise<T>}
   */
  //----------------------------------------------------------------------------//
  async Request(httpMethodValue, endpoint, body) 
  //----------------------------------------------------------------------------//
  {
    if( NestreApiManager.instance === null || NestreApiManager.instance === undefined )
    {
      throw new Error( "web-nestre-api : nestre-api-manager.js Error: NestreApiManager.instance is null or undefined" );
    }

    if( this._baseUrl === null || this._baseUrl === undefined || this._baseUrl === '' )
    {
      throw new Error( 'web-nestre-api : nestre-api-manager.js Error: this._baseUrl is null, undefined, or an empty string');
    }

    if( this._authToken === null || this._authToken === undefined || this._authToken === '')
    {
      throw new Error( "web-nestre-api : nestre-api-manager.js Error: this._authToken is null, undefined, or an empty string");
    }

    if( httpMethodValue === null || httpMethodValue === undefined || httpMethodValue === '' )
    {
      throw new Error( "web-nestre-api : nestre-api-manager.js Error: httpMethodValue is null, undefined, or an empty string");
    }

    if( httpMethodValue !== HttpMethod.GET && httpMethodValue !== HttpMethod.POST && httpMethodValue !== HttpMethod.PATCH && httpMethodValue !== HttpMethod.DELETE )
    {
      throw new Error( "web-nestre-api : nestre-api-manager.js Error: httpMethodValue is not a valid HttpMethodValue");
    }

    if( endpoint === null || endpoint === undefined || endpoint === '' )
    {
      throw new Error( "web-nestre-api : nestre-api-manager.js Error: endpoint is null, undefined, or an empty string");
    }

    //Combine our baseUrl and the endpoint to form the full url
    const url = `${this._baseUrl}${endpoint}`;

    //Our response content-type will always be a JSON object
    const headers = { 'Content-Type': 'application/json' };

    //If we have an auth token, add it to our headers
    if (this._authToken) 
    {
      headers['Authorization'] = `Bearer ${this._authToken}`;
    }

    /**
     * The configuration options for our API request.
     * @type{RequestInit}
     */
    const requestInit = { method: httpMethodValue, headers };

    //If our Api request has a body, add it to our RequestInit to pass into our 'fetch' promise
    if( body ) 
    {
      requestInit.body = JSON.stringify(body);
    }

    //Make the API request, 
    //wait to continue until the promise returns with a response
    const response = await fetch(url, requestInit);

    //Check for all other errors
    if (!response.ok) 
    {
        let errorData = {};
        try {
            errorData = await response.json();
            
            // Handle specific 422 validation errors if it's a JSON response.
            if (response.status === 422) {
                throw new ValidationError(errorData.detail, 'web-nestre-api : nestre-api-manager.js API Validation Failed Error (422):');
            }
        } catch (e) {
            // If response is not JSON, use the status text.
            errorData.message = response.statusText;
        }

        // Handle all other errors.
        throw new Error(`web-nestre-api : nestre-api-manager.js API Error: ${response.status} - ${errorData.message || 'Unknown error'}`);
    }

    //If we recieved a 204 or no code at all, 
    // then we have no JSON response 
    // but the message was recieved by the backend
    if (response.status === 204 || response.headers.get('content-length') === '0') 
    {
      return null;
    }

    //In all other success conditions, 
    //we'll recieve a JSON object back
    return response.json();

  } //END Request Method

//#endregion

} //END NestreAPIManager

//#endregion