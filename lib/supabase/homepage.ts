/**
 * Homepage Content Management - Supabase Operations
 * 
 * This module handles all database operations for the Homepage Editor.
 * It provides functions to fetch and update homepage content.
 */

import { supabase } from './client';
import { Deal } from './deals';

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface HeroSection {
  id?: string;
  title: string;
  title_line_2?: string | null;
  subtitle: string;
  button_text: string;
  button_link: string;
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

export interface HomeCashback {
  id: string;
  section_title: string;
  subtitle: string | null;
  description: string | null;
  amount: number;
  created_at?: string;
  updated_at?: string;
}

export interface HomeHowItWorks {
  id: string;
  section_title: string;
  section_subtitle: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface HomeHowItWorksStep {
  id: string;
  step_number: number;
  title: string;
  description: string | null;
  icon: string | null;
  display_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

// Deprecated - use HomeCashback
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
  id: string;
  question: string;
  answer: string;
  display_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface HomeFeaturedDealsCard {
  id: string;
  deal_id: number;
  display_order: number;
  created_at: string;
  updated_at: string;
  deal?: Deal; // Full deal data via JOIN
}

export interface HomeFeaturedDeals {
  id: string;
  section_title: string;
  section_subtitle: string;
  button_text: string;
  button_link: string;
  created_at?: string;
  updated_at?: string;
}

// ============================================
// HERO SECTION
// ============================================

export async function getHeroSection(): Promise<HeroSection | null> {
  try {
    console.log('🔧 [getHeroSection] Fetching hero section...');
    
    const { data, error } = await supabase
      .from('home_hero')
      .select('*')
      .single();

    if (error) {
      console.error('❌ [getHeroSection] Error:', error);
      throw error;
    }
    
    console.log('✅ [getHeroSection] Success:', data);
    console.log('✅ [getHeroSection] Title Line 2:', data?.title_line_2);
    return data;
  } catch (error) {
    console.error('❌ [getHeroSection] Failed to fetch hero section:', error);
    return null;
  }
}

export async function updateHeroSection(heroData: HeroSection): Promise<boolean> {
  try {
    console.log('🔧 [updateHeroSection] Updating hero section...', heroData);
    
    // Get the hero record (there's only one)
    const { data: existing } = await supabase
      .from('home_hero')
      .select('id')
      .single();

    if (!existing) {
      console.error('❌ [updateHeroSection] No hero section found');
      throw new Error('No hero section found');
    }

    const { error } = await supabase
      .from('home_hero')
      .update({
        title: heroData.title,
        title_line_2: heroData.title_line_2,
        subtitle: heroData.subtitle,
        button_text: heroData.button_text,
        button_link: heroData.button_link,
      })
      .eq('id', existing.id);

    if (error) {
      console.error('❌ [updateHeroSection] Error:', error);
      throw error;
    }
    
    console.log('✅ [updateHeroSection] Success!');
    return true;
  } catch (error) {
    console.error('❌ [updateHeroSection] Failed to update hero section:', error);
    return false;
  }
}

// Alternative function names for convenience
export const getHomeHero = getHeroSection;
export const updateHomeHero = updateHeroSection;

// ============================================
// STATISTICS SECTION
// ============================================

export async function getStats(): Promise<StatItem[]> {
  try {
    console.log('🔧 [getStats] Fetching statistics...');
    
    const { data, error } = await supabase
      .from('home_stats')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('❌ [getStats] Error:', error);
      throw error;
    }
    
    console.log('✅ [getStats] Success:', data);
    return data || [];
  } catch (error) {
    console.error('❌ [getStats] Failed to fetch stats:', error);
    return [];
  }
}

export async function updateStats(stats: StatItem[]): Promise<boolean> {
  try {
    console.log('🔧 [updateStats] Updating statistics...', stats);
    
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
    console.log('✅ [updateStats] Success!');
    return true;
  } catch (error) {
    console.error('❌ [updateStats] Failed to update stats:', error);
    return false;
  }
}

// Alternative function names for convenience
export const getHomeStats = getStats;
export const updateHomeStats = updateStats;

// ============================================
// CASHBACK SECTION
// ============================================

export async function getHomeCashback(): Promise<HomeCashback | null> {
  try {
    console.log('🔧 [getHomeCashback] Buscando cashback section...');
    
    const { data, error } = await supabase
      .from('home_cashback')
      .select('*')
      .single();

    if (error) {
      console.error('❌ [getHomeCashback] Erro:', error);
      throw error;
    }
    
    console.log('✅ [getHomeCashback] Sucesso:', data);
    return data as HomeCashback;
  } catch (error) {
    console.error('❌ [getHomeCashback] Failed to fetch cashback:', error);
    return null;
  }
}

export async function updateHomeCashback(data: Partial<HomeCashback>): Promise<HomeCashback | null> {
  try {
    console.log('🔧 [updateHomeCashback] Atualizando cashback...', data);
    
    const { data: existing } = await supabase
      .from('home_cashback')
      .select('id')
      .single();
    
    if (!existing) {
      console.error('❌ [updateHomeCashback] Cashback record not found');
      throw new Error('Cashback record not found');
    }
    
    const { data: result, error } = await supabase
      .from('home_cashback')
      .update({
        section_title: data.section_title,
        subtitle: data.subtitle,
        description: data.description,
        amount: data.amount,
        updated_at: new Date().toISOString()
      })
      .eq('id', existing.id)
      .select()
      .single();
    
    if (error) {
      console.error('❌ [updateHomeCashback] Erro:', error);
      throw error;
    }
    
    console.log('✅ [updateHomeCashback] Sucesso:', result);
    return result as HomeCashback;
  } catch (error) {
    console.error('❌ [updateHomeCashback] Failed to update cashback:', error);
    return null;
  }
}

// Deprecated functions - kept for backwards compatibility
export async function getCashbackSection(): Promise<CashbackSection | null> {
  console.warn('⚠️ getCashbackSection is deprecated, use getHomeCashback instead');
  return getHomeCashback() as Promise<CashbackSection | null>;
}

export async function updateCashbackSection(cashbackData: CashbackSection): Promise<boolean> {
  console.warn('⚠️ updateCashbackSection is deprecated, use updateHomeCashback instead');
  const result = await updateHomeCashback(cashbackData as Partial<HomeCashback>);
  return result !== null;
}

// ============================================
// HOW IT WORKS SECTION
// ============================================

export async function getHomeHowItWorks(): Promise<HomeHowItWorks | null> {
  try {
    console.log('🔧 [getHomeHowItWorks] Buscando how it works section...');
    
    const { data, error } = await supabase
      .from('home_how_it_works')
      .select('*')
      .single();
    
    if (error) {
      console.error('❌ [getHomeHowItWorks] Erro:', error);
      throw error;
    }
    
    console.log('✅ [getHomeHowItWorks] Sucesso:', data);
    return data as HomeHowItWorks;
  } catch (error) {
    console.error('❌ [getHomeHowItWorks] Failed to fetch:', error);
    return null;
  }
}

export async function getHomeHowItWorksSteps(): Promise<HomeHowItWorksStep[]> {
  try {
    console.log('🔧 [getHomeHowItWorksSteps] Buscando steps...');
    
    const { data, error } = await supabase
      .from('home_how_it_works_steps')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });
    
    if (error) {
      console.error('❌ [getHomeHowItWorksSteps] Erro:', error);
      throw error;
    }
    
    console.log('✅ [getHomeHowItWorksSteps] Sucesso:', data);
    return data as HomeHowItWorksStep[];
  } catch (error) {
    console.error('❌ [getHomeHowItWorksSteps] Failed to fetch:', error);
    return [];
  }
}

export async function updateHomeHowItWorks(data: Partial<HomeHowItWorks>): Promise<HomeHowItWorks | null> {
  try {
    console.log('🔧 [updateHomeHowItWorks] Atualizando section...', data);
    
    const { data: existing } = await supabase
      .from('home_how_it_works')
      .select('id')
      .single();
    
    if (!existing) {
      console.error('❌ [updateHomeHowItWorks] How It Works record not found');
      throw new Error('How It Works record not found');
    }
    
    const { data: result, error } = await supabase
      .from('home_how_it_works')
      .update({
        section_title: data.section_title,
        section_subtitle: data.section_subtitle,
        updated_at: new Date().toISOString()
      })
      .eq('id', existing.id)
      .select()
      .single();
    
    if (error) {
      console.error('❌ [updateHomeHowItWorks] Erro:', error);
      throw error;
    }
    
    console.log('✅ [updateHomeHowItWorks] Sucesso:', result);
    return result as HomeHowItWorks;
  } catch (error) {
    console.error('❌ [updateHomeHowItWorks] Failed to update:', error);
    return null;
  }
}

export async function updateHomeHowItWorksStep(id: string, data: Partial<HomeHowItWorksStep>): Promise<HomeHowItWorksStep | null> {
  try {
    console.log('🔧 [updateHomeHowItWorksStep] Atualizando step:', id, data);
    
    const { data: result, error } = await supabase
      .from('home_how_it_works_steps')
      .update({
        title: data.title,
        description: data.description,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('❌ [updateHomeHowItWorksStep] Erro:', error);
      throw error;
    }
    
    console.log('✅ [updateHomeHowItWorksStep] Sucesso:', result);
    return result as HomeHowItWorksStep;
  } catch (error) {
    console.error('❌ [updateHomeHowItWorksStep] Failed to update:', error);
    return null;
  }
}

// Deprecated functions - kept for backwards compatibility
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
  console.log('🔧 [getFAQs] Buscando FAQs...')
  
  try {
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('❌ [getFAQs] Erro:', error)
      throw error;
    }
    
    console.log('✅ [getFAQs] Sucesso:', data?.length, 'FAQs encontrados')
    return data || [];
  } catch (error) {
    console.error('❌ [getFAQs] Error fetching FAQs:', error);
    return [];
  }
}

export async function createFAQ(faq: Omit<FAQ, 'id' | 'created_at' | 'updated_at'>): Promise<boolean> {
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

export async function updateFAQ(id: string, data: Partial<FAQ>): Promise<FAQ | null> {
  console.log('🔧 [updateFAQ] Atualizando FAQ:', id, data)
  
  try {
    const { data: result, error } = await supabase
      .from('faqs')
      .update({
        question: data.question,
        answer: data.answer,
        display_order: data.display_order,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('❌ [updateFAQ] Erro:', error)
      throw error;
    }
    
    console.log('✅ [updateFAQ] Sucesso:', result)
    return result as FAQ;
  } catch (error) {
    console.error('❌ [updateFAQ] Error updating FAQ:', error);
    return null;
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
        return updateFAQ(faq.id, {
          question: faq.question,
          answer: faq.answer,
          display_order: faq.display_order
        });
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
// FEATURED DEALS SECTION
// ============================================

/**
 * Get featured deals section texts (title, subtitle, button)
 */
export async function getHomeFeaturedDeals(): Promise<{ data: HomeFeaturedDeals | null; error: any }> {
  try {
    console.log('🔧 [getHomeFeaturedDeals] Fetching featured deals section...');
    
    const { data, error } = await supabase
      .from('home_featured_deals')
      .select('*')
      .single();

    if (error) {
      console.error('❌ [getHomeFeaturedDeals] Error:', error);
      return { data: null, error };
    }
    
    console.log('✅ [getHomeFeaturedDeals] Success:', data);
    return { data: data as HomeFeaturedDeals, error: null };
  } catch (error) {
    console.error('❌ [getHomeFeaturedDeals] Exception:', error);
    return { data: null, error };
  }
}

/**
 * Update featured deals section texts
 */
export async function updateHomeFeaturedDeals(
  sectionData: Partial<HomeFeaturedDeals>
): Promise<{ success: boolean; error?: any }> {
  try {
    console.log('🔧 [updateHomeFeaturedDeals] Updating featured deals section...', sectionData);
    
    // Get the existing record
    const { data: existing } = await supabase
      .from('home_featured_deals')
      .select('id')
      .single();
    
    if (!existing) {
      console.error('❌ [updateHomeFeaturedDeals] No record found');
      return { success: false, error: 'Featured deals section not found' };
    }
    
    // Update the record
    const { error } = await supabase
      .from('home_featured_deals')
      .update({
        section_title: sectionData.section_title,
        section_subtitle: sectionData.section_subtitle,
        button_text: sectionData.button_text,
        button_link: sectionData.button_link,
        updated_at: new Date().toISOString()
      })
      .eq('id', existing.id);
    
    if (error) {
      console.error('❌ [updateHomeFeaturedDeals] Error:', error);
      return { success: false, error };
    }
    
    console.log('✅ [updateHomeFeaturedDeals] Success!');
    return { success: true };
  } catch (error) {
    console.error('❌ [updateHomeFeaturedDeals] Exception:', error);
    return { success: false, error };
  }
}

/**
 * Get the 3 featured deals displayed on homepage
 * Joins with deals table to get full deal data
 */
export async function getHomeFeaturedDealsCards(): Promise<{ data: HomeFeaturedDealsCard[] | null; error: any }> {
  try {
    console.log('🔧 [getHomeFeaturedDealsCards] Fetching featured deals...');
    
    const { data, error } = await supabase
      .from('home_featured_deals_cards')
      .select(`
        *,
        deal:deals(*)
      `)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('❌ [getHomeFeaturedDealsCards] Error:', error);
      return { data: null, error };
    }
    
    // Filter out deals that are not active
    const activeDeals = data?.filter((item: any) => item.deal && item.deal.is_active) || [];
    
    console.log('✅ [getHomeFeaturedDealsCards] Success:', activeDeals.length, 'featured deals');
    return { data: activeDeals as HomeFeaturedDealsCard[], error: null };
  } catch (error) {
    console.error('❌ [getHomeFeaturedDealsCards] Exception:', error);
    return { data: null, error };
  }
}

/**
 * Update featured deals on homepage
 * Replaces all existing cards with new selection
 * @param cards - Array of {display_order, deal_id}
 */
export async function updateHomeFeaturedDealsCards(
  cards: Array<{ display_order: number; deal_id: number }>
): Promise<{ success: boolean; error?: any }> {
  try {
    console.log('🔧 [updateHomeFeaturedDealsCards] Updating featured deals...', cards);
    
    // Validate: must have exactly 3 cards
    if (cards.length !== 3) {
      console.error('❌ [updateHomeFeaturedDealsCards] Invalid count:', cards.length);
      return { success: false, error: 'Must have exactly 3 featured deals' };
    }
    
    // Validate: no duplicate deal_ids
    const dealIds = cards.map(c => c.deal_id);
    if (new Set(dealIds).size !== dealIds.length) {
      console.error('❌ [updateHomeFeaturedDealsCards] Duplicate deal IDs detected');
      return { success: false, error: 'Cannot select the same deal multiple times' };
    }
    
    // Delete all existing cards
    console.log('🔧 [updateHomeFeaturedDealsCards] Deleting existing cards...');
    const { error: deleteError } = await supabase
      .from('home_featured_deals_cards')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all
    
    if (deleteError) {
      console.error('❌ [updateHomeFeaturedDealsCards] Delete error:', deleteError);
      return { success: false, error: deleteError };
    }
    
    // Insert new cards
    console.log('🔧 [updateHomeFeaturedDealsCards] Inserting new cards...');
    const { error: insertError } = await supabase
      .from('home_featured_deals_cards')
      .insert(
        cards.map(card => ({
          deal_id: card.deal_id,
          display_order: card.display_order
        }))
      );
    
    if (insertError) {
      console.error('❌ [updateHomeFeaturedDealsCards] Insert error:', insertError);
      return { success: false, error: insertError };
    }
    
    console.log('✅ [updateHomeFeaturedDealsCards] Success!');
    return { success: true };
  } catch (error) {
    console.error('❌ [updateHomeFeaturedDealsCards] Exception:', error);
    return { success: false, error };
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

