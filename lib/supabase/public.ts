import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

// Unlike lib/supabase/server.ts, this doesn't touch next/headers'
// cookies(), so it's safe to call from generateStaticParams, sitemap.ts,
// and other build-time/static contexts that have no request scope.
// Use it for anonymous, public-data reads only (RLS still applies).
export function createPublicClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
