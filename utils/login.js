async function loginAsManager(page) {
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
  await page.locator('input[name="username"]').fill('victoria');
  await page.locator('input[name="password"]').fill('Victoria@123');

  // Step 5: Wait for Login button and click
  await page.waitForSelector('button:has-text("Login")', { 
    state: 'visible', 
    timeout: 10000 
  });
  await page.getByRole('button', { name: 'Login' }).click();

  // Step 6: Wait for URL to leave login page
  await page.waitForFunction(
    () => !window.location.href.includes('#/login'),
    { timeout: 90000 }
  );

  // Step 7: Confirm manager dashboard loaded
  await page.waitForURL('**/manager**', { timeout: 30000 });

  console.log('✅ Login successful - Manager dashboard loaded');
}

module.exports = { loginAsManager };