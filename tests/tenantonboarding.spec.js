const { test, expect } = require('@playwright/test');
test.setTimeout(180000); // ✅ Increase to 180 seconds
const { loginAsManager } = require('../utils/login');
const tenantData = require('../testdata/tenantdata');
const tenant = tenantData[0];

test('Manager → Tenant Onboarding Flow', async ({ page }) => {

  // 1. Open application
  await page.goto('https://rentgeniux.onrender.com');

  // 2. Login
  await page.locator('input[name="username"]').fill('victoria');
  await page.locator('input[name="password"]').fill('Victoria@123');
  await page.getByRole('button', { name: 'Login' }).click();

  // 3. Wait for dashboard
  await page.waitForURL('**/manager');

  // 4. Click Tenants sidebar
await page.locator('.lucide-chevron-down').nth(2).click();

  await page.getByRole('button', { name: 'Tenant Onboarding' }).click();

  await page.waitForTimeout(2000);

  await page.getByText('Onboard Tenant').click();

  await page.locator('.property-card-content').first().click();
   await page.waitForTimeout(2000);

   await page.getByRole('button', { name: 'Assign Property' }).nth(0).click();
   await page.waitForTimeout(2000);

// Fill First Name
await page.locator('input[placeholder="First Name"]').first().fill(tenant.firstName);

// Fill Last Name
await page.locator('input[placeholder="Last Name"]').first().fill(tenant.lastName);

// Fill Email
await page.locator('input[placeholder="Email"]').first().fill(tenant.email);

// Fill Phone Number
await page.locator('input[placeholder="+1 555 111 6985"]').first().fill(tenant.phone);

await page.waitForTimeout(1000);

// Click Submit button
await page.locator('button.submit-btn').first().click();

// One-time setup: login manually, then save storage state
// node script:
const { getOnboardingLink } = require('../utils/gmail');

// ... after Submit button click ...
await page.waitForTimeout(10000);

const onboardingLink = await getOnboardingLink();
console.log('Registration Link:', onboardingLink);

if (!onboardingLink) {
  throw new Error('Registration link not found');
}

const formPage = await page.context().newPage();
await formPage.goto(onboardingLink);
await formPage.waitForTimeout(2000);

// Fill emergency contact number
await formPage.locator('input[placeholder="e.g., +1 555 111 6985"]').fill(tenant.emergencyContact);

// Fill address
// Fill address with "ad" and select first suggestion
await formPage.locator('input[placeholder="e.g., 128, Sunshine Tower, Bokes Street"]').fill(tenant.address);

await formPage.waitForTimeout(1000);

// Click first option from dropdown
await formPage.locator('.q-menu .q-item, [role="listbox"] >> nth=0').first().click();


await formPage.waitForSelector('button.add-btn:not([disabled])', { timeout: 10000 });
await formPage.locator('button.add-btn').click();

// Upload first file
await formPage.locator('input[type="file"]').nth(0).setInputFiles(tenant.document1);

// Upload second file
// Upload ID Proof - find the "Choose file" link near ID Proof label
await formPage.locator('div').filter({ hasText: /^ID Proof/ }).locator('input[type="file"]').setInputFiles(tenant.document2);

await formPage.locator('button.add-btn').click();
// Fill username
await formPage.locator('input[name="username"]').fill(tenant.username);

// Fill password
await formPage.locator('input[name="password"]').fill(tenant.password);

// Fill confirm password
// Fill confirm password (second password field)
await formPage.locator('input[type="password"]').nth(1).fill(tenant.confirmPassword);
await formPage.getByRole('button', { name: 'Create' }).click();
await formPage.waitForTimeout(10000);

// ─── Re-login as Manager ───────────────────────────────────────────────────
// ─── Re-login as Manager ───────────────────────────────────────────────────
await page.bringToFront();
await page.goto('https://rentgeniux.onrender.com');

// Wait for login page to load
await page.waitForSelector('input[name="username"]', { timeout: 10000 });

await page.locator('input[name="username"]').fill('victoria');
await page.locator('input[name="password"]').fill('Victoria@123');
await page.getByRole('button', { name: 'Login' }).click();
await page.waitForURL('**/manager', { timeout: 30000 });
await page.waitForTimeout(2000);

// Navigate to Manage Lease
await page.locator('.lucide-chevron-down').nth(2).click();
await page.waitForTimeout(1000);
await page.getByRole('button', { name: 'Manage Lease' }).click();
await page.waitForTimeout(2000);

await page.locator('i.q-icon.material-icons:has-text("chevron_right")').first().click();

await page.locator('.q-item__label').filter({ hasText: tenant.u }).click();
// Now fill the registration form
  // 8. Screenshot
  /*await page.screenshot({
    path: 'tests/screenshots/tenant-onboarding.png',
    fullPage: true
  });*/

});