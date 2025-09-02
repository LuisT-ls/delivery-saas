'use client';

import { useCart } from '@/lib/use-cart';
import { useCartContext } from './CartProvider';

export default function CartDebug() {
  const cart = useCart();
  const context = useCartContext();

  // Só mostrar em desenvolvimento
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="position-fixed top-0 start-0 m-3 p-3 bg-dark text-white" style={{ zIndex: 1070, fontSize: '12px', maxWidth: '300px' }}>
      <h6 className="mb-2">🔍 Debug do Carrinho</h6>

      <div className="mb-2">
        <strong>Context:</strong>
        <div>Hydrated: {context.isHydrated ? '✅' : '❌'}</div>
        <div>Initialized: {context.isInitialized ? '✅' : '❌'}</div>
      </div>

      <div className="mb-2">
        <strong>Hook:</strong>
        <div>Ready: {cart.isReady ? '✅' : '❌'}</div>
        <div>Items: {cart.items.length}</div>
        <div>Count: {cart.itemCount}</div>
        <div>Total: R$ {cart.total.toFixed(2)}</div>
      </div>

      <div className="mb-2">
        <strong>Estado:</strong>
        <div>Subtotal: R$ {cart.subtotal.toFixed(2)}</div>
        <div>Tax: R$ {cart.tax.toFixed(2)}</div>
        <div>Restaurant: {cart.restaurantId || 'Nenhum'}</div>
      </div>

      <button
        className="btn btn-sm btn-outline-light"
        onClick={() => {
          console.log('Cart Debug Info:', { cart, context });
        }}
      >
        Log no Console
      </button>
    </div>
  );
}
