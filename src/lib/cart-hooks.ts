import { useEffect } from 'react';
import { useCartStore } from './cart-store';

export function useCartInitialization() {
  const { calculateTotals } = useCartStore();

  useEffect(() => {
    // Recalcula os totais quando o componente monta
    calculateTotals();
  }, [calculateTotals]);
}

export function useCartValidation(restaurantId: string) {
  const { items, restaurantId: cartRestaurantId, clearCart } = useCartStore();

  useEffect(() => {
    // Se há itens no carrinho mas são de um restaurante diferente, limpa o carrinho
    if (items.length > 0 && cartRestaurantId && cartRestaurantId !== restaurantId) {
      if (confirm('Você tem itens de outro restaurante no carrinho. Deseja limpar o carrinho?')) {
        clearCart();
      }
    }
  }, [items, cartRestaurantId, restaurantId, clearCart]);
}
