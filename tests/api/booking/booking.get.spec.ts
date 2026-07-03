import { test, expect } from '@playwright/test';
import { BookingAPI} from '../../../api/booking/booking.api';

test ('get booking infor', async ({request}) => {
    const api = new BookingAPI(request);
    
    const res = await api.get(id:Number);
    
})