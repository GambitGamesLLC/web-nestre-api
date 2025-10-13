/**
 * general-error.js
 * @file Custom error class for handling API general errors (HTTP 400).
 * @description This class extends the standard JavaScript `Error` class
 * and is used to encapsulate detailed
 * general failure information returned from the API, making it easier to handle error
 * messages in the application.
 */
/**
 * 400 General error. The requested data may not exist, is unavailable, or may already exist
 */
export class GeneralError extends Error {
    /**
     * Creates a new instance of the GeneralError.
     * @param {object[]} details The array of error details.
     * @param {string} message A high-level error message.
     */
    constructor(details: object[], message: string);
    /**
     * The detailed messages from the API response.
     * @type {object[]}
     */
    details: object[];
}
