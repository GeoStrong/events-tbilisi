import { createBrowserClient } from "@supabase/ssr";
import { env } from "@/lib/utils/env";

export const supabase = createBrowserClient(env.supabase.url, env.supabase.anonKey);
