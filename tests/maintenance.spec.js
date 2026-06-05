// @ts-check
const { test, expect } = require('@playwright/test');

test.setTimeout(19000);

test('Manager → Maintenance → Create Request Flow', async ({ page }) => {

  // 1. Open application
  await page.goto('https://rentgeniux.onrender.com');

  // 2. Login
  await page.locator('input[name="username"]').fill('victoria');
  await page.locator('input[name="password"]').fill('Victoria@123');
  await page.getByRole('button', { name: 'Login' }).click();

  // 3. Wait for dashboard
  await page.waitForURL('**/manager');

  // 4. Click sidebar
  await page.getByText('Maintenance Requests').click();

  // 5. Validate navigation
  await expect(page).toHaveURL(/manager\/requests/);

  // 6. Wait for button to be visible (IMPORTANT FIX)
  const createBtn = page.getByRole('button', { name: 'Create Requests' });
  await expect(createBtn).toBeVisible({ timeout: 10000 });

  // 7. Click Create Requests
  await createBtn.click();

  // 8. Validate next page
  await expect(page).toHaveURL(/manager\/raiserequest/);

  // After navigating to raise request page
// Click the tenant dropdown/input
// Select Tenant
const tenantInput = page.locator(
  'input[placeholder="Search by tenant name or email"]'
);

await tenantInput.click();

// Wait for tenant list
await page.locator('.q-menu .q-item').first().waitFor({
  state: 'visible'
});

// Click first tenant
await page.locator('.q-menu .q-item').first().click();

// Verify tenant selected
await page.waitForTimeout(1000);

// Category dropdown
const categoryDropdown = page.locator('input.q-select__focus-target').nth(1);

await categoryDropdown.click();

// Wait for category options
await page.locator('.q-menu .q-item').first().waitFor();

// Select first category
await page.locator('.q-menu .q-item').first().click();
await page.waitForTimeout(3000);
// Enter description
await page.getByPlaceholder('Please provide details about the maintenance issue...')
  .fill('AC leakage in Hall.');

  // Click time slot dropdown (next q-select)
// Click Time Slot dropdown
const timeSlotDropdown = page.locator('input.q-select__focus-target').last();

await timeSlotDropdown.click();

await page.locator('i.material-icons:has-text("event")').click();

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const day = tomorrow.getDate().toString();

await page.locator('.q-date').getByText(day, { exact: true }).first().click();
 
// Click Preferred Slot dropdown
const preferredSlot = page.locator('input.q-select__focus-target').last();

await preferredSlot.click();

// Wait for dropdown options to appear
await page.waitForTimeout(1000);

// Select first slot
await page.locator('.q-menu .q-item').first().click();

// Preferred way
await page.getByRole('button', { name: 'Submit Request' }).click();
await page.waitForTimeout(7000);

await page.getByRole('button', { name: 'View More' }).first().click();
await page.waitForTimeout(3000);


await page.locator('button:has-text("Approve")').click();
await page.waitForTimeout(4000);

// Wait for page to load


// Click the first maintenance kebab (three-dot) icon
await page.locator('i:has-text("more_vert")').first().click();
await page.waitForTimeout(1000);
// Click Assign Vendor option
await page.getByText('Assign', { exact: true }).click();
await page.waitForTimeout(2000);
// Wait for Assign Vendor popup/page to load

const selectVendorBtn = page.locator('button:has-text("Select Vendor")').first();

await selectVendorBtn.scrollIntoViewIfNeeded();

await selectVendorBtn.click({ force: true });

await page.waitForTimeout(2000);

// Click Tenant Available Date dropdown
await page.locator('.q-select').click();

// Wait for options to load
await page.waitForTimeout(1000);

// Select first available slot
await page.locator('.q-item').first().click();

// Enter Estimate Amount
await page.locator('input[placeholder="Enter an estimate amount"]')
  .fill('200');

// Click Assign button
await page.getByRole('button', { name: 'Assign' }).click();

// Wait for success
await page.waitForTimeout(3000);
// Wait for assignment to complete

  await page.screenshot({
    path: 'tests/screenshots/create-request.png',
    fullPage: true
  });

});