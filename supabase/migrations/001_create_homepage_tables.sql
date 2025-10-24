-- ============================================
-- HOMEPAGE CONTENT MANAGEMENT TABLES
-- Created: 2025-01-24
-- Purpose: Store editable homepage content for Universal Poker website
-- ============================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. HERO SECTION
-- ============================================
CREATE TABLE IF NOT EXISTS home_hero (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(100) NOT NULL,
    subtitle VARCHAR(200) NOT NULL,
    button_text VARCHAR(50) NOT NULL,
    button_link VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_by UUID REFERENCES auth.users(id)
);

-- Insert default hero section data
INSERT INTO home_hero (title, subtitle, button_text, button_link) VALUES
('Exclusive Deals On The World''s Best Poker Sites', 'More Rakeback. More Support. Maximum Value.', 'Explore Deals', '#deals');

-- ============================================
-- 2. STATISTICS SECTION
-- ============================================
CREATE TABLE IF NOT EXISTS home_stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    label VARCHAR(100) NOT NULL,
    value VARCHAR(50) NOT NULL,
    icon VARCHAR(50), -- Icon identifier (users, calendar, award, etc.)
    display_order INTEGER NOT NULL DEFAULT 1,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_by UUID REFERENCES auth.users(id)
);

-- Insert default stats
INSERT INTO home_stats (label, value, icon, display_order) VALUES
('Number Of Players With Us', '10,000+', 'users', 1),
('How Long We''ve Been Here', '13 Years', 'calendar', 2),
('Team Experience in Poker', '100+ Years', 'award', 3);

-- ============================================
-- 3. CASHBACK TOTAL SECTION
-- ============================================
CREATE TABLE IF NOT EXISTS home_cashback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section_title VARCHAR(100) NOT NULL,
    amount NUMERIC(12, 2) NOT NULL,
    display_text VARCHAR(50) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_by UUID REFERENCES auth.users(id)
);

-- Insert default cashback data
INSERT INTO home_cashback (section_title, amount, display_text, description) VALUES
('Rewards & Cashback Paid in 2025', 2450000.00, '$2,450,000+', 'Join thousands of players maximizing their poker profits with exclusive rakeback deals.');

-- ============================================
-- 4. HOW IT WORKS SECTION
-- ============================================
CREATE TABLE IF NOT EXISTS home_how_it_works (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section_title VARCHAR(100) NOT NULL DEFAULT 'How It Works - 3 Simple Steps',
    section_subtitle TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_by UUID REFERENCES auth.users(id)
);

CREATE TABLE IF NOT EXISTS home_how_it_works_steps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    step_number INTEGER NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 1,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_by UUID REFERENCES auth.users(id)
);

-- Insert default How It Works section
INSERT INTO home_how_it_works (section_title, section_subtitle) VALUES
('How It Works - 3 Simple Steps', 'No complicated rules. No hidden hoops. Just connect, play, and get rewarded.');

-- Insert default steps
INSERT INTO home_how_it_works_steps (step_number, title, description, display_order) VALUES
(1, 'Choose Your Deal', 'We partner with the top poker sites. Pick one you already play on or try a new one with a better offer.', 1),
(2, 'New & Existing Players Welcome', 'Create a new account through us and you''re automatically accepted. Already have an account? Apply to join our deal and we''ll review it on a case-by-case basis.', 2),
(3, 'Same Play. More Rewards', 'Nothing changes about how you play. You''ll still receive the poker sites rewards, plus extra cashback from us on top.', 3);

-- ============================================
-- 5. TESTIMONIALS SECTION
-- ============================================
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    role VARCHAR(100), -- Can be null (some testimonials don't have a role)
    quote TEXT NOT NULL,
    image_url TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 1,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_by UUID REFERENCES auth.users(id)
);

-- Insert default testimonial
INSERT INTO testimonials (name, role, quote, image_url, display_order) VALUES
('Ryan O''Donnell', 'Moca choca89', 'Universal Poker, an affiliate that''s truly exceptional, a must-have for every poker player seeking exceptional rewards, benefits, and support.', 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/05/22160615/53224561601_8aa1359351_o-scaled-e1747930080750-1024x1020.jpg', 1);

-- ============================================
-- 6. FAQ SECTION
-- ============================================
CREATE TABLE IF NOT EXISTS faqs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question VARCHAR(255) NOT NULL,
    answer TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 1,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_by UUID REFERENCES auth.users(id)
);

-- Insert default FAQs
INSERT INTO faqs (question, answer, display_order) VALUES
('Do I Have To Pay For This Service?', 'No, our service is completely free for players. We earn a commission from the poker sites when you play, which allows us to offer you additional rakeback and benefits at no cost to you.', 1),
('Can Any Country Join?', 'Most countries can join our deals, but it depends on the specific poker site''s restrictions. Some sites have regional limitations. Contact us with your location, and we''ll let you know which deals are available for you.', 2),
('How Do Payments Work?', 'Rakeback payments are typically processed monthly. Once you accumulate rakeback, we''ll transfer it directly to your poker account or via your preferred payment method (Skrill, Neteller, bank transfer, etc.). Payment schedules vary by site.', 3),
('Can I Join If I Already Have An Account?', 'Yes! If you already have an account with a poker site, you can apply to switch to our deal. We''ll review your application on a case-by-case basis and work with the poker room to transfer you to our rakeback program.', 4),
('What Makes Universal Poker Different?', 'We offer higher rakeback percentages, personalized support, exclusive promotions, and work directly with poker rooms to ensure you get the best possible deal. We''ve been in business for 13+ years and have paid out millions in rakeback.', 5);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX idx_home_stats_order ON home_stats(display_order);
CREATE INDEX idx_home_stats_active ON home_stats(is_active);
CREATE INDEX idx_how_it_works_steps_order ON home_how_it_works_steps(display_order);
CREATE INDEX idx_how_it_works_steps_active ON home_how_it_works_steps(is_active);
CREATE INDEX idx_testimonials_order ON testimonials(display_order);
CREATE INDEX idx_testimonials_active ON testimonials(is_active);
CREATE INDEX idx_faqs_order ON faqs(display_order);
CREATE INDEX idx_faqs_active ON faqs(is_active);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE home_hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_cashback ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_how_it_works ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_how_it_works_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

-- Public READ access for all tables (anyone can view homepage content)
CREATE POLICY "Public read access" ON home_hero FOR SELECT USING (true);
CREATE POLICY "Public read access" ON home_stats FOR SELECT USING (true);
CREATE POLICY "Public read access" ON home_cashback FOR SELECT USING (true);
CREATE POLICY "Public read access" ON home_how_it_works FOR SELECT USING (true);
CREATE POLICY "Public read access" ON home_how_it_works_steps FOR SELECT USING (true);
CREATE POLICY "Public read access" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public read access" ON faqs FOR SELECT USING (true);

-- Admin-only WRITE access
-- Note: You'll need to create a custom claim or use a specific user role for admin users
-- For now, we'll allow authenticated users with a specific email domain or role

-- Hero Section - Admin write
CREATE POLICY "Admin can update hero" ON home_hero FOR UPDATE 
USING (auth.uid() IN (SELECT id FROM auth.users WHERE raw_user_meta_data->>'user_type' = 'admin'));

CREATE POLICY "Admin can insert hero" ON home_hero FOR INSERT 
WITH CHECK (auth.uid() IN (SELECT id FROM auth.users WHERE raw_user_meta_data->>'user_type' = 'admin'));

-- Stats - Admin write
CREATE POLICY "Admin can update stats" ON home_stats FOR UPDATE 
USING (auth.uid() IN (SELECT id FROM auth.users WHERE raw_user_meta_data->>'user_type' = 'admin'));

CREATE POLICY "Admin can insert stats" ON home_stats FOR INSERT 
WITH CHECK (auth.uid() IN (SELECT id FROM auth.users WHERE raw_user_meta_data->>'user_type' = 'admin'));

CREATE POLICY "Admin can delete stats" ON home_stats FOR DELETE 
USING (auth.uid() IN (SELECT id FROM auth.users WHERE raw_user_meta_data->>'user_type' = 'admin'));

-- Cashback - Admin write
CREATE POLICY "Admin can update cashback" ON home_cashback FOR UPDATE 
USING (auth.uid() IN (SELECT id FROM auth.users WHERE raw_user_meta_data->>'user_type' = 'admin'));

CREATE POLICY "Admin can insert cashback" ON home_cashback FOR INSERT 
WITH CHECK (auth.uid() IN (SELECT id FROM auth.users WHERE raw_user_meta_data->>'user_type' = 'admin'));

-- How It Works - Admin write
CREATE POLICY "Admin can update how_it_works" ON home_how_it_works FOR UPDATE 
USING (auth.uid() IN (SELECT id FROM auth.users WHERE raw_user_meta_data->>'user_type' = 'admin'));

CREATE POLICY "Admin can insert how_it_works" ON home_how_it_works FOR INSERT 
WITH CHECK (auth.uid() IN (SELECT id FROM auth.users WHERE raw_user_meta_data->>'user_type' = 'admin'));

-- How It Works Steps - Admin write
CREATE POLICY "Admin can update how_it_works_steps" ON home_how_it_works_steps FOR UPDATE 
USING (auth.uid() IN (SELECT id FROM auth.users WHERE raw_user_meta_data->>'user_type' = 'admin'));

CREATE POLICY "Admin can insert how_it_works_steps" ON home_how_it_works_steps FOR INSERT 
WITH CHECK (auth.uid() IN (SELECT id FROM auth.users WHERE raw_user_meta_data->>'user_type' = 'admin'));

CREATE POLICY "Admin can delete how_it_works_steps" ON home_how_it_works_steps FOR DELETE 
USING (auth.uid() IN (SELECT id FROM auth.users WHERE raw_user_meta_data->>'user_type' = 'admin'));

-- Testimonials - Admin write
CREATE POLICY "Admin can update testimonials" ON testimonials FOR UPDATE 
USING (auth.uid() IN (SELECT id FROM auth.users WHERE raw_user_meta_data->>'user_type' = 'admin'));

CREATE POLICY "Admin can insert testimonials" ON testimonials FOR INSERT 
WITH CHECK (auth.uid() IN (SELECT id FROM auth.users WHERE raw_user_meta_data->>'user_type' = 'admin'));

CREATE POLICY "Admin can delete testimonials" ON testimonials FOR DELETE 
USING (auth.uid() IN (SELECT id FROM auth.users WHERE raw_user_meta_data->>'user_type' = 'admin'));

-- FAQs - Admin write
CREATE POLICY "Admin can update faqs" ON faqs FOR UPDATE 
USING (auth.uid() IN (SELECT id FROM auth.users WHERE raw_user_meta_data->>'user_type' = 'admin'));

CREATE POLICY "Admin can insert faqs" ON faqs FOR INSERT 
WITH CHECK (auth.uid() IN (SELECT id FROM auth.users WHERE raw_user_meta_data->>'user_type' = 'admin'));

CREATE POLICY "Admin can delete faqs" ON faqs FOR DELETE 
USING (auth.uid() IN (SELECT id FROM auth.users WHERE raw_user_meta_data->>'user_type' = 'admin'));

-- ============================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for all tables
CREATE TRIGGER update_home_hero_updated_at BEFORE UPDATE ON home_hero 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_home_stats_updated_at BEFORE UPDATE ON home_stats 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_home_cashback_updated_at BEFORE UPDATE ON home_cashback 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_home_how_it_works_updated_at BEFORE UPDATE ON home_how_it_works 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_home_how_it_works_steps_updated_at BEFORE UPDATE ON home_how_it_works_steps 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================

COMMENT ON TABLE home_hero IS 'Stores hero section content for the homepage';
COMMENT ON TABLE home_stats IS 'Stores the 3 key statistics shown on homepage';
COMMENT ON TABLE home_cashback IS 'Stores cashback total section content';
COMMENT ON TABLE home_how_it_works IS 'Stores How It Works section header';
COMMENT ON TABLE home_how_it_works_steps IS 'Stores the 3 steps for How It Works section';
COMMENT ON TABLE testimonials IS 'Stores customer testimonials displayed on homepage';
COMMENT ON TABLE faqs IS 'Stores frequently asked questions for homepage';

