'use client';

import { useState, useEffect } from 'react';
import { useCartStore } from '@/lib/cart-store';
import { usePathname } from 'next/navigation';

export default function CartNotification() {
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState('');
  const items = useCartStore(state => state.items);
  const pathname = usePathname();

  // Não mostrar notificação na página de carrinho
  if (pathname === '/carrinho') {
    return null;
  }

  useEffect(() => {
    // Detecta quando um item é adicionado ao carrinho
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    if (itemCount > 0) {
      const lastItem = items[items.length - 1];
      setMessage(`${lastItem.name} adicionado ao carrinho!`);
      setShowNotification(true);

      // Esconde a notificação após 3 segundos
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [items]);

  if (!showNotification) {
    return null;
  }

  return (
    <div
      className="position-fixed top-0 start-50 translate-middle-x mt-3"
      style={{ zIndex: 1060 }}
    >
      <div className="alert alert-success alert-dismissible fade show shadow" role="alert">
        <i className="fas fa-check-circle me-2"></i>
        {message}
        <button
          type="button"
          className="btn-close"
          onClick={() => setShowNotification(false)}
        ></button>
      </div>
    </div>
  );
}
