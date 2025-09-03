'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState('overview')

  const demoSteps = [
    {
      id: 1,
      title: 'Cadastro do Restaurante',
      description: 'Configure seu restaurante em poucos minutos',
      icon: 'fas fa-store',
      color: 'text-primary'
    },
    {
      id: 2,
      title: 'Cardápio Digital',
      description: 'Crie e gerencie seu cardápio online',
      icon: 'fas fa-utensils',
      color: 'text-success'
    },
    {
      id: 3,
      title: 'Recebimento de Pedidos',
      description: 'Receba pedidos em tempo real',
      icon: 'fas fa-shopping-cart',
      color: 'text-warning'
    },
    {
      id: 4,
      title: 'Gestão de Entregas',
      description: 'Acompanhe entregas em tempo real',
      icon: 'fas fa-truck',
      color: 'text-info'
    }
  ]

  const features = [
    {
      title: 'Dashboard Intuitivo',
      description: 'Interface limpa e fácil de usar para gerenciar seu negócio',
      icon: 'fas fa-tachometer-alt',
      color: 'bg-primary'
    },
    {
      title: 'Relatórios Detalhados',
      description: 'Analise vendas, pedidos e performance do seu restaurante',
      icon: 'fas fa-chart-bar',
      color: 'bg-success'
    },
    {
      title: 'Notificações em Tempo Real',
      description: 'Receba alertas instantâneos sobre novos pedidos',
      icon: 'fas fa-bell',
      color: 'bg-warning'
    },
    {
      title: 'Integração com Pagamentos',
      description: 'Aceite cartões, PIX e dinheiro com segurança',
      icon: 'fas fa-credit-card',
      color: 'bg-info'
    }
  ]

  return (
    <div className="container-fluid px-3 px-md-4 px-lg-5 py-4 py-md-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="display-4 display-md-3 display-lg-4 fw-bold mb-3 text-break">
          <i className="fas fa-play-circle text-primary me-3"></i>
          Demonstração do Sistema
        </h1>
        <p className="lead text-secondary text-break px-2">
          Veja como o Delivery SaaS pode transformar seu restaurante
        </p>
        <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center mt-4">
          <Link href="/cadastro" className="btn btn-primary btn-lg">
            <i className="fas fa-rocket me-2"></i>
            Começar Gratuitamente
          </Link>
          <Link href="/contato" className="btn btn-outline-secondary btn-lg">
            <i className="fas fa-envelope me-2"></i>
            Falar com Especialista
          </Link>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="row mb-5">
        <div className="col-12">
          <ul className="nav nav-tabs nav-fill" id="demoTabs" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                <i className="fas fa-eye me-2"></i>
                Visão Geral
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'features' ? 'active' : ''}`}
                onClick={() => setActiveTab('features')}
              >
                <i className="fas fa-star me-2"></i>
                Recursos
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'pricing' ? 'active' : ''}`}
                onClick={() => setActiveTab('pricing')}
              >
                <i className="fas fa-tags me-2"></i>
                Planos
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Tab Content */}
      <div className="tab-content" id="demoTabContent">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="row">
            <div className="col-12 col-lg-8 mx-auto">
              <div className="text-center mb-5">
                <h3 className="fw-bold mb-4">Como Funciona</h3>
                <p className="text-muted">
                  Em apenas 4 passos simples, você terá seu restaurante funcionando online
                </p>
              </div>

              <div className="row g-4">
                {demoSteps.map((step, index) => (
                  <div key={step.id} className="col-12 col-md-6">
                    <div className="card h-100 border-0 shadow-sm h-100">
                      <div className="card-body text-center p-4">
                        <div className={`${step.color} mb-3`}>
                          <i className={`${step.icon} fa-3x`}></i>
                        </div>
                        <h5 className="card-title fw-bold mb-2">{step.title}</h5>
                        <p className="card-text text-muted">{step.description}</p>
                        <div className="badge bg-primary fs-6">{index + 1}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Features Tab */}
        {activeTab === 'features' && (
          <div className="row">
            <div className="col-12">
              <div className="text-center mb-5">
                <h3 className="fw-bold mb-4">Recursos Principais</h3>
                <p className="text-muted">
                  Descubra todas as funcionalidades que tornam nosso sistema único
                </p>
              </div>

              <div className="row g-4">
                {features.map((feature, index) => (
                  <div key={index} className="col-12 col-md-6 col-lg-3">
                    <div className="card h-100 border-0 shadow-sm h-100">
                      <div className="card-body text-center p-4">
                        <div className={`${feature.color} text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3`} style={{ width: '60px', height: '60px' }}>
                          <i className={`${feature.icon} fa-2x`}></i>
                        </div>
                        <h5 className="card-title fw-bold mb-2">{feature.title}</h5>
                        <p className="card-text text-muted">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Pricing Tab */}
        {activeTab === 'pricing' && (
          <div className="row">
            <div className="col-12 col-lg-10 mx-auto">
              <div className="text-center mb-5">
                <h3 className="fw-bold mb-4">Planos e Preços</h3>
                <p className="text-muted">
                  Escolha o plano ideal para o seu restaurante
                </p>
              </div>

              <div className="row g-4">
                <div className="col-12 col-md-4">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body text-center p-4">
                      <h5 className="card-title text-primary fw-bold mb-3">Starter</h5>
                      <div className="mb-3">
                        <span className="display-6 fw-bold">Grátis</span>
                        <span className="text-muted">/mês</span>
                      </div>
                      <ul className="list-unstyled text-start mb-4">
                        <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Até 50 pedidos/mês</li>
                        <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Cardápio básico</li>
                        <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Suporte por email</li>
                      </ul>
                      <Link href="/cadastro" className="btn btn-outline-primary w-100">
                        Começar Grátis
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-4">
                  <div className="card h-100 border-0 shadow border-primary" style={{ transform: 'scale(1.05)' }}>
                    <div className="card-body text-center p-4">
                      <div className="badge bg-primary mb-2">Mais Popular</div>
                      <h5 className="card-title text-primary fw-bold mb-3">Professional</h5>
                      <div className="mb-3">
                        <span className="display-6 fw-bold">R$ 99</span>
                        <span className="text-muted">/mês</span>
                      </div>
                      <ul className="list-unstyled text-start mb-4">
                        <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Pedidos ilimitados</li>
                        <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Cardápio completo</li>
                        <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Relatórios avançados</li>
                        <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Suporte prioritário</li>
                      </ul>
                      <Link href="/cadastro" className="btn btn-primary w-100">
                        Começar Agora
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-4">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body text-center p-4">
                      <h5 className="card-title text-primary fw-bold mb-3">Enterprise</h5>
                      <div className="mb-3">
                        <span className="display-6 fw-bold">Sob consulta</span>
                      </div>
                      <ul className="list-unstyled text-start mb-4">
                        <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Múltiplos restaurantes</li>
                        <li className="mb-2"><i className="fas fa-check text-success me-2"></i>API personalizada</li>
                        <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Suporte 24/7</li>
                        <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Treinamento incluído</li>
                      </ul>
                      <Link href="/contato" className="btn btn-outline-secondary w-100">
                        Falar com Vendas
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="row mt-5">
        <div className="col-12">
          <div className="bg-primary text-white p-4 p-md-5 rounded text-center">
            <h3 className="fw-bold mb-3 h3-responsive">Pronto para experimentar?</h3>
            <p className="mb-4 px-2">
              Junte-se a centenas de restaurantes que já confiam no nosso sistema.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <Link href="/cadastro" className="btn btn-light btn-lg">
                <i className="fas fa-rocket me-2"></i>
                Criar Conta Gratuita
              </Link>
              <Link href="/contato" className="btn btn-outline-light btn-lg">
                <i className="fas fa-phone me-2"></i>
                Falar com Especialista
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

