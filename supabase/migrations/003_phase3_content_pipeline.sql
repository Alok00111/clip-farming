-- ============================================================
-- CLIPFARMING — PHASE 3 MIGRATION
-- Content Pipeline: Clients, Raw Videos, Clip Projects, Revision History
-- ============================================================

CREATE TABLE IF NOT EXISTS clients (
  id                       UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name             TEXT NOT NULL,
  contact_name             TEXT NOT NULL,
  email                    TEXT NOT NULL UNIQUE,
  phone                    TEXT,
  plan                     TEXT NOT NULL DEFAULT 'starter' CHECK (plan IN ('starter', 'growth', 'enterprise')),
  status                   TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'churned')),
  monthly_budget_usd       NUMERIC(10,2),
  niche                    TEXT,
  brand_guidelines_url     TEXT,
  razorpay_customer_id     TEXT,
  razorpay_subscription_id TEXT,
  wise_profile_id          TEXT,
  billing_currency         TEXT NOT NULL DEFAULT 'USD' CHECK (billing_currency IN ('INR', 'USD', 'GBP', 'EUR')),
  contract_signed_at       TIMESTAMPTZ,
  churned_at               TIMESTAMPTZ,
  churn_reason             TEXT,
  is_deleted               BOOLEAN NOT NULL DEFAULT false,
  metadata                 JSONB NOT NULL DEFAULT '{}',
  created_at               TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins_manage_clients" ON clients FOR ALL USING (is_admin()) WITH CHECK (is_admin());

CREATE TABLE IF NOT EXISTS raw_videos (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id         UUID NOT NULL REFERENCES clients(id) ON DELETE RESTRICT,
  title             TEXT NOT NULL,
  description       TEXT,
  video_url         TEXT NOT NULL,
  duration_seconds  INTEGER,
  status            TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'in_progress', 'completed', 'archived')),
  max_clips         INTEGER NOT NULL DEFAULT 10,
  clips_created     INTEGER NOT NULL DEFAULT 0,
  base_reward_usd   NUMERIC(8,2) NOT NULL DEFAULT 0,
  base_reward_inr   NUMERIC(10,2) NOT NULL DEFAULT 0,
  cpm_bonus_enabled BOOLEAN NOT NULL DEFAULT false,
  cpm_rate_per_1000 NUMERIC(6,4) DEFAULT 0,
  niche_tags        TEXT[] NOT NULL DEFAULT '{}',
  target_platforms  TEXT[] NOT NULL DEFAULT '{}',
  minimum_tier      TEXT NOT NULL DEFAULT 'starter' CHECK (minimum_tier IN ('starter', 'pro', 'elite')),
  deadline          TIMESTAMPTZ,
  published_at      TIMESTAMPTZ,
  metadata          JSONB NOT NULL DEFAULT '{}',
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE raw_videos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "approved_clippers_view_videos" ON raw_videos FOR SELECT
  USING (status = 'available' AND EXISTS (
    SELECT 1 FROM clippers WHERE id = auth.uid() AND status = 'approved' AND is_deleted = false
  ));
CREATE POLICY "admins_manage_raw_videos" ON raw_videos FOR ALL USING (is_admin()) WITH CHECK (is_admin());

CREATE TABLE IF NOT EXISTS clip_projects (
  id                     UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  raw_video_id           UUID NOT NULL REFERENCES raw_videos(id) ON DELETE RESTRICT,
  clipper_id             UUID NOT NULL REFERENCES clippers(id) ON DELETE RESTRICT,
  claimed_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deadline               TIMESTAMPTZ,
  status                 TEXT NOT NULL DEFAULT 'claimed'
                         CHECK (status IN ('claimed','submitted','under_review','approved','rejected','revision_requested','expired')),
  submitted_clip_url     TEXT,
  posted_from_account_id UUID REFERENCES clipper_social_accounts(id),
  submitted_at           TIMESTAMPTZ,
  reviewed_at            TIMESTAMPTZ,
  reviewed_by            UUID REFERENCES admin_users(id),
  revision_notes         TEXT,
  revision_count         INTEGER NOT NULL DEFAULT 0,
  client_rating          INTEGER CHECK (client_rating BETWEEN 1 AND 5),
  client_feedback        TEXT,
  base_reward_usd        NUMERIC(8,2) NOT NULL DEFAULT 0,
  base_reward_inr        NUMERIC(10,2) NOT NULL DEFAULT 0,
  is_paid                BOOLEAN NOT NULL DEFAULT false,
  metadata               JSONB NOT NULL DEFAULT '{}',
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_one_claim_per_clipper_per_video ON clip_projects(clipper_id, raw_video_id);

ALTER TABLE clip_projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "clippers_read_own_projects" ON clip_projects FOR SELECT USING (clipper_id = auth.uid());
CREATE POLICY "approved_clippers_can_claim" ON clip_projects FOR INSERT
  WITH CHECK (clipper_id = auth.uid() AND EXISTS (
    SELECT 1 FROM clippers WHERE id = auth.uid() AND status = 'approved' AND is_deleted = false
  ));
CREATE POLICY "clippers_submit_own_projects" ON clip_projects FOR UPDATE USING (clipper_id = auth.uid());
CREATE POLICY "admins_manage_clip_projects" ON clip_projects FOR ALL USING (is_admin()) WITH CHECK (is_admin());

CREATE TABLE IF NOT EXISTS revision_history (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clip_project_id UUID NOT NULL REFERENCES clip_projects(id) ON DELETE CASCADE,
  revision_number INTEGER NOT NULL,
  submitted_url   TEXT NOT NULL,
  platform_video_id TEXT,
  reviewed_by     UUID REFERENCES admin_users(id),
  decision        TEXT CHECK (decision IN ('approved','rejected','revision_requested')),
  review_notes    TEXT,
  submitted_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reviewed_at     TIMESTAMPTZ
);

ALTER TABLE revision_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "clippers_read_own_revisions" ON revision_history FOR SELECT
  USING (EXISTS (SELECT 1 FROM clip_projects WHERE id = clip_project_id AND clipper_id = auth.uid()));
CREATE POLICY "admins_manage_revisions" ON revision_history FOR ALL USING (is_admin()) WITH CHECK (is_admin());

CREATE INDEX IF NOT EXISTS idx_raw_videos_status ON raw_videos(status);
CREATE INDEX IF NOT EXISTS idx_clip_projects_clipper ON clip_projects(clipper_id);
CREATE INDEX IF NOT EXISTS idx_clip_projects_video ON clip_projects(raw_video_id);
CREATE INDEX IF NOT EXISTS idx_clip_projects_status ON clip_projects(status);
