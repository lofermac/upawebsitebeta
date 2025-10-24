'use client'

import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation'; // Reserved for future use
import ProtectedRoute from '@/components/ProtectedRoute';
import { 
  ArrowLeft, 
  Save, 
  ChevronDown, 
  ChevronUp,
  Plus,
  Trash2,
  GripVertical,
  Eye,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { uploadTestimonialPhoto, deleteTestimonialPhoto, getTestimonials, updateTestimonial, createTestimonial, deleteTestimonial } from '@/lib/supabase/homepage';

// Type Definitions
interface HeroSection {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

interface StatItem {
  id: string;
  label: string;
  value: string;
  icon: string;
  order: number;
  isActive: boolean;
}

interface CashbackSection {
  sectionTitle: string;
  amount: number;
  displayText: string;
  description: string;
}

interface HowItWorksStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  order: number;
  isActive: boolean;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  imageUrl: string;
  order: number;
  isActive: boolean;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
  isActive: boolean;
}

export default function HomepageEditor() {
  // const router = useRouter(); // Reserved for future navigation features
  
  // Accordion State
  const [openSection, setOpenSection] = useState<string | null>(null); // Todas seções começam recolhidas
  
  // Loading & Save States
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccessState, setSaveSuccessState] = useState<{[key: string]: boolean}>({
    hero: false,
    stats: false,
    cashback: false,
    howItWorks: false,
    testimonials: false,
    faqs: false
  });
  const [uploadingImage, setUploadingImage] = useState<string | null>(null); // ID of testimonial being uploaded
  const [isLoadingData, setIsLoadingData] = useState(true);
  
  // Delete Modal States
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [testimonialToDelete, setTestimonialToDelete] = useState<string | null>(null);
  
  // Drag & Drop States
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [dragOverItemId, setDragOverItemId] = useState<string | null>(null);
  
  // Section Data States
  const [heroData, setHeroData] = useState<HeroSection>({
    title: 'Exclusive Deals On The World\'s Best Poker Sites',
    subtitle: 'More Rakeback. More Support. Maximum Value.',
    buttonText: 'Explore Deals',
    buttonLink: '/deals'
  });
  
  const [statsData, setStatsData] = useState<StatItem[]>([
    { id: '1', label: 'Number Of Players With Us', value: '10,000+', icon: 'users', order: 1, isActive: true },
    { id: '2', label: 'How Long We\'ve Been Here', value: '13 Years', icon: 'calendar', order: 2, isActive: true },
    { id: '3', label: 'Team Experience in Poker', value: '100+ Years', icon: 'award', order: 3, isActive: true }
  ]);
  
  const [cashbackData, setCashbackData] = useState<CashbackSection>({
    sectionTitle: 'Rewards & Cashback Paid in 2025',
    amount: 2450000,
    displayText: '$2,450,000+',
    description: 'Join thousands of players maximizing their poker profits with exclusive rakeback deals.'
  });
  
  const [howItWorksData, setHowItWorksData] = useState<HowItWorksStep[]>([
    { id: '1', stepNumber: 1, title: 'Choose Your Deal', description: 'We partner with the top poker sites. Pick one you already play on or try a new one with a better offer.', order: 1, isActive: true },
    { id: '2', stepNumber: 2, title: 'New & Existing Players Welcome', description: 'Create a new account through us and you\'re automatically accepted. Already have an account? Apply to join our deal.', order: 2, isActive: true },
    { id: '3', stepNumber: 3, title: 'Same Play. More Rewards', description: 'Nothing changes about how you play. You\'ll still receive the poker sites rewards, plus extra cashback from us on top.', order: 3, isActive: true }
  ]);
  
  const [testimonialsData, setTestimonialsData] = useState<Testimonial[]>([]);
  
  const [faqsData, setFaqsData] = useState<FAQ[]>([
    { id: '1', question: 'Do I Have To Pay For This Service?', answer: 'No, our service is completely free for players. We earn a commission from the poker sites when you play, which allows us to offer you additional rakeback and benefits at no cost to you.', order: 1, isActive: true }
  ]);

  // Toggle Accordion Section
  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  // Upload Testimonial Photo
  const handleTestimonialPhotoUpload = async (file: File, testimonialId: string, testimonialName: string) => {
    console.log('📸 [1] Iniciando upload de imagem...');
    console.log('📸 [2] Arquivo:', {
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      type: file.type
    });
    console.log('📸 [3] TestimonialId:', testimonialId);
    console.log('📸 [4] TestimonialName:', testimonialName);
    
    // Validar se o nome foi preenchido
    if (!testimonialName || testimonialName.trim() === '') {
      console.warn('⚠️ [5] Nome vazio, usando ID como fallback');
      testimonialName = testimonialId; // Usar o ID como fallback se nome estiver vazio
    }
    
    setUploadingImage(testimonialId);
    setSaveError(null);
    
    try {
      // Get old image URL to delete after successful upload
      const oldTestimonial = testimonialsData.find(t => t.id === testimonialId);
      const oldImageUrl = oldTestimonial?.imageUrl;
      console.log('📸 [6] Imagem antiga:', oldImageUrl || 'nenhuma');
      
      // Upload to Supabase Storage
      console.log('📸 [7] Chamando uploadTestimonialPhoto...');
      const publicUrl = await uploadTestimonialPhoto(file, testimonialName);
      console.log('✅ [8] Upload concluído! URL:', publicUrl);
      
      // Update testimonial with new image URL
      const updatedTestimonials = testimonialsData.map(t => 
        t.id === testimonialId ? { ...t, imageUrl: publicUrl } : t
      );
      setTestimonialsData(updatedTestimonials);
      console.log('✅ [9] State atualizado com nova URL');
      
      // Delete old image if it exists and was from storage
      if (oldImageUrl && oldImageUrl.includes('testimonials-photos')) {
        console.log('📸 [10] Deletando imagem antiga...');
        await deleteTestimonialPhoto(oldImageUrl).catch(console.error);
      }
      
      setSaveSuccess('Image uploaded successfully!');
      setTimeout(() => setSaveSuccess(null), 3000);
      console.log('✅ [11] Upload completo!');
      
    } catch (error) {
      console.error('❌ [12] Erro no upload:', error);
      setSaveError(error instanceof Error ? error.message : 'Failed to upload image. Please try again.');
      setTimeout(() => setSaveError(null), 5000);
    } finally {
      setUploadingImage(null);
    }
  };

  // Delete Modal Functions
  const openDeleteModal = (testimonialId: string) => {
    setTestimonialToDelete(testimonialId);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setTestimonialToDelete(null);
    setDeleteModalOpen(false);
  };

  const confirmDelete = async () => {
    if (!testimonialToDelete) return;
    
    try {
      // Se é novo (ainda não salvo), só remove do state
      if (testimonialToDelete.startsWith('new-')) {
        setTestimonialsData(testimonialsData.filter(t => t.id !== testimonialToDelete));
        setSaveSuccess('Testimonial removed!');
        setTimeout(() => setSaveSuccess(null), 2000);
        closeDeleteModal();
        return;
      }
      
      // Se existe no banco, deleta do Supabase
      console.log('🗑️ Deletando testimonial do banco:', testimonialToDelete);
      await deleteTestimonial(testimonialToDelete);
      setTestimonialsData(testimonialsData.filter(t => t.id !== testimonialToDelete));
      setSaveSuccess('Testimonial deleted successfully!');
      setTimeout(() => setSaveSuccess(null), 2000);
      closeDeleteModal();
    } catch (error) {
      console.error('❌ Erro ao deletar:', error);
      setSaveError('Failed to delete testimonial.');
      setTimeout(() => setSaveError(null), 3000);
      closeDeleteModal();
    }
  };

  // Drag & Drop Functions
  const handleDragStart = (e: React.DragEvent, testimonialId: string) => {
    setDraggedItemId(testimonialId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, testimonialId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverItemId(testimonialId);
  };

  const handleDragLeave = () => {
    setDragOverItemId(null);
  };

  const handleDrop = (e: React.DragEvent, dropTargetId: string) => {
    e.preventDefault();
    
    if (!draggedItemId || draggedItemId === dropTargetId) {
      setDraggedItemId(null);
      setDragOverItemId(null);
      return;
    }
    
    // Reordenar array
    const draggedIndex = testimonialsData.findIndex(t => t.id === draggedItemId);
    const targetIndex = testimonialsData.findIndex(t => t.id === dropTargetId);
    
    const newTestimonials = [...testimonialsData];
    const [draggedItem] = newTestimonials.splice(draggedIndex, 1);
    newTestimonials.splice(targetIndex, 0, draggedItem);
    
    // Atualizar display_order
    const reorderedWithNewOrder = newTestimonials.map((t, index) => ({
      ...t,
      order: index + 1
    }));
    
    setTestimonialsData(reorderedWithNewOrder);
    setDraggedItemId(null);
    setDragOverItemId(null);
    
    setSaveSuccess('Order updated! Click Save Changes to persist.');
    setTimeout(() => setSaveSuccess(null), 4000);
  };

  const handleDragEnd = () => {
    setDraggedItemId(null);
    setDragOverItemId(null);
  };

  // Load data from Supabase on mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoadingData(true);
      try {
        // Load testimonials
        const testimonials = await getTestimonials();
        
        if (testimonials && testimonials.length > 0) {
          // Map database fields to component state format
          // Supabase fields: author_name, author_role, author_photo_url, testimonial_text, display_order, is_active
          const mappedTestimonials = testimonials.map(t => ({
            id: t.id || '',
            name: t.author_name,
            role: t.author_role || '',
            quote: t.testimonial_text,
            imageUrl: t.author_photo_url || '',
            order: t.display_order,
            isActive: t.is_active ?? true
          }));
          
          setTestimonialsData(mappedTestimonials);
          console.log('✅ Loaded', mappedTestimonials.length, 'testimonials from database');
        }
        
        // TODO: Load other sections (Hero, Stats, Cashback, etc.) when needed
        
      } catch (error) {
        console.error('Error loading homepage data:', error);
        setSaveError('Failed to load data from database. Using default values.');
        setTimeout(() => setSaveError(null), 5000);
      } finally {
        setIsLoadingData(false);
      }
    };

    loadData();
  }, []);

  // Save Functions
  const saveHeroSection = async () => {
    setIsSaving(true);
    setSaveError(null);
    try {
      // TODO: Implement Supabase save
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setSaveSuccess('Hero section saved successfully!');
      setTimeout(() => setSaveSuccess(null), 3000);
    } catch (error) {
      setSaveError('Failed to save hero section. Please try again.');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const saveStatsSection = async () => {
    setIsSaving(true);
    setSaveError(null);
    try {
      // TODO: Implement Supabase save
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSaveSuccess('Statistics saved successfully!');
      setTimeout(() => setSaveSuccess(null), 3000);
    } catch (error) {
      setSaveError('Failed to save statistics. Please try again.');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const saveTestimonials = async () => {
    console.log('💾 [1] Iniciando save dos testimonials...');
    console.log('💾 [2] Dados a serem salvos:', testimonialsData);
    
    setIsSaving(true);
    setSaveError(null);
    setSaveSuccessState(prev => ({ ...prev, testimonials: false }));
    
    try {
      // Save each testimonial
      for (const testimonial of testimonialsData) {
        console.log('💾 [3] Processando testimonial:', testimonial.id, testimonial.name);
        
        // Verifica se é novo (id começa com 'new-')
        const isNew = testimonial.id.startsWith('new-');
        
        if (isNew) {
          // CRIAR NOVO testimonial
          console.log('💾 [4] Criando novo testimonial...');
          const dbTestimonial = {
            author_name: testimonial.name,
            author_role: testimonial.role,
            testimonial_text: testimonial.quote,
            author_photo_url: testimonial.imageUrl,
            display_order: testimonial.order,
            is_active: testimonial.isActive
          };
          
          const result = await createTestimonial(dbTestimonial);
          console.log('✅ [5] Novo testimonial criado:', result);
        } else {
          // ATUALIZAR testimonial existente
          console.log('💾 [6] Atualizando testimonial existente...');
          const dbTestimonial = {
            id: testimonial.id,
            author_name: testimonial.name,
            author_role: testimonial.role,
            testimonial_text: testimonial.quote,
            author_photo_url: testimonial.imageUrl,
            display_order: testimonial.order,
            is_active: testimonial.isActive
          };
          
          const result = await updateTestimonial(dbTestimonial);
          console.log('✅ [7] Testimonial atualizado:', result);
        }
      }
      
      console.log('✅ [8] Todos testimonials salvos!');
      setSaveSuccess('Testimonials saved successfully!');
      setSaveSuccessState(prev => ({ ...prev, testimonials: true }));
      
      setTimeout(() => {
        setSaveSuccess(null);
        setSaveSuccessState(prev => ({ ...prev, testimonials: false }));
      }, 2000);
      
      // Recarregar dados do Supabase após salvar
      console.log('🔄 [9] Recarregando testimonials do Supabase...');
      const freshData = await getTestimonials();
      if (freshData && freshData.length > 0) {
        const mappedTestimonials = freshData.map(t => ({
          id: t.id || '',
          name: t.author_name,
          role: t.author_role || '',
          quote: t.testimonial_text,
          imageUrl: t.author_photo_url || '',
          order: t.display_order,
          isActive: t.is_active ?? true
        }));
        setTestimonialsData(mappedTestimonials);
        console.log('✅ [10] Testimonials recarregados:', mappedTestimonials.length);
      }
      
    } catch (error) {
      console.error('❌ [11] Erro ao salvar testimonials:', error);
      setSaveError('Failed to save testimonials. Please try again.');
      setTimeout(() => setSaveError(null), 5000);
    } finally {
      setIsSaving(false);
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
                    <span className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">Homepage Editor</span>
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
          
          {/* Success/Error Messages */}
          {saveSuccess && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-green-400 text-sm font-medium">{saveSuccess}</span>
            </div>
          )}
          
          {saveError && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3">
              <AlertCircle size={16} className="text-red-400" />
              <span className="text-red-400 text-sm font-medium">{saveError}</span>
            </div>
          )}

          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1 h-8 bg-gradient-to-b from-[#10b981] to-emerald-600 rounded-full"></div>
              <h1 className="text-3xl font-bold text-white">Edit Homepage</h1>
            </div>
            <p className="text-base text-gray-400 ml-6">Customize your homepage sections below. Changes will be reflected on your live site.</p>
          </div>

          {/* Accordion Sections */}
          <div className="space-y-4">
            
            {/* SECTION 1: Hero Section */}
            <div className="bg-[#0f1419] border border-white/[0.06] rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection('hero')}
                className="w-full flex items-center justify-between p-6 hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#10b981] to-emerald-600 flex items-center justify-center text-white text-sm font-bold">
                    1
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-white">Hero Section</h3>
                    <p className="text-xs text-gray-500">Main title, subtitle and call-to-action button</p>
                  </div>
                </div>
                {openSection === 'hero' ? (
                  <ChevronUp size={20} className="text-gray-400" />
                ) : (
                  <ChevronDown size={20} className="text-gray-400" />
                )}
              </button>
              
              {openSection === 'hero' && (
                <div className="p-6 pt-0 border-t border-white/[0.06]">
                  <div className="space-y-5 mt-6">
                    
                    {/* Title Field */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Main Title <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={heroData.title}
                        onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
                        maxLength={100}
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#10b981] transition-colors"
                        placeholder="Enter hero title..."
                      />
                      <p className="text-xs text-gray-500 mt-1">{heroData.title.length}/100 characters</p>
                    </div>

                    {/* Subtitle Field */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Subtitle <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        value={heroData.subtitle}
                        onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })}
                        maxLength={200}
                        rows={3}
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#10b981] transition-colors resize-none"
                        placeholder="Enter subtitle..."
                      />
                      <p className="text-xs text-gray-500 mt-1">{heroData.subtitle.length}/200 characters</p>
                    </div>

                    {/* Button Text */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Button Text <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={heroData.buttonText}
                        onChange={(e) => setHeroData({ ...heroData, buttonText: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#10b981] transition-colors"
                        placeholder="e.g. Explore Deals"
                      />
                    </div>

                    {/* Button Link - Dropdown */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Button Link <span className="text-red-400">*</span>
                      </label>
                      <select
                        value={heroData.buttonLink}
                        onChange={(e) => setHeroData({ ...heroData, buttonLink: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#10b981] transition-colors"
                      >
                        <option value="/">Home</option>
                        <option value="/deals">Deals</option>
                        <option value="/news">News</option>
                        <option value="/team">Team</option>
                        <option value="/contact">Contact</option>
                      </select>
                      <p className="text-xs text-gray-500 mt-1">Select the page the button should link to</p>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end pt-4 border-t border-white/[0.06]">
                      <button
                        onClick={saveHeroSection}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-6 py-3 bg-[#10b981] hover:bg-emerald-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
                      >
                        <Save size={16} />
                        {isSaving ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>

                  </div>
                </div>
              )}
            </div>

            {/* SECTION 2: Statistics */}
            <div className="bg-[#0f1419] border border-white/[0.06] rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection('stats')}
                className="w-full flex items-center justify-between p-6 hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold">
                    2
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-white">Statistics</h3>
                    <p className="text-xs text-gray-500">Three key statistics displayed on the homepage</p>
                  </div>
                </div>
                {openSection === 'stats' ? (
                  <ChevronUp size={20} className="text-gray-400" />
                ) : (
                  <ChevronDown size={20} className="text-gray-400" />
                )}
              </button>
              
              {openSection === 'stats' && (
                <div className="p-6 pt-0 border-t border-white/[0.06]">
                  <div className="space-y-6 mt-6">
                    
                    {statsData.map((stat, index) => (
                      <div key={stat.id} className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-5">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-sm font-semibold text-white">Stat {index + 1}</h4>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Label</label>
                            <input
                              type="text"
                              value={stat.label}
                              onChange={(e) => {
                                const newStats = [...statsData];
                                newStats[index].label = e.target.value;
                                setStatsData(newStats);
                              }}
                              className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#10b981] transition-colors"
                              placeholder="e.g. Number Of Players With Us"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Value</label>
                            <input
                              type="text"
                              value={stat.value}
                              onChange={(e) => {
                                const newStats = [...statsData];
                                newStats[index].value = e.target.value;
                                setStatsData(newStats);
                              }}
                              className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#10b981] transition-colors"
                              placeholder="e.g. 10,000+"
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Save Button */}
                    <div className="flex justify-end pt-4 border-t border-white/[0.06]">
                      <button
                        onClick={saveStatsSection}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-6 py-3 bg-[#10b981] hover:bg-emerald-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
                      >
                        <Save size={16} />
                        {isSaving ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>

                  </div>
                </div>
              )}
            </div>

            {/* SECTION 3: Cashback Total */}
            <div className="bg-[#0f1419] border border-white/[0.06] rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection('cashback')}
                className="w-full flex items-center justify-between p-6 hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-sm font-bold">
                    3
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-white">Cashback Total</h3>
                    <p className="text-xs text-gray-500">Total cashback paid section</p>
                  </div>
                </div>
                {openSection === 'cashback' ? (
                  <ChevronUp size={20} className="text-gray-400" />
                ) : (
                  <ChevronDown size={20} className="text-gray-400" />
                )}
              </button>
              
              {openSection === 'cashback' && (
                <div className="p-6 pt-0 border-t border-white/[0.06]">
                  <div className="space-y-5 mt-6">
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Section Title <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={cashbackData.sectionTitle}
                        onChange={(e) => setCashbackData({ ...cashbackData, sectionTitle: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#10b981] transition-colors"
                        placeholder="e.g. Rewards & Cashback Paid in 2025"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Amount (Number) <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="number"
                        value={cashbackData.amount}
                        onChange={(e) => setCashbackData({ ...cashbackData, amount: Number(e.target.value) })}
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#10b981] transition-colors"
                        placeholder="e.g. 2450000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Display Text <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={cashbackData.displayText}
                        onChange={(e) => setCashbackData({ ...cashbackData, displayText: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#10b981] transition-colors"
                        placeholder="e.g. $2,450,000+"
                      />
                      <p className="text-xs text-gray-500 mt-1">How the amount should appear on the site</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Description
                      </label>
                      <textarea
                        value={cashbackData.description}
                        onChange={(e) => setCashbackData({ ...cashbackData, description: e.target.value })}
                        rows={3}
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#10b981] transition-colors resize-none"
                        placeholder="Add description..."
                      />
                    </div>

                    <div className="flex justify-end pt-4 border-t border-white/[0.06]">
                      <button
                        onClick={async () => {
                          setIsSaving(true);
                          await new Promise(resolve => setTimeout(resolve, 1000));
                          setSaveSuccess('Cashback section saved!');
                          setTimeout(() => setSaveSuccess(null), 3000);
                          setIsSaving(false);
                        }}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-6 py-3 bg-[#10b981] hover:bg-emerald-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
                      >
                        <Save size={16} />
                        {isSaving ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>

                  </div>
                </div>
              )}
            </div>

            {/* SECTION 4: How It Works */}
            <div className="bg-[#0f1419] border border-white/[0.06] rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection('howitworks')}
                className="w-full flex items-center justify-between p-6 hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                    4
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-white">How It Works</h3>
                    <p className="text-xs text-gray-500">3-step process explanation</p>
                  </div>
                </div>
                {openSection === 'howitworks' ? (
                  <ChevronUp size={20} className="text-gray-400" />
                ) : (
                  <ChevronDown size={20} className="text-gray-400" />
                )}
              </button>
              
              {openSection === 'howitworks' && (
                <div className="p-6 pt-0 border-t border-white/[0.06]">
                  <div className="space-y-6 mt-6">
                    
                    {howItWorksData.map((step, index) => (
                      <div key={step.id} className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-5">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                            {step.stepNumber}
                          </div>
                          <h4 className="text-sm font-semibold text-white">Step {step.stepNumber}</h4>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Title</label>
                            <input
                              type="text"
                              value={step.title}
                              onChange={(e) => {
                                const newSteps = [...howItWorksData];
                                newSteps[index].title = e.target.value;
                                setHowItWorksData(newSteps);
                              }}
                              className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#10b981] transition-colors"
                              placeholder="e.g. Choose Your Deal"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Description</label>
                            <textarea
                              value={step.description}
                              onChange={(e) => {
                                const newSteps = [...howItWorksData];
                                newSteps[index].description = e.target.value;
                                setHowItWorksData(newSteps);
                              }}
                              rows={3}
                              className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#10b981] transition-colors resize-none"
                              placeholder="Enter step description..."
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="flex justify-end pt-4 border-t border-white/[0.06]">
                      <button
                        onClick={async () => {
                          setIsSaving(true);
                          await new Promise(resolve => setTimeout(resolve, 1000));
                          setSaveSuccess('How It Works section saved!');
                          setTimeout(() => setSaveSuccess(null), 3000);
                          setIsSaving(false);
                        }}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-6 py-3 bg-[#10b981] hover:bg-emerald-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
                      >
                        <Save size={16} />
                        {isSaving ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>

                  </div>
                </div>
              )}
            </div>

            {/* SECTION 5: Testimonials */}
            <div className="bg-[#0f1419] border border-white/[0.06] rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection('testimonials')}
                className="w-full flex items-center justify-between p-6 hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center text-white text-sm font-bold">
                    5
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-white">Testimonials</h3>
                    <p className="text-xs text-gray-500">Customer testimonials and reviews ({testimonialsData.length})</p>
                  </div>
                </div>
                {openSection === 'testimonials' ? (
                  <ChevronUp size={20} className="text-gray-400" />
                ) : (
                  <ChevronDown size={20} className="text-gray-400" />
                )}
              </button>
              
              {openSection === 'testimonials' && (
                <div className="p-6 pt-0 border-t border-white/[0.06]">
                  <div className="space-y-4 mt-6">
                    
                    {/* Loading State */}
                    {isLoadingData && (
                      <div className="flex items-center justify-center py-12">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-8 h-8 border-2 border-[#10b981] border-t-transparent rounded-full animate-spin"></div>
                          <p className="text-sm text-gray-400">Loading testimonials...</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Content - Only show when not loading */}
                    {!isLoadingData && (
                      <>
                        {/* Add New Testimonial Button */}
                        <button
                          onClick={() => {
                            const newTestimonial: Testimonial = {
                              id: `new-${Date.now()}`, // ID temporário para identificar novos
                              name: '',
                              role: '',
                              quote: '',
                              imageUrl: '',
                              order: testimonialsData.length + 1,
                              isActive: true
                            };
                            setTestimonialsData([...testimonialsData, newTestimonial]);
                          }}
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.12] rounded-lg transition-all text-gray-300 hover:text-white"
                        >
                          <Plus size={16} />
                          <span className="text-sm font-medium">Add New Testimonial</span>
                        </button>

                        {/* Testimonials List */}
                        {testimonialsData.map((testimonial, index) => (
                      <div 
                        key={testimonial.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, testimonial.id)}
                        onDragOver={(e) => handleDragOver(e, testimonial.id)}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, testimonial.id)}
                        onDragEnd={handleDragEnd}
                        className={`
                          bg-white/[0.02] border rounded-lg p-5 transition-all duration-200
                          ${draggedItemId === testimonial.id ? 'opacity-40 scale-95 border-[#10b981]/50' : 'border-white/[0.04]'}
                          ${dragOverItemId === testimonial.id ? 'border-[#10b981] bg-[#10b981]/5 scale-[1.02]' : ''}
                          cursor-move hover:border-white/[0.08]
                        `}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            {/* Drag Handle */}
                            <div 
                              className="text-white/30 hover:text-white/60 cursor-grab active:cursor-grabbing transition-colors"
                              title="Drag to reorder"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <circle cx="9" cy="5" r="1.5"/>
                                <circle cx="9" cy="12" r="1.5"/>
                                <circle cx="9" cy="19" r="1.5"/>
                                <circle cx="15" cy="5" r="1.5"/>
                                <circle cx="15" cy="12" r="1.5"/>
                                <circle cx="15" cy="19" r="1.5"/>
                              </svg>
                            </div>
                            <h4 className="text-sm font-semibold text-white">Testimonial #{testimonial.order}</h4>
                          </div>
                          
                          {/* Delete Button */}
                          <button
                            onClick={() => openDeleteModal(testimonial.id)}
                            className="p-1.5 hover:bg-red-500/10 rounded-lg transition-colors group"
                            title="Delete testimonial"
                          >
                            <Trash2 size={14} className="text-gray-500 group-hover:text-red-400" />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Name *</label>
                            <input
                              type="text"
                              value={testimonial.name}
                              onChange={(e) => {
                                const newTestimonials = [...testimonialsData];
                                newTestimonials[index].name = e.target.value;
                                setTestimonialsData(newTestimonials);
                              }}
                              className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#10b981] transition-colors"
                              placeholder="e.g. Ryan O'Donnell"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Role/Username</label>
                            <input
                              type="text"
                              value={testimonial.role}
                              onChange={(e) => {
                                const newTestimonials = [...testimonialsData];
                                newTestimonials[index].role = e.target.value;
                                setTestimonialsData(newTestimonials);
                              }}
                              className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#10b981] transition-colors"
                              placeholder="e.g. Moca choca89"
                            />
                          </div>
                        </div>

                        {/* Photo Upload */}
                        <div className="mb-3">
                          <label className="block text-xs font-medium text-gray-400 mb-2">Photo *</label>
                          <div className="flex items-start gap-4">
                            {/* Preview da imagem */}
                            {testimonial.imageUrl && (
                              <div className="flex-shrink-0">
                                <img 
                                  src={testimonial.imageUrl} 
                                  alt={testimonial.name || 'Preview'} 
                                  className="w-20 h-20 rounded-full object-cover border-2 border-white/[0.08]"
                                />
                              </div>
                            )}
                            
                            {/* Upload Button */}
                            <div className="flex-1">
                              <label className="relative cursor-pointer">
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    console.log('🔍 [onChange] Evento disparado!');
                                    console.log('🔍 [onChange] Files:', e.target.files);
                                    const file = e.target.files?.[0];
                                    console.log('🔍 [onChange] Arquivo selecionado:', file);
                                    if (file) {
                                      console.log('🔍 [onChange] Chamando handleTestimonialPhotoUpload...');
                                      handleTestimonialPhotoUpload(file, testimonial.id, testimonial.name);
                                    } else {
                                      console.warn('⚠️ [onChange] Nenhum arquivo selecionado!');
                                    }
                                  }}
                                  className="hidden"
                                  disabled={uploadingImage === testimonial.id}
                                />
                                <div className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2 text-sm text-gray-400 hover:bg-white/[0.05] hover:border-white/[0.10] transition-colors flex items-center justify-center gap-2">
                                  {uploadingImage === testimonial.id ? (
                                    <>
                                      <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                                      <span>Uploading...</span>
                                    </>
                                  ) : (
                                    <>
                                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                      </svg>
                                      <span>{testimonial.imageUrl ? 'Change Photo' : 'Upload Photo'}</span>
                                    </>
                                  )}
                                </div>
                              </label>
                              <p className="text-xs text-gray-500 mt-1">JPG, PNG or WEBP (max 5MB)</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-xs font-medium text-gray-400 mb-1">Quote *</label>
                          <textarea
                            value={testimonial.quote}
                            onChange={(e) => {
                              const newTestimonials = [...testimonialsData];
                              newTestimonials[index].quote = e.target.value;
                              setTestimonialsData(newTestimonials);
                            }}
                            rows={3}
                            className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#10b981] transition-colors resize-none"
                            placeholder="Enter testimonial quote..."
                          />
                        </div>
                      </div>
                    ))}

                        {testimonialsData.length === 0 && (
                          <div className="text-center py-8 text-gray-500">
                            <p className="text-sm">No testimonials yet. Click &ldquo;Add New Testimonial&rdquo; to create one.</p>
                          </div>
                        )}

                        {/* Save Button */}
                        <div className="flex justify-end pt-4 border-t border-white/[0.06]">
                          <button
                            onClick={saveTestimonials}
                            disabled={isSaving}
                            className="flex items-center gap-2 px-6 py-3 bg-[#10b981] hover:bg-emerald-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all"
                          >
                            {isSaving ? (
                              <>
                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                </svg>
                                Saving...
                              </>
                            ) : saveSuccessState.testimonials ? (
                              <>
                                <svg 
                                  className="w-4 h-4 animate-bounce" 
                                  fill="none" 
                                  viewBox="0 0 24 24" 
                                  stroke="currentColor"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                                Saved!
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

            {/* SECTION 6: FAQ */}
            <div className="bg-[#0f1419] border border-white/[0.06] rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection('faq')}
                className="w-full flex items-center justify-between p-6 hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center text-white text-sm font-bold">
                    6
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-white">FAQ Section</h3>
                    <p className="text-xs text-gray-500">Frequently asked questions ({faqsData.length})</p>
                  </div>
                </div>
                {openSection === 'faq' ? (
                  <ChevronUp size={20} className="text-gray-400" />
                ) : (
                  <ChevronDown size={20} className="text-gray-400" />
                )}
              </button>
              
              {openSection === 'faq' && (
                <div className="p-6 pt-0 border-t border-white/[0.06]">
                  <div className="space-y-4 mt-6">
                    
                    {/* Add New FAQ Button */}
                    <button
                      onClick={() => {
                        const newFAQ: FAQ = {
                          id: Date.now().toString(),
                          question: '',
                          answer: '',
                          order: faqsData.length + 1,
                          isActive: true
                        };
                        setFaqsData([...faqsData, newFAQ]);
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.12] rounded-lg transition-all text-gray-300 hover:text-white"
                    >
                      <Plus size={16} />
                      <span className="text-sm font-medium">Add New FAQ</span>
                    </button>

                    {/* FAQs List */}
                    {faqsData.map((faq, index) => (
                      <div key={faq.id} className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-5">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <GripVertical size={16} className="text-gray-600 cursor-move" />
                            <h4 className="text-sm font-semibold text-white">FAQ #{index + 1}</h4>
                          </div>
                          <button
                            onClick={() => {
                              if (confirm('Are you sure you want to delete this FAQ?')) {
                                setFaqsData(faqsData.filter((_, i) => i !== index));
                              }
                            }}
                            className="p-1.5 hover:bg-red-500/10 rounded-lg transition-colors group"
                          >
                            <Trash2 size={14} className="text-gray-500 group-hover:text-red-400" />
                          </button>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Question *</label>
                            <input
                              type="text"
                              value={faq.question}
                              onChange={(e) => {
                                const newFAQs = [...faqsData];
                                newFAQs[index].question = e.target.value;
                                setFaqsData(newFAQs);
                              }}
                              className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#10b981] transition-colors"
                              placeholder="e.g. Do I Have To Pay For This Service?"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Answer *</label>
                            <textarea
                              value={faq.answer}
                              onChange={(e) => {
                                const newFAQs = [...faqsData];
                                newFAQs[index].answer = e.target.value;
                                setFaqsData(newFAQs);
                              }}
                              rows={4}
                              className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#10b981] transition-colors resize-none"
                              placeholder="Enter answer..."
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    {faqsData.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <p className="text-sm">No FAQs yet. Click &ldquo;Add New FAQ&rdquo; to create one.</p>
                      </div>
                    )}

                    <div className="flex justify-end pt-4 border-t border-white/[0.06]">
                      <button
                        onClick={async () => {
                          setIsSaving(true);
                          await new Promise(resolve => setTimeout(resolve, 1000));
                          setSaveSuccess('FAQs saved successfully!');
                          setTimeout(() => setSaveSuccess(null), 3000);
                          setIsSaving(false);
                        }}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-6 py-3 bg-[#10b981] hover:bg-emerald-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
                      >
                        <Save size={16} />
                        {isSaving ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>

                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Info Box */}
          <div className="mt-8 p-5 bg-blue-500/10 border border-blue-500/20 rounded-xl">
            <div className="flex gap-3">
              <AlertCircle size={20} className="text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-blue-400 mb-1">Homepage Editor Ready</h4>
                <p className="text-xs text-blue-300/80 leading-relaxed">
                  All 6 homepage sections are now editable: Hero, Statistics, Cashback Total, How It Works, Testimonials, and FAQ. 
                  Changes are currently saved locally. Supabase integration will be added next to persist changes to the database.
                </p>
              </div>
            </div>
          </div>

        </main>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#1a1f2e] border border-white/[0.08] rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Delete Testimonial</h3>
                <p className="text-sm text-white/60">This action cannot be undone</p>
              </div>
            </div>
            
            {/* Content */}
            <p className="text-white/80 mb-6">
              Are you sure you want to delete this testimonial? This will permanently remove it from your website.
            </p>
            
            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={closeDeleteModal}
                className="flex-1 px-4 py-2.5 bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.1] rounded-lg text-white transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 rounded-lg text-white transition-colors font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
}

