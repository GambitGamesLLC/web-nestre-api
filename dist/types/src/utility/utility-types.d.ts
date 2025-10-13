/**
 * Request body for CreateShortenedUrl() in the utility-api
 */
export type Url = string;
export type LogLevel = "TRACE" | "DEBUG" | "INFO" | "WARN" | "ERROR" | "FATAL";
/**
 * Request body for LogClientError() in the utility-api
 */
export type ErrorLog = {
    message: string;
    log_level: LogLevel;
};
/**
 * Response for LogClientError() in the utility-api
 */
export type ErrorLoggedSuccessMessage = {
    message: string;
};
