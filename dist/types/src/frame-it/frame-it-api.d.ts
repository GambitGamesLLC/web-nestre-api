/**
 * @typedef {import('./frame-it-types.js').FrameItPhrases } FrameItPhrases
 * @typedef {import('./frame-it-types.js').PersonalizedFrameIt } PersonalizedFrameIt
 * @typedef {import('./frame-it-types.js').UpdateFrameData } UpdateFrameData
 * @typedef {import('./frame-it-types.js').DeleteFrameConfirmationMessage } DeleteFrameConfirmationMessage
 * @typedef {import('./frame-it-types.js').PersonalizedFrameGallery } PersonalizedFrameGallery
*/
/**
 * Handles API Requests that access the 'frame-it' portion of the API
 */
export class FrameItApi {
    /**
      * Create a new visual frame with personalized phrases and return the generated image URL
      *
      * @param {string} userId
      * @param {FrameItPhrases} frameItPhrases
      * @returns {Promise<PersonalizedFrameIt>}
      */
    CreatePersonalizedFrame(userId: string, frameItPhrases: FrameItPhrases): Promise<PersonalizedFrameIt>;
    /**
      * Retrieve a specific frame by its unique identifier
      *
      * @param {string} userId
      * @param {string} frameId
      * @returns {Promise<PersonalizedFrameIt>}
      */
    GetFrameById(userId: string, frameId: string): Promise<PersonalizedFrameIt>;
    /**
      * Update frame metadata or properties using partial data
      *
      * @param {string} userId
      * @param {string} frameId
      * @param {UpdateFrameData} updateFrameData
      * @returns {Promise<PersonalizedFrameIt>}
      */
    UpdateFrame(userId: string, frameId: string, updateFrameData: UpdateFrameData): Promise<PersonalizedFrameIt>;
    /**
      * Permanently delete a frame and its associated image
      *
      * @param {string} userId
      * @param {string} frameId
      * @returns {Promise<DeleteFrameConfirmationMessage>}
      */
    DeleteFrameById(userId: string, frameId: string): Promise<DeleteFrameConfirmationMessage>;
    /**
      * Retrieve all frames created by the authenticated user
      *
      * @param {string} userId
      * @returns {Promise<PersonalizedFrameGallery>}
      */
    GetFrameGallery(userId: string): Promise<PersonalizedFrameGallery>;
}
export type FrameItPhrases = import("./frame-it-types.js").FrameItPhrases;
export type PersonalizedFrameIt = import("./frame-it-types.js").PersonalizedFrameIt;
export type UpdateFrameData = import("./frame-it-types.js").UpdateFrameData;
export type DeleteFrameConfirmationMessage = import("./frame-it-types.js").DeleteFrameConfirmationMessage;
export type PersonalizedFrameGallery = import("./frame-it-types.js").PersonalizedFrameGallery;
