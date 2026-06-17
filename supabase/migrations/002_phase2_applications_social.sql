-- ============================================================
-- CLIPFARMING — PHASE 2 MIGRATION
-- Applications & Clipper Social Accounts
-- ============================================================

CREATE TABLE IF NOT EXISTS applications (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name         TEXT NOT NULL,
  email             TEXT NOT NULL UNIQUE,
  country           TEXT NOT NULL,
  age               INTEGER NOT NULL CHECK (age >= 18),
  editing_software  TEXT[] NOT NULL DEFAULT '{}',
  experience_level  TEXT NOT NULL CHECK (experience_level IN ('beginner', 'intermediate', 'expert')),
  portfolio_urls    TEXT[] NOT NULL DEFAULT '{}',
  niches            TEXT[] NOT NULL DEFAULT '{}',
  platforms         TEXT[] NOT NULL DEFAULT '{}',
  follower_count    INTEGER,
  hours_per_week    INTEGER,
  why_join          TEXT,
  referral_code     TEXT,
  status            TEXT NOT NULL DEFAULT 'submitted'
                    CHECK (status IN ('submitted', 'reviewing', 'approved', 'rejected')),
  reviewed_by       UUID REFERENCES admin_users(id),
  rejection_reason  TEXT,
  metadata          JSONB NOT NULL DEFAULT '{}',
  submitted_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reviewed_at       TIMESTAMPTZ
);

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone_can_apply" ON applications FOR INSERT WITH CHECK (true);
CREATE POLICY "applicant_reads_own" ON applications FOR SELECT
  USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));
CREATE POLICY "admins_read_all_applications" ON applications FOR SELECT USING (is_admin());
CREATE POLICY "admins_update_applications" ON applications FOR UPDATE USING (is_admin());

CREATE TABLE IF NOT EXISTS clipper_social_accounts (
  id                   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clipper_id           UUID NOT NULL REFERENCES clippers(id) ON DELETE CASCADE,
  platform             TEXT NOT NULL CHECK (platform IN ('tiktok', 'youtube', 'instagram')),
  platform_username    TEXT NOT NULL,
  platform_user_id     TEXT,
  follower_count       INTEGER DEFAULT 0,
  is_primary           BOOLEAN NOT NULL DEFAULT false,
  is_verified          BOOLEAN NOT NULL DEFAULT false,
  verified_at          TIMESTAMPTZ,
  verification_method  TEXT DEFAULT 'manual' CHECK (verification_method IN ('manual', 'oauth')),
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_one_primary_per_platform
  ON clipper_social_accounts(clipper_id, platform) WHERE is_primary = true;
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_platform_user
  ON clipper_social_accounts(platform, platform_user_id) WHERE platform_user_id IS NOT NULL;

ALTER TABLE clipper_social_accounts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "clippers_read_own_social" ON clipper_social_accounts FOR SELECT USING (clipper_id = auth.uid());
CREATE POLICY "clippers_insert_own_social" ON clipper_social_accounts FOR INSERT WITH CHECK (clipper_id = auth.uid());
CREATE POLICY "clippers_update_own_social" ON clipper_social_accounts FOR UPDATE USING (clipper_id = auth.uid());
CREATE POLICY "admins_read_all_social" ON clipper_social_accounts FOR SELECT USING (is_admin());
CREATE POLICY "admins_update_social" ON clipper_social_accounts FOR UPDATE USING (is_admin());

ALTER TABLE clippers ADD COLUMN IF NOT EXISTS application_id UUID REFERENCES applications(id);

CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_email ON applications(email);
CREATE INDEX IF NOT EXISTS idx_social_clipper ON clipper_social_accounts(clipper_id);
CREATE INDEX IF NOT EXISTS idx_social_platform ON clipper_social_accounts(platform);
