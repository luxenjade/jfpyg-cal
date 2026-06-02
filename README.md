# JFPYG cal (Just for printing your google calendar)

**「ただ、Googleカレンダーを美しく印刷するためだけに。」**

JFPYG calは、GoogleカレンダーのデータをA4サイズでの印刷・PDF出力に100%最適化して描画する、ステートレスなマンスリーカレンダー型Webビューアです。

![ogp image](src/public/ogp-image.png)

## 特徴

- **セキュリティファースト (No DB):** OAuth 2.0 クライアントサイドフローを採用。アクセストークンやカレンダーデータはブラウザのメモリ内のみで処理され、サーバーに保存されることはありません。
- **複数カレンダー統合:** 選択した複数のカレンダーから予定を取得し、1つのマンスリービューに美しく統合。
- **A4印刷最適化:** CSS Gridと `@media print` により、A4横サイズにピタッと収まるレイアウトを実現。
- **予定の自動ソート:** 「終日予定を上」「開始時間順」のロジックで、重なりのない見やすい表示。

## セットアップ

### 1. Google Cloud プロジェクトの設定

1. [Google Cloud Console](https://console.cloud.google.com/) でプロジェクトを作成。
2. **Google Calendar API** を有効化。
3. OAuth 同意画面を設定（スコープ: `https://www.googleapis.com/auth/calendar.readonly`）。
4. OAuth 2.0 クライアント ID を作成。
   - 承認された JavaScript 生成元: `http://localhost:5173` (ローカル) および Netlify の URL。

### 2. 環境変数の設定

`.env.local` ファイルを作成し、クライアントIDを設定します。

```env
VITE_GOOGLE_CLIENT_ID=あなたのクライアントID.apps.googleusercontent.com
```

### 3. インストールと起動

```bash
pnpm install
pnpm dev
```

## 使い方

1. 「Googleでログイン」ボタンからサインイン。
2. 左側のサイドバーから印刷したいカレンダーを選択。
3. 必要に応じて「前月」「次月」で月を切り替え。
4. 「A4 印刷する」ボタンをクリック。
5. ブラウザの印刷ダイアログで以下の設定を確認してください：
   - **送信先:** PDFに保存 または プリンター
   - **方向:** 横
   - **詳細設定 > 背景のグラフィック:** オン

## デプロイ (Netlify)

1. GitHub リポジトリを Netlify に連携。
2. 環境変数 `VITE_GOOGLE_CLIENT_ID` を設定。
3. `NODE_VERSION=22` を環境変数に追加。
4. ビルド設定:
   - Build command: `npm run build`
   - Publish directory: `dist`

## 技術スタック

- React (TypeScript)
- Vite
- Tailwind CSS
- shadcn/ui
- @react-oauth/google

---

JFPYG cal &copy; 2026 - Privacy First, Printing Optimized.
