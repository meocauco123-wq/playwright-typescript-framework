import { test, expect } from '@playwright/test';

test('login API - null password', async ({ request }) => {

    const payload = {
        username: 'admin',
        password: null
    };

    const response = await request.post('/auth', {
        data: payload
    });

    const body = await response.json();

    console.log(body);

    expect(body.reason)
        .toBe('Bad credentials');
});