import { test, expect } from '@playwright/test';
import { BookingAPI } from '../../../api/booking/booking.api';

test('Get booking', async ({ request }) => {
  const api = new BookingAPI(request);

  const id = 1;

  const res = await api.get(id);

  expect(res.ok()).toBeTruthy();

  const body = await res.json();

  console.log(body);
});