/**
 * Request body for CreatePersonalizedFrame() in the frame-it-api
 */
export type FrameItPhrases = string[];
/**
 * Represents a personalized frame-it object.
 */
export type PersonalizedFrameIt = {
    updated_at: string;
    created_at: string;
    id: string;
    phrases: string[];
    wins: string[];
    completed: boolean;
    image_url: string;
};
/**
 * Data for updating a personalized frame.
 */
export type UpdateFrameData = {
    wins?: string[] | undefined;
    completed?: boolean | undefined;
};
export type DeleteFrameConfirmationMessage = {
    message: string;
};
/**
 * List of all user's frames with metadata
 */
export type PersonalizedFrameGallery = {
    frames: PersonalizedFrameIt[];
};
