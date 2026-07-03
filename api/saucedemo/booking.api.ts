export class BookingAPI {
    constructor(private request: any, private token?: string) {}

    async create(data: any) {
        return this.request.post('/booking', {data});
    }

    async get(id: number) {
        return this.request.get(`/booking/${id}`, {
        });
    }
    async update(id:number, data: any) {
        return this.request.put(`/booking/${id}`, {
            headers: {
                Cookie: `token=${this.token}`
            },
            data
        });
    }
    async delete(id: number) {
        return this.request.delete(`/booking/${id}`, {
            headers: {
                Cookie: `token=${this.token}`
            }
        });
    }
}