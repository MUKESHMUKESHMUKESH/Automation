const { test, expect } = require('@playwright/test');
const { CalendarEvent } = require('../Pages/calendar-event');

test.describe('Calendar Event Flow', () => {
  test('should login and add a new calendar event', async ({ page }) => {
    const calendarEventPage = new CalendarEvent(page);

    

    await calendarEventPage.AddEvent();
  });
});