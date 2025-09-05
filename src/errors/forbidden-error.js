/**
 * forbidden-error.js
 * @file Custom error class for handling API forbidden errors (HTTP 403).
 * @description This class extends the standard JavaScript `Error` class 
 * and is used to encapsulate detailed
 * forbidden failure information returned from the API, making it easier to handle error
 * messages in the application.
 */

/**
 * 403 Forbidden error. The user may not be able to access the Api call requested
 */
export class ForbiddenError extends Error 
{
    /**
     * The detailed messages from the API response.
     * @type {object[]}
     */
    details = [];

    /**
     * Creates a new instance of the ForbiddenError.
     * @param {object[]} details The array of error details.
     * @param {string} message A high-level error message.
     */
    constructor(details, message) 
    {
        super(message);
        this.name = 'ForbiddenError';
        this.details = details;
    }
}