/**
 * @typedef {import('./utility-types.js').Url } Url
 * @typedef {import('./utility-types.js').ErrorLog } ErrorLog
 * @typedef {import('./utility-types.js').ErrorLoggedSuccessMessage } ErrorLoggedSuccessMessage
*/
/**
 * Handles API Requests that access the 'utility' portion of the API
 */
export class UtilityApi {
    /**
      * Create a shortened URL using the Blink URL shortening service.
      *
      * @param {Url} url
      * @returns {Promise<Url>}
      */
    CreateShortenedUrl(url: Url): Promise<Url>;
    /**
      * Determine if a given timestamp occurs after the Nestre dawn cutoff time for the current day.
      *
      * @param {Date} date
      * @returns {Promise<boolean>}
      */
    IsAfterNestreDawn(date: Date): Promise<boolean>;
    /**
      * Record client-side errors for monitoring and debugging purposes. Logs are sent to CloudWatch with user context.
      *
      * @param {ErrorLog} errorLog
      * @returns {Promise<ErrorLoggedSuccessMessage>}
      */
    LogClientError(errorLog: ErrorLog): Promise<ErrorLoggedSuccessMessage>;
    /**
      * Simple ping endpoint to verify service availability.
      *
      * @returns {Promise<string>} A simple text response indicating the service is running.
      */
    Ping(): Promise<string>;
}
export type Url = import("./utility-types.js").Url;
export type ErrorLog = import("./utility-types.js").ErrorLog;
export type ErrorLoggedSuccessMessage = import("./utility-types.js").ErrorLoggedSuccessMessage;
