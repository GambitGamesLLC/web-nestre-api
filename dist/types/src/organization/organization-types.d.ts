export type Organization = {
    id: string;
    name: string;
    tags: string[];
};
/**
 * List of organizations
 */
export type Organizations = Organization[];
export type OrganizationMember = {
    email: string;
    member_type: string;
    tags: string[];
    id: string;
    subscription_level: string;
};
/**
 * List of organization members matching the criteria
 */
export type OrganizationMembers = OrganizationMember[];
export type UserDetails = {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    date_of_birth: string;
};
/**
 * List of user details for organization members who are registered users
 */
export type OrganizationUserDetails = UserDetails[];
export type OrganizationData = {
    name: string;
    num_basic_subscriptions: number;
    subscriptions_expiry: string;
    id: string;
};
