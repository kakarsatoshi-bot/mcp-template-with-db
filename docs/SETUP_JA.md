# セットアップガイド（日本語）

## 必要なもの

- Node.js 18以上
- Cloudflareアカウント（無料）
- Supabaseアカウント（無料）
- GitHubアカウント

## 手順

### 1. リポジトリをクローン

「Use this template」ボタンから自分のリポジトリを作成し、クローン。

```powershell
git clone https://github.com/あなたのアカウント/あなたのリポジトリ名
cd あなたのリポジトリ名
npm install
```

### 2. Supabaseの設定

1. [supabase.com](https://supabase.com) でプロジェクト作成
2. Project Settings → API で以下をメモ：
   - Project URL
   - anon public キー

### 3. 環境変数の設定

ローカル開発用に `.dev.vars` を作成：

```
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_ANON_KEY=eyJxxx...
```

### 4. カスタマイズ

以下のファイルを編集してください：

| ファイル | 変更内容 |
|---|---|
| `wrangler.toml` | `name` をサーバー名に変更 |
| `src/index.ts` | `MyMcpAgent` をサーバー名に変更 |
| `src/tools/sample_search.ts` | テーブル名・カラム名を変更 |

### 5. デプロイ

```powershell
# Cloudflareにログイン
npx wrangler login

# 環境変数をCloudflareに設定
npx wrangler secret put SUPABASE_URL
npx wrangler secret put SUPABASE_ANON_KEY

# デプロイ
npx wrangler deploy
```

デプロイ後のURLは：

```
https://あなたのサーバー名.あなたのアカウント名.workers.dev/mcp
```

### 6. 動作確認

```powershell
Invoke-RestMethod -Uri "https://あなたのサーバー名.あなたのアカウント名.workers.dev/health"
```

### 7. Smitheryに登録

1. [smithery.ai](https://smithery.ai) にログイン
2. 「Publish a server」→ URLを入力
3. 公開設定をオンにして完了

## よくある詰まりポイント

### Q. Claude DesktopでMCPサーバーが認識されない

**A.** 現在のClaude Desktopはリモート方式（URL）のみ対応しています。
ローカル設定ファイル（claude_desktop_config.json）は使用できません。
必ずCloudflare WorkersにデプロイしてURLで接続してください。

### Q. デプロイ後にSupabaseに接続できない

**A.** 以下を確認してください：

1. `npx wrangler secret put SUPABASE_URL` を実行したか
2. `npx wrangler secret put SUPABASE_ANON_KEY` を実行したか
3. 設定後に `npx wrangler deploy` を再実行したか

### Q. wrangler deployでエラーが出る

**A.** wrangler.tomlの `name` と `src/index.ts` の `MyMcpAgent` クラス名が
`wrangler.toml` の `class_name` と一致しているか確認してください。

### Q. Smitheryのスコアを上げたい

**A.** Settings → General でアイコン・説明文・HomepageURLを設定するとスコアが上がります。
