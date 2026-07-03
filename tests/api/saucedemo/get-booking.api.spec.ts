import { test, expect } from "@playwright/test";

test('get-booking - get method', async ({request}) => {

    const res = await request.get('/booking');

    const body = await res.json();

    expect(res.status()).toBe(200);
    // verify list
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);

    // verify structure
    expect(body[0]).toHaveProperty('bookingid');
}
 )