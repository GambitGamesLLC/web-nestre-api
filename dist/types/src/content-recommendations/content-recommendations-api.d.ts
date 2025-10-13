/**
 * @typedef {import('./content-recommendations-types.js').ContentRecommendations } ContentRecommendations
*/
/**
 * Handles API Requests that access the 'content-recommendations' portion of the API
 */
export class ContentRecommendationsApi {
    /**
      * Retrieve personalized activate content recommendations for the authenticated user based on their preferences and interaction history.
      *
      * @param {string} userId
      * @param {number} num_recommendations
      * @returns {Promise<ContentRecommendations>}
      */
    GetActivateContentRecommendations(userId: string, num_recommendations: number): Promise<ContentRecommendations>;
    /**
      * Retrieve personalized guided-frames content recommendations for the authenticated user based on their preferences and interaction history.
      *
      * @param {string} userId
      * @param {number} num_recommendations
      * @returns {Promise<ContentRecommendations>}
      */
    GetGuidedFramesContentRecommendations(userId: string, num_recommendations: number): Promise<ContentRecommendations>;
    /**
      * Retrieve personalized mindset-minutes content recommendations for the authenticated user based on their preferences and interaction history.
      *
      * @param {string} userId
      * @param {number} num_recommendations
      * @returns {Promise<ContentRecommendations>}
      */
    GetMindsetMinutesContentRecommendations(userId: string, num_recommendations: number): Promise<ContentRecommendations>;
    /**
      * Retrieve personalized music content recommendations for the authenticated user based on their preferences and interaction history.
      *
      * @param {string} userId
      * @param {number} num_recommendations
      * @returns {Promise<ContentRecommendations>}
      */
    GetMindsetMusicContentRecommendations(userId: string, num_recommendations: number): Promise<ContentRecommendations>;
}
export type ContentRecommendations = import("./content-recommendations-types.js").ContentRecommendations;
