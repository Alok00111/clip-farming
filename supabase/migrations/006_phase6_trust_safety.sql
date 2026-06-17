-- ============================================================
-- CLIPFARMING — PHASE 6 MIGRATION
-- Trust & Safety: Strikes, Disputes, Audit Logs, Referrals, Notifications
-- ============================================================

CREATE TABLE IF NOT EXISTS strikes (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clipper_id      UUID NOT NULL REFERENCES clippers(id) ON DELETE CASCADE,
  reason          TEXT NOT NULL,
  category        TEXT NOT NULL CHECK (category IN ('fraud','quality','deadline_miss','behavior')),
  severity        TEXT NOT NULL DEFAULT 'warning' CHECK (severity IN ('warning','strike','ban')),
  issued_by       UUID NOT NULL REFERENCES admin_users(id),
  clip_project_id UUID REFERENCES clip_projects(id),
  is_active       BOOLEAN NOT NULL DEFAULT true,
  expires_at      TIMESTAMPTZ,
  issued_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE strikes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "clippers_read_own_strikes" ON strikes FOR SELECT USING (clipper_id = auth.uid());
CREATE POLICY "admins_manage_strikes" ON strikes FOR ALL USING (is_admin()) WITH CHECK (is_admin());

CREATE TABLE IF NOT EXISTS disputes (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clip_project_id UUID NOT NULL REFERENCES clip_projects(id) ON DELETE CASCADE,
  clipper_id      UUID NOT NULL REFERENCES clippers(id) ON DELETE CASCADE,
  reason          TEXT NOT NULL,
  evidence_urls   TEXT[] NOT NULL DEFAULT '{}',
  status          TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open','under_review','upheld','dismissed')),
  resolution_notes TEXT,
  resolved_by     UUID REFERENCES admin_users(id),
  opened_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  resolved_at     TIMESTAMPTZ
);

ALTER TABLE disputes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "clippers_read_own_disputes" ON disputes FOR SELECT USING (clipper_id = auth.uid());
CREATE POLICY "clippers_open_disputes" ON disputes FOR INSERT WITH CHECK (clipper_id = auth.uid());
CREATE POLICY "admins_manage_disputes" ON disputes FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- APPEND ONLY — no UPDATE or DELETE policies ever
CREATE TABLE IF NOT EXISTS audit_logs (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_id     UUID NOT NULL REFERENCES admin_users(id),
  action       TEXT NOT NULL,
  target_table TEXT NOT NULL,
  target_id    UUID NOT NULL,
  old_values   JSONB DEFAULT '{}',
  new_values   JSONB DEFAULT '{}',
  ip_address   TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins_read_audit_logs" ON audit_logs FOR SELECT USING (is_admin());
CREATE POLICY "admins_insert_audit_logs" ON audit_logs FOR INSERT WITH CHECK (is_admin());

CREATE TABLE IF NOT EXISTS referrals (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  referrer_id         UUID NOT NULL REFERENCES clippers(id) ON DELETE CASCADE,
  referred_email      TEXT NOT NULL,
  referred_clipper_id UUID REFERENCES clippers(id),
  referral_code       TEXT NOT NULL UNIQUE,
  status              TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','signed_up','approved','rewarded')),
  reward_amount       NUMERIC(8,2) DEFAULT 0,
  reward_currency     TEXT DEFAULT 'INR',
  reward_paid_at      TIMESTAMPTZ,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "clippers_read_own_referrals" ON referrals FOR SELECT USING (referrer_id = auth.uid());
CREATE POLICY "admins_manage_referrals" ON referrals FOR ALL USING (is_admin()) WITH CHECK (is_admin());

CREATE TABLE IF NOT EXISTS notifications (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID NOT NULL REFERENCES clippers(id) ON DELETE CASCADE,
  type       TEXT NOT NULL CHECK (type IN ('clip_approved','clip_rejected','payout_sent','new_video','revision_requested','strike_issued','dispute_resolved')),
  title      TEXT NOT NULL,
  body       TEXT NOT NULL,
  is_read    BOOLEAN NOT NULL DEFAULT false,
  action_url TEXT,
  metadata   JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "clippers_read_own_notifications" ON notifications FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "clippers_update_own_notifications" ON notifications FOR UPDATE USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "admins_insert_notifications" ON notifications FOR INSERT WITH CHECK (is_admin());

CREATE INDEX IF NOT EXISTS idx_strikes_clipper ON strikes(clipper_id);
CREATE INDEX IF NOT EXISTS idx_disputes_clipper ON disputes(clipper_id);
CREATE INDEX IF NOT EXISTS idx_disputes_status ON disputes(status);
CREATE INDEX IF NOT EXISTS idx_audit_logs_actor ON audit_logs(actor_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_target ON audit_logs(target_table, target_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created ON audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON notifications(user_id) WHERE is_read = false;
CREATE INDEX IF NOT EXISTS idx_referrals_referrer ON referrals(referrer_id);
CREATE INDEX IF NOT EXISTS idx_referrals_code ON referrals(referral_code);
