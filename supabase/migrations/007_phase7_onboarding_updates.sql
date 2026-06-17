-- ============================================================
-- CLIPFARMING — PHASE 7 MIGRATION
-- Clipper Onboarding: Missing fields, Approval Functions, Referrals
-- ============================================================

ALTER TABLE applications
  ADD COLUMN IF NOT EXISTS user_id            UUID REFERENCES auth.users(id),
  ADD COLUMN IF NOT EXISTS phone              TEXT,
  ADD COLUMN IF NOT EXISTS primary_platform   TEXT CHECK (primary_platform IN ('instagram','youtube','tiktok','other')),
  ADD COLUMN IF NOT EXISTS primary_social_handle TEXT,
  ADD COLUMN IF NOT EXISTS sample_clip_url    TEXT;

CREATE INDEX IF NOT EXISTS idx_applications_user_id ON applications(user_id);

DROP POLICY IF EXISTS "applicant_reads_own" ON applications;
CREATE POLICY "applicant_reads_own" ON applications FOR SELECT
  USING (
    user_id = auth.uid()
    OR email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

ALTER TABLE clippers
  ADD COLUMN IF NOT EXISTS phone                      TEXT,
  ADD COLUMN IF NOT EXISTS bio                        TEXT,
  ADD COLUMN IF NOT EXISTS preferred_editing_software TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS discord_username           TEXT,
  ADD COLUMN IF NOT EXISTS own_referral_code          TEXT UNIQUE;

CREATE OR REPLACE FUNCTION generate_referral_code()
RETURNS TRIGGER AS $$
DECLARE
  code   TEXT;
  taken  BOOLEAN;
  prefix TEXT;
BEGIN
  prefix := UPPER(SUBSTRING(REGEXP_REPLACE(NEW.full_name, '[^a-zA-Z]', '', 'g'), 1, 2));
  IF LENGTH(prefix) < 2 THEN prefix := 'CF'; END IF;
  LOOP
    code := prefix || UPPER(SUBSTRING(MD5(RANDOM()::TEXT || NOW()::TEXT), 1, 6));
    SELECT COUNT(*) > 0 INTO taken FROM clippers WHERE own_referral_code = code;
    EXIT WHEN NOT taken;
  END LOOP;
  NEW.own_referral_code := code;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER auto_generate_referral_code
  BEFORE INSERT ON clippers
  FOR EACH ROW
  WHEN (NEW.own_referral_code IS NULL)
  EXECUTE FUNCTION generate_referral_code();

ALTER TABLE raw_videos
  ADD COLUMN IF NOT EXISTS view_target      BIGINT         NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS views_delivered  BIGINT         NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS budget_allocated NUMERIC(12,2)  NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS budget_spent     NUMERIC(12,2)  NOT NULL DEFAULT 0;

CREATE OR REPLACE FUNCTION approve_application(
  p_application_id UUID,
  p_admin_id       UUID
)
RETURNS JSONB AS $$
DECLARE
  v_app applications%ROWTYPE;
BEGIN
  SELECT * INTO v_app FROM applications WHERE id = p_application_id;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'Application not found');
  END IF;

  IF v_app.status NOT IN ('submitted', 'reviewing') THEN
    RETURN jsonb_build_object('success', false, 'error', 'Application already processed');
  END IF;

  IF v_app.user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'No linked user account — applicant must sign in with Google first');
  END IF;

  UPDATE applications SET
    status      = 'approved',
    reviewed_by = p_admin_id,
    reviewed_at = NOW()
  WHERE id = p_application_id;

  INSERT INTO clippers (
    id, full_name, email, country, phone,
    niche_tags, status, approved_at, approved_by,
    application_id, preferred_editing_software, metadata
  ) VALUES (
    v_app.user_id,
    v_app.full_name,
    v_app.email,
    v_app.country,
    v_app.phone,
    v_app.niches,
    'approved',
    NOW(),
    p_admin_id,
    p_application_id,
    v_app.editing_software,
    jsonb_build_object(
      'experience_level', v_app.experience_level,
      'platforms',        v_app.platforms,
      'portfolio_urls',   v_app.portfolio_urls,
      'hours_per_week',   v_app.hours_per_week,
      'sample_clip_url',  v_app.sample_clip_url,
      'primary_platform', v_app.primary_platform,
      'primary_social_handle', v_app.primary_social_handle
    )
  )
  ON CONFLICT (id) DO UPDATE SET
    status      = 'approved',
    approved_at = NOW(),
    approved_by = p_admin_id;

  RETURN jsonb_build_object(
    'success',    true,
    'clipper_id', v_app.user_id,
    'user_id',    v_app.user_id,
    'email',      v_app.email,
    'full_name',  v_app.full_name
  );
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION reject_application(
  p_application_id UUID,
  p_admin_id       UUID,
  p_reason         TEXT DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
  v_app applications%ROWTYPE;
BEGIN
  SELECT * INTO v_app FROM applications WHERE id = p_application_id;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'Application not found');
  END IF;

  UPDATE applications SET
    status           = 'rejected',
    reviewed_by      = p_admin_id,
    reviewed_at      = NOW(),
    rejection_reason = p_reason
  WHERE id = p_application_id;

  RETURN jsonb_build_object(
    'success',          true,
    'email',            v_app.email,
    'full_name',        v_app.full_name,
    'rejection_reason', p_reason
  );
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_clipper_status(p_user_id UUID)
RETURNS TEXT AS $$
DECLARE
  v_status TEXT;
BEGIN
  SELECT status INTO v_status FROM clippers
  WHERE id = p_user_id AND is_deleted = false;

  IF FOUND THEN RETURN v_status; END IF;

  SELECT 'applied' INTO v_status FROM applications
  WHERE user_id = p_user_id AND status IN ('submitted', 'reviewing')
  LIMIT 1;

  RETURN COALESCE(v_status, 'not_found');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
