'use client';

import { useCart } from '@/lib/use-cart';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

export default function CartWidget() {
  const { items, total, removeItem, isReady, itemCount } = useCart();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Não mostrar se o carrinho não estiver pronto
  if (!isReady) {
    return null;
  }

  const handleCheckout = () => {
    try {
      router.push('/carrinho');
    } catch (error) {
      console.error('Erro ao navegar para o carrinho:', error);
      // Fallback para navegação
      window.location.href = '/carrinho';
    }
  };

  const handleRemoveItem = (itemId: string) => {
    try {
      const success = removeItem(itemId);
      if (!success) {
        console.error('Falha ao remover item');
      }
    } catch (error) {
      console.error('Erro ao remover item:', error);
    }
  };

  // Não mostrar o widget na página de carrinho
  if (pathname === '/carrinho' || itemCount === 0) {
    return null;
  }

  return (
    <div className="position-fixed bottom-0 end-0 m-3" style={{ zIndex: 1050 }}>
      <div className="card shadow-lg" style={{ minWidth: '300px' }}>
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h6 className="mb-0">
            <i className="fas fa-shopping-cart me-2"></i>
            Carrinho ({itemCount})
          </h6>
          <button
            className="btn btn-sm btn-outline-light"
            onClick={() => setIsOpen(!isOpen)}
          >
            <i className={`fas fa-${isOpen ? 'chevron-down' : 'chevron-up'}`}></i>
          </button>
        </div>

        {isOpen && (
          <div className="card-body p-0">
            <div className="list-group list-group-flush">
              {items.map((item) => (
                <div key={item.itemId} className="list-group-item d-flex justify-content-between align-items-center">
                  <div className="flex-grow-1">
                    <h6 className="mb-1">{item.name}</h6>
                    <small className="text-muted">
                      {item.quantity}x R$ {item.price.toFixed(2)}
                    </small>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="me-3">R$ {item.subtotal.toFixed(2)}</span>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleRemoveItem(item.itemId)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="card-footer">
              <div className="d-flex justify-content-between mb-2">
                <strong>Total:</strong>
                <strong>R$ {total.toFixed(2)}</strong>
              </div>
              <button
                className="btn btn-primary w-100"
                onClick={handleCheckout}
              >
                Finalizar Pedido
              </button>
            </div>
          </div>
        )}

        {!isOpen && (
          <div className="card-body text-center">
            <div className="d-flex justify-content-between align-items-center">
              <span>Total: R$ {total.toFixed(2)}</span>
              <button
                className="btn btn-primary btn-sm"
                onClick={handleCheckout}
              >
                Finalizar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
