test ('login get token', async ({request}) => {
    const res = await request.post('/auth', {
        data: {
            "username": "admin",
            "password": "123456"
        }, 
        headers: {
            cookie: 
        }
        
    });
});