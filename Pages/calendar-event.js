const { LoginPage } = require('../Pages/Manager_Login');

class CalendarEvent {
  constructor(page) {
    this.page = page;
  }

  async AddEvent() {
    const page = this.page;

    const loginPage = new LoginPage(page);
    await loginPage.login();

    await page.locator('button.nav-btn', { hasText: 'Calendar' }).click();
    await page.locator('button.new-event-btn', { hasText: 'New Event' }).click();

    // Fill in event details using the passed-in `event` object
    // Adjust field selectors below once you share the "New Event" form DOM
  
  }
}

module.exports = { CalendarEvent };