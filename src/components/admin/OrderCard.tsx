'use client';

import { useState } from 'react';
import { Order } from '@/lib/types';
import { updateOrderStatus } from '@/lib/orders';

interface OrderCardProps {
  order: Order;
  nextStatus: Order['status'] | null;
}

export default function OrderCard({ order, nextStatus }: OrderCardProps) {
  const [updating, setUpdating] = useState(false);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeElapsed = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `${hours}h ${minutes % 60}min`;
    }
    return `${minutes}min`;
  };

  const isUrgent = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    return minutes > 30;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleStatusUpdate = async (newStatus: Order['status']) => {
    if (updating) return;

    setUpdating(true);
    try {
      await updateOrderStatus(order.id, newStatus);
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      alert('Erro ao atualizar status do pedido');
    } finally {
      setUpdating(false);
    }
  };

  const getStatusButtonText = (status: Order['status']) => {
    switch (status) {
      case 'preparing': return 'Iniciar Preparo';
      case 'ready': return 'Marcar Pronto';
      case 'delivering': return 'Iniciar Entrega';
      case 'delivered': return 'Confirmar Entrega';
      default: return 'Próximo';
    }
  };

  const getStatusButtonColor = (status: Order['status']) => {
    switch (status) {
      case 'preparing': return 'btn-info';
      case 'ready': return 'btn-success';
      case 'delivering': return 'btn-primary';
      case 'delivered': return 'btn-secondary';
      default: return 'btn-primary';
    }
  };

  return (
    <div className="order-card mb-3">
      <div className={`card border-0 shadow-sm ${isUrgent(order.createdAt) ? 'border-danger border-2' : ''}`}>
        <div className={`card-header py-2 ${isUrgent(order.createdAt) ? 'bg-danger text-white' : 'bg-light'}`}>
          <div className="d-flex justify-content-between align-items-center">
            <small className={isUrgent(order.createdAt) ? 'text-white' : 'text-muted'}>
              <i className="fas fa-hashtag me-1"></i>
              #{order.id.slice(-6)}
              {isUrgent(order.createdAt) && (
                <i className="fas fa-exclamation-triangle ms-2"></i>
              )}
            </small>
            <small className="text-muted">
              {formatTime(order.createdAt)}
              <br />
              <span className={`badge ${isUrgent(order.createdAt) ? 'bg-danger' : 'bg-secondary'}`}>
                {getTimeElapsed(order.createdAt)}
              </span>
            </small>
          </div>
        </div>

        <div className="card-body p-3">
          {/* Informações do Cliente */}
          <div className="mb-3">
            <h6 className="mb-1">
              <i className="fas fa-user me-1"></i>
              {order.customer.name}
            </h6>
            <small className="text-muted d-block">
              <i className="fas fa-phone me-1"></i>
              {order.customer.phone}
            </small>
            {order.customer.address && (
              <small className="text-muted d-block">
                <i className="fas fa-map-marker-alt me-1"></i>
                {order.customer.address}
              </small>
            )}
            <small className="text-muted d-block">
              <i className="fas fa-shipping-fast me-1"></i>
              {order.customer.deliveryType === 'delivery' ? 'Entrega' : 'Retirada'}
            </small>
          </div>

          {/* Itens do Pedido */}
          <div className="mb-3">
            <h6 className="mb-2">Itens:</h6>
            <div className="order-items">
              {order.items.map((item, index) => (
                <div key={index} className="d-flex justify-content-between align-items-center mb-1">
                  <span className="small">
                    {item.quantity}x {item.name}
                  </span>
                  <span className="small text-muted">
                    {formatCurrency(item.subtotal)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Observações */}
          {order.customer.notes && (
            <div className="mb-3">
              <h6 className="mb-1">Observações:</h6>
              <small className="text-muted">
                {order.customer.notes}
              </small>
            </div>
          )}

          {/* Total */}
          <div className="border-top pt-2 mb-3">
            <div className="d-flex justify-content-between">
              <span>Total:</span>
              <strong>{formatCurrency(order.total)}</strong>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="d-grid gap-2">
            {order.status === 'pending' && (
              <button
                className="btn btn-success btn-sm"
                onClick={() => handleStatusUpdate('preparing')}
                disabled={updating}
              >
                {updating ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Aceitando...
                  </>
                ) : (
                  <>
                    <i className="fas fa-check me-1"></i>
                    Aceitar Pedido
                  </>
                )}
              </button>
            )}

            {nextStatus && order.status !== 'pending' && (
              <button
                className={`btn ${getStatusButtonColor(nextStatus)} btn-sm`}
                onClick={() => handleStatusUpdate(nextStatus)}
                disabled={updating}
              >
                {updating ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Atualizando...
                  </>
                ) : (
                  <>
                    <i className="fas fa-arrow-right me-1"></i>
                    {getStatusButtonText(nextStatus)}
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
