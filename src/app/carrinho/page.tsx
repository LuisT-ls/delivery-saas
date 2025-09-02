'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/lib/use-cart'
import { useAuthContext } from '@/components/AuthProvider'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function CarrinhoPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    total,
    subtotal,
    tax,
    isReady,
    isEmpty
  } = useCart()
  const { isAuthenticated } = useAuthContext()
  const router = useRouter()
  const [cupom, setCupom] = useState('')
  const [cupomAplicado, setCupomAplicado] = useState(false)
  const [showAddressModal, setShowAddressModal] = useState(false)
  const [endereco, setEndereco] = useState({
    rua: 'Rua das Flores, 123',
    bairro: 'Centro',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '01234-567',
    complemento: 'Apto 45'
  })

  // Se o carrinho não estiver pronto, mostra loading
  if (!isReady) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <i className="fas fa-spinner fa-spin fa-3x text-primary mb-3"></i>
            <h2>Carregando carrinho...</h2>
            <p className="text-muted">Aguarde enquanto carregamos seus itens</p>
          </div>
        </div>
      </div>
    )
  }

  // Mostra carrinho vazio se não há itens
  if (isEmpty || !items || items.length === 0) {
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

  const calcularTaxaEntrega = () => {
    return 5.00 // Taxa fixa de entrega
  }

  const calcularDesconto = () => {
    if (cupomAplicado && typeof subtotal === 'number' && !isNaN(subtotal)) {
      return subtotal * 0.10 // 10% de desconto
    }
    return 0
  }

  const calcularTotal = () => {
    const subtotalValue = typeof subtotal === 'number' && !isNaN(subtotal) ? subtotal : 0
    return subtotalValue + calcularTaxaEntrega() - calcularDesconto()
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
    try {
      if (!items || items.length === 0) {
        alert('Adicione itens ao carrinho antes de finalizar o pedido.')
        return
      }

      if (!isAuthenticated) {
        alert('Você precisa estar logado para finalizar o pedido.')
        router.push('/login')
        return
      }

      // TODO: Implementar lógica de finalização do pedido
      alert('Funcionalidade de finalização de pedido será implementada em breve!')
    } catch (err) {
      console.error('Erro ao finalizar pedido:', err)
      alert('Erro ao finalizar pedido. Tente novamente.')
    }
  }

  const salvarEndereco = (novoEndereco: any) => {
    try {
      setEndereco(novoEndereco)
      setShowAddressModal(false)
    } catch (err) {
      console.error('Erro ao salvar endereço:', err)
      alert('Erro ao salvar endereço. Tente novamente.')
    }
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8">
          <div className="d-flex align-items-center mb-4">
            <i className="fas fa-shopping-cart fa-2x text-primary me-3"></i>
            <h2 className="mb-0">Seu Carrinho</h2>
          </div>

          {/* Lista de Itens */}
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-light">
              <h5 className="mb-0">
                <i className="fas fa-list me-2"></i>
                Itens ({items.length})
              </h5>
            </div>
            <div className="card-body p-0">
              {items.map((item) => (
                <div key={item.itemId} className="border-bottom p-3">
                  <div className="row align-items-center">
                    <div className="col-md-2">
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="img-fluid rounded"
                        />
                      )}
                    </div>
                    <div className="col-md-4">
                      <h6 className="mb-1">{item.name}</h6>
                      <small className="text-muted">R$ {item.price.toFixed(2)}</small>
                    </div>
                    <div className="col-md-3">
                      <div className="input-group input-group-sm" style={{ width: '120px' }}>
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={() => updateQuantity(item.itemId, Math.max(1, item.quantity - 1))}
                        >
                          <i className="fas fa-minus"></i>
                        </button>
                        <input
                          type="number"
                          className="form-control text-center"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.itemId, Math.max(1, parseInt(e.target.value) || 1))}
                          min="1"
                        />
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={() => updateQuantity(item.itemId, item.quantity + 1)}
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                    </div>
                    <div className="col-md-2 text-end">
                      <strong>R$ {item.subtotal.toFixed(2)}</strong>
                    </div>
                    <div className="col-md-1 text-end">
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => removeItem(item.itemId)}
                        title="Remover item"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cupom */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h6 className="mb-3">
                <i className="fas fa-tag me-2"></i>
                Cupom de Desconto
              </h6>
              <div className="d-flex gap-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Digite seu cupom"
                  value={cupom}
                  onChange={(e) => setCupom(e.target.value)}
                  disabled={cupomAplicado}
                />
                {cupomAplicado ? (
                  <button
                    className="btn btn-outline-danger"
                    onClick={removerCupom}
                  >
                    <i className="fas fa-times me-2"></i>
                    Remover
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={aplicarCupom}
                  >
                    <i className="fas fa-check me-2"></i>
                    Aplicar
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Resumo do Pedido */}
        <div className="col-lg-4">
          <div className="card shadow-sm sticky-top" style={{ top: '2rem' }}>
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">
                <i className="fas fa-receipt me-2"></i>
                Resumo do Pedido
              </h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>R$ {subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Taxa de Entrega:</span>
                <span>R$ {calcularTaxaEntrega().toFixed(2)}</span>
              </div>
              {cupomAplicado && (
                <div className="d-flex justify-content-between mb-2 text-success">
                  <span>Desconto (10%):</span>
                  <span>-R$ {calcularDesconto().toFixed(2)}</span>
                </div>
              )}
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total:</strong>
                <strong className="text-primary">R$ {calcularTotal().toFixed(2)}</strong>
              </div>
              <button
                className="btn btn-primary w-100 btn-lg"
                onClick={finalizarPedido}
              >
                <i className="fas fa-credit-card me-2"></i>
                Finalizar Pedido
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
