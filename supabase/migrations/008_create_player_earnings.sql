-- ============================================
-- MIGRATION: Player Earnings Table
-- ============================================
-- Description: Tracking de rake e pagamentos por deal
-- Author: Universal Poker
-- Date: 2025-11-01
-- ============================================

-- Create player_earnings table
CREATE TABLE IF NOT EXISTS player_earnings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Foreign Key
  player_deal_id UUID NOT NULL REFERENCES player_deals(id) ON DELETE CASCADE,
  
  -- Period (mês/ano)
  period_month INTEGER NOT NULL CHECK (period_month BETWEEN 1 AND 12),
  period_year INTEGER NOT NULL CHECK (period_year >= 2025),
  
  -- Rake Data (importado via CSV)
  gross_rake DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  net_rake DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  rakeback_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00, -- Valor a pagar ao player
  
  -- Data Update Info
  data_updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Payment Status
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'processing', 'paid', 'failed')),
  payment_date TIMESTAMPTZ,
  payment_amount DECIMAL(10,2), -- Valor efetivamente pago (pode diferir do rakeback_amount)
  payment_reference TEXT, -- Número de transação, etc
  
  -- Admin tracking
  imported_by UUID REFERENCES auth.users(id), -- Admin que fez o import
  payment_made_by UUID REFERENCES auth.users(id), -- Admin que marcou como pago
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Constraints
  UNIQUE(player_deal_id, period_month, period_year) -- 1 registro por deal por mês
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_player_earnings_deal_id ON player_earnings(player_deal_id);
CREATE INDEX IF NOT EXISTS idx_player_earnings_period ON player_earnings(period_year, period_month);
CREATE INDEX IF NOT EXISTS idx_player_earnings_payment_status ON player_earnings(payment_status);

-- Enable Row Level Security
ALTER TABLE player_earnings ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Players can view own earnings
CREATE POLICY "Players can view own earnings"
  ON player_earnings FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM player_deals
      WHERE player_deals.id = player_earnings.player_deal_id
      AND player_deals.user_id = auth.uid()
    )
  );

-- RLS Policy: Admins can manage all earnings
CREATE POLICY "Admins can manage all earnings"
  ON player_earnings FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.user_type = 'admin'
    )
  );

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_player_earnings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER player_earnings_updated_at
  BEFORE UPDATE ON player_earnings
  FOR EACH ROW
  EXECUTE FUNCTION update_player_earnings_updated_at();

-- Create view helper para facilitar queries
CREATE OR REPLACE VIEW player_earnings_with_deal AS
SELECT 
  pe.*,
  pd.user_id,
  pd.deal_id,
  pd.platform_username,
  pd.status as deal_status,
  d.name as deal_name,
  d.platform_id
FROM player_earnings pe
JOIN player_deals pd ON pd.id = pe.player_deal_id
JOIN deals d ON d.id = pd.deal_id;

-- Add comments for documentation
COMMENT ON TABLE player_earnings IS 'Rake e pagamentos por deal por período (mês/ano)';
COMMENT ON COLUMN player_earnings.gross_rake IS 'Rake bruto gerado pelo player';
COMMENT ON COLUMN player_earnings.net_rake IS 'Rake líquido após descontos da plataforma';
COMMENT ON COLUMN player_earnings.rakeback_amount IS 'Valor de rakeback a ser pago ao player';
COMMENT ON COLUMN player_earnings.payment_status IS 'pending=aguardando, processing=em processamento, paid=pago, failed=falha no pagamento';
COMMENT ON COLUMN player_earnings.payment_reference IS 'Referência da transação (ID do banco, Skrill, etc)';

