import { test, expect} from "@playwright/test";

//login API - get token
test ('Login-Post', async ({request}) => {
    const authRes = await request.post('/auth', {
        data: {
            username: "admin",
            password: "password123"
        }
    });
    const authBody = await authRes.json();

    expect(authRes.status()).toBe(200);
    expect(authBody.token).toBeDefined();
}
);

//Create booking
test ('Create booking - post', async ({request}) => {
    const CreateRes = await request.post('/booking', {
        data: {
        "firstname" : "Jim",
        "lastname" : "Brown",
        "totalprice" : 111,
        "depositpaid" : true,
        "bookingdates" : {
            "checkin" : "2018-01-01",
            "checkout" : "2019-01-01"
        },
        "additionalneeds" : "Breakfast"
    }
    });

    const CreateBody = await CreateRes.json();

    expect (CreateRes.status()).toBe(200);

    expect(CreateBody.booking.firstname).toBe("Jim");
    expect(CreateBody.booking.lastname).toBe("Brown");

    const bookingID = CreateBody.bookingid;


});


//Get booking


test('get-booking - get method', async ({request}) => {

    const getRes = await request.get('/booking');

    const getBody = await getRes.json();

    expect(getRes.status()).toBe(200);
    // verify list
    expect(Array.isArray(getBody)).toBeTruthy();
    expect(getBody.length).toBeGreaterThan(0);

    // verify structure
    expect(getBody[0]).toHaveProperty('bookingid');
}
 );

//Delete booking

test('Delete booking', async ({ request }) => {

  // create
  const createRes = await request.post('/booking', {
    data: {
      firstname: "Delete",
      lastname: "Test",
      totalprice: 100,
      depositpaid: true,
      bookingdates: {
        checkin: "2024-01-01",
        checkout: "2024-01-02"
      }
    }
  });

  const createBody = await createRes.json();
  const bookingID = createBody.bookingid;

  // login lấy token
  const auth = await request.post('/auth', {
    data: { username: 'admin', password: 'password123' }
  });
  const token = (await auth.json()).token;

  // delete
  const deleteRes = await request.delete(`/booking/${bookingID}`, {
    headers: {
      Cookie: `token=${token}`
    }
  });

  expect(deleteRes.status()).toBe(201);
});

//Update Booking
test('Update booking', async ({ request }) => {

  // create
  const createRes = await request.post('/booking', {
    data: {
      firstname: "Old",
      lastname: "Name",
      totalprice: 100,
      depositpaid: true,
      bookingdates: {
        checkin: "2024-01-01",
        checkout: "2024-01-02"
      }
    }
  });

  const bookingID = (await createRes.json()).bookingid;

  // login
  const auth = await request.post('/auth', {
    data: { username: 'admin', password: 'password123' }
  });
  const token = (await auth.json()).token;

  // update
  const updateRes = await request.put(`/booking/${bookingID}`, {
    headers: {
      Cookie: `token=${token}`
    },
    data: {
      firstname: "Phuong",
      lastname: "Phan",
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
        checkin: "2018-01-01",
        checkout: "2019-01-01"
      },
      additionalneeds: "Dinner"
    }
  });

  const updateBody = await updateRes.json();

  expect(updateRes.status()).toBe(200);
  expect(updateBody.firstname).toBe("Phuong");
});