# gcal2paper 実装計画（roadmap.md ベース）

## 0. 現状整理（2026-06-02時点）

- フェーズ1〜4が完了。
- Google OAuth ログイン、カレンダー一覧取得、複数カレンダーのイベント統合表示、A4印刷最適化が実装済み。
- あとは Netlify デプロイと README の整備のみ。

## 1. 実装方針

- フロントエンド単体（ステートレス）で完結。
- 印刷体験を最優先に調整済み。

## 2. フェーズ別の具体計画

### フェーズ1〜4: 完了

- Vite + TypeScript + Tailwind + shadcn/ui 環境構築。
- Google API 連携（OAuth, CalendarList, Events）。
- マンスリー統合描画ロジック。
- A4印刷スタイル調整（@media print, aspect ratio）。

### フェーズ5: Netlifyデプロイと最終検証（未完了）

#### 作業

- Netlify に `VITE_GOOGLE_CLIENT_ID` と `NODE_VERSION=22` を設定。
- GitHub 連携してデプロイ。
- OAuth 設定に本番 URL を追加。
- 実機で最終検証。

#### 完了条件

- 本番 URL でログインから印刷まで一連動作が成功。

## 3. 残タスク

1. README.md の更新（セットアップ手順等）
2. Netlify デプロイ（環境変数設定含む）
3. OAuth クライアント設定の更新（本番URL追加）

## 6. Definition of Done（全体）

- [x] ロードマップ 1〜4 の必須項目がすべて実装済み。
- [x] DB なしのステートレス要件を満たしている。
- [ ] 複数カレンダー統合表示と A4 印刷が本番環境で再現可能。
- [ ] README に「セットアップ・環境変数・デプロイ・印刷注意点」が記載済み。
