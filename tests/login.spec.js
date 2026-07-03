const { test } = require('@playwright/test');

test('Manager → Login and Logout', async ({ page }) => {
  // Step 1: Go to app
  await page.goto('https://rentgeniux.onrender.com');

  // Step 2: Wait for Render.com cold start (can take 30-60 sec)
  await page.waitForURL('**/#/login**', { timeout: 60000 });

  // Step 3: Wait for username input to appear
  await page.waitForSelector('input[name="username"]', {
    state: 'visible',
    timeout: 60000
  });

  // Step 4: Fill credentials
  await page.locator('input[name="username"]').fill('manager');
  await page.locator('input[name="password"]').fill('Manager@123');

  // Step 5: Wait for Login button and click it
  const loginBtn = page.locator('button:has-text("Login")');
  await loginBtn.waitFor({ state: 'visible', timeout: 10000 });
  await loginBtn.click();

  // Step 6: Wait for post-login navigation to confirm login succeeded
  await page.waitForURL('**/#/manager**', { timeout: 30000 });

  // Step 7: Click on profile item to open the menu
  const profileItem = page.locator('.q-item', { hasText: 'jaya sudharsan' });
  await profileItem.waitFor({ state: 'visible', timeout: 10000 });
  await profileItem.click();

  // Step 8: Click "Logout" menu item to open confirmation dialog
  await page.locator('.q-item__section--main', { hasText: 'Logout' }).click();

  // Step 9: Wait for confirmation dialog and click the actual Logout button
  await page.waitForSelector('.logout-card');
  await Promise.all([
    page.waitForURL('**/#/login**', { timeout: 60000 }),
    page.locator('.logout-card .btn-logout').click(),
    
  ]);
});