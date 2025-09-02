'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/lib/cart-store'
import { useAuthContext } from '@/components/AuthProvider'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function CarrinhoPage() {
  const { items, updateQuantity, removeItem, clearCart, total, subtotal, tax } = useCartStore()
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

  const calcularTaxaEntrega = () => {
    return 5.00 // Taxa fixa de entrega
  }

  const calcularDesconto = () => {
    if (cupomAplicado) {
      return subtotal * 0.10 // 10% de desconto
    }
    return 0
  }

  const calcularTotal = () => {
    return subtotal + calcularTaxaEntrega() - calcularDesconto()
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
    if (items.length === 0) {
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
  }

  const salvarEndereco = (novoEndereco: any) => {
    setEndereco(novoEndereco)
    setShowAddressModal(false)
  }

  if (items.length === 0) {
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
               <small className="text-muted">{items.length} item(s)</small>
             </div>
          </div>

          {/* Lista de Itens */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              {items.map(item => (
                <div key={item.itemId} className="row align-items-center py-3 border-bottom">
                  <div className="col-md-2">
                    <div className="position-relative" style={{ width: '80px', height: '80px' }}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="rounded"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <h6 className="mb-1">{item.name}</h6>
                    <small className="text-muted">Restaurante</small>
                  </div>
                  <div className="col-md-2">
                    <div className="input-group input-group-sm">
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => updateQuantity(item.itemId, item.quantity - 1)}
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                      <input
                        type="number"
                        className="form-control text-center"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.itemId, parseInt(e.target.value) || 0)}
                        min="0"
                        style={{ width: '60px' }}
                      />
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => updateQuantity(item.itemId, item.quantity + 1)}
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>
                  <div className="col-md-2 text-end">
                    <strong>R$ {item.subtotal.toFixed(2)}</strong>
                    <div className="text-muted small">
                      R$ {item.price.toFixed(2)} cada
                    </div>
                  </div>
                  <div className="col-md-2 text-end">
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => removeItem(item.itemId)}
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
                <span>R$ {subtotal.toFixed(2)}</span>
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
                <div className="fw-bold">
                  {endereco.rua}, {endereco.bairro}
                  <br />
                  {endereco.cidade} - {endereco.estado}
                  <br />
                  CEP: {endereco.cep}
                  {endereco.complemento && (
                    <>
                      <br />
                      {endereco.complemento}
                    </>
                  )}
                </div>
              </div>
              <button
                className="btn btn-sm btn-outline-secondary w-100"
                onClick={() => setShowAddressModal(true)}
              >
                <i className="fas fa-edit me-1"></i>
                Alterar Endereço
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Alterar Endereço */}
      {showAddressModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="fas fa-map-marker-alt me-2"></i>
                  Alterar Endereço de Entrega
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowAddressModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <AddressForm
                  endereco={endereco}
                  onSave={salvarEndereco}
                  onCancel={() => setShowAddressModal(false)}
                />
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </div>
      )}
    </div>
  )
}

// Componente do formulário de endereço
function AddressForm({ endereco, onSave, onCancel }: any) {
  const [formData, setFormData] = useState(endereco)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-12 mb-3">
          <label htmlFor="rua" className="form-label">Rua e Número *</label>
          <input
            type="text"
            className="form-control"
            id="rua"
            name="rua"
            value={formData.rua}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="bairro" className="form-label">Bairro *</label>
          <input
            type="text"
            className="form-control"
            id="bairro"
            name="bairro"
            value={formData.bairro}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="cidade" className="form-label">Cidade *</label>
          <input
            type="text"
            className="form-control"
            id="cidade"
            name="cidade"
            value={formData.cidade}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="estado" className="form-label">Estado *</label>
          <input
            type="text"
            className="form-control"
            id="estado"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="cep" className="form-label">CEP *</label>
          <input
            type="text"
            className="form-control"
            id="cep"
            name="cep"
            value={formData.cep}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12 mb-3">
          <label htmlFor="complemento" className="form-label">Complemento</label>
          <input
            type="text"
            className="form-control"
            id="complemento"
            name="complemento"
            value={formData.complemento}
            onChange={handleChange}
            placeholder="Apartamento, bloco, etc."
          />
        </div>
      </div>
      <div className="d-flex gap-2 justify-content-end">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="btn btn-primary">
          Salvar Endereço
        </button>
      </div>
    </form>
  )
}
