const { test, expect } = require('@playwright/test');

test('Manager → Navigate to Add Property', async ({ page }) => {
    test.setTimeout(100000);
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
const property = propertyData[1];
       
// Property Name
await page.locator('input[type="text"]').first().fill(property.propertyName);

// Property Type Dropdown
await page.locator('input[role="combobox"]').nth(0).click();
await page.waitForSelector('[role="option"]');
await page.getByText('Large').click();

// Year Built
await page.locator('input[type="number"]').nth(0).fill(property.yearBuilt);

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

await page.locator('input[placeholder="Enter country"]').fill(property.country);

// Open dropdown
await page.locator('input[role="combobox"]').last().click();

// Wait for options to appear
await page.waitForSelector('[role="option"]');
await page.waitForTimeout(1000);

// Select first option
await page.locator('[role="option"]').first().click();

await page.waitForTimeout(1000);

await page.getByPlaceholder('Enter city name').fill(property.city);

await page.locator('input[placeholder="Enter state"]').fill(property.state);

// By class - target all matching inputs and pick the last one (zip is the last text field)
await page.locator('input[placeholder="Enter zipcode"]').fill(property.zipCode);


await page.locator('textarea[placeholder="Enter property description"]').fill(property.comments);
// Click Amenities dropdown
await page.getByRole('button', { name: 'Select amenities' }).click();

// Select Swimming Pool
await page.getByText('Swimming Pool', { exact: true }).click();


// Click Parking Type dropdown
await page.getByText('Parking Type').click();

// Select Surface Lot


// Upload file
await page.locator('input[type="file"]').nth(0).setInputFiles('./tests/files/owner-document.jfif');
await page.locator('input[type="file"]').nth(1).setInputFiles('./tests/files/owner-document.pdf');


await page.getByRole('button', { name: 'Continue' }).click();

await page.getByRole('button', { name: 'Add Unit' }).click();

// Unit Name - text input (separate from number inputs)
// Unit Name
await page.locator('input[type="text"].q-field__native').first().fill(property.unitName);

// Floor Number
// Floor Number - use nth text input
await page.locator('input[type="text"].q-field__native').nth(1).fill(property.floorNumber);

// All number inputs
const numberInputs = page.locator('input[type="number"]:not([readonly])');

// Number of Bed Rooms
await numberInputs.nth(0).pressSequentially(property.bedrooms);

// Number of Bath Rooms
await numberInputs.nth(1).pressSequentially(property.bathrooms);

// Number of Full Bath Rooms
await numberInputs.nth(2).pressSequentially(property.fullBathrooms);

// Number of Half Bath Rooms
await numberInputs.nth(3).pressSequentially(property.halfBathrooms);

// Built Area in sq.ft
await numberInputs.nth(4).pressSequentially(property.builtArea);

// Monthly Rent
await page.locator('input[type="number"][min="0"][step="1"]').nth(5).pressSequentially(property.rentAmount);

// Owner Reserve Fund
await page.locator('input[type="number"][min="0"][step="1"]').nth(7).pressSequentially(property.ownerReserveFund);

// Low Price
await page.locator('input[type="number"][min="0"][step="1"]').nth(8).pressSequentially(property.lowPrice);

// High Price
await page.locator('input[type="number"][min="0"][step="1"]').nth(9).pressSequentially(property.highPrice);

await page.locator('textarea.q-field__native.q-placeholder').fill(property.unitDescription);

await page.locator('input[type="number"][max="30"]').pressSequentially(property.lateFeePercentage);

await page.locator('input[type="file"]').nth(0).setInputFiles('./tests/files/owner-document.jfif');

await page.locator('input[type="file"]').nth(1).setInputFiles('./tests/files/owner-document.jfif');
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