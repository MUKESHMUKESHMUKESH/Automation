
const { test, expect } = require('@playwright/test');
const ownerdata = require('../testdata/ownerdata');

const owner = ownerdata[13];
const path = require('path');

test.setTimeout(60000);

test('Manager → Add Owner', async ({ page }) => {

    // Open application
 await page.goto('https://rentgeniux.onrender.com/#/login');

    // Login
    await page.locator('input[name="username"]').fill('victoria');
    await page.locator('input[name="password"]').fill('Victoria@123');
    await page.getByRole('button', { name: 'Login' }).click();

    // Wait for Manager Dashboard
    await page.waitForURL('**/manager');
    await page.waitForLoadState('networkidle');

    // Click Owners menu
    await page.locator('button.nav-btn').filter({ hasText: 'Owners' }).click();

    // Click Manage Owners
    await page.locator('button.submenu-btn').filter({ hasText: 'Manage Owners' }).click();

    // Click Add Owner
    await page.locator('span.q-btn__content').filter({ hasText: 'Add Owner' }).click();
await page.locator('input[placeholder="e.g., John"]').fill(owner.firstName);
await page.locator('input[placeholder="e.g., Doe"]').fill(owner.lastName);
await page.locator('input[placeholder="e.g., johndoe@gmail.com"]').fill(owner.email);
await page.locator('input[placeholder="e.g., +1 555 123 4567"]').fill(owner.phone);
await page.locator('input[placeholder="e.g., +1 555 111 6985"]').fill(owner.emergencyContact);
await page.locator('input[placeholder="e.g., Davis"]').fill(owner.city);
await page.locator('input[placeholder="e.g., 10001"]').fill(owner.zipCode);
await page.getByPlaceholder('Search Address').fill(owner.address);
await page.locator('.q-item').first().click();

// Open State dropdown
await page.locator('input[role="combobox"]').nth(1).click();

// Wait for options to load
await page.waitForTimeout(1000);

// Select second option (index 1)
await page.locator('[role="option"]').nth(1).click();
// Address


    // Upload File
    const filePath = path.join(__dirname, 'files', 'owner-document.jfif');
    await page.locator('input[type="file"]').first().setInputFiles(filePath);

    // Click Add
    await page.locator('span.block').filter({ hasText: 'Add' }).click();


    // Validation (optional)
    await page.waitForTimeout(5000);
// First row in owner table
const firstRow = page.locator('tbody tr').first();

// Open status dropdown
await firstRow.locator('input[role="combobox"]').click();
await page.waitForTimeout(1000);
// Select first dropdown value
await page.locator('[role="option"]').first().click();

console.log('Taking screenshot...');

await page.screenshot({
  path: 'screenshots/owner-added.png',
  fullPage: true
});

console.log('Screenshot saved');

});

