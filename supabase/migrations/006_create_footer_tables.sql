-- ============================================
-- FOOTER TABLES
-- ============================================

-- Table: footer_poker_sites
-- Stores poker sites to display in footer (linked to deals table)
CREATE TABLE IF NOT EXISTS public.footer_poker_sites (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    deal_id INTEGER NOT NULL REFERENCES public.deals(id) ON DELETE CASCADE,
    display_order INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    CONSTRAINT unique_active_deal UNIQUE (deal_id, is_active)
);

-- Table: footer_quick_links
-- Stores custom quick links for footer
CREATE TABLE IF NOT EXISTS public.footer_quick_links (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    link_text VARCHAR(100) NOT NULL,
    link_url VARCHAR(255) NOT NULL,
    display_order INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_footer_poker_sites_active_order 
    ON public.footer_poker_sites(is_active, display_order);

CREATE INDEX IF NOT EXISTS idx_footer_poker_sites_deal_id 
    ON public.footer_poker_sites(deal_id);

CREATE INDEX IF NOT EXISTS idx_footer_quick_links_active_order 
    ON public.footer_quick_links(is_active, display_order);

-- Enable Row Level Security
ALTER TABLE public.footer_poker_sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.footer_quick_links ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Public read access for active items
CREATE POLICY "Public can view active footer poker sites"
    ON public.footer_poker_sites
    FOR SELECT
    USING (is_active = true);

CREATE POLICY "Public can view active footer quick links"
    ON public.footer_quick_links
    FOR SELECT
    USING (is_active = true);

-- RLS Policies - Admin full access
CREATE POLICY "Admin full access to footer poker sites"
    ON public.footer_poker_sites
    FOR ALL
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Admin full access to footer quick links"
    ON public.footer_quick_links
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- Insert default footer quick links (matching current hardcoded footer)
INSERT INTO public.footer_quick_links (link_text, link_url, display_order, is_active) VALUES
    ('Deals', '/deals', 1, true),
    ('News and Updates', '/news', 2, true),
    ('Partners', '/team', 3, true),
    ('Contact', '/contact-us', 4, true)
ON CONFLICT DO NOTHING;

-- Comments on tables
COMMENT ON TABLE public.footer_poker_sites IS 'Stores poker sites to display in footer (linked to deals table)';
COMMENT ON TABLE public.footer_quick_links IS 'Stores custom quick links for footer navigation';

