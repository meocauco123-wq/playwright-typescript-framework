import { test, expect } from '@playwright/test';

const testCases = [
    {
        testName: 'valid password',
        payload: {
            username: 'admin',
            password: 'password123'
        },
        expectedStatus: 200,
        expectedSuccess: true
    },
    {
        testName: 'wrong password',
        payload: {
            username: 'admin',
            password: 'wrongpassword'
        },
        expectedStatus: 200,
        expectedSuccess: false,
        expectedReason: 'Bad credentials'
    },
    {
        testName: 'empty password',
        payload: {
            username: 'admin',
            password: ''
        },
        expectedStatus: 200,
        expectedSuccess: false,
        expectedReason: 'Bad credentials'           
    },
    {
        testName: 'null password',
        payload: {
            username: 'admin',
            password: null
        },
        expectedStatus: 200,
        expectedSuccess: false,
        expectedReason: 'Bad credentials'
    },
    {
        testName: 'undefined password',
        payload: {
            username: 'admin',
            // password is intentionally left undefined
        },
        expectedStatus: 200,
        expectedSuccess: false,
        expectedReason: 'Bad credentials'
    },
    {
        testName: 'SQL Injection attempt',
        payload: {
            username: 'admin',
            password: "password' OR '1'='1"
        },
        expectedStatus: 200,
        expectedSuccess: false,
        expectedReason: 'Bad credentials'
    },
    {
        testName: 'XSS Injection attempt',
        payload: {
            username: 'admin',
            password: "<script>alert('XSS')</script>"       

        },
        expectedStatus: 200,
        expectedSuccess: false,
        expectedReason: 'Bad credentials'
    },
    {
        testName: 'Excessively long password',
        payload: {
            username: 'admin',
            password: 'a'.repeat(1000) // 1000 characters long
        },
        expectedStatus: 200,
        expectedSuccess: false,
        expectedReason: 'Bad credentials'
    },
    {
        testName: 'Password with special characters',
        payload: {
            username: 'admin',      
            password: '!@#$%^&*()_+-=[]{}|;:\'",.<>/?`~'
        },
        expectedStatus: 200,
        expectedSuccess: false,
        expectedReason: 'Bad credentials'
    },
    {
        testName: 'Password with whitespace',
        payload: {
            username: 'admin',
            password: '   ' // password with only whitespace
        },
        expectedStatus: 200,
        expectedSuccess: false,
        expectedReason: 'Bad credentials'
    },
    {   testName: 'Valid password', 
        payload: {
            username: 'admin',
            password: 'password123'
        },
        expectedStatus: 200,
        expectedSuccess: true
    }, 
    {   
        testName: 'SQL Injection in username',
        payload: {
            username: "admin' OR '1'='1",
            password: 'password123'
        },
        expectedStatus: 200,
        expectedSuccess: false,
        expectedReason: 'Bad credentials'   
    }, 
    {   
        testName: 'XSS Injection in username',
        payload: {
            username: "<script>alert('XSS')</script>",
            password: 'password123'
        },
        expectedStatus: 200,
        expectedSuccess: false,
        expectedReason: 'Bad credentials'
    
    },
    {
        testName: 'Excessively long username',
        payload: {
            username: 'a'.repeat(1000), // 1000 characters long
            password: 'password123'
        },
        expectedStatus: 200,
        expectedSuccess: false,
        expectedReason: 'Bad credentials'   
    }, 
    {
        testName: 'Username with special characters',
        payload: {
            username: '!@#$%^&*()_+-=[]{}|;:\'",.<>/?`~',
            password: 'password123'
        },
        expectedStatus: 200,
        expectedSuccess: false,
        expectedReason: 'Bad credentials'
    }
];

testCases.forEach(data => {

    test(`login API - ${data.testName}`,
    async ({ request }) => {

        const response = await request.post('/auth', {
            data: data.payload
        });

        const body = await response.json();

        console.log(body);

        expect(response.status())
            .toBe(data.expectedStatus);

        if (data.expectedSuccess) {

            expect(body.token)
                .toBeDefined();

        } else {

            expect(body.reason)
                .toBe(data.expectedReason);
        }
    });
});