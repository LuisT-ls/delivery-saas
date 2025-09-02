import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import { Restaurant, RestaurantFormData } from '@/types/restaurant';

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
      } else {
        setRestaurant(null);
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
      const restaurantData: Omit<Restaurant, 'id'> = {
        ...formData,
        ownerId: userId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      await setDoc(restaurantRef, restaurantData);
      
      // Atualizar estado local
      setRestaurant({ ...restaurantData, id: userId });
      return true;
    } catch (err) {
      console.error('Erro ao criar restaurante:', err);
      setError('Erro ao criar restaurante');
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
      await updateDoc(restaurantRef, {
        ...formData,
        updatedAt: serverTimestamp()
      });

      // Atualizar estado local
      setRestaurant(prev => prev ? { ...prev, ...formData } : null);
      return true;
    } catch (err) {
      console.error('Erro ao atualizar restaurante:', err);
      setError('Erro ao atualizar restaurante');
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
