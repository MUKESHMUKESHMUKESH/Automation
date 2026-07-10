const { test, expect } = require('@playwright/test');
test.setTimeout(800000);

const { TenantOnboardingPage } = require('../Pages/tenantonboarding.js');
const tenantData = require('../testdata/tenantdata');

const tenant = tenantData[0];

test('Manager → Tenant Onboarding Flow', async ({ page }) => {
  const tenantOnboardingPage = new TenantOnboardingPage(page);
  await tenantOnboardingPage.addTenant(tenant);
});