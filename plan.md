# JFPYG cal 実装計画（roadmap.md ベース）

## 0. 現状整理（2026-06-02時点）

- 現在の構成は `React + Vite` の JavaScript テンプレートがベース。
- `roadmap.md` で想定している TypeScript 化と Google Calendar 連携は未実装。
- `README.md` はテンプレート記載が中心で、プロダクト仕様との整合が未反映。
- ゴールは「DBなしで Google カレンダーを統合し、A4 1ページに綺麗に印刷できる Web アプリ」を Netlify 公開すること。

## 1. 実装方針

- フロントエンド単体（ステートレス）で完結し、サーバーや DB を持たない。
- 機能実装はロードマップのフェーズ順を維持しつつ、早期に「動く最小印刷体験」を作ってから精度を上げる。
- すべてのフェーズで「完了条件（Definition of Done）」を明確化し、次フェーズへの受け渡しを明確にする。

## 2. フェーズ別の具体計画

### フェーズ1: 環境構築とベースUI

#### 作業
- Vite を TypeScript テンプレートへ移行（`src/*.jsx` -> `src/*.tsx`、型定義導入）。
- 不要テンプレートの削除（`App.css` など）とディレクトリ整理（`features`/`components`/`types`/`utils`）。
- Tailwind + shadcn/ui の初期化と必要コンポーネント導入（`Button`, `Checkbox`, `ScrollArea`, `Dialog`）。
- 2カラムの基本レイアウト実装：
  - 左: 認証・カレンダー選択・印刷操作
  - 右: A4プレビューキャンバス
- `public/_redirects` を作成し SPA リロード対策を適用。

#### 変更対象（想定）
- `package.json`
- `src/main.tsx`, `src/App.tsx`, `src/index.css`
- `components.json`（shadcn 利用時）
- `public/_redirects`

#### 完了条件
- `pnpm dev` でエラーなく起動。
- 2カラム UI が表示され、モバイル幅で縦積みに切り替わる。
- Netlify の SPA リロードで 404 が発生しない設定になっている。

---

### フェーズ2: Google API 連携 & 認証

#### 作業
- `.env.local` で `VITE_GOOGLE_CLIENT_ID` を読み込む設定を追加。
- Google OAuth ログインを実装し、`accessToken` を React state のみに保持。
- `calendarList` API 呼び出しを実装し、サイドバーに複数選択可能なチェックボックス一覧を表示。
- API エラー・トークン期限切れ時の再ログイン導線を用意。

#### 変更対象（想定）
- `src/features/auth/*`
- `src/features/calendars/*`
- `src/types/google.ts`
- `src/lib/googleApi.ts`
- `.env.example`

#### 完了条件
- ログイン成功後にカレンダー一覧が取得できる。
- チェックボックスで複数カレンダー選択状態を保持できる。
- ログアウトまたは期限切れ時に安全にトークン破棄できる。

---

### フェーズ3: イベント統合とマンスリー描画

#### 作業
- 表示対象月の開始・終了日時を算出するユーティリティを実装。
- 選択カレンダーごとのイベントを `Promise.all` で並列取得し、単一配列へ統合。
- イベントに親カレンダー色を付与し、描画データに変換。
- ソートロジックを実装：
  - 終日予定を上位
  - 同種別内は開始時刻昇順
- 6x7 の月間グリッド描画と `truncate` による文字溢れ対策を適用。

#### 変更対象（想定）
- `src/features/events/*`
- `src/components/calendar/MonthlyGrid.tsx`
- `src/utils/dateRange.ts`, `src/utils/sortEvents.ts`

#### 完了条件
- 複数カレンダーの予定が 1 つの月間ビューに統合表示される。
- 並び順が要件どおりで、視覚破綻（はみ出し、重なり）がない。
- 月切替時に正しい範囲で再取得される。

---

### フェーズ4: A4印刷最適化

#### 作業
- プレビュー領域に A4 横比率（1.414:1）を適用。
- `@media print` で非印刷要素（サイドバー、操作ボタン）を非表示化。
- 印刷時サイズを `297mm x 210mm` に固定し、`print-color-adjust: exact` を指定。
- `window.print()` ボタンを追加し、実ブラウザで余白・改ページ・色味を微調整。

#### 変更対象（想定）
- `src/components/print/PrintLayout.tsx`
- `src/index.css`（または印刷専用スタイルファイル）
- `src/components/actions/PrintButton.tsx`

#### 完了条件
- A4横 1ページに収まり、不要要素が印刷されない。
- 背景色が意図どおり出力される（ブラウザ設定依存を考慮した案内付き）。
- Chrome の print emulation で崩れが再現しない。

---

### フェーズ5: Netlifyデプロイと最終検証

#### 作業
- Netlify に `VITE_GOOGLE_CLIENT_ID` と `NODE_VERSION=22` を設定。
- GitHub 連携して初回デプロイ、ビルド失敗時はログと提案に沿って修正。
- OAuth 設定に本番 URL を追加（JavaScript 生成元・リダイレクト URI）。
- 実機で「複数カレンダー選択 -> 印刷/PDF保存」を検証。

#### 変更対象（想定）
- `netlify.toml`
- `README.md`（セットアップ手順・運用手順）

#### 完了条件
- 本番 URL でログインから印刷まで一連動作が成功。
- 主要ブラウザ（最低 Chrome）で A4 印刷品質が担保される。
- 初見ユーザー向けのセットアップ手順が README に揃う。

## 3. 実装タスク分解（優先順バックログ）

1. TypeScript移行と `App` の責務分割
2. shadcn/ui コンポーネント導入とレイアウト固定
3. OAuth ログイン + トークン管理
4. `calendarList` 取得 + 複数選択 UI
5. 月間イベント取得 + マージ + ソート
6. 月間グリッド描画（6x7）と表示最適化
7. 印刷専用 CSS と `window.print()` 導線
8. Netlify 設定・本番環境接続・README 更新

## 4. 技術的リスクと対策

- OAuth 周りの CORS/設定不備:
  - `.env.example` と README に設定項目を明記し、ローカルと本番 URL を分離して管理。
- Google API のレート制限:
  - 月単位の取得範囲に限定し、必要最小回数で再取得。
- 印刷結果のブラウザ差分:
  - Chrome を基準実装として先に固め、他ブラウザは互換レイヤーで吸収。
- 長い予定タイトルによるレイアウト崩れ:
  - `truncate` と行高固定、必要なら hover で全文表示。

## 5. テスト計画

- 単体:
  - 日付範囲計算、イベントソート関数、イベント正規化関数。
- 結合:
  - ログイン後にカレンダー取得 -> 選択 -> イベント表示までの UI フロー。
- 手動E2E:
  - 印刷プレビュー（Chrome print emulation）と PDF 出力確認。
- 本番確認:
  - Netlify デプロイ後に OAuth 本番設定でログインできることを確認。

## 6. Definition of Done（全体）

- ロードマップ 1〜5 の必須項目がすべて実装済み。
- DB なしのステートレス要件を満たしている。
- 複数カレンダー統合表示と A4 印刷が本番環境で再現可能。
- README に「セットアップ・環境変数・デプロイ・印刷注意点」が記載済み。
