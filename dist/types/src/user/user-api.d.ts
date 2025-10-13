/**
 * Handles API Requests that access the 'user' portion of the API
 */
export class UserApi {
    /**
      * Get basic user profile by email,
      * does not require that they have completed their assessement
      * Typically used during authentication flow before user ID is available.
      * If the email is not in the database, it attempts to migrate the user from the legacy 8base system.
      * @param {string} email
      * @returns {Promise<BasicUserProfile>}
      */
    GetBasicUserProfileByEmail(email: string): Promise<BasicUserProfile>;
    /**
      * Get basic user profile,
      * does not require that they have completed their assessement
      * @param {string} userId
      * @returns {Promise<BasicUserProfile>}
      */
    GetBasicUserProfile(userId: string): Promise<BasicUserProfile>;
    /**
      * Updates the user profile
      * @param {string} userId The id of the user to update
      * @param {UpdateUserProfile} userProfile updated user profile
      * @returns {Promise<BasicUserProfile>}
      */
    UpdateUserProfile(userId: string, userProfile: UpdateUserProfile): Promise<BasicUserProfile>;
    /**
     * Retrieve comprehensive user profile including assessment data and activity streaks.
     * Requires user has completed their assessement.
     * Otherwise returns a 400 error
     * @param {string} userId
     * @returns {Promise<FullUserProfile>}
     */
    GetFullUserProfile(userId: string): Promise<FullUserProfile>;
    /**
     * Create a new user account using authenticated Cognito credentials
     * @returns {Promise<BasicUserProfile>} Newly created user account profile with default subscription
     */
    CreateNewUserAccount(): Promise<BasicUserProfile>;
    /**
     * Permanently delete the authenticated user's account and all associated data
     * @returns {Promise<DeleteConfirmationMessage>} Newly created user account profile with default subscription
     */
    DeleteUserAccount(): Promise<DeleteConfirmationMessage>;
    /**
     * Create a referral code for the authenticated user to refer others to the application
     * @param {string} userId
     * @param {CreateReferralCode} createReferralCode
     * @returns {Promise<CreateReferralCodeConfirmationMessage>}
     */
    CreateReferralCode(userId: string, createReferralCode: CreateReferralCode): Promise<CreateReferralCodeConfirmationMessage>;
}
export type BasicUserProfile = import("./user-types.js").BasicUserProfile;
export type UpdateUserProfile = import("./user-types.js").UpdateUserProfile;
export type FullUserProfile = import("./user-types.js").FullUserProfile;
export type DeleteConfirmationMessage = import("./user-types.js").DeleteConfirmationMessage;
export type CreateReferralCode = import("./user-types.js").CreateReferralCode;
export type CreateReferralCodeConfirmationMessage = import("./user-types.js").CreateReferralCodeConfirmationMessage;
