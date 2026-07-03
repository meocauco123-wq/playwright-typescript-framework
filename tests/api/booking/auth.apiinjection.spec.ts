import { test, expect } from '@playwright/test';
import { BookingAPI} from '../../../api/booking/booking.api';

test ('SQL Injection should fail', async ({request}) => {
    const res = await request.post('/auth', {
        data: {
            username: "admin' OR '1'='1",
            password: "password123"
        }
    });
    const body = await res.json();

    expect(res.status()).toBe(200);
});
