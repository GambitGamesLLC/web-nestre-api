export type MatchingUser = {
    id: string;
    created_at: string;
    email: string;
    firstname: string;
    lastname: string;
    gender: string;
    date_of_birth: string;
    username: string;
    subscription_level: string;
    subscription_type: string;
    trial_used: boolean;
    frame_it_unlocked: boolean;
    last_activity: string;
};
/**
 * A list of users that match the search criteria.
 */
export type UsersMatchingSearch = MatchingUser[];
export type ReferralCode = {
    code: string;
    is_active: boolean;
    created_at: string;
};
export type UserData = {
    id: string;
    created_at: string;
    email: string;
    firstname: string;
    lastname: string;
    gender: string;
    date_of_birth: string;
    username: string;
    subscription_level: string;
    subscription_type: string;
    trial_used: boolean;
    frame_it_unlocked: boolean;
    last_activity: string;
    referral_codes: ReferralCode[];
};
export type CreateOrganizationData = {
    name: string;
    num_basic_subscriptions: number;
    subscriptions_expiry: string;
};
export type NewlyCreatedOrganizationData = {
    name: string;
    num_basic_subscriptions: number;
    subscriptions_expiry: string;
    id: string;
};
export type UpdateOrganizationData = {
    name: string;
    num_basic_subscriptions: number;
    subscriptions_expiry: string;
};
export type UpdatedOrganization = {
    name: string;
    num_basic_subscriptions: number;
    subscriptions_expiry: string;
    id: string;
};
export type TeamCode = {
    code: string;
    is_active: boolean;
};
export type RetrievedOrganizationData = {
    name: string;
    num_basic_subscriptions: number;
    subscriptions_expiry: string;
    id: string;
    team_codes: TeamCode[];
    referral_codes: ReferralCode[];
};
export type AdminAppCreateReferralCode = {
    code: string;
    is_active: boolean;
};
export type AdminAppOrganizationMember = {
    email: string;
    member_type: string;
    tags: string[];
    subscription_level_id: number;
};
export type AdminAppOrganizationMembers = {
    members: AdminAppOrganizationMember[];
};
export type MemberIds = string[];
export type UserStatsData = {
    total_users: number;
    new_users: number;
    active_users: number;
};
export type ReferralCodeStat = {
    code: string;
    name: string;
    user_type: string;
    total_referred_users: number;
    basic_monthly_subscribers: number;
    basic_annual_subscribers: number;
    total_referred_subscribers: number;
};
export type ReferralCodeStats = {
    /**
     * - An array of statistics for individual referral codes.
     */
    codes: ReferralCodeStat[];
    /**
     * - The grand total of referred users across all codes.
     */
    total_referred_users: number;
    /**
     * - The grand total of referred subscribers across all codes.
     */
    total_referred_subscribers: number;
    /**
     * - The grand total of basic monthly subscribers across all codes.
     */
    total_basic_monthly_subscribers: number;
    /**
     * - The grand total of basic annual subscribers across all codes.
     */
    total_basic_annual_subscribers: number;
};
