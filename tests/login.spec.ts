import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import users from '../test-data/users.json';

test.describe('Login Page', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should login with valid credentials', async () => {
    await loginPage.login(users.validUser.username, users.validUser.password);

    await expect(loginPage.flashMessage).toContainText('You logged into a secure area!');
  });

  test('should show error for invalid credentials', async () => {
    await loginPage.login(users.invalidUser.username, users.invalidUser.password);

    await expect(loginPage.flashMessage).toContainText('Your username is invalid!');
  });

  test('should logout successfully', async () => {
    await loginPage.login(users.validUser.username, users.validUser.password);
    await loginPage.logout();

    await expect(loginPage.flashMessage).toContainText('You logged out of the secure area!');
  });
});
