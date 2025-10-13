/**
 * Request body for the functions the content-interaction-api
 */
export type ContentInteraction = {
    user_id: string;
    interaction_duration: number;
    interaction_record: number[];
    last_position: number;
    context: string;
    cms_version: number;
    user_subscription_level_id: number;
    /**
     * matches the content_id for a piece of content in 'contentful'
     */
    content_id: string;
};
export type ContentInteractionSuccessMessage = {
    message: string;
};
