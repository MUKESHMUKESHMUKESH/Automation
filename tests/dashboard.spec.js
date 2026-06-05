const { test, expect } = require('@playwright/test');

test.setTimeout(120000);

test.skip('Manage Lease - Setup Lease Document', async ({ page }) => {
  await page.goto('https://pms-rent-frontend.onrender.com/#/login');

  await page.fill('input[name="username"]', 'manager');
  await page.fill('input[type="password"]', 'Manager@123');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/manager/, { timeout: 20000 });

  // Navigation
  await page.getByText('Tenants').click();
  await page.getByText('Manage Lease').click();

  // Wait for lease page
  await page.waitForLoadState('networkidle');

  // Wait until Units section appears
  await expect(page.getByText('Units')).toBeVisible({ timeout: 15000 });

  // Click CX2
  const unit = page.locator('text=CX2').first();
  await unit.waitFor({ state: 'visible', timeout: 15000 });
  await unit.click();

  // Verify invited
  await expect(page.getByText('Invited')).toBeVisible();

  // Click Setup Lease Document
  await page.getByRole('button', { name: 'Set Up Lease Document' }).click();

  await page.screenshot({
    path: 'SetupLeaseDocument.png',
    fullPage: true
  });
});