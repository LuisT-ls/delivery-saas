import { useState, useEffect } from 'react';
import { 
  collection, 
  getDocs, 
  query,
  orderBy,
  where
} from 'firebase/firestore';
import { db } from './firebase';
import { Restaurant } from '@/types/restaurant';
import { secureLog } from './utils';

export function useRestaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carregar todos os restaurantes
  const loadRestaurants = async () => {
    setLoading(true);
    setError(null);

    try {
      const restaurantsRef = collection(db, 'restaurants');
      const q = query(restaurantsRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const restaurantsList: Restaurant[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Omit<Restaurant, 'id'>;
        restaurantsList.push({ ...data, id: doc.id });
      });
      
      setRestaurants(restaurantsList);
      secureLog('Restaurantes carregados com sucesso', { 
        count: restaurantsList.length 
      });
    } catch (err) {
      console.error('Erro ao carregar restaurantes:', err);
      setError('Erro ao carregar restaurantes');
    } finally {
      setLoading(false);
    }
  };

  // Carregar restaurantes por categoria
  const loadRestaurantsByCategory = async (category: string) => {
    setLoading(true);
    setError(null);

    try {
      const restaurantsRef = collection(db, 'restaurants');
      const q = query(
        restaurantsRef, 
        where('category', '==', category),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      const restaurantsList: Restaurant[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Omit<Restaurant, 'id'>;
        restaurantsList.push({ ...data, id: doc.id });
      });
      
      setRestaurants(restaurantsList);
      secureLog('Restaurantes por categoria carregados com sucesso', { 
        category,
        count: restaurantsList.length 
      });
    } catch (err) {
      console.error('Erro ao carregar restaurantes por categoria:', err);
      setError('Erro ao carregar restaurantes por categoria');
    } finally {
      setLoading(false);
    }
  };

  // Carregar restaurantes quando o hook for inicializado
  useEffect(() => {
    loadRestaurants();
  }, []);

  return {
    restaurants,
    loading,
    error,
    loadRestaurants,
    loadRestaurantsByCategory
  };
}
