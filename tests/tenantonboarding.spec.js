const { test, expect } = require('@playwright/test');
test.setTimeout(700000); // ✅ Increase to 180 seconds
const { loginAsManager } = require('../utils/login');
const tenantData = require('../testdata/tenantdata');
const tenant = tenantData[1];
  
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
await page.waitForTimeout(10000);

  const profileItem = page.locator('.q-item', { hasText: 'jaya sudharsan' });
  await profileItem.waitFor({ state: 'visible', timeout: 10000 });
  await profileItem.click();

  // Step 8: Click "Logout" menu item to open confirmation dialog
  await page.locator('.q-item__section--main', { hasText: 'Logout' }).click();

  // Step 9: Wait for confirmation dialog and click the actual Logout button
  await page.waitForSelector('.logout-card');
  await Promise.all([
    page.waitForURL('**/#/login**', { timeout: 60000 }),
    page.locator('.logout-card .btn-logout').click(),
    
  ]);


await page.waitForTimeout(2000);

// One-time setup: login manually, then save storage state
// node script:
const { getOnboardingLink } = require('../utils/gmail');

// ... after Submit button click ...
await page.waitForTimeout(30000);

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
// Document 1 - Address Proof
await formPage.locator('input.q-field__native[placeholder="XXX-XX-XXXX"]').click();
await formPage.waitForTimeout(500);
await formPage.locator('input.q-field__native[placeholder="XXX-XX-XXXX"]').pressSequentially(tenant.ssn, { delay: 150 });
await formPage.waitForTimeout(500);
console.log('✅ SSN filled!');

// ✅ Document 1 - Address Proof
await formPage.locator('div').filter({ hasText: /^Address Proof/ })
  .locator('input[type="file"]').setInputFiles(tenant.document1);
await formPage.waitForTimeout(1000);
console.log('✅ Address Proof uploaded!');

// ✅ Document 2 - ID Proof
await formPage.locator('div').filter({ hasText: /^ID Proof/ })
  .locator('input[type="file"]').setInputFiles(tenant.document1);
await formPage.waitForTimeout(1000);
console.log('✅ ID Proof uploaded!');

// ✅ Document 3 - Tax Report
await formPage.locator('div').filter({ hasText: /^Proof Of Tax ID\/SSN/ })
  .locator('input[type="file"]').setInputFiles(tenant.document1);
await formPage.waitForTimeout(1000);
console.log('✅ Tax Report uploaded!');

// ✅ Document 4 - Credit Report
await formPage.locator('div').filter({ hasText: /^Credit Report/ })
  .locator('input[type="file"]').setInputFiles(tenant.document1);
await formPage.waitForTimeout(1000);
console.log('✅ Credit Report uploaded!');

await formPage.getByRole('button', { name: 'Next' }).click();
console.log('✅ Add button clicked!');
await formPage.waitForTimeout(3000);
// Fill username
await formPage.locator('input[name="username"]').fill(tenant.username);

// Fill password
await formPage.locator('input[name="password"]').fill(tenant.password);

// Fill confirm password
// Fill confirm password (second password field)
await formPage.locator('input[type="password"]').nth(1).fill(tenant.confirmPassword);
await formPage.getByRole('button', { name: 'Create' }).click();
await formPage.waitForTimeout(10000);

await formPage.close();

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


// ✅ 1. Click Property Manager Name
await managerPage.locator('div[style*="cursor: pointer"]')
  .filter({ hasText: '[Property Manager Name]' })
  .click();
await managerPage.waitForTimeout(500);
let inputs = managerPage.locator('input[aria-label="Enter Value"]');
let count = await inputs.count();
await inputs.nth(count - 1).fill('Jaya Sudharsan');
// ✅ Double click to confirm and remove validation error
await inputs.nth(count - 1).dblclick();
await managerPage.waitForTimeout(500);

// ✅ Click outside
await managerPage.mouse.click(700, 400);
await managerPage.waitForTimeout(300);

// ✅ 2. Click Company Type
await managerPage.locator('div[style*="cursor: pointer"]')
  .filter({ hasText: '[Company Type]' })
  .click();
await managerPage.waitForTimeout(500);
inputs = managerPage.locator('input[aria-label="Enter Value"]');
count = await inputs.count();
await inputs.nth(count - 1).fill('Property Management');
// ✅ Double click to confirm
await inputs.nth(count - 1).dblclick();
await managerPage.waitForTimeout(500);

// ✅ Click outside
await managerPage.mouse.click(700, 400);
await managerPage.waitForTimeout(300);

// ✅ 3. Click Property Manager Address
await managerPage.locator('div[style*="cursor: pointer"]')
  .filter({ hasText: '[Property Manager Address]' })
  .click();
await managerPage.waitForTimeout(500);
inputs = managerPage.locator('input[aria-label="Enter Value"]');
count = await inputs.count();
await inputs.nth(count - 1).fill('205 Sunset Street, Denver, 80201');
// ✅ Double click to confirm
await inputs.nth(count - 1).dblclick();
await managerPage.waitForTimeout(500);

// ✅ Click outside
await managerPage.mouse.click(700, 400);
await managerPage.waitForTimeout(300);



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

// ✅ Pass as single object instead of two arguments
await managerPage.evaluate(async ({ targetMonth, targetYear }) => {
  let attempts = 0;
  while (attempts < 12) {
    const header = document.querySelector('.q-date__header-subtitle, .q-date__header-title');
    if (header && header.textContent.includes(targetMonth) && header.textContent.includes(targetYear)) break;
    const nextBtn = document.querySelector('button[aria-label="Next month"], .q-date__arrow button');
    if (nextBtn) nextBtn.click();
    await new Promise(r => setTimeout(r, 300));
    attempts++;
  }
}, { targetMonth: endMonth, targetYear: endYear }); // ✅ pass as object

// ✅ Click end date using evaluate
await managerPage.evaluate((day) => {
  const cells = document.querySelectorAll('td, .q-date__calendar-item button');
  for (const cell of cells) {
    if (cell.textContent.trim() === day) { cell.click(); break; }
  }
}, endDay);
await managerPage.waitForTimeout(1000);


await managerPage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await managerPage.waitForTimeout(500);



// ✅ Create Lease
await managerPage.getByRole('button', { name: 'Create Lease' }).click();
await managerPage.waitForTimeout(10000);


// ✅ Click the profile tab in sidebar
await managerPage.locator('.q-item:has(.q-avatar__content img)').click();
console.log('✅ Profile tab clicked!');

// ✅ Wait for dropdown card to appear


await managerPage.locator('.q-item.text-negative:has(i.material-icons:text("logout"))').click();

await managerPage.waitForSelector('.logout-card', { state: 'visible' });
await managerPage.waitForTimeout(1000);

// ✅ Step 5: Confirm Logout
await managerPage.locator('.logout-card .btn-logout').click();

await managerPage.waitForTimeout(5000);
console.log('✅ Logout confirmed!');


 await managerPage.locator('input[name="username"]').fill(tenant.username);
  await managerPage.locator('input[name="password"]').fill(tenant.password);
  await managerPage.getByRole('button', { name: 'Login' }).click();

  await managerPage.waitForTimeout(20000);

   await managerPage.getByRole('button', { name: 'Sign Lease' }).click();

   await managerPage.waitForTimeout(5000);

  
await managerPage.waitForLoadState('networkidle');

// Scroll down to the bottom of the lease document
// Scroll inside the lease document iframe or inner container
// Scroll down inside the lease document
await managerPage.keyboard.press('End');
await managerPage.waitForTimeout(2000);

// Or use mouse wheel to scroll down
await managerPage.mouse.wheel(0, 7100);
await managerPage.waitForTimeout(2000);


await managerPage.locator('[data-field-name="tenant_signature"]').click();

await managerPage.locator('input[placeholder="Enter first name"]').fill(tenant.firstName);
await managerPage.locator('input[placeholder="Enter last name"]').fill(tenant.lastName);

await managerPage.locator('button.submit-btn').click();
await managerPage.waitForTimeout(2000);

// Click the sign date field
await managerPage.locator('[data-field-name="tenant_sign_date"]').click();

// Click the calendar icon
await managerPage.locator('i.material-icons').filter({ hasText: 'event' }).click();

const today = new Date();
const day = today.getDate().toString();

// Use exact match instead of substring match
await managerPage
  .locator('.q-date__calendar-item--in button')
  .filter({ hasText: new RegExp(`^${day}$`) })
  .click();

// Confirm selection

// Click Upload Lease
await managerPage.locator('span.block', { hasText: 'Upload Lease' }).click();

await managerPage.waitForTimeout(5000);

// Click Logout
await managerPage.locator('span.text-h7', { hasText: 'Log Out' }).click();

await managerPage.locator('.q-card').getByRole('button', { name: 'OK' }).click();

// Wait for loader to disappear
await managerPage.locator('.custom-loader-container').waitFor({ state: 'hidden', timeout: 10000 });

await managerPage.locator('input[name="username"]').fill('manager');
await managerPage.locator('input[name="password"]').fill('Manager@123');

// Wait for loader again before clicking
await managerPage.locator('.custom-loader-container').waitFor({ state: 'hidden', timeout: 10000 });
await managerPage.getByRole('button', { name: 'Login' }).click();
// ✅ Wait for dashboard on managerPage

// ✅ All subsequent actions on managerPage
await managerPage.locator('.lucide-chevron-down').nth(2).click();

const manageLeaseBtn1 = managerPage.getByRole('button', { name: 'Manage Lease' });
await manageLeaseBtn.waitFor({ state: 'visible', timeout: 10000 });
await managerPage.waitForTimeout(400);
await manageLeaseBtn.click();

await managerPage.waitForTimeout(2000);

await managerPage.locator('i.q-icon.material-icons:has-text("chevron_right")').first().click();



// ✅ Wait for button to exist first
await managerPage.waitForSelector('button', { timeout: 15000 });

// ✅ Scroll into view and click in one go
await managerPage.getByRole('button', { name: 'Activate Lease' }).click();
await managerPage.waitForTimeout(2000);

await managerPage.locator('.q-dialog-plugin').getByRole('button', { name: 'Proceed to Sign' }).click();
  
await managerPage.waitForLoadState('networkidle');

// scrolling in Manager Lease Document
await managerPage.keyboard.press('End');
await managerPage.waitForTimeout(2000);

// Or use mouse wheel to scroll down
await managerPage.mouse.wheel(0, 7100);
await managerPage.waitForTimeout(2000);


await managerPage.locator('[data-field-name="manager_signature"]').click();

await managerPage.locator('input[placeholder="Enter first name"]').fill('Jeyasudhrasun');
await managerPage.locator('input[placeholder="Enter last name"]').fill('S');

await managerPage.locator('button.submit-btn').click();


// Click the sign date field
await managerPage.locator('[data-field-name="manager_sign_date"]').click();

// Click the calendar icon
await managerPage.locator('i.material-icons').filter({ hasText: 'event' }).click();

// Select today's date
const today_tenant = new Date();
const day_tenant = today.getDate().toString();
await managerPage.locator('.q-date__calendar-item--in button').filter({ hasText: day }).first().click();

// Confirm selection

// Click Upload Lease
await managerPage.locator('span.block', { hasText: 'Activate Lease' }).click();

await managerPage.waitForTimeout(2000);


// Now fill the registration form
  // 8. Screenshot
  /*await page.screenshot({
    path: 'tests/screenshots/tenant-onboarding.png',
    fullPage: true
  });*/

});