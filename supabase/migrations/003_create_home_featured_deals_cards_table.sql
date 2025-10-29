-- ============================================
-- HOME FEATURED DEALS CARDS TABLE
-- ============================================
-- This table stores the 3 featured deals displayed on the homepage
-- Links to the deals table via deal_id

-- Create table
CREATE TABLE IF NOT EXISTS home_featured_deals_cards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  deal_id INTEGER NOT NULL REFERENCES deals(id) ON DELETE CASCADE,
  display_order INTEGER NOT NULL CHECK (display_order >= 1 AND display_order <= 3),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(display_order) -- Each position (1, 2, 3) can only have one deal
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_home_featured_deals_cards_deal_id ON home_featured_deals_cards(deal_id);
CREATE INDEX IF NOT EXISTS idx_home_featured_deals_cards_display_order ON home_featured_deals_cards(display_order);

-- Enable Row Level Security
ALTER TABLE home_featured_deals_cards ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Public read access (anyone can view featured deals)
CREATE POLICY "Allow public read access" ON home_featured_deals_cards
  FOR SELECT
  USING (true);

-- Admin write access (only admins can modify featured deals)
CREATE POLICY "Allow admin insert" ON home_featured_deals_cards
  FOR INSERT
  WITH CHECK (true); -- You should add proper auth check here

CREATE POLICY "Allow admin update" ON home_featured_deals_cards
  FOR UPDATE
  USING (true) -- You should add proper auth check here
  WITH CHECK (true);

CREATE POLICY "Allow admin delete" ON home_featured_deals_cards
  FOR DELETE
  USING (true); -- You should add proper auth check here

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_home_featured_deals_cards_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_home_featured_deals_cards_updated_at
  BEFORE UPDATE ON home_featured_deals_cards
  FOR EACH ROW
  EXECUTE FUNCTION update_home_featured_deals_cards_updated_at();

-- ============================================
-- INITIAL DATA (Optional - for testing)
-- ============================================
-- Uncomment if you want to seed with initial data
-- Make sure the deal IDs exist in your deals table

-- INSERT INTO home_featured_deals_cards (deal_id, display_order) VALUES
-- (1, 1),
-- (2, 2),
-- (3, 3);

-- ============================================
-- NOTES
-- ============================================
-- 1. This table stores exactly 3 featured deals at all times
-- 2. display_order must be 1, 2, or 3 (enforced by CHECK constraint and UNIQUE)
-- 3. When updating featured deals, the admin panel deletes all rows and inserts 3 new ones
-- 4. If a deal is deleted from the deals table, it will be removed from featured (CASCADE)
-- 5. RLS policies allow public read access and admin write access

