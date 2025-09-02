'use client';

import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { useCartStore } from '@/lib/cart-store';

interface CartContextType {
  isInitialized: boolean;
  error: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export default function CartProvider({ children }: CartProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Inicializa o carrinho de forma segura
      const initializeCart = () => {
        try {
          useCartStore.getState().initialize();
          setIsInitialized(true);
        } catch (err) {
          console.error('Erro ao inicializar carrinho:', err);
          setError('Erro ao inicializar carrinho');
        }
      };

      // Aguarda um pouco para garantir que o Zustand esteja pronto
      setTimeout(initializeCart, 100);
    } catch (err) {
      console.error('Erro no CartProvider:', err);
      setError('Erro interno do carrinho');
    }
  }, []);

  const contextValue: CartContextType = {
    isInitialized,
    error
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
}
