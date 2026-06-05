const { test, expect } = require('@playwright/test');

test.setTimeout(120000);

test('Manage Lease - Setup Lease Document', async ({ page }) => {
  await page.goto('https://pms-rent-frontend.onrender.com/#/login');

  // Login
  await page.fill('input[name="username"]', 'manager');
  await page.fill('input[type="password"]', 'Manager@123');
  await page.getByRole('button', { name: 'Login' }).click();

  // Wait for dashboard
  await expect(page).toHaveURL(/manager/, { timeout: 20000 });
  await page.waitForLoadState('networkidle');

  // Navigate to Tenants
  await page.getByText('Tenants').click();
  await page.waitForTimeout(1000);

  // Navigate to Manage Lease
  await page.getByText('Manage Lease').click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  // ✅ Select first property from the list
  const firstProperty = page.locator('.q-item').first();
  await expect(firstProperty).toBeVisible({ timeout: 20000 });
  await firstProperty.click();
  
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  // ✅ After selecting property, a table with units appears
  // Find and click the first unit row from the table
  const unitRows = page.locator('tbody tr, .q-table__row, [role="row"]');
  await expect(unitRows.first()).toBeVisible({ timeout: 20000 });
  
  // Click the first unit row
  await unitRows.first().click();
  
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  // ✅ Click "Set Up Lease Document" button
  const setupBtn = page.locator('button:has-text("Set Up Lease Document"), button:has-text("Setup Lease Document"), [role="button"]:has-text("Set Up"), [role="button"]:has-text("Setup")').first();
  await expect(setupBtn).toBeVisible({ timeout: 20000 });
  await setupBtn.click();

  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);

  // ✅ Verify PDF/document preview loads
  const pdfViewer = page.locator('iframe, embed, canvas, .pdf-viewer').first();
  await expect(pdfViewer).toBeVisible({ timeout: 30000 });

  // Screenshot
  await page.screenshot({
    path: 'LeaseDocumentPDF.png',
    fullPage: true
  });

  console.log('✅ Lease Document Setup - Test Passed!');
});