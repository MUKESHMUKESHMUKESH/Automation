// @ts-check
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../Pages/Manager_Login');


test.setTimeout(200000); // ✅ Increase to 180 seconds

const maintenanceData = require('../testdata/maintenancedata');
const maintenance = maintenanceData[0];

test('Manager → Maintenance → Create Request Flow', async ({ page }) => {


     const loginPage = new LoginPage(page);
    await loginPage.login();
  // 3. Wait for dashboard
  await page.waitForURL('**/manager');

  // 4. Click sidebar
  await page.getByText('Maintenance Requests').click();

  // 5. Validate navigation
  await expect(page).toHaveURL(/manager\/requests/);

  // 6. Wait for button to be visible
  const createBtn = page.getByRole('button', { name: 'Create Requests' });
  await expect(createBtn).toBeVisible({ timeout: 100000 });

  // 7. Click Create Requests
  await createBtn.click();

  // 8. Validate next page
  await expect(page).toHaveURL(/manager\/raiserequest/);

  // 9. Select first dropdown (Property)
  await page.locator('i.q-select__dropdown-icon').first().click();
  await page.locator('[role="option"]').nth(0).click();

  await page.waitForTimeout(2000);

  // 10. Select Category dropdown
  await page.locator('i.q-select__dropdown-icon').nth(1).click();

await page.getByRole('option', { name: maintenance.category, exact: true }).click(); // ✅ Using test data

  await page.waitForTimeout(2000);

  // 11. Fill Description
  await page.locator('textarea.q-field__native.q-placeholder').first().fill(maintenance.description); // ✅ Using test data

  // Click the calendar icon
await page.locator('i.q-icon.material-icons.cursor-pointer').click();

await page.waitForTimeout(1000);

// Click tomorrow's date
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const tomorrowDate = tomorrow.getDate().toString();
const tomorrowMonth_q = tomorrow.getMonth();
const todayMonth = new Date().getMonth();

// Open date picker
await page.waitForSelector('.q-date__calendar-item', { state: 'visible' });
await page.waitForTimeout(500);

// If tomorrow falls in next month, click the next arrow first
if (tomorrowMonth_q !== todayMonth) {
  await page.locator('i.material-icons:has-text("chevron_right")').nth(0).click();
  await page.waitForTimeout(500);
  console.log('✅ Navigated to next month!');
}

// Click the date (exact match to avoid matching 10, 21, etc.)
await page.locator('.q-date__calendar-item button')
  .filter({ hasText: new RegExp(`^${tomorrowDate}$`) })
  .click();
await page.waitForTimeout(500);
console.log('✅ Tomorrow date selected!');

await page.locator('i.q-select__dropdown-icon').nth(3).click();
await page.getByRole('option', { name: /morning/i }).click();
console.log('✅ Morning slot selected!');

// Or by first option
await page.locator('i.q-select__dropdown-icon').nth(2).click();
await page.locator('[role="option"]').first().click();
  await page.waitForTimeout(2000);

  await page.getByRole('button', { name: 'Submit Request' }).click();
  await page.waitForTimeout(3000);

// Click the more options icon
await page.locator('i.q-icon.material-icons:has-text("more_horiz")').first().click();

await page.locator('.q-menu .q-item').filter({ hasText: 'Approve' }).click();

await page.locator('i.q-icon.material-icons:has-text("more_vert")').first().click();
await page.locator('.q-menu .q-item').filter({ hasText: 'Assign' }).click();


await page.waitForTimeout(2000);

// Click Select Vendor button under Jackie
await page.getByRole('button', { name: 'Select Vendor' }).nth(1).click();



await page.waitForTimeout(2000);

// Select Tenant Available Date

// Click the Tenant Available Date dropdown
await page.locator('i.q-select__dropdown-icon').first().click();

// Select the first available date option from the dropdown
await page.locator('.q-menu .q-item').first().click();

// Enter Estimate Amount
// Click on the estimate amount field
await page.locator('.q-dialog input[placeholder="Enter an estimate amount"]').click();
await page.waitForTimeout(500);

// Clear and type using keyboard
await page.keyboard.press('Control+A');
await page.keyboard.type('500');

await page.waitForTimeout(3000);

// Wait for Assign button to enable
// Force click the Assign button even if disabled
await page.locator('.q-dialog button.bg-green').click({ force: true });

await page.waitForTimeout(1000);

// Click Assign button
await page.locator('i.q-select__dropdown-icon').first().click();
await page.waitForTimeout(5000);

// Open the dropdown
await page.locator('.q-select__dropdown-icon').click();
await page.getByRole('option', { name: 'In Progress' }).click();
await page.waitForTimeout(2000);

// Click the status dropdown
await page.locator('label.status-dropdown i.q-select__dropdown-icon').click();

await page.waitForTimeout(3000);

// Select Resolved
await page.getByRole('option', { name: 'Resolved' }).click();
await page.waitForTimeout(2000);

await page.waitForSelector('.q-dialog', { timeout: 10000 });

// Upload the file
await page.locator('input[type="file"]').setInputFiles('./tests/files/resolved.jpg');

await page.waitForTimeout(2000);


await page.locator('textarea[aria-label="Comments"]').fill('Maintenance issue has been resolved successfully.');
// Upload the file
await page.waitForTimeout(2000);

await page.getByRole('button', { name: 'Upload' }).click();

await page.waitForTimeout(5000);

await page.locator('label.status-dropdown i.q-select__dropdown-icon').click();


await page.getByRole('option', { name: 'Completed' }).click();
await page.waitForTimeout(2000);

await page.getByRole('button', { name: 'Create Invoice' }).click();

await page.waitForTimeout(2000);

// Click the calendar icon
await page.locator('i.q-icon.material-icons.cursor-pointer').click();

await page.waitForTimeout(1000);

// Click tomorrow's date
// ✅ Fix variable name (tomorrow2 vs tomorrow)
const tomorrow_invoice = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const tomorrowDate1 = tomorrow.getDate().toString();
const tomorrowMonth = tomorrow.getMonth(); // 0-indexed
const currentMonth = new Date().getMonth();

console.log('Tomorrow date:', tomorrowDate1);

// ✅ If tomorrow is in next month, click next arrow
if (tomorrowMonth !== currentMonth) {
  await page.locator('.q-date__arrow').nth(1).click(); // click ">" next month
  await page.waitForTimeout(5000);
  console.log('✅ Navigated to next month!');
}

// ✅ Now click the date
await page.locator('.q-date__calendar-item button')
  .filter({ hasText: new RegExp(`^${tomorrowDate1}$`) })
  .click();
await page.waitForTimeout(500);
console.log('✅ Tomorrow date selected!');
await page.waitForTimeout(3000);

await page.getByRole('button', { name: 'Generate Invoice' }).click();

await page.waitForTimeout(20000);

await page.getByRole('button', { name: 'Issue Invoice' }).click();

await page.waitForTimeout(6000);


await page.screenshot({
  path: 'screenshots/owner-added.png',
  fullPage: true
});

console.log('Screenshot saved');
});