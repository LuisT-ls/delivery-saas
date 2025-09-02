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

      addItem: (item: MenuItem, quantity: number = 1) => {
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
      },

      removeItem: (itemId: string) => {
        const { items } = get();
        const updatedItems = items.filter(item => item.itemId !== itemId);
        set({ items: updatedItems });
        
        // Se não há mais itens, limpa o restaurante
        if (updatedItems.length === 0) {
          set({ restaurantId: null });
        }
        
        get().calculateTotals();
      },

      updateQuantity: (itemId: string, quantity: number) => {
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
      },

      clearCart: () => {
        set({
          items: [],
          restaurantId: null,
          subtotal: 0,
          tax: 0,
          total: 0
        });
      },

      calculateTotals: () => {
        const { items } = get();
        const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
        const tax = subtotal * TAX_RATE;
        const total = subtotal + tax;
        
        set({ subtotal, tax, total });
      }
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        items: state.items,
        restaurantId: state.restaurantId
      })
    }
  )
);
