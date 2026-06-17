import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dummy.supabase.co";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "dummy-key";

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.warn("⚠️ Missing Supabase service role environment variables. Supabase admin client will fail if used.");
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
