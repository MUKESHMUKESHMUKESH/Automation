const { test, expect } = require('@playwright/test');
const ownerdata = require('../testdata/ownerdata');

const owner = ownerdata[11];
const path = require('path');

test.setTimeout(300000);

test('Manager → Add Owner', async ({ page }) => {

  // Open application
  await page.goto('https://rentgeniux.onrender.com/#/login');

  // Login
  await page.locator('input[name="username"]').fill('manager');
  await page.locator('input[name="password"]').fill('Manager@123');
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
// ✅ First Name
await page.locator('input.q-field__native[placeholder="eg., John"]').click();
await page.locator('input.q-field__native[placeholder="eg., John"]').fill(owner.firstName);
console.log('✅ First Name filled!');

// ✅ Last Name
await page.locator('input.q-field__native[placeholder="eg., Doe"]').click();
await page.locator('input.q-field__native[placeholder="eg., Doe"]').fill(owner.lastName);
console.log('✅ Last Name filled!');

// ✅ Email ID
await page.locator('input.q-field__native[placeholder="eg., johndoe@gmail.com"]').click();
await page.locator('input.q-field__native[placeholder="eg., johndoe@gmail.com"]').fill(owner.email);
console.log('✅ Email filled!');

// ✅ Phone Number (nth 0)
await page.locator('input.q-field__native[placeholder="eg., +1 555 123 4567"]').nth(0).click();
await page.locator('input.q-field__native[placeholder="eg., +1 555 123 4567"]').nth(0).fill(owner.phone);
console.log('✅ Phone Number filled!');

// ✅ Emergency Number (nth 1)
await page.locator('input.q-field__native[placeholder="eg., +1 555 123 4567"]').nth(1).click();
await page.locator('input.q-field__native[placeholder="eg., +1 555 123 4567"]').nth(1).fill(owner.emergencyContact);
console.log('✅ Emergency Number filled!');


// Fill address
// ✅ Fill address
await page.locator('input[placeholder="Search Address"]').fill(owner.address);
await page.waitForTimeout(1000);
await page.locator('.q-item').first().click();
console.log('✅ Address filled!');


// ✅ City
await page.locator('input.q-field__native[placeholder="eg., New York"]').click();
await page.locator('input.q-field__native[placeholder="eg., New York"]').fill(owner.city);
console.log('✅ City filled!');

// ✅ Select State dropdown
await page.locator('[placeholder="Select State"]').click();
await page.waitForTimeout(1000);
await page.locator('[role="option"]').nth(1).click();
console.log('✅ State selected!');

// ✅ Zip Code
await page.locator('input.q-field__native[placeholder="eg., 10001"]').click();
await page.locator('input.q-field__native[placeholder="eg., 10001"]').fill(owner.zipCode);
console.log('✅ Zip Code filled!');
await page.waitForTimeout(5000);


await page.getByRole('button', { name: 'Next' }).click();
console.log('✅ Next button clicked!');
await page.waitForTimeout(5000);

// ✅ SSN (9 digits - XXX-XX-XXXX format)
await page.locator('input.q-field__native[placeholder="XXX-XX-XXXX"]').click();
await page.locator('input.q-field__native[placeholder="XXX-XX-XXXX"]').fill(owner.ssn);
console.log('✅ SSN filled!');


await page.locator('input[type="file"]').nth(0).setInputFiles(owner.document1);
await page.locator('input[type="file"]').nth(1).setInputFiles(owner.document2);
await page.locator('input[type="file"]').nth(2).setInputFiles(owner.document3);
await page.locator('input[type="file"]').nth(3).setInputFiles(owner.document4);


// ✅ Click enabled Next button (data-v-b16f8748)
await expect(page.locator('button[data-v-b16f8748]:has(span.block:text("Next"))')).toBeEnabled({ timeout: 10000 });
await page.locator('button[data-v-b16f8748]:has(span.block:text("Next"))').click();
console.log('✅ Next button clicked!');
await page.waitForTimeout(5000);


// ✅ Username
await page.locator('input.q-field__native[type="text"]').last().click();
await page.locator('input.q-field__native[type="text"]').last().fill(owner.username);
console.log('✅ Username filled!');

// ✅ Password
await page.locator('input.q-field__native[type="password"]').nth(0).click();
await page.locator('input.q-field__native[type="password"]').nth(0).fill(owner.password);
console.log('✅ Password filled!');

// ✅ Confirm Password
await page.locator('input.q-field__native[type="password"]').nth(1).click();
await page.locator('input.q-field__native[type="password"]').nth(1).fill(owner.confirmPassword);
console.log('✅ Confirm Password filled!');


// ✅ Wait for Create Account button to be enabled then click
// ✅ Wait for Create Account button to be enabled then click
// ✅ Click Create Account and wait for 2 minutes
await page.locator('button.create-btn').click();
console.log('✅ Create Account clicked!');

await page.waitForTimeout(12000); // 2 minutes
console.log('✅ Wait complete!');

// ✅ Click the profile tab in sidebar

// ✅ Click the profile tab in sidebar
await page.locator('.q-item:has(.q-avatar__content img)').click();
console.log('✅ Profile tab clicked!');

// ✅ Wait for dropdown card to appear


await page.locator('.q-item.text-negative').click({ force: true });

await page.waitForSelector('.logout-card', { state: 'visible' });
await page.waitForTimeout(1000);

// ✅ Step 5: Confirm Logout
await page.locator('.logout-card .btn-logout').click();

await page.waitForTimeout(5000);
console.log('✅ Logout confirmed!');

  await page.locator('input[name="username"]').fill(owner.username);
  await page.locator('input[name="password"]').fill(owner.password);
  await page.getByRole('button', { name: 'Login' }).click();
 await page.waitForTimeout(1000);
 // Click the Upload Image button and handle file upload
const [fileChooser] = await Promise.all([
  page.waitForEvent('filechooser'),
  page.locator('button.upload-btn span.block:has-text("Upload Image")').click()
]);

await fileChooser.setFiles('./tests/files/profile.png'); 
await page.getByRole('button', { name: 'Add Properties' }).click();
 await page.waitForTimeout(2000); 

// ✅ Property Name
    await page.locator('input[type="text"]').first().fill(owner.propertyName);
    console.log('✅ Property Name filled!');
    
    await page.locator('input[role="combobox"]').nth(0).click();
   await page.waitForSelector('[role="option"]');
    await page.getByText('House', { exact: true }).click();
    console.log('✅ Property Type selected!');

    // ✅ Year Built
    await page.locator('input[type="number"]').nth(0).fill(owner.yearBuilt);
    console.log('✅ Year Built filled!');

    // ✅ Furnishing Status Dropdown
await page.locator('.q-field__native').filter({ has: page.locator('input[role="combobox"]') }).first().click();
await page.waitForSelector('[role="option"]', { state: 'visible' });
await page.locator('[role="option"]').first().click({ force: true });
console.log('✅ Dropdown selected!');

    // ✅ Address
    await page.locator('input[type="search"][role="combobox"]').fill(owner.address);
    await page.waitForTimeout(1000);
    console.log('✅ Address filled!');

    // ✅ City
    await page.locator('input[type="text"]').nth(1).fill(owner.city);
    console.log('✅ City filled!');

    // ✅ Country
    await page.locator('input[placeholder="Enter country"]').fill(owner.country);
    console.log('✅ Country filled!');

    // ✅ State Dropdown
    await page.locator('input[role="combobox"]').last().click();
    await page.waitForSelector('[role="option"]');
    await page.waitForTimeout(1000);
    await page.locator('[role="option"]').first().click();
    await page.waitForTimeout(1000);
    console.log('✅ State selected!');

    // ✅ City Name
    await page.getByPlaceholder('Enter city name').fill(owner.city);
    console.log('✅ City Name filled!');

    // ✅ State
    await page.locator('input[placeholder="Enter state"]').fill(owner.state);
    console.log('✅ State filled!');

    // ✅ Zip Code
    await page.locator('input[placeholder="Enter zipcode"]').fill(owner.zipCode);
    console.log('✅ Zip Code filled!');

    // ✅ Description
    await page.locator('textarea[placeholder="Enter property description"]').fill(owner.comments);
    console.log('✅ Description filled!');

    // ✅ Amenities
    await page.getByRole('button', { name: 'Select amenities' }).click();
    await page.getByText('Swimming Pool', { exact: true }).click();
    console.log('✅ Amenities selected!');

    // ✅ Parking Type
    await page.getByText('Parking Type').click();
    console.log('✅ Parking Type clicked!');

    // ✅ Upload Property Files
    await page.locator('input[type="file"]').nth(0).setInputFiles('./tests/files/property-image32.avif');
    await page.locator('input[type="file"]').nth(1).setInputFiles('./tests/files/owner-document.pdf');
    console.log('✅ Property files uploaded!');

    // ✅ Continue to Unit
    await page.getByRole('button', { name: 'Continue' }).click();
    console.log('✅ Continue clicked!');




  // ✅ Screenshot
  /*console.log('Taking screenshot...');
  await page.screenshot({
    path: 'screenshots/owner-added.png',
    fullPage: true
  });
  console.log('✅ Screenshot saved!');*/

});