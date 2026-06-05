const { test, expect } = require('@playwright/test');

test.setTimeout(120000);

test('Manager → Manage Lease → Open Action Required Property', async ({ page }) => {

  // -----------------------------
  // Login
  // -----------------------------
  await page.goto('https://pms-rent-frontend.onrender.com/#/login', {
    waitUntil: 'domcontentloaded'
  });

  await page.getByLabel('Username').fill('manager');
  await page.getByLabel('Password').fill('Manager@123');

  await page.getByRole('button', { name: 'Login' }).click();

  // Wait for dashboard
  await expect(page).toHaveURL(/manager/, { timeout: 30000 });

  // -----------------------------
  // Sidebar Navigation
  // -----------------------------
  await page.getByText('Tenants', { exact: false }).click();
  await page.getByText('Manage Lease', { exact: false }).click();

  // Wait for list to load
  await page.waitForSelector('text=Action Required', { timeout: 20000 });

  // -----------------------------
  // Locate First "Action Required" Property
  // -----------------------------
  const propertyCard = page.locator('div')
    .filter({ hasText: 'Action Required' })
    .first();

  await expect(propertyCard).toBeVisible();

  // Scroll into view (important)
  await propertyCard.scrollIntoViewIfNeeded();

  // Hover to reveal arrow (Quasar UI behavior)
  await propertyCard.hover();

  // -----------------------------
  // Click Chevron Arrow
  // -----------------------------
  const arrow = propertyCard.locator('i.material-icons', {
    hasText: 'chevron_right'
  });

  await expect(arrow).toBeVisible();

  // Try clicking arrow
  try {
    await arrow.click();
  } catch (e) {
    // Fallback: click parent container if arrow fails
    await arrow.locator('xpath=ancestor::div[1]').click();
  }

  // -----------------------------
  // Validation
  // -----------------------------
  await page.waitForLoadState('networkidle');

  // URL should change (adjust if needed)
  await expect(page).not.toHaveURL(/manage-lease/);

  // Optional UI validation
  await expect(page.locator('text=Lease')).toBeVisible({ timeout: 20000 });

  // -----------------------------
  // Screenshot
  // -----------------------------
  await page.screenshot({
    path: 'manage-lease-action-required.png',
    fullPage: true
  });

});