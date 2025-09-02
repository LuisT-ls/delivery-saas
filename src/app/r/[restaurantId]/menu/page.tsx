import { notFound } from 'next/navigation';
import { getRestaurant, getMenuWithCategories } from '@/lib/restaurant-data';
import MenuItemCard from '@/components/MenuItemCard';

interface MenuPageProps {
  params: {
    restaurantId: string;
  };
}

export default async function MenuPage({ params }: MenuPageProps) {
  const { restaurantId } = params;

  // Buscar dados do restaurante e menu
  const restaurant = await getRestaurant(restaurantId);
  const menuWithCategories = await getMenuWithCategories(restaurantId);

  // Se o restaurante não existir, mostrar 404
  if (!restaurant) {
    notFound();
  }

  return (
    <div className="min-vh-100 bg-light">
      {/* Header do Restaurante */}
      <div className="bg-white shadow-sm">
        <div className="container py-4">
          <div className="row align-items-center">
            <div className="col-md-2">
              {restaurant.logo && (
                <img
                  src={restaurant.logo}
                  alt={restaurant.name}
                  className="img-fluid rounded"
                  style={{ maxHeight: '80px' }}
                />
              )}
            </div>
            <div className="col-md-10">
              <h1 className="h3 mb-1">{restaurant.name}</h1>
              <p className="text-muted mb-2">{restaurant.description}</p>
              <div className="d-flex flex-wrap gap-3 text-muted small">
                <span>
                  <i className="fas fa-map-marker-alt me-1"></i>
                  {restaurant.address}
                </span>
                <span>
                  <i className="fas fa-phone me-1"></i>
                  {restaurant.phone}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Banner do Restaurante */}
      {restaurant.banner && (
        <div className="container-fluid p-0">
          <div className="position-relative">
            <img
              src={restaurant.banner}
              alt={restaurant.name}
              className="w-100"
              style={{ height: '300px', objectFit: 'cover' }}
            />
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center">
              <div className="text-center text-white">
                <h2 className="display-6 fw-bold">{restaurant.name}</h2>
                <p className="lead">{restaurant.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Menu */}
      <div className="container py-5">
        {menuWithCategories.length === 0 ? (
          <div className="text-center py-5">
            <i className="fas fa-utensils fa-3x text-muted mb-3"></i>
            <h3 className="text-muted">Menu não disponível</h3>
            <p className="text-muted">Este restaurante ainda não possui itens no menu.</p>
          </div>
        ) : (
          <div className="row">
            {menuWithCategories.map((menuSection) => (
              <div key={menuSection.category.id} className="col-12 mb-5">
                <div className="d-flex align-items-center mb-4">
                  {menuSection.category.image && (
                    <img
                      src={menuSection.category.image}
                      alt={menuSection.category.name}
                      className="rounded me-3"
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                    />
                  )}
                  <div>
                    <h2 className="h4 mb-1">{menuSection.category.name}</h2>
                    {menuSection.category.description && (
                      <p className="text-muted mb-0">{menuSection.category.description}</p>
                    )}
                  </div>
                </div>

                <div className="row g-4">
                  {menuSection.items.map((item) => (
                    <MenuItemCard key={item.id} item={item} restaurantId={restaurantId} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white py-4 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h5>{restaurant.name}</h5>
              <p className="mb-0">{restaurant.description}</p>
            </div>
            <div className="col-md-6 text-md-end">
              <h6>Contato</h6>
              <p className="mb-1">
                <i className="fas fa-phone me-2"></i>
                {restaurant.phone}
              </p>
              <p className="mb-0">
                <i className="fas fa-envelope me-2"></i>
                {restaurant.email}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
