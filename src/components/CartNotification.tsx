'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/lib/use-cart';
import { usePathname } from 'next/navigation';

export default function CartNotification() {
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState('');
  const [lastItemCount, setLastItemCount] = useState(0);
  const { items, isReady, itemCount } = useCart();
  const pathname = usePathname();

  // Não mostrar notificação na página de carrinho
  if (pathname === '/carrinho') {
    return null;
  }

  // Não mostrar se o carrinho não estiver pronto
  if (!isReady) {
    return null;
  }

  useEffect(() => {
    // Só mostra notificação se o número de itens aumentou
    if (itemCount > lastItemCount && items.length > 0) {
      const lastItem = items[items.length - 1];
      if (lastItem && lastItem.name && typeof lastItem.name === 'string') {
        setMessage(`${lastItem.name} adicionado ao carrinho!`);
        setShowNotification(true);

        // Esconde a notificação após 3 segundos
        const timer = setTimeout(() => {
          setShowNotification(false);
        }, 3000);

        return () => clearTimeout(timer);
      }
    }

    // Atualiza o contador de itens
    setLastItemCount(itemCount);
  }, [items, itemCount, lastItemCount]);

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
