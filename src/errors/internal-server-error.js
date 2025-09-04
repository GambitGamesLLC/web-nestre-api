/**
 * internal-server-error.js
 * @file Custom error class for handling internal server errors (HTTP 500).
 * @description This class extends the standard JavaScript `Error` class 
 * and is used to encapsulate detailed
 * failure information returned from the API, making it easier to handle specific
 * messages in the application.
 */

/**
 * 500 Internal server error.
 */
export class InternalServerError extends Error 
{
    /**
     * The detailed messages from the API response.
     * @type {object[]}
     */
    details = [];

    /**
     * Creates a new instance of the InternalServerError.
     * @param {object[]} details The array of error details.
     * @param {string} message A high-level error message.
     */
    constructor(details, message) 
    {
        super(message);
        this.name = 'InternalServerError';
        this.details = details;
    }
}