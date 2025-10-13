/**
 * @typedef {import('./daily-workout-types.js').DailyWorkoutRecommendation} DailyWorkoutRecommendation
 */
/**
 * Handles API Requests that access the 'daily-workout' portion of the API
 */
export class DailyWorkoutApi {
    /**
      * Retrieve personalized daily workout recommendations.
      *
      * @param {string} userId
      * @returns {Promise<DailyWorkoutRecommendation>}
      */
    GetDailyWorkoutRecommendation(userId: string): Promise<DailyWorkoutRecommendation>;
}
export type DailyWorkoutRecommendation = import("./daily-workout-types.js").DailyWorkoutRecommendation;
