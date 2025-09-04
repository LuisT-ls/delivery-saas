import { useState, useEffect } from 'react';
import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp,
  query,
  where,
  orderBy
} from 'firebase/firestore';
import { db } from './firebase';
import { MenuItem } from '@/types/restaurant';
import { secureLog } from './utils';

export interface MenuItemFormData {
  name: string;
  description: string;
  price: number;
  image?: string;
}

export function useMenuItems(restaurantId: string | undefined) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carregar itens do menu
  const loadMenuItems = async () => {
    if (!restaurantId) return;

    setLoading(true);
    setError(null);

    try {
      const menuRef = collection(db, 'restaurants', restaurantId, 'menu');
      const q = query(menuRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const items: MenuItem[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Omit<MenuItem, 'id'>;
        items.push({ ...data, id: doc.id });
      });
      
      setMenuItems(items);
      secureLog('Itens do menu carregados com sucesso', { 
        restaurantId, 
        count: items.length 
      });
    } catch (err) {
      console.error('Erro ao carregar itens do menu:', err);
      setError('Erro ao carregar itens do menu');
    } finally {
      setLoading(false);
    }
  };

  // Criar novo item do menu
  const createMenuItem = async (formData: MenuItemFormData): Promise<boolean> => {
    if (!restaurantId) {
      setError('ID do restaurante não encontrado');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const menuRef = collection(db, 'restaurants', restaurantId, 'menu');
      
      const menuItemData: Omit<MenuItem, 'id'> = {
        restaurantId,
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: formData.price,
        image: formData.image || '',
        isAvailable: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      secureLog('Tentativa de criação de item do menu', { 
        restaurantId, 
        name: menuItemData.name,
        price: menuItemData.price
      });

      const docRef = await addDoc(menuRef, menuItemData);
      
      // Atualizar estado local
      setMenuItems(prev => [{ ...menuItemData, id: docRef.id }, ...prev]);
      secureLog('Item do menu criado com sucesso', { id: docRef.id });
      return true;
    } catch (err: any) {
      console.error('Erro ao criar item do menu:', err);
      
      if (err.code === 'permission-denied') {
        setError('Permissão negada. Verifique se você está logado e tente novamente.');
      } else if (err.code === 'unavailable') {
        setError('Serviço temporariamente indisponível. Tente novamente em alguns minutos.');
      } else {
        setError(`Erro ao criar item do menu: ${err.message || 'Erro desconhecido'}`);
      }
      
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Atualizar item do menu
  const updateMenuItem = async (itemId: string, formData: MenuItemFormData): Promise<boolean> => {
    if (!restaurantId) {
      setError('ID do restaurante não encontrado');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const itemRef = doc(db, 'restaurants', restaurantId, 'menu', itemId);
      
      const updateData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: formData.price,
        image: formData.image || '',
        updatedAt: serverTimestamp()
      };

      secureLog('Tentativa de atualização de item do menu', { 
        itemId, 
        updates: updateData 
      });

      await updateDoc(itemRef, updateData);

      // Atualizar estado local
      setMenuItems(prev => prev.map(item => 
        item.id === itemId 
          ? { ...item, ...updateData }
          : item
      ));
      secureLog('Item do menu atualizado com sucesso', { itemId });
      return true;
    } catch (err: any) {
      console.error('Erro ao atualizar item do menu:', err);
      
      if (err.code === 'permission-denied') {
        setError('Permissão negada. Verifique se você está logado e tente novamente.');
      } else if (err.code === 'unavailable') {
        setError('Serviço temporariamente indisponível. Tente novamente em alguns minutos.');
      } else {
        setError(`Erro ao atualizar item do menu: ${err.message || 'Erro desconhecido'}`);
      }
      
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Remover item do menu
  const deleteMenuItem = async (itemId: string): Promise<boolean> => {
    if (!restaurantId) {
      setError('ID do restaurante não encontrado');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const itemRef = doc(db, 'restaurants', restaurantId, 'menu', itemId);
      
      secureLog('Tentativa de remoção de item do menu', { itemId });

      await deleteDoc(itemRef);

      // Atualizar estado local
      setMenuItems(prev => prev.filter(item => item.id !== itemId));
      secureLog('Item do menu removido com sucesso', { itemId });
      return true;
    } catch (err: any) {
      console.error('Erro ao remover item do menu:', err);
      
      if (err.code === 'permission-denied') {
        setError('Permissão negada. Verifique se você está logado e tente novamente.');
      } else if (err.code === 'unavailable') {
        setError('Serviço temporariamente indisponível. Tente novamente em alguns minutos.');
      } else {
        setError(`Erro ao remover item do menu: ${err.message || 'Erro desconhecido'}`);
      }
      
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Alternar disponibilidade do item
  const toggleItemAvailability = async (itemId: string, isAvailable: boolean): Promise<boolean> => {
    if (!restaurantId) {
      setError('ID do restaurante não encontrado');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const itemRef = doc(db, 'restaurants', restaurantId, 'menu', itemId);
      
      const updateData = {
        isAvailable,
        updatedAt: serverTimestamp()
      };

      secureLog('Tentativa de alteração de disponibilidade do item', { 
        itemId, 
        isAvailable 
      });

      await updateDoc(itemRef, updateData);

      // Atualizar estado local
      setMenuItems(prev => prev.map(item => 
        item.id === itemId 
          ? { ...item, ...updateData }
          : item
      ));
      secureLog('Disponibilidade do item alterada com sucesso', { itemId });
      return true;
    } catch (err: any) {
      console.error('Erro ao alterar disponibilidade do item:', err);
      
      if (err.code === 'permission-denied') {
        setError('Permissão negada. Verifique se você está logado e tente novamente.');
      } else if (err.code === 'unavailable') {
        setError('Serviço temporariamente indisponível. Tente novamente em alguns minutos.');
      } else {
        setError(`Erro ao alterar disponibilidade do item: ${err.message || 'Erro desconhecido'}`);
      }
      
      return false;
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
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    toggleItemAvailability,
    loadMenuItems
  };
}
