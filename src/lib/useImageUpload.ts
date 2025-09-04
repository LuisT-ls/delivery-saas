import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

export interface UploadResult {
  url: string;
  path: string;
}

export function useImageUpload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (
    file: File,
    path: string,
    onProgress?: (progress: number) => void
  ): Promise<UploadResult | null> => {
    if (!file) {
      setError('Nenhum arquivo selecionado');
      return null;
    }

    // Verificar se o Firebase Storage está configurado corretamente
    if (!storage) {
      setError('Firebase Storage não está configurado. Verifique as configurações.');
      return null;
    }

    // Verificar se estamos usando configurações mock em produção
    const storageUrl = storage.app.options.storageBucket;
    if (storageUrl && storageUrl.includes('mock-project')) {
      setError('Firebase não configurado em produção. Configure as variáveis de ambiente no Vercel.');
      return null;
    }

    // Validar tipo de arquivo
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      setError('Tipo de arquivo não suportado. Use JPG, PNG ou SVG.');
      return null;
    }

    // Validar tamanho do arquivo (máximo 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setError('Arquivo muito grande. Tamanho máximo: 5MB');
      return null;
    }

    setUploading(true);
    setError(null);

    try {
      // Criar referência no Storage
      const storageRef = ref(storage, path);
      
      // Fazer upload do arquivo
      const snapshot = await uploadBytes(storageRef, file);
      
      // Obter URL de download
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return {
        url: downloadURL,
        path: snapshot.ref.fullPath
      };
    } catch (err: any) {
      console.error('Erro no upload:', err);
      setError(`Erro no upload: ${err.message || 'Erro desconhecido'}`);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const uploadRestaurantImage = async (
    file: File,
    restaurantId: string,
    onProgress?: (progress: number) => void
  ): Promise<UploadResult | null> => {
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const fileName = `restaurant-${restaurantId}-${timestamp}.${fileExtension}`;
    const path = `restaurants/${restaurantId}/${fileName}`;
    
    return uploadImage(file, path, onProgress);
  };

  const uploadMenuItemImage = async (
    file: File,
    restaurantId: string,
    menuItemId: string,
    onProgress?: (progress: number) => void
  ): Promise<UploadResult | null> => {
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const fileName = `menu-item-${menuItemId}-${timestamp}.${fileExtension}`;
    const path = `restaurants/${restaurantId}/menu/${fileName}`;
    
    return uploadImage(file, path, onProgress);
  };

  return {
    uploading,
    error,
    uploadImage,
    uploadRestaurantImage,
    uploadMenuItemImage
  };
}
