import { test, expect } from '@playwright/test';

test('create booking then get booking detail', async ({ request }) => {

  // Arrange
  const payload = {
    firstname: 'QA',
    lastname: 'Automation',
    totalprice: 250,
    depositpaid: true,
    bookingdates: {
      checkin: '2026-06-01',
      checkout: '2026-06-10'
    },
    additionalneeds: 'Late Check-in'
  };

  // Act - create booking
  const createRes = await request.post('/booking', {
    data: payload
  });

  const createBody = await createRes.json();
  const bookingId = createBody.bookingid;

  // Assert - create
  expect(createRes.status()).toBe(200);
  expect(bookingId).toBeDefined();

  // Act - get booking
  const getRes = await request.get(`/booking/${bookingId}`);
  const getBody = await getRes.json();

  // Assert - get
  expect(getRes.status()).toBe(200);

  expect(getBody).toMatchObject({
    firstname: payload.firstname,
    lastname: payload.lastname,
    totalprice: payload.totalprice
  });

});