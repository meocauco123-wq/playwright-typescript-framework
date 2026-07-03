import { test, expect } from "@playwright/test";

test('booking full flow', async ({ request }) => {

  const uniqueName = `Phuong_${Date.now()}`;

  // 1. Login
  const authRes = await request.post('/auth', {
    data: { username: "admin", password: "password123" }
  });

  const token = (await authRes.json()).token;
  expect(authRes.status()).toBe(200);

  // 2. Create
  const createRes = await request.post('/booking', {
    data: {
      firstname: uniqueName,
      lastname: "Phan",
      totalprice: 200,
      depositpaid: true,
      bookingdates: {
        checkin: "2026-04-23",
        checkout: "2026-04-30"
      }
    }
  });

  const createBody = await createRes.json();
  const bookingID = createBody.bookingid;

  expect(createRes.status()).toBe(200);
  expect(createBody.booking.firstname).toBe(uniqueName);

  // 3. Update
  const updateRes = await request.put(`/booking/${bookingID}`, {
    headers: { Cookie: `token=${token}` },
    data: {
      firstname: uniqueName,
      lastname: "Dinh",
      totalprice: 200,
      depositpaid: true,
      bookingdates: {
        checkin: "2025-04-23",
        checkout: "2025-04-30"
      }
    }
  });

  const updateBody = await updateRes.json();

  expect(updateRes.status()).toBe(200);
  expect(updateBody.lastname).toBe("Dinh");

  // 4. Get
  const getRes = await request.get(`/booking/${bookingID}`);
  const getBody = await getRes.json();

  expect(getRes.status()).toBe(200);
  expect(getBody.lastname).toBe("Dinh");

  // 5. Delete
  const deleteRes = await request.delete(`/booking/${bookingID}`, {
    headers: { Cookie: `token=${token}` }
  });

  expect(deleteRes.status()).toBe(201);

  // 6. Verify delete
  const getAfterDelete = await request.get(`/booking/${bookingID}`);
  expect(getAfterDelete.status()).toBe(404);
});