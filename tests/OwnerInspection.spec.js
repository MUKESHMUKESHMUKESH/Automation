const { test, expect } = require('@playwright/test');
test.setTimeout(800000);

const { OwnerInspection } = require('../Pages/OwnerInspection.js');
const ownerData = require('../testdata/ownerdata');

const owner = ownerData[0];

test('Manager → Owner Inspection Flow', async ({ page }) => {
  const ownerInspection = new OwnerInspection(page);
  await ownerInspection.Inspection(owner);
});