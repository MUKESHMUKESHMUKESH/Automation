const { test, expect } = require('@playwright/test');
test.setTimeout(800000);

const { TenantOnboardingPage } = require('../Pages/tenantonboarding.js');
const tenantData = require('../testdata/tenantdata');

const tenant = tenantData[3];

test('Manager → Tenant Onboarding Flow', async ({ page }) => {
  const tenantOnboardingPage = new TenantOnboardingPage(page);

  const start = Date.now();
  await tenantOnboardingPage.addTenant(tenant);
  const total = Date.now() - start;
  console.log(`Total onboarding flow: ${total}ms`);
});