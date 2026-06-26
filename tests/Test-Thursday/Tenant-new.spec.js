const { test, expect } = require('@playwright/test');
const ownerdata = require('../../testdata/ownerdata');
test.setTimeout(60000);
const owner = ownerdata[11];


test('Owner → Add Property Flow', async ({ page }) => {

  // ✅ Step 1: Open Application
  await page.goto('https://rentgeniux.onrender.com/#/login');
  await page.waitForTimeout(2000);
  console.log('✅ Application Opened!');

  // ✅ Step 2: Login
  await page.locator('input[name="username"]').fill('sophiakens');
  await page.locator('input[name="password"]').fill('Sophia@456');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(3000);
  console.log('✅ Login Successful!');

  // ✅ Step 3: Upload Profile Image
  const [fileChooser] = await Promise.all([
    page.waitForEvent('filechooser'),
    page.locator('button.upload-btn span.block:has-text("Upload Image")').click()
  ]);
  await fileChooser.setFiles('./tests/files/profile.png');
  await page.waitForTimeout(2000);
  console.log('✅ Profile Image Uploaded!');

  // ✅ Step 4: Navigate to Add Properties
  await page.getByRole('button', { name: 'Add Properties' }).click();
  await page.waitForTimeout(3000);
  console.log('✅ Navigated to Add Properties!');

  // ✅ Step 5: Property Name
  await page.locator('input[type="text"]').first().fill(owner.propertyName);
  await page.waitForTimeout(500);
  console.log('✅ Property Name filled!');

  // ✅ Step 6: Property Type
  await page.locator('input[role="combobox"]').nth(0).click();
  await page.waitForSelector('[role="option"]', { state: 'visible' });
  await page.getByText('House', { exact: true }).click();
  await page.waitForTimeout(500);
  console.log('✅ Property Type selected!');

  // ✅ Step 7: Year Built
  await page.locator('input[type="number"]').nth(0).fill(owner.yearBuilt);
  await page.waitForTimeout(500);
  console.log('✅ Year Built filled!');

  // ✅ Step 8: Furnishing Status
  await page.locator('input[role="combobox"]').nth(1).click();
  await page.waitForSelector('[role="option"]', { state: 'visible' });
  await page.locator('[role="option"]').first().click({ force: true });
  await page.waitForTimeout(500);
  console.log('✅ Furnishing Status selected!');

  // ✅ Step 9: Address Search
  await page.locator('input[type="search"][role="combobox"]').fill(owner.address);
  await page.waitForTimeout(2000);
  await page.locator('[role="option"]').first().click({ force: true });
  await page.waitForTimeout(1000);
  console.log('✅ Address filled!');

  // ✅ Step 10: City
  await page.locator('input[type="text"]').nth(1).fill(owner.city);
  await page.waitForTimeout(500);
  console.log('✅ City filled!');

  // ✅ Step 11: State Dropdown
  await page.locator('input[role="combobox"]').last().click();
  await page.waitForSelector('[role="option"]', { state: 'visible' });
  await page.waitForTimeout(1000);
  await page.locator('[role="option"]').first().click({ force: true });
  await page.waitForTimeout(1000);
  console.log('✅ State selected!');

  // ✅ Step 12: Description
  await page.locator('textarea.q-field__native').fill(owner.description);
  await page.waitForTimeout(500);
  console.log('✅ Description filled!');

  // ✅ Step 13: Amenities - Open Dropdown
  await page.locator('button.amenities_select').scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.locator('button.amenities_select').evaluate(el => el.click());
  await page.waitForTimeout(1000);
  console.log('✅ Amenities dropdown opened!');

  // ✅ Step 14: Select Swimming Pool via span checkbox
  await page.locator('label.amenity_option')
    .filter({ hasText: 'Swimming Pool' })
    .locator('span.amenity_checkbox')
    .click({ force: true });
  await page.waitForTimeout(500);
  console.log('✅ Swimming Pool selected!');

  // ✅ Step 15: Close Amenities Dropdown
  await page.locator('button.amenities_select').evaluate(el => el.click());
  await page.waitForTimeout(500);
  console.log('✅ Amenities dropdown closed!');

  // ✅ Step 16: Upload Property Files
await page.locator('input[type="file"]').nth(0).setInputFiles('./tests/files/property3.avif');
await page.waitForTimeout(1000);
await page.locator('input[type="file"]').nth(1).setInputFiles('./tests/files/owner-document.pdf');
await page.waitForTimeout(1000);
  console.log('✅ Property Files Uploaded!');

  // ✅ Step 17: Continue to Unit Details
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.waitForTimeout(3000);
  

  await page.getByRole('button', { name: 'Add Unit' }).click();
await page.waitForTimeout(3000);


 // ✅ Unit Name
 await page.locator('input.q-field__native.q-placeholder').first().fill(owner.unitName);
console.log('✅ Unit Name filled!');

    // ✅ Number Inputs
    const numberInputs = page.locator('input[type="number"]:not([readonly])');
    await numberInputs.nth(0).pressSequentially(owner.floorNumber);
    await numberInputs.nth(1).pressSequentially(owner.bedrooms);
    await numberInputs.nth(2).pressSequentially(owner.bathrooms);
    await numberInputs.nth(3).pressSequentially(owner.fullBathrooms);
    await numberInputs.nth(4).pressSequentially(owner.halfBathrooms);
    await numberInputs.nth(5).pressSequentially(owner.builtArea);
    console.log('✅ Number inputs filled!');

    // ✅ Rent & Price
    await page.locator('input[type="number"][min="0"][step="1"]').nth(6).pressSequentially(property.rentAmount);
    await page.locator('input[type="number"][min="0"][step="1"]').nth(8).pressSequentially(property.ownerReserveFund);
    await page.locator('input[type="number"][min="0"][step="1"]').nth(9).pressSequentially(property.lowPrice);
    await page.locator('input[type="number"][min="0"][step="1"]').nth(10).pressSequentially(property.highPrice);
    console.log('✅ Rent & Price filled!');

    // ✅ Unit Description
    await page.locator('textarea.q-field__native.q-placeholder').fill(property.unitDescription);
    console.log('✅ Unit Description filled!');

    // ✅ Late Fee Percentage
    await page.locator('input[type="number"][max="30"]').pressSequentially(property.lateFeePercentage);
    console.log('✅ Late Fee filled!');

    // ✅ Upload Unit Files
    await page.locator('input[type="file"]').nth(0).setInputFiles('./tests/files/unit.jpg');
    await page.locator('input[type="file"]').nth(1).setInputFiles('./tests/files/floor.jpg');
    console.log('✅ Unit files uploaded!');

    // ✅ Click Add Unit
    await page.locator('button.add-btn').click();
    await page.waitForTimeout(3000);
  // ✅ Step 18: Verify Navigation to Unit Details


});