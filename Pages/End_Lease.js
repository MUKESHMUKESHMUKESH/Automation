class EndLease {
  constructor(page) {
    this.page = page;
  }

  async End_lease(lease) {
    const page = this.page;

    await page.goto('https://rentgeniux.onrender.com/#/login');
    await page.locator('input[name="username"]').fill('francise');
    await page.locator('input[name="password"]').fill('Francise@123');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL('**/manager');

    await page.locator('.lucide-chevron-down').nth(2).click();
    await page.getByRole('button', { name: 'Manage Lease' }).click();

    await page.waitForSelector('tr.cursor-pointer');
    await page.locator('tr.cursor-pointer', { hasText: 'Occupied 7' }).first().click();

    await page.waitForSelector('.q-item');
    await page.locator('.q-item', { has: page.locator('.rented-badge') }).nth(1).click();

    await page.locator('.custom-loader-container').waitFor({ state: 'hidden' });
   await page.locator('button', { hasText: 'Action' }).first().click();
    const menu = page.locator('.q-menu');
    await menu.waitFor({ state: 'visible' });
    await menu.locator('.q-item__label', { hasText: /End Lease/ }).click();

    await page.waitForTimeout(5000);

  
  }
}

module.exports = { EndLease };