/**
 * validation-error.js
 * @file Custom error class for handling API validation errors (HTTP 422).
 * @description This class extends the standard JavaScript `Error` class
 * and is used to encapsulate detailed
 * validation failure information returned from the API, making it easier to handle specific
 * validation messages in the application.
 */
/**
 * @typedef {Object} ValidationError
 * @property {Array<string|number>} loc - The location of the validation error. This can be an array of strings (field names) or numbers (list indices).
 * @property {string} msg - The human-readable error message.
 * @property {string} type - The type of validation error.
 */
/**
 * @typedef {Object} ValidationDetail
 * @property {ValidationError[]} detail - An array of validation error objects.
 */
/**
 * 422 Response. The parameters passed into the Api were not valid
 */
export class ValidationError extends Error {
    /**
     * Creates a new instance of the ValidationError.
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
export type ValidationDetail = {
    /**
     * - An array of validation error objects.
     */
    detail: ValidationError[];
};
