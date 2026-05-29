/**
 * Sample Search Tool（サンプル実装）
 * このファイルを参考に、自分のデータに合わせたツールを実装してください
 *
 * 【カスタマイズ方法】
 * 1. テーブル名（"your_table"）を自分のSupabaseテーブル名に変更
 * 2. カラム名（name等）を自分のテーブルのカラムに変更
 * 3. 検索条件を自分のユースケースに合わせて変更
 * 4. ツール名・説明文を変更
 */
import { SupabaseClient } from "@supabase/supabase-js";

export const sampleSearchToolDefinition = {
  name: "sample_search",
  description:
    "【カスタマイズしてください】データベースからデータを検索するサンプルツールです。" +
    "keyword パラメータでデータを検索します。",
  inputSchema: {
    type: "object" as const,
    properties: {
      keyword: {
        type: "string",
        description: "検索キーワード",
      },
      limit: {
        type: "number",
        description: "返す件数の上限（デフォルト10、最大50）",
      },
    },
    required: ["keyword"],
  },
};

interface SampleSearchArgs {
  keyword: string;
  limit?: number;
}

export async function handleSampleSearch(
  args: SampleSearchArgs,
  supabase: SupabaseClient
): Promise<string> {
  const { keyword, limit = 10 } = args;
  const actualLimit = Math.min(limit, 50);

  try {
    // ============================================
    // ここをカスタマイズしてください
    // "your_table" → 自分のテーブル名
    // "name" → 検索対象のカラム名
    // ============================================
    const { data, error } = await supabase
      .from("your_table")
      .select("*")
      .ilike("name", `%${keyword}%`)
      .limit(actualLimit);

    if (error) {
      return JSON.stringify({
        error: { code: "DB_ERROR", message: error.message },
      });
    }

    return JSON.stringify({
      count: data?.length ?? 0,
      results: data ?? [],
    }, null, 2);
  } catch (err) {
    return JSON.stringify({
      error: { code: "UNEXPECTED_ERROR", message: String(err) },
    });
  }
}
