const { test, expect } = require('@playwright/test');
test.setTimeout(180000); // ✅ Increase to 180 seconds
const { loginAsManager } = require('../utils/login');
const tenantData = require('../testdata/tenantdata');
const tenant = tenantData[32];

test('Manager → Tenant Onboarding Flow', async ({ page }) => {

  // 1. Open application
  await page.goto('https://rentgeniux.onrender.com/#/login');

  // 2. Login 
  await page.locator('input[name="username"]').fill('manager');
  await page.locator('input[name="password"]').fill('Manager@123');
  await page.getByRole('button', { name: 'Login' }).click();

  // 3. Wait for dashboard
  await page.waitForURL('**/manager');

  // 4. Click Tenants sidebar
await page.locator('.lucide-chevron-down').nth(2).click();

  await page.getByRole('button', { name: 'Manage Tenant' }).click();

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
// Open in a new page
// ─── Re-login as Manager ───────────────────────────────────────────────────
const managerPage = await page.context().newPage();

// ✅ Wait for network idle so Vue app fully boots before checking DOM
await managerPage.goto('https://rentgeniux.onrender.com/#/login', { 
  waitUntil: 'networkidle',
  timeout: 60000 
});

// ✅ Wait for Vue to render — check body is not empty first
await managerPage.waitForFunction(() => document.body.children.length > 0, { timeout: 30000 });

// ✅ Now wait for the input
await managerPage.waitForSelector('input[name="username"]', { 
  state: 'visible', 
  timeout: 30000 
});

await managerPage.locator('input[name="username"]').fill('manager');
await managerPage.locator('input[name="password"]').fill('Manager@123');
await managerPage.getByRole('button', { name: 'Login' }).click();

// ✅ Wait for dashboard on managerPage
await managerPage.waitForURL('**/manager', { timeout: 60000 });
await managerPage.waitForTimeout(1000);

// ✅ All subsequent actions on managerPage
await managerPage.locator('.lucide-chevron-down').nth(2).click();

const manageLeaseBtn = managerPage.getByRole('button', { name: 'Manage Lease' });
await manageLeaseBtn.waitFor({ state: 'visible', timeout: 10000 });
await managerPage.waitForTimeout(400);
await manageLeaseBtn.click();

await managerPage.waitForTimeout(2000);

await managerPage.locator('i.q-icon.material-icons:has-text("chevron_right")').first().click();



// ✅ Wait for button to exist first
await managerPage.waitForSelector('button', { timeout: 15000 });

// ✅ Scroll into view and click in one go
const setupBtn = managerPage.getByRole('button', { name: 'Set Up Lease Document' });
await setupBtn.scrollIntoViewIfNeeded();
await setupBtn.waitFor({ state: 'visible', timeout: 10000 });
await setupBtn.click();
await managerPage.waitForTimeout(2000);

// ✅ Declare ALL dates ONCE at the top
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const tomorrowDay = tomorrow.getDate().toString();


// ✅ 1. Click Agreement Date field
await managerPage.locator('[data-field-name="agreement_date"]').click();
await managerPage.waitForTimeout(500);

// ✅ Click calendar icon
await managerPage.locator('i.q-icon.material-icons:has-text("event")').first().click();
await managerPage.waitForTimeout(1000);

// ✅ Click tomorrow in calendar
await managerPage.evaluate((day) => {
  const cells = document.querySelectorAll('td, .q-date__calendar-item button');
  for (const cell of cells) {
    if (cell.textContent.trim() === day) { cell.click(); break; }
  }
}, tomorrowDay);
await managerPage.waitForTimeout(1000);

// ✅ 2. Click Property Manager Name
await managerPage.locator('div[style*="cursor: pointer"]')
  .filter({ hasText: '[Property Manager Name]' })
  .click();
await managerPage.waitForTimeout(800);
await managerPage.waitForSelector('input[aria-label="Enter Value"]', { timeout: 10000 });
const inputs = managerPage.locator('input[aria-label="Enter Value"]');
const count = await inputs.count();
await inputs.nth(count - 1).fill('Jaya Sudharsan');
await managerPage.waitForTimeout(500);

// ✅ 3. Click Company Type
await managerPage.locator('div[style*="cursor: pointer"]')
  .filter({ hasText: '[Company Type]' })
  .click();
await managerPage.waitForTimeout(500);
const inputs2 = managerPage.locator('input[aria-label="Enter Value"]');
const count2 = await inputs2.count();
await inputs2.nth(count2 - 1).fill('Property Management');
await managerPage.waitForTimeout(500);

// ✅ 4. Click Property Manager Address
await managerPage.locator('div[style*="cursor: pointer"]')
  .filter({ hasText: '[Property Manager Address]' })
  .click();
await managerPage.waitForTimeout(500);
const inputs3 = managerPage.locator('input[aria-label="Enter Value"]');
const count3 = await inputs3.count();
await inputs3.nth(count3 - 1).fill('205 Sunset Street, Denver, 80201');
await managerPage.waitForTimeout(500);

// ✅ Scroll down to find date fields
await managerPage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await managerPage.waitForTimeout(1000);

// ✅ 5. Click Start Date field
await managerPage.locator('[data-field-name="start_date"]').click();
await managerPage.waitForTimeout(500);

// ✅ Click calendar icon for Start Date
await managerPage.locator('i.material-icons:has-text("event")').first().click();
await managerPage.waitForTimeout(1000);

// ✅ Click tomorrow using evaluate
await managerPage.evaluate((day) => {
  const cells = document.querySelectorAll('td, .q-date__calendar-item button');
  for (const cell of cells) {
    if (cell.textContent.trim() === day) { cell.click(); break; }
  }
}, tomorrowDay);
await managerPage.waitForTimeout(1000);


// ✅ 6. Click End Date field
await managerPage.locator('[data-field-name="end_date"]').click();
await managerPage.waitForTimeout(500);

const endDate = new Date(tomorrow);
endDate.setDate(endDate.getDate() + 60);
const endDay = endDate.getDate().toString();
const endMonth = endDate.toLocaleString('default', { month: 'long' }); // e.g., "August"
const endYear = endDate.getFullYear().toString(); // e.g., "2026"

console.log('Start Date:', tomorrow.toDateString());
console.log('End Date:', endDate.toDateString());
console.log('endDay:', endDay, '| endMonth:', endMonth, '| endYear:', endYear);


// ✅ Click calendar icon for End Date
await managerPage.locator('i.material-icons:has-text("event")').last().click();
await managerPage.waitForTimeout(1000);

// ✅ Click chevron_right TWICE to navigate 2 months forward
await managerPage.locator('i.q-icon.material-icons:has-text("chevron_right")').first().click();
await managerPage.waitForTimeout(500);
await managerPage.locator('i.q-icon.material-icons:has-text("chevron_right")').first().click();
await managerPage.waitForTimeout(500);

// ✅ Click end date using evaluate
await managerPage.evaluate((day) => {
  const cells = document.querySelectorAll('td, .q-date__calendar-item button');
  for (const cell of cells) {
    if (cell.textContent.trim() === day) { cell.click(); break; }
  }
}, endDay);
await managerPage.waitForTimeout(1000);


// ✅ Navigate to correct month if different from current
await managerPage.evaluate(async (targetMonth, targetYear) => {
  let attempts = 0;
  while (attempts < 12) {
    const header = document.querySelector('.q-date__header-subtitle, .q-date__header-title');
    if (header && header.textContent.includes(targetMonth) && header.textContent.includes(targetYear)) break;
    const nextBtn = document.querySelector('button[aria-label="Next month"], .q-date__arrow button');
    if (nextBtn) nextBtn.click();
    await new Promise(r => setTimeout(r, 300));
    attempts++;
  }
}, endMonth, endYear);
await managerPage.waitForTimeout(500);

// ✅ Click end date using evaluate
await managerPage.evaluate((day) => {
  const cells = document.querySelectorAll('td, .q-date__calendar-item button');
  for (const cell of cells) {
    if (cell.textContent.trim() === day) { cell.click(); break; }
  }
}, endDay);
await managerPage.waitForTimeout(1000);

// Now fill the registration form
  // 8. Screenshot
  /*await page.screenshot({
    path: 'tests/screenshots/tenant-onboarding.png',
    fullPage: true
  });*/

});