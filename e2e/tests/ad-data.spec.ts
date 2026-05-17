import { test, expect } from '@playwright/test'

/**
 * 公開済み ad.json（原本概要データ）の内容検証。
 * ブラウザ描画に依存しない、データ層の高速ガード。
 */

type AdItem = {
  '@id': string
  'http://schema.org/provider'?: { '@value': string }[]
  'http://schema.org/url'?: { '@id': string }[]
}

async function fetchAd(request: import('@playwright/test').APIRequestContext) {
  const res = await request.get('data/ad.json')
  expect(res.ok(), 'data/ad.json が取得できる').toBeTruthy()
  return (await res.json()) as AdItem[]
}

const findById = (items: AdItem[], id: string) =>
  items.find((it) => it['@id'].endsWith('/' + id))

test.describe('原本概要データ（ad.json）', () => {
  test('国文研の所蔵がすべて新名称、旧「コレクション」表記が残っていない', async ({
    request,
  }) => {
    const items = await fetchAd(request)
    const providers = items
      .map((it) => it['http://schema.org/provider']?.[0]?.['@value'])
      .filter((v): v is string => !!v)

    expect(providers.length, '所蔵情報を持つ件数').toBeGreaterThan(20)
    for (const p of providers) {
      expect(p, '旧「日本実業史博物館コレクション」表記').not.toContain(
        '日本実業史博物館コレクション'
      )
    }
    // 国文研の項目は新しい史料群名称になっている
    const nijl = providers.filter((p) => p.includes('国文学研究資料館'))
    expect(nijl.length, '国文研所蔵の件数').toBeGreaterThan(20)
    for (const p of nijl) {
      expect(p).toContain('日本実業史博物館準備室旧蔵資料')
    }
  })

  test('画像公開URLが更新されている（DKB10001m / DKB20003m）', async ({
    request,
  }) => {
    const items = await fetchAd(request)

    // 依頼で更新した1件
    const dkb10001 = findById(items, 'DKB10001m')!
    expect(dkb10001['http://schema.org/url']?.[0]?.['@id']).toContain(
      'data/08650'
    )

    // 無関係資料への誤リンク(data/10241)を正規ページ(data/08668)に修正した件
    const dkb20003 = findById(items, 'DKB20003m')!
    const u = dkb20003['http://schema.org/url']?.[0]?.['@id'] ?? ''
    expect(u, 'DKB20003m は渋沢栄一日記の正規ページを指す').toContain(
      'data/08668'
    )
    expect(u, 'DKB20003m は誤リンク data/10241 を指さない').not.toContain(
      'data/10241'
    )
  })
})
