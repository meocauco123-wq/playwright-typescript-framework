import { test } from '@playwright/test';
import { LoginPage } from '../../../pages/saucedemo/login.page';
import { users } from '../../../data/saucedemo/users';

test.describe('Login feature', () => {

    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.openLoginPage();
    });

    test('Login successfully with valid account', async () => {

        await loginPage.login(
            users.standard.username,
            users.standard.password
        );

        await loginPage.verifyLoginSuccess();
    });

    test('Login failed with invalid account', async () => {

        await loginPage.login(
            users.invalid.username,
            users.invalid.password
        );

        await loginPage.verifyLoginError(
            'Username and password do not match any user in this service'
        );
    });

    test('Login failed with locked account', async () => {

        await loginPage.login(
            users.locked.username,
            users.locked.password
        );

        await loginPage.verifyLoginError(
            'Sorry, this user has been locked out.'
        );
    });

    test('Login failed with missing username', async () => {

        await loginPage.login(
            users.missingusername.username,
            users.missingusername.password
        );

        await loginPage.verifyLoginError(
            'Username is required'
        );
    });

    test('Login failed with missing password', async () => {

        await loginPage.login(
            users.missingpassword.username,
            users.missingpassword.password
        );

        await loginPage.verifyLoginError(
            'Password is required'
        );
    });

});