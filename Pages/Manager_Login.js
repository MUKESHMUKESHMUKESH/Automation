class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.locator('input[name="username"]');
    this.password = page.locator('input[name="password"]');
    this.loginBtn = page.getByRole('button', { name: 'Login' });
    this.avatar = page.locator('.q-avatar__content');
  }

  async login(username, password) {
    await this.page.goto('https://rentgeniux.onrender.com/#/login');
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginBtn.click();

    await this.page.waitForTimeout(1000);

    // Click avatar to open profile dropdown
    await this.avatar.click();
    await this.page.waitForTimeout(500);

    // Click the profile item (first item in dropdown, name-agnostic)
   
    // Step 8: Click "Logout" menu item to open confirmation dialog
    await this.page.locator('.q-item', { hasText: 'Logout' }).click();

    // Step 9: Wait for confirmation dialog and click the actual Logout button
    await this.page.waitForSelector('.logout-card');
    await Promise.all([
      this.page.waitForURL('**/#/login**', { timeout: 60000 }),
      this.page.locator('.logout-card .btn-logout').click(),
    ]);
  }
}

module.exports = { LoginPage };