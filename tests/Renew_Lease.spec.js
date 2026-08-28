const { test, expect } = require('@playwright/test');
const { RenewLease } = require('../Pages/Renew_Lease.js');
test.setTimeout(800000);

test.describe('Renew Lease Flow', () => {
  test('should login and click occupied status on first property', async ({ page }) => {
    const renewLeasePage = new RenewLease(page);

    const occupiedValue = await renewLeasePage.renew_lease();

    // Basic assertion — adjust based on actual expected behavior after click
   
  });
});