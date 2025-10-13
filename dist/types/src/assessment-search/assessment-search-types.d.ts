/**
 * List of userIds
 */
export type UserIds = string[];
export type AdditionalProperty = {
    additionalProp1: number;
    additionalProp2: number;
    additionalProp3: number;
};
/**
 * Dictionary mapping user IDs to their latest assessment scores.
 */
export type AdditionalProperties = {
    additionalProp1: AdditionalProperty;
    additionalProp2: AdditionalProperty;
    additionalProp3: AdditionalProperty;
};
/**
 * List of assessment IDs
 */
export type AssessmentIds = string[];
export type AssessmentSearchResponse = {
    question_id: string;
    score: string;
};
export type AssessmentWithResponses = {
    id: string;
    created_at: string;
    alpha: number;
    cerebral: number;
    prime: number;
    responses: AssessmentSearchResponse[];
};
/**
 * List of assessments with their responses
 */
export type AssessmentsWithResponses = AssessmentWithResponses[];
export type UserAssessmentSummary = {
    id: string;
    alpha: number;
    cerebral: number;
    prime: number;
    created_at: string;
};
export type UserMatch = {
    id: string;
    name: string;
    email: string;
    date_of_birth: string;
    assessments: UserAssessmentSummary[];
    source: string;
};
/**
 * A list of users that match the assessment criteria.
 */
export type UsersMatchingAssessmentCriteria = UserMatch[];
