'use client';

import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Restaurant } from '@/types/restaurant';
import { useRestaurantMenu } from '@/lib/useRestaurantMenu';
import MenuItemCard from '@/components/MenuItemCard';

interface RestaurantMenuPageProps {
  restaurantId: string;
}

export default function RestaurantMenuPage({ restaurantId }: RestaurantMenuPageProps) {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { menuItems, loading: menuLoading, error: menuError } = useRestaurantMenu(restaurantId);

  // Carregar dados do restaurante
  useEffect(() => {
    const loadRestaurant = async () => {
      try {
        const restaurantRef = doc(db, 'restaurants', restaurantId);
        const restaurantDoc = await getDoc(restaurantRef);

        if (restaurantDoc.exists()) {
          const data = restaurantDoc.data() as Omit<Restaurant, 'id'>;
          setRestaurant({ ...data, id: restaurantDoc.id });
        } else {
          setError('Restaurante não encontrado');
        }
      } catch (err) {
        console.error('Erro ao carregar restaurante:', err);
        setError('Erro ao carregar dados do restaurante');
      } finally {
        setLoading(false);
      }
    };

    if (restaurantId) {
      loadRestaurant();
    }
  }, [restaurantId]);

  if (loading) {
    return (
      <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
          <p className="mt-3">Carregando menu...</p>
        </div>
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
        <div className="text-center">
          <i className="fas fa-exclamation-triangle fa-3x text-danger mb-3"></i>
          <h3>Restaurante não encontrado</h3>
          <p className="text-muted">O restaurante que você está procurando não existe ou foi removido.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      {/* Header do Restaurante */}
      <div className="bg-white shadow-sm">
        <div className="container py-4">
          <div className="row align-items-center">
            <div className="col-md-2">
              {restaurant.image ? (
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="img-fluid rounded"
                  style={{ maxHeight: '80px' }}
                />
              ) : (
                <div className="bg-light rounded d-flex align-items-center justify-content-center" style={{ height: '80px', width: '80px' }}>
                  <i className="fas fa-store fa-2x text-muted"></i>
                </div>
              )}
            </div>
            <div className="col-md-10">
              <h1 className="h3 mb-1">{restaurant.name}</h1>
              <p className="text-muted mb-2">{restaurant.category}</p>
              <div className="d-flex flex-wrap gap-3 text-muted small">
                <span>
                  <i className="fas fa-map-marker-alt me-1"></i>
                  {restaurant.address}
                </span>
                <span>
                  <i className="fas fa-phone me-1"></i>
                  {restaurant.phone}
                </span>
                <span>
                  <i className="fas fa-star me-1"></i>
                  {restaurant.rating.toFixed(1)}
                </span>
                <span>
                  <i className="fas fa-clock me-1"></i>
                  {restaurant.deliveryTime}
                </span>
                <span>
                  <i className="fas fa-motorcycle me-1"></i>
                  R$ {restaurant.deliveryFee.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Banner do Restaurante */}
      {restaurant.image && (
        <div className="container-fluid p-0">
          <div className="position-relative">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-100"
              style={{ height: '300px', objectFit: 'cover' }}
            />
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center">
              <div className="text-center text-white">
                <h2 className="display-6 fw-bold">{restaurant.name}</h2>
                <p className="lead">{restaurant.category}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Menu */}
      <div className="container py-5">
        {menuLoading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
            <p className="mt-3">Carregando pratos...</p>
          </div>
        ) : menuError ? (
          <div className="text-center py-5">
            <i className="fas fa-exclamation-triangle fa-3x text-danger mb-3"></i>
            <h3>Erro ao carregar menu</h3>
            <p className="text-muted">{menuError}</p>
          </div>
        ) : menuItems.length === 0 ? (
          <div className="text-center py-5">
            <i className="fas fa-utensils fa-3x text-muted mb-3"></i>
            <h3 className="text-muted">Menu não disponível</h3>
            <p className="text-muted">Este restaurante ainda não possui itens no menu.</p>
          </div>
        ) : (
          <div className="row">
            <div className="col-12 mb-5">
              <div className="d-flex align-items-center mb-4">
                <div>
                  <h2 className="h4 mb-1">Cardápio</h2>
                  <p className="text-muted mb-0">Pratos disponíveis</p>
                </div>
              </div>

              <div className="row g-4">
                {menuItems.map((item) => (
                  <MenuItemCard key={item.id} item={item} restaurantId={restaurantId} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white py-4 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h5>{restaurant.name}</h5>
              <p className="mb-0">{restaurant.category}</p>
            </div>
            <div className="col-md-6 text-md-end">
              <h6>Contato</h6>
              <p className="mb-1">
                <i className="fas fa-phone me-2"></i>
                {restaurant.phone}
              </p>
              <p className="mb-0">
                <i className="fas fa-map-marker-alt me-2"></i>
                {restaurant.address}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
