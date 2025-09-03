'use client'

import { useState } from 'react'
import Link from 'next/link'

// Dados mockados de restaurantes
const mockRestaurantes = [
  {
    id: 'rest1',
    nome: 'Restaurante Italiano Bella Vista',
    categoria: 'Italiana',
    avaliacao: 4.8,
    tempoEntrega: '30-45 min',
    taxaEntrega: 'R$ 5,00',
    imagem: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop',
    descricao: 'Autêntica culinária italiana com massas frescas e pizzas tradicionais.'
  },
  {
    id: 'rest2',
    nome: 'Sushi Master',
    categoria: 'Japonesa',
    avaliacao: 4.9,
    tempoEntrega: '25-40 min',
    taxaEntrega: 'R$ 8,00',
    imagem: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
    descricao: 'Sushi e sashimi frescos preparados por chefs especializados.'
  },
  {
    id: 'rest3',
    nome: 'Burger House',
    categoria: 'Hambúrgueres',
    avaliacao: 4.6,
    tempoEntrega: '20-35 min',
    taxaEntrega: 'R$ 3,00',
    imagem: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop',
    descricao: 'Hambúrgueres artesanais com ingredientes premium e batatas fritas crocantes.'
  },
  {
    id: 'rest4',
    nome: 'Pizza Express',
    categoria: 'Pizzaria',
    avaliacao: 4.7,
    tempoEntrega: '35-50 min',
    taxaEntrega: 'R$ 6,00',
    imagem: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop',
    descricao: 'Pizzas tradicionais e gourmet com massa artesanal e ingredientes frescos.'
  },
  {
    id: 'rest5',
    nome: 'Churrascaria Gaúcha',
    categoria: 'Churrascaria',
    avaliacao: 4.5,
    tempoEntrega: '40-60 min',
    taxaEntrega: 'R$ 10,00',
    imagem: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop',
    descricao: 'Carnes nobres grelhadas no estilo gaúcho com acompanhamentos tradicionais.'
  },
  {
    id: 'rest6',
    nome: 'Doceria Sweet Dreams',
    categoria: 'Doces e Sobremesas',
    avaliacao: 4.8,
    tempoEntrega: '15-30 min',
    taxaEntrega: 'R$ 4,00',
    imagem: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop',
    descricao: 'Doces artesanais, bolos e sobremesas deliciosas para adoçar seu dia.'
  }
]

export default function RestaurantesPage() {
  const [filtroCategoria, setFiltroCategoria] = useState('')
  const [ordenacao, setOrdenacao] = useState('nome')

  const categorias = [...new Set(mockRestaurantes.map(r => r.categoria))]

  const restaurantesFiltrados = mockRestaurantes
    .filter(rest => !filtroCategoria || rest.categoria === filtroCategoria)
    .sort((a, b) => {
      switch (ordenacao) {
        case 'avaliacao':
          return b.avaliacao - a.avaliacao
        case 'tempo':
          return parseInt(a.tempoEntrega.split('-')[0]) - parseInt(b.tempoEntrega.split('-')[0])
        case 'taxa':
          return parseFloat(a.taxaEntrega.replace('R$ ', '').replace(',', '.')) -
            parseFloat(b.taxaEntrega.replace('R$ ', '').replace(',', '.'))
        default:
          return a.nome.localeCompare(b.nome)
      }
    })

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
                    <img
                      src={restaurante.imagem}
                      className="card-img-top"
                      alt={restaurante.nome}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="position-absolute top-0 end-0 m-2">
                      <span className="badge bg-primary">
                        <i className="fas fa-star me-1"></i>
                        {restaurante.avaliacao}
                      </span>
                    </div>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{restaurante.nome}</h5>
                    <p className="text-muted mb-2">
                      <i className="fas fa-utensils me-1"></i>
                      {restaurante.categoria}
                    </p>
                    <p className="card-text small">{restaurante.descricao}</p>

                    <div className="row text-center mb-3">
                      <div className="col-4">
                        <small className="text-muted d-block">
                          <i className="fas fa-clock me-1"></i>
                          Entrega
                        </small>
                        <small className="fw-bold">{restaurante.tempoEntrega}</small>
                      </div>
                      <div className="col-4">
                        <small className="text-muted d-block">
                          <i className="fas fa-motorcycle me-1"></i>
                          Taxa
                        </small>
                        <small className="fw-bold">{restaurante.taxaEntrega}</small>
                      </div>
                      <div className="col-4">
                        <small className="text-muted d-block">
                          <i className="fas fa-star me-1"></i>
                          Avaliação
                        </small>
                        <small className="fw-bold">{restaurante.avaliacao}</small>
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
              <h4>{mockRestaurantes.length}+</h4>
              <small className="text-secondary">Restaurantes</small>
            </div>
            <div className="col-md-3 text-center mb-3">
              <i className="fas fa-utensils fa-2x text-primary mb-2"></i>
              <h4>{categorias.length}</h4>
              <small className="text-secondary">Categorias</small>
            </div>
            <div className="col-md-3 text-center mb-3">
              <i className="fas fa-star fa-2x text-primary mb-2"></i>
              <h4>4.7</h4>
              <small className="text-secondary">Avaliação Média</small>
            </div>
            <div className="col-md-3 text-center mb-3">
              <i className="fas fa-clock fa-2x text-primary mb-2"></i>
              <h4>30 min</h4>
              <small className="text-secondary">Tempo Médio</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
