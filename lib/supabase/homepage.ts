/**
 * Homepage Content Management - Supabase Operations
 * 
 * This module handles all database operations for the Homepage Editor.
 * It provides functions to fetch and update homepage content.
 */

import { supabase } from './client';

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface HeroSection {
  id?: string;
  title: string;
  subtitle: string;
  button_text: string;
  button_link: string;
  is_active?: boolean;
  updated_at?: string;
}

export interface StatItem {
  id?: string;
  label: string;
  value: string;
  icon: string;
  display_order: number;
  is_active: boolean;
  updated_at?: string;
}

export interface CashbackSection {
  id?: string;
  section_title: string;
  amount: number;
  display_text: string;
  description: string;
  is_active?: boolean;
  updated_at?: string;
}

export interface HowItWorksStep {
  id?: string;
  step_number: number;
  title: string;
  description: string;
  display_order: number;
  is_active: boolean;
  updated_at?: string;
}

export interface Testimonial {
  id?: string;
  author_name: string;
  author_role: string;
  testimonial_text: string;
  author_photo_url: string;
  display_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface FAQ {
  id?: string;
  question: string;
  answer: string;
  display_order: number;
  is_active: boolean;
  updated_at?: string;
}

// ============================================
// HERO SECTION
// ============================================

export async function getHeroSection(): Promise<HeroSection | null> {
  try {
    const { data, error } = await supabase
      .from('home_hero')
      .select('*')
      .eq('is_active', true)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching hero section:', error);
    return null;
  }
}

export async function updateHeroSection(heroData: HeroSection): Promise<boolean> {
  try {
    // Get the first active hero record
    const { data: existing } = await supabase
      .from('home_hero')
      .select('id')
      .eq('is_active', true)
      .single();

    if (!existing) {
      throw new Error('No active hero section found');
    }

    const { error } = await supabase
      .from('home_hero')
      .update({
        title: heroData.title,
        subtitle: heroData.subtitle,
        button_text: heroData.button_text,
        button_link: heroData.button_link,
      })
      .eq('id', existing.id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating hero section:', error);
    return false;
  }
}

// ============================================
// STATISTICS SECTION
// ============================================

export async function getStats(): Promise<StatItem[]> {
  try {
    const { data, error } = await supabase
      .from('home_stats')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching stats:', error);
    return [];
  }
}

export async function updateStats(stats: StatItem[]): Promise<boolean> {
  try {
    // Update each stat
    const updates = stats.map(async (stat) => {
      if (stat.id) {
        // Update existing stat
        return supabase
          .from('home_stats')
          .update({
            label: stat.label,
            value: stat.value,
            icon: stat.icon,
            display_order: stat.display_order,
            is_active: stat.is_active,
          })
          .eq('id', stat.id);
      } else {
        // Insert new stat
        return supabase
          .from('home_stats')
          .insert({
            label: stat.label,
            value: stat.value,
            icon: stat.icon,
            display_order: stat.display_order,
            is_active: stat.is_active,
          });
      }
    });

    await Promise.all(updates);
    return true;
  } catch (error) {
    console.error('Error updating stats:', error);
    return false;
  }
}

// ============================================
// CASHBACK SECTION
// ============================================

export async function getCashbackSection(): Promise<CashbackSection | null> {
  try {
    const { data, error } = await supabase
      .from('home_cashback')
      .select('*')
      .eq('is_active', true)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching cashback section:', error);
    return null;
  }
}

export async function updateCashbackSection(cashbackData: CashbackSection): Promise<boolean> {
  try {
    const { data: existing } = await supabase
      .from('home_cashback')
      .select('id')
      .eq('is_active', true)
      .single();

    if (!existing) {
      throw new Error('No active cashback section found');
    }

    const { error } = await supabase
      .from('home_cashback')
      .update({
        section_title: cashbackData.section_title,
        amount: cashbackData.amount,
        display_text: cashbackData.display_text,
        description: cashbackData.description,
      })
      .eq('id', existing.id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating cashback section:', error);
    return false;
  }
}

// ============================================
// HOW IT WORKS SECTION
// ============================================

export async function getHowItWorksSteps(): Promise<HowItWorksStep[]> {
  try {
    const { data, error } = await supabase
      .from('home_how_it_works_steps')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching how it works steps:', error);
    return [];
  }
}

export async function updateHowItWorksSteps(steps: HowItWorksStep[]): Promise<boolean> {
  try {
    const updates = steps.map(async (step) => {
      if (step.id) {
        return supabase
          .from('home_how_it_works_steps')
          .update({
            step_number: step.step_number,
            title: step.title,
            description: step.description,
            display_order: step.display_order,
            is_active: step.is_active,
          })
          .eq('id', step.id);
      } else {
        return supabase
          .from('home_how_it_works_steps')
          .insert({
            step_number: step.step_number,
            title: step.title,
            description: step.description,
            display_order: step.display_order,
            is_active: step.is_active,
          });
      }
    });

    await Promise.all(updates);
    return true;
  } catch (error) {
    console.error('Error updating how it works steps:', error);
    return false;
  }
}

// ============================================
// TESTIMONIALS SECTION
// ============================================

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

export async function createTestimonial(testimonial: Testimonial): Promise<boolean> {
  try {
    console.log('🔧 [createTestimonial] Chamado com:', testimonial);
    
    const insertData = {
      author_name: testimonial.author_name,
      author_role: testimonial.author_role,
      testimonial_text: testimonial.testimonial_text,
      author_photo_url: testimonial.author_photo_url,
      display_order: testimonial.display_order,
      is_active: testimonial.is_active,
    };
    
    console.log('🔧 [createTestimonial] Dados do insert:', insertData);
    
    const { data, error } = await supabase
      .from('testimonials')
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error('❌ [createTestimonial] Erro no insert:', error);
      throw error;
    }
    
    console.log('✅ [createTestimonial] Insert bem-sucedido:', data);
    return true;
  } catch (error) {
    console.error('❌ [createTestimonial] Erro geral:', error);
    return false;
  }
}

export async function updateTestimonial(testimonial: Testimonial): Promise<boolean> {
  try {
    console.log('🔧 [updateTestimonial] Chamado com:', {
      id: testimonial.id,
      author_name: testimonial.author_name
    });

    if (!testimonial.id) {
      throw new Error('Testimonial ID is required for update');
    }

    const updateData = {
      author_name: testimonial.author_name,
      author_role: testimonial.author_role,
      testimonial_text: testimonial.testimonial_text,
      author_photo_url: testimonial.author_photo_url,
      display_order: testimonial.display_order,
      is_active: testimonial.is_active,
    };

    console.log('🔧 [updateTestimonial] Dados do update:', updateData);

    const { data, error } = await supabase
      .from('testimonials')
      .update(updateData)
      .eq('id', testimonial.id)
      .select();

    if (error) {
      console.error('❌ [updateTestimonial] Erro no update:', error);
      throw error;
    }

    console.log('✅ [updateTestimonial] Update bem-sucedido:', data);
    return true;
  } catch (error) {
    console.error('❌ [updateTestimonial] Erro geral:', error);
    return false;
  }
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  try {
    console.log('🔧 [deleteTestimonial] Chamado com ID:', id);
    
    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('❌ [deleteTestimonial] Erro no delete:', error);
      throw error;
    }
    
    console.log('✅ [deleteTestimonial] Delete bem-sucedido!');
    return true;
  } catch (error) {
    console.error('❌ [deleteTestimonial] Erro geral:', error);
    return false;
  }
}

export async function updateTestimonials(testimonials: Testimonial[]): Promise<boolean> {
  try {
    // Handle creates, updates, and deletes
    const updates = testimonials.map(async (testimonial) => {
      if (testimonial.id && testimonial.id.includes('temp-')) {
        // New testimonial (temporary ID)
        return createTestimonial(testimonial);
      } else if (testimonial.id) {
        // Update existing
        return updateTestimonial(testimonial);
      }
    });

    await Promise.all(updates);
    return true;
  } catch (error) {
    console.error('Error updating testimonials:', error);
    return false;
  }
}

// ============================================
// FAQ SECTION
// ============================================

export async function getFAQs(): Promise<FAQ[]> {
  try {
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return [];
  }
}

export async function createFAQ(faq: FAQ): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('faqs')
      .insert({
        question: faq.question,
        answer: faq.answer,
        display_order: faq.display_order,
        is_active: faq.is_active,
      });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error creating FAQ:', error);
    return false;
  }
}

export async function updateFAQ(faq: FAQ): Promise<boolean> {
  try {
    if (!faq.id) {
      throw new Error('FAQ ID is required for update');
    }

    const { error } = await supabase
      .from('faqs')
      .update({
        question: faq.question,
        answer: faq.answer,
        display_order: faq.display_order,
        is_active: faq.is_active,
      })
      .eq('id', faq.id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating FAQ:', error);
    return false;
  }
}

export async function deleteFAQ(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('faqs')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    return false;
  }
}

export async function updateFAQs(faqs: FAQ[]): Promise<boolean> {
  try {
    const updates = faqs.map(async (faq) => {
      if (faq.id && faq.id.includes('temp-')) {
        // New FAQ (temporary ID)
        return createFAQ(faq);
      } else if (faq.id) {
        // Update existing
        return updateFAQ(faq);
      }
    });

    await Promise.all(updates);
    return true;
  } catch (error) {
    console.error('Error updating FAQs:', error);
    return false;
  }
}

// ============================================
// BULK OPERATIONS
// ============================================

/**
 * Fetch all homepage content at once
 */
export async function getAllHomepageContent() {
  try {
    const [hero, stats, cashback, steps, testimonials, faqs] = await Promise.all([
      getHeroSection(),
      getStats(),
      getCashbackSection(),
      getHowItWorksSteps(),
      getTestimonials(),
      getFAQs(),
    ]);

    return {
      hero,
      stats,
      cashback,
      steps,
      testimonials,
      faqs,
    };
  } catch (error) {
    console.error('Error fetching all homepage content:', error);
    return null;
  }
}

// ============================================
// TESTIMONIAL PHOTO UPLOAD
// ============================================

/**
 * Upload testimonial photo to Supabase Storage
 * @param file - The image file to upload
 * @param testimonialName - Name of the person (used for filename)
 * @returns Public URL of the uploaded image
 */
export async function uploadTestimonialPhoto(
  file: File,
  testimonialName: string
): Promise<string> {
  try {
    console.log('🔧 [uploadTestimonialPhoto] 📸 Iniciando upload...');
    console.log('🔧 [uploadTestimonialPhoto] 📁 Arquivo:', {
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      type: file.type
    });
    console.log('🔧 [uploadTestimonialPhoto] 👤 Testimonial:', testimonialName);
    
    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      console.error('❌ [uploadTestimonialPhoto] Arquivo muito grande:', file.size);
      throw new Error('Image size must be less than 5MB');
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      console.error('❌ [uploadTestimonialPhoto] Tipo inválido:', file.type);
      throw new Error('Only JPG, PNG and WEBP images are allowed');
    }
    
    console.log('✅ [uploadTestimonialPhoto] Validação OK');

    // Generate unique filename
    const timestamp = Date.now();
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const slug = testimonialName
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^a-z0-9]+/g, '-') // Replace special chars with dash
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing dashes

    const fileName = `${slug}-${timestamp}.${fileExt}`;
    console.log('🔧 [uploadTestimonialPhoto] 📝 Nome do arquivo:', fileName);

    // Upload to Supabase Storage
    console.log('🔧 [uploadTestimonialPhoto] ⬆️ Fazendo upload para Supabase Storage...');
    const { data: uploadData, error } = await supabase.storage
      .from('testimonials-photos')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('❌ [uploadTestimonialPhoto] Erro no upload:', error);
      throw error;
    }
    
    console.log('✅ [uploadTestimonialPhoto] Upload bem-sucedido!', uploadData);

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from('testimonials-photos').getPublicUrl(fileName);

    console.log('✅ [uploadTestimonialPhoto] 🌐 URL pública:', publicUrl);
    return publicUrl;
  } catch (error) {
    console.error('Error uploading testimonial photo:', error);
    
    // Provide user-friendly error messages
    if (error instanceof Error) {
      if (error.message?.includes('size')) {
        throw new Error('Image is too large. Maximum size is 5MB.');
      } else if (error.message?.includes('allowed')) {
        throw new Error('Invalid file type. Use JPG, PNG or WEBP.');
      } else if (error.message?.includes('duplicate')) {
        throw new Error('An image with this name already exists. Please try again.');
      } else {
        throw new Error(error.message || 'Failed to upload image. Please try again.');
      }
    }
    throw new Error('Failed to upload image. Please try again.');
  }
}

/**
 * Delete testimonial photo from Supabase Storage
 * @param imageUrl - The full URL of the image to delete
 * @returns boolean indicating success
 */
export async function deleteTestimonialPhoto(imageUrl: string): Promise<boolean> {
  try {
    // Extract filename from URL
    if (!imageUrl.includes('testimonials-photos')) {
      return false; // Not a storage URL
    }

    const fileName = imageUrl.split('/').pop();
    if (!fileName) {
      return false;
    }

    const { error } = await supabase.storage
      .from('testimonials-photos')
      .remove([fileName]);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting testimonial photo:', error);
    return false;
  }
}

