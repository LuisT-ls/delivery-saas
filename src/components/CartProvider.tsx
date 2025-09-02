'use client';

import { createContext, useContext, ReactNode, useEffect, useState, useRef } from 'react';
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

  // Refs para controlar o estado e evitar loops
  const hasInitialized = useRef(false);
  const hasHydrated = useRef(false);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    // Evita execução múltipla
    if (hasInitialized.current) {
      return;
    }

    try {
      // Função para inicializar o carrinho de forma segura
      const initializeCart = () => {
        if (hasInitialized.current) {
          return;
        }

        try {
          const store = useCartStore.getState();

          // Verifica se o store está pronto
          if (store && typeof store.initialize === 'function') {
            store.initialize();
            setIsInitialized(true);
            hasInitialized.current = true;
            console.log('Carrinho inicializado com sucesso');
          } else {
            console.warn('Store do carrinho não está pronto ainda');
            // Tenta novamente em breve, mas apenas uma vez
            if (!hasInitialized.current) {
              setTimeout(initializeCart, 100);
            }
            return;
          }
        } catch (err) {
          console.error('Erro ao inicializar carrinho:', err);
          setError('Erro ao inicializar carrinho');
          hasInitialized.current = true; // Evita tentativas infinitas
        }
      };

      // Aguarda a hidratação do Zustand
      if (useCartStore.persist && typeof useCartStore.persist.onFinishHydration === 'function') {
        unsubscribeRef.current = useCartStore.persist.onFinishHydration(() => {
          if (!hasHydrated.current) {
            console.log('Hidratação do Zustand concluída');
            setIsHydrated(true);
            hasHydrated.current = true;
            // Inicializa o carrinho após a hidratação
            initializeCart();
          }
        });
      } else {
        // Se não há persist, marca como hidratado e inicializa
        console.log('Zustand sem persist, inicializando diretamente');
        setIsHydrated(true);
        hasHydrated.current = true;
        initializeCart();
      }

      // Fallback: se a hidratação demorar muito, tenta inicializar
      const timeoutId = setTimeout(() => {
        if (!hasHydrated.current && !hasInitialized.current) {
          console.log('Fallback: inicializando sem hidratação');
          setIsHydrated(true);
          hasHydrated.current = true;
          initializeCart();
        }
      }, 1000);

      return () => {
        // Cleanup
        if (unsubscribeRef.current) {
          unsubscribeRef.current();
        }
        clearTimeout(timeoutId);
      };
    } catch (err) {
      console.error('Erro no CartProvider:', err);
      setError('Erro interno do carrinho');
      hasInitialized.current = true; // Evita tentativas infinitas
    }
  }, []); // Dependências vazias para executar apenas uma vez

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
