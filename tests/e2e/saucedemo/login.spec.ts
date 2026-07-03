import { test } from '@playwright/test';
import { LoginPage } from '../../../pages/saucedemo/login.page';
import { users } from '../../../data/saucedemo/users';

test.describe('Login Feature', () => {

  test('Login successfully with valid account', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.openLoginPage();

    await loginPage.login(
      users.standard.username,
      users.standard.password
    );

    await loginPage.verifyLoginSuccess();
  });

  test('Login failed with invalid account', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.openLoginPage();

    await loginPage.login(
      users.invalid.username,
      users.invalid.password
    );

    await loginPage.verifyLoginError(
      'Username and password do not match'
    );
  });
  test('Login failed with invalid username and valid password', async ({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.openLoginPage();

    await loginPage.login(
        users.missingfirstname.username,
        users.missingfirstname.password
    );
    await loginPage.verifyLoginError(
        'Username is required'
    );
  });

  test('Login failed with valid username and invalid password', async ({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.openLoginPage();

    await loginPage.login(
        users.missinglastname.username,
        users.missinglastname.password
    );
    await loginPage.verifyLoginError(
        'Password is required'
    );
  });

});