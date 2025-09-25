/**
 * organization-api.test.js
 * @file Unit tests for the OrganizationApi class.
 * @description This file provides a comprehensive test suite for the `organization-api.js` script,
 * validating each method that interacts with the organization-related API endpoints.
 * It uses a mock server using the `msw` library package to test request/response flows without hitting a real server.
 * @requires {NestreApiManager}
 * @requires {msw}
 */

//#region IMPORTS

// Import what we want to test
import { NestreApiManager } from '../../src/nestre-api-manager.js';

//Import the BASE_URL from our environment-variables.js
import { API_BASE_URL } from '../../examples/environment-variables.js';

//Import the API_VERSION from our environment-variables.js
import { API_VERSION } from '../../examples/environment-variables.js';

//Import the AUTH_TOKEN from our environment-variables.js
import { AUTH_TOKEN } from '../../examples/environment-variables.js';

import { server } from '../mocks/server.js';
import { http, HttpResponse } from 'msw';

/**
 * @typedef {import('../../src/organization/organization-types.js').Organizations } Organizations
 * @typedef {import('../../src/organization/organization-types.js').OrganizationMembers } OrganizationMembers
 * @typedef {import('../../src/organization/organization-types.js').OrganizationUserDetails } OrganizationUserDetails
 * @typedef {import('../../src/organization/organization-types.js').OrganizationData } OrganizationData
 */

//#endregion

//#region DESCRIBE - organization-api.js - constructor()

describe( "organization-api.js constructor", ()=>
{

    it("should create an instance of the OrganizationApi object", ()=>
    {

        //Arrange
         NestreApiManager.instance = null;

        //Act
        const manager = NestreApiManager.GetInstance();

        //Assert
        expect( manager.organizationApi ).not.toBe( null );
        expect( manager.organizationApi ).toBeDefined();

    })

});

//#endregion

//#region DESCRIBE - organization-api.js - GetOrganizationById()

describe( "organization-api.js GetOrganizationById()", () =>
{
    beforeEach(() => {
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetApiVersion(API_VERSION);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);
    });

    it('should fetch organization data by ID successfully', async () =>
    {
        // Arrange
        const organizationApi = NestreApiManager.GetInstance().organizationApi;
        const organization_id = 'org_123';

        // Act
        const organizationData = await organizationApi.GetOrganizationById(organization_id);

        // Assert
        expect(organizationData).toBeDefined();
        expect(organizationData.id).toBe("org_123_data");
        expect(organizationData.name).toBe("Nestre Organization");
        expect(organizationData.num_basic_subscriptions).toBe(100);
    });
});

//#endregion

//#region DESCRIBE - organization-api.js - GetOrganizationById() - Error Handling

describe("organization-api.js GetOrganizationById() - Error Handling", () => {

    beforeEach(() => {
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetApiVersion(API_VERSION);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);
    });

    it('should throw an error for an invalid organization_id', async () => {
        // Arrange
        const organizationApi = NestreApiManager.GetInstance().organizationApi;

        // Act & Assert
        await expect(organizationApi.GetOrganizationById("")).rejects.toThrow('web-nestre-api : organization-api.js GetOrganizationById() Invalid organization_id: The organization_id must be a non-empty string.');
    });

    it('should throw an error if the organization is not found', async () => {
        // Arrange
        const organizationApi = NestreApiManager.GetInstance().organizationApi;

        // Act & Assert
        await expect(organizationApi.GetOrganizationById("org_not_found")).rejects.toThrow('web-nestre-api : nestre-api-manager.js API Error: 404 - Organization not found');
    });

    it('should throw an error if no auth token is provided', async () => {
        // Arrange
        NestreApiManager.GetInstance().ClearAuthToken();
        const organizationApi = NestreApiManager.GetInstance().organizationApi;

        // Act & Assert
        await expect(organizationApi.GetOrganizationById("org_123")).rejects.toThrow('web-nestre-api : nestre-api-manager.js Error: this._authToken is null, undefined, or an empty string');
    });
});

//#endregion

//#region DESCRIBE - organization-api.js - GetUserDetails()

describe( "organization-api.js GetUserDetails()", () =>
{
    beforeEach(() => {
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetApiVersion(API_VERSION);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);
    });

    it('should fetch user details for an organization successfully', async () =>
    {
        // Arrange
        const organizationApi = NestreApiManager.GetInstance().organizationApi;
        const organization_id = 'org_123';

        // Act
        const userDetails = await organizationApi.GetUserDetails(organization_id, null, null);

        // Assert
        expect(Array.isArray(userDetails)).toBe(true);
        expect(userDetails.length).toBeGreaterThan(0);
        expect(userDetails[0].id).toBe("user_1");
        expect(userDetails[0].email).toBe("member1@nestre.com");
        expect(userDetails[0].firstname).toBe("Alice");
    });

    it('should fetch user details filtered by email search string successfully', async () =>
    {
        // Arrange
        const organizationApi = NestreApiManager.GetInstance().organizationApi;
        const organization_id = 'org_123';
        const email_search_string = 'member2';

        // Act
        const userDetails = await organizationApi.GetUserDetails(organization_id, null, email_search_string);

        // Assert
        expect(Array.isArray(userDetails)).toBe(true);
        expect(userDetails.length).toBe(1);
        expect(userDetails[0].id).toBe("user_2");
        expect(userDetails[0].email).toBe("member2@nestre.com");
    });

    it('should fetch all user details if tag is provided but not used for filtering (as per mock)', async () => {
        // Arrange
        const organizationApi = NestreApiManager.GetInstance().organizationApi;
        const organization_id = 'org_123';
        const tag = 'teamA'; // Tag is ignored by the mock for GetUserDetails

        // Act
        const userDetails = await organizationApi.GetUserDetails(organization_id, tag, null);

        // Assert
        expect(Array.isArray(userDetails)).toBe(true);
        expect(userDetails.length).toBe(2); // Should return all mock users as tag isn't filtered
        expect(userDetails[0].id).toBe("user_1");
    });
});

//#endregion

//#region DESCRIBE - organization-api.js - GetUserDetails() - Error Handling

describe("organization-api.js GetUserDetails() - Error Handling", () => {

    beforeEach(() => {
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetApiVersion(API_VERSION);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);
    });

    it('should throw an error for an invalid organization_id', async () => {
        // Arrange
        const organizationApi = NestreApiManager.GetInstance().organizationApi;

        // Act & Assert
        await expect(organizationApi.GetUserDetails("", null, null)).rejects.toThrow('web-nestre-api : organization-api.js GetUserDetails() Invalid organization_id: The organization_id must be a non-empty string.');
    });

    it('should throw an error for an invalid tag', async () => {
        // Arrange
        const organizationApi = NestreApiManager.GetInstance().organizationApi;

        // Act & Assert
        await expect(organizationApi.GetUserDetails("org_123", 123, null)).rejects.toThrow('web-nestre-api : organization-api.js GetUserDetails() Invalid tag: If provided, the tag must be a string.');
    });

    it('should throw an error for an invalid email_search_string (too short)', async () => {
        // Arrange
        const organizationApi = NestreApiManager.GetInstance().organizationApi;

        // Act & Assert
        await expect(organizationApi.GetUserDetails("org_123", null, "ab")).rejects.toThrow('web-nestre-api : organization-api.js GetUserDetails() Invalid email_search_string: If provided, the email_search_string must be a string with at least 3 characters.');
    });

    it('should throw an error if the organization is not found', async () => {
        // Arrange
        const organizationApi = NestreApiManager.GetInstance().organizationApi;

        // Act & Assert
        await expect(organizationApi.GetUserDetails("org_not_found", null, null)).rejects.toThrow('web-nestre-api : nestre-api-manager.js API Error: 404 - Organization not found');
    });

    it('should throw an error if no auth token is provided', async () => {
        // Arrange
        NestreApiManager.GetInstance().ClearAuthToken();
        const organizationApi = NestreApiManager.GetInstance().organizationApi;

        // Act & Assert
        await expect(organizationApi.GetUserDetails("org_123", null, null)).rejects.toThrow('web-nestre-api : nestre-api-manager.js Error: this._authToken is null, undefined, or an empty string');
    });
});

//#endregion

//#region DESCRIBE - organization-api.js - GetMembers()

describe( "organization-api.js GetMembers()", () =>
{
    beforeEach(() => {
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetApiVersion(API_VERSION);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);
    });

    it('should fetch members for an organization successfully', async () =>
    {
        // Arrange
        const organizationApi = NestreApiManager.GetInstance().organizationApi;
        const organization_id = 'org_123';

        // Act
        const members = await organizationApi.GetMembers(organization_id, null, null);

        // Assert
        expect(Array.isArray(members)).toBe(true);
        expect(members.length).toBeGreaterThan(0);
        expect(members[0].id).toBe("user_1");
        expect(members[0].email).toBe("member1@nestre.com");
    });

    it('should fetch members filtered by tag successfully', async () =>
    {
        // Arrange
        const organizationApi = NestreApiManager.GetInstance().organizationApi;
        const organization_id = 'org_123';
        const tag = 'teamB';

        // Act
        const members = await organizationApi.GetMembers(organization_id, tag, null);

        // Assert
        expect(Array.isArray(members)).toBe(true);
        expect(members.length).toBe(1);
        expect(members[0].id).toBe("user_2");
    });

    it('should fetch members filtered by email search string successfully', async () =>
    {
        // Arrange
        const organizationApi = NestreApiManager.GetInstance().organizationApi;
        const organization_id = 'org_123';
        const email_search_string = 'member2';

        // Act
        const members = await organizationApi.GetMembers(organization_id, null, email_search_string);

        // Assert
        expect(Array.isArray(members)).toBe(true);
        expect(members.length).toBe(1);
        expect(members[0].id).toBe("user_2");
    });
});

//#endregion

//#region DESCRIBE - organization-api.js - GetMembers() - Error Handling

describe("organization-api.js GetMembers() - Error Handling", () => {

    beforeEach(() => {
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetApiVersion(API_VERSION);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);
    });

    it('should throw an error for an invalid organization_id', async () => {
        // Arrange
        const organizationApi = NestreApiManager.GetInstance().organizationApi;

        // Act & Assert
        await expect(organizationApi.GetMembers("", null, null)).rejects.toThrow('web-nestre-api : organization-api.js GetMembers() Invalid organization_id: The organization_id must be a non-empty string.');
    });

    it('should throw an error for an invalid tag', async () => {
        // Arrange
        const organizationApi = NestreApiManager.GetInstance().organizationApi;

        // Act & Assert
        await expect(organizationApi.GetMembers("org_123", 123, null)).rejects.toThrow('web-nestre-api : organization-api.js GetMembers() Invalid tag: If provided, the tag must be a string.');
    });

    it('should throw an error for an invalid email_search_string (too short)', async () => {
        // Arrange
        const organizationApi = NestreApiManager.GetInstance().organizationApi;

        // Act & Assert
        await expect(organizationApi.GetMembers("org_123", null, "ab")).rejects.toThrow('web-nestre-api : organization-api.js GetMembers() Invalid email_search_string: If provided, the email_search_string must be a string with at least 3 characters.');
    });

    it('should throw an error if the organization is not found', async () => {
        // Arrange
        const organizationApi = NestreApiManager.GetInstance().organizationApi;

        // Act & Assert
        await expect(organizationApi.GetMembers("org_not_found", null, null)).rejects.toThrow('web-nestre-api : nestre-api-manager.js API Error: 404 - Organization not found');
    });

    it('should throw an error if no auth token is provided', async () => {
        // Arrange
        NestreApiManager.GetInstance().ClearAuthToken();
        const organizationApi = NestreApiManager.GetInstance().organizationApi;

        // Act & Assert
        await expect(organizationApi.GetMembers("org_123", null, null)).rejects.toThrow('web-nestre-api : nestre-api-manager.js Error: this._authToken is null, undefined, or an empty string');
    });
});

//#endregion

//#region DESCRIBE - organization-api.js - ListOrganizations()

describe( "organization-api.js ListOrganizations()", () =>
{
    it('should fetch a list of organizations successfully', async () =>
    {
        // Arrange
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetApiVersion(API_VERSION);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);

        const organizationApi = NestreApiManager.GetInstance().organizationApi;

        // Act
        const organizations = await organizationApi.ListOrganizations();

        // Assert
        expect(Array.isArray(organizations)).toBe(true);
        expect(organizations.length).toBeGreaterThan(0);
        expect(organizations[0].id).toBe("org_123");
        expect(organizations[0].name).toBe("Nestre");
    });

});

//#endregion

//#region DESCRIBE - organization-api.js - ListOrganizations() - Error Handling

describe("organization-api.js ListOrganizations() - Error Handling", () => {

    beforeEach(() => {
        NestreApiManager.instance = null;
        NestreApiManager.GetInstance().SetBaseUrl(API_BASE_URL);
        NestreApiManager.GetInstance().SetApiVersion(API_VERSION);
        NestreApiManager.GetInstance().SetAuthToken(AUTH_TOKEN);
    });

    it('should throw an error if the API returns a 404', async () => {
        // Arrange
        const organizationApi = NestreApiManager.GetInstance().organizationApi;
        
        // Temporarily modify the ListOrganizations to hit the 404 endpoint for this test
        const originalListOrganizations = organizationApi.ListOrganizations;
        organizationApi.ListOrganizations = () => NestreApiManager.GetInstance().Request( 'GET', `org/list-with-tags-404`);

        // Act & Assert
        await expect(organizationApi.ListOrganizations()).rejects.toThrow('web-nestre-api : nestre-api-manager.js API Error: 404 - Not Found');

        organizationApi.ListOrganizations = originalListOrganizations;
    });

    it('should throw an error if no auth token is provided', async () => {
        // Arrange
        NestreApiManager.GetInstance().ClearAuthToken();
        const organizationApi = NestreApiManager.GetInstance().organizationApi;

        // Act & Assert
        await expect(organizationApi.ListOrganizations()).rejects.toThrow('web-nestre-api : nestre-api-manager.js Error: this._authToken is null, undefined, or an empty string');
    });
});

//#endregion