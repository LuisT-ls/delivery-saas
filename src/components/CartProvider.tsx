'use client';

import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { useCartStore } from '@/lib/cart-store';

interface CartContextType {
  isInitialized: boolean;
  error: string | null;
  isHydrated: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export default function CartProvider({ children }: CartProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      // Função para inicializar o carrinho de forma segura
      const initializeCart = () => {
        try {
          const store = useCartStore.getState();

          // Verifica se o store está pronto
          if (store && typeof store.initialize === 'function') {
            store.initialize();
            setIsInitialized(true);
          } else {
            console.warn('Store do carrinho não está pronto ainda');
            // Tenta novamente em breve
            setTimeout(initializeCart, 50);
            return;
          }
        } catch (err) {
          console.error('Erro ao inicializar carrinho:', err);
          setError('Erro ao inicializar carrinho');
        }
      };

      // Aguarda a hidratação do Zustand
      const unsubscribe = useCartStore.persist.onFinishHydration(() => {
        setIsHydrated(true);
        // Inicializa o carrinho após a hidratação
        initializeCart();
      });

      // Fallback: se a hidratação demorar muito, tenta inicializar
      const timeoutId = setTimeout(() => {
        if (!isHydrated) {
          console.warn('Hidratação demorou muito, tentando inicializar...');
          setIsHydrated(true);
          initializeCart();
        }
      }, 1000);

      return () => {
        unsubscribe();
        clearTimeout(timeoutId);
      };
    } catch (err) {
      console.error('Erro no CartProvider:', err);
      setError('Erro interno do carrinho');
    }
  }, []);

  const contextValue: CartContextType = {
    isInitialized,
    error,
    isHydrated
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
