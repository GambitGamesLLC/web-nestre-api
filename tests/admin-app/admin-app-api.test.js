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

});