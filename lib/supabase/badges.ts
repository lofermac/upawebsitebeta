import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type Definition
export interface FooterBadge {
  id: string;
  badge_name: string;
  badge_image_url: string;
  external_link: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ============================================
// FOOTER BADGES FUNCTIONS
// ============================================

/**
 * Get all active footer badges
 * @returns Array of badges ordered by display_order
 */
export async function getFooterBadges() {
  console.log('🔍 [getFooterBadges] Fetching footer badges...');
  
  try {
    const { data, error } = await supabase
      .from('footer_badges')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('❌ [getFooterBadges] Error:', error);
      return { data: null, error };
    }

    console.log(`✅ [getFooterBadges] Success: ${data?.length || 0} badges loaded`);
    return { data, error: null };
  } catch (err) {
    console.error('❌ [getFooterBadges] Unexpected error:', err);
    return { data: null, error: err };
  }
}

/**
 * Update footer badges
 * @param badges Array of badges to update/create
 */
export async function updateFooterBadges(
  badges: Array<{
    id?: string;
    badge_name: string;
    badge_image_url: string;
    external_link: string | null;
    display_order: number;
  }>
) {
  console.log('💾 [updateFooterBadges] Updating footer badges...');
  console.log('💾 [updateFooterBadges] Badges to update:', badges.length);

  try {
    // Separate existing vs new
    const existingBadges = badges.filter(b => b.id && !b.id.startsWith('temp-'));
    const newBadges = badges.filter(b => !b.id || b.id.startsWith('temp-'));

    // Update existing badges
    if (existingBadges.length > 0) {
      const updatePromises = existingBadges.map(async (badge) => {
        console.log(`💾 [updateFooterBadges] Updating badge ${badge.id}`);
        
        const { data, error } = await supabase
          .from('footer_badges')
          .update({
            badge_name: badge.badge_name.trim(),
            badge_image_url: badge.badge_image_url.trim(),
            external_link: badge.external_link?.trim() || null,
            display_order: badge.display_order,
            updated_at: new Date().toISOString()
          })
          .eq('id', badge.id)
          .select();

        if (error) {
          console.error(`❌ [updateFooterBadges] Error updating badge ${badge.id}:`, error);
          throw error;
        }

        return data;
      });

      await Promise.all(updatePromises);
    }

    // Insert new badges
    if (newBadges.length > 0) {
      for (const badge of newBadges) {
        console.log(`➕ [updateFooterBadges] Adding new badge: ${badge.badge_name}`);
        const { error } = await addFooterBadge(
          badge.badge_name,
          badge.badge_image_url,
          badge.external_link || undefined,
          badge.display_order
        );
        
        if (error) {
          throw error;
        }
      }
    }
    
    console.log('✅ [updateFooterBadges] All badges updated successfully');
    return { success: true, error: null };
  } catch (err) {
    console.error('❌ [updateFooterBadges] Unexpected error:', err);
    return { success: false, error: err };
  }
}

/**
 * Add a new footer badge
 * @param badge_name Badge name
 * @param badge_image_url Badge image URL
 * @param external_link Optional external link
 * @param display_order Optional display order
 */
export async function addFooterBadge(
  badge_name: string,
  badge_image_url: string,
  external_link?: string,
  display_order?: number
) {
  console.log('➕ [addFooterBadge] Adding new badge...');
  console.log('➕ [addFooterBadge] Name:', badge_name);
  console.log('➕ [addFooterBadge] Image URL:', badge_image_url);
  console.log('➕ [addFooterBadge] External Link:', external_link || 'none');
  console.log('➕ [addFooterBadge] Display order:', display_order || 'auto');

  try {
    // Get next display_order if not provided
    let nextOrder = display_order;
    if (!nextOrder) {
      const { data: badges } = await supabase
        .from('footer_badges')
        .select('id')
        .eq('is_active', true);
      
      nextOrder = (badges?.length || 0) + 1;
    }

    console.log(`📊 [addFooterBadge] Using display_order: ${nextOrder}`);

    // Insert new badge
    const { data, error } = await supabase
      .from('footer_badges')
      .insert({
        badge_name: badge_name.trim(),
        badge_image_url: badge_image_url.trim(),
        external_link: external_link?.trim() || null,
        display_order: nextOrder,
        is_active: true
      })
      .select()
      .single();

    if (error) {
      console.error('❌ [addFooterBadge] Error inserting badge:', error);
      return { data: null, error };
    }

    console.log('✅ [addFooterBadge] Badge added successfully:', data.id);
    return { data, error: null };
  } catch (err) {
    console.error('❌ [addFooterBadge] Unexpected error:', err);
    return { data: null, error: err };
  }
}

/**
 * Delete a footer badge (soft delete)
 * @param id Badge ID to delete
 */
export async function deleteFooterBadge(id: string) {
  console.log('🗑️ [deleteFooterBadge] Deleting badge...');
  console.log('🗑️ [deleteFooterBadge] Badge ID:', id);

  try {
    // Get badge to delete its image
    const { data: badge } = await supabase
      .from('footer_badges')
      .select('badge_image_url')
      .eq('id', id)
      .single();

    // Soft delete the badge
    const { error: deleteError } = await supabase
      .from('footer_badges')
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (deleteError) {
      console.error('❌ [deleteFooterBadge] Error deleting badge:', deleteError);
      return { success: false, error: deleteError };
    }

    console.log('✅ [deleteFooterBadge] Badge soft-deleted successfully');

    // Delete image from storage if it exists
    if (badge?.badge_image_url) {
      try {
        await deleteBadgeImage(badge.badge_image_url);
      } catch (err) {
        console.warn('⚠️ [deleteFooterBadge] Failed to delete image from storage:', err);
        // Continue even if image deletion fails
      }
    }

    // Reorganize display_order for remaining badges
    console.log('🔄 [deleteFooterBadge] Reorganizing display_order...');
    
    const { data: remainingBadges, error: fetchError } = await supabase
      .from('footer_badges')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (fetchError) {
      console.error('❌ [deleteFooterBadge] Error fetching remaining badges:', fetchError);
      return { success: false, error: fetchError };
    }

    // Update display_order for all remaining badges
    if (remainingBadges && remainingBadges.length > 0) {
      const updatePromises = remainingBadges.map((badge, index) => {
        const newOrder = index + 1;
        console.log(`🔄 [deleteFooterBadge] Updating badge ${badge.id}: order ${badge.display_order} → ${newOrder}`);
        
        return supabase
          .from('footer_badges')
          .update({ 
            display_order: newOrder,
            updated_at: new Date().toISOString()
          })
          .eq('id', badge.id);
      });

      await Promise.all(updatePromises);
      console.log('✅ [deleteFooterBadge] Display order reorganized successfully');
    }

    return { success: true, error: null };
  } catch (err) {
    console.error('❌ [deleteFooterBadge] Unexpected error:', err);
    return { success: false, error: err };
  }
}

/**
 * Upload badge image to Supabase Storage
 * @param file File to upload
 * @returns Public URL of uploaded image
 */
export async function uploadBadgeImage(file: File) {
  console.log('📤 [uploadBadgeImage] Uploading badge image...');
  console.log('📤 [uploadBadgeImage] File name:', file.name);
  console.log('📤 [uploadBadgeImage] File size:', file.size);
  console.log('📤 [uploadBadgeImage] File type:', file.type);

  try {
    // Validate file type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      console.error('❌ [uploadBadgeImage] Invalid file type:', file.type);
      return { 
        data: null, 
        error: { message: 'Invalid file type. Please upload PNG, JPG, WEBP, or SVG.' } 
      };
    }

    // Validate file size (max 2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes
    if (file.size > maxSize) {
      console.error('❌ [uploadBadgeImage] File too large:', file.size);
      return { 
        data: null, 
        error: { message: 'File too large. Maximum size is 2MB.' } 
      };
    }

    // Generate unique file name
    const fileExt = file.name.split('.').pop();
    const fileName = `badge-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    
    console.log('📊 [uploadBadgeImage] Generated file name:', fileName);

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('footer-badges')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('❌ [uploadBadgeImage] Error uploading:', error);
      return { data: null, error };
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('footer-badges')
      .getPublicUrl(fileName);

    const publicUrl = urlData.publicUrl;
    console.log('✅ [uploadBadgeImage] Upload successful:', publicUrl);

    return { data: publicUrl, error: null };
  } catch (err) {
    console.error('❌ [uploadBadgeImage] Unexpected error:', err);
    return { data: null, error: err };
  }
}

/**
 * Delete badge image from Supabase Storage
 * @param imageUrl Image URL to delete
 */
export async function deleteBadgeImage(imageUrl: string) {
  console.log('🗑️ [deleteBadgeImage] Deleting badge image...');
  console.log('🗑️ [deleteBadgeImage] Image URL:', imageUrl);

  try {
    // Extract file path from URL
    // URL format: https://{project}.supabase.co/storage/v1/object/public/footer-badges/{fileName}
    const urlParts = imageUrl.split('/footer-badges/');
    if (urlParts.length < 2) {
      console.warn('⚠️ [deleteBadgeImage] Invalid image URL format');
      return { success: false, error: { message: 'Invalid image URL format' } };
    }

    const fileName = urlParts[1];
    console.log('📊 [deleteBadgeImage] Extracted file name:', fileName);

    // Delete from storage
    const { error } = await supabase.storage
      .from('footer-badges')
      .remove([fileName]);

    if (error) {
      console.error('❌ [deleteBadgeImage] Error deleting image:', error);
      return { success: false, error };
    }

    console.log('✅ [deleteBadgeImage] Image deleted successfully');
    return { success: true, error: null };
  } catch (err) {
    console.error('❌ [deleteBadgeImage] Unexpected error:', err);
    return { success: false, error: err };
  }
}

