-- ============================================
-- MIGRATION: Sub-Affiliates & Referrals System
-- ============================================
-- Description: Tabelas para sistema de sub-affiliates e tracking de referrals
-- Author: Universal Poker
-- Date: 2025-11-06
-- ============================================

-- ============================================
-- 1. CREATE sub_affiliate_requests TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS sub_affiliate_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  experience TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_notes TEXT,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  UNIQUE(player_id) -- Um player só pode ter um request por vez
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_sub_affiliate_requests_player_id ON sub_affiliate_requests(player_id);
CREATE INDEX IF NOT EXISTS idx_sub_affiliate_requests_status ON sub_affiliate_requests(status);

-- Enable RLS
ALTER TABLE sub_affiliate_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Players can view own requests" ON sub_affiliate_requests
  FOR SELECT USING (auth.uid() = player_id);

CREATE POLICY "Players can create requests" ON sub_affiliate_requests
  FOR INSERT WITH CHECK (auth.uid() = player_id);

CREATE POLICY "Admins can manage all requests" ON sub_affiliate_requests
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.user_type = 'admin'
    )
  );

-- ============================================
-- 2. CREATE sub_affiliates TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS sub_affiliates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  referral_code TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'inactive')),
  approved_deals INTEGER[] DEFAULT '{}', -- Array de deal IDs aprovados para promover
  total_referrals INTEGER DEFAULT 0,
  total_rake_generated DECIMAL(10,2) DEFAULT 0.00,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  UNIQUE(player_id) -- Um player só pode ser sub-affiliate uma vez
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_sub_affiliates_player_id ON sub_affiliates(player_id);
CREATE INDEX IF NOT EXISTS idx_sub_affiliates_referral_code ON sub_affiliates(referral_code);
CREATE INDEX IF NOT EXISTS idx_sub_affiliates_status ON sub_affiliates(status);

-- Enable RLS
ALTER TABLE sub_affiliates ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Sub-affiliates can view own data" ON sub_affiliates
  FOR SELECT USING (auth.uid() = player_id);

CREATE POLICY "Admins can manage all sub-affiliates" ON sub_affiliates
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.user_type = 'admin'
    )
  );

-- ============================================
-- 3. CREATE referrals TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sub_affiliate_id UUID NOT NULL REFERENCES sub_affiliates(id) ON DELETE CASCADE,
  referred_player_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  referral_code_used TEXT NOT NULL,
  player_deal_id UUID REFERENCES player_deals(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'inactive')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  UNIQUE(referred_player_id) -- Um player só pode ter UM referral (first click wins)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_referrals_sub_affiliate_id ON referrals(sub_affiliate_id);
CREATE INDEX IF NOT EXISTS idx_referrals_referred_player_id ON referrals(referred_player_id);
CREATE INDEX IF NOT EXISTS idx_referrals_player_deal_id ON referrals(player_deal_id);
CREATE INDEX IF NOT EXISTS idx_referrals_status ON referrals(status);

-- Enable RLS
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Sub-affiliates can view own referrals" ON referrals
  FOR SELECT USING (
    sub_affiliate_id IN (
      SELECT id FROM sub_affiliates WHERE player_id = auth.uid()
    )
  );

CREATE POLICY "Players can view own referral data" ON referrals
  FOR SELECT USING (auth.uid() = referred_player_id);

CREATE POLICY "Admins can manage all referrals" ON referrals
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.user_type = 'admin'
    )
  );

CREATE POLICY "System can insert referrals" ON referrals
  FOR INSERT WITH CHECK (true); -- API route vai inserir automaticamente

-- ============================================
-- 4. TRIGGERS
-- ============================================

-- Trigger para updated_at em sub_affiliate_requests
CREATE OR REPLACE FUNCTION update_sub_affiliate_requests_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER sub_affiliate_requests_updated_at
  BEFORE UPDATE ON sub_affiliate_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_sub_affiliate_requests_updated_at();

-- Trigger para updated_at em sub_affiliates
CREATE OR REPLACE FUNCTION update_sub_affiliates_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER sub_affiliates_updated_at
  BEFORE UPDATE ON sub_affiliates
  FOR EACH ROW
  EXECUTE FUNCTION update_sub_affiliates_updated_at();

-- Trigger para updated_at em referrals
CREATE OR REPLACE FUNCTION update_referrals_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER referrals_updated_at
  BEFORE UPDATE ON referrals
  FOR EACH ROW
  EXECUTE FUNCTION update_referrals_updated_at();

-- ============================================
-- 5. COMMENTS
-- ============================================
COMMENT ON TABLE sub_affiliate_requests IS 'Requests de players para se tornarem sub-affiliates';
COMMENT ON TABLE sub_affiliates IS 'Sub-affiliates aprovados com códigos de referral';
COMMENT ON TABLE referrals IS 'Players referidos por sub-affiliates (tracking)';

COMMENT ON COLUMN sub_affiliates.total_referrals IS 'Contador de total de players referidos';
COMMENT ON COLUMN sub_affiliates.total_rake_generated IS 'Total de rake gerado pelos referrals';
COMMENT ON COLUMN sub_affiliates.approved_deals IS 'Array de deal IDs que o sub-affiliate pode promover';

COMMENT ON COLUMN referrals.referral_code_used IS 'Código de referral usado pelo player';
COMMENT ON COLUMN referrals.player_deal_id IS 'Deal request criado pelo referred player (pode ser NULL se ainda não solicitou)';

