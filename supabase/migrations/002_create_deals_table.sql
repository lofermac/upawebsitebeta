-- ============================================
-- MIGRATION: Create Deals Table
-- ============================================
-- Description: Complete deals management system
-- Author: Universal Poker
-- Date: 2025-01-28
-- ============================================

-- Create deals table
CREATE TABLE IF NOT EXISTS deals (
  id BIGSERIAL PRIMARY KEY,
  
  -- Identification
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  platform_id INTEGER,
  
  -- Logo
  logo_url TEXT,
  logo_alt TEXT NOT NULL DEFAULT '',
  logo_max_height TEXT NOT NULL DEFAULT 'max-h-14',
  
  -- Messaging
  title TEXT NOT NULL,
  main_value TEXT NOT NULL,
  main_value_second_line TEXT,
  subtitle TEXT,
  
  -- Visual (colors)
  primary_color TEXT NOT NULL DEFAULT '#962727', -- HEX color for gradients
  glow_color TEXT NOT NULL DEFAULT 'red', -- Tailwind color name
  
  -- Buttons
  claim_offer_url TEXT NOT NULL,
  learn_more_url TEXT,
  
  -- Terms
  terms TEXT NOT NULL,
  
  -- Geo-restrictions (ISO 3166-1 alpha-2 country codes)
  available_countries TEXT[] DEFAULT '{}', -- Empty array = globally available
  
  -- Display order
  display_order INTEGER NOT NULL DEFAULT 0,
  
  -- Status
  is_active BOOLEAN NOT NULL DEFAULT true,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_deals_slug ON deals(slug);
CREATE INDEX IF NOT EXISTS idx_deals_display_order ON deals(display_order);
CREATE INDEX IF NOT EXISTS idx_deals_is_active ON deals(is_active);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_deals_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_deals_updated_at
  BEFORE UPDATE ON deals
  FOR EACH ROW
  EXECUTE FUNCTION update_deals_updated_at();

-- Insert initial data from existing hardcoded deals
INSERT INTO deals (
  id, name, slug, platform_id, logo_url, logo_alt, logo_max_height,
  title, main_value, main_value_second_line, subtitle,
  primary_color, glow_color,
  claim_offer_url, learn_more_url, terms,
  available_countries, display_order, is_active
) VALUES
  (
    1, 'GGPoker', 'ggpoker-deal', 1365,
    'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/09/07144333/ggpoker_logo-1_white-1.webp',
    'GGPoker Logo', 'max-h-14',
    'Get Up To', '60%', 'Cashback', 'With GGPoker Fish Buffet',
    '#962727', 'red',
    '/platform-connection?platform_id=1365', '/ggpoker-deal',
    '18+ (19+ in Canada) | Please Play Responsibly | Full GGPoker T&C''s Apply | Full Universal Poker T&C''s Apply | GambleAware',
    '{}', 1, true
  ),
  (
    2, 'PartyPoker', 'partypoker-deal', 1368,
    'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/07/07144334/ENT_PartyPoker_Landscape_FullWhite_RGB.png',
    'PartyPoker Logo', 'max-h-14',
    'Get Up To', '65%', 'Cashback', 'Through Our Promotions',
    '#C8582B', 'orange',
    '/platform-connection?platform_id=1368', NULL,
    '18+ (19+ in Canada) | Please Play Responsibly | Full PartyPoker T&C''s Apply | Full Universal Poker T&C''s Apply | GambleAware',
    '{GB,DE,AT,SE,NO,DK,FI,IE,CA,NZ,AU}', 2, true
  ),
  (
    3, '888poker', '888poker-deal', 1367,
    'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/09/17183728/888-LOGO-webp-1024x309.webp',
    '888poker Logo', 'max-h-14',
    'Get An Extra', '50%', 'Cashback', 'Through Our Promotions',
    '#3B5FA3', 'blue',
    '/platform-connection?platform_id=1367', NULL,
    '#Ad | 18+ | Please Play Responsibly | Full 888Poker T&C''s Apply | Full Universal Poker T&C''s Apply | GambleAware',
    '{}', 3, true
  ),
  (
    4, 'WPT Global', 'wpt-global-deal', 1364,
    'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/01/07105909/WPT-LOGO-WebP-1920x350-1-1024x168.webp',
    'WPT Global Logo', 'max-h-14',
    'Get Up To An Extra', '40%', 'Cashback', 'Every Month',
    '#633C9A', 'purple',
    '/platform-connection?platform_id=1364', NULL,
    '18+ | Please Play Responsibly | Full WPT Global T&C''s Apply | Full Universal Poker T&C''s Apply | GambleAware',
    '{BR,CA,DE,AT,SE,NO,FI,PT,ES,IT,FR,NL,BE,MX,AR,CL,CO}', 4, true
  ),
  (
    5, 'Unibet', 'unibet-deal', 9074,
    'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/08/15110203/Unitbet-Logo.png',
    'Unibet Logo', 'max-h-14',
    'Enhanced Welcome Bonus', 'Worth', '£540', 'Plus 4 x €500 Freerolls',
    '#398654', 'emerald',
    '/platform-connection?platform_id=9074', NULL,
    '18+ | GambleAware | Full Unibet T&C''s apply | Full Universal Poker T&C''s apply | Play Responsibly | New UK players only',
    '{GB,SE,DK,NO,FI,EE,LV,LT,IE,DE,AT,NL,BE,FR,IT,ES,PT}', 5, true
  ),
  (
    6, 'Betfair Poker', 'betfair-poker-deal', 1363,
    'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/09/17185334/Betfair-Website-Logo-1-1-1-1024x185.webp',
    'Betfair Logo', 'max-h-14',
    'Instant VIP Upgrade To', '35%', 'Cashback', '+ €50k In Races',
    '#AA872C', 'yellow',
    '/platform-connection?platform_id=1363', NULL,
    '18+ | Please Play Responsibly | Full Betfair T&C''s Apply | Full Universal Poker T&C''s Apply | GambleAware',
    '{GB,IE,DE,AT,SE,DK,IT,ES,PT,GR,RO,BG}', 6, true
  ),
  (
    7, 'Champion Poker', 'champion-poker-deal', 6016,
    'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/17184626/CHAMPIONPOKER-logo-1024x160.webp',
    'Champion Poker Logo', 'max-h-14',
    'Get An Instant Upgrade To', '30%', 'Cashback', '+ All On-Site Promotions',
    '#943636', 'red',
    '/platform-connection?platform_id=6016', NULL,
    '18+ | Play Responsibly | Full Champion Poker T&C''s Apply | Full Universal Poker T&C''s Apply | GambleAware',
    '{}', 7, true
  ),
  (
    8, 'WSOP.CA', 'wsop-ca-deal', 2933,
    'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/12/11192441/wsop-ontario-logo-1024x376.webp',
    'WSOP.CA Logo', 'max-h-14',
    'Play On A', 'GGPoker', 'Alternative', 'From Ontario Only',
    '#AA7F2B', 'amber',
    '/platform-connection?platform_id=2933', NULL,
    '19+ | Please Play Responsibly | Full WSOP.ca T&C''s Apply | Full Universal Poker T&C''s Apply | www.ConnexOntario.ca',
    '{CA}', 8, true
  ),
  (
    9, 'Optibet Poker', 'optibet-poker-deal', 1362,
    'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/09/17100841/Optibet-Poker-logo-2D-horizontal-red-bg-1024x298.png',
    'Optibet Poker Logo', 'max-h-14',
    'Get Up To', '60%', 'Cashback', 'Every Month',
    '#A23D56', 'rose',
    '/platform-connection?platform_id=1362', NULL,
    '18+ | Please Play Responsibly | GambleAware | Full Optibet T&C''s Apply | Full Universal Poker T&C''s Apply | EE & LAT Only',
    '{EE,LV}', 9, true
  ),
  (
    10, 'CoinPoker', 'coinpoker-deal', NULL,
    '/images/coinlogo.png',
    'CoinPoker Logo', 'max-h-60',
    'Join Our', 'Monthly Rake', 'Chase', 'Up To $1500 Every Month',
    '#7D2C2C', 'red',
    '#', NULL,
    '18+ (19+ in Canada) | Please Play Responsibly | Full CoinPoker T&C''s Apply | Full Universal Poker T&C''s Apply | GambleAware',
    '{}', 10, true
  )
ON CONFLICT (id) DO NOTHING;

-- Reset sequence to continue from 11
SELECT setval('deals_id_seq', (SELECT MAX(id) FROM deals));

-- Enable Row Level Security (RLS)
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;

-- Policy: Public read access for active deals
CREATE POLICY "Public can view active deals"
  ON deals
  FOR SELECT
  USING (is_active = true);

-- Policy: Authenticated users can manage deals (admin only - add role check if needed)
CREATE POLICY "Authenticated users can manage deals"
  ON deals
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Comments for documentation
COMMENT ON TABLE deals IS 'Poker site deals and promotions management';
COMMENT ON COLUMN deals.available_countries IS 'Empty array = globally available, otherwise ISO 3166-1 alpha-2 codes';
COMMENT ON COLUMN deals.primary_color IS 'HEX color for generating radial gradients';
COMMENT ON COLUMN deals.glow_color IS 'Tailwind color name (red, blue, purple, etc)';

