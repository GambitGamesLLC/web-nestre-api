/**
 * unavailable-error.js
 * @file Custom error class for handling API unavailable errors (HTTP 400).
 * @description This class extends the standard JavaScript `Error` class 
 * and is used to encapsulate detailed
 * unavailable failure information returned from the API, making it easier to handle specific
 * unavailable messages in the application.
 */

/**
 * 400 Unavailable error. The requested data may not exist or is currently unavailable
 */
export class UnavailableError extends Error 
{
    /**
     * Creates a new instance of the UnavailableError.
     * @param {string} message A high-level error message.
     */
    constructor(message) 
    {
        super(message);
        this.name = 'UnavailableError';
    }
}