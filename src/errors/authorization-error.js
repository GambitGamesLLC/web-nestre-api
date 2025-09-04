/**
 * authorization-error.js
 * @file Custom error class for handling API authorization errors (HTTP 401).
 * @description This class extends the standard JavaScript `Error` class 
 * and is used to encapsulate detailed
 * authorization failure information returned from the API, making it easier to handle specific
 * authorization messages in the application.
 */

/**
 * 401 Authorization error. The auth token passed in is invalid
 */
export class AuthorizationError extends Error 
{
    /**
     * Creates a new instance of the AuthorizationError.
     * @param {string} message A high-level error message.
     */
    constructor(message) 
    {
        super(message);
        this.name = 'AuthorizationError';
    }
}