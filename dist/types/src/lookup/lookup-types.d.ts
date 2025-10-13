export type GenderOption = {
    id: number;
    name: string;
};
/**
 * List of gender options with IDs and display names
 */
export type GenderOptions = {
    gender_options: GenderOption[];
};
export type EducationOption = {
    id: number;
    name: string;
    value: number;
};
/**
 * List of education levels with IDs and descriptions
 */
export type EducationOptions = {
    education_options: EducationOption[];
};
export type MaritalOption = {
    id: number;
    name: string;
};
/**
 * List of marital status options with IDs and labels
 */
export type MaritalOptions = {
    marital_options: MaritalOption[];
};
export type SubscriptionOption = {
    id: number;
    name: string;
    value: number;
};
/**
 * List of subscription levels with details and feature access
 */
export type SubscriptionOptions = {
    subscription_options: SubscriptionOption[];
};
