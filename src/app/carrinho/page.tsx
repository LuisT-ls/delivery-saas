'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// Dados mockados do carrinho
const mockCarrinho = [
  {
    id: 'item1',
    nome: 'Pizza Margherita',
    preco: 35.90,
    quantidade: 2,
    imagem: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100&h=100&fit=crop',
    restaurante: 'Pizza Express',
    observacoes: 'Sem cebola, borda recheada'
  },
  {
    id: 'item2',
    nome: 'Refrigerante Coca-Cola',
    preco: 8.50,
    quantidade: 1,
    imagem: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=100&h=100&fit=crop',
    restaurante: 'Pizza Express',
    observacoes: 'Lata 350ml'
  },
  {
    id: 'item3',
    nome: 'Hambúrguer Clássico',
    preco: 28.90,
    quantidade: 1,
    imagem: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=100&h=100&fit=crop',
    restaurante: 'Burger House',
    observacoes: 'Sem alface, extra bacon'
  }
]

export default function CarrinhoPage() {
  const [itens, setItens] = useState(mockCarrinho)
  const [cupom, setCupom] = useState('')
  const [cupomAplicado, setCupomAplicado] = useState(false)

  const calcularSubtotal = () => {
    return itens.reduce((total, item) => total + (item.preco * item.quantidade), 0)
  }

  const calcularTaxaEntrega = () => {
    // Taxa de entrega baseada no restaurante (simplificado)
    const restaurantes = [...new Set(itens.map(item => item.restaurante))]
    return restaurantes.length * 5.00
  }

  const calcularDesconto = () => {
    if (cupomAplicado) {
      return calcularSubtotal() * 0.10 // 10% de desconto
    }
    return 0
  }

  const calcularTotal = () => {
    return calcularSubtotal() + calcularTaxaEntrega() - calcularDesconto()
  }

  const atualizarQuantidade = (id: string, novaQuantidade: number) => {
    if (novaQuantidade <= 0) {
      setItens(itens.filter(item => item.id !== id))
    } else {
      setItens(itens.map(item =>
        item.id === id ? { ...item, quantidade: novaQuantidade } : item
      ))
    }
  }

  const aplicarCupom = () => {
    if (cupom.toLowerCase() === 'desconto10') {
      setCupomAplicado(true)
      alert('Cupom aplicado com sucesso! 10% de desconto.')
    } else {
      alert('Cupom inválido!')
    }
    setCupom('')
  }

  const removerCupom = () => {
    setCupomAplicado(false)
  }

  const finalizarPedido = () => {
    if (itens.length === 0) {
      alert('Adicione itens ao carrinho antes de finalizar o pedido.')
      return
    }

    // TODO: Implementar lógica de finalização do pedido
    alert('Funcionalidade de finalização de pedido será implementada em breve!')
  }

  if (itens.length === 0) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <i className="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
            <h2>Carrinho Vazio</h2>
            <p className="text-muted mb-4">
              Seu carrinho está vazio. Adicione alguns itens deliciosos!
            </p>
            <Link href="/restaurantes" className="btn btn-primary btn-lg">
              <i className="fas fa-store me-2"></i>
              Ver Restaurantes
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8">
          <div className="d-flex align-items-center mb-4">
            <i className="fas fa-shopping-cart fa-2x text-primary me-3"></i>
            <div>
              <h1 className="h3 mb-0">Seu Carrinho</h1>
              <small className="text-muted">{itens.length} item(s)</small>
            </div>
          </div>

          {/* Lista de Itens */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              {itens.map(item => (
                <div key={item.id} className="row align-items-center py-3 border-bottom">
                  <div className="col-md-2">
                    <img
                      src={item.imagem}
                      alt={item.nome}
                      className="img-fluid rounded"
                      style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="col-md-4">
                    <h6 className="mb-1">{item.nome}</h6>
                    <small className="text-muted">{item.restaurante}</small>
                    {item.observacoes && (
                      <div className="mt-1">
                        <small className="text-muted">
                          <i className="fas fa-info-circle me-1"></i>
                          {item.observacoes}
                        </small>
                      </div>
                    )}
                  </div>
                  <div className="col-md-2">
                    <div className="input-group input-group-sm">
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => atualizarQuantidade(item.id, item.quantidade - 1)}
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                      <input
                        type="number"
                        className="form-control text-center"
                        value={item.quantidade}
                        onChange={(e) => atualizarQuantidade(item.id, parseInt(e.target.value) || 0)}
                        min="0"
                        style={{ width: '60px' }}
                      />
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => atualizarQuantidade(item.id, item.quantidade + 1)}
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>
                  <div className="col-md-2 text-end">
                    <strong>R$ {(item.preco * item.quantidade).toFixed(2)}</strong>
                    <div className="text-muted small">
                      R$ {item.preco.toFixed(2)} cada
                    </div>
                  </div>
                  <div className="col-md-2 text-end">
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => atualizarQuantidade(item.id, 0)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cupom de Desconto */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <h6 className="card-title">
                <i className="fas fa-tag me-2"></i>
                Cupom de Desconto
              </h6>
              {cupomAplicado ? (
                <div className="alert alert-success">
                  <i className="fas fa-check-circle me-2"></i>
                  Cupom "DESCONTO10" aplicado! 10% de desconto.
                  <button
                    className="btn btn-sm btn-outline-danger ms-2"
                    onClick={removerCupom}
                  >
                    Remover
                  </button>
                </div>
              ) : (
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Digite seu cupom"
                    value={cupom}
                    onChange={(e) => setCupom(e.target.value)}
                  />
                  <button
                    className="btn btn-outline-primary"
                    onClick={aplicarCupom}
                  >
                    Aplicar
                  </button>
                </div>
              )}
              <small className="text-muted">
                Dica: Use o cupom "DESCONTO10" para 10% de desconto
              </small>
            </div>
          </div>
        </div>

        {/* Resumo do Pedido */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm sticky-top" style={{ top: '20px' }}>
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">
                <i className="fas fa-receipt me-2"></i>
                Resumo do Pedido
              </h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>R$ {calcularSubtotal().toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Taxa de Entrega:</span>
                <span>R$ {calcularTaxaEntrega().toFixed(2)}</span>
              </div>
              {cupomAplicado && (
                <div className="d-flex justify-content-between mb-2 text-success">
                  <span>Desconto:</span>
                  <span>- R$ {calcularDesconto().toFixed(2)}</span>
                </div>
              )}
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total:</strong>
                <strong className="text-primary">R$ {calcularTotal().toFixed(2)}</strong>
              </div>

              <button
                className="btn btn-primary w-100 mb-3"
                onClick={finalizarPedido}
              >
                <i className="fas fa-credit-card me-2"></i>
                Finalizar Pedido
              </button>

              <Link href="/restaurantes" className="btn btn-outline-primary w-100">
                <i className="fas fa-plus me-2"></i>
                Adicionar Mais Itens
              </Link>
            </div>
          </div>

          {/* Informações de Entrega */}
          <div className="card border-0 shadow-sm mt-3">
            <div className="card-body">
              <h6 className="card-title">
                <i className="fas fa-truck me-2"></i>
                Informações de Entrega
              </h6>
              <div className="mb-2">
                <small className="text-muted">Tempo estimado:</small>
                <div className="fw-bold">30-45 minutos</div>
              </div>
              <div className="mb-2">
                <small className="text-muted">Endereço:</small>
                <div className="fw-bold">Rua das Flores, 123 - Centro</div>
              </div>
              <button className="btn btn-sm btn-outline-secondary w-100">
                <i className="fas fa-edit me-1"></i>
                Alterar Endereço
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
