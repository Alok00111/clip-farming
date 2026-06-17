-- ============================================================
-- CLIPFARMING — PHASE 1 MIGRATION
-- Foundation: admin_users + clippers tables with full RLS
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- 1. EXTENSIONS
-- ============================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- 2. HELPER FUNCTION: updated_at auto-trigger
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- 3. HELPER FUNCTION: Role check via JWT (no circular dependency)
-- ============================================================
-- Reads role from the JWT app_metadata set by the admin API.
-- This is the Supabase-recommended pattern for RBAC.
CREATE OR REPLACE FUNCTION get_my_role()
RETURNS TEXT AS $$
  SELECT COALESCE(
    auth.jwt() -> 'app_metadata' ->> 'role',
    'clipper'
  );
$$ LANGUAGE sql STABLE;

CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT get_my_role() IN ('super_admin', 'ops_manager', 'reviewer');
$$ LANGUAGE sql STABLE;

CREATE OR REPLACE FUNCTION is_super_admin()
RETURNS BOOLEAN AS $$
  SELECT get_my_role() = 'super_admin';
$$ LANGUAGE sql STABLE;


-- 4. ADMIN_USERS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS admin_users (
  id           UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name    TEXT NOT NULL,
  email        TEXT NOT NULL UNIQUE,
  role         TEXT NOT NULL DEFAULT 'reviewer'
               CHECK (role IN ('super_admin', 'ops_manager', 'reviewer')),
  permissions  JSONB NOT NULL DEFAULT '{}',
  is_active    BOOLEAN NOT NULL DEFAULT true,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS on admin_users
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Any admin can read the admin_users list
CREATE POLICY "admins_can_read_admin_users"
  ON admin_users FOR SELECT
  USING (is_admin());

-- Only super_admin can insert/update/delete admin_users
CREATE POLICY "super_admin_manages_admin_users"
  ON admin_users FOR ALL
  USING (is_super_admin())
  WITH CHECK (is_super_admin());


-- 5. CLIPPERS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS clippers (
  id                      UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name               TEXT NOT NULL,
  display_name            TEXT,
  email                   TEXT NOT NULL UNIQUE,
  avatar_url              TEXT,
  country                 TEXT,
  timezone                TEXT,
  tier                    TEXT NOT NULL DEFAULT 'starter'
                          CHECK (tier IN ('starter', 'pro', 'elite')),
  status                  TEXT NOT NULL DEFAULT 'pending'
                          CHECK (status IN ('pending', 'approved', 'suspended', 'banned')),
  -- application_id added in Phase 2 when applications table exists
  approved_at             TIMESTAMPTZ,
  approved_by             UUID REFERENCES admin_users(id),
  niche_tags              TEXT[] NOT NULL DEFAULT '{}',
  clips_completed         INTEGER NOT NULL DEFAULT 0,
  total_earned_usd        NUMERIC(10,2) NOT NULL DEFAULT 0,
  total_earned_inr        NUMERIC(12,2) NOT NULL DEFAULT 0,
  average_rating          NUMERIC(3,2),
  strike_count            INTEGER NOT NULL DEFAULT 0,
  last_active_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_deleted              BOOLEAN NOT NULL DEFAULT false,
  metadata                JSONB NOT NULL DEFAULT '{}',
  created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-update updated_at
CREATE TRIGGER update_clippers_updated_at
  BEFORE UPDATE ON clippers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS on clippers
ALTER TABLE clippers ENABLE ROW LEVEL SECURITY;

-- Clippers can read ONLY their own profile, and only if not deleted
CREATE POLICY "clippers_read_own_profile"
  ON clippers FOR SELECT
  USING (auth.uid() = id AND is_deleted = false);

-- Clippers can update their own profile
-- BUT they cannot change status, tier, strike_count, clips_completed, earnings, approved_by
-- (those are admin-only fields — enforced at the API route layer, not RLS layer)
CREATE POLICY "clippers_update_own_profile"
  ON clippers FOR UPDATE
  USING (auth.uid() = id AND is_deleted = false)
  WITH CHECK (auth.uid() = id);

-- Admins can read ALL clippers (including deleted, for audit)
CREATE POLICY "admins_read_all_clippers"
  ON clippers FOR SELECT
  USING (is_admin());

-- Admins can insert new clipper records (when approving applications)
CREATE POLICY "admins_insert_clippers"
  ON clippers FOR INSERT
  WITH CHECK (is_admin());

-- Admins can update any clipper (approve, suspend, ban, etc.)
CREATE POLICY "admins_update_clippers"
  ON clippers FOR UPDATE
  USING (is_admin());

-- NOBODY can hard-delete a clipper row — use is_deleted = true instead
-- (No DELETE policy = DELETE is blocked for everyone)


-- 6. INDEXES for performance
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_clippers_status ON clippers(status) WHERE is_deleted = false;
CREATE INDEX IF NOT EXISTS idx_clippers_country ON clippers(country) WHERE is_deleted = false;
CREATE INDEX IF NOT EXISTS idx_clippers_tier ON clippers(tier) WHERE is_deleted = false;
CREATE INDEX IF NOT EXISTS idx_clippers_email ON clippers(email);


-- ============================================================
-- PHASE 1 COMPLETE
-- Run the test queries below to verify everything works.
-- ============================================================
