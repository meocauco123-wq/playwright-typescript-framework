import { test, expect } from '@playwright/test';



    const invalidLoginData = [
        {
            testName: 'wrong password',
            payload: {
                username: 'admin',
                password: 'wrongpassword'
            }
        },
        {
            testName: 'empty password',
            payload: {
                username: 'admin',
                password: ''
            }
        },
        {
            testName: 'null password',
            payload: {
                username: 'admin',
                password: null
            }
        },
        {
            testName: 'undefined password',
            payload: {
                username: 'admin',
                // password is intentionally left undefined
            }
        },
        {
            testName: 'SQL Injection attempt',
            payload: {
                username: 'admin',
                password: "password' OR '1'='1"
            }
        },
        {
            testName: 'XSS Injection attempt',
            payload: {
                username: 'admin',
                password: "<script>alert('XSS')</script>"
            }
        },
        {
            testName: 'Excessively long password',
            payload: {
                username: 'admin',
                password: 'a'.repeat(1000) // 1000 characters long
            }
        },
        {testName: 'Password with special characters',
            payload: {
                username: 'admin',
                password: '!@#$%^&*()_+-=[]{}|;:\'",.<>/?`~'
            }
        },
        {testName: 'Password with whitespace',
            payload: {
                username: 'admin',
                password: '   password123   '
            }
        }, 
        {testName: 'Password with unicode characters',
            payload: {
                username: 'admin',
                password: 'pässwörd123'
            }
        },
        {testName: 'Password with emojis',
            payload: {
                username: 'admin',
                password: 'password123😀'
            }
        },
        {testName: 'Password with SQL keywords',
            payload: {
                username: 'admin',
                password: 'SELECT * FROM users'
            }
        },
        {testName: 'Password with HTML tags',
            payload: {
                username: 'admin',
                password: '<b>password123</b>'
            }
        },
        {testName: 'Password with control characters',
            payload: {
                username: 'admin',
                password: 'password123\n'
            }
        },
        {testName: 'Password with non-ASCII characters',
            payload: {
                username: 'admin',
                password: '密码123'
            }
        }, 
        {testName: 'Password with only whitespace',
            payload: {
                username: 'admin',
                password: '     '
            }
        }, 
        {testName: 'Password with null byte',
            payload: {
                username: 'admin',
                password: 'password123\0'
            }
        },
        {testName: 'Password with SQL comment',
            payload: {
                username: 'admin',
                password: 'password123--'
            }
        },
        {testName: 'Password with script tags',
            payload: {
                username: 'admin',
                password: '<script>alert("XSS")</script>'
            }
        },
        {testName: 'Password with HTML entities',
            payload: {
                username: 'admin',
                password: '&lt;password123&gt;'
            }
        },
        {testName: 'Password with URL encoding',
            payload: {
                username: 'admin',
                password: 'password%20123'
            }
        },
        {testName: 'Password with SQL wildcard characters',
            payload: {
                username: 'admin',
                password: 'password123%'
            }
        },
        {testName: 'Password with backslashes',
            payload: {
                username: 'admin',
                password: 'password\\123'
            }
        },
        {
            testName: 'Password with mixed character types',
            payload: {
                username: 'admin',
                password: 'P@ssw0rd!#123'
            }       
        },
        {
            testName: 'Username with SQL Injection attempt',
            payload: {
                username: "admin' OR '1'='1",
                password: 'password123'
            }
        },
        {
            testName: 'Username with XSS Injection attempt',
            payload: {
                username: "<script>alert('XSS')</script>",
                password: 'password123'
            }
        },
        {
            testName: 'Username with special characters',
            payload: {
                username: 'admin!@#$%^&*()',
                password: 'password123'
            }
        },
        {testName: 'Username with whitespace',
            payload: {
                username: '   admin   ',
                password: 'password123'
            }
        }, 
        {testName: 'Username with unicode characters',
            payload: {
                username: 'ädmin',
                password: 'password123'
            }
        },
        {testName: 'Username with emojis',
            payload: {
                username: 'admin😀' ,
                password: 'password123'
            }
        }
    ];

invalidLoginData.forEach(data => {

    test(`login fail - ${data.testName}`,
    async ({ request }) => {

        const response = await request.post('/auth', {
            data: data.payload
        });

        const body = await response.json();

        console.log(body);

        expect(body.reason)
            .toBe('Bad credentials');
    });
});