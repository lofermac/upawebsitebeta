'use client'

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { 
  ArrowLeft, 
  Save, 
  ChevronDown, 
  ChevronUp,
  Upload,
  Eye,
  AlertCircle,
  Plus,
  Trash2,
  GripVertical,
  CheckCircle,
  Loader
} from 'lucide-react';
import Link from 'next/link';
import { 
  getAllDeals,
  createDeal,
  updateDeal,
  deleteDeal,
  uploadDealLogo,
  updateDealsOrder,
  type Deal 
} from '@/lib/supabase/deals';
import { generateRadialGradient } from '@/lib/utils/colorUtils';
import MultiCountrySelect from '@/app/components/MultiCountrySelect';

// Glow color options for dropdown
const GLOW_COLORS = [
  'red', 'orange', 'yellow', 'amber', 'emerald', 'green', 
  'blue', 'cyan', 'purple', 'indigo', 'rose', 'pink'
];

// Helper Functions
const isValidUrl = (url: string): boolean => {
  if (!url) return false;
  return url.startsWith('http') || url.startsWith('/');
};

const isValidHex = (hex: string): boolean => {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
};

const getCharCountColor = (current: number, max: number): string => {
  const percentage = (current / max) * 100;
  if (percentage > 95) return 'text-red-500';
  if (percentage > 80) return 'text-yellow-500';
  return 'text-gray-500';
};

export default function DealsManagementPage() {
  // Accordion State
  const [openSection, setOpenSection] = useState<string | null>(null);
  
  // Loading & Save States
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isSaving, setIsSaving] = useState<Record<number, boolean>>({});
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccessState, setSaveSuccessState] = useState<Record<number, boolean>>({});
  const [uploadingLogo, setUploadingLogo] = useState<number | null>(null);
  
  // Delete Modal States
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [dealToDelete, setDealToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Drag & Drop States
  const [draggedItemId, setDraggedItemId] = useState<number | null>(null);
  const [dragOverItemId, setDragOverItemId] = useState<number | null>(null);
  
  // Add New Deal State
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newDealData, setNewDealData] = useState({
    name: '',
    slug: '',
    platform_id: '',
    title: '',
    main_value: '',
    main_value_second_line: '',
    subtitle: '',
    primary_color: '#962727',
    glow_color: 'red',
    claim_offer_url: '',
    learn_more_url: '',
    terms: '',
    available_countries: '',
    logo_max_height: 'max-h-14',
  });
  const [newDealLogo, setNewDealLogo] = useState<File | null>(null);
  const [newDealLogoPreview, setNewDealLogoPreview] = useState<string | null>(null);
  
  // Deals Data
  const [deals, setDeals] = useState<Deal[]>([]);
  const [formData, setFormData] = useState<Record<number, Partial<Deal>>>({});
  const [newLogos, setNewLogos] = useState<Record<number, File | null>>({});
  const [logoPreviews, setLogoPreviews] = useState<Record<number, string | null>>({});
  
  // Countries as Tags States
  const [editingCountries, setEditingCountries] = useState<Record<number, string[]>>({});
  const [newDealCountries, setNewDealCountries] = useState<string[]>([]);

  // Toggle Accordion Section
  const toggleSection = (dealId: number) => {
    setOpenSection(openSection === dealId.toString() ? null : dealId.toString());
  };

  // Load Deals
  useEffect(() => {
    loadDeals();
  }, []);

  async function loadDeals() {
    setIsLoadingData(true);
    
    try {
      console.log('📥 Loading deals from Supabase...');
      const { data, error } = await getAllDeals();
      
      if (error) {
        console.error('❌ Error loading deals:', error);
        setSaveError('Failed to load deals');
        return;
      }

      if (data) {
        setDeals(data);
        
        // Initialize form data for each deal
        const initialFormData: Record<number, Partial<Deal>> = {};
        const initialCountries: Record<number, string[]> = {};
        data.forEach((deal) => {
          initialFormData[deal.id] = { ...deal };
          initialCountries[deal.id] = deal.available_countries || [];
        });
        setFormData(initialFormData);
        setEditingCountries(initialCountries);
        
        console.log('✅ Loaded', data.length, 'deals');
      }
    } catch (error) {
      console.error('❌ Failed to load deals:', error);
      setSaveError('Failed to load deals');
    } finally {
      setIsLoadingData(false);
    }
  }

  // Country Management Functions
  // (Removed - now handled by MultiCountrySelect component)

  // Validation Functions
  const validateField = (field: string, value: string | number): boolean => {
    switch (field) {
      case 'name':
      case 'title':
      case 'main_value':
      case 'terms':
        return value && value.trim().length > 0;
      case 'primary_color':
        return isValidHex(value);
      case 'glow_color':
        return GLOW_COLORS.includes(value);
      case 'claim_offer_url':
        return isValidUrl(value);
      default:
        return true;
    }
  };

  // Handle Form Change
  function handleFormChange(dealId: number, field: keyof Deal, value: string | number | string[]) {
    setFormData((prev) => ({
      ...prev,
      [dealId]: {
        ...prev[dealId],
        [field]: value,
      },
    }));
  }

  // Handle Logo Selection
  function handleLogoSelect(dealId: number, file: File | null) {
    if (!file) return;

    // Validate file size
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setSaveError('Image must be less than 5MB');
      setTimeout(() => setSaveError(null), 5000);
      return;
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      setSaveError('Only JPG, PNG and WEBP images are allowed');
      setTimeout(() => setSaveError(null), 5000);
      return;
    }

    setNewLogos((prev) => ({
      ...prev,
      [dealId]: file,
    }));

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreviews((prev) => ({
        ...prev,
        [dealId]: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
    
    setSaveSuccess('Logo selected. Click Save Changes to upload.');
    setTimeout(() => setSaveSuccess(null), 3000);
  }

  // Save Deal Changes
  async function handleSaveDeal(dealId: number) {
    setIsSaving((prev) => ({ ...prev, [dealId]: true }));
    setSaveError(null);
    
    try {
      let logoUrl = formData[dealId]?.logo_url;
      
      // Upload new logo if selected
      if (newLogos[dealId]) {
        setUploadingLogo(dealId);
        console.log('📤 Uploading logo for deal', dealId);
        
        const { data: uploadData, error: uploadError } = await uploadDealLogo(
          newLogos[dealId]!,
          dealId
        );
        
        if (uploadError || !uploadData) {
          throw new Error('Failed to upload logo');
        }
        
        logoUrl = uploadData.url;
        console.log('✅ Logo uploaded:', logoUrl);
      }
      
      // Update deal in database
      const updateData = {
        ...formData[dealId],
        logo_url: logoUrl,
      };
      
      // Parse available_countries if it's a string
      if (typeof updateData.available_countries === 'string') {
        updateData.available_countries = updateData.available_countries
          .split(',')
          .map(c => c.trim())
          .filter(c => c.length > 0);
      }
      
      // Parse platform_id if it's a string
      if (typeof updateData.platform_id === 'string') {
        updateData.platform_id = updateData.platform_id ? parseInt(updateData.platform_id) : null;
      }
      
      const { error } = await updateDeal(dealId, updateData);
      
      if (error) {
        throw new Error('Failed to update deal');
      }
      
      // Update local state
      setDeals((prev) =>
        prev.map((d) => (d.id === dealId ? { ...d, ...updateData, logo_url: logoUrl || d.logo_url } : d))
      );
      
      // Clear logo selection
      setNewLogos((prev) => ({ ...prev, [dealId]: null }));
      setLogoPreviews((prev) => ({ ...prev, [dealId]: null }));
      
      // Show success
      setSaveSuccessState((prev) => ({ ...prev, [dealId]: true }));
      setTimeout(() => {
        setSaveSuccessState((prev) => ({ ...prev, [dealId]: false }));
      }, 2000);
      
      console.log('✅ Deal saved successfully');
      
    } catch (error) {
      console.error('❌ Failed to save deal:', error);
      setSaveError(error instanceof Error ? error.message : 'Failed to save deal');
      setTimeout(() => setSaveError(null), 5000);
    } finally {
      setIsSaving((prev) => ({ ...prev, [dealId]: false }));
      setUploadingLogo(null);
    }
  }

  // Add New Deal
  async function handleAddNewDeal() {
    setIsSaving((prev) => ({ ...prev, [0]: true }));
    setSaveError(null);
    
    try {
      // Validate required fields
      if (!newDealData.name || !newDealData.title || !newDealData.main_value || 
          !newDealData.claim_offer_url || !newDealData.terms) {
        throw new Error('Please fill in all required fields');
      }
      
      // Upload logo if selected
      let logoUrl = null;
      if (newDealLogo) {
        console.log('📤 Uploading logo for new deal');
        const { data: uploadData, error: uploadError } = await uploadDealLogo(newDealLogo);
        
        if (uploadError || !uploadData) {
          throw new Error('Failed to upload logo');
        }
        
        logoUrl = uploadData.url;
      }
      
      // Prepare deal data
      const dealData: Partial<DealInput> = {
        name: newDealData.name,
        slug: newDealData.slug || undefined,
        platform_id: newDealData.platform_id ? parseInt(newDealData.platform_id) : null,
        logo_url: logoUrl,
        logo_alt: `${newDealData.name} Logo`,
        logo_max_height: newDealData.logo_max_height,
        title: newDealData.title,
        main_value: newDealData.main_value,
        main_value_second_line: newDealData.main_value_second_line || null,
        subtitle: newDealData.subtitle || null,
        primary_color: newDealData.primary_color,
        glow_color: newDealData.glow_color,
        claim_offer_url: newDealData.claim_offer_url,
        learn_more_url: newDealData.learn_more_url || null,
        terms: newDealData.terms,
        available_countries: newDealCountries,
      };
      
      // Create deal
      const { data: createdDeal, error } = await createDeal(dealData);
      
      if (error || !createdDeal) {
        throw new Error('Failed to create deal');
      }
      
      // Reload deals
      await loadDeals();
      
      // Reset form
      setIsAddingNew(false);
      setNewDealData({
        name: '',
        slug: '',
        platform_id: '',
        title: '',
        main_value: '',
        main_value_second_line: '',
        subtitle: '',
        primary_color: '#962727',
        glow_color: 'red',
        claim_offer_url: '',
        learn_more_url: '',
        terms: '',
        available_countries: '',
        logo_max_height: 'max-h-14',
      });
      setNewDealLogo(null);
      setNewDealLogoPreview(null);
      setNewDealCountries([]);
      
      setSaveSuccess('Deal created successfully!');
      setTimeout(() => setSaveSuccess(null), 3000);
      
      console.log('✅ Deal created successfully');
      
    } catch (error) {
      console.error('❌ Failed to create deal:', error);
      setSaveError(error instanceof Error ? error.message : 'Failed to create deal');
      setTimeout(() => setSaveError(null), 5000);
    } finally {
      setIsSaving((prev) => ({ ...prev, [0]: false }));
    }
  }

  // Delete Deal
  async function handleDeleteDeal() {
    if (!dealToDelete) return;
    
    setIsDeleting(true);
    
    try {
      const { error } = await deleteDeal(dealToDelete);
      
      if (error) {
        throw new Error('Failed to delete deal');
      }
      
      // Remove from local state
      setDeals((prev) => prev.filter((d) => d.id !== dealToDelete));
      
      setDeleteModalOpen(false);
      setDealToDelete(null);
      
      setSaveSuccess('Deal deleted successfully!');
      setTimeout(() => setSaveSuccess(null), 3000);
      
      console.log('✅ Deal deleted successfully');
      
    } catch (error) {
      console.error('❌ Failed to delete deal:', error);
      setSaveError(error instanceof Error ? error.message : 'Failed to delete deal');
      setTimeout(() => setSaveError(null), 5000);
    } finally {
      setIsDeleting(false);
    }
  }

  // Drag & Drop Functions
  const handleDragStart = (e: React.DragEvent, dealId: number) => {
    setDraggedItemId(dealId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, dealId: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverItemId(dealId);
  };

  const handleDragLeave = () => {
    setDragOverItemId(null);
  };

  const handleDrop = async (e: React.DragEvent, dropTargetId: number) => {
    e.preventDefault();
    
    if (!draggedItemId || draggedItemId === dropTargetId) {
      setDraggedItemId(null);
      setDragOverItemId(null);
      return;
    }
    
    // Reorder array
    const draggedIndex = deals.findIndex(d => d.id === draggedItemId);
    const targetIndex = deals.findIndex(d => d.id === dropTargetId);
    
    const newDeals = [...deals];
    const [draggedItem] = newDeals.splice(draggedIndex, 1);
    newDeals.splice(targetIndex, 0, draggedItem);
    
    // Update display_order
    const reorderedWithNewOrder = newDeals.map((d, index) => ({
      ...d,
      display_order: index + 1,
    }));
    
    setDeals(reorderedWithNewOrder);
    
    // Save to database
    const orderUpdates = reorderedWithNewOrder.map((d) => ({
      id: d.id,
      display_order: d.display_order,
    }));
    
    await updateDealsOrder(orderUpdates);
    
    setDraggedItemId(null);
    setDragOverItemId(null);
    
    setSaveSuccess('Order updated successfully!');
    setTimeout(() => setSaveSuccess(null), 2000);
  };

  const handleDragEnd = () => {
    setDraggedItemId(null);
    setDragOverItemId(null);
  };

  // New Deal Logo Selection
  function handleNewDealLogoSelect(file: File | null) {
    if (!file) return;

    // Validate file
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setSaveError('Image must be less than 5MB');
      setTimeout(() => setSaveError(null), 5000);
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      setSaveError('Only JPG, PNG and WEBP images are allowed');
      setTimeout(() => setSaveError(null), 5000);
      return;
    }

    setNewDealLogo(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewDealLogoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  return (
    <ProtectedRoute allowedUserType="admin">
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <div className="border-b border-white/10 bg-gradient-to-b from-zinc-900/50 to-black/50 backdrop-blur-xl sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link 
                  href="/admin/dashboard"
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    Deals Management
                  </h1>
                  <p className="text-sm text-gray-400 mt-1">
                    Manage poker site deals and promotions
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/deals"
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all text-sm"
                >
                  <Eye className="w-4 h-4" />
                  Preview Page
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Success/Error Messages */}
          {saveSuccess && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-green-400 text-sm">{saveSuccess}</p>
            </div>
          )}
          
          {saveError && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <p className="text-red-400 text-sm">{saveError}</p>
            </div>
          )}

          {/* Add New Deal Button */}
          <div className="mb-6">
            <button
              onClick={() => setIsAddingNew(!isAddingNew)}
              className="flex items-center gap-2 px-4 py-2 bg-[#077124] hover:bg-[#0a9b30] rounded-lg transition-all text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              {isAddingNew ? 'Cancel' : 'Add New Deal'}
            </button>
          </div>

          {/* Add New Deal Form */}
          {isAddingNew && (
            <div className="mb-8 p-6 bg-zinc-900/50 border border-white/10 rounded-2xl">
              <h3 className="text-lg font-semibold mb-4">Create New Deal</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Identification */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={newDealData.name}
                        onChange={(e) => setNewDealData({ ...newDealData, name: e.target.value })}
                        className="w-full px-4 py-2 pr-10 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124]"
                        placeholder="GGPoker"
                      />
                      {newDealData.name && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          {validateField('name', newDealData.name) ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-red-500" />
                          )}
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">💡 Platform name as displayed in the admin</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Slug (auto-generated if empty)
                    </label>
                    <input
                      type="text"
                      value={newDealData.slug}
                      onChange={(e) => setNewDealData({ ...newDealData, slug: e.target.value })}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124]"
                      placeholder="ggpoker-deal"
                    />
                    <p className="text-xs text-gray-500 mt-1">💡 Auto-generated URL-friendly version (editable)</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Platform ID
                    </label>
                    <input
                      type="number"
                      value={newDealData.platform_id}
                      onChange={(e) => setNewDealData({ ...newDealData, platform_id: e.target.value })}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124]"
                      placeholder="1365"
                    />
                    <p className="text-xs text-gray-500 mt-1">💡 Numeric ID for platform connection (optional)</p>
                  </div>
                </div>

                {/* Messaging */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Title *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={newDealData.title}
                        onChange={(e) => setNewDealData({ ...newDealData, title: e.target.value })}
                        className="w-full px-4 py-2 pr-10 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124]"
                        placeholder="Get Up To"
                      />
                      {newDealData.title && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          {validateField('title', newDealData.title) ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-red-500" />
                          )}
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">💡 First line of text on the deal card</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Main Value *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={newDealData.main_value}
                        onChange={(e) => setNewDealData({ ...newDealData, main_value: e.target.value })}
                        className="w-full px-4 py-2 pr-10 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124]"
                        placeholder="60%"
                      />
                      {newDealData.main_value && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          {validateField('main_value', newDealData.main_value) ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-red-500" />
                          )}
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">💡 Large highlighted text (e.g., &apos;60%&apos;)</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Main Value Second Line
                    </label>
                    <input
                      type="text"
                      value={newDealData.main_value_second_line}
                      onChange={(e) => setNewDealData({ ...newDealData, main_value_second_line: e.target.value })}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124]"
                      placeholder="Cashback"
                    />
                    <p className="text-xs text-gray-500 mt-1">💡 Continuation of main value (e.g., &apos;Cashback&apos;)</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      value={newDealData.subtitle}
                      onChange={(e) => setNewDealData({ ...newDealData, subtitle: e.target.value })}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124]"
                      placeholder="With GGPoker Fish Buffet"
                    />
                    <p className="text-xs text-gray-500 mt-1">💡 Descriptive text below the main value</p>
                  </div>
                </div>

                {/* Visual */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Primary Color * (HEX)
                    </label>
                    <div className="flex gap-4">
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={newDealData.primary_color}
                          onChange={(e) => setNewDealData({ ...newDealData, primary_color: e.target.value })}
                          className="w-16 h-10 bg-white/5 border border-white/10 rounded cursor-pointer"
                        />
                        <div className="relative">
                          <input
                            type="text"
                            value={newDealData.primary_color}
                            onChange={(e) => setNewDealData({ ...newDealData, primary_color: e.target.value })}
                            className="w-32 px-4 py-2 pr-10 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124]"
                            placeholder="#962727"
                          />
                          {newDealData.primary_color && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              {validateField('primary_color', newDealData.primary_color) ? (
                                <CheckCircle className="w-5 h-5 text-green-500" />
                              ) : (
                                <AlertCircle className="w-5 h-5 text-red-500" />
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <p className="text-xs text-gray-400 mb-2">Gradient Preview:</p>
                        <div 
                          className="w-full h-20 rounded-lg border border-gray-700"
                          style={{ background: generateRadialGradient(newDealData.primary_color) }}
                        />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">💡 Base color for the card gradient</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Glow Color *
                    </label>
                    <select
                      value={newDealData.glow_color}
                      onChange={(e) => setNewDealData({ ...newDealData, glow_color: e.target.value })}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124]"
                    >
                      {GLOW_COLORS.map((color) => (
                        <option key={color} value={color}>{color}</option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">💡 Color of the outer glow effect</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Logo Max Height
                    </label>
                    <select
                      value={newDealData.logo_max_height}
                      onChange={(e) => setNewDealData({ ...newDealData, logo_max_height: e.target.value })}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124]"
                    >
                      <option value="max-h-14">max-h-14 (standard)</option>
                      <option value="max-h-60">max-h-60 (large)</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">💡 Maximum height for the logo image</p>
                  </div>
                </div>

                {/* Logo Upload */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Logo
                    </label>
                    {newDealLogoPreview ? (
                      <div className="space-y-4">
                        <div className="border-2 border-green-500/50 rounded-lg p-4 bg-green-500/5">
                          <p className="text-sm text-green-400 mb-2">New Logo Preview:</p>
                          <div className="relative w-full h-32 flex items-center justify-center bg-white/5 rounded-lg">
                            <img
                              src={newDealLogoPreview}
                              alt="Logo preview"
                              className="max-h-24 object-contain"
                            />
                          </div>
                          <button
                            onClick={() => {
                              setNewDealLogo(null);
                              setNewDealLogoPreview(null);
                            }}
                            className="mt-3 w-full px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-sm transition-colors"
                          >
                            Remove Logo
                          </button>
                        </div>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-green-500 hover:bg-gray-800/30 transition-all group">
                        <Upload className="w-10 h-10 text-gray-500 group-hover:text-green-500 mb-3 transition-colors" />
                        <p className="text-sm text-gray-400 group-hover:text-gray-300">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-600 mt-1">PNG, JPG, WEBP or SVG (max 5MB)</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => e.target.files && handleNewDealLogoSelect(e.target.files[0])}
                          className="hidden"
                        />
                      </label>
                    )}
                    <p className="text-xs text-gray-500 mt-1">💡 Upload the platform logo</p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Claim Offer URL *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={newDealData.claim_offer_url}
                        onChange={(e) => setNewDealData({ ...newDealData, claim_offer_url: e.target.value })}
                        className="w-full px-4 py-2 pr-10 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124]"
                        placeholder="/platform-connection?platform_id=1365"
                      />
                      {newDealData.claim_offer_url && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          {validateField('claim_offer_url', newDealData.claim_offer_url) ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-red-500" />
                          )}
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">💡 Link for the &apos;Claim Offer&apos; button</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Learn More URL
                    </label>
                    <input
                      type="text"
                      value={newDealData.learn_more_url}
                      onChange={(e) => setNewDealData({ ...newDealData, learn_more_url: e.target.value })}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124]"
                      placeholder="/ggpoker-deal"
                    />
                    <p className="text-xs text-gray-500 mt-1">💡 Link for the &apos;Learn More&apos; button (optional)</p>
                  </div>
                </div>

                {/* Terms & Geo */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Terms & Conditions *
                    </label>
                    <div className="relative">
                      <textarea
                        value={newDealData.terms}
                        onChange={(e) => setNewDealData({ ...newDealData, terms: e.target.value })}
                        rows={4}
                        maxLength={500}
                        className="w-full px-4 py-2 pb-8 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124] resize-none"
                        placeholder="18+ | Please Play Responsibly | Full T&C's Apply"
                      />
                      <div className={`absolute bottom-2 right-2 text-xs ${getCharCountColor(newDealData.terms.length, 500)}`}>
                        {newDealData.terms.length}/500
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">💡 Legal text displayed at the bottom of the card</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Available Countries
                    </label>
                    <MultiCountrySelect
                      value={newDealCountries}
                      onChange={setNewDealCountries}
                    />
                  </div>
                </div>
              </div>

              {/* Create Button */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleAddNewDeal}
                  disabled={isSaving[0]}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    isSaving[0] 
                      ? 'bg-[#077124]/50 cursor-not-allowed' 
                      : saveSuccessState[0]
                      ? 'bg-green-500 scale-105 shadow-lg shadow-green-500/50' 
                      : 'bg-[#077124] hover:bg-[#0a9b30]'
                  }`}
                >
                  {isSaving[0] ? (
                    <span className="flex items-center gap-2">
                      <Loader className="w-4 h-4 animate-spin" />
                      Creating...
                    </span>
                  ) : saveSuccessState[0] ? (
                    <span className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Created!
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Create Deal
                    </span>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoadingData ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {deals.map((deal) => (
                <div
                  key={deal.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, deal.id)}
                  onDragOver={(e) => handleDragOver(e, deal.id)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, deal.id)}
                  onDragEnd={handleDragEnd}
                  className={`bg-zinc-900/50 border rounded-2xl overflow-hidden transition-all ${
                    dragOverItemId === deal.id
                      ? 'border-[#077124] shadow-lg shadow-[#077124]/20'
                      : 'border-white/10'
                  } ${draggedItemId === deal.id ? 'opacity-50' : ''}`}
                >
                  {/* Card Header */}
                  <div
                    onClick={() => toggleSection(deal.id)}
                    className="p-6 cursor-pointer hover:bg-white/5 transition-colors flex items-center gap-4"
                  >
                    <div className="cursor-grab active:cursor-grabbing">
                      <GripVertical className="w-5 h-5 text-gray-500" />
                    </div>
                    
                    {deal.logo_url && (
                      <img
                        src={deal.logo_url}
                        alt={deal.logo_alt}
                        className="h-8 object-contain"
                      />
                    )}
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{deal.name}</h3>
                      <p className="text-sm text-gray-400">{deal.title} {deal.main_value}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {saveSuccessState[deal.id] && (
                        <span className="text-sm text-green-400">Saved!</span>
                      )}
                      {openSection === deal.id.toString() ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </div>

                  {/* Card Content (Expanded) */}
                  {openSection === deal.id.toString() && (
                    <div className="p-6 border-t border-white/10 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Identification */}
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Name *
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                value={formData[deal.id]?.name || ''}
                                onChange={(e) => handleFormChange(deal.id, 'name', e.target.value)}
                                className="w-full px-4 py-2 pr-10 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124]"
                              />
                              {formData[deal.id]?.name && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                  {validateField('name', formData[deal.id]?.name) ? (
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                  ) : (
                                    <AlertCircle className="w-5 h-5 text-red-500" />
                                  )}
                                </div>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">💡 Platform name as displayed in the admin</p>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Slug
                            </label>
                            <input
                              type="text"
                              value={formData[deal.id]?.slug || ''}
                              onChange={(e) => handleFormChange(deal.id, 'slug', e.target.value)}
                              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124]"
                            />
                            <p className="text-xs text-gray-500 mt-1">💡 Auto-generated URL-friendly version (editable)</p>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Platform ID
                            </label>
                            <input
                              type="number"
                              value={formData[deal.id]?.platform_id || ''}
                              onChange={(e) => handleFormChange(deal.id, 'platform_id', e.target.value)}
                              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124]"
                            />
                            <p className="text-xs text-gray-500 mt-1">💡 Numeric ID for platform connection (optional)</p>
                          </div>
                        </div>

                        {/* Messaging */}
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Title *
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                value={formData[deal.id]?.title || ''}
                                onChange={(e) => handleFormChange(deal.id, 'title', e.target.value)}
                                className="w-full px-4 py-2 pr-10 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124]"
                              />
                              {formData[deal.id]?.title && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                  {validateField('title', formData[deal.id]?.title) ? (
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                  ) : (
                                    <AlertCircle className="w-5 h-5 text-red-500" />
                                  )}
                                </div>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">💡 First line of text on the deal card</p>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Main Value *
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                value={formData[deal.id]?.main_value || ''}
                                onChange={(e) => handleFormChange(deal.id, 'main_value', e.target.value)}
                                className="w-full px-4 py-2 pr-10 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124]"
                              />
                              {formData[deal.id]?.main_value && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                  {validateField('main_value', formData[deal.id]?.main_value) ? (
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                  ) : (
                                    <AlertCircle className="w-5 h-5 text-red-500" />
                                  )}
                                </div>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">💡 Large highlighted text (e.g., &apos;60%&apos;)</p>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Main Value Second Line
                            </label>
                            <input
                              type="text"
                              value={formData[deal.id]?.main_value_second_line || ''}
                              onChange={(e) => handleFormChange(deal.id, 'main_value_second_line', e.target.value)}
                              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124]"
                            />
                            <p className="text-xs text-gray-500 mt-1">💡 Continuation of main value (e.g., &apos;Cashback&apos;)</p>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Subtitle
                            </label>
                            <input
                              type="text"
                              value={formData[deal.id]?.subtitle || ''}
                              onChange={(e) => handleFormChange(deal.id, 'subtitle', e.target.value)}
                              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124]"
                            />
                            <p className="text-xs text-gray-500 mt-1">💡 Descriptive text below the main value</p>
                          </div>
                        </div>

                        {/* Visual */}
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Primary Color * (HEX)
                            </label>
                            <div className="flex gap-4">
                              <div className="flex gap-2">
                                <input
                                  type="color"
                                  value={formData[deal.id]?.primary_color || '#962727'}
                                  onChange={(e) => handleFormChange(deal.id, 'primary_color', e.target.value)}
                                  className="w-16 h-10 bg-white/5 border border-white/10 rounded cursor-pointer"
                                />
                                <div className="relative">
                                  <input
                                    type="text"
                                    value={formData[deal.id]?.primary_color || ''}
                                    onChange={(e) => handleFormChange(deal.id, 'primary_color', e.target.value)}
                                    className="w-32 px-4 py-2 pr-10 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124]"
                                  />
                                  {formData[deal.id]?.primary_color && (
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                      {validateField('primary_color', formData[deal.id]?.primary_color) ? (
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                      ) : (
                                        <AlertCircle className="w-5 h-5 text-red-500" />
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              <div className="flex-1">
                                <p className="text-xs text-gray-400 mb-2">Gradient Preview:</p>
                                <div 
                                  className="w-full h-20 rounded-lg border border-gray-700"
                                  style={{ background: generateRadialGradient(formData[deal.id]?.primary_color || '#962727') }}
                                />
                              </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">💡 Base color for the card gradient</p>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Glow Color *
                            </label>
                            <select
                              value={formData[deal.id]?.glow_color || 'red'}
                              onChange={(e) => handleFormChange(deal.id, 'glow_color', e.target.value)}
                              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124]"
                            >
                              {GLOW_COLORS.map((color) => (
                                <option key={color} value={color}>{color}</option>
                              ))}
                            </select>
                            <p className="text-xs text-gray-500 mt-1">💡 Color of the outer glow effect</p>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Logo Max Height
                            </label>
                            <select
                              value={formData[deal.id]?.logo_max_height || 'max-h-14'}
                              onChange={(e) => handleFormChange(deal.id, 'logo_max_height', e.target.value)}
                              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124]"
                            >
                              <option value="max-h-14">max-h-14 (standard)</option>
                              <option value="max-h-60">max-h-60 (large)</option>
                            </select>
                            <p className="text-xs text-gray-500 mt-1">💡 Maximum height for the logo image</p>
                          </div>
                        </div>

                        {/* Logo Upload */}
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Logo
                            </label>
                            {deal.logo_url && (
                              <div className="mb-4">
                                <p className="text-sm text-gray-400 mb-2">Current Logo:</p>
                                <div className="relative w-48 h-32 bg-gray-800/50 rounded-lg border border-gray-700 flex items-center justify-center">
                                  <img
                                    src={deal.logo_url}
                                    alt={deal.logo_alt}
                                    className="max-h-24 object-contain"
                                  />
                                </div>
                              </div>
                            )}
                            
                            {logoPreviews[deal.id] ? (
                              <div className="space-y-4">
                                <div className="border-2 border-green-500/50 rounded-lg p-4 bg-green-500/5">
                                  <p className="text-sm text-green-400 mb-2">New Logo Preview:</p>
                                  <div className="relative w-full h-32 flex items-center justify-center bg-white/5 rounded-lg">
                                    <img
                                      src={logoPreviews[deal.id] || ''}
                                      alt="Logo preview"
                                      className="max-h-24 object-contain"
                                    />
                                  </div>
                                  <button
                                    onClick={() => {
                                      setNewLogos((prev) => ({ ...prev, [deal.id]: null }));
                                      setLogoPreviews((prev) => ({ ...prev, [deal.id]: null }));
                                    }}
                                    className="mt-3 w-full px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-sm transition-colors"
                                  >
                                    Remove New Logo
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-green-500 hover:bg-gray-800/30 transition-all group">
                                <Upload className="w-10 h-10 text-gray-500 group-hover:text-green-500 mb-3 transition-colors" />
                                <p className="text-sm text-gray-400 group-hover:text-gray-300">Click to upload or drag and drop</p>
                                <p className="text-xs text-gray-600 mt-1">PNG, JPG, WEBP or SVG (max 5MB)</p>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => e.target.files && handleLogoSelect(deal.id, e.target.files[0])}
                                  className="hidden"
                                />
                              </label>
                            )}
                            <p className="text-xs text-gray-500 mt-1">💡 Upload the platform logo</p>
                          </div>
                        </div>

                        {/* Buttons */}
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Claim Offer URL *
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                value={formData[deal.id]?.claim_offer_url || ''}
                                onChange={(e) => handleFormChange(deal.id, 'claim_offer_url', e.target.value)}
                                className="w-full px-4 py-2 pr-10 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124]"
                              />
                              {formData[deal.id]?.claim_offer_url && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                  {validateField('claim_offer_url', formData[deal.id]?.claim_offer_url) ? (
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                  ) : (
                                    <AlertCircle className="w-5 h-5 text-red-500" />
                                  )}
                                </div>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">💡 Link for the &apos;Claim Offer&apos; button</p>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Learn More URL
                            </label>
                            <input
                              type="text"
                              value={formData[deal.id]?.learn_more_url || ''}
                              onChange={(e) => handleFormChange(deal.id, 'learn_more_url', e.target.value)}
                              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124]"
                            />
                            <p className="text-xs text-gray-500 mt-1">💡 Link for the &apos;Learn More&apos; button (optional)</p>
                          </div>
                        </div>

                        {/* Terms & Geo */}
                        <div className="space-y-4 md:col-span-2">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Terms & Conditions *
                            </label>
                            <div className="relative">
                              <textarea
                                value={formData[deal.id]?.terms || ''}
                                onChange={(e) => handleFormChange(deal.id, 'terms', e.target.value)}
                                rows={4}
                                maxLength={500}
                                className="w-full px-4 py-2 pb-8 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124] resize-none"
                              />
                              <div className={`absolute bottom-2 right-2 text-xs ${getCharCountColor((formData[deal.id]?.terms || '').length, 500)}`}>
                                {(formData[deal.id]?.terms || '').length}/500
                              </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">💡 Legal text displayed at the bottom of the card</p>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Available Countries
                            </label>
                            <MultiCountrySelect
                              value={editingCountries[deal.id] || []}
                              onChange={(countries) => {
                                setEditingCountries(prev => ({
                                  ...prev,
                                  [deal.id]: countries
                                }));
                                handleFormChange(deal.id, 'available_countries', countries);
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <button
                          onClick={() => {
                            setDealToDelete(deal.id);
                            setDeleteModalOpen(true);
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all text-sm"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete Deal
                        </button>

                        <button
                          onClick={() => handleSaveDeal(deal.id)}
                          disabled={isSaving[deal.id] || uploadingLogo === deal.id}
                          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                            isSaving[deal.id] || uploadingLogo === deal.id
                              ? 'bg-[#077124]/50 cursor-not-allowed' 
                              : saveSuccessState[deal.id]
                              ? 'bg-green-500 scale-105 shadow-lg shadow-green-500/50' 
                              : 'bg-[#077124] hover:bg-[#0a9b30]'
                          }`}
                        >
                          {isSaving[deal.id] || uploadingLogo === deal.id ? (
                            <span className="flex items-center gap-2">
                              <Loader className="w-4 h-4 animate-spin" />
                              {uploadingLogo === deal.id ? 'Uploading...' : 'Saving...'}
                            </span>
                          ) : saveSuccessState[deal.id] ? (
                            <span className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4" />
                              Saved!
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              <Save className="w-4 h-4" />
                              Save Changes
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {deleteModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-zinc-900 border border-white/10 rounded-2xl max-w-md w-full p-6">
              <h3 className="text-xl font-semibold mb-4">Delete Deal?</h3>
              <p className="text-gray-400 mb-6">
                Are you sure you want to delete this deal? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setDeleteModalOpen(false);
                    setDealToDelete(null);
                  }}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteDeal}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isDeleting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Deleting...
                    </>
                  ) : (
                    'Delete'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}

