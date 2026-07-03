import { test, expect } from '@playwright/test';
import { BookingAPI } from '../../../api/saucedemo/booking.api';
import { bookingData } from '../../../data/saucedemo/booking.data';

test.describe('POST /booking', () => {
    test ('create booking success', async ({request}) => {
        const api = new BookingAPI(request);

        const res = await api.create(bookingData.valid);
        const body = await res.json();

        expect(res.status()).toBe(200);
        expect(body.booking.firstname).toBe(bookingData.valid.firstname);
        expect(body).toHaveProperty("bookingid");
        expect(body).toHaveProperty("bookingid");

        expect(body).toMatchObject({
        bookingid: expect.any(Number),
        booking: {
            firstname: bookingData.valid.firstname,
            lastname: bookingData.valid.lastname,
            totalprice: expect.any(Number),
            depositpaid: expect.any(Boolean),
            bookingdates: {
            checkin: expect.any(String),
            checkout: expect.any(String)
            }
        }});
        expect(res.headers()['content-type']).toContain('application/json');
        expect(res.ok()).toBeTruthy();


    });
    
    const invalidCases = [
        { name: 'missing firstname', data: bookingData.invalid.missingFirstname, expectedStatus: 500 },
        { name: 'empty firstname', data: bookingData.invalid.emptyFirstname, expectedStatus: 200 },
        { name: 'negative price', data: bookingData.invalid.negativePrice, expectedStatus: 200 },
        { name: 'invalid date', data: bookingData.invalid.invalidDate, expectedStatus: 200 }
        ];

    for (const tc of invalidCases) {
        test(`create booking fail - ${tc.name}`, async ({ request }) => {
            const api = new BookingAPI(request);

            const res = await api.create(tc.data);

            expect(res.status()).toBe(tc.expectedStatus);
        });
        }
    
});
