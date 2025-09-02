'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getOrder } from '@/lib/orders';
import { Order } from '@/lib/types';

const statusConfig = {
  pending: {
    label: 'Pedido Recebido',
    icon: 'fas fa-clock',
    color: 'warning',
    description: 'Seu pedido foi recebido e está sendo processado.'
  },
  confirmed: {
    label: 'Pedido Confirmado',
    icon: 'fas fa-check-circle',
    color: 'info',
    description: 'Seu pedido foi confirmado e está sendo preparado.'
  },
  preparing: {
    label: 'Em Preparação',
    icon: 'fas fa-utensils',
    color: 'primary',
    description: 'Seu pedido está sendo preparado na cozinha.'
  },
  ready: {
    label: 'Pronto para Retirada',
    icon: 'fas fa-check-double',
    color: 'success',
    description: 'Seu pedido está pronto! Você pode retirá-lo.'
  },
  delivered: {
    label: 'Entregue',
    icon: 'fas fa-truck',
    color: 'success',
    description: 'Seu pedido foi entregue com sucesso!'
  },
  cancelled: {
    label: 'Cancelado',
    icon: 'fas fa-times-circle',
    color: 'danger',
    description: 'Seu pedido foi cancelado.'
  }
};

export default function OrderTrackingPage() {
  const params = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderData = await getOrder(params.orderId as string);
        if (!orderData) {
          setError('Pedido não encontrado');
          return;
        }
        setOrder(orderData);
      } catch (err) {
        setError('Erro ao carregar pedido');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();

    // Atualiza o pedido a cada 30 segundos
    const interval = setInterval(fetchOrder, 30000);
    return () => clearInterval(interval);
  }, [params.orderId]);

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
          <p className="mt-3">Carregando informações do pedido...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="alert alert-danger" role="alert">
            <i className="fas fa-exclamation-triangle me-2"></i>
            {error || 'Pedido não encontrado'}
          </div>
          <a href={`/r/${params.restaurantId}`} className="btn btn-primary">
            Voltar ao Menu
          </a>
        </div>
      </div>
    );
  }

  const currentStatus = statusConfig[order.status];

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {/* Header do Pedido */}
          <div className="card mb-4">
            <div className="card-header bg-primary text-white">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">
                  <i className="fas fa-receipt me-2"></i>
                  Pedido #{order.id.slice(-8).toUpperCase()}
                </h4>
                <span className="badge bg-light text-dark">
                  {new Date(order.createdAt).toLocaleString('pt-BR')}
                </span>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <h6>Cliente</h6>
                  <p className="mb-1"><strong>{order.customer.name}</strong></p>
                  <p className="mb-1">{order.customer.phone}</p>
                  {order.customer.address && (
                    <p className="mb-1 text-muted">{order.customer.address}</p>
                  )}
                  <p className="mb-0">
                    <span className="badge bg-secondary">
                      {order.customer.deliveryType === 'delivery' ? 'Entrega' : 'Retirada'}
                    </span>
                  </p>
                </div>
                <div className="col-md-6 text-md-end">
                  <h6>Total do Pedido</h6>
                  <p className="mb-1">Subtotal: R$ {order.subtotal.toFixed(2)}</p>
                  <p className="mb-1">Taxas: R$ {order.tax.toFixed(2)}</p>
                  <p className="mb-0 fs-5 fw-bold">Total: R$ {order.total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Status do Pedido */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="fas fa-tasks me-2"></i>
                Status do Pedido
              </h5>
            </div>
            <div className="card-body">
              <div className={`alert alert-${currentStatus.color} d-flex align-items-center`}>
                <i className={`${currentStatus.icon} fs-4 me-3`}></i>
                <div>
                  <h6 className="mb-1">{currentStatus.label}</h6>
                  <p className="mb-0">{currentStatus.description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Itens do Pedido */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="fas fa-list me-2"></i>
                Itens do Pedido
              </h5>
            </div>
            <div className="card-body">
              <div className="list-group list-group-flush">
                {order.items.map((item, index) => (
                  <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
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
            </div>
          </div>

          {/* Observações */}
          {order.customer.notes && (
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">
                  <i className="fas fa-sticky-note me-2"></i>
                  Observações
                </h5>
              </div>
              <div className="card-body">
                <p className="mb-0">{order.customer.notes}</p>
              </div>
            </div>
          )}

          {/* Botões de Ação */}
          <div className="d-grid gap-2 d-md-flex justify-content-md-center">
            <a href={`/r/${params.restaurantId}`} className="btn btn-outline-primary">
              <i className="fas fa-arrow-left me-2"></i>
              Voltar ao Menu
            </a>
            <button
              className="btn btn-primary"
              onClick={() => window.location.reload()}
            >
              <i className="fas fa-sync-alt me-2"></i>
              Atualizar Status
            </button>
          </div>

          {/* Informação de Atualização Automática */}
          <div className="text-center mt-4">
            <small className="text-muted">
              <i className="fas fa-info-circle me-1"></i>
              Esta página é atualizada automaticamente a cada 30 segundos
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
