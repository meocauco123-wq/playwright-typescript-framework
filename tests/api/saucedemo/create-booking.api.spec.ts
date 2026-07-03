import { test, expect } from "@playwright/test";

test('create booking - post booking', async ({ request }) => {

  const res = await request.post('/booking', {
    data: {
      firstname: "Jim",
      lastname: "Brown",
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
        checkin: "2018-01-01",
        checkout: "2019-01-01"
      },
      additionalneeds: "Breakfast"
    },
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  });

  const body = await res.json();

  expect(res.status()).toBe(200);

  // verify response structure
  expect(body).toHaveProperty('bookingid');
  expect(body.booking.firstname).toBe('Jim');
  expect(body.booking.lastname).toBe('Brown');
});
