import { test, expect } from "@playwright/test";

test('login API - get token', async ({request}) => {
    const res = await request.post('/auth', {
        data: {
            username: "admin",
            password: "password123"
        }
    });
    const body = await res.json();

    expect(res.status()).toBe(200);
    expect(body.token).toBeDefined();
})