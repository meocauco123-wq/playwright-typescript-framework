import { test } from '@playwright/test';
import { LoginPage } from '../../../pages/saucedemo/login.page';
import { users } from '../../../data/saucedemo/users';

test ('demo', async ({page}) => {
    await page.goto('https://www.saucedemo.com/');
})