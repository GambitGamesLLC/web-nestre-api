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

});