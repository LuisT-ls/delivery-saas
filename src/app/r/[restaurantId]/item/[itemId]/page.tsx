import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getRestaurant, getMenuItem, getCategories } from '@/lib/restaurant-data';
import { formatPrice } from '@/lib/utils';
import AddToCartButton from '@/components/AddToCartButton';

interface ItemPageProps {
  params: {
    restaurantId: string;
    itemId: string;
  };
}

export default async function ItemPage({ params }: ItemPageProps) {
  const { restaurantId, itemId } = params;

  // Buscar dados do restaurante e item
  const restaurant = await getRestaurant(restaurantId);
  const item = await getMenuItem(itemId);
  const categories = await getCategories(restaurantId);

  // Se o restaurante ou item não existir, mostrar 404
  if (!restaurant || !item) {
    notFound();
  }

  // Buscar categoria do item
  const itemCategory = categories.find(cat => cat.id === item.categoryId);

  return (
    <div className="min-vh-100 bg-light">
      {/* Header do Restaurante */}
      <div className="bg-white shadow-sm">
        <div className="container py-3">
          <div className="row align-items-center">
            <div className="col-md-2">
              {restaurant.logo && (
                <img
                  src={restaurant.logo}
                  alt={restaurant.name}
                  className="img-fluid rounded"
                  style={{ maxHeight: '60px' }}
                />
              )}
            </div>
            <div className="col-md-8">
              <h1 className="h4 mb-1">{restaurant.name}</h1>
              <p className="text-muted mb-0 small">{restaurant.address}</p>
            </div>
            <div className="col-md-2 text-end">
              <Link
                href={`/r/${restaurantId}/menu`}
                className="btn btn-outline-primary btn-sm"
              >
                <i className="fas fa-arrow-left me-1"></i>
                Voltar ao Menu
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="container py-5">
        <div className="row">
          {/* Imagem do Item */}
          <div className="col-lg-6 mb-4">
            {item.image ? (
              <div className="position-relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="img-fluid rounded shadow"
                  style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                />
                {itemCategory && (
                  <div className="position-absolute top-0 start-0 m-3">
                    <span className="badge bg-primary fs-6">
                      {itemCategory.name}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-secondary rounded d-flex align-items-center justify-content-center"
                style={{ height: '400px' }}>
                <i className="fas fa-image fa-4x text-white-50"></i>
              </div>
            )}
          </div>

          {/* Detalhes do Item */}
          <div className="col-lg-6">
            <div className="bg-white rounded shadow-sm p-4 h-100">
              <div className="mb-3">
                <h1 className="h2 mb-2">{item.name}</h1>
                {itemCategory && (
                  <p className="text-muted mb-3">
                    <i className="fas fa-tag me-2"></i>
                    Categoria: {itemCategory.name}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <h3 className="text-success fw-bold fs-1 mb-3">
                  {formatPrice(item.price)}
                </h3>
                <div className="d-flex align-items-center mb-3">
                  <span className={`badge ${item.isAvailable ? 'bg-success' : 'bg-danger'} me-2`}>
                    {item.isAvailable ? 'Disponível' : 'Indisponível'}
                  </span>
                  {item.isAvailable && (
                    <span className="text-success">
                      <i className="fas fa-check-circle me-1"></i>
                      Pronto para pedido
                    </span>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <h4 className="h5 mb-3">Descrição</h4>
                <p className="text-muted lead">{item.description}</p>
              </div>

              {item.isAvailable && (
                <div className="d-grid gap-2">
                  <AddToCartButton item={item} className="btn-lg" />
                  <button className="btn btn-outline-primary">
                    <i className="fas fa-heart me-2"></i>
                    Favoritar
                  </button>
                </div>
              )}

              {!item.isAvailable && (
                <div className="alert alert-warning">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  Este item não está disponível no momento.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Informações do Restaurante */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="bg-white rounded shadow-sm p-4">
              <h3 className="h5 mb-3">Sobre o Restaurante</h3>
              <div className="row">
                <div className="col-md-6">
                  <p className="text-muted">{restaurant.description}</p>
                </div>
                <div className="col-md-6">
                  <div className="d-flex flex-column gap-2">
                    <div>
                      <i className="fas fa-map-marker-alt text-primary me-2"></i>
                      <span className="text-muted">{restaurant.address}</span>
                    </div>
                    <div>
                      <i className="fas fa-phone text-primary me-2"></i>
                      <span className="text-muted">{restaurant.phone}</span>
                    </div>
                    <div>
                      <i className="fas fa-envelope text-primary me-2"></i>
                      <span className="text-muted">{restaurant.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botão Voltar */}
        <div className="row mt-4">
          <div className="col-12 text-center">
            <Link
              href={`/r/${restaurantId}/menu`}
              className="btn btn-outline-secondary"
            >
              <i className="fas fa-arrow-left me-2"></i>
              Voltar ao Menu Completo
            </Link>
          </div>
        </div>
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
