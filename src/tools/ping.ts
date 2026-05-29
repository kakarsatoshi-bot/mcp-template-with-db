/**
 * Ping Tool（接続テスト用）
 * このツールを削除せずに、動作確認に使ってください
 */
export const pingToolDefinition = {
  name: "ping",
  description: "サーバーの接続テスト用ツールです。動作確認に使ってください。",
  inputSchema: {
    type: "object" as const,
    properties: {
      message: {
        type: "string",
        description: "エコーバックするメッセージ（任意）",
      },
    },
    required: [],
  },
};

export async function handlePing(args: { message?: string }): Promise<string> {
  const response = args.message
    ? `pong! Echo: ${args.message}`
    : "pong! サーバーは正常に動作しています。";
  return response;
}
