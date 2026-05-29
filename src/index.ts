/**
 * MCP Server Template（Supabaseあり版）
 *
 * 【カスタマイズ手順】
 * 1. "MyMcpAgent" を自分のサーバー名に変更（wrangler.tomlと一致させること）
 * 2. "your-mcp-server" をサーバー名に変更
 * 3. 不要なツールを削除、自分のツールを追加
 * 4. wrangler.toml の name を変更
 */
import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { getSupabaseClient } from "./db/supabase";
import { pingToolDefinition, handlePing } from "./tools/ping";
import { sampleSearchToolDefinition, handleSampleSearch } from "./tools/sample_search";
import { withLogging } from "./utils/logger";

// ============================================
// 環境変数の型定義
// Cloudflareダッシュボードで設定する値
// ============================================
export interface Env {
  MyMcpAgent: DurableObjectNamespace; // wrangler.tomlのnameと一致させること
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
}

// ============================================
// MCPエージェントの定義
// "MyMcpAgent" をwrangler.tomlのclass_nameと一致させること
// ============================================
export class MyMcpAgent extends McpAgent<Env> {
  server = new McpServer({
    name: "your-mcp-server",   // ← 変更してください
    version: "1.0.0",
  });

  async init() {
    // Supabaseクライアントの初期化
    const supabase = getSupabaseClient(
      this.env.SUPABASE_URL,
      this.env.SUPABASE_ANON_KEY
    );

    // ============================================
    // ツールの登録
    // 不要なツールを削除し、自分のツールを追加してください
    // ============================================

    // ping（接続テスト）- 削除しないことを推奨
    this.server.registerTool(
      pingToolDefinition.name,
      {
        description: pingToolDefinition.description,
        inputSchema: { message: z.string().optional() },
        annotations: {
          readOnlyHint: true,
          destructiveHint: false,
          idempotentHint: true,
          openWorldHint: false,
        },
      },
      async ({ message }) => ({
        content: [{
          type: "text",
          text: await withLogging("ping", { message }, () => handlePing({ message })),
        }],
      })
    );

    // サンプル検索ツール（カスタマイズしてください）
    this.server.registerTool(
      sampleSearchToolDefinition.name,
      {
        description: sampleSearchToolDefinition.description,
        inputSchema: {
          keyword: z.string().describe("検索キーワード"),
          limit: z.number().optional().describe("件数上限"),
        },
        annotations: {
          readOnlyHint: true,
          destructiveHint: false,
          idempotentHint: true,
          openWorldHint: false,
        },
      },
      async ({ keyword, limit }) => ({
        content: [{
          type: "text",
          text: await withLogging("sample_search", { keyword, limit },
            () => handleSampleSearch({ keyword, limit }, supabase)
          ),
        }],
      })
    );
  }
}

// ============================================
// Cloudflare Workers エントリーポイント
// ============================================
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // ヘルスチェック
    if (url.pathname === "/health") {
      return new Response(
        JSON.stringify({
          status: "ok",
          server: "your-mcp-server",
          version: "1.0.0",
          timestamp: new Date().toISOString(),
        }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    // MCPエンドポイント
    if (url.pathname === "/mcp") {
      return MyMcpAgent.serve("/mcp").fetch(request, env, ctx);
    }

    // ルート
    return new Response(
      JSON.stringify({
        name: "MCP Server Template (with Supabase)",
        mcp_endpoint: "/mcp",
        health_endpoint: "/health",
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  },
} satisfies ExportedHandler<Env>;
