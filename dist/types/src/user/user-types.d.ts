export type EffectiveSubscriptionLevel = {
    id: number;
    name: string;
    value: number;
};
export type BasicUserProfile = {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    username: string;
    effective_subscription_level: EffectiveSubscriptionLevel;
    trial_used: boolean;
    frame_it_unlocked: boolean;
};
export type UpdateUserProfile = {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    profile_photo_s3_key: string;
    subscription_level_id: number;
    referred_by_code: number;
    trial_used: boolean;
    date_of_birth: string;
    gender_id: number;
    education_level_id: number;
    marital_status_id: number;
    organization: string;
    frame_it_unlocked: boolean;
    app_version: string;
    os_version: string;
};
export type Assessment = {
    id: string;
    alpha: number;
    cerebral: number;
    prime: number;
    created_at: string;
};
export type Streaks = {
    current_streak: number;
    max_streak: number;
};
export type FullUserProfile = {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    username: string;
    effective_subscription_level: EffectiveSubscriptionLevel;
    trial_used: boolean;
    frame_it_unlocked: boolean;
    assessment: Assessment;
    streaks: Streaks;
};
export type DeleteConfirmationMessage = {
    message: string;
};
export type CreateReferralCode = {
    code: string;
    is_active: boolean;
};
export type CreateReferralCodeConfirmationMessage = {
    message: string;
};
