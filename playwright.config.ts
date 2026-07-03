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

  retries: 1,

  workers: process.env.CI ? 2 : undefined,

  reporter: [
    ['list'],
    ['html', { open: 'never' }],
  ],

  use: {
    baseURL: process.env.BASE_URL,

    headless: false,

    trace: 'retain-on-failure',

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',

    actionTimeout: 10000,

    navigationTimeout: 15000,
  },

  projects: [
    // UI Testing
    {
      name: 'chromium',

      use: {
        ...devices['Desktop Chrome'],
      },

      testMatch: ['tests/e2e/**/*.spec.ts'],
    },

    // Firefox
    {
      name: 'firefox',

      use: {
        ...devices['Desktop Firefox'],
      },

      testMatch: ['tests/e2e/**/*.spec.ts'],
    },

    // API Testing
    {
      name: 'api',

      testMatch: ['tests/api/**/*.spec.ts'],

      use: {
        baseURL: process.env.API_URL,
      },
    },
  ],
});