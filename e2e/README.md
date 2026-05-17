# e2e テスト

渋沢栄一ダイアリー（app1）の e2e テスト。本体の Nuxt アプリとは独立した
Playwright プロジェクトで、依存も `e2e/` 内で完結する。

## セットアップ

```
cd e2e
npm install
npm run setup   # Chromium のダウンロード（初回のみ）
```

## 実行

```
npm test            # 既定は本番（https://shibusawa-dlab.github.io/app1/）を検証
npm run test:headed # ブラウザを表示して実行
npm run report      # 直近の HTML レポートを表示
```

検証対象を変える場合は `E2E_BASE_URL` を指定する。

```
E2E_BASE_URL=http://localhost:3000/app1/ npm test
```

## テスト内容

- `tests/ad-data.spec.ts` — 公開 `data/ad.json` の内容検証（高速・データ層）
  - 国文研の所蔵がすべて新名称（日本実業史博物館準備室旧蔵資料）
  - 旧「日本実業史博物館コレクション」表記が 0 件
  - 画像公開URLの更新（DKB10001m → data/08650、DKB20003m → data/08668）
- `tests/ad-page.spec.ts` — 「ダイアリー > 原本概要」ページの描画検証
  - 詳細ページの所蔵欄が新名称・新請求番号・見出し「所蔵（2026年現在）」
  - 画像公開URLのリンク先が正しい NIJL ページを指す
