'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRestaurants } from '@/lib/useRestaurants'
import { Restaurant } from '@/types/restaurant'
import RestaurantsFallback from '@/components/RestaurantsFallback'

export default function RestaurantesPage() {
  const [filtroCategoria, setFiltroCategoria] = useState('')
  const [ordenacao, setOrdenacao] = useState('nome')
  const { restaurants, loading, error, loadRestaurants, loadRestaurantsByCategory } = useRestaurants()

  // Verificar se as funções estão disponíveis
  const hasLoadFunctions = loadRestaurants && loadRestaurantsByCategory

  const categorias = [...new Set(restaurants.map(r => r.category))]

  const restaurantesFiltrados = restaurants
    .filter(rest => !filtroCategoria || rest.category === filtroCategoria)
    .sort((a, b) => {
      switch (ordenacao) {
        case 'avaliacao':
          return (b.rating || 0) - (a.rating || 0)
        case 'tempo':
          // Extrair o primeiro número do tempo de entrega (ex: "30-45 min" -> 30)
          const tempoA = parseInt((a.deliveryTime || '0-0').split('-')[0]) || 0
          const tempoB = parseInt((b.deliveryTime || '0-0').split('-')[0]) || 0
          return tempoA - tempoB
        case 'taxa':
          return (a.deliveryFee || 0) - (b.deliveryFee || 0)
        default:
          return a.name.localeCompare(b.name)
      }
    })

  // Carregar restaurantes por categoria quando o filtro mudar
  useEffect(() => {
    if (!hasLoadFunctions) {
      console.warn('Funções de carregamento não disponíveis')
      return
    }

    if (filtroCategoria) {
      loadRestaurantsByCategory(filtroCategoria)
    } else {
      // Recarregar todos os restaurantes se não há filtro
      loadRestaurants()
    }
  }, [filtroCategoria, hasLoadFunctions])

  if (loading) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
            <p className="mt-3">Carregando restaurantes...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            <div className="alert alert-danger">
              <i className="fas fa-exclamation-triangle me-2"></i>
              {error}
            </div>
            <button
              className="btn btn-primary mt-3"
              onClick={() => {
                if (hasLoadFunctions) {
                  loadRestaurants()
                }
              }}
            >
              <i className="fas fa-refresh me-2"></i>
              Tentar Novamente
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!hasLoadFunctions) {
    console.warn('Funções de carregamento não disponíveis, usando fallback');
    return <RestaurantsFallback />;
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <div className="text-center mb-5">
            <i className="fas fa-store fa-3x text-primary mb-3"></i>
            <h1 className="display-4">Restaurantes</h1>
            <p className="lead text-secondary">
              Encontre os melhores restaurantes da sua região
            </p>
          </div>

          {/* Filtros e Ordenação */}
          <div className="row mb-4">
            <div className="col-md-6 mb-3">
              <label htmlFor="categoria" className="form-label">
                <i className="fas fa-filter me-2"></i>
                Filtrar por Categoria
              </label>
              <select
                className="form-select"
                id="categoria"
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
              >
                <option value="">Todas as categorias</option>
                {categorias.map(categoria => (
                  <option key={categoria} value={categoria}>{categoria}</option>
                ))}
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="ordenacao" className="form-label">
                <i className="fas fa-sort me-2"></i>
                Ordenar por
              </label>
              <select
                className="form-select"
                id="ordenacao"
                value={ordenacao}
                onChange={(e) => setOrdenacao(e.target.value)}
              >
                <option value="nome">Nome</option>
                <option value="avaliacao">Melhor Avaliação</option>
                <option value="tempo">Menor Tempo de Entrega</option>
                <option value="taxa">Menor Taxa de Entrega</option>
              </select>
            </div>
          </div>

          {/* Lista de Restaurantes */}
          <div className="row g-4">
            {restaurantesFiltrados.map(restaurante => (
              <div key={restaurante.id} className="col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm hover-shadow">
                  <div className="position-relative">
                    {restaurante.image ? (
                    <img
                        src={restaurante.image}
                      className="card-img-top"
                        alt={restaurante.name}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    ) : (
                      <div
                        className="card-img-top d-flex align-items-center justify-content-center bg-light"
                        style={{ height: '200px' }}
                      >
                        <i className="fas fa-store fa-3x text-muted"></i>
                      </div>
                    )}
                    <div className="position-absolute top-0 end-0 m-2">
                      <span className="badge bg-primary">
                        <i className="fas fa-star me-1"></i>
                        {restaurante.rating ? restaurante.rating.toFixed(1) : '0.0'}
                      </span>
                    </div>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{restaurante.name}</h5>
                    <p className="text-muted mb-2">
                      <i className="fas fa-utensils me-1"></i>
                      {restaurante.category}
                    </p>
                    <p className="card-text small">{restaurante.address}</p>

                    <div className="row text-center mb-3">
                      <div className="col-4">
                        <small className="text-muted d-block">
                          <i className="fas fa-clock me-1"></i>
                          Entrega
                        </small>
                        <small className="fw-bold">{restaurante.deliveryTime}</small>
                      </div>
                      <div className="col-4">
                        <small className="text-muted d-block">
                          <i className="fas fa-motorcycle me-1"></i>
                          Taxa
                        </small>
                        <small className="fw-bold">R$ {restaurante.deliveryFee ? restaurante.deliveryFee.toFixed(2) : '0.00'}</small>
                      </div>
                      <div className="col-4">
                        <small className="text-muted d-block">
                          <i className="fas fa-star me-1"></i>
                          Avaliação
                        </small>
                        <small className="fw-bold">{restaurante.rating ? restaurante.rating.toFixed(1) : '0.0'}</small>
                      </div>
                    </div>

                    <Link
                      href={`/r/${restaurante.id}`}
                      className="btn btn-primary w-100"
                    >
                      <i className="fas fa-eye me-2"></i>
                      Ver Cardápio
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {restaurantesFiltrados.length === 0 && (
            <div className="text-center py-5">
              <i className="fas fa-search fa-3x text-muted mb-3"></i>
              <h4>Nenhum restaurante encontrado</h4>
              <p className="text-muted">
                Tente ajustar os filtros para encontrar restaurantes disponíveis.
              </p>
            </div>
          )}

          {/* Estatísticas */}
          <div className="row mt-5 pt-5 border-top">
            <div className="col-md-3 text-center mb-3">
              <i className="fas fa-store fa-2x text-primary mb-2"></i>
              <h4>{restaurants.length}</h4>
              <small className="text-secondary">Restaurantes</small>
            </div>
            <div className="col-md-3 text-center mb-3">
              <i className="fas fa-utensils fa-2x text-primary mb-2"></i>
              <h4>{categorias.length}</h4>
              <small className="text-secondary">Categorias</small>
            </div>
            <div className="col-md-3 text-center mb-3">
              <i className="fas fa-star fa-2x text-primary mb-2"></i>
              <h4>
                {restaurants.length > 0
                  ? (restaurants.reduce((acc, r) => acc + (r.rating || 0), 0) / restaurants.length).toFixed(1)
                  : '0.0'
                }
              </h4>
              <small className="text-secondary">Avaliação Média</small>
            </div>
            <div className="col-md-3 text-center mb-3">
              <i className="fas fa-clock fa-2x text-primary mb-2"></i>
              <h4>
                {restaurants.length > 0
                  ? Math.round(
                    restaurants.reduce((acc, r) => {
                      const tempo = parseInt((r.deliveryTime || '0-0').split('-')[0]) || 0
                      return acc + tempo
                    }, 0) / restaurants.length
                  ) + ' min'
                  : '0 min'
                }
              </h4>
              <small className="text-secondary">Tempo Médio</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
