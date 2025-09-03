'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const handleVerDemo = () => {
    // Redirecionar para uma página de demonstração ou abrir modal
    router.push('/demo')
  }

  return (
    <div className="container-fluid px-3 px-md-4 px-lg-5 py-4 py-md-5">
      {/* Hero Section */}
      <div className="row align-items-center justify-content-center mb-4 mb-md-5">
        <div className="col-12 col-lg-6 text-center text-lg-start mb-4 mb-lg-0">
          <h1 className="display-4 display-md-3 display-lg-4 fw-bold mb-3 mb-md-4 text-break">
            Delivery SaaS
          </h1>
          <p className="lead mb-3 mb-md-4 text-break">
            Sistema completo de delivery para restaurantes.
            Gerencie pedidos, cardápios e entregas em tempo real.
          </p>
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
            <Link href="/cadastro" className="btn btn-primary btn-lg w-100 w-sm-auto text-decoration-none">
              <i className="fas fa-rocket me-2"></i>
              Começar Agora
            </Link>
            <button
              className="btn btn-outline-secondary btn-lg w-100 w-sm-auto"
              onClick={handleVerDemo}
            >
              <i className="fas fa-play me-2"></i>
              Ver Demo
            </button>
          </div>
        </div>
        <div className="col-12 col-lg-6 text-center">
          <i className="fas fa-utensils hero-icon" style={{ fontSize: 'clamp(120px, 25vw, 200px)', color: '#0d6efd' }}></i>
        </div>
      </div>

      {/* Features Section */}
      <div className="row mb-4 mb-md-5">
        <div className="col-12 text-center mb-4">
          <h2 className="fw-bold h2-responsive">Recursos Principais</h2>
          <p className="text-secondary text-break px-2">
            Tudo que você precisa para gerenciar seu delivery
          </p>
        </div>

        <div className="col-12 col-md-6 col-lg-4 mb-4">
          <div className="card h-100 border-0 shadow-sm feature-card">
            <div className="card-body text-center p-3 p-md-4">
              <i className="fas fa-mobile-alt fa-2x fa-md-3x text-primary mb-3"></i>
              <h5 className="card-title h5-responsive">Aplicativo Mobile</h5>
              <p className="card-text text-break">
                Aplicativo nativo para iOS e Android com interface intuitiva
                para clientes e entregadores.
              </p>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4 mb-4">
          <div className="card h-100 border-0 shadow-sm feature-card">
            <div className="card-body text-center p-3 p-md-4">
              <i className="fas fa-chart-line fa-2x fa-md-3x text-primary mb-3"></i>
              <h5 className="card-title h5-responsive">Painel Administrativo</h5>
              <p className="card-text text-break">
                Dashboard completo com relatórios, analytics e gestão
                de pedidos em tempo real.
              </p>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4 mb-4">
          <div className="card h-100 border-0 shadow-sm feature-card">
            <div className="card-body text-center p-3 p-md-4">
              <i className="fas fa-store fa-2x fa-md-3x text-primary mb-3"></i>
              <h5 className="card-title h5-responsive">Múltiplos Restaurantes</h5>
              <p className="card-text text-break">
                Suporte a múltiplos restaurantes com gestão independente
                de cardápios e pedidos.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="row">
        <div className="col-12">
          <div className="bg-light p-4 p-md-5 rounded text-center">
            <h3 className="fw-bold mb-3 text-dark h3-responsive">Pronto para começar?</h3>
            <p className="text-muted mb-4 text-break px-2">
              Junte-se a centenas de restaurantes que já confiam no nosso sistema.
            </p>
            <Link href="/cadastro" className="btn btn-primary btn-lg w-100 w-sm-auto text-decoration-none">
              <i className="fas fa-user-plus me-2"></i>
              Criar Conta Gratuita
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
