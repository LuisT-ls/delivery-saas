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

      // Função de inicialização segura e robusta
      initialize: () => {
        try {
          const state = get();
          
          // Validação rigorosa dos itens
          if (state.items && Array.isArray(state.items)) {
            const validItems = state.items.filter(item => 
              item && 
              typeof item === 'object' &&
              item.itemId && 
              typeof item.itemId === 'string' &&
              item.name && 
              typeof item.name === 'string' &&
              typeof item.price === 'number' && 
              item.price > 0 &&
              typeof item.quantity === 'number' && 
              item.quantity > 0 &&
              typeof item.subtotal === 'number' &&
              item.subtotal > 0 &&
              item.restaurantId &&
              typeof item.restaurantId === 'string'
            );
            
            // Se há itens inválidos, atualiza o estado
            if (validItems.length !== state.items.length) {
              console.warn(`Removidos ${state.items.length - validItems.length} itens inválidos do carrinho`);
              set({ items: validItems });
            }
            
            // Recalcula totais apenas se há itens válidos
            if (validItems.length > 0) {
              state.calculateTotals();
            } else {
              // Se não há itens válidos, limpa o carrinho
              set({
                items: [],
                restaurantId: null,
                subtotal: 0,
                tax: 0,
                total: 0
              });
            }
          } else {
            // Se items não é um array válido, limpa o carrinho
            console.warn('Items do carrinho não é um array válido, limpando...');
            set({
              items: [],
              restaurantId: null,
              subtotal: 0,
              tax: 0,
              total: 0
            });
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
          // Validação rigorosa dos parâmetros
          if (!item || typeof item !== 'object') {
            console.error('Item inválido:', item);
            return;
          }
          
          if (!item.id || typeof item.id !== 'string') {
            console.error('ID do item inválido:', item.id);
            return;
          }
          
          if (!item.name || typeof item.name !== 'string') {
            console.error('Nome do item inválido:', item.name);
            return;
          }
          
          if (typeof item.price !== 'number' || item.price <= 0) {
            console.error('Preço do item inválido:', item.price);
            return;
          }
          
          if (typeof quantity !== 'number' || quantity <= 0) {
            console.error('Quantidade inválida:', quantity);
            return;
          }

          if (!item.restaurantId || typeof item.restaurantId !== 'string') {
            console.error('ID do restaurante inválido:', item.restaurantId);
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
          
          // Recalcula totais
          get().calculateTotals();
        } catch (error) {
          console.error('Erro ao adicionar item ao carrinho:', error);
        }
      },

      removeItem: (itemId: string) => {
        try {
          if (!itemId || typeof itemId !== 'string') {
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
          
          // Recalcula totais
          get().calculateTotals();
        } catch (error) {
          console.error('Erro ao remover item do carrinho:', error);
        }
      },

      updateQuantity: (itemId: string, quantity: number) => {
        try {
          if (!itemId || typeof itemId !== 'string') {
            console.error('ID do item inválido:', itemId);
            return;
          }

          if (typeof quantity !== 'number' || quantity <= 0) {
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
          
          // Validação rigorosa dos itens antes de calcular
          if (!Array.isArray(items)) {
            console.error('Items não é um array:', items);
            set({ subtotal: 0, tax: 0, total: 0 });
            return;
          }

          const subtotal = items.reduce((sum, item) => {
            if (item && 
                typeof item === 'object' &&
                typeof item.subtotal === 'number' && 
                !isNaN(item.subtotal) && 
                item.subtotal > 0) {
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
            // Aguarda um pouco para garantir que o store esteja estável
            // Mas não executa initialize automaticamente para evitar loops
          } catch (error) {
            console.error('Erro na reidratação do carrinho:', error);
          }
        }
      }
    }
  )
);
