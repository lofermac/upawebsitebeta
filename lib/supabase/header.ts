import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type Definition
export interface HeaderNavigation {
  id: string;
  button_text: string;
  button_url: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Get all active header navigation buttons ordered by display_order
 * @returns Array of active navigation buttons (max 6)
 */
export async function getHeaderNavigation() {
  console.log('🔍 [getHeaderNavigation] Fetching header navigation buttons...');
  
  try {
    const { data, error } = await supabase
      .from('header_navigation')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true })
      .limit(6);

    if (error) {
      console.error('❌ [getHeaderNavigation] Error:', error);
      return { data: null, error };
    }

    console.log(`✅ [getHeaderNavigation] Success: ${data?.length || 0} buttons loaded`);
    return { data, error: null };
  } catch (err) {
    console.error('❌ [getHeaderNavigation] Unexpected error:', err);
    return { data: null, error: err };
  }
}

/**
 * Update multiple header navigation buttons
 * @param buttons Array of buttons to update with id, button_text, button_url, display_order
 */
export async function updateHeaderNavigation(
  buttons: Array<{
    id: string;
    button_text: string;
    button_url: string;
    display_order: number;
  }>
) {
  console.log('💾 [updateHeaderNavigation] Updating header navigation buttons...');
  console.log('💾 [updateHeaderNavigation] Buttons to update:', buttons.length);

  try {
    // Update each button individually
    const updatePromises = buttons.map(async (button) => {
      console.log(`💾 [updateHeaderNavigation] Updating button ${button.id}: "${button.button_text}"`);
      
      const { data, error } = await supabase
        .from('header_navigation')
        .update({
          button_text: button.button_text.trim(),
          button_url: button.button_url.trim(),
          display_order: button.display_order,
          updated_at: new Date().toISOString()
        })
        .eq('id', button.id)
        .select();

      if (error) {
        console.error(`❌ [updateHeaderNavigation] Error updating button ${button.id}:`, error);
        throw error;
      }

      return data;
    });

    await Promise.all(updatePromises);
    
    console.log('✅ [updateHeaderNavigation] All buttons updated successfully');
    return { success: true, error: null };
  } catch (err) {
    console.error('❌ [updateHeaderNavigation] Unexpected error:', err);
    return { success: false, error: err };
  }
}

/**
 * Add a new header navigation button
 * @param button_text Text to display on the button
 * @param button_url URL the button should link to
 * @param display_order Optional display order (if not provided, will calculate automatically)
 */
export async function addHeaderButton(button_text: string, button_url: string, display_order?: number) {
  console.log('➕ [addHeaderButton] Adding new header button...');
  console.log('➕ [addHeaderButton] Text:', button_text);
  console.log('➕ [addHeaderButton] URL:', button_url);
  console.log('➕ [addHeaderButton] Display order:', display_order || 'auto');

  try {
    // Check how many active buttons exist
    const { data: existingButtons, error: countError } = await supabase
      .from('header_navigation')
      .select('id')
      .eq('is_active', true);

    if (countError) {
      console.error('❌ [addHeaderButton] Error checking button count:', countError);
      return { data: null, error: countError };
    }

    const currentCount = existingButtons?.length || 0;
    console.log(`📊 [addHeaderButton] Current active buttons: ${currentCount}/6`);

    // Validate maximum 6 buttons
    if (currentCount >= 6) {
      console.warn('⚠️ [addHeaderButton] Maximum 6 buttons reached');
      return { 
        data: null, 
        error: { message: 'Maximum 6 buttons allowed. Please delete a button before adding a new one.' } 
      };
    }

    // Get the next display_order (use provided or calculate)
    const nextOrder = display_order || (currentCount + 1);
    console.log(`📊 [addHeaderButton] New button will have display_order: ${nextOrder}`);

    // Insert new button
    const { data, error } = await supabase
      .from('header_navigation')
      .insert({
        button_text: button_text.trim(),
        button_url: button_url.trim(),
        display_order: nextOrder,
        is_active: true
      })
      .select()
      .single();

    if (error) {
      console.error('❌ [addHeaderButton] Error inserting button:', error);
      return { data: null, error };
    }

    console.log('✅ [addHeaderButton] Button added successfully:', data.id);
    return { data, error: null };
  } catch (err) {
    console.error('❌ [addHeaderButton] Unexpected error:', err);
    return { data: null, error: err };
  }
}

/**
 * Delete a header navigation button (soft delete)
 * @param id Button ID to delete
 */
export async function deleteHeaderButton(id: string) {
  console.log('🗑️ [deleteHeaderButton] Deleting header button...');
  console.log('🗑️ [deleteHeaderButton] Button ID:', id);

  try {
    // Get the button's display_order before deletion
    const { data: buttonToDelete, error: fetchError } = await supabase
      .from('header_navigation')
      .select('display_order')
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error('❌ [deleteHeaderButton] Error fetching button:', fetchError);
      return { success: false, error: fetchError };
    }

    const deletedOrder = buttonToDelete.display_order;
    console.log('🗑️ [deleteHeaderButton] Button display_order:', deletedOrder);

    // Soft delete the button
    const { error: deleteError } = await supabase
      .from('header_navigation')
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (deleteError) {
      console.error('❌ [deleteHeaderButton] Error deleting button:', deleteError);
      return { success: false, error: deleteError };
    }

    console.log('✅ [deleteHeaderButton] Button soft-deleted successfully');

    // Reorganize display_order for remaining buttons
    console.log('🔄 [deleteHeaderButton] Reorganizing display_order...');
    
    const { data: remainingButtons, error: fetchRemainingError } = await supabase
      .from('header_navigation')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (fetchRemainingError) {
      console.error('❌ [deleteHeaderButton] Error fetching remaining buttons:', fetchRemainingError);
      return { success: false, error: fetchRemainingError };
    }

    // Update display_order for all remaining buttons
    if (remainingButtons && remainingButtons.length > 0) {
      const updatePromises = remainingButtons.map((button, index) => {
        const newOrder = index + 1;
        console.log(`🔄 [deleteHeaderButton] Updating button ${button.id}: order ${button.display_order} → ${newOrder}`);
        
        return supabase
          .from('header_navigation')
          .update({ 
            display_order: newOrder,
            updated_at: new Date().toISOString()
          })
          .eq('id', button.id);
      });

      await Promise.all(updatePromises);
      console.log('✅ [deleteHeaderButton] Display order reorganized successfully');
    }

    return { success: true, error: null };
  } catch (err) {
    console.error('❌ [deleteHeaderButton] Unexpected error:', err);
    return { success: false, error: err };
  }
}

