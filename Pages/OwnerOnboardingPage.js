const { LoginPage } = require('../Pages/Manager_Login');

class OwnerOnboardingPage {
  constructor(page) {
    this.page = page;
  }

  async addOwner(owner) {   // .use the parameter directly, no re-import, no hardcoded index
    const page = this.page;
   
  
                       
    const loginPage = new LoginPage(page);
    await loginPage.login();

    // Click Owners menu
    await page.locator('button.nav-btn').filter({ hasText: 'Owners' }).click();

    // Click Manage Owners
    await page.locator('button.submenu-btn').filter({ hasText: 'Manage Owners' }).click();

    // Click Add Owner
    await page.locator('span.q-btn__content').filter({ hasText: 'Add Owner' }).click();

    // .First Name
    await page.locator('input.q-field__native[placeholder="eg., John"]').click();
    await page.locator('input.q-field__native[placeholder="eg., John"]').fill(owner.firstName);
    console.log('.First Name filled!');

    // .Last Name
    await page.locator('input.q-field__native[placeholder="eg., Doe"]').click();
    await page.locator('input.q-field__native[placeholder="eg., Doe"]').fill(owner.lastName);
    console.log('.Last Name filled!');

    // .Email ID
    await page.locator('input.q-field__native[placeholder="eg., johndoe@gmail.com"]').click();
    await page.locator('input.q-field__native[placeholder="eg., johndoe@gmail.com"]').fill(owner.email);
    console.log('.Email filled!');

    // .Phone Number (nth 0)
    await page.locator('input.q-field__native[placeholder="eg., +1 555 123 4567"]').nth(0).click();
    await page.locator('input.q-field__native[placeholder="eg., +1 555 123 4567"]').nth(0).fill(owner.phone);
    console.log('.Phone Number filled!');

    // .Emergency Number (nth 1)
    await page.locator('input.q-field__native[placeholder="eg., +1 555 123 4567"]').nth(1).click();
    await page.locator('input.q-field__native[placeholder="eg., +1 555 123 4567"]').nth(1).fill(owner.emergencyContact);
    console.log('.Emergency Number filled!');

    // .Fill address
    await page.locator('input[placeholder="Search Address"]').fill(owner.address);
    await page.waitForTimeout(1000);
    await page.locator('.q-item').first().click();
    console.log('.Address filled!');

    // .City
    await page.locator('input.q-field__native[placeholder="eg., New York"]').click();
    await page.locator('input.q-field__native[placeholder="eg., New York"]').fill(owner.city);
    console.log('.City filled!');

    // .Select State dropdown
    await page.locator('[placeholder="Select State"]').click();
    await page.waitForTimeout(1000);
    await page.locator('[role="option"]').nth(1).click();
    console.log('.State selected!');

    // .Zip Code
    await page.locator('input.q-field__native[placeholder="eg., 10001"]').click();
    await page.locator('input.q-field__native[placeholder="eg., 10001"]').fill(owner.zipCode);
    console.log('.Zip Code filled!');
    await page.waitForTimeout(5000);

    await page.getByRole('button', { name: 'Next' }).click();
    console.log('.Next button clicked!');
    await page.waitForTimeout(5000);

    // .SSN (9 digits - XXX-XX-XXXX format)
    await page.locator('input.q-field__native[placeholder="XXX-XX-XXXX"]').click();
    await page.locator('input.q-field__native[placeholder="XXX-XX-XXXX"]').fill(owner.ssn);
    console.log('.SSN filled!');

    await page.locator('input[type="file"]').nth(0).setInputFiles(owner.document1);
    await page.locator('input[type="file"]').nth(1).setInputFiles(owner.document2);
    await page.locator('input[type="file"]').nth(2).setInputFiles(owner.document3);
    await page.locator('input[type="file"]').nth(3).setInputFiles(owner.document4);

    // .Click enabled Next button (data-v-b16f8748)
    await page.getByRole('button', { name: 'Next' }).click();
    console.log('.Next button clicked!');
    await page.waitForTimeout(5000);

    // .Username
    await page.locator('input.q-field__native[type="text"]').last().click();
    await page.locator('input.q-field__native[type="text"]').last().fill(owner.username);
    console.log('.Username filled!');

    // .Password
    await page.locator('input.q-field__native[type="password"]').nth(0).click();
    await page.locator('input.q-field__native[type="password"]').nth(0).fill(owner.password);
    console.log('.Password filled!');

    // .Confirm Password
    await page.locator('input.q-field__native[type="password"]').nth(1).click();
    await page.locator('input.q-field__native[type="password"]').nth(1).fill(owner.confirmPassword);
    console.log('.Confirm Password filled!');

    // .Click Create Account and wait for 2 minutes
    await page.locator('button.create-btn').click();
    console.log('.Create Account clicked!');

    await page.waitForTimeout(13000); // 2 minutes
    console.log('.Wait complete!');

// Click the profile card (avatar section) to open the account menu
await page.locator('.q-item').filter({ has: page.locator('.q-avatar') }).click();

// Wait for the dropdown/menu to appear
await page.locator('.q-menu').waitFor({ state: 'visible' });

// Click "Logout" from the menu
await page.getByText('Logout', { exact: true }).click();
await page.locator('button.btn-logout').click();

await page.waitForTimeout(3000);
console.log('.Logout confirmed!');

    await page.goto('https://pms-rentgeniux.onrender.com/#/login');
    await page.locator('input[name="username"]').fill(owner.username);
    await page.locator('input[name="password"]').fill(owner.password);
    await page.getByRole('button', { name: 'Sign in to your account' }).click();
    await page.waitForTimeout(1000);

    // Click the Upload Image button and handle file upload
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.locator('button.upload-btn span.block:has-text("Upload Image")').click()
    ]);

    await fileChooser.setFiles('./tests/files/profile.png');
    await page.getByRole('button', { name: 'Add Properties' }).click();
    await page.waitForTimeout(2000);

    // .Property Name
    await page.locator('input[type="text"]').first().fill(owner.propertyName);
    console.log('.Property Name filled!');

    await page.locator('input[role="combobox"]').nth(0).click();
    await page.waitForSelector('[role="option"]', { state: 'visible' });
    await page.getByText('House', { exact: true }).click();
    await page.waitForTimeout(500);
    console.log('.House selected!');

    // .Year Built
    await page.locator('input[type="number"]').nth(0).fill(owner.yearBuilt);
    console.log('.Year Built filled!');

    // .Furnishing Status Dropdown
    await page.locator('input[role="combobox"]').nth(1).click();
    await page.waitForSelector('[role="option"]', { state: 'visible' });
    await page.getByText('Unfurnished', { exact: true }).click();
    await page.waitForTimeout(500);
    console.log('.Furnishing Status selected!');

    await page.locator('textarea[rows="6"]').nth(0).fill(owner.description);
    await page.waitForTimeout(500);
    console.log('.Description filled!');

    // .Address
    await page.locator('input[placeholder="Search Address"]').fill('ad');
    await page.waitForTimeout(2000);

    await page.locator('[role="option"]').first().click({ force: true });
    await page.waitForTimeout(500);
    console.log('.Address selected!');
      
     await page.locator('input.pet_input').check();
     // Click the "Dogs" checkbox by its label text
      await page.getByText('Dogs', { exact: true }).click();

       await page.getByText('Small', { exact: true }).click();


    // .Amenities
    await page.getByRole('button', { name: 'Select amenities' }).click();
    await page.getByText('Swimming Pool', { exact: true }).click();
    console.log('.Amenities selected!');

    // .Parking Type
    await page.getByText('Select parking type').click();
    await page.getByText('Garage Lot', { exact: true }).click();
    console.log('.Parking Type clicked!');

    // .Upload Property Files
    await page.locator('input[type="file"]').nth(0).setInputFiles('./tests/files/property2.jpg');
    await page.locator('input[type="file"]').nth(1).setInputFiles('./tests/files/owner-document.pdf');

    await page.waitForTimeout(1000);
    console.log('.Property files uploaded!');

    // .Continue to Unit
    await page.getByRole('button', { name: 'Continue' }).click();
    console.log('.Continue clicked!');

    // .Wait for Unit Details page
    await page.waitForSelector('text=Unit Details', { state: 'visible', timeout: 15000 });
    await page.waitForTimeout(2000);
    console.log('.Unit Details page loaded!');

    // .Click Add Unit button
    await page.getByRole('button', { name: 'Add Unit' }).click();
    await page.waitForTimeout(2000);
    console.log('.Add Unit clicked!');

    // .Unit Name
  
  for (let i = 0; i < owner.units.length; i++) {
  const unit = owner.units[i];
  const isLastUnit = i === owner.units.length - 1;

  console.log(`--- Adding Unit ${i + 1} (${unit.unitName}) ---`);

 

  await page.locator('input[type="text"].q-field__native').last().fill(unit.unitName);
  await page.waitForTimeout(500);

  await page.locator('input[type="number"].q-field__native:visible').nth(0).fill(unit.floorNumber);
  await page.waitForTimeout(500);

  await page.locator('input[type="number"].q-field__native:visible').nth(1).fill(unit.Bedrooms);
  await page.waitForTimeout(500);

  await page.locator('input[type="number"].q-field__native:visible').nth(2).fill(unit.Bathrooms);
  await page.waitForTimeout(500);

  await page.locator('input[type="number"].q-field__native:visible').nth(3).fill(unit.fullBathrooms);
  await page.waitForTimeout(500);

  await page.locator('input[type="number"].q-field__native:visible').nth(4).fill(unit.halfBathrooms);
  await page.waitForTimeout(500);

  await page.locator('input[type="number"].q-field__native:visible').nth(5).fill(unit.builtArea);
  await page.waitForTimeout(500);

  await page.locator('text=Rent Details').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);

  await page.locator('input[type="number"].q-field__native:visible').nth(6).fill(unit.rentAmount);
  await page.waitForTimeout(500);

  await page.locator('input[type="number"].q-field__native:visible').nth(7).fill(unit.lowPrice);
  await page.waitForTimeout(500);

  await page.locator('input[type="number"].q-field__native:visible').nth(8).fill(unit.highPrice);
  await page.waitForTimeout(500);

  await page.locator('textarea[rows="4"]').last().fill(unit.unitDescription);
  await page.waitForTimeout(500);

  await page.locator('input[type="file"]').nth(2).setInputFiles(unit.unit_image);
  await page.waitForTimeout(1000);

  await page.locator('input[type="file"]').nth(3).setInputFiles(unit.unit_pdf);
  await page.waitForTimeout(1500);

   await page.getByRole('button', { name: 'Add' }).click();
  await page.waitForTimeout(1000);
  


  if (!isLastUnit) {
    await page.getByRole('button', { name: 'Add Unit' }).click();
    await page.waitForTimeout(10000);
    console.log(`Unit ${i + 1} (${unit.unitName}) saved.`);
  } else {
    console.log(`Unit ${i + 1} (${unit.unitName}) filled but not submitted - last unit.`);
  }
}


console.log('Finished processing all units.');


    await page.getByRole('button', { name: 'Save', exact: true }).click();
    await page.waitForTimeout(5000);
    console.log(' Unit Saved!');

    
await page.locator('i.material-icons', { hasText: 'logout' }).click();

await page.waitForSelector('.logout-card', { state: 'visible' });
await page.waitForTimeout(1000);

// .Step 5: Confirm Logout
await page.locator('.logout-card .btn-logout').click();

await page.waitForTimeout(5000);
console.log('.Logout confirmed!');


   const loginPage1 = new LoginPage(page);
    await loginPage1.login();
   

    await page.locator('button.nav-btn').filter({ hasText: 'Properties' }).click();
    await page.waitForTimeout(1000);
    await page.locator('button.submenu-btn').filter({ hasText: 'Manage Properties' }).click();
    await page.waitForLoadState('networkidle');

    await page.locator('div.q-tab__label:has-text("Review")').click();
    await page.waitForTimeout(1000);
    console.log('.Review tab clicked!');

    await page.locator('input[placeholder="Search"]').fill(owner.propertyName);
    await page.waitForTimeout(1000);
    console.log('.Property searched!');

    await page.locator('i.material-icons:has-text("more_vert")').click();
    await page.waitForTimeout(500);
    console.log('.More options clicked!');

    await page.locator('span.text-default:has-text("Edit")').click();
    await page.waitForTimeout(1000);
    console.log('.Edit clicked!');

    await page.locator('span.gt-xs:has-text("Property Details")').click();
    await page.waitForTimeout(1000);
    console.log('.Property Details clicked!');

  

    await page.locator('span.gt-xs:has-text("Unit Name")').click();
    await page.waitForTimeout(1000);
    console.log('.Unit Name tab clicked!');
  }
  
async completeAllIncompleteUnits() {
    const statusChips = this.page.locator('.status-chip.rented-chip');
    const editButtons = this.page.locator('span.block:has-text("Edit")');

    const count = await statusChips.count();
    console.log(`Found ${count} units on the page`);

    for (let i = 0; i < count; i++) {
      const statusText = (await statusChips.nth(i).innerText()).trim();
      console.log(`Unit ${i + 1} status: ${statusText}`);

      if (statusText !== 'Incomplete') {
        console.log(`Unit ${i + 1} is "${statusText}" → stopping loop.`);
        break;
      }

      console.log(`Unit ${i + 1} is Incomplete → editing...`);
      await editButtons.nth(i).click();
      await this.page.waitForTimeout(1000);
      console.log('.Edit clicked!');

      await this.page.locator('.q-radio', { hasText: 'Flexible' }).click();
      await this.page
        .locator('xpath=//div[contains(@class,"q-radio") and contains(., "Flexible")]/following::input[@type="number"][@max="50"][1]')
        .fill('10');
      console.log('.Field filled!');


      await this.page.locator('label:has(img[src="/icons/percent.png"]) input[type="number"][max="30"]')
  .nth(11).click.fill('20');

      await this.page.getByRole('button', { name: 'Update' }).click();
      await this.page.waitForTimeout(5000);
      console.log('.Saved!');

      

      await this.page.goBack();
      await this.page.waitForTimeout(1000);
    } // ← closes the for loop
   await this.page.getByRole('button', { name: 'Save', exact: true }).click();
      await this.page.waitForTimeout(2000);
      console.log('.Save clicked!');
    console.log('Finished processing all Incomplete units.');


    await page.getByRole('tab', { name: 'Review' }).click();
      await page.waitForTimeout(1000);

      // . Verify Steps
      await this.page.locator('button.verify-btn-active').first().click();
      await this.page.waitForTimeout(1000);
      await this.page.locator('.q-card').getByRole('button', { name: 'Preview and Verify' }).click();
      await this.page.waitForTimeout(5000);
      await this.page.locator('button.verify-btn').click();
      await this.page.waitForTimeout(5000);
      await this.page.waitForSelector('.q-card', { timeout: 10000 });
      await this.page.locator('.q-card').getByRole('button', { name: 'Verify' }).click();
  } // ← closes completeAllIncompleteUnits()
} // ← closes the class

module.exports = { OwnerOnboardingPage };




