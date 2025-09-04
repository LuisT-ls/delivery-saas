import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import { Restaurant, RestaurantFormData } from '@/types/restaurant';
import { secureLog } from './utils';

export function useRestaurant(userId: string | undefined) {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carregar dados do restaurante
  const loadRestaurant = async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    try {
      const restaurantRef = doc(db, 'restaurants', userId);
      const restaurantDoc = await getDoc(restaurantRef);
      
      if (restaurantDoc.exists()) {
        const data = restaurantDoc.data() as Restaurant;
        setRestaurant({ ...data, id: restaurantDoc.id });
        secureLog('Restaurante carregado com sucesso', { id: restaurantDoc.id });
      } else {
        setRestaurant(null);
        secureLog('Nenhum restaurante encontrado para o usuário', { userId });
      }
    } catch (err) {
      console.error('Erro ao carregar restaurante:', err);
      setError('Erro ao carregar dados do restaurante');
    } finally {
      setLoading(false);
    }
  };

  // Criar novo restaurante
  const createRestaurant = async (formData: RestaurantFormData): Promise<boolean> => {
    if (!userId) {
      setError('Usuário não autenticado');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const restaurantRef = doc(db, 'restaurants', userId);
      
      // Garantir que todos os campos obrigatórios estejam presentes
      const restaurantData: Omit<Restaurant, 'id'> = {
        name: formData.name.trim(),
        address: formData.address.trim(),
        phone: formData.phone.trim(),
        category: formData.category.trim(),
        deliveryFee: formData.deliveryFee,
        deliveryTime: formData.deliveryTime.trim(),
        rating: formData.rating,
        image: formData.image || '',
        ownerId: userId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      secureLog('Tentativa de criação de restaurante', { 
        userId, 
        name: restaurantData.name,
        address: restaurantData.address,
        phone: restaurantData.phone
      });

      await setDoc(restaurantRef, restaurantData);
      
      // Atualizar estado local
      setRestaurant({ ...restaurantData, id: userId });
      secureLog('Restaurante criado com sucesso', { id: userId });
      return true;
    } catch (err: any) {
      console.error('Erro ao criar restaurante:', err);
      
      // Tratamento específico de erros do Firestore
      if (err.code === 'permission-denied') {
        setError('Permissão negada. Verifique se você está logado e tente novamente.');
      } else if (err.code === 'unavailable') {
        setError('Serviço temporariamente indisponível. Tente novamente em alguns minutos.');
      } else {
        setError(`Erro ao criar restaurante: ${err.message || 'Erro desconhecido'}`);
      }
      
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Atualizar restaurante existente
  const updateRestaurant = async (formData: RestaurantFormData): Promise<boolean> => {
    if (!userId || !restaurant) {
      setError('Restaurante não encontrado');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const restaurantRef = doc(db, 'restaurants', userId);
      
      const updateData = {
        name: formData.name.trim(),
        address: formData.address.trim(),
        phone: formData.phone.trim(),
        category: formData.category.trim(),
        deliveryFee: formData.deliveryFee,
        deliveryTime: formData.deliveryTime.trim(),
        rating: formData.rating,
        image: formData.image || '',
        updatedAt: serverTimestamp()
      };

      secureLog('Tentativa de atualização de restaurante', { 
        id: userId, 
        updates: updateData 
      });

      await updateDoc(restaurantRef, updateData);

      // Atualizar estado local
      setRestaurant(prev => prev ? { ...prev, ...updateData } : null);
      secureLog('Restaurante atualizado com sucesso', { id: userId });
      return true;
    } catch (err: any) {
      console.error('Erro ao atualizar restaurante:', err);
      
      // Tratamento específico de erros do Firestore
      if (err.code === 'permission-denied') {
        setError('Permissão negada. Verifique se você está logado e tente novamente.');
      } else if (err.code === 'unavailable') {
        setError('Serviço temporariamente indisponível. Tente novamente em alguns minutos.');
      } else {
        setError(`Erro ao atualizar restaurante: ${err.message || 'Erro desconhecido'}`);
      }
      
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Carregar restaurante quando userId mudar
  useEffect(() => {
    if (userId) {
      loadRestaurant();
    }
  }, [userId]);

  return {
    restaurant,
    loading,
    error,
    createRestaurant,
    updateRestaurant,
    loadRestaurant
  };
}
