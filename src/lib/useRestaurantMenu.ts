import { useState, useEffect } from 'react';
import { 
  collection, 
  getDocs, 
  query,
  orderBy,
  where
} from 'firebase/firestore';
import { db } from './firebase';
import { MenuItem } from '@/types/restaurant';
import { secureLog } from './utils';

export function useRestaurantMenu(restaurantId: string | undefined) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carregar itens do menu do restaurante
  const loadMenuItems = async () => {
    if (!restaurantId) return;

    setLoading(true);
    setError(null);

    try {
      const menuRef = collection(db, 'restaurants', restaurantId, 'menu');
      const q = query(
        menuRef, 
        where('isAvailable', '==', true),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      const items: MenuItem[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Omit<MenuItem, 'id'>;
        items.push({ ...data, id: doc.id });
      });
      
      setMenuItems(items);
      secureLog('Itens do menu do restaurante carregados com sucesso', { 
        restaurantId, 
        count: items.length 
      });
    } catch (err) {
      console.error('Erro ao carregar itens do menu do restaurante:', err);
      setError('Erro ao carregar itens do menu');
    } finally {
      setLoading(false);
    }
  };

  // Carregar itens quando restaurantId mudar
  useEffect(() => {
    if (restaurantId) {
      loadMenuItems();
    }
  }, [restaurantId]);

  return {
    menuItems,
    loading,
    error,
    loadMenuItems
  };
}
