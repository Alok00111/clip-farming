-- ============================================================
-- CLIPFARMING — PHASE 4 MIGRATION
-- Fraud Prevention: Clip Performance + Platform Video ID
-- ============================================================

CREATE TABLE IF NOT EXISTS clip_performance (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clip_project_id     UUID NOT NULL REFERENCES clip_projects(id) ON DELETE CASCADE,
  platform            TEXT NOT NULL CHECK (platform IN ('tiktok', 'youtube_shorts', 'instagram_reels')),
  platform_post_url   TEXT NOT NULL,
  platform_video_id   TEXT NOT NULL,
  platform_account_id TEXT,
  views               BIGINT NOT NULL DEFAULT 0,
  likes               BIGINT NOT NULL DEFAULT 0,
  shares              BIGINT NOT NULL DEFAULT 0,
  comments            INTEGER NOT NULL DEFAULT 0,
  cpm_earnings_usd    NUMERIC(10,4) NOT NULL DEFAULT 0,
  cpm_earnings_inr    NUMERIC(12,4) NOT NULL DEFAULT 0,
  last_synced_at      TIMESTAMPTZ,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- CORE FRAUD PREVENTION: same video ID can never be submitted twice on the same platform
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_platform_video_id
  ON clip_performance(platform, platform_video_id);

ALTER TABLE clip_performance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "clippers_read_own_performance" ON clip_performance FOR SELECT
  USING (EXISTS (SELECT 1 FROM clip_projects WHERE id = clip_project_id AND clipper_id = auth.uid()));
CREATE POLICY "clippers_insert_performance" ON clip_performance FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM clip_projects WHERE id = clip_project_id AND clipper_id = auth.uid() AND status = 'approved'));
CREATE POLICY "admins_manage_performance" ON clip_performance FOR ALL USING (is_admin()) WITH CHECK (is_admin());

CREATE INDEX IF NOT EXISTS idx_performance_clip ON clip_performance(clip_project_id);
CREATE INDEX IF NOT EXISTS idx_performance_platform ON clip_performance(platform);
CREATE INDEX IF NOT EXISTS idx_performance_views ON clip_performance(views DESC);
