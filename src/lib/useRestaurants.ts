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

  // Debug log (removido para evitar spam no console)
  // console.log('useRestaurants hook initialized', { 
  //   hasDb: !!db, 
  //   isClient: typeof window !== 'undefined' 
  // });

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
      // Usar apenas getDocs sem orderBy para evitar necessidade de índice
      // A ordenação será feita no cliente
      const querySnapshot = await getDocs(restaurantsRef);
      
      const restaurantsList: Restaurant[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Omit<Restaurant, 'id'>;
        // Garantir que todos os campos obrigatórios tenham valores padrão
        const restaurantData: Restaurant = {
          ...data,
          id: doc.id,
          rating: data.rating || 0,
          deliveryFee: data.deliveryFee || 0,
          deliveryTime: data.deliveryTime || '0-0 min',
          category: data.category || 'Outros',
          name: data.name || 'Restaurante sem nome',
          address: data.address || 'Endereço não informado',
          phone: data.phone || 'Telefone não informado'
        };
        restaurantsList.push(restaurantData);
      });
      
      // Ordenar por data de criação (mais recente primeiro)
      restaurantsList.sort((a, b) => {
        const dateA = a.createdAt?.toDate?.() || new Date(0);
        const dateB = b.createdAt?.toDate?.() || new Date(0);
        return dateB.getTime() - dateA.getTime();
      });
      
      setRestaurants(restaurantsList);
      secureLog('Restaurantes carregados com sucesso', { 
        count: restaurantsList.length 
      });
    } catch (err: any) {
      console.error('Erro ao carregar restaurantes:', err);
      
      // Tratamento específico para diferentes tipos de erro
      if (err.code === 'failed-precondition') {
        setError('Erro de configuração do banco de dados. Recarregue a página.');
      } else if (err.code === 'permission-denied') {
        setError('Sem permissão para acessar os restaurantes.');
      } else if (err.code === 'unavailable') {
        setError('Serviço temporariamente indisponível. Tente novamente.');
      } else {
        setError(`Erro ao carregar restaurantes: ${err.message || 'Erro desconhecido'}`);
      }
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
      // Usar apenas where para evitar necessidade de índice composto
      // A ordenação será feita no cliente
      const q = query(
        restaurantsRef, 
        where('category', '==', category)
      );
      const querySnapshot = await getDocs(q);
      
      const restaurantsList: Restaurant[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Omit<Restaurant, 'id'>;
        // Garantir que todos os campos obrigatórios tenham valores padrão
        const restaurantData: Restaurant = {
          ...data,
          id: doc.id,
          rating: data.rating || 0,
          deliveryFee: data.deliveryFee || 0,
          deliveryTime: data.deliveryTime || '0-0 min',
          category: data.category || 'Outros',
          name: data.name || 'Restaurante sem nome',
          address: data.address || 'Endereço não informado',
          phone: data.phone || 'Telefone não informado'
        };
        restaurantsList.push(restaurantData);
      });
      
      // Ordenar por data de criação (mais recente primeiro)
      restaurantsList.sort((a, b) => {
        const dateA = a.createdAt?.toDate?.() || new Date(0);
        const dateB = b.createdAt?.toDate?.() || new Date(0);
        return dateB.getTime() - dateA.getTime();
      });
      
      setRestaurants(restaurantsList);
      secureLog('Restaurantes por categoria carregados com sucesso', { 
        category,
        count: restaurantsList.length 
      });
    } catch (err: any) {
      console.error('Erro ao carregar restaurantes por categoria:', err);
      
      // Tratamento específico para diferentes tipos de erro
      if (err.code === 'failed-precondition') {
        setError('Erro de configuração do banco de dados. Recarregue a página.');
      } else if (err.code === 'permission-denied') {
        setError('Sem permissão para acessar os restaurantes.');
      } else if (err.code === 'unavailable') {
        setError('Serviço temporariamente indisponível. Tente novamente.');
      } else {
        setError(`Erro ao carregar restaurantes por categoria: ${err.message || 'Erro desconhecido'}`);
      }
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
