-- ============================================================
-- CLIPFARMING — PHASE 5 MIGRATION
-- Payments: Payment Profiles, Payouts, Line Items, Client Invoices
-- Payment Stack: Razorpay (India/UPI) + Wise (International)
-- ============================================================

CREATE TABLE IF NOT EXISTS clipper_payment_profiles (
  id                        UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clipper_id                UUID NOT NULL UNIQUE REFERENCES clippers(id) ON DELETE CASCADE,
  preferred_method          TEXT NOT NULL DEFAULT 'upi' CHECK (preferred_method IN ('upi','wise','paypal','bank_transfer')),
  upi_id                    TEXT,
  upi_verified              BOOLEAN NOT NULL DEFAULT false,
  upi_verified_at           TIMESTAMPTZ,
  razorpay_contact_id       TEXT,
  razorpay_fund_account_id  TEXT,
  wise_account_email        TEXT,
  wise_profile_id           TEXT,
  paypal_email              TEXT,
  bank_account_number       TEXT,
  bank_ifsc_code            TEXT,
  bank_swift_code           TEXT,
  bank_country              TEXT,
  pan_number                TEXT,
  tax_form_type             TEXT CHECK (tax_form_type IN ('pan','w9','w8ben')),
  tax_form_submitted        BOOLEAN NOT NULL DEFAULT false,
  is_verified               BOOLEAN NOT NULL DEFAULT false,
  verified_at               TIMESTAMPTZ,
  metadata                  JSONB NOT NULL DEFAULT '{}',
  created_at                TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at                TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_payment_profiles_updated_at
  BEFORE UPDATE ON clipper_payment_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE clipper_payment_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "clippers_read_own_payment" ON clipper_payment_profiles FOR SELECT USING (clipper_id = auth.uid());
CREATE POLICY "clippers_insert_own_payment" ON clipper_payment_profiles FOR INSERT WITH CHECK (clipper_id = auth.uid());
CREATE POLICY "clippers_update_own_payment" ON clipper_payment_profiles FOR UPDATE USING (clipper_id = auth.uid()) WITH CHECK (clipper_id = auth.uid());
CREATE POLICY "super_admin_reads_payment_profiles" ON clipper_payment_profiles FOR SELECT USING (is_super_admin());
CREATE POLICY "super_admin_updates_payment_profiles" ON clipper_payment_profiles FOR UPDATE USING (is_super_admin());

CREATE TABLE IF NOT EXISTS payouts (
  id                   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clipper_id           UUID NOT NULL REFERENCES clippers(id) ON DELETE RESTRICT,
  payout_period_start  DATE NOT NULL,
  payout_period_end    DATE NOT NULL,
  base_earnings        NUMERIC(10,2) NOT NULL DEFAULT 0,
  cpm_earnings         NUMERIC(10,2) NOT NULL DEFAULT 0,
  total_amount         NUMERIC(10,2) NOT NULL DEFAULT 0,
  currency             TEXT NOT NULL DEFAULT 'INR' CHECK (currency IN ('INR','USD','GBP','EUR')),
  status               TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','processing','completed','failed')),
  payment_method       TEXT NOT NULL DEFAULT 'upi' CHECK (payment_method IN ('upi','wise','paypal','bank_transfer')),
  processor            TEXT NOT NULL DEFAULT 'manual' CHECK (processor IN ('razorpay','wise','manual')),
  razorpay_payout_id   TEXT,
  wise_transfer_id     TEXT,
  payment_reference    TEXT,
  payment_proof_url    TEXT,
  failure_reason       TEXT,
  paid_at              TIMESTAMPTZ,
  metadata             JSONB NOT NULL DEFAULT '{}',
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE payouts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "clippers_read_own_payouts" ON payouts FOR SELECT USING (clipper_id = auth.uid());
CREATE POLICY "admins_manage_payouts" ON payouts FOR ALL USING (is_admin()) WITH CHECK (is_admin());

CREATE TABLE IF NOT EXISTS payout_line_items (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  payout_id        UUID NOT NULL REFERENCES payouts(id) ON DELETE CASCADE,
  clip_project_id  UUID NOT NULL REFERENCES clip_projects(id) ON DELETE RESTRICT,
  base_amount      NUMERIC(8,2) NOT NULL DEFAULT 0,
  cpm_amount       NUMERIC(8,4) NOT NULL DEFAULT 0,
  total_amount     NUMERIC(8,2) NOT NULL DEFAULT 0,
  currency         TEXT NOT NULL DEFAULT 'INR'
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_one_clip_per_payout ON payout_line_items(clip_project_id);

ALTER TABLE payout_line_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "clippers_read_own_line_items" ON payout_line_items FOR SELECT
  USING (EXISTS (SELECT 1 FROM payouts WHERE id = payout_id AND clipper_id = auth.uid()));
CREATE POLICY "admins_manage_line_items" ON payout_line_items FOR ALL USING (is_admin()) WITH CHECK (is_admin());

CREATE TABLE IF NOT EXISTS client_invoices (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id           UUID NOT NULL REFERENCES clients(id) ON DELETE RESTRICT,
  invoice_number      TEXT NOT NULL UNIQUE,
  period_start        DATE NOT NULL,
  period_end          DATE NOT NULL,
  amount              NUMERIC(10,2) NOT NULL,
  currency            TEXT NOT NULL DEFAULT 'INR' CHECK (currency IN ('INR','USD','GBP','EUR')),
  status              TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','sent','paid','overdue','void')),
  razorpay_order_id   TEXT,
  razorpay_payment_id TEXT,
  wise_transfer_id    TEXT,
  payment_proof_url   TEXT,
  invoice_pdf_url     TEXT,
  gst_number          TEXT,
  due_at              TIMESTAMPTZ,
  paid_at             TIMESTAMPTZ,
  metadata            JSONB NOT NULL DEFAULT '{}',
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE client_invoices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins_manage_invoices" ON client_invoices FOR ALL USING (is_admin()) WITH CHECK (is_admin());

CREATE INDEX IF NOT EXISTS idx_payouts_clipper ON payouts(clipper_id);
CREATE INDEX IF NOT EXISTS idx_payouts_status ON payouts(status);
CREATE INDEX IF NOT EXISTS idx_payout_items_payout ON payout_line_items(payout_id);
CREATE INDEX IF NOT EXISTS idx_invoices_client ON client_invoices(client_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON client_invoices(status);
