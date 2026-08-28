const { test } = require('@playwright/test');
const { AddPropertyPage } = require('../Pages/AddProperty');
test.setTimeout(800000);
const propertyData = require('../testdata/addpropertydata');
 
test('Manager → Add Property', async ({ page }) => {
  const addPropertyPage = new AddPropertyPage(page);
  await addPropertyPage.addAllProperties(propertyData); // logs in once, loops all properties
});