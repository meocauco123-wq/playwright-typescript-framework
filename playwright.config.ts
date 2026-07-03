import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

console.log('BASE_URL =', process.env.BASE_URL);
console.log('API_URL =', process.env.API_URL);

export default defineConfig({
  testDir: './tests',

  timeout: 30 * 1000,

  expect: {
    timeout: 5000,
  },

  fullyParallel: true,

  retries: process.env.CI ? 2 : 1,

  workers: process.env.CI ? 2 : undefined,

  reporter: [
    ['list'],
    ['html', { open: 'never' }],
  ],

  use: {
    // Fallback khi không có .env
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',

    // CI luôn chạy headless
    headless: !!process.env.CI,

    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    actionTimeout: 10000,
    navigationTimeout: 15000,
  },

  projects: [
    // UI - Chrome
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
      testMatch: ['tests/e2e/**/*.spec.ts'],
    },

    // UI - Firefox
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
      testMatch: ['tests/e2e/**/*.spec.ts'],
    },

    // API
    {
      name: 'api',
      testMatch: ['tests/api/**/*.spec.ts'],
      use: {
        baseURL:
          process.env.API_URL ||
          'https://restful-booker.herokuapp.com',
      },
    },
  ],
});