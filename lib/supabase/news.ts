import { supabase } from './client';

// ============================================
// NEWS IMAGE UPLOAD & DELETE
// ============================================

/**
 * Upload news featured image to Supabase Storage
 * @param file - The image file to upload
 * @param articleTitle - Title of the article (used for filename)
 * @returns Public URL of the uploaded image
 */
export async function uploadNewsImage(
  file: File,
  articleTitle: string
): Promise<string> {
  try {
    console.log('🔧 [uploadNewsImage] 📸 Iniciando upload...');
    console.log('🔧 [uploadNewsImage] 📁 Arquivo:', {
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      type: file.type
    });
    console.log('🔧 [uploadNewsImage] 📰 Artigo:', articleTitle);
    
    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      console.error('❌ [uploadNewsImage] Arquivo muito grande:', file.size);
      throw new Error('Image size must be less than 5MB');
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      console.error('❌ [uploadNewsImage] Tipo inválido:', file.type);
      throw new Error('Only JPG, PNG and WEBP images are allowed');
    }
    
    console.log('✅ [uploadNewsImage] Validação OK');

    // Generate unique filename
    const timestamp = Date.now();
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const slug = articleTitle
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^a-z0-9]+/g, '-') // Replace special chars with dash
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing dashes

    const fileName = `${slug}-${timestamp}.${fileExt}`;
    console.log('🔧 [uploadNewsImage] 📝 Nome do arquivo:', fileName);

    // Upload to Supabase Storage
    console.log('🔧 [uploadNewsImage] ⬆️ Fazendo upload para Supabase Storage (bucket: news-images)...');
    const { data: uploadData, error } = await supabase.storage
      .from('news-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('❌ [uploadNewsImage] Erro no upload:', error);
      throw error;
    }
    
    console.log('✅ [uploadNewsImage] Upload bem-sucedido!', uploadData);

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from('news-images').getPublicUrl(fileName);

    console.log('✅ [uploadNewsImage] 🌐 URL pública:', publicUrl);
    return publicUrl;
  } catch (error) {
    console.error('❌ [uploadNewsImage] Error uploading news image:', error);
    
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
 * Delete news image from Supabase Storage
 * @param imageUrl - The full URL of the image to delete
 * @returns boolean indicating success
 */
export async function deleteNewsImage(imageUrl: string): Promise<boolean> {
  try {
    console.log('🔧 [deleteNewsImage] 🗑️ Iniciando delete...');
    console.log('🔧 [deleteNewsImage] 🔗 URL:', imageUrl);
    
    // Extract filename from URL
    if (!imageUrl.includes('news-images')) {
      console.warn('⚠️ [deleteNewsImage] URL não é do bucket news-images, abortando');
      return false; // Not a storage URL
    }

    const fileName = imageUrl.split('/').pop();
    if (!fileName) {
      console.error('❌ [deleteNewsImage] Não foi possível extrair o nome do arquivo');
      return false;
    }

    console.log('🔧 [deleteNewsImage] 📝 Nome do arquivo extraído:', fileName);
    console.log('🔧 [deleteNewsImage] 🗑️ Deletando do Supabase Storage...');

    const { error } = await supabase.storage
      .from('news-images')
      .remove([fileName]);

    if (error) {
      console.error('❌ [deleteNewsImage] Erro ao deletar:', error);
      throw error;
    }
    
    console.log('✅ [deleteNewsImage] Arquivo deletado com sucesso!');
    return true;
  } catch (error) {
    console.error('❌ [deleteNewsImage] Error deleting news image:', error);
    return false;
  }
}

// ============================================
// NEWS CONTENT IMAGE UPLOAD & DELETE
// ============================================

/**
 * Upload news content image to Supabase Storage (for banners, galleries, inline images)
 * @param file - The image file to upload
 * @param description - Description for filename (e.g., "banner-image", "gallery-1", "content-image")
 * @returns Public URL of the uploaded image
 */
export async function uploadNewsContentImage(
  file: File,
  description: string
): Promise<string> {
  try {
    console.log('🔧 [uploadNewsContentImage] 📸 Iniciando upload...');
    console.log('🔧 [uploadNewsContentImage] 📁 Arquivo:', {
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      type: file.type
    });
    console.log('🔧 [uploadNewsContentImage] 📝 Descrição:', description);
    
    // Validate file size (10MB max - larger than featured images)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      console.error('❌ [uploadNewsContentImage] Arquivo muito grande:', file.size);
      throw new Error('Image size must be less than 10MB');
    }

    // Validate file type (including GIF for content)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      console.error('❌ [uploadNewsContentImage] Tipo inválido:', file.type);
      throw new Error('Only JPG, PNG, WEBP and GIF images are allowed');
    }
    
    console.log('✅ [uploadNewsContentImage] Validação OK');

    // Generate unique filename
    const timestamp = Date.now();
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const slug = description
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^a-z0-9]+/g, '-') // Replace special chars with dash
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing dashes

    const fileName = `${slug}-${timestamp}.${fileExt}`;
    console.log('🔧 [uploadNewsContentImage] 📝 Nome do arquivo:', fileName);

    // Upload to Supabase Storage
    console.log('🔧 [uploadNewsContentImage] ⬆️ Fazendo upload para Supabase Storage (bucket: news-content)...');
    const { data: uploadData, error } = await supabase.storage
      .from('news-content')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('❌ [uploadNewsContentImage] Erro no upload:', error);
      throw error;
    }
    
    console.log('✅ [uploadNewsContentImage] Upload bem-sucedido!', uploadData);

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from('news-content').getPublicUrl(fileName);

    console.log('✅ [uploadNewsContentImage] 🌐 URL pública:', publicUrl);
    return publicUrl;
  } catch (error) {
    console.error('❌ [uploadNewsContentImage] Error uploading content image:', error);
    
    // Provide user-friendly error messages
    if (error instanceof Error) {
      if (error.message?.includes('size')) {
        throw new Error('Image is too large. Maximum size is 10MB.');
      } else if (error.message?.includes('allowed')) {
        throw new Error('Invalid file type. Use JPG, PNG, WEBP or GIF.');
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
 * Delete news content image from Supabase Storage
 * @param imageUrl - The full URL of the image to delete
 * @returns boolean indicating success
 */
export async function deleteNewsContentImage(imageUrl: string): Promise<boolean> {
  try {
    console.log('🔧 [deleteNewsContentImage] 🗑️ Iniciando delete...');
    console.log('🔧 [deleteNewsContentImage] 🔗 URL:', imageUrl);
    
    // Extract filename from URL
    if (!imageUrl.includes('news-content')) {
      console.warn('⚠️ [deleteNewsContentImage] URL não é do bucket news-content, abortando');
      return false; // Not a storage URL
    }

    const fileName = imageUrl.split('/').pop();
    if (!fileName) {
      console.error('❌ [deleteNewsContentImage] Não foi possível extrair o nome do arquivo');
      return false;
    }

    console.log('🔧 [deleteNewsContentImage] 📝 Nome do arquivo extraído:', fileName);
    console.log('🔧 [deleteNewsContentImage] 🗑️ Deletando do Supabase Storage...');

    const { error } = await supabase.storage
      .from('news-content')
      .remove([fileName]);

    if (error) {
      console.error('❌ [deleteNewsContentImage] Erro ao deletar:', error);
      throw error;
    }
    
    console.log('✅ [deleteNewsContentImage] Arquivo deletado com sucesso!');
    return true;
  } catch (error) {
    console.error('❌ [deleteNewsContentImage] Error deleting content image:', error);
    return false;
  }
}

