'use client';

import { useState } from 'react';
import { useCart } from '@/lib/use-cart';
import { MenuItem } from '@/types/restaurant';

interface AddToCartButtonProps {
  item: MenuItem;
  className?: string;
}

export default function AddToCartButton({ item, className = '' }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [showQuantity, setShowQuantity] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { addItem, isReady } = useCart();

  const handleAddToCart = async () => {
    try {
      setIsAdding(true);

      // Valida se o carrinho está pronto
      if (!isReady) {
        console.warn('Carrinho não está pronto ainda');
        return;
      }

      // Valida o item antes de adicionar
      if (!item || !item.id || !item.name || typeof item.price !== 'number' || item.price <= 0) {
        console.error('Item inválido:', item);
        alert('Item inválido. Tente novamente.');
        return;
      }

      const success = addItem(item, quantity);
      if (success) {
        setShowQuantity(false);
        setQuantity(1);
      } else {
        alert('Erro ao adicionar item. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao adicionar item ao carrinho:', error);
      alert('Erro ao adicionar item. Tente novamente.');
    } finally {
      setIsAdding(false);
    }
  };

  const handleQuickAdd = async () => {
    try {
      setIsAdding(true);

      // Valida se o carrinho está pronto
      if (!isReady) {
        console.warn('Carrinho não está pronto ainda');
        return;
      }

      // Valida o item antes de adicionar
      if (!item || !item.id || !item.name || typeof item.price !== 'number' || item.price <= 0) {
        console.error('Item inválido:', item);
        alert('Item inválido. Tente novamente.');
        return;
      }

      const success = addItem(item, 1);
      if (!success) {
        alert('Erro ao adicionar item. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao adicionar item ao carrinho:', error);
      alert('Erro ao adicionar item. Tente novamente.');
    } finally {
      setIsAdding(false);
    }
  };

  // Não mostrar se o carrinho não estiver pronto
  if (!isReady) {
    return (
      <div className={className}>
        <button className="btn btn-secondary" disabled>
          <i className="fas fa-spinner fa-spin me-2"></i>
          Carregando...
        </button>
      </div>
    );
  }

  if (showQuantity) {
    return (
      <div className={`d-flex align-items-center gap-2 ${className}`}>
        <div className="input-group" style={{ width: '120px' }}>
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={isAdding}
          >
            <i className="fas fa-minus"></i>
          </button>
          <input
            type="number"
            className="form-control text-center"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            min="1"
            disabled={isAdding}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            disabled={isAdding}
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
        <button
          className="btn btn-success"
          onClick={handleAddToCart}
          disabled={isAdding}
        >
          {isAdding ? (
            <i className="fas fa-spinner fa-spin"></i>
          ) : (
            <i className="fas fa-check"></i>
          )}
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => setShowQuantity(false)}
          disabled={isAdding}
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    );
  }

  return (
    <div className={className}>
      <button
        className="btn btn-primary"
        onClick={handleQuickAdd}
        onDoubleClick={() => setShowQuantity(true)}
        disabled={isAdding}
      >
        {isAdding ? (
          <>
            <i className="fas fa-spinner fa-spin me-2"></i>
            Adicionando...
          </>
        ) : (
          <>
            <i className="fas fa-plus me-2"></i>
            Adicionar
          </>
        )}
      </button>
    </div>
  );
}
