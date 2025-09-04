/**
 * validation-error.js
 * @file Custom error class for handling API validation errors (HTTP 422).
 * @description This class extends the standard JavaScript `Error` class 
 * and is used to encapsulate detailed
 * validation failure information returned from the API, making it easier to handle specific
 * validation messages in the application.
 */

/**
 * 422 Response. The parameters passed into the Api were not valid
 */
export class ValidationError extends Error 
{
    /**
     * The detailed validation messages from the API response.
     * @type {object[]}
     */
    details = [];

    /**
     * Creates a new instance of the ValidationError.
     * @param {object[]} details The array of validation error details.
     * @param {string} message A high-level error message.
     */
    constructor(details, message) 
    {
        super(message);
        this.name = 'ValidationError';
        this.details = details;
    }
}