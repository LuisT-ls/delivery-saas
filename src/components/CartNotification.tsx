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

  useEffect(() => {
    // Não mostrar se o carrinho não estiver pronto
    if (!isReady) {
      return;
    }

    // Não mostrar notificação na página de carrinho
    if (pathname === '/carrinho') {
      return;
    }

    // Só mostra notificação se o número de itens aumentou
    if (itemCount > lastItemCount && items.length > 0) {
      const lastItem = items[items.length - 1];
      if (lastItem && lastItem.name && typeof lastItem.name === 'string') {
        setMessage(`${lastItem.name} adicionado ao carrinho!`);
        setShowNotification(true);

        // Esconde a notificação após 2 segundos (mais rápido)
        const timer = setTimeout(() => {
          setShowNotification(false);
        }, 2000);

        return () => clearTimeout(timer);
      }
    }

    // Atualiza o contador de itens
    setLastItemCount(itemCount);
  }, [items, itemCount, lastItemCount, isReady, pathname]);

  // Não mostrar se o carrinho não estiver pronto ou se estiver na página de carrinho
  if (!isReady || pathname === '/carrinho') {
    return null;
  }

  if (!showNotification) {
    return null;
  }

  return (
    <div
      className="position-fixed top-0 start-50 translate-middle-x mt-3"
      style={{ zIndex: 1060 }}
    >
      <div className="alert alert-success alert-dismissible fade show shadow" role="alert" style={{ minWidth: '250px' }}>
        <div className="d-flex align-items-center">
          <i className="fas fa-check-circle me-2 text-success"></i>
          <span className="fw-medium">{message}</span>
        </div>
        <button
          type="button"
          className="btn-close"
          onClick={() => setShowNotification(false)}
          aria-label="Fechar"
        ></button>
      </div>
    </div>
  );
}
