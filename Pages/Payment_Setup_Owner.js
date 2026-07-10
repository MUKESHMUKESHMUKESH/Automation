const { LoginPage } = require('../Pages/Manager_Login');

class PaymentSetup {
  constructor(page) {
    this.page = page;
  }

  async setupPayment(owner) {   // ✅ renamed from addOwner to setupPayment
    const page = this.page;

    await page.locator('.lucide-chevron-down').nth(0).click();

  await page.getByRole('button', { name: 'Inspection' }).click();

    await page.getByRole('button', { name: 'Manage Owners' }).click();

     // adjust field — see note below
    await page.locator('button.setup-payment-btn').nth(0).click();

            
      // Select the Stripe Connect radio option
          const stripeRow = page.locator('.row.items-center', { hasText: 'Stripe Connect' });
          await stripeRow.scrollIntoViewIfNeeded();
          await stripeRow.locator('.q-radio').click();
          console.log('✅ Stripe Connect selected!');
          
    // Click Continue
      const [stripePage] = await Promise.all([
    page.context().waitForEvent('page'),
    page.getByRole('button', { name: 'Continue' }).click(),
  ]);

  await stripePage.waitForLoadState();
  console.log('✅ Stripe page opened!');

  // Now interact directly with stripePage — NOT a frameLocator
  await stripePage.getByTestId('express-account-setup-phone-entry-fill-testmode').click();
  console.log('✅ Test phone number filled!');

  await stripePage.locator('[data-test="test-mode-fill-button"]').click();
  console.log('✅ Test code filled!');

  await stripePage.getByRole('button', { name: 'Submit' }).click();
  console.log('✅ Submit clicked!');


    // Stripe iframe — see note below, this likely needs frameLocator
    await page.getByTestId('express-account-setup-phone-entry-fill-testmode').click();
    await stripeFrame.getByRole('button', { name: 'Submit' }).click();

        
  }
}

module.exports = { PaymentSetup };