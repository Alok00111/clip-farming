import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  const results: Record<string, unknown> = {};
  const errors: string[] = [];

  const tables = [
    "admin_users",
    "clippers",
    "applications",
    "clipper_social_accounts",
    "clients",
    "raw_videos",
    "clip_projects",
    "revision_history",
    "clip_performance",
    "clipper_payment_profiles",
    "payouts",
    "payout_line_items",
    "client_invoices",
    "strikes",
    "disputes",
    "audit_logs",
    "referrals",
    "notifications",
  ];

  // 1. Test connection + count rows in each table
  for (const table of tables) {
    const { count, error } = await supabaseAdmin
      .from(table)
      .select("*", { count: "exact", head: true });

    if (error) {
      errors.push(`${table}: ${error.message}`);
    } else {
      results[table] = { rows: count ?? 0, status: "✅ OK" };
    }
  }

  // 2. Verify critical fraud constraints exist
  const { data: constraints, error: constraintError } = await supabaseAdmin
    .rpc("get_fraud_constraints" as never)
    .select();

  // Fallback: query pg_indexes directly
  const { data: indexes } = await supabaseAdmin
    .from("pg_indexes" as never)
    .select("indexname")
    .in("indexname", [
      "idx_unique_platform_video_id",
      "idx_one_claim_per_clipper_per_video",
      "idx_one_primary_per_platform",
    ]);

  // 3. Verify RLS is enabled on all tables
  const { data: rlsCheck } = await supabaseAdmin
    .from("pg_tables" as never)
    .select("tablename, rowsecurity")
    .eq("schemaname", "public");

  const tablesWithoutRLS = (rlsCheck as Array<{tablename: string; rowsecurity: boolean}> | null)
    ?.filter((t) => !t.rowsecurity)
    .map((t) => t.tablename) ?? [];

  return NextResponse.json({
    success: errors.length === 0,
    summary: {
      total_tables: tables.length,
      tables_ok: tables.length - errors.length,
      tables_with_errors: errors.length,
      rls_violations: tablesWithoutRLS,
    },
    tables: results,
    errors: errors.length > 0 ? errors : "None",
    fraud_constraints: indexes ?? "Unable to query directly",
  });
}
