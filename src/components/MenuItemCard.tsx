'use client';

import { MenuItem } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import AddToCartButton from './AddToCartButton';

interface MenuItemCardProps {
  item: MenuItem;
  restaurantId: string;
}

export default function MenuItemCard({ item, restaurantId }: MenuItemCardProps) {
  return (
    <div className="col-md-6 col-lg-4">
      <div className="card h-100 shadow-sm border-0">
        {item.image && (
          <img
            src={item.image}
            className="card-img-top"
            alt={item.name}
            style={{ height: '200px', objectFit: 'cover' }}
          />
        )}
        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 className="card-title mb-0">{item.name}</h5>
            <span className="badge bg-success fs-6">
              {formatPrice(item.price)}
            </span>
          </div>
          <p className="card-text text-muted flex-grow-1">
            {item.description}
          </p>
          <div className="mt-auto">
            <div className="d-grid gap-2">
              <AddToCartButton item={item} />
              <a
                href={`/r/${restaurantId}/item/${item.id}`}
                className="btn btn-outline-primary"
              >
                <i className="fas fa-eye me-2"></i>
                Ver Detalhes
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
