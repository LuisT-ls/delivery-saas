'use client';

import { useState } from 'react';
import Link from 'next/link';

// Dados mockados como fallback
const mockRestaurantes = [
  {
    id: 'rest1',
    name: 'Restaurante Italiano Bella Vista',
    category: 'Italiana',
    rating: 4.8,
    deliveryTime: '30-45 min',
    deliveryFee: 5.00,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop',
    address: 'Rua das Flores, 123 - Centro'
  },
  {
    id: 'rest2',
    name: 'Sushi Master',
    category: 'Japonesa',
    rating: 4.9,
    deliveryTime: '25-40 min',
    deliveryFee: 8.00,
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
    address: 'Av. Paulista, 456 - Bela Vista'
  },
  {
    id: 'rest3',
    name: 'Burger House',
    category: 'Hambúrgueres',
    rating: 4.6,
    deliveryTime: '20-35 min',
    deliveryFee: 3.00,
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop',
    address: 'Rua da Liberdade, 789 - Centro'
  }
];

export default function RestaurantsFallback() {
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [ordenacao, setOrdenacao] = useState('nome');

  const categorias = [...new Set(mockRestaurantes.map(r => r.category))];

  const restaurantesFiltrados = mockRestaurantes
    .filter(rest => !filtroCategoria || rest.category === filtroCategoria)
    .sort((a, b) => {
      switch (ordenacao) {
        case 'avaliacao':
          return b.rating - a.rating;
        case 'tempo':
          const tempoA = parseInt(a.deliveryTime.split('-')[0]) || 0;
          const tempoB = parseInt(b.deliveryTime.split('-')[0]) || 0;
          return tempoA - tempoB;
        case 'taxa':
          return a.deliveryFee - b.deliveryFee;
        default:
          return a.name.localeCompare(b.name);
      }
    });

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
            <div className="alert alert-info">
              <i className="fas fa-info-circle me-2"></i>
              <strong>Modo Demo:</strong> Exibindo dados de exemplo. Conecte-se ao Firebase para ver dados reais.
            </div>
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
                    <img
                      src={restaurante.image}
                      className="card-img-top"
                      alt={restaurante.name}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="position-absolute top-0 end-0 m-2">
                      <span className="badge bg-primary">
                        <i className="fas fa-star me-1"></i>
                        {restaurante.rating}
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
                        <small className="fw-bold">R$ {restaurante.deliveryFee.toFixed(2)}</small>
                      </div>
                      <div className="col-4">
                        <small className="text-muted d-block">
                          <i className="fas fa-star me-1"></i>
                          Avaliação
                        </small>
                        <small className="fw-bold">{restaurante.rating}</small>
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
              <h4>{mockRestaurantes.length}</h4>
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
                {(mockRestaurantes.reduce((acc, r) => acc + r.rating, 0) / mockRestaurantes.length).toFixed(1)}
              </h4>
              <small className="text-secondary">Avaliação Média</small>
            </div>
            <div className="col-md-3 text-center mb-3">
              <i className="fas fa-clock fa-2x text-primary mb-2"></i>
              <h4>
                {Math.round(
                  mockRestaurantes.reduce((acc, r) => {
                    const tempo = parseInt(r.deliveryTime.split('-')[0]) || 0;
                    return acc + tempo;
                  }, 0) / mockRestaurantes.length
                )} min
              </h4>
              <small className="text-secondary">Tempo Médio</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
