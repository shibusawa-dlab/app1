import { defineConfig, devices } from '@playwright/test'

/**
 * 検証対象サイト。既定は本番（GitHub Pages）。
 * 別環境を見る場合は E2E_BASE_URL を指定する。
 *   E2E_BASE_URL=http://localhost:3000/app1/ npm test
 */
const baseURL = process.env.E2E_BASE_URL || 'https://shibusawa-dlab.github.io/app1/'

export default defineConfig({
  testDir: './tests',
  timeout: 45_000,
  expect: { timeout: 20_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL,
    locale: 'ja-JP',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
})
