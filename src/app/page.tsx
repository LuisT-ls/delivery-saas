export default function Home() {
  return (
    <div className="container py-5">
      {/* Hero Section */}
      <div className="row align-items-center mb-5">
        <div className="col-lg-6">
          <h1 className="display-4 fw-bold mb-4">
            Delivery SaaS
          </h1>
          <p className="lead mb-4">
            Sistema completo de delivery para restaurantes.
            Gerencie pedidos, cardápios e entregas em tempo real.
          </p>
          <div className="d-flex gap-3">
            <button className="btn btn-primary btn-lg">
              <i className="fas fa-rocket me-2"></i>
              Começar Agora
            </button>
            <button className="btn btn-outline-secondary btn-lg">
              <i className="fas fa-play me-2"></i>
              Ver Demo
            </button>
          </div>
        </div>
        <div className="col-lg-6 text-center">
          <i className="fas fa-utensils" style={{ fontSize: '200px', color: '#0d6efd' }}></i>
        </div>
      </div>

      {/* Features Section */}
      <div className="row mb-5">
        <div className="col-12 text-center mb-4">
          <h2 className="fw-bold">Recursos Principais</h2>
          <p className="text-secondary">Tudo que você precisa para gerenciar seu delivery</p>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center p-4">
              <i className="fas fa-mobile-alt fa-3x text-primary mb-3"></i>
              <h5 className="card-title">Aplicativo Mobile</h5>
              <p className="card-text">
                Aplicativo nativo para iOS e Android com interface intuitiva
                para clientes e entregadores.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center p-4">
              <i className="fas fa-chart-line fa-3x text-primary mb-3"></i>
              <h5 className="card-title">Painel Administrativo</h5>
              <p className="card-text">
                Dashboard completo com relatórios, analytics e gestão
                de pedidos em tempo real.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center p-4">
              <i className="fas fa-store fa-3x text-primary mb-3"></i>
              <h5 className="card-title">Múltiplos Restaurantes</h5>
              <p className="card-text">
                Suporte a múltiplos restaurantes com gestão independente
                de cardápios e pedidos.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="row">
        <div className="col-12 text-center">
          <div className="bg-light p-5 rounded">
            <h3 className="fw-bold mb-3 text-dark">Pronto para começar?</h3>
            <p className="text-muted mb-4">
              Junte-se a centenas de restaurantes que já confiam no nosso sistema.
            </p>
            <button className="btn btn-primary btn-lg">
              <i className="fas fa-user-plus me-2"></i>
              Criar Conta Gratuita
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
