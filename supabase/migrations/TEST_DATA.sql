-- ============================================
-- TEST DATA: Player Deals & Earnings
-- ============================================
-- Execute APÓS rodar migrations 007 e 008
-- ============================================

-- ============================================
-- 1. SETUP: Criar usuário de teste (se não existir)
-- ============================================

-- Nota: Em produção, players são criados via Sign Up
-- Este é apenas para teste local

-- Verificar usuários existentes:
SELECT id, email FROM auth.users LIMIT 5;

-- Se não houver usuários, você precisa criar via Supabase Auth UI
-- ou usar: Authentication → Add User no dashboard


-- ============================================
-- 2. CRIAR PLAYER DEALS DE TESTE
-- ============================================

-- Substitua 'YOUR_USER_ID' pelo UUID real de um player

-- Deal 1: Betfair Poker (Approved & Active)
INSERT INTO player_deals (
  user_id, 
  deal_id, 
  platform_username, 
  platform_email,
  status,
  approved_at,
  rakeback_percentage,
  payment_schedule,
  payment_day,
  currency,
  payment_method
) VALUES (
  'YOUR_USER_ID', -- ⚠️ SUBSTITUIR
  6, -- Betfair Poker
  'player_betfair_2025',
  'myemail@betfair.com',
  'active',
  NOW(),
  35.00,
  'monthly',
  1,
  'EUR',
  'bank_transfer'
) ON CONFLICT (user_id, deal_id) DO NOTHING;

-- Deal 2: WPT Global (Approved & Active)
INSERT INTO player_deals (
  user_id, 
  deal_id, 
  platform_username, 
  platform_email,
  status,
  approved_at,
  rakeback_percentage,
  payment_schedule,
  payment_day,
  currency,
  payment_method
) VALUES (
  'YOUR_USER_ID', -- ⚠️ SUBSTITUIR
  4, -- WPT Global
  'wptplayer2025',
  'myemail@wptglobal.com',
  'active',
  NOW(),
  40.00,
  'monthly',
  5,
  'USD',
  'skrill'
) ON CONFLICT (user_id, deal_id) DO NOTHING;

-- Deal 3: Champion Poker (Approved & Active)
INSERT INTO player_deals (
  user_id, 
  deal_id, 
  platform_username, 
  platform_email,
  status,
  approved_at,
  rakeback_percentage,
  payment_schedule,
  payment_day,
  currency,
  payment_method
) VALUES (
  'YOUR_USER_ID', -- ⚠️ SUBSTITUIR
  7, -- Champion Poker
  'champion_player_uk',
  'myemail@championpoker.com',
  'active',
  NOW(),
  30.00,
  'bi-weekly',
  1,
  'EUR',
  'neteller'
) ON CONFLICT (user_id, deal_id) DO NOTHING;

-- Deal 4: GGPoker (Pending - aguardando aprovação)
INSERT INTO player_deals (
  user_id, 
  deal_id, 
  platform_username, 
  platform_email,
  status,
  rakeback_percentage
) VALUES (
  'YOUR_USER_ID', -- ⚠️ SUBSTITUIR
  1, -- GGPoker
  'ggplayer_waiting',
  'myemail@ggpoker.com',
  'pending',
  60.00
) ON CONFLICT (user_id, deal_id) DO NOTHING;


-- ============================================
-- 3. CRIAR EARNINGS DE TESTE
-- ============================================

-- Obter player_deal_ids
DO $$
DECLARE
  betfair_deal_id UUID;
  wpt_deal_id UUID;
  champion_deal_id UUID;
  test_user_id UUID := 'YOUR_USER_ID'; -- ⚠️ SUBSTITUIR
BEGIN
  -- Get player_deal IDs
  SELECT id INTO betfair_deal_id FROM player_deals WHERE user_id = test_user_id AND deal_id = 6;
  SELECT id INTO wpt_deal_id FROM player_deals WHERE user_id = test_user_id AND deal_id = 4;
  SELECT id INTO champion_deal_id FROM player_deals WHERE user_id = test_user_id AND deal_id = 7;

  -- Betfair Earnings - Outubro 2025 (Pending)
  INSERT INTO player_earnings (
    player_deal_id, period_month, period_year,
    gross_rake, net_rake, rakeback_amount,
    payment_status
  ) VALUES (
    betfair_deal_id, 10, 2025,
    156.00, 101.40, 35.49, -- 35% of net_rake
    'pending'
  ) ON CONFLICT (player_deal_id, period_month, period_year) DO NOTHING;

  -- Betfair Earnings - Setembro 2025 (Paid)
  INSERT INTO player_earnings (
    player_deal_id, period_month, period_year,
    gross_rake, net_rake, rakeback_amount,
    payment_status, payment_date, payment_amount, payment_reference
  ) VALUES (
    betfair_deal_id, 9, 2025,
    125.00, 81.25, 28.44,
    'paid', '2025-10-05', 28.44, 'BNK-2025-10-001'
  ) ON CONFLICT (player_deal_id, period_month, period_year) DO NOTHING;

  -- Betfair Earnings - Agosto 2025 (Paid)
  INSERT INTO player_earnings (
    player_deal_id, period_month, period_year,
    gross_rake, net_rake, rakeback_amount,
    payment_status, payment_date, payment_amount, payment_reference
  ) VALUES (
    betfair_deal_id, 8, 2025,
    340.00, 221.00, 77.35,
    'paid', '2025-09-05', 77.35, 'BNK-2025-09-001'
  ) ON CONFLICT (player_deal_id, period_month, period_year) DO NOTHING;

  -- WPT Global Earnings - Outubro 2025 (Pending)
  INSERT INTO player_earnings (
    player_deal_id, period_month, period_year,
    gross_rake, net_rake, rakeback_amount,
    payment_status
  ) VALUES (
    wpt_deal_id, 10, 2025,
    112.30, 67.38, 26.95, -- 40% of net_rake
    'pending'
  ) ON CONFLICT (player_deal_id, period_month, period_year) DO NOTHING;

  -- WPT Global Earnings - Setembro 2025 (Paid)
  INSERT INTO player_earnings (
    player_deal_id, period_month, period_year,
    gross_rake, net_rake, rakeback_amount,
    payment_status, payment_date, payment_amount, payment_reference
  ) VALUES (
    wpt_deal_id, 9, 2025,
    78.50, 47.10, 18.84,
    'paid', '2025-10-08', 18.84, 'SKRILL-20251008-123'
  ) ON CONFLICT (player_deal_id, period_month, period_year) DO NOTHING;

  -- Champion Poker Earnings - Outubro 2025 (Pending)
  INSERT INTO player_earnings (
    player_deal_id, period_month, period_year,
    gross_rake, net_rake, rakeback_amount,
    payment_status
  ) VALUES (
    champion_deal_id, 10, 2025,
    94.50, 66.15, 19.85, -- 30% of net_rake
    'pending'
  ) ON CONFLICT (player_deal_id, period_month, period_year) DO NOTHING;

  -- Champion Poker Earnings - Setembro 2025 (Paid)
  INSERT INTO player_earnings (
    player_deal_id, period_month, period_year,
    gross_rake, net_rake, rakeback_amount,
    payment_status, payment_date, payment_amount, payment_reference
  ) VALUES (
    champion_deal_id, 9, 2025,
    89.15, 62.41, 18.72,
    'paid', '2025-10-03', 18.72, 'NETELLER-20251003-789'
  ) ON CONFLICT (player_deal_id, period_month, period_year) DO NOTHING;

  -- Champion Poker Earnings - Agosto 2025 (Paid)
  INSERT INTO player_earnings (
    player_deal_id, period_month, period_year,
    gross_rake, net_rake, rakeback_amount,
    payment_status, payment_date, payment_amount, payment_reference
  ) VALUES (
    champion_deal_id, 8, 2025,
    156.00, 109.20, 32.76,
    'paid', '2025-09-02', 32.76, 'NETELLER-20250902-456'
  ) ON CONFLICT (player_deal_id, period_month, period_year) DO NOTHING;

END $$;


-- ============================================
-- 4. QUERIES DE VERIFICAÇÃO
-- ============================================

-- Ver todos os deals do player
SELECT 
  pd.id,
  d.name as deal_name,
  pd.platform_username,
  pd.status,
  pd.rakeback_percentage,
  pd.currency,
  pd.payment_method,
  pd.created_at
FROM player_deals pd
JOIN deals d ON d.id = pd.deal_id
WHERE pd.user_id = 'YOUR_USER_ID' -- ⚠️ SUBSTITUIR
ORDER BY pd.created_at DESC;

-- Ver earnings do player usando a VIEW helper
SELECT 
  deal_name,
  platform_username,
  period_year,
  period_month,
  gross_rake,
  net_rake,
  rakeback_amount,
  payment_status,
  payment_date,
  payment_reference
FROM player_earnings_with_deal
WHERE user_id = 'YOUR_USER_ID' -- ⚠️ SUBSTITUIR
ORDER BY period_year DESC, period_month DESC;

-- Totais do player
SELECT 
  COUNT(DISTINCT pd.id) as total_deals,
  COUNT(DISTINCT CASE WHEN pd.status = 'active' THEN pd.id END) as active_deals,
  COUNT(DISTINCT CASE WHEN pd.status = 'pending' THEN pd.id END) as pending_deals,
  SUM(pe.rakeback_amount) as total_earnings,
  SUM(CASE WHEN pe.payment_status = 'paid' THEN pe.payment_amount ELSE 0 END) as total_paid,
  SUM(CASE WHEN pe.payment_status = 'pending' THEN pe.rakeback_amount ELSE 0 END) as pending_payment
FROM player_deals pd
LEFT JOIN player_earnings pe ON pe.player_deal_id = pd.id
WHERE pd.user_id = 'YOUR_USER_ID' -- ⚠️ SUBSTITUIR
GROUP BY pd.user_id;


-- ============================================
-- 5. CLEANUP (Se precisar resetar)
-- ============================================

-- ⚠️ CUIDADO: Isso apaga TODOS os dados de teste

-- DELETE FROM player_earnings WHERE player_deal_id IN (
--   SELECT id FROM player_deals WHERE user_id = 'YOUR_USER_ID'
-- );

-- DELETE FROM player_deals WHERE user_id = 'YOUR_USER_ID';

