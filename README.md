# MCP Server Template (with Supabase)

> Cloudflare Workers + TypeScript + Supabase で作るMCPサーバーのテンプレートです。

[![Use this template](https://img.shields.io/badge/Use%20this%20template-2ea44f?style=for-the-badge&logo=github)](https://github.com/kakarsatoshi-bot/mcp-template-with-db/generate)

## 概要 / Overview

MCP（Model Context Protocol）サーバーを**最短でCloudflare Workersにデプロイ**するためのテンプレートです。

This template helps you deploy an MCP server to Cloudflare Workers as quickly as possible.

**含まれるもの / Includes:**

- ✅ TypeScript + Cloudflare Workers の設定済み構成
- ✅ Supabase クライアント設定
- ✅ ping ツール（接続テスト用）
- ✅ サンプル検索ツール（カスタマイズ用）
- ✅ Cloudflare Workers Logs によるクエリログ
- ✅ 日本語＋英語セットアップガイド

## 詳細ガイド / Complete Guide

セットアップの詳細手順・詰まりポイント集・Smithery登録手順をまとめた完全ガイドを販売中です。

🛒 **[完全ガイドを購入する（$29）](https://tsukuras.gumroad.com/l/mcp-template)**

Purchase the complete setup guide with detailed instructions, troubleshooting tips, and Smithery registration steps.

---

## クイックスタート / Quick Start

### 1. テンプレートを使用 / Use this template

上の「Use this template」ボタンをクリック。

### 2. インストール / Install

```bash
npm install
```

### 3. 環境変数を設定 / Set environment variables

`.dev.vars` を作成:

```
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_ANON_KEY=eyJxxx...
```

### 4. デプロイ / Deploy

```bash
npx wrangler login
npx wrangler secret put SUPABASE_URL
npx wrangler secret put SUPABASE_ANON_KEY
npx wrangler deploy
```

## セットアップ詳細 / Detailed Setup

- 🇯🇵 [日本語ガイド](docs/SETUP_JA.md)
- 🇬🇧 [English Guide](docs/SETUP_EN.md)

## 技術スタック / Tech Stack

| | |
|---|---|
| Runtime | Cloudflare Workers |
| Language | TypeScript |
| MCP SDK | `agents` + `@modelcontextprotocol/sdk` |
| Database | Supabase (PostgreSQL) |

## 作成者 / Author

[Tsukuras](https://tsukuras.jp) — 北海道の建設業データベース

## ライセンス / License

MIT
