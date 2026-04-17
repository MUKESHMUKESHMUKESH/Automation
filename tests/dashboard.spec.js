const { test, expect } = require('@playwright/test');

test('Dashboard UI Validation', async ({ page }) => {

  // 🔹 Step 1: Login
  await page.goto('https://pms-rent-frontend.onrender.com/#/login');

  await page.fill('[name="username"]', 'your-username');
  await page.fill('[name="password"]', 'your-password');
  await page.click('button[type="submit"]');

  await page.waitForTimeout(5000);

  // 🔹 Step 2: Verify Dashboard URL
  await expect(page).toHaveURL(/.*manager/);

  // 🔹 Step 3: Validate Welcome Text
  await expect(page.locator('text=Hey')).toBeVisible();

  // 🔹 Step 4: Validate Cards
  await expect(page.locator('text=Total Revenue')).toBeVisible();
  await expect(page.locator('text=Occupancy Rate')).toBeVisible();
  await expect(page.locator('text=Open Tickets')).toBeVisible();
  await expect(page.locator('text=Total Rent Collected')).toBeVisible();
  await expect(page.locator('text=Outstanding Rent')).toBeVisible();

  // 🔹 Step 5: Validate Buttons
  await expect(page.locator('text=Add Property')).toBeVisible();
  await expect(page.locator('text=Add Owner')).toBeVisible();

  // 🔹 Step 6: Validate Charts Section
  await expect(page.locator('text=Yearly Revenue')).toBeVisible();
  await expect(page.locator('text=Units Status')).toBeVisible();

});