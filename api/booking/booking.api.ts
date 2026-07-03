export class BookingAPI {
    constructor(private request: any, private token?: string) {}

    //CREATE BOOKING
    async create(data: any) {
        return this.request.post('/booking', {data});
    }

    //GET BOOKING BY ID
    async get(id: number) {
        return this.request.get(`/booking/${id}`, {
        });
    }

    //UPDATE BOOKING
    async update(id:number, data: any) {
        return this.request.put(`/booking/${id}`, {
            headers: {
                Cookie: `token=${this.token}`
            },
            data
        });
    }

    //DELETE BOOKING
    async delete(id: number) {
        return this.request.delete(`/booking/${id}`, {
            headers: {
                Cookie: `token=${this.token}`
            }
        });
    }
}