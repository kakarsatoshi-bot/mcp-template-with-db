/**
 * Supabase Client
 * 環境変数からSupabaseに接続します
 */
import { createClient, SupabaseClient } from "@supabase/supabase-js";

export function getSupabaseClient(url: string, anonKey: string): SupabaseClient {
  return createClient(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
