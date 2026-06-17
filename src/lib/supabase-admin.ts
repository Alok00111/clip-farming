import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Missing Supabase service role environment variables");
}

/**
 * Server-only Supabase admin client.
 * Uses the service_role key — BYPASSES Row Level Security.
 * NEVER import this in client components or expose to the browser.
 * Only use in Next.js API routes (app/api/...) or server actions.
 */
export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
