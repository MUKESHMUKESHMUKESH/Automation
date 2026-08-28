const { test, expect } = require('@playwright/test');
const { EndLease } = require('../Pages/End_Lease');

test.describe('End Lease Flow', () => {
  test('should login and end lease for the first occupied property', async ({ page }) => {
    const endLeasePage = new EndLease(page);

    await endLeasePage.End_lease();
  });
});