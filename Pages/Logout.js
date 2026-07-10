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