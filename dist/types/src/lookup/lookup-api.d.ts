/**
 * @typedef {import('./lookup-types.js').GenderOptions } GenderOptions
 * @typedef {import('./lookup-types.js').EducationOptions } EducationOptions
 * @typedef {import('./lookup-types.js').MaritalOptions } MaritalOptions
 * @typedef {import('./lookup-types.js').SubscriptionOptions } SubscriptionOptions
*/
/**
 * Handles API Requests that access the 'lookup' portion of the API
 */
export class LookupApi {
    /**
      * Retrieve all available gender options for user profile selection
      *
      * @returns {Promise<GenderOptions>}
      */
    GetGenderOptions(): Promise<GenderOptions>;
    /**
      * Retrieve all available education level classifications for user profiles
      *
      * @returns {Promise<EducationOptions>}
      */
    GetEducationOptions(): Promise<EducationOptions>;
    /**
      * Retrieve all available marital status options for user demographic information
      *
      * @returns {Promise<MaritalOptions>}
      */
    GetMaritalOptions(): Promise<MaritalOptions>;
    /**
      * Retrieve all available subscription levels with features and pricing information
      *
      * @returns {Promise<SubscriptionOptions>}
      */
    GetSubscriptionOptions(): Promise<SubscriptionOptions>;
}
export type GenderOptions = import("./lookup-types.js").GenderOptions;
export type EducationOptions = import("./lookup-types.js").EducationOptions;
export type MaritalOptions = import("./lookup-types.js").MaritalOptions;
export type SubscriptionOptions = import("./lookup-types.js").SubscriptionOptions;
