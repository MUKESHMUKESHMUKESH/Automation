// tests/excel/Excel_Addproperty.spec.js
const { test, expect } = require('@playwright/test');
const XLSX = require('xlsx');

// ✅ Read Excel file function
function readExcel(filePath) {
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  return XLSX.utils.sheet_to_json(sheet, { raw: false }); // ✅ raw: false converts all values to strings
}
const propertyData = readExcel('./testdata/Excel/propertydata.xlsx');
test.setTimeout(3600000); // 1 hour

test('Manager → Add Property From Excel', async ({ page }) => {

  // ✅ Load Excel data
  const propertyData = readExcel('./testdata/excel/propertydata.xlsx');
  console.log(`📊 Total Properties in Excel: ${propertyData.length}`);

  // ✅ Login ONCE
  await page.goto('https://dev-rentgeniux.onrender.com/#/login');
  await page.locator('input[name="username"]').fill('manager');
  await page.locator('input[name="password"]').fill('Manager@123');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL('**/manager');
  await page.waitForLoadState('networkidle');
  console.log('✅ Logged in!');

  // ✅ Navigate to Manage Properties ONCE
  await page.locator('button.nav-btn').filter({ hasText: 'Properties' }).click();
  await page.waitForTimeout(1000);
  await page.locator('button.submenu-btn').filter({ hasText: 'Manage Properties' }).click();
  await page.waitForLoadState('networkidle');
  console.log('✅ Manage Properties opened!');

  // ✅ FOR LOOP starts here
       for (let i = 0; i < propertyData.length; i++) {
    const property = propertyData[i];
    console.log(`\n🔄 Adding Property ${i + 1}/${propertyData.length}: ${property.propertyName}`);

    // ✅ Click Add Property
    await page.locator('div.text-black.text-weight-medium', { hasText: 'Add Property' }).click();
    await page.waitForTimeout(5000);

    // ✅ Select Owner dropdown
    await page.locator('input[role="combobox"]').nth(0).click();
    await page.waitForSelector('[role="option"]');
    await page.locator('[role="option"]').nth(1).click();
    console.log('✅ Owner selected!');

    // ✅ Click Continue
    await page.locator('span.block', { hasText: 'Continue' }).click();
    await page.waitForTimeout(1000);

    // ✅ Property Name
    await page.locator('input[type="text"]').first().fill(property.propertyName);
    console.log('✅ Property Name filled!');

    // ✅ Property Type Dropdown
    await page.locator('input[role="combobox"]').nth(0).click();
    await page.waitForSelector('[role="option"]');
    await page.getByText('Large').click();
    console.log('✅ Property Type selected!');

    // ✅ Year Built - convert to string from Excel number
    await page.locator('input[type="number"]').nth(0).fill(String(property.yearBuilt));
    console.log('✅ Year Built filled!');

    // ✅ Furnishing Status Dropdown
    await page.waitForTimeout(1000);
    const options = await page.locator('.q-item').allTextContents();
    console.log(options);
    await page.locator('.q-item').first().click();
    await page.locator('input[role="combobox"]').nth(1).click();
    await page.waitForTimeout(2000);
    await page.locator('[role="option"]').first().click({ force: true });
    console.log('✅ Furnishing Status selected!');

    // ✅ Address
    await page.locator('input[type="search"][role="combobox"]').fill(property.address);
    await page.waitForTimeout(1000);
    console.log('✅ Address filled!');

    // ✅ City
    await page.locator('input[type="text"]').nth(1).fill(property.city);
    console.log('✅ City filled!');

    // ✅ Country
    await page.locator('input[placeholder="Enter country"]').fill(property.country);
    console.log('✅ Country filled!');

    // ✅ State Dropdown
    await page.locator('input[role="combobox"]').last().click();
    await page.waitForSelector('[role="option"]');
    await page.waitForTimeout(1000);
    await page.locator('[role="option"]').first().click();
    await page.waitForTimeout(1000);
    console.log('✅ State selected!');

    // ✅ City Name
    await page.getByPlaceholder('Enter city name').fill(property.city);
    console.log('✅ City Name filled!');

    // ✅ State
    await page.locator('input[placeholder="Enter state"]').fill(property.state);
    console.log('✅ State filled!');

    // ✅ Zip Code - convert to string from Excel number
    await page.locator('input[placeholder="Enter zipcode"]').fill(String(property.zipCode));
    console.log('✅ Zip Code filled!');

    // ✅ Description
    await page.locator('textarea[placeholder="Enter property description"]').fill(property.comments);
    console.log('✅ Description filled!');

    // ✅ Amenities
    await page.getByRole('button', { name: 'Select amenities' }).click();
    await page.getByText('Swimming Pool', { exact: true }).click();
    console.log('✅ Amenities selected!');

    // ✅ Parking Type
    await page.getByText('Parking Type').click();
    console.log('✅ Parking Type clicked!');

    // ✅ Upload Property Files
  await page.locator('input[type="file"]').nth(0).setInputFiles(property.property_image);
await page.locator('input[type="file"]').nth(1).setInputFiles('./tests/files/owner-document.pdf');
    console.log('✅ Property files uploaded!');

    // ✅ Continue to Unit
    await page.getByRole('button', { name: 'Continue' }).click();
    console.log('✅ Continue clicked!');

    // ✅ Add Unit
    await page.getByRole('button', { name: 'Add Unit' }).click();
    console.log('✅ Add Unit clicked!');

    // ✅ Unit Name
    await page.locator('input[type="text"].q-field__native').first().fill(property.unitName);
    console.log('✅ Unit Name filled!');

    // ✅ Number Inputs - convert to string from Excel number
    const numberInputs = page.locator('input[type="number"]:not([readonly])');
    await numberInputs.nth(0).pressSequentially(String(property.floorNumber));
    await numberInputs.nth(1).pressSequentially(String(property.bedrooms));
    await numberInputs.nth(2).pressSequentially(String(property.bathrooms));
    await numberInputs.nth(3).pressSequentially(String(property.fullBathrooms));
    await numberInputs.nth(4).pressSequentially(String(property.halfBathrooms));
    await numberInputs.nth(5).pressSequentially(String(property.builtArea));
    console.log('✅ Number inputs filled!');

    // ✅ Rent & Price - convert to string from Excel number
    await page.locator('input[type="number"][min="0"][step="1"]').nth(6).pressSequentially(String(property.rentAmount));
    await page.locator('input[type="number"][min="0"][step="1"]').nth(8).pressSequentially(String(property.ownerReserveFund));
    await page.locator('input[type="number"][min="0"][step="1"]').nth(9).pressSequentially(String(property.lowPrice));
    await page.locator('input[type="number"][min="0"][step="1"]').nth(10).pressSequentially(String(property.highPrice));
    console.log('✅ Rent & Price filled!');

    // ✅ Unit Description
    await page.locator('textarea.q-field__native.q-placeholder').fill(property.unitDescription);
    console.log('✅ Unit Description filled!');

    // ✅ Late Fee Percentage - convert to string from Excel number
    await page.locator('input[type="number"][max="30"]').pressSequentially(String(property.lateFeePercentage));
    console.log('✅ Late Fee filled!');

    // ✅ Upload Unit Files
    await page.locator('input[type="file"]').nth(0).setInputFiles('./tests/files/unit.jpg');
    await page.locator('input[type="file"]').nth(1).setInputFiles('./tests/files/floor.jpg');
    console.log('✅ Unit files uploaded!');

    // ✅ Click Add Unit
    await page.locator('button.add-btn').click();
    await page.waitForTimeout(3000);
    console.log('✅ Unit Added!');

    // ✅ Save
    await page.getByRole('button', { name: 'Save' }).click();
    await page.waitForTimeout(5000);
    console.log('✅ Saved!');

    // ✅ Review Tab
    await page.getByRole('tab', { name: 'Review' }).click();
    await page.waitForTimeout(1000);

    // ✅ Verify Steps
    await page.locator('button.verify-btn-active').first().click();
    await page.waitForTimeout(1000);
    await page.locator('.q-card').getByRole('button', { name: 'Preview and Verify' }).click();
    await page.waitForTimeout(5000);
    await page.locator('button.verify-btn').click();
    await page.waitForTimeout(5000);
    await page.waitForSelector('.q-card', { timeout: 10000 });
    await page.locator('.q-card').getByRole('button', { name: 'Verify' }).click();
    await page.waitForTimeout(3000);
    console.log(`✅ Property ${i + 1} Done: ${property.propertyName}`);

    // ✅ Screenshot per property

    // ✅ Navigate back for next iteration

  } // ✅ FOR LOOP ends here

  console.log('✅ All Properties Added from Excel Successfully!');

});