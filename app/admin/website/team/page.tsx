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
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { 
  getTeamMembers, 
  updateTeamMember, 
  uploadTeamPhoto,
  updateTeamMembersOrder,
  type TeamMember 
} from '@/lib/supabase/team';

export default function TeamManagementPage() {
  // Accordion State
  const [openSection, setOpenSection] = useState<string | null>(null);
  
  // Loading & Save States
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isSaving, setIsSaving] = useState<Record<string, boolean>>({});
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccessState, setSaveSuccessState] = useState<Record<string, boolean>>({});
  const [uploadingPhoto, setUploadingPhoto] = useState<string | null>(null);
  
  // Drag & Drop States
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [dragOverItemId, setDragOverItemId] = useState<string | null>(null);
  
  // Team Data
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [formData, setFormData] = useState<Record<string, { name: string; role: string; bio: string }>>({});
  const [newPhotos, setNewPhotos] = useState<Record<string, File | null>>({});
  const [photoPreviews, setPhotoPreviews] = useState<Record<string, string | null>>({});

  // Toggle Accordion Section
  const toggleSection = (memberId: string) => {
    setOpenSection(openSection === memberId ? null : memberId);
  };

  // Load Team Members
  useEffect(() => {
    loadTeamMembers();
  }, []);

  async function loadTeamMembers() {
    setIsLoadingData(true);
    
    try {
      console.log('📥 Loading team members from Supabase...');
      const { data, error } = await getTeamMembers();
      
      if (error) {
        console.error('❌ Error loading team members:', error);
        setSaveError('Failed to load team members');
        return;
      }

      if (data) {
        setTeamMembers(data);
        
        // Initialize form data for each member
        const initialFormData: Record<string, { name: string; role: string; bio: string }> = {};
        data.forEach((member) => {
          initialFormData[member.id] = {
            name: member.name,
            role: member.role,
            bio: member.bio,
          };
        });
        setFormData(initialFormData);
        
        console.log('✅ Loaded', data.length, 'team members');
      }
    } catch (error) {
      console.error('❌ Failed to load team members:', error);
      setSaveError('Failed to load team members');
    } finally {
      setIsLoadingData(false);
    }
  }

  // Handle Form Change
  function handleFormChange(memberId: string, field: 'name' | 'role' | 'bio', value: string) {
    setFormData((prev) => ({
      ...prev,
      [memberId]: {
        ...prev[memberId],
        [field]: value,
      },
    }));
  }

  // Handle Photo Selection
  function handlePhotoSelect(memberId: string, file: File | null) {
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

    setNewPhotos((prev) => ({
      ...prev,
      [memberId]: file,
    }));

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreviews((prev) => ({
        ...prev,
        [memberId]: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
    
    setSaveSuccess('Photo selected. Click Save Changes to upload.');
    setTimeout(() => setSaveSuccess(null), 3000);
  }

  // Handle Photo Removal
  function handlePhotoRemove(memberId: string) {
    // Clear the photo preview if exists
    setPhotoPreviews((prev) => ({
      ...prev,
      [memberId]: null,
    }));
    
    // Clear new photo selection if exists
    setNewPhotos((prev) => ({
      ...prev,
      [memberId]: null,
    }));
    
    // Update team member data to remove photo
    setTeamMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, photo_url: null } : m))
    );
    
    setSaveSuccess('Photo removed. Click Save Changes to persist.');
    setTimeout(() => setSaveSuccess(null), 3000);
  }

  // Drag & Drop Functions
  const handleDragStart = (e: React.DragEvent, memberId: string) => {
    setDraggedItemId(memberId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, memberId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverItemId(memberId);
  };

  const handleDragLeave = () => {
    setDragOverItemId(null);
  };

  const handleDrop = async (e: React.DragEvent, dropTargetId: string) => {
    e.preventDefault();
    
    if (!draggedItemId || draggedItemId === dropTargetId) {
      setDraggedItemId(null);
      setDragOverItemId(null);
      return;
    }
    
    // Reordenar array
    const draggedIndex = teamMembers.findIndex(m => m.id === draggedItemId);
    const targetIndex = teamMembers.findIndex(m => m.id === dropTargetId);
    
    const newMembers = [...teamMembers];
    const [draggedItem] = newMembers.splice(draggedIndex, 1);
    newMembers.splice(targetIndex, 0, draggedItem);
    
    // Atualizar display_order
    const reorderedWithNewOrder = newMembers.map((m, index) => ({
      ...m,
      display_order: index + 1
    }));
    
    setTeamMembers(reorderedWithNewOrder);
    setDraggedItemId(null);
    setDragOverItemId(null);
    
    // Salvar nova ordem no banco automaticamente
    try {
      const orderUpdates = reorderedWithNewOrder.map((member) => ({
        id: member.id,
        display_order: member.display_order,
      }));

      const { success } = await updateTeamMembersOrder(orderUpdates);
      
      if (success) {
        setSaveSuccess('Order updated successfully!');
        setTimeout(() => setSaveSuccess(null), 3000);
      } else {
        throw new Error('Failed to update order');
      }
    } catch (error) {
      console.error('Error updating order:', error);
      setSaveError('Failed to update order');
      setTimeout(() => setSaveError(null), 5000);
    }
  };

  const handleDragEnd = () => {
    setDraggedItemId(null);
    setDragOverItemId(null);
  };

  // Save Member Data
  async function saveMember(memberId: string) {
    const member = teamMembers.find((m) => m.id === memberId);
    if (!member) return;

    const data = formData[memberId];
    const newPhoto = newPhotos[memberId];

    // Validate
    if (!data.name.trim() || !data.role.trim() || !data.bio.trim()) {
      setSaveError('All fields are required');
      setTimeout(() => setSaveError(null), 5000);
      return;
    }

    setIsSaving((prev) => ({ ...prev, [memberId]: true }));
    setSaveError(null);
    setSaveSuccessState((prev) => ({ ...prev, [memberId]: false }));

    try {
      let photoUrl = member.photo_url;

      // Upload new photo if selected
      if (newPhoto) {
        console.log('📸 Uploading photo for', member.name);
        setUploadingPhoto(memberId);
        
        const { url, error: uploadError } = await uploadTeamPhoto(
          newPhoto,
          memberId,
          member.photo_url
        );

        if (uploadError || !url) {
          throw new Error('Failed to upload photo');
        }

        photoUrl = url;
        console.log('✅ Photo uploaded:', url);
      }

      // Update member data
      console.log('💾 Saving member data for', member.name);
      const { data: updatedMember, error } = await updateTeamMember(memberId, {
        name: data.name,
        role: data.role,
        bio: data.bio,
        photo_url: photoUrl,
      });

      if (error || !updatedMember) {
        throw new Error('Failed to save changes');
      }

      // Update local state
      setTeamMembers((prev) =>
        prev.map((m) => (m.id === memberId ? updatedMember : m))
      );

      // Clear photo preview
      setNewPhotos((prev) => ({ ...prev, [memberId]: null }));
      setPhotoPreviews((prev) => ({ ...prev, [memberId]: null }));

      // Show success
      setSaveSuccess(`${member.name}'s profile saved successfully!`);
      setSaveSuccessState((prev) => ({ ...prev, [memberId]: true }));

      setTimeout(() => {
        setSaveSuccess(null);
        setSaveSuccessState((prev) => ({ ...prev, [memberId]: false }));
      }, 2000);

      console.log('✅ Member saved successfully');
    } catch (error) {
      console.error('❌ Save error:', error);
      setSaveError(error instanceof Error ? error.message : 'Failed to save changes');
      setTimeout(() => setSaveError(null), 5000);
    } finally {
      setIsSaving((prev) => ({ ...prev, [memberId]: false }));
      setUploadingPhoto(null);
    }
  }

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
                    <span className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">Team Editor</span>
                    <span className="text-xs text-gray-600 font-medium">Website Content Management</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Preview Button */}
                <a 
                  href="/team"
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2.5 bg-gray-900/50 hover:bg-gray-800/50 border border-gray-800 hover:border-gray-700 rounded-lg transition-all duration-300 text-gray-300 hover:text-white group"
                >
                  <Eye size={16} />
                  <span className="hidden sm:inline text-sm font-medium">Preview Team Page</span>
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
              <h1 className="text-3xl font-bold text-white">Edit Team Members</h1>
            </div>
            <p className="text-base text-gray-400 ml-6 mb-4">Manage your team member profiles, photos and information below.</p>
            
            {/* Drag & Drop Info */}
            <div className="ml-6 bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 flex items-start gap-2">
              <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-blue-400">
                <strong>Tip:</strong> Drag and drop cards to reorder team members. Changes save automatically.
              </p>
            </div>
          </div>

          {/* Loading State */}
          {isLoadingData ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-[#10b981] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm text-gray-400">Loading team members...</p>
              </div>
            </div>
          ) : (
            /* Accordion Sections */
            <div className="space-y-4">
              {teamMembers.map((member, index) => (
                <div 
                  key={member.id} 
                  draggable
                  onDragStart={(e) => handleDragStart(e, member.id)}
                  onDragOver={(e) => handleDragOver(e, member.id)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, member.id)}
                  onDragEnd={handleDragEnd}
                  className={`
                    bg-[#0f1419] border rounded-xl overflow-hidden transition-all duration-200
                    ${draggedItemId === member.id ? 'opacity-40 scale-95 border-[#10b981]/50' : 'border-white/[0.06]'}
                    ${dragOverItemId === member.id ? 'border-[#10b981] bg-[#10b981]/5 scale-[1.02]' : ''}
                    cursor-move
                  `}
                >
                  <button
                    onClick={() => toggleSection(member.id)}
                    className="w-full flex items-center justify-between p-6 hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {/* Drag Handle Icon */}
                      <div className="text-gray-500 hover:text-gray-300 transition-colors cursor-grab active:cursor-grabbing">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 6h.01M8 12h.01M8 18h.01M16 6h.01M16 12h.01M16 18h.01" />
                        </svg>
                      </div>
                      
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#10b981] to-emerald-600 flex items-center justify-center text-white text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="flex items-center gap-4">
                        {/* Photo Preview in Header */}
                        {member.photo_url ? (
                          <img
                            src={member.photo_url}
                            alt={member.name}
                            className="w-10 h-10 rounded-full object-cover border-2 border-white/10"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-700/50 border-2 border-white/10"></div>
                        )}
                        <div className="text-left">
                          <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                          <p className="text-xs text-gray-500">{member.role}</p>
                        </div>
                      </div>
                    </div>
                    {openSection === member.id ? (
                      <ChevronUp size={20} className="text-gray-400" />
                    ) : (
                      <ChevronDown size={20} className="text-gray-400" />
                    )}
                  </button>
                  
                  {openSection === member.id && (
                    <div className="p-6 pt-0 border-t border-white/[0.06]">
                      <div className="space-y-5 mt-6">
                        
                        {/* Current Photo */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-3">
                            Profile Photo
                          </label>
                          <div className="flex items-start gap-6">
                            {/* Photo Preview */}
                            <div className="flex-shrink-0">
                              {photoPreviews[member.id] ? (
                                <div className="relative">
                                  <img
                                    src={photoPreviews[member.id]!}
                                    alt="Preview"
                                    className="w-32 h-32 rounded-lg object-cover border-2 border-yellow-500/50"
                                  />
                                  <div className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                                    New
                                  </div>
                                </div>
                              ) : member.photo_url ? (
                                <img
                                  src={member.photo_url}
                                  alt={member.name}
                                  className="w-32 h-32 rounded-lg object-cover border-2 border-white/10"
                                />
                              ) : (
                                <div className="w-32 h-32 rounded-lg bg-gray-800/50 border-2 border-white/10"></div>
                              )}
                            </div>
                            
                            {/* Upload Button */}
                            <div className="flex-1">
                              <input
                                id={`photo-input-${member.id}`}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handlePhotoSelect(member.id, file);
                                }}
                              />
                              <div className="flex items-center gap-3">
                                <button
                                  type="button"
                                  onClick={() => document.getElementById(`photo-input-${member.id}`)?.click()}
                                  disabled={uploadingPhoto === member.id}
                                  className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-gray-300 hover:text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {uploadingPhoto === member.id ? (
                                    <>
                                      <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                                      <span className="text-sm font-medium">Uploading...</span>
                                    </>
                                  ) : (
                                    <>
                                      <Upload size={16} />
                                      <span className="text-sm font-medium">Change Photo</span>
                                    </>
                                  )}
                                </button>
                                
                                {/* Remove Photo Button - Only show if there's a photo */}
                                {(member.photo_url || photoPreviews[member.id]) && (
                                  <button
                                    type="button"
                                    onClick={() => handlePhotoRemove(member.id)}
                                    disabled={uploadingPhoto === member.id}
                                    className="flex items-center gap-2 px-4 py-2.5 bg-red-950/30 hover:bg-red-950/50 border border-red-900/30 hover:border-red-900/50 text-red-400 hover:text-red-300 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    <span className="text-sm font-medium">Remove Photo</span>
                                  </button>
                                )}
                              </div>
                              <p className="text-xs text-gray-500 mt-2">
                                JPG, PNG or WEBP (max 5MB)
                              </p>
                              {photoPreviews[member.id] && (
                                <p className="text-xs text-yellow-500 mt-2 flex items-center gap-1">
                                  <AlertCircle size={12} />
                                  New photo selected. Click Save Changes to upload.
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Name Field */}
                        <div>
                          <label htmlFor={`name-${member.id}`} className="block text-sm font-semibold text-gray-300 mb-2">
                            Name
                          </label>
                          <input
                            id={`name-${member.id}`}
                            type="text"
                            value={formData[member.id]?.name || ''}
                            onChange={(e) => handleFormChange(member.id, 'name', e.target.value)}
                            placeholder="e.g. Andy Smith"
                            maxLength={100}
                            className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white text-sm placeholder-white/40 focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
                          />
                          <p className="text-xs text-white/40 mt-1">
                            {formData[member.id]?.name?.length || 0}/100 characters
                          </p>
                        </div>

                        {/* Role Field */}
                        <div>
                          <label htmlFor={`role-${member.id}`} className="block text-sm font-semibold text-gray-300 mb-2">
                            Job Title / Role
                          </label>
                          <input
                            id={`role-${member.id}`}
                            type="text"
                            value={formData[member.id]?.role || ''}
                            onChange={(e) => handleFormChange(member.id, 'role', e.target.value)}
                            placeholder="e.g. Director"
                            maxLength={100}
                            className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white text-sm placeholder-white/40 focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
                          />
                          <p className="text-xs text-white/40 mt-1">
                            {formData[member.id]?.role?.length || 0}/100 characters
                          </p>
                        </div>

                        {/* Bio Field */}
                        <div>
                          <label htmlFor={`bio-${member.id}`} className="block text-sm font-semibold text-gray-300 mb-2">
                            Biography
                          </label>
                          <textarea
                            id={`bio-${member.id}`}
                            value={formData[member.id]?.bio || ''}
                            onChange={(e) => handleFormChange(member.id, 'bio', e.target.value)}
                            placeholder="Brief description about this team member..."
                            maxLength={500}
                            rows={5}
                            className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white text-sm placeholder-white/40 focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all resize-none"
                          />
                          <p className="text-xs text-white/40 mt-1">
                            {formData[member.id]?.bio?.length || 0}/500 characters
                          </p>
                        </div>

                        {/* Save Button */}
                        <div className="flex items-center justify-end pt-4 border-t border-white/[0.06]">
                          <button
                            onClick={() => saveMember(member.id)}
                            disabled={
                              isSaving[member.id] || 
                              !formData[member.id]?.name?.trim() || 
                              !formData[member.id]?.role?.trim() || 
                              !formData[member.id]?.bio?.trim()
                            }
                            className="flex items-center gap-2 px-6 py-3 bg-[#10b981] hover:bg-emerald-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all"
                          >
                            {isSaving[member.id] ? (
                              <>
                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                </svg>
                                Saving...
                              </>
                            ) : saveSuccessState[member.id] ? (
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
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
