import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartState, CartItem, MenuItem } from './types';

const TAX_RATE = 0.10; // 10% de taxa

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      restaurantId: null,
      subtotal: 0,
      tax: 0,
      total: 0,

      // Função de inicialização segura
      initialize: () => {
        try {
          const state = get();
          // Valida se os itens existem e são válidos
          if (state.items && Array.isArray(state.items) && state.items.length > 0) {
            // Filtra itens inválidos
            const validItems = state.items.filter(item => 
              item && 
              item.itemId && 
              item.name && 
              typeof item.price === 'number' && 
              item.price > 0 &&
              typeof item.quantity === 'number' && 
              item.quantity > 0
            );
            
            if (validItems.length !== state.items.length) {
              // Se há itens inválidos, atualiza o estado
              set({ items: validItems });
            }
            
            state.calculateTotals();
          }
        } catch (error) {
          console.error('Erro ao inicializar carrinho:', error);
          // Em caso de erro, limpa o carrinho para evitar problemas
          set({
            items: [],
            restaurantId: null,
            subtotal: 0,
            tax: 0,
            total: 0
          });
        }
      },

      addItem: (item: MenuItem, quantity: number = 1) => {
        try {
          // Validação dos parâmetros
          if (!item || !item.id || !item.name || typeof item.price !== 'number' || item.price <= 0) {
            console.error('Item inválido:', item);
            return;
          }
          
          if (typeof quantity !== 'number' || quantity <= 0) {
            console.error('Quantidade inválida:', quantity);
            return;
          }

          const { items, restaurantId } = get();
          
          // Se o carrinho está vazio, define o restaurante
          if (items.length === 0) {
            set({ restaurantId: item.restaurantId });
          }
          
          // Verifica se o item é do mesmo restaurante
          if (restaurantId && restaurantId !== item.restaurantId) {
            alert('Você só pode adicionar itens do mesmo restaurante. Limpe o carrinho primeiro.');
            return;
          }

          const existingItem = items.find(cartItem => cartItem.itemId === item.id);
          
          if (existingItem) {
            // Atualiza quantidade do item existente
            const updatedItems = items.map(cartItem =>
              cartItem.itemId === item.id
                ? {
                    ...cartItem,
                    quantity: cartItem.quantity + quantity,
                    subtotal: (cartItem.quantity + quantity) * cartItem.price
                  }
                : cartItem
            );
            set({ items: updatedItems });
          } else {
            // Adiciona novo item
            const newItem: CartItem = {
              itemId: item.id,
              restaurantId: item.restaurantId,
              name: item.name,
              price: item.price,
              image: item.image,
              quantity,
              subtotal: item.price * quantity
            };
            set({ items: [...items, newItem] });
          }
          
          get().calculateTotals();
        } catch (error) {
          console.error('Erro ao adicionar item ao carrinho:', error);
        }
      },

      removeItem: (itemId: string) => {
        try {
          if (!itemId) {
            console.error('ID do item inválido:', itemId);
            return;
          }

          const { items } = get();
          const updatedItems = items.filter(item => item.itemId !== itemId);
          set({ items: updatedItems });
          
          // Se não há mais itens, limpa o restaurante
          if (updatedItems.length === 0) {
            set({ restaurantId: null });
          }
          
          get().calculateTotals();
        } catch (error) {
          console.error('Erro ao remover item do carrinho:', error);
        }
      },

      updateQuantity: (itemId: string, quantity: number) => {
        try {
          if (!itemId) {
            console.error('ID do item inválido:', itemId);
            return;
          }

          if (quantity <= 0) {
            get().removeItem(itemId);
            return;
          }

          const { items } = get();
          const updatedItems = items.map(item =>
            item.itemId === itemId
              ? {
                  ...item,
                  quantity,
                  subtotal: item.price * quantity
                }
              : item
          );
          set({ items: updatedItems });
          get().calculateTotals();
        } catch (error) {
          console.error('Erro ao atualizar quantidade do item:', error);
        }
      },

      clearCart: () => {
        try {
          set({
            items: [],
            restaurantId: null,
            subtotal: 0,
            tax: 0,
            total: 0
          });
        } catch (error) {
          console.error('Erro ao limpar carrinho:', error);
        }
      },

      calculateTotals: () => {
        try {
          const { items } = get();
          if (!Array.isArray(items)) {
            console.error('Items não é um array:', items);
            return;
          }

          const subtotal = items.reduce((sum, item) => {
            if (item && typeof item.subtotal === 'number' && !isNaN(item.subtotal)) {
              return sum + item.subtotal;
            }
            return sum;
          }, 0);
          
          const tax = subtotal * TAX_RATE;
          const total = subtotal + tax;
          
          set({ subtotal, tax, total });
        } catch (error) {
          console.error('Erro ao calcular totais:', error);
          set({ subtotal: 0, tax: 0, total: 0 });
        }
      }
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        items: state.items,
        restaurantId: state.restaurantId
      }),
      onRehydrateStorage: () => (state) => {
        // Callback executado após reidratação
        if (state) {
          try {
            state.initialize();
          } catch (error) {
            console.error('Erro na reidratação do carrinho:', error);
          }
        }
      }
    }
  )
);
