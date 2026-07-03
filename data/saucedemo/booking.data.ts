export const bookingData = {
  valid: {
    firstname: "Phuong",
    lastname: "Phan",
    totalprice: 100,
    depositpaid: true,
    bookingdates: {
      checkin: "2024-01-01",
      checkout: "2024-01-02"
    }
  },

  invalid: {
    missingFirstname: {
      lastname: "Phan",
      totalprice: 100,
      depositpaid: true,
      bookingdates: {
        checkin: "2024-01-01",
        checkout: "2024-01-02"
      }
    },

    emptyFirstname: {
      firstname: "",
      lastname: "Phan",
      totalprice: 100,
      depositpaid: true,
      bookingdates: {
        checkin: "2024-01-01",
        checkout: "2024-01-02"
      }
    },

    negativePrice: {
      firstname: "Phuong",
      lastname: "Phan",
      totalprice: -10,
      depositpaid: true,
      bookingdates: {
        checkin: "2024-01-01",
        checkout: "2024-01-02"
      }
    },

    invalidDate: {
      firstname: "Phuong",
      lastname: "Phan",
      totalprice: 120,
      depositpaid: true,
      bookingdates: {
        checkin: "2024-13-33",
        checkout: "2024-01-02"
      }
    }

  }
};