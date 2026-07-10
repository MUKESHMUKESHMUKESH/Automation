const { test, expect } = require('@playwright/test');
test.setTimeout(700000); // ✅ Increase to 180 seconds
const { loginAsManager } = require('../utils/login');
const { getOnboardingLink } = require('../utils/gmail');
const tenantData = require('../testdata/tenantdata');
const tenant = tenantData[2];
  
test('Manager → Tenant Inspection Flow', async ({ page }) => {

  
  // 1. Open application
  await page.goto('https://rentgeniux.onrender.com/#/login');

  // 2. Login 
  await page.locator('input[name="username"]').fill('manager');
  await page.locator('input[name="password"]').fill('Manager@123');
  await page.getByRole('button', { name: 'Login' }).click();

  // 3. Wait for dashboard


    // 4. Click Tenants sidebar
   await page.locator('.lucide-chevron-down').nth(2).click();

  await page.getByRole('button', { name: 'Inspection' }).click();

    await page.getByRole('button', { name: 'Request Inspection' }).click();
    await page.waitForTimeout(1000);
    console.log('✅ Request Inspection clicked!');
    await page.waitForTimeout(2000);

    // ✅ Click and type in Select a Tenant field
        await page.locator('input[placeholder="Select a Tenant"]').fill('Daniel');

        await page.waitForTimeout(1000);

        // ✅ Select first option
        await page.locator('[role="option"]').first().click({ force: true });
        await page.waitForTimeout(2000);
        console.log('✅ Tenant selected!');

        await page.locator('input[placeholder="Enter inspector name"]').fill('Jhony');
        await page.waitForTimeout(2000);
        console.log('✅ Inspector Name filled!');


        // ✅ Click calendar icon
          await page.locator('i.material-icons:has-text("event")').click();
          await page.waitForSelector('.q-date__calendar-item', { state: 'visible' });
          await page.waitForTimeout(500);

            // ✅ Get today's date
          const today = new Date();
          const todayDay = today.getDate().toString();

          // ✅ Get last day of current month
          const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate().toString();

          // ✅ Check if today is last day of month
          if (todayDay === lastDay) {
            // Click chevron_right to go to next month
            await page.locator('i.material-icons:has-text("chevron_right")').first().click();
            await page.waitForTimeout(500);
            console.log('✅ Navigated to next month!');

            // Select first date of next month
            await page.locator('.q-date__calendar-item button')
              .filter({ hasText: /^1$/ })
              .click();
            await page.waitForTimeout(500);
            console.log('✅ First date of next month selected!');

} else {
  // Select today's date
  await page.locator('.q-date__calendar-item button')
    .filter({ hasText: new RegExp(`^${todayDay}$`) })
    .click();
  await page.waitForTimeout(500);
  console.log('✅ Today date selected!');
}  

         // ✅ Click Request Inspection inside dialog
await page.locator('#q-portal--dialog--1').getByRole('button', { name: 'Request Inspection' }).click();
await page.waitForTimeout(5000);
console.log('✅ Request Inspection clicked!');

await page.getByRole('button', { name: 'Back to Inspections' }).click();



  const { getInspectionAcceptLink } = require('../utils/gmail');

// ✅ After Request Inspection submitted
        const acceptLink = await getInspectionAcceptLink();
        console.log('✅ Accept Link:', acceptLink);

        // ✅ Open Accept link
        await page.goto(acceptLink);
        await page.waitForTimeout(2000);
        console.log('✅ Inspection Accepted!');
    await managerPage.locator('.q-item.text-negative:has(i.material-icons:text("logout"))').click();
    await page.waitForTimeout(2000);
    const Inspection_page = await page.context().newPage();


   
await page.goto('https://rentgeniux.onrender.com/#/login');
// 4. Click Tenants sidebar
await Inspection_page.locator('.lucide-chevron-down').nth(2).click();
await Inspection_page.getByRole('button', { name: 'Inspection' }).click();

await Inspection_page.locator('div.inspection-card').first()
  .locator('button.inspection-btn.active-btn')
  .click();
await Inspection_page.waitForTimeout(1000);
console.log('✅ Start Inspection clicked!');

// ✅ Click Setup Signature
await Inspection_page.locator('button.mic-sig-setup-btn').nth(0).click();
await Inspection_page.waitForTimeout(1000);
console.log('✅ Setup Signature clicked!');

// ✅ Wait for signature card
await Inspection_page.waitForSelector('.tenant-sign-card', { state: 'visible' });
await Inspection_page.waitForTimeout(500);

// ✅ Click Type tab
await Inspection_page.locator('.tenant-tab-link').filter({ hasText: 'Type' }).click();
await Inspection_page.waitForTimeout(500);
console.log('✅ Type tab clicked!');

// ✅ Fill First Name
await Inspection_page.locator('input[placeholder="Enter first name"]').fill('harini');
await Inspection_page.waitForTimeout(500);
console.log('✅ First Name filled!');

// ✅ Fill Last Name
await Inspection_page.locator('input[placeholder="Enter last name"]').fill('N');
await Inspection_page.waitForTimeout(500);
console.log('✅ Last Name filled!');

// ✅ Wait for Submit button to be enabled
await expect(Inspection_page.locator('button.tenant-submit-btn')).toBeEnabled({ timeout: 10000 });
await Inspection_page.waitForTimeout(500);

// ✅ Click Submit
await Inspection_page.locator('button.tenant-submit-btn').click();
await Inspection_page.waitForTimeout(2000);
console.log('✅ Signature Submitted!');

// ✅ Wait for dialog to open
await Inspection_page.waitForSelector('.mic-dialog-card', { state: 'visible' });
await Inspection_page.waitForTimeout(500);
console.log('✅ Add Condition dialog opened!');

// ✅ Fill Household Items
await Inspection_page.locator('input.mic-input').fill('Sofa');
await Inspection_page.waitForTimeout(500);
console.log('✅ Household Items filled!');

// ✅ Select Good condition radio button
await Inspection_page.locator('input.mic-radio[value="Good"]').click({ force: true });
await Inspection_page.waitForTimeout(500);
console.log('✅ Good condition selected!');

// ✅ Fill Note
await Inspection_page.locator('textarea.mic-textarea').fill('Sofa');
await Inspection_page.waitForTimeout(500);
console.log('✅ Note filled!');

// ✅ Upload Image
await Inspection_page.locator('div.mic-upload-zone input[type="file"]').setInputFiles('./tests/files/property2.jpg');
await Inspection_page.waitForTimeout(1000);
console.log('✅ Image uploaded!');

// ✅ Click Add Condition button
await Inspection_page.locator('button.mic-add-btn').click();
await Inspection_page.waitForTimeout(1000);
console.log('✅ Add Condition submitted!');
});