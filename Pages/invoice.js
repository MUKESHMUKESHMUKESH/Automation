const { LoginPage } = require('../Pages/Manager_Login');
const { expect } = require('@playwright/test');

class InvoicePage {
  constructor(page) {
    this.page = page;
  }

  async createInvoice() {
    const page = this.page;

    // Login
    const loginPage = new LoginPage(page);
    await loginPage.login();

    // Navigate to Invoice page
    await page.locator('.navbar-label', { hasText: 'Invoice' }).click();
    await page.locator('.text-weight-medium', { hasText: 'Create Invoice' }).click();

    // Select first property
    await page.locator('text=Select Property').locator('..').locator('select, [role="combobox"]').first().click();
    await page.getByRole('option').first().click();

    // Wait for any loading overlay to clear before continuing
    await page.locator('.custom-loader-container').waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});

    // Select first unit
    await page.locator('text=Select Unit').locator('..').locator('select, [role="combobox"]').first().click();
    await page.getByRole('option').first().click();

    await page.locator('.custom-loader-container').waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});

    // Wait for Owner Name and Tenant Name to actually get populated
    const ownerInput = page.locator('input[placeholder="Owner Name"]');
    await expect(ownerInput).not.toHaveValue('', { timeout: 10000 });

    const tenantInput = page.locator('input[placeholder="Tenant Name"]');
    await expect(tenantInput).not.toHaveValue('', { timeout: 10000 });

    const ownerName = await ownerInput.inputValue();
    const tenantName = await tenantInput.inputValue();

    // Click Create Invoice
    await page.getByRole('button', { name: 'Create Invoice' }).click();

    await page.locator('.custom-loader-container').waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});

    // Open the tenant management chevron/dropdown
    await page.locator('.lucide-chevron-down').nth(2).click();

    await page.getByRole('button', { name: 'Manage Tenant' }).click();

    // Search for the captured tenant name
    const searchInput = page.locator('input[placeholder="Search"]');
    await searchInput.click();
    await searchInput.fill(tenantName);
    await searchInput.press('Enter');

    return { ownerName, tenantName };
  }
}

module.exports = { InvoicePage };