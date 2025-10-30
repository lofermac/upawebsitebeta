-- ============================================
-- HEADER NAVIGATION TABLE
-- ============================================
-- Table to store dynamic header navigation buttons (max 6)

CREATE TABLE IF NOT EXISTS public.header_navigation (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    button_text VARCHAR(50) NOT NULL,
    button_url VARCHAR(255) NOT NULL,
    display_order INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Add constraint to ensure max 6 active buttons
CREATE OR REPLACE FUNCTION check_max_active_buttons()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.is_active = true THEN
        IF (SELECT COUNT(*) FROM public.header_navigation WHERE is_active = true AND id != NEW.id) >= 6 THEN
            RAISE EXCEPTION 'Maximum 6 active header buttons allowed';
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enforce_max_active_buttons
    BEFORE INSERT OR UPDATE ON public.header_navigation
    FOR EACH ROW
    EXECUTE FUNCTION check_max_active_buttons();

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_header_navigation_active_order 
    ON public.header_navigation(is_active, display_order);

-- Enable Row Level Security
ALTER TABLE public.header_navigation ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Public read access for active buttons
CREATE POLICY "Public can view active header navigation"
    ON public.header_navigation
    FOR SELECT
    USING (is_active = true);

-- Admin full access (you'll need to adjust this based on your auth setup)
CREATE POLICY "Admin full access to header navigation"
    ON public.header_navigation
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- Insert default navigation buttons
INSERT INTO public.header_navigation (button_text, button_url, display_order, is_active) VALUES
    ('Deals', '/deals', 1, true),
    ('News', '/news', 2, true),
    ('Team', '/team', 3, true),
    ('Contact Us', '/contact-us', 4, true)
ON CONFLICT DO NOTHING;

-- Comment on table
COMMENT ON TABLE public.header_navigation IS 'Stores dynamic header navigation buttons (maximum 6 active buttons)';

