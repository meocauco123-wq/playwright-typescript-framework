import { test as base } from '@playwright/test';
import { BookingAPI} from '../../api/saucedemo/booking.api';


type MyFixtures = {
    bookingApi: BookingAPI;
    token: string;
};
export const test = base.extend<MyFixtures>({
    //auto login get token
    token: async ({ request }, use) => {
        const res = await request.post('/auth', {
            data: {
                "username" : "admin",
                "password" : "password123"
            }
        });

        const token = (await res.json()).token;
        await use(token);
    },

    //inject api đã có token
    bookingApi: async ({ request, token }, use) => {
        const api = new BookingAPI(request, token);
        await use(api);
    }
});
export { expect } from '@playwright/test';
