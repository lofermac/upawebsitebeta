-- ============================================
-- MIGRATION: Player Deals Table
-- ============================================
-- Description: Relacionamento entre players e deals
-- Author: Universal Poker
-- Date: 2025-11-01
-- ============================================

-- Create player_deals table
CREATE TABLE IF NOT EXISTS player_deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Foreign Keys
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  deal_id INTEGER NOT NULL REFERENCES deals(id) ON DELETE CASCADE,
  
  -- Platform Account Info (informações da conta na plataforma específica)
  platform_username TEXT NOT NULL, -- Username que o player usa na sala
  platform_email TEXT NOT NULL, -- Email que o player usa na sala
  
  -- Status Workflow
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'active', 'rejected', 'suspended')),
  
  -- Approval Info
  approved_at TIMESTAMPTZ,
  approved_by UUID REFERENCES auth.users(id), -- Admin que aprovou
  rejection_reason TEXT, -- Se rejeitado, motivo
  
  -- Payment Info (varia por sala)
  rakeback_percentage DECIMAL(5,2), -- Ex: 35.00 = 35%
  payment_schedule TEXT, -- 'monthly', 'bi-weekly', 'weekly', 'none'
  payment_day INTEGER, -- Dia do mês (1-31) ou dia da semana
  currency TEXT DEFAULT 'USD', -- USD, EUR, etc
  payment_method TEXT, -- 'bank_transfer', 'skrill', 'neteller', 'none'
  
  -- Notes
  admin_notes TEXT, -- Notas internas para admin
  
  -- Timestamps
  requested_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Constraints
  UNIQUE(user_id, deal_id) -- Player não pode ter 2x o mesmo deal
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_player_deals_user_id ON player_deals(user_id);
CREATE INDEX IF NOT EXISTS idx_player_deals_deal_id ON player_deals(deal_id);
CREATE INDEX IF NOT EXISTS idx_player_deals_status ON player_deals(status);

-- Enable Row Level Security
ALTER TABLE player_deals ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Players can view own deals
CREATE POLICY "Players can view own deals"
  ON player_deals FOR SELECT
  USING (auth.uid() = user_id);

-- RLS Policy: Players can create (solicitar) deals
CREATE POLICY "Players can request deals"
  ON player_deals FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policy: Admins can manage all deals
CREATE POLICY "Admins can manage all deals"
  ON player_deals FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.user_type = 'admin'
    )
  );

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_player_deals_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER player_deals_updated_at
  BEFORE UPDATE ON player_deals
  FOR EACH ROW
  EXECUTE FUNCTION update_player_deals_updated_at();

-- Add comments for documentation
COMMENT ON TABLE player_deals IS 'Relacionamento entre players e deals. Um player pode ter múltiplos deals.';
COMMENT ON COLUMN player_deals.platform_username IS 'Username que o player usa na plataforma específica (ex: 888poker)';
COMMENT ON COLUMN player_deals.platform_email IS 'Email que o player usa na plataforma específica';
COMMENT ON COLUMN player_deals.status IS 'pending=aguardando aprovação, approved=aprovado mas não ativo, active=ativo e jogando, rejected=rejeitado, suspended=suspenso';
COMMENT ON COLUMN player_deals.rakeback_percentage IS 'Percentual de rakeback (ex: 35.00 = 35%)';
COMMENT ON COLUMN player_deals.payment_schedule IS 'Frequência de pagamento: monthly, bi-weekly, weekly, none';

