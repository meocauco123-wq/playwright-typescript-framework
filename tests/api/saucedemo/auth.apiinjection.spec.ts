import { test, expect } from '@playwright/test';

test('SQL Injection should fail', async ({ request }) => {
  const res = await request.post('/auth', {
    data: {
      username: "' OR '1'='1",
      password: "' OR '1'='1"
    }
  });

  // Restful Booker trả về 200 kể cả khi đăng nhập thất bại
  expect(res.status()).toBe(200);

  const body = await res.json();

  console.log('Status:', res.status());
  console.log('Response:', body);

  // Xác nhận không nhận được token
  expect(body.reason).toBe('Bad credentials');
  expect(body.token).toBeUndefined();
});