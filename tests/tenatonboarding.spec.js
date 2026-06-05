const { test, expect } = require('@playwright/test');

test.setTimeout(120000);

test('Tenant Onboarding - Full Flow', async ({ page }) => {

  // =========================
  // Login
  // =========================
  await page.goto('https://pms-rent-frontend.onrender.com/#/login');

  await page.fill('input[name="username"]', 'manager');
  await page.fill('input[type="password"]', 'Manager@123');

  await page.click('button:has-text("Login")');
  await page.waitForTimeout(10000);

  // Retry if still on login page
  if (page.url().includes('/login')) {
    await page.click('button:has-text("Login")');
    await page.waitForTimeout(10000);
  }

  await expect(page).toHaveURL(/manager/, { timeout: 20000 });

  // =========================
  // Tenant → Tenant Onboarding
  // =========================
  await page.getByText('Tenants', { exact: false }).click();
  await page.waitForTimeout(2000);

  await page.getByText('Tenant Onboarding', { exact: false }).click();
  await page.waitForTimeout(4000);

  // =========================
  // Requested Tenants
  // =========================
  await page.getByText('Requested Tenants', { exact: false }).click();
  await page.waitForTimeout(2000);

  // =========================
  // Invite Tenant
  // =========================
  await page.locator('button:has-text("Invite Tenant")').click();
  await page.waitForTimeout(4000);

  // =========================
  // Select Property
  // =========================
  await page.getByText('Thousand Oaks', { exact: false }).click();
  await page.waitForTimeout(4000);

  // =========================
  // Select Unit
  // =========================
  await page.getByText('CX2', { exact: false }).click();
  await page.waitForTimeout(3000);

  // =========================
  // Assign Property
  // =========================
  await page.locator('button:has-text("Assign Property")').click();
  await page.waitForTimeout(3000);

  // =========================
  // Fill Tenant Details
  // =========================
  await page.fill('input[placeholder="First Name"]', 'Yashika');
  await page.fill('input[placeholder="Last Name"]', 'Y');
  await page.fill('input[placeholder="Email"]', 'meenakshivalarmathi+4@gmail.com');

  // Phone Number
  await page.locator('input').nth(3).fill('+15551114323');

  await page.waitForTimeout(2000);

  // =========================
  // Submit
  // =========================
  await page.locator('button:has-text("Submit")').click();
  await page.waitForTimeout(5000);

  // =========================
  // Screenshot
  // =========================
  await page.screenshot({
    path: 'TenantSubmitted.png',
    fullPage: true
  });

  console.log('Tenant onboarding submitted successfully');

});