import {test, expect } from '@playwright/test';
import { BookingAPI} from '../../../api/booking/booking.api';

test('Luồng CRUD toàn diện: Auth > Create > Update > Delete', async ({request}) => {

    // Bước 1: Lấy token (Auth)
    const authRes = await request.post('/auth', {
        data: {
            username: "admin",
            password: "password123"
        }
    });
    const authBody = await authRes.json();
    const token = authBody.token;
    console.log(`Token lấy được: ${token}`);


    // Bước 2: Tạo mới Booking (Create)
    const createRes = await request.post('/booking', {
        data: {
            firstname: 'QA',
            lastname: 'Automation Member',
            totalprice: 250,
            depositpaid: true,
            bookingdates: {
                checkin: '2026-06-01',
                checkout: '2026-06-10'
            },
            additionalneeds: 'Late Check-in'
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const createBody = await createRes.json();
    const bookingId = createBody.bookingid;
    console.log(`Booking mới tạo có ID là: ${bookingId}`);

    expect(createRes.status()).toBe(200);
    expect(bookingId).toBeDefined();



    // Bước 3: Cập nhật Booking (Update)
    const updateRes = await request.put(`/booking/${bookingId}`, {
        data: {
            firstname: 'QA updated',
            lastname: 'Automation Member updated',
            totalprice: 300,
            depositpaid: false,
            bookingdates: {
                checkin: '2026-07-01',
                checkout: '2026-07-10'
            },
            additionalneeds: 'Late Check-in updated'
        },
        headers: {
            Cookie: `token=${token}`
        }
    });

    const updateBody = await updateRes.json();

    expect(updateRes.status()).toBe(200);
    expect(updateBody.firstname).toBe('QA updated');
    expect(updateBody.lastname).toBe('Automation Member updated');
    expect(updateBody.totalprice).toBe(300);
    console.log('Booking sau khi cập nhật:', updateBody);

    // Bước 4: Xóa Booking (Delete)
    const deleteRes = await request.delete(`/booking/${bookingId}`, {
        headers: {
            Cookie: `token=${token}`
        }
    });
    const deleteBody = await deleteRes.text();
    expect(deleteRes.status()).toBe(201);
    console.log('Booking sau khi xóa:', deleteBody);

    // Bước 5: Kiểm tra Booking đã bị xóa chưa (Get sau khi Delete)

    const getAfterDeleteRes = await request.get(`/booking/${bookingId}`);
    expect(getAfterDeleteRes.status()).toBe(404);
    console.log('Kết quả khi cố gắng lấy Booking sau khi đã xóa:', await getAfterDeleteRes.text()); 

    // Kết luận: Nếu tất cả các bước trên đều thành công, luồng CRUD đã hoạt động trơn tru
    console.log('Luồng CRUD toàn diện đã hoàn thành thành công!');
});