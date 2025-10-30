import { createClient } from '@supabase/supabase-js';
import { Deal } from './deals';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type Definitions
export interface FooterPokerSite {
  id: string;
  deal_id: number;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deal?: Deal;
}

export interface FooterQuickLink {
  id: string;
  link_text: string;
  link_url: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ============================================
// POKER SITES FUNCTIONS
// ============================================

/**
 * Get all active footer poker sites with deal information (JOIN)
 * @returns Array of poker sites with deal data
 */
export async function getFooterPokerSites() {
  console.log('🔍 [getFooterPokerSites] Fetching footer poker sites...');
  
  try {
    const { data, error } = await supabase
      .from('footer_poker_sites')
      .select(`
        *,
        deal:deals(*)
      `)
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('❌ [getFooterPokerSites] Error:', error);
      return { data: null, error };
    }

    console.log(`✅ [getFooterPokerSites] Success: ${data?.length || 0} poker sites loaded`);
    return { data, error: null };
  } catch (err) {
    console.error('❌ [getFooterPokerSites] Unexpected error:', err);
    return { data: null, error: err };
  }
}

/**
 * Update footer poker sites
 * @param sites Array of sites to update/create
 */
export async function updateFooterPokerSites(
  sites: Array<{
    id?: string;
    deal_id: number;
    display_order: number;
  }>
) {
  console.log('💾 [updateFooterPokerSites] Updating footer poker sites...');
  console.log('💾 [updateFooterPokerSites] Sites to update:', sites.length);

  try {
    // Separate existing (have id) vs new (no id or temp id)
    const existingSites = sites.filter(s => s.id && !s.id.startsWith('temp-'));
    const newSites = sites.filter(s => !s.id || s.id.startsWith('temp-'));

    // Update existing sites
    if (existingSites.length > 0) {
      const updatePromises = existingSites.map(async (site) => {
        console.log(`💾 [updateFooterPokerSites] Updating site ${site.id}`);
        
        const { data, error } = await supabase
          .from('footer_poker_sites')
          .update({
            deal_id: site.deal_id,
            display_order: site.display_order,
            updated_at: new Date().toISOString()
          })
          .eq('id', site.id)
          .select();

        if (error) {
          console.error(`❌ [updateFooterPokerSites] Error updating site ${site.id}:`, error);
          throw error;
        }

        return data;
      });

      await Promise.all(updatePromises);
    }

    // Insert new sites
    if (newSites.length > 0) {
      for (const site of newSites) {
        console.log(`➕ [updateFooterPokerSites] Adding new site with deal_id: ${site.deal_id}`);
        const { error } = await addFooterPokerSite(site.deal_id, site.display_order);
        
        if (error) {
          throw error;
        }
      }
    }
    
    console.log('✅ [updateFooterPokerSites] All sites updated successfully');
    return { success: true, error: null };
  } catch (err) {
    console.error('❌ [updateFooterPokerSites] Unexpected error:', err);
    return { success: false, error: err };
  }
}

/**
 * Add a new footer poker site
 * @param deal_id Deal ID to add
 * @param display_order Optional display order
 */
export async function addFooterPokerSite(deal_id: number, display_order?: number) {
  console.log('➕ [addFooterPokerSite] Adding new poker site...');
  console.log('➕ [addFooterPokerSite] Deal ID:', deal_id);
  console.log('➕ [addFooterPokerSite] Display order:', display_order || 'auto');

  try {
    // Check if deal_id already exists
    const { data: existing } = await supabase
      .from('footer_poker_sites')
      .select('id')
      .eq('deal_id', deal_id)
      .eq('is_active', true)
      .single();

    if (existing) {
      console.warn('⚠️ [addFooterPokerSite] Deal already exists in footer');
      return { 
        data: null, 
        error: { message: 'This poker site is already in the footer' } 
      };
    }

    // Get next display_order if not provided
    let nextOrder = display_order;
    if (!nextOrder) {
      const { data: sites } = await supabase
        .from('footer_poker_sites')
        .select('id')
        .eq('is_active', true);
      
      nextOrder = (sites?.length || 0) + 1;
    }

    console.log(`📊 [addFooterPokerSite] Using display_order: ${nextOrder}`);

    // Insert new site
    const { data, error } = await supabase
      .from('footer_poker_sites')
      .insert({
        deal_id,
        display_order: nextOrder,
        is_active: true
      })
      .select()
      .single();

    if (error) {
      console.error('❌ [addFooterPokerSite] Error inserting site:', error);
      return { data: null, error };
    }

    console.log('✅ [addFooterPokerSite] Site added successfully:', data.id);
    return { data, error: null };
  } catch (err) {
    console.error('❌ [addFooterPokerSite] Unexpected error:', err);
    return { data: null, error: err };
  }
}

/**
 * Delete a footer poker site (soft delete)
 * @param id Site ID to delete
 */
export async function deleteFooterPokerSite(id: string) {
  console.log('🗑️ [deleteFooterPokerSite] Deleting poker site...');
  console.log('🗑️ [deleteFooterPokerSite] Site ID:', id);

  try {
    // Soft delete the site
    const { error: deleteError } = await supabase
      .from('footer_poker_sites')
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (deleteError) {
      console.error('❌ [deleteFooterPokerSite] Error deleting site:', deleteError);
      return { success: false, error: deleteError };
    }

    console.log('✅ [deleteFooterPokerSite] Site soft-deleted successfully');

    // Reorganize display_order for remaining sites
    console.log('🔄 [deleteFooterPokerSite] Reorganizing display_order...');
    
    const { data: remainingSites, error: fetchError } = await supabase
      .from('footer_poker_sites')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (fetchError) {
      console.error('❌ [deleteFooterPokerSite] Error fetching remaining sites:', fetchError);
      return { success: false, error: fetchError };
    }

    // Update display_order for all remaining sites
    if (remainingSites && remainingSites.length > 0) {
      const updatePromises = remainingSites.map((site, index) => {
        const newOrder = index + 1;
        console.log(`🔄 [deleteFooterPokerSite] Updating site ${site.id}: order ${site.display_order} → ${newOrder}`);
        
        return supabase
          .from('footer_poker_sites')
          .update({ 
            display_order: newOrder,
            updated_at: new Date().toISOString()
          })
          .eq('id', site.id);
      });

      await Promise.all(updatePromises);
      console.log('✅ [deleteFooterPokerSite] Display order reorganized successfully');
    }

    return { success: true, error: null };
  } catch (err) {
    console.error('❌ [deleteFooterPokerSite] Unexpected error:', err);
    return { success: false, error: err };
  }
}

// ============================================
// QUICK LINKS FUNCTIONS
// ============================================

/**
 * Get all active footer quick links
 * @returns Array of quick links
 */
export async function getFooterQuickLinks() {
  console.log('🔍 [getFooterQuickLinks] Fetching footer quick links...');
  
  try {
    const { data, error } = await supabase
      .from('footer_quick_links')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('❌ [getFooterQuickLinks] Error:', error);
      return { data: null, error };
    }

    console.log(`✅ [getFooterQuickLinks] Success: ${data?.length || 0} quick links loaded`);
    return { data, error: null };
  } catch (err) {
    console.error('❌ [getFooterQuickLinks] Unexpected error:', err);
    return { data: null, error: err };
  }
}

/**
 * Update footer quick links
 * @param links Array of links to update/create
 */
export async function updateFooterQuickLinks(
  links: Array<{
    id?: string;
    link_text: string;
    link_url: string;
    display_order: number;
  }>
) {
  console.log('💾 [updateFooterQuickLinks] Updating footer quick links...');
  console.log('💾 [updateFooterQuickLinks] Links to update:', links.length);

  try {
    // Separate existing vs new
    const existingLinks = links.filter(l => l.id && !l.id.startsWith('temp-'));
    const newLinks = links.filter(l => !l.id || l.id.startsWith('temp-'));

    // Update existing links
    if (existingLinks.length > 0) {
      const updatePromises = existingLinks.map(async (link) => {
        console.log(`💾 [updateFooterQuickLinks] Updating link ${link.id}`);
        
        const { data, error } = await supabase
          .from('footer_quick_links')
          .update({
            link_text: link.link_text.trim(),
            link_url: link.link_url.trim(),
            display_order: link.display_order,
            updated_at: new Date().toISOString()
          })
          .eq('id', link.id)
          .select();

        if (error) {
          console.error(`❌ [updateFooterQuickLinks] Error updating link ${link.id}:`, error);
          throw error;
        }

        return data;
      });

      await Promise.all(updatePromises);
    }

    // Insert new links
    if (newLinks.length > 0) {
      for (const link of newLinks) {
        console.log(`➕ [updateFooterQuickLinks] Adding new link: ${link.link_text}`);
        const { error } = await addFooterQuickLink(link.link_text, link.link_url, link.display_order);
        
        if (error) {
          throw error;
        }
      }
    }
    
    console.log('✅ [updateFooterQuickLinks] All links updated successfully');
    return { success: true, error: null };
  } catch (err) {
    console.error('❌ [updateFooterQuickLinks] Unexpected error:', err);
    return { success: false, error: err };
  }
}

/**
 * Add a new footer quick link
 * @param link_text Link text
 * @param link_url Link URL
 * @param display_order Optional display order
 */
export async function addFooterQuickLink(link_text: string, link_url: string, display_order?: number) {
  console.log('➕ [addFooterQuickLink] Adding new quick link...');
  console.log('➕ [addFooterQuickLink] Text:', link_text);
  console.log('➕ [addFooterQuickLink] URL:', link_url);
  console.log('➕ [addFooterQuickLink] Display order:', display_order || 'auto');

  try {
    // Get next display_order if not provided
    let nextOrder = display_order;
    if (!nextOrder) {
      const { data: links } = await supabase
        .from('footer_quick_links')
        .select('id')
        .eq('is_active', true);
      
      nextOrder = (links?.length || 0) + 1;
    }

    console.log(`📊 [addFooterQuickLink] Using display_order: ${nextOrder}`);

    // Insert new link
    const { data, error } = await supabase
      .from('footer_quick_links')
      .insert({
        link_text: link_text.trim(),
        link_url: link_url.trim(),
        display_order: nextOrder,
        is_active: true
      })
      .select()
      .single();

    if (error) {
      console.error('❌ [addFooterQuickLink] Error inserting link:', error);
      return { data: null, error };
    }

    console.log('✅ [addFooterQuickLink] Link added successfully:', data.id);
    return { data, error: null };
  } catch (err) {
    console.error('❌ [addFooterQuickLink] Unexpected error:', err);
    return { data: null, error: err };
  }
}

/**
 * Delete a footer quick link (soft delete)
 * @param id Link ID to delete
 */
export async function deleteFooterQuickLink(id: string) {
  console.log('🗑️ [deleteFooterQuickLink] Deleting quick link...');
  console.log('🗑️ [deleteFooterQuickLink] Link ID:', id);

  try {
    // Soft delete the link
    const { error: deleteError } = await supabase
      .from('footer_quick_links')
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (deleteError) {
      console.error('❌ [deleteFooterQuickLink] Error deleting link:', deleteError);
      return { success: false, error: deleteError };
    }

    console.log('✅ [deleteFooterQuickLink] Link soft-deleted successfully');

    // Reorganize display_order for remaining links
    console.log('🔄 [deleteFooterQuickLink] Reorganizing display_order...');
    
    const { data: remainingLinks, error: fetchError } = await supabase
      .from('footer_quick_links')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (fetchError) {
      console.error('❌ [deleteFooterQuickLink] Error fetching remaining links:', fetchError);
      return { success: false, error: fetchError };
    }

    // Update display_order for all remaining links
    if (remainingLinks && remainingLinks.length > 0) {
      const updatePromises = remainingLinks.map((link, index) => {
        const newOrder = index + 1;
        console.log(`🔄 [deleteFooterQuickLink] Updating link ${link.id}: order ${link.display_order} → ${newOrder}`);
        
        return supabase
          .from('footer_quick_links')
          .update({ 
            display_order: newOrder,
            updated_at: new Date().toISOString()
          })
          .eq('id', link.id);
      });

      await Promise.all(updatePromises);
      console.log('✅ [deleteFooterQuickLink] Display order reorganized successfully');
    }

    return { success: true, error: null };
  } catch (err) {
    console.error('❌ [deleteFooterQuickLink] Unexpected error:', err);
    return { success: false, error: err };
  }
}

