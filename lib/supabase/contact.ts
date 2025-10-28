/**
 * Contact Links Management - Supabase Operations
 * 
 * This module handles all database operations for Contact Links.
 * It provides functions to fetch and update contact platform URLs.
 */

import { supabase } from './client';

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface ContactLink {
  id: string;
  platform: 'whatsapp' | 'discord' | 'telegram';
  label: string;
  url: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ============================================
// CONTACT LINKS - GET
// ============================================

/**
 * Fetch all active contact links ordered by display_order
 * @returns Array of contact links or empty array on error
 */
export async function getContactLinks(): Promise<{ data: ContactLink[] | null; error: unknown }> {
  try {
    console.log('🔧 [getContactLinks] Fetching contact links...');
    
    const { data, error } = await supabase
      .from('contact_links')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('❌ [getContactLinks] Error:', error);
      return { data: null, error };
    }
    
    console.log('✅ [getContactLinks] Success:', data?.length, 'links found');
    return { data, error: null };
  } catch (error) {
    console.error('❌ [getContactLinks] Failed to fetch contact links:', error);
    return { data: null, error };
  }
}

// ============================================
// CONTACT LINKS - UPDATE
// ============================================

/**
 * Update a specific contact link URL
 * @param id - Contact link ID
 * @param url - New URL for the platform
 * @returns Updated contact link or null on error
 */
export async function updateContactLink(
  id: string,
  url: string
): Promise<{ data: ContactLink | null; error: unknown }> {
  try {
    console.log('🔧 [updateContactLink] Updating link:', id, url);
    
    const { data, error } = await supabase
      .from('contact_links')
      .update({
        url: url,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('❌ [updateContactLink] Error:', error);
      return { data: null, error };
    }
    
    console.log('✅ [updateContactLink] Success!');
    return { data, error: null };
  } catch (error) {
    console.error('❌ [updateContactLink] Failed to update link:', error);
    return { data: null, error };
  }
}

