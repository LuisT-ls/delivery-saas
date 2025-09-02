'use client';

import { useState } from 'react';
import { useCartStore } from '@/lib/cart-store';
import { MenuItem } from '@/lib/types';

interface AddToCartButtonProps {
  item: MenuItem;
  className?: string;
}

export default function AddToCartButton({ item, className = '' }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [showQuantity, setShowQuantity] = useState(false);
  const addItem = useCartStore(state => state.addItem);

  const handleAddToCart = () => {
    addItem(item, quantity);
    setShowQuantity(false);
    setQuantity(1);
  };

  const handleQuickAdd = () => {
    addItem(item, 1);
  };

  if (showQuantity) {
    return (
      <div className={`d-flex align-items-center gap-2 ${className}`}>
        <div className="input-group" style={{ width: '120px' }}>
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <i className="fas fa-minus"></i>
          </button>
          <input
            type="number"
            className="form-control text-center"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            min="1"
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => setQuantity(quantity + 1)}
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
        <button
          className="btn btn-success"
          onClick={handleAddToCart}
        >
          <i className="fas fa-check"></i>
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => setShowQuantity(false)}
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
      >
        <i className="fas fa-plus me-2"></i>
        Adicionar
      </button>
    </div>
  );
}
