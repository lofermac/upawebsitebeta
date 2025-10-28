/**
 * Team Members Management - Supabase Operations
 * 
 * This module handles all database operations for the Team Members section.
 * It provides functions to fetch, update team members and upload photos.
 */

import { supabase } from './client';

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo_url: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ============================================
// TEAM MEMBERS - GET
// ============================================

/**
 * Fetch all active team members ordered by display_order
 * @returns Array of team members or empty array on error
 */
export async function getTeamMembers(): Promise<{ data: TeamMember[] | null; error: any }> {
  try {
    console.log('🔧 [getTeamMembers] Fetching team members...');
    
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('❌ [getTeamMembers] Error:', error);
      return { data: null, error };
    }
    
    console.log('✅ [getTeamMembers] Success:', data?.length, 'members found');
    return { data, error: null };
  } catch (error) {
    console.error('❌ [getTeamMembers] Failed to fetch team members:', error);
    return { data: null, error };
  }
}

// ============================================
// TEAM MEMBERS - UPDATE
// ============================================

/**
 * Update a specific team member
 * @param id - Team member ID
 * @param memberData - Partial team member data to update
 * @returns Updated team member or null on error
 */
export async function updateTeamMember(
  id: string,
  memberData: {
    name?: string;
    role?: string;
    bio?: string;
    photo_url?: string | null;
  }
): Promise<{ data: TeamMember | null; error: any }> {
  try {
    console.log('🔧 [updateTeamMember] Updating member:', id, memberData);
    
    const updateData = {
      ...memberData,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('team_members')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('❌ [updateTeamMember] Error:', error);
      return { data: null, error };
    }
    
    console.log('✅ [updateTeamMember] Success!');
    return { data, error: null };
  } catch (error) {
    console.error('❌ [updateTeamMember] Failed to update member:', error);
    return { data: null, error };
  }
}

// ============================================
// TEAM MEMBERS - UPDATE ORDER
// ============================================

/**
 * Update display order for multiple team members after drag & drop
 * @param members - Array of members with their new display_order
 * @returns Success boolean
 */
export async function updateTeamMembersOrder(
  members: Array<{ id: string; display_order: number }>
): Promise<{ success: boolean; error: any }> {
  try {
    console.log('🔧 [updateTeamMembersOrder] Updating order for', members.length, 'members');
    
    // Update each member's display_order
    const updates = members.map((member) =>
      supabase
        .from('team_members')
        .update({ 
          display_order: member.display_order,
          updated_at: new Date().toISOString(),
        })
        .eq('id', member.id)
    );

    const results = await Promise.all(updates);
    
    // Check if any updates failed
    const hasError = results.some((result) => result.error);
    if (hasError) {
      const errors = results.filter((r) => r.error).map((r) => r.error);
      console.error('❌ [updateTeamMembersOrder] Some updates failed:', errors);
      return { success: false, error: errors[0] };
    }
    
    console.log('✅ [updateTeamMembersOrder] All updates successful!');
    return { success: true, error: null };
  } catch (error) {
    console.error('❌ [updateTeamMembersOrder] Failed to update order:', error);
    return { success: false, error };
  }
}

// ============================================
// TEAM PHOTO UPLOAD
// ============================================

/**
 * Upload team member photo to Supabase Storage
 * @param file - The image file to upload
 * @param memberId - Team member ID
 * @param oldPhotoUrl - Previous photo URL to delete (optional)
 * @returns Public URL of the uploaded image
 */
export async function uploadTeamPhoto(
  file: File,
  memberId: string,
  oldPhotoUrl: string | null = null
): Promise<{ url: string | null; error: any }> {
  try {
    console.log('🔧 [uploadTeamPhoto] 📸 Starting upload...');
    console.log('🔧 [uploadTeamPhoto] 📁 File:', {
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      type: file.type
    });
    console.log('🔧 [uploadTeamPhoto] 👤 Member ID:', memberId);
    
    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      console.error('❌ [uploadTeamPhoto] File too large:', file.size);
      return { url: null, error: new Error('Image size must be less than 5MB') };
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      console.error('❌ [uploadTeamPhoto] Invalid type:', file.type);
      return { url: null, error: new Error('Only JPG, PNG and WEBP images are allowed') };
    }
    
    console.log('✅ [uploadTeamPhoto] Validation OK');

    // Delete old photo if exists
    if (oldPhotoUrl && oldPhotoUrl.includes('team-photos')) {
      console.log('🔧 [uploadTeamPhoto] 🗑️ Deleting old photo...');
      const oldFileName = oldPhotoUrl.split('/').pop();
      if (oldFileName) {
        await supabase.storage
          .from('team-photos')
          .remove([oldFileName]);
        console.log('✅ [uploadTeamPhoto] Old photo deleted');
      }
    }

    // Generate unique filename
    const timestamp = Date.now();
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const fileName = `${memberId}-${timestamp}.${fileExt}`;
    console.log('🔧 [uploadTeamPhoto] 📝 Filename:', fileName);

    // Upload to Supabase Storage
    console.log('🔧 [uploadTeamPhoto] ⬆️ Uploading to Supabase Storage...');
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('team-photos')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      console.error('❌ [uploadTeamPhoto] Upload error:', uploadError);
      return { url: null, error: uploadError };
    }
    
    console.log('✅ [uploadTeamPhoto] Upload successful!', uploadData);

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from('team-photos').getPublicUrl(fileName);

    console.log('✅ [uploadTeamPhoto] 🌐 Public URL:', publicUrl);
    return { url: publicUrl, error: null };
  } catch (error) {
    console.error('❌ [uploadTeamPhoto] Error uploading photo:', error);
    return { url: null, error };
  }
}

/**
 * Delete team photo from Supabase Storage
 * @param imageUrl - The full URL of the image to delete
 * @returns boolean indicating success
 */
export async function deleteTeamPhoto(imageUrl: string): Promise<boolean> {
  try {
    console.log('🔧 [deleteTeamPhoto] Deleting photo:', imageUrl);
    
    // Extract filename from URL
    if (!imageUrl.includes('team-photos')) {
      console.log('⚠️ [deleteTeamPhoto] Not a storage URL, skipping');
      return false; // Not a storage URL
    }

    const fileName = imageUrl.split('/').pop();
    if (!fileName) {
      console.error('❌ [deleteTeamPhoto] Could not extract filename');
      return false;
    }

    const { error } = await supabase.storage
      .from('team-photos')
      .remove([fileName]);

    if (error) {
      console.error('❌ [deleteTeamPhoto] Error:', error);
      throw error;
    }
    
    console.log('✅ [deleteTeamPhoto] Photo deleted successfully');
    return true;
  } catch (error) {
    console.error('❌ [deleteTeamPhoto] Failed to delete photo:', error);
    return false;
  }
}

