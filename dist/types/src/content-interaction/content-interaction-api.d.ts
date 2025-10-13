/**
 * @typedef {import('./content-interaction-types.js').ContentInteraction } ContentInteraction
 * @typedef {import('./content-interaction-types.js').ContentInteractionSuccessMessage } ContentInteractionSuccessMessage
*/
/**
 * Handles API Requests that access the 'content-interaction' portion of the API
 */
export class ContentInteractionApi {
    /**
      * Record a user's interaction with activate content.
      *
      * @param {string} userId
      * @param {ContentInteraction} contentInteraction
      * @returns {Promise<ContentInteractionSuccessMessage>}
      */
    CreateActivateContentInteraction(userId: string, contentInteraction: ContentInteraction): Promise<ContentInteractionSuccessMessage>;
    /**
      * Record a user's interaction with guided frame content.
      *
      * @param {string} userId
      * @param {ContentInteraction} contentInteraction
      * @returns {Promise<ContentInteractionSuccessMessage>}
      */
    CreateGuidedFrameContentInteraction(userId: string, contentInteraction: ContentInteraction): Promise<ContentInteractionSuccessMessage>;
    /**
      * Record a user's interaction with mental frame content.
      *
      * @param {string} userId
      * @param {ContentInteraction} contentInteraction
      * @returns {Promise<ContentInteractionSuccessMessage>}
      */
    CreateMentalFrameContentInteraction(userId: string, contentInteraction: ContentInteraction): Promise<ContentInteractionSuccessMessage>;
    /**
      * Record a user's interaction with mindset minute content.
      *
      * @param {string} userId
      * @param {ContentInteraction} contentInteraction
      * @returns {Promise<ContentInteractionSuccessMessage>}
      */
    CreateMindsetMinuteContentInteraction(userId: string, contentInteraction: ContentInteraction): Promise<ContentInteractionSuccessMessage>;
    /**
      * Record a user's interaction with music content.
      *
      * @param {string} userId
      * @param {ContentInteraction} contentInteraction
      * @returns {Promise<ContentInteractionSuccessMessage>}
      */
    CreateMusicContentInteraction(userId: string, contentInteraction: ContentInteraction): Promise<ContentInteractionSuccessMessage>;
}
export type ContentInteraction = import("./content-interaction-types.js").ContentInteraction;
export type ContentInteractionSuccessMessage = import("./content-interaction-types.js").ContentInteractionSuccessMessage;
