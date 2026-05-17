import { test, expect, type Page } from '@playwright/test'

/**
 * 「ダイアリー > 原本概要」ページのブラウザ描画検証。
 * 詳細ページはクライアント側で ad.json を取得して描画する SPA のため、
 * 実ブラウザでの確認が必要。
 */

const PROVIDER_PREFIX = '国文学研究資料館（日本実業史博物館準備室旧蔵資料）'

// 所蔵（史料群名称・請求番号）の検証対象
const detailCases = [
  { id: 'DKB20002m', call: '37TGH/00955-018' },
  { id: 'DKB10001m', call: '37TGH/00955-001' },
  { id: 'DKB20013m', call: '37TGH/00955-029' },
]

async function gotoAd(page: Page, id: string) {
  await page.goto(`ad/${id}`)
  // SPA がデータを取得して所蔵欄を描画するまで待つ
  await expect(page.getByText('所蔵（2026年現在）', { exact: true })).toBeVisible()
}

test.describe('原本概要ページ', () => {
  test('一覧ページが表示され、詳細ページへのリンクがある', async ({ page }) => {
    await page.goto('ad')
    await expect(page.locator('a[href*="ad/DKB"]').first()).toBeVisible()
  })

  for (const c of detailCases) {
    test(`${c.id}: 所蔵が新名称・新請求番号で表示される`, async ({ page }) => {
      await gotoAd(page, c.id)

      // 見出しが「所蔵（2026年現在）」に更新されている
      const row = page.locator('tr', { hasText: '所蔵（2026年現在）' })
      await expect(row).toContainText(PROVIDER_PREFIX)
      await expect(row).toContainText(c.call)

      // 旧表記が残っていない
      await expect(page.locator('body')).not.toContainText(
        '日本実業史博物館コレクション'
      )
      await expect(page.locator('body')).not.toContainText('所蔵（2021年現在）')
    })
  }

  test('DKB10001m: 画像公開URLが更新後のNIJLページ(data/08650)を指す', async ({
    page,
  }) => {
    await gotoAd(page, 'DKB10001m')
    const link = page.locator('tr', { hasText: '画像公開URL' }).getByRole('link')
    await expect(link).toHaveAttribute('href', /data\/08650/)
  })

  test('DKB20003m: 画像公開URLが正規ページ(data/08668)で、誤リンク(data/10241)でない', async ({
    page,
  }) => {
    await gotoAd(page, 'DKB20003m')
    const link = page.locator('tr', { hasText: '画像公開URL' }).getByRole('link')
    await expect(link).toHaveAttribute('href', /data\/08668/)
    await expect(link).not.toHaveAttribute('href', /data\/10241/)
  })
})
