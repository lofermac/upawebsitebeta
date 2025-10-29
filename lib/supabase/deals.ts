/**
 * SUPABASE DEALS MANAGEMENT
 * 
 * Complete CRUD operations for poker deals
 * Includes logo upload to Supabase Storage
 * 
 * @author Universal Poker
 */

import { supabase } from './client';

// ============================================
// TYPES & INTERFACES
// ============================================

export interface Deal {
  id: number;
  name: string;
  slug: string;
  platform_id: number | null;
  logo_url: string | null;
  logo_alt: string;
  logo_max_height: string;
  title: string;
  main_value: string;
  main_value_second_line: string | null;
  subtitle: string | null;
  primary_color: string; // HEX (ex: #962727)
  glow_color: string; // Tailwind color name (ex: 'red', 'blue')
  claim_offer_url: string;
  learn_more_url: string | null;
  terms: string;
  available_countries: string[]; // Array of ISO 3166-1 alpha-2 codes
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type DealInput = Omit<Deal, 'id' | 'created_at' | 'updated_at'>;
export type DealUpdate = Partial<DealInput>;

// ============================================
// READ OPERATIONS
// ============================================

/**
 * Get all active deals ordered by display_order
 * @returns Array of active deals
 */
export async function getDeals() {
  console.log('📦 [Deals] Fetching all active deals...');
  
  try {
    const { data, error } = await supabase
      .from('deals')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('❌ [Deals] Error fetching deals:', error);
      return { data: null, error };
    }

    console.log(`✅ [Deals] Successfully fetched ${data?.length || 0} deals`);
    return { data, error: null };
  } catch (err) {
    console.error('❌ [Deals] Unexpected error:', err);
    return { data: null, error: err };
  }
}

/**
 * Get all deals (including inactive) for admin panel
 * @returns Array of all deals
 */
export async function getAllDeals() {
  console.log('📦 [Deals] Fetching ALL deals (including inactive)...');
  
  try {
    const { data, error } = await supabase
      .from('deals')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('❌ [Deals] Error fetching all deals:', error);
      return { data: null, error };
    }

    console.log(`✅ [Deals] Successfully fetched ${data?.length || 0} deals`);
    return { data, error: null };
  } catch (err) {
    console.error('❌ [Deals] Unexpected error:', err);
    return { data: null, error: err };
  }
}

/**
 * Get a single deal by ID
 * @param id - Deal ID
 * @returns Single deal or null
 */
export async function getDealById(id: number) {
  console.log(`📦 [Deals] Fetching deal with ID: ${id}...`);
  
  try {
    const { data, error } = await supabase
      .from('deals')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`❌ [Deals] Error fetching deal ${id}:`, error);
      return { data: null, error };
    }

    console.log(`✅ [Deals] Successfully fetched deal: ${data?.name}`);
    return { data, error: null };
  } catch (err) {
    console.error('❌ [Deals] Unexpected error:', err);
    return { data: null, error: err };
  }
}

/**
 * Get a single deal by slug
 * @param slug - Deal slug
 * @returns Single deal or null
 */
export async function getDealBySlug(slug: string) {
  console.log(`📦 [Deals] Fetching deal with slug: ${slug}...`);
  
  try {
    const { data, error } = await supabase
      .from('deals')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error(`❌ [Deals] Error fetching deal ${slug}:`, error);
      return { data: null, error };
    }

    console.log(`✅ [Deals] Successfully fetched deal: ${data?.name}`);
    return { data, error: null };
  } catch (err) {
    console.error('❌ [Deals] Unexpected error:', err);
    return { data: null, error: err };
  }
}

// ============================================
// CREATE OPERATION
// ============================================

/**
 * Generate URL-friendly slug from name
 * @param name - Deal name
 * @returns Slugified string
 */
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special chars
    .replace(/[\s_-]+/g, '-') // Replace spaces/underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Get the next display_order value
 * @returns Next display order number
 */
async function getNextDisplayOrder(): Promise<number> {
  const { data, error } = await supabase
    .from('deals')
    .select('display_order')
    .order('display_order', { ascending: false })
    .limit(1)
    .single();

  if (error || !data) {
    return 1; // Start from 1 if no deals exist
  }

  return data.display_order + 1;
}

/**
 * Create a new deal
 * @param dealData - Deal data (without id, timestamps)
 * @returns Created deal
 */
export async function createDeal(dealData: Partial<DealInput>) {
  console.log('📦 [Deals] Creating new deal:', dealData.name);
  
  try {
    // Validate required fields
    const requiredFields = ['name', 'title', 'main_value', 'primary_color', 'glow_color', 'claim_offer_url', 'terms'];
    const missingFields = requiredFields.filter(field => !dealData[field as keyof DealInput]);
    
    if (missingFields.length > 0) {
      const error = `Missing required fields: ${missingFields.join(', ')}`;
      console.error('❌ [Deals] Validation error:', error);
      return { data: null, error: { message: error } };
    }

    // Generate slug if not provided
    const slug = dealData.slug || generateSlug(dealData.name!);
    
    // Get next display_order if not provided
    const display_order = dealData.display_order ?? await getNextDisplayOrder();

    // Set defaults
    const newDeal: DealInput = {
      name: dealData.name!,
      slug,
      platform_id: dealData.platform_id || null,
      logo_url: dealData.logo_url || null,
      logo_alt: dealData.logo_alt || `${dealData.name} Logo`,
      logo_max_height: dealData.logo_max_height || 'max-h-14',
      title: dealData.title!,
      main_value: dealData.main_value!,
      main_value_second_line: dealData.main_value_second_line || null,
      subtitle: dealData.subtitle || null,
      primary_color: dealData.primary_color!,
      glow_color: dealData.glow_color!,
      claim_offer_url: dealData.claim_offer_url!,
      learn_more_url: dealData.learn_more_url || null,
      terms: dealData.terms!,
      available_countries: dealData.available_countries || [],
      display_order,
      is_active: dealData.is_active ?? true,
    };

    const { data, error } = await supabase
      .from('deals')
      .insert([newDeal])
      .select()
      .single();

    if (error) {
      console.error('❌ [Deals] Error creating deal:', error);
      return { data: null, error };
    }

    console.log(`✅ [Deals] Successfully created deal: ${data.name} (ID: ${data.id})`);
    return { data, error: null };
  } catch (err) {
    console.error('❌ [Deals] Unexpected error:', err);
    return { data: null, error: err };
  }
}

// ============================================
// UPDATE OPERATION
// ============================================

/**
 * Update an existing deal
 * @param id - Deal ID
 * @param dealData - Partial deal data to update
 * @returns Updated deal
 */
export async function updateDeal(id: number, dealData: DealUpdate) {
  console.log(`📦 [Deals] Updating deal ID ${id}:`, Object.keys(dealData));
  
  try {
    const { data, error } = await supabase
      .from('deals')
      .update(dealData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error(`❌ [Deals] Error updating deal ${id}:`, error);
      return { data: null, error };
    }

    console.log(`✅ [Deals] Successfully updated deal: ${data.name}`);
    return { data, error: null };
  } catch (err) {
    console.error('❌ [Deals] Unexpected error:', err);
    return { data: null, error: err };
  }
}

// ============================================
// DELETE OPERATION
// ============================================

/**
 * Soft delete a deal (set is_active = false)
 * @param id - Deal ID
 * @returns Success status
 */
export async function deleteDeal(id: number) {
  console.log(`📦 [Deals] Soft deleting deal ID ${id}...`);
  
  try {
    const { data, error } = await supabase
      .from('deals')
      .update({ is_active: false })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error(`❌ [Deals] Error deleting deal ${id}:`, error);
      return { data: null, error };
    }

    console.log(`✅ [Deals] Successfully deleted deal: ${data.name}`);
    return { data, error: null };
  } catch (err) {
    console.error('❌ [Deals] Unexpected error:', err);
    return { data: null, error: err };
  }
}

/**
 * Hard delete a deal (permanent removal)
 * @param id - Deal ID
 * @returns Success status
 */
export async function hardDeleteDeal(id: number) {
  console.log(`📦 [Deals] HARD deleting deal ID ${id}...`);
  
  try {
    const { error } = await supabase
      .from('deals')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`❌ [Deals] Error hard deleting deal ${id}:`, error);
      return { data: null, error };
    }

    console.log(`✅ [Deals] Successfully hard deleted deal ID ${id}`);
    return { data: true, error: null };
  } catch (err) {
    console.error('❌ [Deals] Unexpected error:', err);
    return { data: null, error: err };
  }
}

// ============================================
// REORDER OPERATION
// ============================================

/**
 * Update display order for multiple deals (batch update)
 * @param dealsOrder - Array of {id, display_order}
 * @returns Success status
 */
export async function updateDealsOrder(dealsOrder: Array<{ id: number; display_order: number }>) {
  console.log(`📦 [Deals] Updating display order for ${dealsOrder.length} deals...`);
  
  try {
    // Batch update each deal's display_order
    const updates = dealsOrder.map(({ id, display_order }) =>
      supabase
        .from('deals')
        .update({ display_order })
        .eq('id', id)
    );

    const results = await Promise.all(updates);
    
    // Check for errors
    const errors = results.filter(result => result.error);
    if (errors.length > 0) {
      console.error('❌ [Deals] Error updating order:', errors);
      return { data: null, error: errors[0].error };
    }

    console.log('✅ [Deals] Successfully updated display order');
    return { data: true, error: null };
  } catch (err) {
    console.error('❌ [Deals] Unexpected error:', err);
    return { data: null, error: err };
  }
}

// ============================================
// LOGO UPLOAD
// ============================================

/**
 * Upload deal logo to Supabase Storage
 * @param file - Image file
 * @param dealId - Deal ID (optional, for naming)
 * @returns Public URL of uploaded logo
 */
export async function uploadDealLogo(file: File, dealId?: number) {
  console.log(`📦 [Deals] Uploading logo for deal ${dealId || 'new'}...`);
  
  try {
    // Generate unique filename
    const timestamp = Date.now();
    const fileExt = file.name.split('.').pop();
    const fileName = dealId 
      ? `deal-${dealId}-${timestamp}.${fileExt}`
      : `temp-${timestamp}.${fileExt}`;

    // Upload to deal-logos bucket
    const { error: uploadError } = await supabase.storage
      .from('deal-logos')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      console.error('❌ [Deals] Error uploading logo:', uploadError);
      return { data: null, error: uploadError };
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('deal-logos')
      .getPublicUrl(fileName);

    console.log('✅ [Deals] Successfully uploaded logo:', urlData.publicUrl);
    return { data: { url: urlData.publicUrl, path: fileName }, error: null };
  } catch (err) {
    console.error('❌ [Deals] Unexpected error:', err);
    return { data: null, error: err };
  }
}

/**
 * Delete logo from Supabase Storage
 * @param logoPath - Path to logo file (from logo_url)
 * @returns Success status
 */
export async function deleteDealLogo(logoPath: string) {
  console.log(`📦 [Deals] Deleting logo: ${logoPath}...`);
  
  try {
    // Extract filename from URL if it's a full URL
    let fileName = logoPath;
    if (logoPath.includes('/deal-logos/')) {
      fileName = logoPath.split('/deal-logos/')[1];
    }

    const { error } = await supabase.storage
      .from('deal-logos')
      .remove([fileName]);

    if (error) {
      console.error('❌ [Deals] Error deleting logo:', error);
      return { data: null, error };
    }

    console.log('✅ [Deals] Successfully deleted logo');
    return { data: true, error: null };
  } catch (err) {
    console.error('❌ [Deals] Unexpected error:', err);
    return { data: null, error: err };
  }
}

