'use client';

import { useCart } from '@/lib/use-cart';
import { useCartContext } from './CartProvider';

export default function CartStatus() {
  const { isReady, itemCount, total } = useCart();
  const { isHydrated, isInitialized } = useCartContext();

  // Só mostrar em desenvolvimento
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="position-fixed top-0 start-0 m-3 p-2 bg-success text-white" style={{ zIndex: 1070, fontSize: '11px', maxWidth: '200px' }}>
      <div>🛒 Status</div>
      <div>Hydrated: {isHydrated ? '✅' : '❌'}</div>
      <div>Initialized: {isInitialized ? '✅' : '❌'}</div>
      <div>Ready: {isReady ? '✅' : '❌'}</div>
      <div>Items: {itemCount}</div>
      <div>Total: R$ {total.toFixed(2)}</div>
    </div>
  );
}
