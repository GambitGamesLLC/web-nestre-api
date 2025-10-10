/**
 * library.test.js
 * @file Integration test for the main library entry point.
 * @description This test ensures that the main `index.js` file can be imported
 * without any module resolution errors, such as star export collisions.
 */

describe('Library Entry Point', () => {
  it('should import without any conflicting exports', async () => {
    let error = null;
    try {
      await import('../src/index.js');
    } catch (e) {
      error = e;
    }
    expect(error).toBeNull();
  });
});