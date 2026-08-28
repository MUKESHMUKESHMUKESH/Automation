const { LoginPage } = require('../Pages/Manager_Login');

class AddPropertyPage {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
  }

  async addAllProperties(propertyData) {
    const page = this.page;

    // . Login ONCE
    await this.loginPage.login();

    // . Navigate
    await page.locator('button.nav-btn').filter({ hasText: 'Properties' }).click();
    await page.waitForTimeout(1000);
    await page.locator('button.submenu-btn').filter({ hasText: 'Manage Properties' }).click();
    await page.waitForLoadState('networkidle');

    // . FOR LOOP starts here
    for (let i = 0; i < propertyData.length; i++) {
      const property = propertyData[i];
      console.log(`\n🔄 Adding Property ${i + 1}/${propertyData.length}: ${property.propertyName}`);

      // . Click Add Property
      await page.locator('div.text-black.text-weight-medium', { hasText: 'Add Property' }).click();
      await page.waitForTimeout(10000);

      // . Select Owner dropdown - nth(0) to avoid strict mode error
      await page.locator('input[role="combobox"]').nth(0).click();
      await page.waitForSelector('[role="option"]');
      await page.locator('[role="option"]').nth(0).click();
      console.log('. Owner selected!');

      // . Click Continue
      await page.locator('span.block', { hasText: 'Continue' }).click();
      await page.waitForTimeout(1000);

      // . Property Name
      await page.locator('input[type="text"]').first().fill(property.propertyName);
      console.log('. Property Name filled!');

      // . Property Type Dropdown
      await page.locator('input[role="combobox"]').nth(0).click();
      await page.waitForSelector('[role="option"]');
      await page.getByText('Large').click();
      console.log('. Property Type selected!');

      // . Year Built
      await page.locator('input[type="number"]').nth(0).fill(property.yearBuilt);
      console.log('. Year Built filled!');

      // . Furnishing Status Dropdown
      await page.waitForTimeout(1000);
      const options = await page.locator('.q-item').allTextContents();
      console.log(options);
      await page.locator('.q-item').first().click();
      await page.locator('input[role="combobox"]').nth(1).click();
      await page.waitForTimeout(2000);
      await page.locator('[role="option"]').first().click({ force: true });
      console.log('. Furnishing Status selected!');

      // . Address
      await page.locator('input[type="search"][role="combobox"]').fill(property.address);
      await page.waitForTimeout(1000);
      console.log('. Address filled!');

      // . City
      await page.locator('input[type="text"]').nth(1).fill(property.city);
      console.log('. City filled!');

      // . Country
      await page.locator('input[placeholder="Enter country"]').fill(property.country);
      console.log('. Country filled!');

      // . City Name
      await page.getByPlaceholder('Enter city name').fill(property.city);
      console.log('. City Name filled!');

      // . State
      await page.locator('input[placeholder="Enter state"]').fill(property.state);
      console.log('. State filled!');

      // . Zip Code
      await page.locator('input[placeholder="Enter zipcode"]').fill(property.zipCode);
      console.log('. Zip Code filled!');

      // . Description
      await page.locator('textarea[placeholder="Enter property description"]').fill(property.comments);
      console.log('. Description filled!');

      // . Amenities
      await page.getByRole('button', { name: 'Select amenities' }).click();
      await page.getByText('Swimming Pool', { exact: true }).click();
      console.log('. Amenities selected!');

      // . Parking Type
      await page.locator('span.ellipsis:has-text("Select parking type")').click();
      await page.waitForTimeout(1000);
      await page.getByText('Garage Lot', { exact: true }).click();
      await page.waitForTimeout(500);
      console.log('. Parking Type - Garage Lot selected!');

      // . Upload Property Files
      await page.locator('input[type="file"]').nth(0).setInputFiles(property.property_image);
      await page.locator('input[type="file"]').nth(1).setInputFiles(property.property_doc);
      console.log('. Property files uploaded!');

      // . Continue to Unit
      await page.getByRole('button', { name: 'Continue' }).click();
      console.log('. Continue clicked!');

      // . Add Unit
      await page.getByRole('button', { name: 'Add Unit' }).click();
      console.log('. Add Unit clicked!');

      for (let j = 0; j < property.units.length; j++) {
        const unit = property.units[j];
        const isLastUnit = j === property.units.length - 1;

        console.log(`--- Adding Unit ${j + 1} (${unit.unitName}) ---`);

        // . Unit Name (use .last() — after the first unit is added, its Unit Name
        // field stays in the DOM, so .first() would keep hitting the old unit instead
        // of the new blank field for subsequent units)
        await page.locator('input[type="text"].q-field__native').last().fill(unit.unitName);
        console.log('. Unit Name filled!');

        // . Number Inputs
        const numberInputs = page.locator('input[type="number"]:not([readonly])');
        await numberInputs.nth(0).pressSequentially(unit.floorNumber);
        await numberInputs.nth(1).pressSequentially(unit.bedrooms);
        await numberInputs.nth(2).pressSequentially(unit.bathrooms);
        await numberInputs.nth(3).pressSequentially(unit.fullBathrooms);
        await numberInputs.nth(4).pressSequentially(unit.halfBathrooms);
        await numberInputs.nth(5).pressSequentially(unit.builtArea);
        console.log('. Number inputs filled!');

        // . Rent & Price
        // Select Flexible rent type
        await page.locator('.q-radio', { hasText: 'Flexible' }).click();
        await page.waitForTimeout(500);
        console.log('. Flexible rent type selected!');

        // Fill Monthly Rent
        await page
          .locator('div', { hasText: /^Monthly Rent/ })
          .locator('input[type="number"]')
          .first()
          .fill('5000');

        // Fill Management Fee (%) — distinguished from the linked $ field by max="50"
        await page
          .locator('div', { hasText: 'Management Fee' })
          .locator('input[type="number"][max="50"]')
          .first()
          .fill('30');
        await page.waitForTimeout(300);
        console.log('. Management Fee (%) filled!');

        // Fill Owner Reserve Fund (%)
        await page
          .locator('div', { hasText: 'Owner Reserve Fund' })
          .locator('input[type="number"][max="50"]')
          .first()
          .fill('50');
        await page.waitForTimeout(300);
        console.log('. Owner Reserve Fund (%) filled!');

        await page.locator('input[type="number"][min="0"][step="1"]').nth(7).pressSequentially(unit.lowPrice);
        await page.locator('input[type="number"][min="0"][step="1"]').nth(8).pressSequentially(unit.highPrice);
        console.log('. Rent & Price filled!');

        // . Unit Description
        await page.locator('textarea.q-field__native.q-placeholder').fill(unit.unitDescription);
        console.log('. Unit Description filled!');

        // . Late Fee Percentage
        await page.locator('input[type="number"][max="30"]').pressSequentially(unit.lateFeePercentage);
        console.log('. Late Fee filled!');

        // . Upload Unit Files
        await page.locator('input[type="file"]').nth(0).setInputFiles(unit.unit_image);
        await page.locator('input[type="file"]').nth(1).setInputFiles('./tests/files/floor.jpg');
        console.log(' .Unit files uploaded!');

        // . Click Add Unit
        await page.locator('button.add-btn').click();
        await page.waitForTimeout(3000);
        console.log('. Unit Added!');

        // . Save
        if (!isLastUnit) {
          await page.getByRole('button', { name: 'Add Unit' }).click();
          await page.waitForTimeout(2000);
          console.log(`Unit ${j + 1} (${unit.unitName}) saved.`);
        } else {
          console.log(`Unit ${j + 1} (${unit.unitName}) filled but not submitted - last unit.`);
        }
      }

      await page.getByRole('button', { name: 'Save' }).click();
      await page.waitForTimeout(5000);
      console.log('. Saved!');

      // . Review Tab
      await page.getByRole('tab', { name: 'Review' }).click();
      await page.waitForTimeout(1000);

      // . Verify Steps
      await page.locator('button.verify-btn-active').first().click();
      await page.waitForTimeout(1000);
      await page.locator('.q-card').getByRole('button', { name: 'Preview and Verify' }).click();
      await page.waitForTimeout(5000);
      await page.locator('button.verify-btn').click();
      await page.waitForTimeout(5000);
      await page.waitForSelector('.q-card', { timeout: 10000 });
      await page.locator('.q-card').getByRole('button', { name: 'Verify' }).click();
      await page.waitForTimeout(3000);
      console.log(`. Property ${i + 1} Done: ${property.propertyName}`);

      // . Screenshot per property
      await page.screenshot({
        path: `tests/screenshots/Property_${i + 1}.png`,
        fullPage: true,
      });

    } // . FOR LOOP ends here

    console.log('. All Properties Added Successfully!');
  }
}

module.exports = { AddPropertyPage };