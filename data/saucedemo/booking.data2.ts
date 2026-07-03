const baseBooking = {
    firstname: 'Phuong',
    lastname: 'Phan',
    totalprice: 100,
    depositpaid: true,
    bookingdates: {
        checkin: '2024-01-01',
        checkout: '2024-01-02'
    }
};

export const bookingData = {
    valid: {
        ...baseBooking
    },

    invalid: {
        missingFirstname: {
            ...baseBooking,
            firstname: undefined
        },

        emptyFirstname: {
            ...baseBooking,
            firstname: ''
        },

        negativePrice: {
            ...baseBooking,
            totalprice: -100
        },


        invalidDate: {
            ...baseBooking,
            bookingdates: {
                checkin: '2024-13-33',
                checkout: '2024-01-02'
            }
        }
    },

};