import { test, expect } from '../../fixtures/test.fixture';
import { bookingData} from '../../../data/booking/booking.data';

test('booking full flow', async ({ bookingApi }) => {

  const createRes = await bookingApi.create({
    firstname: "Jim",
    lastname: "Brown",
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: "2018-01-01",
      checkout: "2019-01-01"
    }
  });

  const body = await createRes.json();
  const id = body.bookingid;

  expect(createRes.status()).toBe(200);

  const updateRes = await bookingApi.update(id, {
    firstname: "Phuong",
    lastname: "Phan",
    totalprice: 115,
    depositpaid: true,
    bookingdates: {
      checkin: "2018-03-01",
      checkout: "2019-04-01"
    }
  });

  expect(updateRes.status()).toBe(200);

  const getRes = await bookingApi.get(id);
  const getBody = await getRes.json();

  expect(getBody.lastname).toBe("Phan");

  const deleteRes = await bookingApi.delete(id);
  expect(deleteRes.status()).toBe(201);
});