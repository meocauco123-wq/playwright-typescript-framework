import { test, expect } from '@playwright/test';
import { BookingAPI} from '../../../api/saucedemo/booking.api';
//import { bookingData } from '../../../data/saucedemo/booking.data';
import {bookingData} from '../../../data/saucedemo/booking.data2';

test ('create new booking', async ({request}) => {
    const api = new BookingAPI(request);

    //
        // Bước 1: Tạo mới một Booking (Create)
        const createBooking = await api.create(bookingData.valid);
        const createBody = await createBooking.json();
        const bookingId = createBody.bookingid;
        console.log(`Booking mới tạo có ID là: ${bookingId}`);
    
        expect(createBooking.status()).toBe(200);
        expect(bookingId).toBeDefined();

        // Bước 2: Lấy chi tiết Booking vừa tạo (Get)
        const getBooking = await api.get(bookingId);

        const getBody = await getBooking.json();
        
        expect(getBooking.status()).toBe(200);
        expect(getBody).toMatchObject({
            firstname: bookingData.valid.firstname,
            lastname: bookingData.valid.lastname,
            totalprice: bookingData.valid.totalprice
        });
    
});