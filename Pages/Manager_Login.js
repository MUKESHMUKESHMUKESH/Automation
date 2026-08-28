class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.locator('input[name="username"]');
    this.password = page.locator('input[name="password"]');
    this.loginBtn = page.getByRole('button', { name: 'Sign in to your account' });
    this.avatar = page.locator('.q-avatar__content');
  }

  async login(username, password) {
    await this.page.goto('https://rentgeniux.onrender.com/#/manager/owners');
    await this.username.fill('Mahi');
    await this.password.fill('Mahi@123');

    await this.loginBtn.waitFor({ state: 'visible' });
    await this.loginBtn.click({ force: true });

    await this.page.waitForTimeout(1000);
  }
}

module.exports = { LoginPage };