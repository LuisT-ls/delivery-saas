'use client';

import { Order } from '@/lib/types';
import OrderCard from './OrderCard';

interface OrderBoardProps {
  orders: Order[];
}

const STATUS_CONFIG = {
  pending: {
    title: 'Pendentes',
    icon: 'fas fa-clock',
    color: 'warning',
    nextStatus: 'preparing'
  },
  preparing: {
    title: 'Preparando',
    icon: 'fas fa-fire',
    color: 'info',
    nextStatus: 'ready'
  },
  ready: {
    title: 'Prontos',
    icon: 'fas fa-check-circle',
    color: 'success',
    nextStatus: 'delivering'
  },
  delivering: {
    title: 'Entregando',
    icon: 'fas fa-truck',
    color: 'primary',
    nextStatus: 'delivered'
  },
  delivered: {
    title: 'Entregues',
    icon: 'fas fa-flag-checkered',
    color: 'secondary',
    nextStatus: null
  }
} as const;

export default function OrderBoard({ orders }: OrderBoardProps) {
  const getOrdersByStatus = (status: Order['status']) => {
    return orders.filter(order => order.status === status);
  };

  // Se não há pedidos, mostrar mensagem informativa
  if (orders.length === 0) {
    return (
      <div className="order-board">
        <div className="text-center py-5">
          <i className="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
          <h4 className="text-muted">Nenhum pedido ainda</h4>
          <p className="text-muted">
            Quando você receber pedidos, eles aparecerão aqui organizados por status.
          </p>
          <div className="mt-4">
            <small className="text-muted">
              <i className="fas fa-info-circle me-1"></i>
              Compartilhe o link do seu restaurante para começar a receber pedidos!
            </small>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="order-board">
      {/* Desktop Layout */}
      <div className="d-none d-md-block">
        <div className="row g-3">
          {Object.entries(STATUS_CONFIG).map(([status, config]) => {
            const statusOrders = getOrdersByStatus(status as Order['status']);

            return (
              <div key={status} className="col-md-2 col-lg-2">
                <div className={`card border-${config.color} h-100`}>
                  <div className={`card-header bg-${config.color} text-white`}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <i className={`${config.icon} me-2`}></i>
                        <strong>{config.title}</strong>
                      </div>
                      <span className="badge bg-light text-dark">
                        {statusOrders.length}
                      </span>
                    </div>
                  </div>
                  <div className="card-body p-2">
                    <div className="order-column">
                      {statusOrders.length === 0 ? (
                        <div className="text-center text-muted py-4">
                          <i className="fas fa-inbox fa-2x mb-2"></i>
                          <p className="mb-0">Nenhum pedido</p>
                        </div>
                      ) : (
                        statusOrders.map(order => (
                          <OrderCard
                            key={order.id}
                            order={order}
                            nextStatus={config.nextStatus}
                          />
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Layout with Horizontal Scroll */}
      <div className="d-md-none">
        <div className="order-board-mobile">
          <div className="d-flex gap-3 overflow-x-auto pb-3" style={{ scrollbarWidth: 'thin' }}>
            {Object.entries(STATUS_CONFIG).map(([status, config]) => {
              const statusOrders = getOrdersByStatus(status as Order['status']);

              return (
                <div key={status} className="flex-shrink-0" style={{ minWidth: '280px' }}>
                  <div className={`card border-${config.color} h-100`}>
                    <div className={`card-header bg-${config.color} text-white`}>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <i className={`${config.icon} me-2`}></i>
                          <strong>{config.title}</strong>
                        </div>
                        <span className="badge bg-light text-dark">
                          {statusOrders.length}
                        </span>
                      </div>
                    </div>
                    <div className="card-body p-2">
                      <div className="order-column" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                        {statusOrders.length === 0 ? (
                          <div className="text-center text-muted py-4">
                            <i className="fas fa-inbox fa-2x mb-2"></i>
                            <p className="mb-0">Nenhum pedido</p>
                          </div>
                        ) : (
                          statusOrders.map(order => (
                            <OrderCard
                              key={order.id}
                              order={order}
                              nextStatus={config.nextStatus}
                            />
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
