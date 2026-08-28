const { test, expect } = require('@playwright/test');
const { InvoicePage } = require('../Pages/invoice');

test.describe('Invoice Creation Flow', () => {
  test('should create invoice and search tenant', async ({ page }) => {
    test.setTimeout(60000); // give it more headroom since this is a long flow

    const invoicePage = new InvoicePage(page);
    const { ownerName, tenantName } = await invoicePage.createInvoice();

    console.log('Owner Name:', ownerName);
    console.log('Tenant Name:', tenantName);

    expect(ownerName).not.toBe('');
    expect(tenantName).not.toBe('');
  });
});