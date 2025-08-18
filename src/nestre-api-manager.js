//#region IMPORTS

import { UserApi } from './user/user-api.js';

// VS Code and other editors will automatically pick up the types from this import.
/** 
 * @typedef {import('./types.js').NestreApiManagerConfig} NestreApiManagerConfig 
 **/

//#endregion

/**
 * Singleton class for interacting with the Nestre API
 * @class
 */
class NestreApiManager 
{

//#region PRIVATE - VARIABLES

  /**
   * The first section of the server url, before the version number
   * @private
   * @type {string}
   */
  _baseUrl;

  /**
   * The authentication token
   * @private
   * @type {string | null}
   */
  _authToken = null;
  
  /** 
   * Reference to the UserAPI object
   * @type {UserApi} 
   * */
  userAPI;

//#endregion

//#region PUBLIC - INITIALIZE

/**
 * Initializes the NestreApiManager Singleton
 * @param {NestreApiManagerConfig} config A configuration object used to setup the NestreApiManager
 */
//------------------------------------------------//
constructor(config) 
//------------------------------------------------//
{
    // Singleton check
    if (NestreApiManager._instance) {
        // This check is a safeguard, but shouldn't be hit with the singleton module pattern.
        throw new Error("nestre-api-manager.js constructor() Singleton classes can't be instantiated more than once.");
    }
    // Sets the singleton reference so we know we've already called the constructor, preventing duplicates
    NestreApiManager._instance = this;

    //Validation Check
    if( config.baseUrl === undefined || config.baseUrl === null || config.baseUrl === '' )
    {
      throw new Error('nestre-api-manager.js constructor() Configuration error: `config.baseUrl` is a required property.');
    }

    this._baseUrl = config.baseUrl;

    this.userAPI = new UserApi(this);

} //END constructor Method


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
   * @private
   * @template T
   * @param {string} method - The HTTP method (GET, POST, etc.).
   * @param {string} endpoint - The API endpoint path.
   * @param {object} [body] - The request body for POST/PATCH requests.
   * @returns {Promise<T>}
   */
  //----------------------------------------------------------------------------//
  async Request(method, endpoint, body) 
  //----------------------------------------------------------------------------//
  {
    const url = `${this._baseUrl}${endpoint}`;
    const headers = { 'Content-Type': 'application/json' };

    if (this._authToken) {
      headers['Authorization'] = `Bearer ${this._authToken}`;
    }

    const config = { method, headers };

    if (body) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(url, config);

    if (!response.ok) 
    {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(`API Error: ${response.status} - ${errorData.message || 'Unknown error'}`);
    }

    if (response.status === 204 || response.headers.get('content-length') === '0') 
    {
      return null;
    }

    return response.json();

  } //END Request Method

//#endregion

} //END NestreAPIManager

//#region EXPORT SINGLETON INSTANCE

// ----------------------------------------------------------------- //
// EXPORT INITIALIZER AND GETTER FUNCTIONS FOR THE SINGLETON
// ----------------------------------------------------------------- //

/** Holds the single instance.
 * @type {NestreApiManager | null} 
 */
let instance = null;

/**
 * Initializes the NestreApiManager singleton.
 * Must be called once at application startup.
 * @param {NestreApiManagerConfig} config 
 */
//-----------------------------------------------------------------------//
export function InitializeNestreApiManager(config) 
//-----------------------------------------------------------------------//
{
  if (instance) 
  {
    console.warn('web-nestre-api package : nestre-api-manager.js InitializeNestreApiManager() Warning: NestreApiManager has already been initialized.');
    return;
  }

  // Create the one and only instance by calling the new constructor
  instance = new NestreApiManager(config);
  
  // Freeze it to prevent modification
  //Object.freeze(instance);

} //END Initialize Method

/**
 * Gets the configured instance of the NestreApiManager.
 * @returns {NestreApiManager}
 */
//-------------------------------------------------------------------------//
export function GetNestreApiManager() 
//-------------------------------------------------------------------------//
{
  if(!instance) 
  {
    throw new Error('web-nestre-api package : nestre-api-manager.js GetNestreApiManager() Error: NestreApiManager has not been initialized. Call Initialize() first.');
  }

  return instance;

} //END GetNestreApiManager Method

//#endregion