class RenewLease {
  constructor(page) {
    this.page = page;
  }

  async renew_lease(lease) {
    const page = this.page;

    await page.goto('https://rentgeniux.onrender.com/#/login');
    await page.locator('input[name="username"]').fill('francise');
    await page.locator('input[name="password"]').fill('Francise@123');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL('**/manager');

    await page.locator('.lucide-chevron-down').nth(2).click();
    await page.getByRole('button', { name: 'Manage Lease' }).click();

    await page.waitForSelector('tr.cursor-pointer');
    await page.locator('tr.cursor-pointer', { hasText: 'Occupied 3' }).first().click();

    await page.waitForSelector('.q-item');
    await page.locator('.q-item', { has: page.locator('.rented-badge') }).first().click();

    await page.locator('.custom-loader-container').waitFor({ state: 'hidden' });
    await page.locator('button.custom-action-dropdown', { hasText: 'Action' }).first().click();
    const menu = page.locator('.q-menu');
    await menu.waitFor({ state: 'visible' });
    await menu.locator('.q-item__label', { hasText: /Renew Lease/ }).click();

    await page.waitForTimeout(5000);

    await page.locator('button', { hasText: 'Next' }).click();
     await page.waitForTimeout(5000);

     await page.locator('button', { hasText: 'Next' }).click();
     await page.waitForTimeout(5000);

    await page.getByRole('button', { name: 'Save & Send' }).click();
    await page.waitForTimeout(10000);
  }
}

module.exports = { RenewLease };