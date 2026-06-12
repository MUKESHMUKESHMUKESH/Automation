const { test, expect } = require('@playwright/test');

test('Manager → Navigate to Add Property', async ({ page }) => {
    test.setTimeout(70000);
    // Open application
    await page.goto('https://rentgeniux.onrender.com/#/login');

    // Login
    await page.locator('input[name="username"]').fill('victoria');
    await page.locator('input[name="password"]').fill('Victoria@123');
    await page.getByRole('button', { name: 'Login' }).click();

    // Wait for dashboard
    await page.waitForURL('**/manager');
    await page.waitForLoadState('networkidle');

    // Click Properties menu
    await page.locator('button.nav-btn')
        .filter({ hasText: 'Properties' })
        .click();

    // Wait for submenu
    await page.waitForTimeout(1000);

    // Example: Click Manage Properties
    // Change the text if your submenu name is different
    await page.locator('button.submenu-btn')
        .filter({ hasText: 'Manage Properties' })
        .click();
// Verify Add Property page is opened
    await page.waitForLoadState('networkidle');

    await page.locator('div.text-black.text-weight-medium', {
  hasText: 'Add Property'
}).click();

await page.waitForTimeout(5000)
 
// Click the dropdown
await page.locator('input[role="combobox"]').click();

// Wait for options to appear
await page.waitForSelector('[role="option"]');

// Select the first person
await page.locator('[role="option"]').first().click();

await page.locator('span.block', { hasText: 'Continue' }).click();
await page.waitForTimeout(1000)

const propertyData = require('../testdata/addpropertydata');
const property = propertyData[11];
       
// Property Name
await page.locator('input[type="text"]').first().fill(property.propertyName);

// Property Type Dropdown
await page.locator('input[role="combobox"]').nth(0).click();
await page.waitForSelector('[role="option"]');
await page.getByText('Apartment').click();

// Year Built
await page.locator('input[type="number"]').fill(property.yearBuilt);

     // Click dropdown
// Open Furnishing Status dropdown


// Wait for dropdown options
await page.waitForTimeout(1000);

// Print options for debugging
const options = await page.locator('.q-item').allTextContents();
console.log(options);

// Select first option
await page.locator('.q-item').first().click();

// Open Furnishing Status dropdown
// Open Furnishing Status dropdown
await page.locator('input[role="combobox"]').nth(1).click();

// Wait for options
await page.waitForTimeout(2000);

// Click the first visible option
await page.locator('[role="option"]').first().click({ force: true });

await page.locator('input[type="search"][role="combobox"]')
  .fill(property.address);

await page.locator('input[type="text"]').nth(1).fill(property.city);

// Open dropdown
await page.locator('input[role="combobox"]').last().click();

// Wait for options to appear
await page.waitForSelector('[role="option"]');
await page.waitForTimeout(1000);

// Select first option
await page.locator('[role="option"]').first().click();

await page.waitForTimeout(1000);


// By class - target all matching inputs and pick the last one (zip is the last text field)
await page.locator('input.q-field__native.q-placeholder').last().fill(property.zipCode);


await page.locator('textarea.q-field__native.q-placeholder').fill(property.comments);

await page.getByRole('button', { name: 'Continue' }).click();

await page.getByRole('button', { name: 'Add Unit' }).click();

// Unit Name - text input (separate from number inputs)
await page.locator('input[type="text"].q-field__native').first().fill(property.unitName);

// Number inputs (editable only)
const numberInputs = page.locator('input[type="number"]:not([readonly])');

await numberInputs.nth(0).pressSequentially(property.bedrooms);
await numberInputs.nth(1).pressSequentially(property.bathrooms);
await numberInputs.nth(2).pressSequentially(property.builtArea);
await numberInputs.nth(3).pressSequentially(property.rentAmount);
await numberInputs.nth(4).pressSequentially(property.ownerReserveFund);
await numberInputs.nth(5).pressSequentially(property.lateFeePercentage);
await numberInputs.nth(6).pressSequentially(property.depositAmount);

// Click Add button
await page.locator('button.add-btn').click();
await page.waitForTimeout(3000);

await page.getByRole('button', { name: 'Save' }).click();
await page.waitForTimeout(5000);
// Click the last dropdown arrow
// Click the Verified status dropdown (Change Status - last column)
await page.locator('i.q-select__dropdown-icon').nth(4).click();

// Select Verified option
await page.getByRole('option', { name: 'Verified' }).click();
await page.locator('svg.lucide-check').click();
await page.waitForTimeout(3000);

await page.screenshot({
  path: 'tests/screenshots/Addproperty.png',
  fullPage: true
});
});