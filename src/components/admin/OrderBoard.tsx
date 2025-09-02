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

  return (
    <div className="order-board">
      <div className="row">
        {Object.entries(STATUS_CONFIG).map(([status, config]) => {
          const statusOrders = getOrdersByStatus(status as Order['status']);

          return (
            <div key={status} className="col-md-2 col-lg-2 mb-4">
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
  );
}
