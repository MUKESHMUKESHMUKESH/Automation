const { test, chromium } = require('@playwright/test');
const { playAudit } = require('playwright-lighthouse');

test.skip('Lighthouse Audit - Manager Page', async () => {
  test.setTimeout(120000);

  const browser = await chromium.launch({
    headless: false,
    args: ['--remote-debugging-port=9222'],
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  // 🔹 Step 1: Login
  await page.goto('https://pms-rent-frontend.onrender.com/#/login');

  await page.fill('[name="username"]', 'manager');
  await page.fill('[name="password"]', 'Manager@123');
  await page.click('button[type="submit"]');

  // 🔥 Step 2: WAIT properly (very important)
  await page.waitForTimeout(8000);

  // 🔍 Debug
  console.log('After login:', await page.url());

  // 🔹 Step 3: Go to manager page
  await page.goto('https://pms-rent-frontend.onrender.com/#/manager');

  // 🔥 Step 4: WAIT again (important)
  await page.waitForTimeout(5000);

  console.log('Before audit:', await page.url());

  // ❌ If still login → stop
  if ((await page.url()).includes('login')) {
    throw new Error('Still redirected to login - session not active');
  }

  // 🔹 Step 5: Run Lighthouse
  await playAudit({
    page,
    port: 9222,
    thresholds: {
      performance: 50,
    },
    reports: {
      formats: { html: true },
      name: 'manager-report',
      directory: './lighthouse-report',
    },
  });

  await browser.close();
});