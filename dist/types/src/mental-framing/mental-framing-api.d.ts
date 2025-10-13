/**
 * @typedef {import('./mental-framing-types.js').MentalFramingContentIds} MentalFramingContentIds
*/
/**
 * Handles API Requests that access the 'mental-framing' portion of the API
 */
export class MentalFramingApi {
    /**
      * Retrieve mental framing content ids for the userId
      *
      * @param {string} userId
      * @returns {Promise<MentalFramingContentIds>}
      */
    GetMentalFramingContentIds(userId: string): Promise<MentalFramingContentIds>;
}
export type MentalFramingContentIds = import("./mental-framing-types.js").MentalFramingContentIds;
