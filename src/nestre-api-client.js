import { UserApiService } from './services/user.api.service.js';

// VS Code and other editors will automatically pick up the types from this import.
/** @typedef {import('./types.js').NestreApiClientConfig} NestreApiClientConfig */

export class NestreApiClient {
  /**
   * @private
   * @type {string}
   */
  _baseUrl;

  /**
   * @private
   * @type {string | null}
   */
  _authToken = null;
  
  /** @type {UserApiService} */
  user;

  /**
   * @param {NestreApiClientConfig} config
   */
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this.user = new UserApiService(this._request.bind(this));
  }

  /**
   * Sets the JWT token for subsequent API calls.
   * @param {string} token - The authentication token.
   */
  setAuthToken(token) {
    this._authToken = token;
  }
  
  /** Clears the authentication token. */
  clearAuthToken() {
    this._authToken = null;
  }

  /**
   * A private, generic request handler.
   * @private
   * @template T
   * @param {string} method - The HTTP method (GET, POST, etc.).
   * @param {string} endpoint - The API endpoint path.
   * @param {object} [body] - The request body for POST/PATCH requests.
   * @returns {Promise<T>}
   */
  async _request(method, endpoint, body) {
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

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(`API Error: ${response.status} - ${errorData.message || 'Unknown error'}`);
    }

    if (response.status === 204 || response.headers.get('content-length') === '0') {
      return null;
    }

    return response.json();
  }
}