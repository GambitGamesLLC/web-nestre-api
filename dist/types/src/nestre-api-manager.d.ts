/**
 * An enum representing the supported HTTP request methods.
 */
export type HttpMethod = HttpMethodValue;
/**
 * The specific string values for our HTTP methods.
 * By defining this type, we get strict type-checking instead of just accepting any string.
 * @typedef {'GET' | 'POST' | 'PATCH' | 'DELETE'} HttpMethodValue
 */
/**
 * An enum representing the supported HTTP request methods.
 * @readonly
 * @enum {HttpMethodValue}
 */
export const HttpMethod: Readonly<{
    /** Represents an HTTP GET request. */
    GET: "GET";
    /** Represents an HTTP POST request, typically for creating a new resource. */
    POST: "POST";
    /** Represents an HTTP PATCH request, for partial updates. */
    PATCH: "PATCH";
    /** Represents an HTTP DELETE request. */
    DELETE: "DELETE";
}>;
/**
 * Singleton class for interacting with the Nestre API
 * @class
 */
export class NestreApiManager {
    /**
     * Get the single instance of the NestreApiManager
     * @returns {NestreApiManager} The NestreApiManager instance
     */
    static GetInstance(): NestreApiManager;
    /**
     * The first section of the server url, before the version number
     * @private
     * @type {string | null}
     */
    private _baseUrl;
    /**
     * The version number of the Api to call
     * @private
     * @type {number | null}
     */
    private _version;
    /**
     * The authentication token
     * @private
     * @type {string | null}
     */
    private _authToken;
    /**
     * Reference to the UserAPI object
     * @type {UserApi}
     * */
    userApi: UserApi;
    /**
     * Reference to the DailyWorkoutApi object
     * @type {DailyWorkoutApi}
     * */
    dailyWorkoutApi: DailyWorkoutApi;
    /**
     * Reference to the CognitiveExcercisesApi object
     * @type {CognitiveExercisesApi}
     * */
    cognitiveExercisesApi: CognitiveExercisesApi;
    /**
     * Reference to the MentalFramingApi object
     * @type {MentalFramingApi}
     * */
    mentalFramingApi: MentalFramingApi;
    /**
     * Reference to the AssessmentApi object
     * @type {AssessmentApi}
     * */
    assessmentApi: AssessmentApi;
    /**
     * Reference to the ContentInteractionApi object
     * @type {ContentInteractionApi}
     * */
    contentInteractionApi: ContentInteractionApi;
    /**
     * Reference to the ContentRecommendationsApi object
     * @type {ContentRecommendationsApi}
     * */
    contentRecommendationsApi: ContentRecommendationsApi;
    /**
     * Reference to the FrameItApi object
     * @type {FrameItApi}
     * */
    frameItApi: FrameItApi;
    /**
     * Reference to the LookupApi object
     * @type {LookupApi}
     * */
    lookupApi: LookupApi;
    /**
     * Reference to the UtilityApi object
     * @type {UtilityApi}
     * */
    utilityApi: UtilityApi;
    /**
     * Reference to the AdminAppApi object
     * @type {AdminAppApi}
     * */
    adminAppApi: AdminAppApi;
    /**
     * Reference to the UserSearchApi object
     * @type {UserSearchApi}
     * */
    userSearchApi: UserSearchApi;
    /**
     * Reference to the AssessmentSearchApi object
     * @type {AssessmentSearchApi}
     * */
    assessmentSearchApi: AssessmentSearchApi;
    /**
     * Reference to the OrganizationApi object
     * @type {OrganizationApi}
     * */
    OrganizationApi: OrganizationApi;
    /**
     * Reference to the DevelopmentApi object
     * @type {DevelopmentApi}
     * */
    DevelopmentApi: DevelopmentApi;
    organizationApi: OrganizationApi | undefined;
    developmentApi: DevelopmentApi | undefined;
    /**
     * Sets the baseUrl for the HTTP Requests
     * @param {string} baseUrl The first section of the url used to make HTTP Requests to our endpoint
     */
    SetBaseUrl(baseUrl: string): void;
    /**
     * Sets the version number for the Api to call during HTTP requests
     * @param {number} version The version number of the Api to call
     */
    SetApiVersion(version: number): void;
    /**
     * Sets the JWT token for subsequent API calls.
     * @param {string} token - The authentication token.
     */
    SetAuthToken(token: string): void;
    /**
     * Clears the authentication token.
     */
    ClearAuthToken(): void;
    /**
     * A private, generic request handler.
     * Used by our api classes to make HTTP requests to our endpoint
     * @private
     * @template T
     * @param {HttpMethodValue} httpMethodValue - The HTTP method to use (GET, POST, PATCH, DELETE).
     * @param {string} endpoint - The API endpoint path.
     * @param {object} [body] - The request body for POST/PATCH requests.
     * @param {boolean} [ignoreApiVersion] - Should we exclude the /v#/ from the Request url?
     * @param {boolean} [ignoreAuthToken] - Should we ignore if the auth token is not set?
     * @returns {Promise<T>}
     */
    private Request;
}
/**
 * The specific string values for our HTTP methods.
 * By defining this type, we get strict type-checking instead of just accepting any string.
 */
export type HttpMethodValue = "GET" | "POST" | "PATCH" | "DELETE";
import { UserApi } from './user/user-api.js';
import { DailyWorkoutApi } from './daily-workout/daily-workout-api.js';
import { CognitiveExercisesApi } from './cognitive-exercises/cognitive-exercises-api.js';
import { MentalFramingApi } from './mental-framing/mental-framing-api.js';
import { AssessmentApi } from './assessment/assessment-api.js';
import { ContentInteractionApi } from './content-interaction/content-interaction-api.js';
import { ContentRecommendationsApi } from './content-recommendations/content-recommendations-api.js';
import { FrameItApi } from './frame-it/frame-it-api.js';
import { LookupApi } from './lookup/lookup-api.js';
import { UtilityApi } from './utility/utility-api.js';
import { AdminAppApi } from './admin-app/admin-app-api.js';
import { UserSearchApi } from './user-search/user-search-api.js';
import { AssessmentSearchApi } from './assessment-search/assessment-search-api.js';
import { OrganizationApi } from './organization/organization-api.js';
import { DevelopmentApi } from './development/development-api.js';
