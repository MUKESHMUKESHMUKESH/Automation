const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://pms-rent-frontend.onrender.com/#/login');

  await page.fill('[name="username"]', 'manager');
  await page.fill('[name="password"]', 'Manager@123');
  await page.click('button[type="submit"]');

  await page.waitForTimeout(5000); // wait for login

  // ✅ Save session
  await context.storageState({ path: 'auth.json' });

  await browser.close();
})();