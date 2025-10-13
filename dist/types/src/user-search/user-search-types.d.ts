export type MindsetProfile = {
    id: string;
    alpha: number;
    cerebral: number;
    prime: number;
    created_at: string;
    assessment_summary: string[];
};
/**
 * User profile data
 */
export type UserProfileData = {
    user_id: string;
    firstname: string;
    lastname: string;
    email: string;
    date_of_birth: string;
    profile_photo: string;
    mindset_profile: MindsetProfile;
};
