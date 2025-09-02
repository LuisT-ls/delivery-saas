'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/cart-store';
import { CustomerInfo, OrderItem } from '@/lib/types';
import { createOrder } from '@/lib/orders';

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const { items, subtotal, tax, total, restaurantId, clearCart } = useCartStore();

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    phone: '',
    address: '',
    deliveryType: 'delivery',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Verifica se o carrinho está vazio ou se é do restaurante correto
  useEffect(() => {
    if (items.length === 0) {
      router.push(`/r/${params.restaurantId}`);
      return;
    }

    if (restaurantId !== params.restaurantId) {
      router.push(`/r/${params.restaurantId}`);
      return;
    }
  }, [items, restaurantId, params.restaurantId, router]);

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Validação básica
      if (!customerInfo.name.trim()) {
        throw new Error('Nome é obrigatório');
      }
      if (!customerInfo.phone.trim()) {
        throw new Error('Telefone é obrigatório');
      }
      if (customerInfo.deliveryType === 'delivery' && !customerInfo.address.trim()) {
        throw new Error('Endereço é obrigatório para entrega');
      }

      const orderItems: OrderItem[] = items.map(item => ({
        itemId: item.itemId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.subtotal
      }));

      const order = await createOrder({
        restaurantId: restaurantId!,
        items: orderItems,
        customer: customerInfo,
        subtotal,
        tax,
        total
      });

      // Limpa o carrinho e redireciona
      clearCart();
      router.push(`/r/${params.restaurantId}/pedido/${order.id}`);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar pedido');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <h3>Carrinho vazio</h3>
          <p>Adicione itens ao carrinho para continuar.</p>
          <a href={`/r/${params.restaurantId}`} className="btn btn-primary">
            Voltar ao Menu
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header">
              <h4 className="mb-0">
                <i className="fas fa-user me-2"></i>
                Informações do Cliente
              </h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="name" className="form-label">Nome *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={customerInfo.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="phone" className="form-label">Telefone *</label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      value={customerInfo.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Tipo de Pedido</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="deliveryType"
                      id="delivery"
                      value="delivery"
                      checked={customerInfo.deliveryType === 'delivery'}
                      onChange={(e) => handleInputChange('deliveryType', e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="delivery">
                      Entrega
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="deliveryType"
                      id="pickup"
                      value="pickup"
                      checked={customerInfo.deliveryType === 'pickup'}
                      onChange={(e) => handleInputChange('deliveryType', e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="pickup">
                      Retirada
                    </label>
                  </div>
                </div>

                {customerInfo.deliveryType === 'delivery' && (
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">Endereço de Entrega *</label>
                    <textarea
                      className="form-control"
                      id="address"
                      rows={3}
                      value={customerInfo.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      required
                    />
                  </div>
                )}

                <div className="mb-3">
                  <label htmlFor="notes" className="form-label">Observações</label>
                  <textarea
                    className="form-control"
                    id="notes"
                    rows={2}
                    value={customerInfo.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Instruções especiais, alergias, etc."
                  />
                </div>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Processando...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-check me-2"></i>
                      Confirmar Pedido
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="fas fa-receipt me-2"></i>
                Resumo do Pedido
              </h5>
            </div>
            <div className="card-body">
              <div className="list-group list-group-flush">
                {items.map((item) => (
                  <div key={item.itemId} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-1">{item.name}</h6>
                      <small className="text-muted">
                        {item.quantity}x R$ {item.price.toFixed(2)}
                      </small>
                    </div>
                    <span className="fw-bold">R$ {item.subtotal.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>R$ {subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Taxas:</span>
                <span>R$ {tax.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between fw-bold fs-5">
                <span>Total:</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
