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

  // Debug log
  console.log('useRestaurants hook initialized', { 
    hasDb: !!db, 
    isClient: typeof window !== 'undefined' 
  });

  // Carregar todos os restaurantes
  const loadRestaurants = async () => {
    if (!db) {
      console.error('Firebase não inicializado');
      setError('Erro de configuração do banco de dados');
      return;
    }

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
    } catch (err: any) {
      console.error('Erro ao carregar restaurantes:', err);
      setError(`Erro ao carregar restaurantes: ${err.message || 'Erro desconhecido'}`);
    } finally {
      setLoading(false);
    }
  };

  // Carregar restaurantes por categoria
  const loadRestaurantsByCategory = async (category: string) => {
    if (!db) {
      console.error('Firebase não inicializado');
      setError('Erro de configuração do banco de dados');
      return;
    }

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
    } catch (err: any) {
      console.error('Erro ao carregar restaurantes por categoria:', err);
      setError(`Erro ao carregar restaurantes por categoria: ${err.message || 'Erro desconhecido'}`);
    } finally {
      setLoading(false);
    }
  };

  // Carregar restaurantes quando o hook for inicializado
  useEffect(() => {
    // Verificar se o Firebase está disponível antes de tentar carregar
    if (typeof window !== 'undefined' && db) {
      loadRestaurants();
    }
  }, []);

  return {
    restaurants,
    loading,
    error,
    loadRestaurants,
    loadRestaurantsByCategory
  };
}
