
const { test } = require('@playwright/test');
const { LoginPage } = require('../Pages/Manager_Login');

test('Manager login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login('manager', 'Manager@123');
});

const { test, devices } = require('@playwright/test');
const ownerdata = require('../testdata/ownerdata');
const { OwnerOnboardingPage } = require('../Pages/OwnerOnboardingPage.js');
const { PaymentSetup } = require('../Pages/Payment_Setup_Owner');

const owner = ownerdata[0];


test.setTimeout(300000);

test('Manager → Add Owner', async ({ page }) => {
  const ownerOnboardingPage = new OwnerOnboardingPage(page);
  await ownerOnboardingPage.addOwner(owner);
});