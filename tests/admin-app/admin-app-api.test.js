/**
 * admin-app-api.test.js
 * @file Test file for the AdminAppApi class.
 * @description This file contains the unit tests for the AdminAppApi class,
 * ensuring that all methods behave as expected.
 * @requires {NestreApiManager} from '../../src/index.js'
 * @requires {API_BASE_URL, API_VERSION, AUTH_TOKEN} from '../../examples/environment-variables.js'
 */

import { NestreApiManager } from '../../src/index.js';
import { API_BASE_URL, API_VERSION, AUTH_TOKEN } from '../../examples/environment-variables.js';
import { jest } from '@jest/globals';

describe('AdminAppApi', () => {
  let nestreApiManager;
  let adminAppApi;

  beforeEach(() => {
    nestreApiManager = NestreApiManager.GetInstance();
    nestreApiManager.SetBaseUrl(API_BASE_URL);
    nestreApiManager.SetApiVersion(API_VERSION);
    nestreApiManager.SetAuthToken(AUTH_TOKEN);
    adminAppApi = nestreApiManager.adminAppApi;
  });

  //#region ShortenUrl

  test('ShortenUrl should return a shortened URL string', async () => {
    const longUrl = 'https://www.verylongurl.com/with/lots/of/path/segments';
    const shortenedUrl = await adminAppApi.ShortenUrl(longUrl);
    expect(typeof shortenedUrl).toBe('string');
    expect(shortenedUrl).toBe('https://sh.rt/mock-url');
  });

  test('ShortenUrl should throw an error if the URL is not a string', async () => {
    await expect(adminAppApi.ShortenUrl(12345)).rejects.toThrow(
      'web-nestre-api : admin-app-api.js ShortenUrl() Invalid url: The url must be a non-empty string.'
    );
  });

  test('ShortenUrl should throw an error if the URL is an empty string', async () => {
    await expect(adminAppApi.ShortenUrl('')).rejects.toThrow(
      'web-nestre-api : admin-app-api.js ShortenUrl() Invalid url: The url must be a non-empty string.'
    );
  });

  test('ShortenUrl should throw an error if the URL is a string with only whitespace', async () => {
    await expect(adminAppApi.ShortenUrl('   ')).rejects.toThrow(
      'web-nestre-api : admin-app-api.js ShortenUrl() Invalid url: The url must be a non-empty string.'
    );
  });

  test('ShortenUrl should throw an error if auth token is not set', async () => {
    nestreApiManager.ClearAuthToken();
    const longUrl = 'https://www.validurl.com';
    await expect(adminAppApi.ShortenUrl(longUrl)).rejects.toThrow(
      'web-nestre-api : nestre-api-manager.js Error: this._authToken is null, undefined, or an empty string'
    );
  });

  //#endregion

  //#region DeleteUserByEmail

  test('DeleteUserByEmail should return a success message on successful deletion', async () => {
    const email = 'test@example.com';
    const response = await adminAppApi.DeleteUserByEmail(email);
    expect(response).toEqual({ message: 'User deleted successfully.' });
  });

  test('DeleteUserByEmail should throw an error if the email is not a string', async () => {
    await expect(adminAppApi.DeleteUserByEmail(12345)).rejects.toThrow(
      'web-nestre-api : admin-app-api.js DeleteUserByEmail() Invalid email: The email must be a non-empty string.'
    );
  });

  test('DeleteUserByEmail should throw an error if the email is an empty string', async () => {
    await expect(adminAppApi.DeleteUserByEmail('')).rejects.toThrow(
      'web-nestre-api : admin-app-api.js DeleteUserByEmail() Invalid email: The email must be a non-empty string.'
    );
  });

  test('DeleteUserByEmail should throw an error if the email is a string with only whitespace', async () => {
    await expect(adminAppApi.DeleteUserByEmail('   ')).rejects.toThrow(
      'web-nestre-api : admin-app-api.js DeleteUserByEmail() Invalid email: The email must be a non-empty string.'
    );
  });

  test('DeleteUserByEmail should throw an error if auth token is not set', async () => {
    nestreApiManager.ClearAuthToken();
    const email = 'test@example.com';
    await expect(adminAppApi.DeleteUserByEmail(email)).rejects.toThrow(
      'web-nestre-api : nestre-api-manager.js Error: this._authToken is null, undefined, or an empty string'
    );
  });

  //#endregion

  //#region SearchUsers

  test('SearchUsers should return an array of users on successful search', async () => {
    const searchString = 'test';
    const users = await adminAppApi.SearchUsers(searchString);
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);
    expect(users[0]).toHaveProperty('id');
    expect(users[0]).toHaveProperty('email');
  });

  test('SearchUsers should throw an error if search_string is not a string', async () => {
    await expect(adminAppApi.SearchUsers(12345)).rejects.toThrow(
      'web-nestre-api : admin-app-api.js SearchUsers() Invalid search_string: The search_string must be a non-empty string.'
    );
  });

  test('SearchUsers should throw an error if search_string is an empty string', async () => {
    await expect(adminAppApi.SearchUsers('')).rejects.toThrow(
      'web-nestre-api : admin-app-api.js SearchUsers() Invalid search_string: The search_string must be a non-empty string.'
    );
  });

  test('SearchUsers should throw an error if search_string is less than 3 characters', async () => {
    await expect(adminAppApi.SearchUsers('ab')).rejects.toThrow(
      'web-nestre-api : admin-app-api.js SearchUsers() Invalid search_string: The search_string must be a non-empty string.'
    );
  });

  test('SearchUsers should throw an error if search_string is a string with only whitespace', async () => {
    await expect(adminAppApi.SearchUsers('   ')).rejects.toThrow(
      'web-nestre-api : admin-app-api.js SearchUsers() Invalid search_string: The search_string must be a non-empty string.'
    );
  });

  test('SearchUsers should throw an error if auth token is not set', async () => {
    nestreApiManager.ClearAuthToken();
    const searchString = 'validsearch';
    await expect(adminAppApi.SearchUsers(searchString)).rejects.toThrow(
      'web-nestre-api : nestre-api-manager.js Error: this._authToken is null, undefined, or an empty string'
    );
  });

  //#endregion

  //#region GetUser

  test('GetUser should return a user object on successful fetch', async () => {
    const user = await adminAppApi.GetUser('user_123');
    expect(user).toBeDefined();
    expect(user.id).toBe('user_123');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('referral_codes');
    expect(Array.isArray(user.referral_codes)).toBe(true);
  });

  test('GetUser should throw an error if user_id is not a string', async () => {
    await expect(adminAppApi.GetUser(12345)).rejects.toThrow(
      'web-nestre-api : admin-app-api.js GetUser() Invalid user_id: The user_id must be a non-empty string.'
    );
  });

  test('GetUser should throw an error if user_id is an empty string', async () => {
    await expect(adminAppApi.GetUser('')).rejects.toThrow(
      'web-nestre-api : admin-app-api.js GetUser() Invalid user_id: The user_id must be a non-empty string.'
    );
  });

  test('GetUser should throw an error if user_id is a string with only whitespace', async () => {
    await expect(adminAppApi.GetUser('   ')).rejects.toThrow(
      'web-nestre-api : admin-app-api.js GetUser() Invalid user_id: The user_id must be a non-empty string.'
    );
  });

  test('GetUser should throw an error if auth token is not set', async () => {
    nestreApiManager.ClearAuthToken();
    await expect(adminAppApi.GetUser('user_123')).rejects.toThrow(
      'web-nestre-api : nestre-api-manager.js Error: this._authToken is null, undefined, or an empty string'
    );
  });

  //#endregion

  //#region UpdateUser

  test('UpdateUser should return an updated user object on successful update', async () => {
    const userId = 'user_123';
    const updateData = { firstname: 'TestUpdated' };
    const updatedUser = await adminAppApi.UpdateUser(userId, updateData);
    expect(updatedUser).toBeDefined();
    expect(updatedUser.id).toBe(userId);
    expect(updatedUser.firstname).toBe('TestUpdated');
    expect(updatedUser.lastname).toBe('User'); // From mock data
  });

  test('UpdateUser should throw an error if user_id is not a string', async () => {
    await expect(adminAppApi.UpdateUser(12345, {})).rejects.toThrow(
      'web-nestre-api : admin-app-api.js UpdateUser() Invalid user_id: The user_id must be a non-empty string.'
    );
  });

  test('UpdateUser should throw an error if user_id is an empty string', async () => {
    await expect(adminAppApi.UpdateUser('', {})).rejects.toThrow(
      'web-nestre-api : admin-app-api.js UpdateUser() Invalid user_id: The user_id must be a non-empty string.'
    );
  });

  test('UpdateUser should throw an error if updateData is null', async () => {
    await expect(adminAppApi.UpdateUser('user_123', null)).rejects.toThrow(
      'web-nestre-api : admin-app-api.js UpdateUser() Invalid updateData: The updateData must be a non-null object.'
    );
  });

  test('UpdateUser should throw an error if updateData is not an object', async () => {
    await expect(adminAppApi.UpdateUser('user_123', 'string')).rejects.toThrow(
      'web-nestre-api : admin-app-api.js UpdateUser() Invalid updateData: The updateData must be a non-null object.'
    );
  });

  test('UpdateUser should throw an error if updateData is an array', async () => {
    await expect(adminAppApi.UpdateUser('user_123', [])).rejects.toThrow(
      'web-nestre-api : admin-app-api.js UpdateUser() Invalid updateData: The updateData must be a non-null object.'
    );
  });

  test('UpdateUser should throw an error if auth token is not set', async () => {
    nestreApiManager.ClearAuthToken();
    await expect(adminAppApi.UpdateUser('user_123', { firstname: 'Test' })).rejects.toThrow(
      'web-nestre-api : nestre-api-manager.js Error: this._authToken is null, undefined, or an empty string'
    );
  });

  //#endregion

  //#region CreateOrganization

  test('CreateOrganization should return a newly created organization object', async () => {
    const orgData = {
      name: 'New Test Corp',
      num_basic_subscriptions: 50,
      subscriptions_expiry: '2025-12-31T23:59:59.000Z'
    };
    const newOrg = await adminAppApi.CreateOrganization(orgData);
    expect(newOrg).toBeDefined();
    expect(newOrg).toHaveProperty('id');
    expect(newOrg.name).toBe(orgData.name);
    expect(newOrg.num_basic_subscriptions).toBe(orgData.num_basic_subscriptions);
  });

  test('CreateOrganization should throw an error if orgData is invalid (missing name)', async () => {
    const orgData = {
      num_basic_subscriptions: 50,
      subscriptions_expiry: '2025-12-31T23:59:59.000Z'
    };
    await expect(adminAppApi.CreateOrganization(orgData)).rejects.toThrow(
      'web-nestre-api : admin-app-api.js CreateOrganization() Validation failed for orgData: "name" is required'
    );
  });

  test('CreateOrganization should throw an error if orgData is invalid (bad date)', async () => {
    const orgData = {
      name: 'New Test Corp',
      num_basic_subscriptions: 50,
      subscriptions_expiry: 'not-a-date'
    };
    await expect(adminAppApi.CreateOrganization(orgData)).rejects.toThrow(
      'web-nestre-api : admin-app-api.js CreateOrganization() Validation failed for orgData: "subscriptions_expiry" must be in iso format'
    );
  });

  test('CreateOrganization should throw an error if orgData is null', async () => {
    await expect(adminAppApi.CreateOrganization(null)).rejects.toThrow(
      'web-nestre-api : admin-app-api.js CreateOrganization() Validation failed for orgData: "value" must be of type object'
    );
  });

  test('CreateOrganization should throw an error if auth token is not set', async () => {
    nestreApiManager.ClearAuthToken();
    const orgData = {
      name: 'New Test Corp',
      num_basic_subscriptions: 50,
      subscriptions_expiry: '2025-12-31T23:59:59.000Z'
    };
    await expect(adminAppApi.CreateOrganization(orgData)).rejects.toThrow(
      'web-nestre-api : nestre-api-manager.js Error: this._authToken is null, undefined, or an empty string'
    );
  });

  //#endregion

  //#region UpdateOrganization

  test('UpdateOrganization should return an updated organization object', async () => {
    const orgId = 'org_123';
    const orgUpdateData = {
      name: 'Updated Test Corp',
      num_basic_subscriptions: 150,
      subscriptions_expiry: '2026-12-31T23:59:59.000Z'
    };
    const updatedOrg = await adminAppApi.UpdateOrganization(orgId, orgUpdateData);
    expect(updatedOrg).toBeDefined();
    expect(updatedOrg.id).toBe(orgId);
    expect(updatedOrg.name).toBe(orgUpdateData.name);
    expect(updatedOrg.num_basic_subscriptions).toBe(orgUpdateData.num_basic_subscriptions);
  });

  test('UpdateOrganization should throw an error if organization_id is not a string', async () => {
    const orgUpdateData = { name: 'Test', num_basic_subscriptions: 1, subscriptions_expiry: '2025-01-01T00:00:00.000Z' };
    await expect(adminAppApi.UpdateOrganization(12345, orgUpdateData)).rejects.toThrow(
      'web-nestre-api : admin-app-api.js UpdateOrganization() Invalid organization_id: The organization_id must be a non-empty string.'
    );
  });

  test('UpdateOrganization should throw an error if organization_id is an empty string', async () => {
    const orgUpdateData = { name: 'Test', num_basic_subscriptions: 1, subscriptions_expiry: '2025-01-01T00:00:00.000Z' };
    await expect(adminAppApi.UpdateOrganization('', orgUpdateData)).rejects.toThrow(
      'web-nestre-api : admin-app-api.js UpdateOrganization() Invalid organization_id: The organization_id must be a non-empty string.'
    );
  });

  test('UpdateOrganization should throw an error for invalid orgUpdateData (missing name)', async () => {
    const orgUpdateData = {
      num_basic_subscriptions: 50,
      subscriptions_expiry: '2025-12-31T23:59:59.000Z'
    };
    await expect(adminAppApi.UpdateOrganization('org_123', orgUpdateData)).rejects.toThrow(
      'web-nestre-api : admin-app-api.js UpdateOrganization() Validation failed for organization_update: "name" is required'
    );
  });

  test('UpdateOrganization should throw an error for invalid orgUpdateData (bad date)', async () => {
    const orgUpdateData = {
      name: 'Test Corp',
      num_basic_subscriptions: 50,
      subscriptions_expiry: 'not-a-date'
    };
    await expect(adminAppApi.UpdateOrganization('org_123', orgUpdateData)).rejects.toThrow(
      'web-nestre-api : admin-app-api.js UpdateOrganization() Validation failed for organization_update: "subscriptions_expiry" must be in iso format'
    );
  });

  test('UpdateOrganization should throw an error if auth token is not set', async () => {
    nestreApiManager.ClearAuthToken();
    const orgUpdateData = {
      name: 'Updated Test Corp',
      num_basic_subscriptions: 150,
      subscriptions_expiry: '2026-12-31T23:59:59.000Z'
    };
    await expect(adminAppApi.UpdateOrganization('org_123', orgUpdateData)).rejects.toThrow(
      'web-nestre-api : nestre-api-manager.js Error: this._authToken is null, undefined, or an empty string'
    );
  });

  //#endregion

  //#region DeleteOrganization

  test('DeleteOrganization should resolve successfully on valid deletion', async () => {
    const orgId = 'org_123';
    // Expect the promise to resolve without a value (or with null) for a 204 response
    await expect(adminAppApi.DeleteOrganization(orgId)).resolves.toBeNull();
  });

  test('DeleteOrganization should throw an error if organization_id is not a string', async () => {
    await expect(adminAppApi.DeleteOrganization(12345)).rejects.toThrow(
      'web-nestre-api : admin-app-api.js DeleteOrganization() Invalid organization_id: The organization_id must be a non-empty string.'
    );
  });

  test('DeleteOrganization should throw an error if organization_id is an empty string', async () => {
    await expect(adminAppApi.DeleteOrganization('')).rejects.toThrow(
      'web-nestre-api : admin-app-api.js DeleteOrganization() Invalid organization_id: The organization_id must be a non-empty string.'
    );
  });

  test('DeleteOrganization should throw an error if organization_id is a string with only whitespace', async () => {
    await expect(adminAppApi.DeleteOrganization('   ')).rejects.toThrow(
      'web-nestre-api : admin-app-api.js DeleteOrganization() Invalid organization_id: The organization_id must be a non-empty string.'
    );
  });

  test('DeleteOrganization should throw an error if auth token is not set', async () => {
    nestreApiManager.ClearAuthToken();
    const orgId = 'org_123';
    await expect(adminAppApi.DeleteOrganization(orgId)).rejects.toThrow(
      'web-nestre-api : nestre-api-manager.js Error: this._authToken is null, undefined, or an empty string'
    );
  });

  //#endregion

  //#region GetOrganization

  test('GetOrganization should return an organization object on successful fetch', async () => {
    const orgId = 'org_123';
    const orgData = await adminAppApi.GetOrganization(orgId);
    expect(orgData).toBeDefined();
    expect(orgData.id).toBe(orgId);
    expect(orgData.name).toBe('Mock Org');
    expect(orgData).toHaveProperty('team_codes');
    expect(orgData).toHaveProperty('referral_codes');
    expect(Array.isArray(orgData.team_codes)).toBe(true);
    expect(Array.isArray(orgData.referral_codes)).toBe(true);
  });

  test('GetOrganization should throw an error if organization_id is not a string', async () => {
    await expect(adminAppApi.GetOrganization(12345)).rejects.toThrow(
      'web-nestre-api : admin-app-api.js GetOrganization() Invalid organization_id: The organization_id must be a non-empty string.'
    );
  });

  test('GetOrganization should throw an error if organization_id is an empty string', async () => {
    await expect(adminAppApi.GetOrganization('')).rejects.toThrow(
      'web-nestre-api : admin-app-api.js GetOrganization() Invalid organization_id: The organization_id must be a non-empty string.'
    );
  });

  test('GetOrganization should throw an error if organization_id is a string with only whitespace', async () => {
    await expect(adminAppApi.GetOrganization('   ')).rejects.toThrow(
      'web-nestre-api : admin-app-api.js GetOrganization() Invalid organization_id: The organization_id must be a non-empty string.'
    );
  });

  test('GetOrganization should throw a 404 error if organization is not found', async () => {
    const orgId = 'org_not_found';
    await expect(adminAppApi.GetOrganization(orgId)).rejects.toThrow(
      'web-nestre-api : nestre-api-manager.js API Error: 404 - Organization not found'
    );
  });

  test('GetOrganization should throw an error if auth token is not set', async () => {
    nestreApiManager.ClearAuthToken();
    const orgId = 'org_123';
    await expect(adminAppApi.GetOrganization(orgId)).rejects.toThrow(
      'web-nestre-api : nestre-api-manager.js Error: this._authToken is null, undefined, or an empty string'
    );
  });

  //#endregion

  //#region CreateTeamCodeForOrganization

  test('CreateTeamCodeForOrganization should return a success message', async () => {
    const orgId = 'org_123';
    const teamCode = { code: 'VALIDCODE', is_active: true };
    const response = await adminAppApi.CreateTeamCodeForOrganization(orgId, teamCode);
    expect(typeof response).toBe('string');
    expect(response).toContain('created successfully');
  });

  test('CreateTeamCodeForOrganization should throw an error if organization_id is not a string', async () => {
    const teamCode = { code: 'VALIDCODE', is_active: true };
    await expect(adminAppApi.CreateTeamCodeForOrganization(12345, teamCode)).rejects.toThrow(
      'web-nestre-api : admin-app-api.js CreateTeamCodeForOrganization() Invalid organization_id: The organization_id must be a non-empty string.'
    );
  });

  test('CreateTeamCodeForOrganization should throw an error if organization_id is an empty string', async () => {
    const teamCode = { code: 'VALIDCODE', is_active: true };
    await expect(adminAppApi.CreateTeamCodeForOrganization('', teamCode)).rejects.toThrow(
      'web-nestre-api : admin-app-api.js CreateTeamCodeForOrganization() Invalid organization_id: The organization_id must be a non-empty string.'
    );
  });

  test('CreateTeamCodeForOrganization should throw an error for invalid team_code (missing code)', async () => {
    const orgId = 'org_123';
    const teamCode = { is_active: true }; // Missing 'code'
    await expect(adminAppApi.CreateTeamCodeForOrganization(orgId, teamCode)).rejects.toThrow(
      'web-nestre-api : admin-app-api.js CreateTeamCodeForOrganization() Validation failed for team_code: "code" is required'
    );
  });

  test('CreateTeamCodeForOrganization should throw an error for invalid team_code (missing is_active)', async () => {
    const orgId = 'org_123';
    const teamCode = { code: 'ACODE' }; // Missing 'is_active'
    await expect(adminAppApi.CreateTeamCodeForOrganization(orgId, teamCode)).rejects.toThrow(
      'web-nestre-api : admin-app-api.js CreateTeamCodeForOrganization() Validation failed for team_code: "is_active" is required'
    );
  });

  test('CreateTeamCodeForOrganization should throw an error if team_code is null', async () => {
    const orgId = 'org_123';
    await expect(adminAppApi.CreateTeamCodeForOrganization(orgId, null)).rejects.toThrow(
      'web-nestre-api : admin-app-api.js CreateTeamCodeForOrganization() Validation failed for team_code: "value" must be of type object'
    );
  });

  test('CreateTeamCodeForOrganization should throw an error if auth token is not set', async () => {
    nestreApiManager.ClearAuthToken();
    const orgId = 'org_123';
    const teamCode = { code: 'VALIDCODE', is_active: true };
    await expect(adminAppApi.CreateTeamCodeForOrganization(orgId, teamCode)).rejects.toThrow(
      'web-nestre-api : nestre-api-manager.js Error: this._authToken is null, undefined, or an empty string'
    );
  });

  //#endregion

  //#region CreateReferralCodeForOrganization

  test('CreateReferralCodeForOrganization should return a success message', async () => {
    const orgId = 'org_123';
    const referralCode = { code: 'NEWREFCODE', is_active: true };
    const response = await adminAppApi.CreateReferralCodeForOrganization(orgId, referralCode);
    expect(typeof response).toBe('string');
    expect(response).toContain('created successfully');
  });

  test('CreateReferralCodeForOrganization should throw an error if organization_id is not a string', async () => {
    const referralCode = { code: 'VALIDCODE', is_active: true };
    await expect(adminAppApi.CreateReferralCodeForOrganization(12345, referralCode)).rejects.toThrow(
      'web-nestre-api : admin-app-api.js CreateReferralCodeForOrganization() Invalid organization_id: The organization_id must be a non-empty string.'
    );
  });

  test('CreateReferralCodeForOrganization should throw an error if organization_id is an empty string', async () => {
    const referralCode = { code: 'VALIDCODE', is_active: true };
    await expect(adminAppApi.CreateReferralCodeForOrganization('', referralCode)).rejects.toThrow(
      'web-nestre-api : admin-app-api.js CreateReferralCodeForOrganization() Invalid organization_id: The organization_id must be a non-empty string.'
    );
  });

  test('CreateReferralCodeForOrganization should throw an error for invalid referral_code (missing code)', async () => {
    const orgId = 'org_123';
    const referralCode = { is_active: true }; // Missing 'code'
    await expect(adminAppApi.CreateReferralCodeForOrganization(orgId, referralCode)).rejects.toThrow(
      'web-nestre-api : admin-app-api.js CreateReferralCodeForOrganization() Validation failed for referral_code: "code" is required'
    );
  });

  test('CreateReferralCodeForOrganization should throw an error for invalid referral_code (missing is_active)', async () => {
    const orgId = 'org_123';
    const referralCode = { code: 'ACODE' }; // Missing 'is_active'
    await expect(adminAppApi.CreateReferralCodeForOrganization(orgId, referralCode)).rejects.toThrow(
      'web-nestre-api : admin-app-api.js CreateReferralCodeForOrganization() Validation failed for referral_code: "is_active" is required'
    );
  });

  test('CreateReferralCodeForOrganization should throw an error if referral_code is null', async () => {
    const orgId = 'org_123';
    await expect(adminAppApi.CreateReferralCodeForOrganization(orgId, null)).rejects.toThrow(
      'web-nestre-api : admin-app-api.js CreateReferralCodeForOrganization() Validation failed for referral_code: "value" must be of type object'
    );
  });

  test('CreateReferralCodeForOrganization should throw an error if auth token is not set', async () => {
    nestreApiManager.ClearAuthToken();
    const orgId = 'org_123';
    const referralCode = { code: 'VALIDCODE', is_active: true };
    await expect(adminAppApi.CreateReferralCodeForOrganization(orgId, referralCode)).rejects.toThrow(
      'web-nestre-api : nestre-api-manager.js Error: this._authToken is null, undefined, or an empty string'
    );
  });

  //#endregion

  //#region CreateOrganizationMembers

  test('CreateOrganizationMembers should return a success message', async () => {
    const orgId = 'org_123';
    const membersData = {
      members: [
        {
          email: 'test@example.com',
          member_type: 'member',
          tags: ['team-a'],
          subscription_level_id: 1
        }
      ]
    };
    const response = await adminAppApi.CreateOrganizationMembers(orgId, membersData);
    expect(typeof response).toBe('string');
    expect(response).toContain('1 member(s) created successfully');
  });

  test('CreateOrganizationMembers should throw an error if organization_id is not a string', async () => {
    const membersData = { members: [] };
    await expect(adminAppApi.CreateOrganizationMembers(12345, membersData)).rejects.toThrow(
      'web-nestre-api : admin-app-api.js CreateOrganizationMembers() Invalid organization_id: The organization_id must be a non-empty string.'
    );
  });

  test('CreateOrganizationMembers should throw an error if organization_id is an empty string', async () => {
    const membersData = { members: [] };
    await expect(adminAppApi.CreateOrganizationMembers('', membersData)).rejects.toThrow(
      'web-nestre-api : admin-app-api.js CreateOrganizationMembers() Invalid organization_id: The organization_id must be a non-empty string.'
    );
  });

  test('CreateOrganizationMembers should throw an error for invalid membersData (missing members array)', async () => {
    const orgId = 'org_123';
    const membersData = {}; // Missing 'members'
    await expect(adminAppApi.CreateOrganizationMembers(orgId, membersData)).rejects.toThrow(
      'web-nestre-api : admin-app-api.js CreateOrganizationMembers() Validation failed for organization_members: "members" is required'
    );
  });

  test('CreateOrganizationMembers should throw an error for invalid membersData (empty members array)', async () => {
    const orgId = 'org_123';
    const membersData = { members: [] }; // Empty array
    await expect(adminAppApi.CreateOrganizationMembers(orgId, membersData)).rejects.toThrow(
      'web-nestre-api : admin-app-api.js CreateOrganizationMembers() Validation failed for organization_members: "members" must contain at least 1 items'
    );
  });

  test('CreateOrganizationMembers should throw an error for invalid member object (missing email)', async () => {
    const orgId = 'org_123';
    const membersData = {
      members: [{ member_type: 'member', tags: [], subscription_level_id: 1 }]
    };
    await expect(adminAppApi.CreateOrganizationMembers(orgId, membersData)).rejects.toThrow(
      'web-nestre-api : admin-app-api.js CreateOrganizationMembers() Validation failed for organization_members: "members[0].email" is required'
    );
  });

  test('CreateOrganizationMembers should throw an error if auth token is not set', async () => {
    nestreApiManager.ClearAuthToken();
    const orgId = 'org_123';
    const membersData = {
      members: [
        {
          email: 'test@example.com',
          member_type: 'member',
          tags: ['team-a'],
          subscription_level_id: 1
        }
      ]
    };
    await expect(adminAppApi.CreateOrganizationMembers(orgId, membersData)).rejects.toThrow(
      'web-nestre-api : nestre-api-manager.js Error: this._authToken is null, undefined, or an empty string'
    );
  });

  //#endregion

  //#region DeleteOrganizationMembers

  test('DeleteOrganizationMembers should return a success message', async () => {
    const orgId = 'org_123';
    const memberIds = ['member_1', 'member_2'];
    const response = await adminAppApi.DeleteOrganizationMembers(orgId, memberIds);
    expect(typeof response).toBe('string');
    expect(response).toContain('2 member(s) deleted successfully.');
  });

  test('DeleteOrganizationMembers should throw an error if organization_id is not a string', async () => {
    const memberIds = ['member_1'];
    await expect(adminAppApi.DeleteOrganizationMembers(12345, memberIds)).rejects.toThrow(
      'web-nestre-api : admin-app-api.js DeleteOrganizationMembers() Invalid organization_id: The organization_id must be a non-empty string.'
    );
  });

  test('DeleteOrganizationMembers should throw an error if organization_id is an empty string', async () => {
    const memberIds = ['member_1'];
    await expect(adminAppApi.DeleteOrganizationMembers('', memberIds)).rejects.toThrow(
      'web-nestre-api : admin-app-api.js DeleteOrganizationMembers() Invalid organization_id: The organization_id must be a non-empty string.'
    );
  });

  test('DeleteOrganizationMembers should throw an error for invalid member_ids (not an array)', async () => {
    const orgId = 'org_123';
    const memberIds = { id: 'member_1' }; // Invalid, should be an array
    await expect(adminAppApi.DeleteOrganizationMembers(orgId, memberIds)).rejects.toThrow(
      'web-nestre-api : admin-app-api.js DeleteOrganizationMembers() Validation failed for member_ids: "value" must be an array'
    );
  });

  test('DeleteOrganizationMembers should throw an error for invalid member_ids (empty array)', async () => {
    const orgId = 'org_123';
    const memberIds = []; // Invalid, must have at least one item
    await expect(adminAppApi.DeleteOrganizationMembers(orgId, memberIds)).rejects.toThrow(
      'web-nestre-api : admin-app-api.js DeleteOrganizationMembers() Validation failed for member_ids: "value" does not contain 1 required value(s)'
    );
  });

  test('DeleteOrganizationMembers should throw an error for invalid member_ids (contains non-string)', async () => {
    const orgId = 'org_123';
    const memberIds = ['member_1', 123]; // Contains a number
    await expect(adminAppApi.DeleteOrganizationMembers(orgId, memberIds)).rejects.toThrow(
      'web-nestre-api : admin-app-api.js DeleteOrganizationMembers() Validation failed for member_ids: "[1]" must be a string'
    );
  });

  test('DeleteOrganizationMembers should throw an error if auth token is not set', async () => {
    nestreApiManager.ClearAuthToken();
    const orgId = 'org_123';
    const memberIds = ['member_1'];
    await expect(adminAppApi.DeleteOrganizationMembers(orgId, memberIds)).rejects.toThrow(
      'web-nestre-api : nestre-api-manager.js Error: this._authToken is null, undefined, or an empty string'
    );
  });

  //#endregion

  //#region GetUserStats

  test('GetUserStats should return user stats object on successful fetch', async () => {
    const fromDate = new Date('2024-01-01');
    const toDate = new Date('2024-01-31');
    const stats = await adminAppApi.GetUserStats(fromDate, toDate);
    expect(stats).toBeDefined();
    expect(stats).toHaveProperty('total_users');
    expect(stats).toHaveProperty('new_users');
    expect(stats).toHaveProperty('active_users');
    expect(stats.total_users).toBe(1000);
  });

  test('GetUserStats should throw an error if from_date is not a Date object', async () => {
    const toDate = new Date();
    await expect(adminAppApi.GetUserStats('2024-01-01', toDate)).rejects.toThrow(
      'web-nestre-api : admin-app-api.js GetUserStats() Invalid from_date: The from_date must be a valid Date object.'
    );
  });

  test('GetUserStats should throw an error if to_date is not a Date object', async () => {
    const fromDate = new Date();
    await expect(adminAppApi.GetUserStats(fromDate, '2024-01-31')).rejects.toThrow(
      'web-nestre-api : admin-app-api.js GetUserStats() Invalid to_date: The to_date must be a valid Date object.'
    );
  });

  test('GetUserStats should throw an error if from_date is an invalid Date', async () => {
    const toDate = new Date();
    await expect(adminAppApi.GetUserStats(new Date('invalid-date'), toDate)).rejects.toThrow(
      'web-nestre-api : admin-app-api.js GetUserStats() Invalid from_date: The from_date must be a valid Date object.'
    );
  });

  test('GetUserStats should throw an error if to_date is an invalid Date', async () => {
    const fromDate = new Date();
    await expect(adminAppApi.GetUserStats(fromDate, new Date('invalid-date'))).rejects.toThrow(
      'web-nestre-api : admin-app-api.js GetUserStats() Invalid to_date: The to_date must be a valid Date object.'
    );
  });

  test('GetUserStats should throw an error if auth token is not set', async () => {
    nestreApiManager.ClearAuthToken();
    const fromDate = new Date('2024-01-01');
    const toDate = new Date('2024-01-31');
    await expect(adminAppApi.GetUserStats(fromDate, toDate)).rejects.toThrow(
      'web-nestre-api : nestre-api-manager.js Error: this._authToken is null, undefined, or an empty string'
    );
  });

  //#endregion

  //#region GetReferralCodeStats

  test('GetReferralCodeStats should return stats object on successful fetch with no params', async () => {
    const stats = await adminAppApi.GetReferralCodeStats(null, null, null, null, null);
    expect(stats).toBeDefined();
    expect(stats).toHaveProperty('codes');
    expect(stats).toHaveProperty('total_referred_users');
    expect(Array.isArray(stats.codes)).toBe(true);
    expect(stats.codes[0].code).toBe('REF123');
  });

  test('GetReferralCodeStats should return stats object with all params', async () => {
    const fromDate = new Date('2024-01-01');
    const toDate = new Date('2024-01-31');
    const stats = await adminAppApi.GetReferralCodeStats('Test User', 'REF123', fromDate, toDate, false);
    expect(stats).toBeDefined();
    expect(stats.codes[0].name).toBe('Test User');
  });

  test('GetReferralCodeStats should handle boolean for aggregate_codes', async () => {
    const stats = await adminAppApi.GetReferralCodeStats(null, null, null, null, true);
    expect(stats).toBeDefined();
  });

  test('GetReferralCodeStats should throw an error if from_date is not a Date object', async () => {
    await expect(adminAppApi.GetReferralCodeStats(null, null, 'not-a-date', null, null)).rejects.toThrow(
      'web-nestre-api : admin-app-api.js GetReferralCodeStats() Invalid from_date: If provided, from_date must be a valid Date object.'
    );
  });

  test('GetReferralCodeStats should throw an error if to_date is an invalid Date', async () => {
    await expect(adminAppApi.GetReferralCodeStats(null, null, new Date(), new Date('invalid'), null)).rejects.toThrow(
      'web-nestre-api : admin-app-api.js GetReferralCodeStats() Invalid to_date: If provided, to_date must be a valid Date object.'
    );
  });

  test('GetReferralCodeStats should throw an error if aggregate_codes is not a boolean', async () => {
    await expect(adminAppApi.GetReferralCodeStats(null, null, null, null, 'not-a-boolean')).rejects.toThrow(
      'web-nestre-api : admin-app-api.js GetReferralCodeStats() Invalid aggregate_codes: If provided, aggregate_codes must be a boolean.'
    );
  });

  test('GetReferralCodeStats should not throw for null or undefined optional params', async () => {
    await expect(adminAppApi.GetReferralCodeStats(undefined, null, undefined, null, undefined)).resolves.toBeDefined();
  });

  test('GetReferralCodeStats should throw an error if auth token is not set', async () => {
    nestreApiManager.ClearAuthToken();
    await expect(adminAppApi.GetReferralCodeStats(null, null, null, null, null)).rejects.toThrow(
      'web-nestre-api : nestre-api-manager.js Error: this._authToken is null, undefined, or an empty string'
    );
  });

  test('GetReferralCodeStats should correctly build a query string with all params', async () => {
    const fromDate = new Date('2024-01-01T00:00:00.000Z');
    const toDate = new Date('2024-01-31T00:00:00.000Z');
    const spy = jest.spyOn(NestreApiManager.GetInstance(), 'Request');
    await adminAppApi.GetReferralCodeStats('Test User', 'CODE1', fromDate, toDate, true);
    
    const expectedEndpoint = `admin/referral-code-stats?name=Test+User&code=CODE1&from_date=${encodeURIComponent(fromDate.toISOString())}&to_date=${encodeURIComponent(toDate.toISOString())}&aggregate_codes=true`;

    expect(spy).toHaveBeenCalledWith(expect.any(String), expectedEndpoint);
    spy.mockRestore();
  });

  test('GetReferralCodeStats should correctly build a query string with some params', async () => {
    const spy = jest.spyOn(NestreApiManager.GetInstance(), 'Request');
    await adminAppApi.GetReferralCodeStats('Test User', null, null, null, false);
    
    const expectedEndpoint = `admin/referral-code-stats?name=Test+User&aggregate_codes=false`;

    expect(spy).toHaveBeenCalledWith(expect.any(String), expectedEndpoint);
    spy.mockRestore();
  });

  test('GetReferralCodeStats should correctly build a query string with no params', async () => {
    const spy = jest.spyOn(NestreApiManager.GetInstance(), 'Request');
    await adminAppApi.GetReferralCodeStats(null, null, null, null, null);
    
    const expectedEndpoint = `admin/referral-code-stats`;

    expect(spy).toHaveBeenCalledWith(expect.any(String), expectedEndpoint);
    spy.mockRestore();
  });

  test('GetReferralCodeStats should throw a 404 error if stats are not found', async () => {
    const code = 'NOTFOUND';
    await expect(adminAppApi.GetReferralCodeStats(null, code, null, null, null)).rejects.toThrow(
      'web-nestre-api : nestre-api-manager.js API Error: 404 - Stats not found'
    );
  });

  //#endregion

  //#region GetMemberReferralCodeStats

  test('GetMemberReferralCodeStats should return stats object on successful fetch', async () => {
    const orgId = 'org_123';
    const stats = await adminAppApi.GetMemberReferralCodeStats(orgId, null, null, null);
    expect(stats).toBeDefined();
    expect(stats).toHaveProperty('codes');
    expect(stats.codes[0].name).toBe('Org Member');
  });

  test('GetMemberReferralCodeStats should return stats object with all params', async () => {
    const orgId = 'org_123';
    const fromDate = new Date('2024-01-01');
    const toDate = new Date('2024-01-31');
    const stats = await adminAppApi.GetMemberReferralCodeStats(orgId, fromDate, toDate, true);
    expect(stats).toBeDefined();
    expect(stats.codes[0].name).toBe('Org Member');
  });

  test('GetMemberReferralCodeStats should throw an error if organization_id is not a string', async () => {
    await expect(adminAppApi.GetMemberReferralCodeStats(12345, null, null, null)).rejects.toThrow(
      'web-nestre-api : admin-app-api.js GetMemberReferralCodeStats() Invalid organization_id: The organization_id must be a non-empty string.'
    );
  });

  test('GetMemberReferralCodeStats should throw an error if organization_id is an empty string', async () => {
    await expect(adminAppApi.GetMemberReferralCodeStats('', null, null, null)).rejects.toThrow(
      'web-nestre-api : admin-app-api.js GetMemberReferralCodeStats() Invalid organization_id: The organization_id must be a non-empty string.'
    );
  });

  test('GetMemberReferralCodeStats should throw an error if from_date is invalid', async () => {
    await expect(adminAppApi.GetMemberReferralCodeStats('org_123', 'not-a-date', null, null)).rejects.toThrow(
      'web-nestre-api : admin-app-api.js GetMemberReferralCodeStats() Invalid from_date: If provided, from_date must be a valid Date object.'
    );
  });

  test('GetMemberReferralCodeStats should throw an error if to_date is invalid', async () => {
    await expect(adminAppApi.GetMemberReferralCodeStats('org_123', new Date(), new Date('invalid'), null)).rejects.toThrow(
      'web-nestre-api : admin-app-api.js GetMemberReferralCodeStats() Invalid to_date: If provided, to_date must be a valid Date object.'
    );
  });

  test('GetMemberReferralCodeStats should throw an error if aggregate_codes is not a boolean', async () => {
    await expect(adminAppApi.GetMemberReferralCodeStats('org_123', null, null, 'not-a-boolean')).rejects.toThrow(
      'web-nestre-api : admin-app-api.js GetMemberReferralCodeStats() Invalid aggregate_codes: If provided, aggregate_codes must be a boolean.'
    );
  });

  test('GetMemberReferralCodeStats should throw an error if auth token is not set', async () => {
    nestreApiManager.ClearAuthToken();
    await expect(adminAppApi.GetMemberReferralCodeStats('org_123', null, null, null)).rejects.toThrow(
      'web-nestre-api : nestre-api-manager.js Error: this._authToken is null, undefined, or an empty string'
    );
  });

  test('GetMemberReferralCodeStats should correctly build a query string with all params', async () => {
    const orgId = 'org_123';
    const fromDate = new Date('2024-01-01T00:00:00.000Z');
    const toDate = new Date('2024-01-31T00:00:00.000Z');
    const spy = jest.spyOn(NestreApiManager.GetInstance(), 'Request');
    await adminAppApi.GetMemberReferralCodeStats(orgId, fromDate, toDate, true);
    
    const expectedEndpoint = `admin/organization/org_123/member-referral-code-stats?organization_id=${orgId}&from_date=${encodeURIComponent(fromDate.toISOString())}&to_date=${encodeURIComponent(toDate.toISOString())}&aggregate_codes=true`;

    expect(spy).toHaveBeenCalledWith(expect.any(String), expectedEndpoint);
    spy.mockRestore();
  });

  test('GetMemberReferralCodeStats should correctly build a query string with no optional params', async () => {
    const orgId = 'org_123';
    const spy = jest.spyOn(NestreApiManager.GetInstance(), 'Request');
    await adminAppApi.GetMemberReferralCodeStats(orgId, null, null, null);

    const expectedEndpoint = `admin/organization/org_123/member-referral-code-stats?organization_id=org_123`;

    expect(spy).toHaveBeenCalledWith(expect.any(String), expectedEndpoint);
    spy.mockRestore();
  });

  test('GetMemberReferralCodeStats should throw a 404 error if stats are not found', async () => {
    const orgId = 'org_not_found';
    await expect(adminAppApi.GetMemberReferralCodeStats(orgId, null, null, null)).rejects.toThrow(
      'web-nestre-api : nestre-api-manager.js API Error: 404 - Stats not found'
    );
  });

  //#endregion
});