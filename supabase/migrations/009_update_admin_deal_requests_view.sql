-- Migration: Update admin_deal_requests view to include rejection_reason and admin_notes
-- Drop existing view
DROP VIEW IF EXISTS admin_deal_requests;

-- Recreate view with all necessary fields
CREATE VIEW admin_deal_requests AS
SELECT 
  pd.id,
  pd.user_id,
  pd.deal_id,
  pd.platform_username,
  pd.platform_email,
  pd.status,
  pd.requested_at,
  pd.approved_at,
  pd.created_at,
  pd.rejection_reason,
  pd.admin_notes,
  d.name as deal_name,
  d.logo_url as deal_logo,
  p.email as player_email,
  p.full_name as player_name
FROM player_deals pd
INNER JOIN deals d ON d.id = pd.deal_id
INNER JOIN profiles p ON p.id = pd.user_id;

-- Grant access to authenticated users
GRANT SELECT ON admin_deal_requests TO authenticated;

-- Comment on view
COMMENT ON VIEW admin_deal_requests IS 'Admin view for deal requests with player and deal info, including rejection reasons and notes';

