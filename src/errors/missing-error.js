/**
 * missing-error.js
 * @file Custom error class for handling API client not found errors (HTTP 404).
 * @description This class extends the standard JavaScript `Error` class 
 * and is used to encapsulate detailed
 * validation failure information returned from the API, making it easier to handle specific
 * validation messages in the application.
 */

//#region MISSING DETAIL - TYPE DEFINITION

/**
 * @typedef {Object} MissingError
 * @property {Array<string|number>} loc - The location of the missing error. This can be an array of strings (field names) or numbers (list indices).
 * @property {string} msg - The human-readable error message.
 * @property {string} type - The type of missing error.
 */

/**
 * @typedef {Object} MissingDetail
 * @property {MissingError[]} detail - An array of missing error objects.
 */

//#endregion

/**
 * 404 Response. The parameters passed into the Api were not valid
 */
export class MissingError extends Error 
{
    /**
     * The detailed messages from the API response.
     * @type {object[]}
     */
    details = [];

    /**
     * Creates a new instance of the MissingError.
     * @param {object[]} details The array of error details.
     * @param {string} message A high-level error message.
     */
    constructor(details, message) 
    {
        super(message);
        this.name = 'MissingError';
        this.details = details;
    }
}