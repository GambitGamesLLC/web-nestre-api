/**
 * @typedef {import('./development-types.js').AuthenticationRequest } AuthenticationRequest
 * @typedef {import('./development-types.js').AuthenticationData } AuthenticationData
 * @typedef {import('./development-types.js').DeveloperAccessData } DeveloperAccessData
*/
/**
 * Handles API Requests that access the 'development' portion of the API
 */
export class DevelopmentApi {
    /**
      * This endpoint handles user authentication by validating the provided username and password against the AWS Cognito user pool for the Nestre application.
      *
      * @param {AuthenticationRequest} authenticationRequest
      * @returns {Promise<AuthenticationData>}
      */
    Authenticate(authenticationRequest: AuthenticationRequest): Promise<AuthenticationData>;
    /**
      * This endpoint retrieves the access token for the currently logged-in staff user. Required for calling Admin App or Neurolabs endpoints.
      *
      * @returns {Promise<DeveloperAccessData>}
      */
    GetStaffAccessToken(): Promise<DeveloperAccessData>;
}
export type AuthenticationRequest = import("./development-types.js").AuthenticationRequest;
export type AuthenticationData = import("./development-types.js").AuthenticationData;
export type DeveloperAccessData = import("./development-types.js").DeveloperAccessData;
