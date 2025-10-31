'use client'

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { 
  ArrowLeft, 
  ChevronDown, 
  ChevronUp,
  Eye,
  Plus,
  Trash2,
  Save,
  AlertCircle,
  Upload
} from 'lucide-react';
import Link from 'next/link';
import { 
  getHeaderNavigation, 
  updateHeaderNavigation, 
  addHeaderButton, 
  deleteHeaderButton,
  HeaderNavigation 
} from '@/lib/supabase/header';
import {
  getFooterPokerSites,
  getFooterQuickLinks,
  updateFooterPokerSites,
  updateFooterQuickLinks,
  deleteFooterPokerSite,
  deleteFooterQuickLink,
  FooterPokerSite,
  FooterQuickLink
} from '@/lib/supabase/footer';
import {
  getFooterBadges,
  updateFooterBadges,
  deleteFooterBadge,
  uploadBadgeImage,
  deleteBadgeImage,
  FooterBadge
} from '@/lib/supabase/badges';
import { Deal, getDeals } from '@/lib/supabase/deals';

export default function OthersEditor() {
  // Accordion State
  const [openSection, setOpenSection] = useState<string | null>(null);
  
  // Header Section States
  const [headerButtons, setHeaderButtons] = useState<HeaderNavigation[]>([]);
  const [isLoadingHeader, setIsLoadingHeader] = useState(true);
  const [isSavingHeader, setIsSavingHeader] = useState(false);
  const [headerSaveSuccess, setHeaderSaveSuccess] = useState(false);
  const [headerSaveError, setHeaderSaveError] = useState<string | null>(null);
  
  // Footer Section States
  const [footerPokerSites, setFooterPokerSites] = useState<FooterPokerSite[]>([]);
  const [footerQuickLinks, setFooterQuickLinks] = useState<FooterQuickLink[]>([]);
  const [allDeals, setAllDeals] = useState<Deal[]>([]);
  const [isLoadingFooter, setIsLoadingFooter] = useState(true);
  const [isSavingFooter, setIsSavingFooter] = useState(false);
  const [footerSaveSuccess, setFooterSaveSuccess] = useState(false);
  const [footerSaveError, setFooterSaveError] = useState<string | null>(null);
  
  // Badges Section States
  const [footerBadges, setFooterBadges] = useState<FooterBadge[]>([]);
  const [isLoadingBadges, setIsLoadingBadges] = useState(true);
  const [isSavingBadges, setIsSavingBadges] = useState(false);
  const [badgesSaveSuccess, setBadgesSaveSuccess] = useState(false);
  const [badgesSaveError, setBadgesSaveError] = useState<string | null>(null);
  const [uploadingBadgeId, setUploadingBadgeId] = useState<string | null>(null);
  
  // Toggle Accordion Section
  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  // Load header navigation on mount
  useEffect(() => {
    loadHeaderNavigation();
    loadFooterData();
    loadBadgesData();
  }, []);

  const loadHeaderNavigation = async () => {
    console.log('📥 Loading header navigation...');
    setIsLoadingHeader(true);
    
    try {
      const { data, error } = await getHeaderNavigation();
      
      if (error) {
        console.error('❌ Error loading header:', error);
        setHeaderSaveError('Failed to load header navigation');
        return;
      }
      
      if (data) {
        setHeaderButtons(data);
        console.log(`✅ Loaded ${data.length} header buttons`);
      }
    } catch (err) {
      console.error('❌ Unexpected error:', err);
      setHeaderSaveError('Unexpected error loading header');
    } finally {
      setIsLoadingHeader(false);
    }
  };

  // Update button text
  const updateButtonText = (index: number, text: string) => {
    const newButtons = [...headerButtons];
    newButtons[index].button_text = text;
    setHeaderButtons(newButtons);
  };

  // Update button URL
  const updateButtonUrl = (index: number, url: string) => {
    const newButtons = [...headerButtons];
    newButtons[index].button_url = url;
    setHeaderButtons(newButtons);
  };

  // Add new button
  const handleAddButton = async () => {
    if (headerButtons.length >= 6) {
      setHeaderSaveError('Maximum 6 buttons allowed');
      return;
    }

    // Add a temporary button to the UI
    const tempButton: HeaderNavigation = {
      id: `temp-${Date.now()}`,
      button_text: '',
      button_url: '',
      display_order: headerButtons.length + 1,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    setHeaderButtons([...headerButtons, tempButton]);
  };

  // Delete button
  const handleDeleteButton = async (index: number, buttonId: string) => {
    if (buttonId.startsWith('temp-')) {
      // Just remove from UI if it's a temporary button
      const newButtons = headerButtons.filter((_, i) => i !== index);
      setHeaderButtons(newButtons);
      return;
    }

    if (!confirm('Are you sure you want to delete this button?')) {
      return;
    }

    console.log(`🗑️ Deleting button ${buttonId}...`);
    
    const { success, error } = await deleteHeaderButton(buttonId);
    
    if (error) {
      console.error('❌ Error deleting button:', error);
      setHeaderSaveError('Failed to delete button');
      return;
    }

    if (success) {
      // Reload to get updated display_order
      await loadHeaderNavigation();
      setHeaderSaveSuccess(true);
      setTimeout(() => setHeaderSaveSuccess(false), 3000);
    }
  };

  // Save header changes
  const saveHeaderChanges = async () => {
    console.log('💾 Saving header changes...');
    console.log('=== DEBUG SAVE HEADER ===');
    console.log('All buttons:', headerButtons);
    
    setHeaderSaveError(null);
    setHeaderSaveSuccess(false);
    
    // Validate all buttons
    for (let i = 0; i < headerButtons.length; i++) {
      const button = headerButtons[i];
      if (!button.button_text.trim()) {
        setHeaderSaveError(`Button ${i + 1}: Text is required`);
        return;
      }
      if (!button.button_url.trim()) {
        setHeaderSaveError(`Button ${i + 1}: URL is required`);
        return;
      }
      if (!button.button_url.startsWith('/') && !button.button_url.startsWith('http')) {
        setHeaderSaveError(`Button ${i + 1}: URL must start with / or http`);
        return;
      }
    }

    setIsSavingHeader(true);

    try {
      // Separate new buttons (temp IDs) from existing buttons
      const newButtons = headerButtons.filter(b => b.id.startsWith('temp-'));
      const existingButtons = headerButtons.filter(b => !b.id.startsWith('temp-'));
      
      console.log('Existing buttons:', existingButtons);
      console.log('New buttons:', newButtons);

      // Add new buttons first
      for (const button of newButtons) {
        // Find the position of this button in the full array
        const buttonIndex = headerButtons.findIndex(b => b.id === button.id);
        const desiredOrder = buttonIndex + 1;
        
        console.log(`➕ Adding new button: ${button.button_text} at position ${desiredOrder}`);
        const { data, error } = await addHeaderButton(button.button_text, button.button_url, desiredOrder);
        
        if (error) {
          console.error('❌ Error adding button:', error);
          const errorMessage = error instanceof Error ? error.message : 'Failed to add new button';
          setHeaderSaveError(errorMessage);
          setIsSavingHeader(false);
          return;
        }
        
        console.log('✅ Button added successfully:', data);
      }

      // Update existing buttons with correct display_order based on their position in the full array
      if (existingButtons.length > 0) {
        const buttonsToUpdate = existingButtons.map((button) => {
          // Find the original position in the headerButtons array
          const originalIndex = headerButtons.findIndex(b => b.id === button.id);
          
          return {
            id: button.id,
            button_text: button.button_text,
            button_url: button.button_url,
            display_order: originalIndex + 1 // Position in the full array (including temp buttons)
          };
        });

        console.log('Updating existing buttons:', buttonsToUpdate);

        const { error } = await updateHeaderNavigation(buttonsToUpdate);
        
        if (error) {
          console.error('❌ Error updating buttons:', error);
          setHeaderSaveError('Failed to update buttons');
          setIsSavingHeader(false);
          return;
        }
        
        console.log('✅ Existing buttons updated successfully');
      }

      // Reload to get fresh data with correct order
      console.log('🔄 Reloading header navigation...');
      await loadHeaderNavigation();
      
      setHeaderSaveSuccess(true);
      setTimeout(() => setHeaderSaveSuccess(false), 3000);
      
      console.log('✅ Header saved successfully');
    } catch (err) {
      console.error('❌ Unexpected error:', err);
      setHeaderSaveError('Unexpected error saving header');
    } finally {
      setIsSavingHeader(false);
    }
  };

  // ============================================
  // FOOTER FUNCTIONS
  // ============================================

  const loadFooterData = async () => {
    console.log('📥 Loading footer data...');
    setIsLoadingFooter(true);
    
    try {
      // Load poker sites, quick links, and all deals
      const [sitesResult, linksResult, dealsResult] = await Promise.all([
        getFooterPokerSites(),
        getFooterQuickLinks(),
        getDeals()
      ]);
      
      if (sitesResult.data) {
        setFooterPokerSites(sitesResult.data);
        console.log(`✅ Loaded ${sitesResult.data.length} poker sites`);
      }
      
      if (linksResult.data) {
        setFooterQuickLinks(linksResult.data);
        console.log(`✅ Loaded ${linksResult.data.length} quick links`);
      }
      
      if (dealsResult.data) {
        setAllDeals(dealsResult.data);
        console.log(`✅ Loaded ${dealsResult.data.length} deals for dropdowns`);
      }
      
    } catch (err) {
      console.error('❌ Error loading footer data:', err);
      setFooterSaveError('Failed to load footer data');
    } finally {
      setIsLoadingFooter(false);
    }
  };

  // Poker Sites Functions
  const addPokerSite = () => {
    const tempSite: FooterPokerSite = {
      id: `temp-${Date.now()}`,
      deal_id: 0,
      display_order: footerPokerSites.length + 1,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setFooterPokerSites([...footerPokerSites, tempSite]);
  };

  const updatePokerSiteDeal = (index: number, deal_id: number) => {
    const newSites = [...footerPokerSites];
    newSites[index].deal_id = deal_id;
    setFooterPokerSites(newSites);
  };

  const deletePokerSite = async (index: number, siteId: string) => {
    if (siteId.startsWith('temp-')) {
      // Just remove from UI if temporary
      const newSites = footerPokerSites.filter((_, i) => i !== index);
      setFooterPokerSites(newSites);
      return;
    }

    if (!confirm('Are you sure you want to remove this poker site from the footer?')) {
      return;
    }

    console.log(`🗑️ Deleting poker site ${siteId}...`);
    
    const { success, error } = await deleteFooterPokerSite(siteId);
    
    if (error) {
      console.error('❌ Error deleting poker site:', error);
      setFooterSaveError('Failed to delete poker site');
      return;
    }

    if (success) {
      await loadFooterData();
      setFooterSaveSuccess(true);
      setTimeout(() => setFooterSaveSuccess(false), 3000);
    }
  };

  // Quick Links Functions
  const addQuickLink = () => {
    const tempLink: FooterQuickLink = {
      id: `temp-${Date.now()}`,
      link_text: '',
      link_url: '',
      display_order: footerQuickLinks.length + 1,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setFooterQuickLinks([...footerQuickLinks, tempLink]);
  };

  const updateQuickLinkText = (index: number, text: string) => {
    const newLinks = [...footerQuickLinks];
    newLinks[index].link_text = text;
    setFooterQuickLinks(newLinks);
  };

  const updateQuickLinkUrl = (index: number, url: string) => {
    const newLinks = [...footerQuickLinks];
    newLinks[index].link_url = url;
    setFooterQuickLinks(newLinks);
  };

  const deleteQuickLink = async (index: number, linkId: string) => {
    if (linkId.startsWith('temp-')) {
      // Just remove from UI if temporary
      const newLinks = footerQuickLinks.filter((_, i) => i !== index);
      setFooterQuickLinks(newLinks);
      return;
    }

    if (!confirm('Are you sure you want to delete this quick link?')) {
      return;
    }

    console.log(`🗑️ Deleting quick link ${linkId}...`);
    
    const { success, error } = await deleteFooterQuickLink(linkId);
    
    if (error) {
      console.error('❌ Error deleting quick link:', error);
      setFooterSaveError('Failed to delete quick link');
      return;
    }

    if (success) {
      await loadFooterData();
      setFooterSaveSuccess(true);
      setTimeout(() => setFooterSaveSuccess(false), 3000);
    }
  };

  // Save Footer Changes
  const saveFooterChanges = async () => {
    console.log('💾 Saving footer changes...');
    console.log('=== DEBUG SAVE FOOTER ===');
    console.log('Poker Sites:', footerPokerSites);
    console.log('Quick Links:', footerQuickLinks);
    
    setFooterSaveError(null);
    setFooterSaveSuccess(false);
    
    // Validate poker sites
    for (let i = 0; i < footerPokerSites.length; i++) {
      const site = footerPokerSites[i];
      if (!site.deal_id || site.deal_id === 0) {
        setFooterSaveError(`Poker Site ${i + 1}: Please select a deal`);
        return;
      }
    }
    
    // Check for duplicate deals
    const dealIds = footerPokerSites.map(s => s.deal_id);
    const uniqueDealIds = new Set(dealIds);
    if (dealIds.length !== uniqueDealIds.size) {
      setFooterSaveError('Poker Sites: Cannot have duplicate deals');
      return;
    }
    
    // Validate quick links
    for (let i = 0; i < footerQuickLinks.length; i++) {
      const link = footerQuickLinks[i];
      if (!link.link_text.trim()) {
        setFooterSaveError(`Quick Link ${i + 1}: Text is required`);
        return;
      }
      if (!link.link_url.trim()) {
        setFooterSaveError(`Quick Link ${i + 1}: URL is required`);
        return;
      }
      if (!link.link_url.startsWith('/') && !link.link_url.startsWith('http')) {
        setFooterSaveError(`Quick Link ${i + 1}: URL must start with / or http`);
        return;
      }
    }

    setIsSavingFooter(true);

    try {
      // Save Poker Sites
      const sitesToSave = footerPokerSites.map((site, index) => ({
        id: site.id.startsWith('temp-') ? undefined : site.id,
        deal_id: site.deal_id,
        display_order: index + 1
      }));

      console.log('Saving poker sites:', sitesToSave);
      const { error: sitesError } = await updateFooterPokerSites(sitesToSave);
      
      if (sitesError) {
        console.error('❌ Error saving poker sites:', sitesError);
        setFooterSaveError('Failed to save poker sites');
        setIsSavingFooter(false);
        return;
      }

      // Save Quick Links
      const linksToSave = footerQuickLinks.map((link, index) => ({
        id: link.id.startsWith('temp-') ? undefined : link.id,
        link_text: link.link_text,
        link_url: link.link_url,
        display_order: index + 1
      }));

      console.log('Saving quick links:', linksToSave);
      const { error: linksError } = await updateFooterQuickLinks(linksToSave);
      
      if (linksError) {
        console.error('❌ Error saving quick links:', linksError);
        setFooterSaveError('Failed to save quick links');
        setIsSavingFooter(false);
        return;
      }

      // Reload to get fresh data
      console.log('🔄 Reloading footer data...');
      await loadFooterData();
      
      setFooterSaveSuccess(true);
      setTimeout(() => setFooterSaveSuccess(false), 3000);
      
      console.log('✅ Footer saved successfully');
    } catch (err) {
      console.error('❌ Unexpected error:', err);
      setFooterSaveError('Unexpected error saving footer');
    } finally {
      setIsSavingFooter(false);
    }
  };

  // ============================================
  // BADGES FUNCTIONS
  // ============================================

  const loadBadgesData = async () => {
    console.log('📥 Loading badges data...');
    setIsLoadingBadges(true);
    
    try {
      const { data, error } = await getFooterBadges();
      
      if (data) {
        setFooterBadges(data);
        console.log(`✅ Loaded ${data.length} badges`);
      }
      
      if (error) {
        console.error('❌ Error loading badges:', error);
        setBadgesSaveError('Failed to load badges');
      }
    } catch (err) {
      console.error('❌ Error loading badges data:', err);
      setBadgesSaveError('Failed to load badges data');
    } finally {
      setIsLoadingBadges(false);
    }
  };

  // Add new badge
  const addBadge = () => {
    const tempBadge: FooterBadge = {
      id: `temp-${Date.now()}`,
      badge_name: '',
      badge_image_url: '',
      external_link: null,
      display_order: footerBadges.length + 1,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setFooterBadges([...footerBadges, tempBadge]);
  };

  // Update badge name
  const updateBadgeName = (index: number, name: string) => {
    const newBadges = [...footerBadges];
    newBadges[index].badge_name = name;
    setFooterBadges(newBadges);
  };

  // Update badge external link
  const updateBadgeLink = (index: number, link: string) => {
    const newBadges = [...footerBadges];
    newBadges[index].external_link = link || null;
    setFooterBadges(newBadges);
  };

  // Handle badge image change
  const handleBadgeImageChange = async (index: number, file: File) => {
    const badge = footerBadges[index];
    setUploadingBadgeId(badge.id);
    setBadgesSaveError(null);

    try {
      // Validate file
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/svg+xml'];
      if (!validTypes.includes(file.type)) {
        setBadgesSaveError('Invalid file type. Please upload PNG, JPG, WEBP, or SVG.');
        setUploadingBadgeId(null);
        return;
      }

      const maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        setBadgesSaveError('File too large. Maximum size is 2MB.');
        setUploadingBadgeId(null);
        return;
      }

      console.log('📤 Uploading badge image...');
      
      // Delete old image if exists and not a temp badge
      if (badge.badge_image_url && !badge.id.startsWith('temp-')) {
        try {
          await deleteBadgeImage(badge.badge_image_url);
        } catch (err) {
          console.warn('⚠️ Failed to delete old image:', err);
        }
      }

      // Upload new image
      const { data: imageUrl, error } = await uploadBadgeImage(file);

      if (error) {
        console.error('❌ Error uploading image:', error);
        setBadgesSaveError('Failed to upload image');
        setUploadingBadgeId(null);
        return;
      }

      if (imageUrl) {
        // Update badge with new image URL
        const newBadges = [...footerBadges];
        newBadges[index].badge_image_url = imageUrl;
        setFooterBadges(newBadges);
        console.log('✅ Image uploaded successfully');
      }
    } catch (err) {
      console.error('❌ Unexpected error:', err);
      setBadgesSaveError('Unexpected error uploading image');
    } finally {
      setUploadingBadgeId(null);
    }
  };

  // Delete badge
  const handleDeleteBadge = async (index: number, badgeId: string) => {
    if (badgeId.startsWith('temp-')) {
      // Just remove from UI if temporary
      const newBadges = footerBadges.filter((_, i) => i !== index);
      setFooterBadges(newBadges);
      return;
    }

    if (!confirm('Are you sure you want to delete this badge?')) {
      return;
    }

    console.log(`🗑️ Deleting badge ${badgeId}...`);
    
    const { success, error } = await deleteFooterBadge(badgeId);
    
    if (error) {
      console.error('❌ Error deleting badge:', error);
      setBadgesSaveError('Failed to delete badge');
      return;
    }

    if (success) {
      await loadBadgesData();
      setBadgesSaveSuccess(true);
      setTimeout(() => setBadgesSaveSuccess(false), 3000);
    }
  };

  // Save badges changes
  const saveBadgesChanges = async () => {
    console.log('💾 Saving badges changes...');
    console.log('=== DEBUG SAVE BADGES ===');
    console.log('Badges:', footerBadges);
    
    setBadgesSaveError(null);
    setBadgesSaveSuccess(false);
    
    // Validate all badges
    for (let i = 0; i < footerBadges.length; i++) {
      const badge = footerBadges[i];
      if (!badge.badge_name.trim()) {
        setBadgesSaveError(`Badge ${i + 1}: Name is required`);
        return;
      }
      if (badge.badge_name.length > 50) {
        setBadgesSaveError(`Badge ${i + 1}: Name must be 50 characters or less`);
        return;
      }
      if (!badge.badge_image_url) {
        setBadgesSaveError(`Badge ${i + 1}: Image is required`);
        return;
      }
      if (badge.external_link && badge.external_link.trim()) {
        if (!badge.external_link.startsWith('http://') && !badge.external_link.startsWith('https://')) {
          setBadgesSaveError(`Badge ${i + 1}: External link must start with http:// or https://`);
          return;
        }
      }
    }

    setIsSavingBadges(true);

    try {
      // Save badges
      const badgesToSave = footerBadges.map((badge, index) => ({
        id: badge.id.startsWith('temp-') ? undefined : badge.id,
        badge_name: badge.badge_name,
        badge_image_url: badge.badge_image_url,
        external_link: badge.external_link?.trim() || null,
        display_order: index + 1
      }));

      console.log('Saving badges:', badgesToSave);
      const { error } = await updateFooterBadges(badgesToSave);
      
      if (error) {
        console.error('❌ Error saving badges:', error);
        setBadgesSaveError('Failed to save badges');
        setIsSavingBadges(false);
        return;
      }

      // Reload to get fresh data
      console.log('🔄 Reloading badges data...');
      await loadBadgesData();
      
      setBadgesSaveSuccess(true);
      setTimeout(() => setBadgesSaveSuccess(false), 3000);
      
      console.log('✅ Badges saved successfully');
    } catch (err) {
      console.error('❌ Unexpected error:', err);
      setBadgesSaveError('Unexpected error saving badges');
    } finally {
      setIsSavingBadges(false);
    }
  };

  return (
    <ProtectedRoute allowedUserType="admin">
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <header className="bg-gradient-to-r from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a] border-b border-gray-800/50 sticky top-0 z-50 backdrop-blur-xl">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center gap-4">
                <Link 
                  href="/admin/dashboard"
                  className="p-2.5 rounded-lg hover:bg-white/[0.05] border border-transparent hover:border-gray-800 transition-all duration-300 group"
                >
                  <ArrowLeft size={20} className="text-gray-400 group-hover:text-white" />
                </Link>
                
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src="/images/logo.png"
                      alt="Universal Poker"
                      className="h-8 w-auto object-contain"
                    />
                  </div>
                  <div className="hidden sm:block w-px h-8 bg-gradient-to-b from-transparent via-gray-700 to-transparent"></div>
                  <div className="hidden sm:flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">Site-Wide Elements</span>
                    <span className="text-xs text-gray-600 font-medium">Website Content Management</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Preview Button */}
                <a 
                  href="/"
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2.5 bg-gray-900/50 hover:bg-gray-800/50 border border-gray-800 hover:border-gray-700 rounded-lg transition-all duration-300 text-gray-300 hover:text-white group"
                >
                  <Eye size={16} />
                  <span className="hidden sm:inline text-sm font-medium">Preview Site</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent"></div>
        </header>

        {/* Main Content */}
        <main className="max-w-5xl mx-auto p-6 lg:p-8">

          {/* Success Message */}
          {headerSaveSuccess && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-green-400 text-sm font-medium">Header navigation saved successfully!</span>
            </div>
          )}
          
          {footerSaveSuccess && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-green-400 text-sm font-medium">Footer configuration saved successfully!</span>
            </div>
          )}
          
          {badgesSaveSuccess && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-green-400 text-sm font-medium">Badges saved successfully!</span>
            </div>
          )}

          {/* Error Message */}
          {headerSaveError && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3">
              <AlertCircle size={16} className="text-red-400" />
              <span className="text-red-400 text-sm font-medium">{headerSaveError}</span>
            </div>
          )}
          
          {footerSaveError && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3">
              <AlertCircle size={16} className="text-red-400" />
              <span className="text-red-400 text-sm font-medium">{footerSaveError}</span>
            </div>
          )}
          
          {badgesSaveError && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3">
              <AlertCircle size={16} className="text-red-400" />
              <span className="text-red-400 text-sm font-medium">{badgesSaveError}</span>
            </div>
          )}

          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1 h-8 bg-gradient-to-b from-[#10b981] to-emerald-600 rounded-full"></div>
              <h1 className="text-3xl font-bold text-white">Site-Wide Elements</h1>
            </div>
            <p className="text-base text-gray-400 ml-6">Edit header, footer and other global site elements</p>
          </div>

          {/* Accordion Sections */}
          <div className="space-y-4">
            
            {/* SECTION 1: Header */}
            <div className="bg-[#0f1419] border border-white/[0.06] rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection('header')}
                className="w-full flex items-center justify-between p-6 hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white text-sm font-bold">
                    1
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-white">Header</h3>
                    <p className="text-xs text-gray-500">Navigation and site header</p>
                  </div>
                </div>
                {openSection === 'header' ? (
                  <ChevronUp size={20} className="text-gray-400" />
                ) : (
                  <ChevronDown size={20} className="text-gray-400" />
                )}
              </button>
              
              {openSection === 'header' && (
                <div className="p-6 pt-0 border-t border-white/[0.06]">
                  <div className="space-y-5 mt-6">
                    
                    {/* Loading State */}
                    {isLoadingHeader ? (
                      <div className="flex items-center justify-center py-12">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                          <p className="text-sm text-gray-400">Loading header navigation...</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Info Box */}
                        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                          <p className="text-blue-400 text-sm">
                            <strong>Navigation Buttons:</strong> Add up to 6 buttons that will appear in your site header. These buttons will be displayed in the order shown below.
                          </p>
                        </div>

                        {/* Button Cards */}
                        {headerButtons.map((button, index) => (
                          <div 
                            key={button.id}
                            className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-5"
                          >
                            <div className="flex items-center gap-2 mb-4">
                              <div className="w-6 h-6 rounded bg-green-500/20 text-green-400 flex items-center justify-center text-xs font-bold">
                                {index + 1}
                              </div>
                              <h4 className="text-sm font-medium text-white/80">Button {index + 1}</h4>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* Button Text */}
                              <div>
                                <label className="block text-xs font-medium text-white/60 mb-2">
                                  Button Text <span className="text-red-400">*</span>
                                </label>
                                <input
                                  type="text"
                                  value={button.button_text}
                                  onChange={(e) => updateButtonText(index, e.target.value)}
                                  placeholder="e.g., Deals"
                                  maxLength={50}
                                  className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.1] rounded-lg text-white text-sm placeholder-white/40 focus:outline-none focus:border-green-500 transition-colors"
                                />
                                <p className="text-xs text-white/40 mt-1">{button.button_text.length}/50 characters</p>
                              </div>

                              {/* Button URL */}
                              <div>
                                <label className="block text-xs font-medium text-white/60 mb-2">
                                  Button URL <span className="text-red-400">*</span>
                                </label>
                                <input
                                  type="text"
                                  value={button.button_url}
                                  onChange={(e) => updateButtonUrl(index, e.target.value)}
                                  placeholder="/deals or https://..."
                                  maxLength={255}
                                  className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.1] rounded-lg text-white text-sm placeholder-white/40 focus:outline-none focus:border-green-500 transition-colors"
                                />
                                <p className="text-xs text-white/40 mt-1">Internal (/deals) or external (https://...)</p>
                              </div>
                            </div>

                            {/* Delete Button */}
                            <div className="flex justify-end mt-4 pt-4 border-t border-white/[0.06]">
                              <button
                                onClick={() => handleDeleteButton(index, button.id)}
                                className="flex items-center gap-2 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/30 rounded-lg text-red-400 text-sm transition-colors"
                              >
                                <Trash2 size={14} />
                                Delete Button
                              </button>
                            </div>
                          </div>
                        ))}

                        {/* Add Button */}
                        {headerButtons.length < 6 && (
                          <button
                            onClick={handleAddButton}
                            className="w-full p-4 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] hover:border-green-500/30 rounded-lg text-gray-400 hover:text-green-400 transition-all duration-200 flex items-center justify-center gap-2"
                          >
                            <Plus size={18} />
                            <span className="text-sm font-medium">Add Button ({headerButtons.length}/6)</span>
                          </button>
                        )}

                        {headerButtons.length >= 6 && (
                          <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                            <p className="text-orange-400 text-xs text-center">
                              Maximum 6 buttons reached. Delete a button to add a new one.
                            </p>
                          </div>
                        )}

                        {/* Save Button */}
                        <div className="flex justify-end pt-4 border-t border-white/[0.06]">
                          <button
                            onClick={saveHeaderChanges}
                            disabled={isSavingHeader || headerButtons.length === 0}
                            className={`
                              flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200
                              ${isSavingHeader || headerButtons.length === 0
                                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                : 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/20'
                              }
                            `}
                          >
                            {isSavingHeader ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Saving...
                              </>
                            ) : (
                              <>
                                <Save size={16} />
                                Save Changes
                              </>
                            )}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* SECTION 2: Footer */}
            <div className="bg-[#0f1419] border border-white/[0.06] rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection('footer')}
                className="w-full flex items-center justify-between p-6 hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold">
                    2
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-white">Footer</h3>
                    <p className="text-xs text-gray-500">Footer links and copyright information</p>
                  </div>
                </div>
                {openSection === 'footer' ? (
                  <ChevronUp size={20} className="text-gray-400" />
                ) : (
                  <ChevronDown size={20} className="text-gray-400" />
                )}
              </button>
              
              {openSection === 'footer' && (
                <div className="p-6 pt-0 border-t border-white/[0.06]">
                  <div className="space-y-8 mt-6">
                    
                    {/* Loading State */}
                    {isLoadingFooter ? (
                      <div className="flex items-center justify-center py-12">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                          <p className="text-sm text-gray-400">Loading footer configuration...</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* SECTION 1: Poker Sites */}
                        <div className="space-y-5">
                          <div className="pb-4 border-b border-white/[0.06]">
                            <h4 className="text-base font-semibold text-white mb-1">Poker Sites</h4>
                            <p className="text-xs text-gray-400">Select poker sites to display in footer</p>
                          </div>

                          {/* Poker Sites Cards */}
                          {footerPokerSites.map((site, index) => {
                            const selectedDeal = allDeals.find(d => d.id === site.deal_id);
                            
                            return (
                              <div 
                                key={site.id}
                                className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-5"
                              >
                                <div className="flex items-center gap-2 mb-4">
                                  <div className="w-6 h-6 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">
                                    {index + 1}
                                  </div>
                                  <h4 className="text-sm font-medium text-white/80">Poker Site {index + 1}</h4>
                                </div>

                                {/* Dropdown */}
                                <div className="mb-4">
                                  <label className="block text-xs font-medium text-white/60 mb-2">
                                    Select Deal <span className="text-red-400">*</span>
                                  </label>
                                  <select
                                    value={site.deal_id || 0}
                                    onChange={(e) => updatePokerSiteDeal(index, parseInt(e.target.value))}
                                    className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.1] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                                  >
                                    <option value={0}>Select a poker site...</option>
                                    {allDeals.map((deal) => (
                                      <option key={deal.id} value={deal.id}>
                                        {deal.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                {/* Preview */}
                                {selectedDeal && (
                                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg mb-4">
                                    <p className="text-xs text-blue-400 font-medium mb-1">Preview:</p>
                                    <p className="text-sm text-white">
                                      {selectedDeal.name} → {selectedDeal.learn_more_url || '/deals'}
                                    </p>
                                  </div>
                                )}

                                {/* Delete Button */}
                                <div className="flex justify-end pt-4 border-t border-white/[0.06]">
                                  <button
                                    onClick={() => deletePokerSite(index, site.id)}
                                    className="flex items-center gap-2 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/30 rounded-lg text-red-400 text-sm transition-colors"
                                  >
                                    <Trash2 size={14} />
                                    Delete Site
                                  </button>
                                </div>
                              </div>
                            );
                          })}

                          {/* Add Poker Site Button */}
                          <button
                            onClick={addPokerSite}
                            className="w-full p-4 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] hover:border-blue-500/30 rounded-lg text-gray-400 hover:text-blue-400 transition-all duration-200 flex items-center justify-center gap-2"
                          >
                            <Plus size={18} />
                            <span className="text-sm font-medium">Add Poker Site</span>
                          </button>
                        </div>

                        {/* Divider */}
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/[0.06]"></div>
                          </div>
                          <div className="relative flex justify-center">
                            <span className="px-4 bg-[#0f1419] text-xs text-gray-500 uppercase tracking-wider">Quick Links</span>
                          </div>
                        </div>

                        {/* SECTION 2: Quick Links */}
                        <div className="space-y-5">
                          <div className="pb-4 border-b border-white/[0.06]">
                            <h4 className="text-base font-semibold text-white mb-1">Quick Links</h4>
                            <p className="text-xs text-gray-400">Custom navigation links for footer</p>
                          </div>

                          {/* Quick Links Cards */}
                          {footerQuickLinks.map((link, index) => (
                            <div 
                              key={link.id}
                              className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-5"
                            >
                              <div className="flex items-center gap-2 mb-4">
                                <div className="w-6 h-6 rounded bg-green-500/20 text-green-400 flex items-center justify-center text-xs font-bold">
                                  {index + 1}
                                </div>
                                <h4 className="text-sm font-medium text-white/80">Link {index + 1}</h4>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Link Text */}
                                <div>
                                  <label className="block text-xs font-medium text-white/60 mb-2">
                                    Link Text <span className="text-red-400">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    value={link.link_text}
                                    onChange={(e) => updateQuickLinkText(index, e.target.value)}
                                    placeholder="e.g., Deals"
                                    maxLength={100}
                                    className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.1] rounded-lg text-white text-sm placeholder-white/40 focus:outline-none focus:border-green-500 transition-colors"
                                  />
                                  <p className="text-xs text-white/40 mt-1">{link.link_text.length}/100 characters</p>
                                </div>

                                {/* Link URL */}
                                <div>
                                  <label className="block text-xs font-medium text-white/60 mb-2">
                                    Link URL <span className="text-red-400">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    value={link.link_url}
                                    onChange={(e) => updateQuickLinkUrl(index, e.target.value)}
                                    placeholder="/deals or https://..."
                                    maxLength={255}
                                    className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.1] rounded-lg text-white text-sm placeholder-white/40 focus:outline-none focus:border-green-500 transition-colors"
                                  />
                                  <p className="text-xs text-white/40 mt-1">Internal (/deals) or external (https://...)</p>
                                </div>
                              </div>

                              {/* Delete Button */}
                              <div className="flex justify-end mt-4 pt-4 border-t border-white/[0.06]">
                                <button
                                  onClick={() => deleteQuickLink(index, link.id)}
                                  className="flex items-center gap-2 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/30 rounded-lg text-red-400 text-sm transition-colors"
                                >
                                  <Trash2 size={14} />
                                  Delete Link
                                </button>
                              </div>
                            </div>
                          ))}

                          {/* Add Quick Link Button */}
                          <button
                            onClick={addQuickLink}
                            className="w-full p-4 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] hover:border-green-500/30 rounded-lg text-gray-400 hover:text-green-400 transition-all duration-200 flex items-center justify-center gap-2"
                          >
                            <Plus size={18} />
                            <span className="text-sm font-medium">Add Quick Link</span>
                          </button>
                        </div>

                        {/* Info Box */}
                        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-start gap-3">
                          <AlertCircle size={18} className="text-blue-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-blue-400 font-medium mb-1">Information</p>
                            <p className="text-xs text-blue-300/80">
                              The Legal and Contact Information sections are hardcoded and cannot be edited through this panel.
                              They include Terms & Conditions, Privacy Policy, and company contact details.
                            </p>
                          </div>
                        </div>

                        {/* Save Button */}
                        <div className="flex justify-end pt-4 border-t border-white/[0.06]">
                          <button
                            onClick={saveFooterChanges}
                            disabled={isSavingFooter || (footerPokerSites.length === 0 && footerQuickLinks.length === 0)}
                            className={`
                              flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200
                              ${isSavingFooter || (footerPokerSites.length === 0 && footerQuickLinks.length === 0)
                                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                              }
                            `}
                          >
                            {isSavingFooter ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Saving...
                              </>
                            ) : (
                              <>
                                <Save size={16} />
                                Save Changes
                              </>
                            )}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* SECTION 3: Badges */}
            <div className="bg-[#0f1419] border border-white/[0.06] rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection('badges')}
                className="w-full flex items-center justify-between p-6 hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                    3
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-white">Badges</h3>
                    <p className="text-xs text-gray-500">Footer certification badges</p>
                  </div>
                </div>
                {openSection === 'badges' ? (
                  <ChevronUp size={20} className="text-gray-400" />
                ) : (
                  <ChevronDown size={20} className="text-gray-400" />
                )}
              </button>
              
              {openSection === 'badges' && (
                <div className="p-6 pt-0 border-t border-white/[0.06]">
                  <div className="space-y-5 mt-6">
                    
                    {/* Loading State */}
                    {isLoadingBadges ? (
                      <div className="flex items-center justify-center py-12">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                          <p className="text-sm text-gray-400">Loading badges...</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Info Box */}
                        <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                          <p className="text-purple-400 text-sm">
                            <strong>Certification and compliance badges:</strong> These badges will be displayed at the bottom of your footer.
                            Upload badge images, add names, and optionally link to external certification pages.
                          </p>
                        </div>

                        {/* Badge Cards */}
                        {footerBadges.map((badge, index) => (
                          <div 
                            key={badge.id}
                            className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-5"
                          >
                            <div className="flex items-center gap-2 mb-4">
                              <div className="w-6 h-6 rounded bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold">
                                {index + 1}
                              </div>
                              <h4 className="text-sm font-medium text-white/80">Badge {index + 1}</h4>
                            </div>

                            {/* Image Preview */}
                            {badge.badge_image_url && (
                              <div className="mb-4">
                                <label className="block text-xs font-medium text-white/60 mb-2">
                                  Badge Image Preview
                                </label>
                                <div className="relative inline-block">
                                  <img 
                                    src={badge.badge_image_url}
                                    alt={badge.badge_name || 'Badge preview'}
                                    className="max-h-16 w-auto object-contain border border-white/[0.1] rounded-lg p-2 bg-white/[0.02]"
                                  />
                                  {uploadingBadgeId === badge.id && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                                      <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Change Image Button */}
                            <div className="mb-4">
                              <label className="block text-xs font-medium text-white/60 mb-2">
                                Badge Image <span className="text-red-400">*</span>
                              </label>
                              <input
                                type="file"
                                id={`badge-image-${badge.id}`}
                                accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    handleBadgeImageChange(index, file);
                                  }
                                }}
                                className="hidden"
                              />
                              <button
                                onClick={() => document.getElementById(`badge-image-${badge.id}`)?.click()}
                                disabled={uploadingBadgeId === badge.id}
                                className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 hover:border-purple-500/30 rounded-lg text-purple-400 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {uploadingBadgeId === badge.id ? (
                                  <>
                                    <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                                    Uploading...
                                  </>
                                ) : (
                                  <>
                                    <Upload size={14} />
                                    {badge.badge_image_url ? 'Change Image' : 'Upload Image'}
                                  </>
                                )}
                              </button>
                              <p className="text-xs text-white/40 mt-1">PNG, JPG, WEBP, or SVG (max 2MB)</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* Badge Name */}
                              <div>
                                <label className="block text-xs font-medium text-white/60 mb-2">
                                  Badge Name <span className="text-red-400">*</span>
                                </label>
                                <input
                                  type="text"
                                  value={badge.badge_name}
                                  onChange={(e) => updateBadgeName(index, e.target.value)}
                                  placeholder="e.g., EGBA"
                                  maxLength={50}
                                  className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.1] rounded-lg text-white text-sm placeholder-white/40 focus:outline-none focus:border-purple-500 transition-colors"
                                />
                                <p className="text-xs text-white/40 mt-1">{badge.badge_name.length}/50 characters</p>
                              </div>

                              {/* External Link */}
                              <div>
                                <label className="block text-xs font-medium text-white/60 mb-2">
                                  External Link (Optional)
                                </label>
                                <input
                                  type="text"
                                  value={badge.external_link || ''}
                                  onChange={(e) => updateBadgeLink(index, e.target.value)}
                                  placeholder="https://www.example.com"
                                  maxLength={255}
                                  className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.1] rounded-lg text-white text-sm placeholder-white/40 focus:outline-none focus:border-purple-500 transition-colors"
                                />
                                <p className="text-xs text-white/40 mt-1">Must start with http:// or https://</p>
                              </div>
                            </div>

                            {/* Delete Button */}
                            <div className="flex justify-end mt-4 pt-4 border-t border-white/[0.06]">
                              <button
                                onClick={() => handleDeleteBadge(index, badge.id)}
                                className="flex items-center gap-2 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/30 rounded-lg text-red-400 text-sm transition-colors"
                              >
                                <Trash2 size={14} />
                                Delete Badge
                              </button>
                            </div>
                          </div>
                        ))}

                        {/* Add Badge Button */}
                        <button
                          onClick={addBadge}
                          className="w-full p-4 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] hover:border-purple-500/30 rounded-lg text-gray-400 hover:text-purple-400 transition-all duration-200 flex items-center justify-center gap-2"
                        >
                          <Plus size={18} />
                          <span className="text-sm font-medium">Add Badge</span>
                        </button>

                        {/* Save Button */}
                        <div className="flex justify-end pt-4 border-t border-white/[0.06]">
                          <button
                            onClick={saveBadgesChanges}
                            disabled={isSavingBadges || footerBadges.length === 0}
                            className={`
                              flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200
                              ${isSavingBadges || footerBadges.length === 0
                                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                : 'bg-purple-500 hover:bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                              }
                            `}
                          >
                            {isSavingBadges ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Saving...
                              </>
                            ) : (
                              <>
                                <Save size={16} />
                                Save Changes
                              </>
                            )}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
