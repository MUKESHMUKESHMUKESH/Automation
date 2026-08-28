const { LoginPage } = require('../Pages/Manager_Login');

class OwnerInspection {
  constructor(page) {
    this.page = page;
  }

  // Use the parameter directly, no re-import, no hardcoded index
  async Inspection(owner) {
    const page = this.page;

    const loginPage = new LoginPage(page);
    await loginPage.login();

    // Click Owners menu
    await page.locator('button.nav-btn').filter({ hasText: 'Owners' }).click();

    // Click Inspections submenu
    await page.locator('button.submenu-btn').filter({ hasText: 'Inspections' }).click();
      await page.getByRole('button', { name: 'Request Inspection' }).click();
    await page.waitForTimeout(1000);
    console.log('. Request Inspection clicked!');
    await page.waitForTimeout(2000);

    // . Click and type in Select a Tenant field
          // Scope to the owner select field (Quasar q-select)
    // Scope to the dialog that's currently open
const dialog = page.locator('[id^="q-portal--dialog"]');

await dialog.locator('i.q-select__dropdown-icon').click();

await page.locator('.q-menu').waitFor({ state: 'visible' });
await page.getByRole('option').first().click();

        await page.waitForTimeout(2000);

        // . Select first option
     

        await page.locator('input[placeholder="Enter Inspector Name"]').fill('Jhony');
        await page.waitForTimeout(2000);
        console.log('. Inspector Name filled!');


        // . Click calendar icon
          await page.locator('i.material-icons:has-text("event")').click();
          await page.waitForSelector('.q-date__calendar-item', { state: 'visible' });
          await page.waitForTimeout(500);

            // . Get today's date
          const today = new Date();
          const todayDay = today.getDate().toString();

          // . Get last day of current month
          const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate().toString();

          // . Check if today is last day of month
          if (todayDay === lastDay) {
            // Click chevron_right to go to next month
            await page.locator('i.material-icons:has-text("chevron_right")').first().click();
            await page.waitForTimeout(500);
            console.log('. Navigated to next month!');

            // Select first date of next month
            await page.locator('.q-date__calendar-item button')
              .filter({ hasText: /^1$/ })
              .click();
            await page.waitForTimeout(500);
            console.log('. First date of next month selected!');

} else {
  // Select today's date
  await page.locator('.q-date__calendar-item button')
    .filter({ hasText: new RegExp(`^${todayDay}$`) })
    .click();
  await page.waitForTimeout(500);
  console.log('. Today date selected!');
}  

await dialog.locator('label', { hasText: 'Inspected By' }).click();
         // . Click Request Inspection inside dialog
await page.locator('#q-portal--dialog--1').getByRole('button', { name: 'Request Inspection' }).click();
await page.waitForTimeout(5000);
console.log('. Request Inspection clicked!');


// Click the profile card (avatar section) to open the account menu
await page.locator('.q-item').filter({ has: page.locator('.q-avatar') }).click();

// Wait for the dropdown/menu to appear
await page.locator('.q-menu').waitFor({ state: 'visible' });

// Click "Logout" from the menu
await page.getByText('Logout', { exact: true }).click();
await page.locator('button.btn-logout').click();

await page.waitForTimeout(5000);
console.log('.Logout confirmed!');



  const { getOwnerInspectionAcceptLink } = require('../utils/gmail');

// . After Request Inspection submitted
        const acceptLink = await getOwnerInspectionAcceptLink();
        console.log('. Accept Link:', acceptLink);

        // . Open Accept link
        await page.goto(acceptLink);
        await page.waitForTimeout(2000);
        console.log('. Inspection Accepted!');
  }
}

module.exports = { OwnerInspection };