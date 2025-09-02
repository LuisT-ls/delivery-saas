import { useEffect, useState } from 'react';
import { useCartStore } from './cart-store';
import { useCartContext } from '@/components/CartProvider';

export function useCart() {
  const store = useCartStore();
  const { isHydrated, isInitialized } = useCartContext();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (isHydrated && isInitialized) {
      setIsReady(true);
    }
  }, [isHydrated, isInitialized]);

  // Função para adicionar item com validação
  const addItem = (item: any, quantity: number = 1) => {
    if (!isReady) {
      console.warn('Carrinho não está pronto ainda');
      return false;
    }

    try {
      store.addItem(item, quantity);
      return true;
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
      return false;
    }
  };

  // Função para remover item com validação
  const removeItem = (itemId: string) => {
    if (!isReady) {
      console.warn('Carrinho não está pronto ainda');
      return false;
    }

    try {
      store.removeItem(itemId);
      return true;
    } catch (error) {
      console.error('Erro ao remover item:', error);
      return false;
    }
  };

  // Função para atualizar quantidade com validação
  const updateQuantity = (itemId: string, quantity: number) => {
    if (!isReady) {
      console.warn('Carrinho não está pronto ainda');
      return false;
    }

    try {
      store.updateQuantity(itemId, quantity);
      return true;
    } catch (error) {
      console.error('Erro ao atualizar quantidade:', error);
      return false;
    }
  };

  // Função para limpar carrinho com validação
  const clearCart = () => {
    if (!isReady) {
      console.warn('Carrinho não está pronto ainda');
      return false;
    }

    try {
      store.clearCart();
      return true;
    } catch (error) {
      console.error('Erro ao limpar carrinho:', error);
      return false;
    }
  };

  // Função para inicializar carrinho com validação
  const initialize = () => {
    if (!isReady) {
      console.warn('Carrinho não está pronto ainda');
      return false;
    }

    try {
      store.initialize();
      return true;
    } catch (error) {
      console.error('Erro ao inicializar carrinho:', error);
      return false;
    }
  };

  return {
    // Estado
    items: store.items,
    restaurantId: store.restaurantId,
    subtotal: store.subtotal,
    tax: store.tax,
    total: store.total,
    
    // Status
    isReady,
    isHydrated,
    isInitialized,
    
    // Ações
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    initialize,
    
    // Funções de cálculo
    calculateTotals: store.calculateTotals,
    
    // Utilitários
    itemCount: store.items.reduce((sum, item) => sum + item.quantity, 0),
    isEmpty: store.items.length === 0
  };
}
