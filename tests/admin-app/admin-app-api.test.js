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

});