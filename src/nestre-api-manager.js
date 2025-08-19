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
export class NestreApiManager 
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
  
//#endregion

//#region PUBLIC - VARIABLES

  /** 
   * Reference to the UserAPI object
   * @type {UserApi} 
   * */
  userAPI;

//#endregion

//#region PUBLIC - CONSTRUCTOR

/**
 * Creates the Api classes used to access the various parts of the Nestre Api
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

//#region PUBLIC - INITIALIZE

/**
 * Initializes the NestreApiManager singleton, preparing it for use
 * @param {NestreApiManagerConfig} config A configuration object used to setup the NestreApiManager
 */
//------------------------------------------------//
Initialize( config )
//------------------------------------------------//
{
    //Validation Check
    if( config.baseUrl === undefined || config.baseUrl === null || config.baseUrl === '' )
    {
      throw new Error('nestre-api-manager.js Initialize() Configuration error: `config.baseUrl` is a required property.');
    }

    this._baseUrl = config.baseUrl;

    this.userAPI = new UserApi(this);

} //END Initialize Method

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

//#endregion