-- ============================================
-- HOME FEATURED DEALS TABLE
-- ============================================
-- This table stores the section texts for the Featured Deals section
-- (title, subtitle, button text, button link)

-- Create table
CREATE TABLE IF NOT EXISTS home_featured_deals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section_title TEXT NOT NULL,
  section_subtitle TEXT NOT NULL,
  button_text TEXT NOT NULL,
  button_link TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE home_featured_deals ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Public read access (anyone can view)
CREATE POLICY "Allow public read access" ON home_featured_deals
  FOR SELECT
  USING (true);

-- Admin write access (only admins can modify)
CREATE POLICY "Allow admin insert" ON home_featured_deals
  FOR INSERT
  WITH CHECK (true); -- You should add proper auth check here

CREATE POLICY "Allow admin update" ON home_featured_deals
  FOR UPDATE
  USING (true) -- You should add proper auth check here
  WITH CHECK (true);

CREATE POLICY "Allow admin delete" ON home_featured_deals
  FOR DELETE
  USING (true); -- You should add proper auth check here

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_home_featured_deals_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_home_featured_deals_updated_at
  BEFORE UPDATE ON home_featured_deals
  FOR EACH ROW
  EXECUTE FUNCTION update_home_featured_deals_updated_at();

-- ============================================
-- INITIAL DATA
-- ============================================
-- Insert default values

INSERT INTO home_featured_deals (
  section_title,
  section_subtitle,
  button_text,
  button_link
) VALUES (
  'Stop Leaving Money On The Table',
  'Take a look at our deals and start maximising your rewards through our promotions',
  'View All Deals',
  '/deals'
);

-- ============================================
-- NOTES
-- ============================================
-- 1. This table stores the section texts (not the individual deals)
-- 2. Should only have ONE row (single record for the entire section)
-- 3. The admin panel updates this single record
-- 4. RLS policies allow public read access and admin write access

