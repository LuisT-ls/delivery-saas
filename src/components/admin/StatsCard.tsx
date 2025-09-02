'use client';

import { Order } from '@/lib/types';

interface StatsCardProps {
  orders: Order[];
}

export default function StatsCard({ orders }: StatsCardProps) {
  const getOrdersByStatus = (status: Order['status']) => {
    return orders.filter(order => order.status === status);
  };

  const getUrgentOrders = () => {
    return orders.filter(order => {
      const now = new Date();
      const diff = now.getTime() - order.createdAt.getTime();
      const minutes = Math.floor(diff / (1000 * 60));
      return minutes > 30 && order.status === 'pending';
    });
  };

  const getTodayOrders = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return orders.filter(order => order.createdAt >= today);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const totalRevenue = getTodayOrders().reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="row mb-4">
      <div className="col-md-3 mb-3">
        <div className="card bg-primary text-white">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <div>
                <h4 className="mb-0">{getOrdersByStatus('pending').length}</h4>
                <small>Pedidos Pendentes</small>
              </div>
              <i className="fas fa-clock fa-2x opacity-75"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-3 mb-3">
        <div className="card bg-warning text-white">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <div>
                <h4 className="mb-0">{getUrgentOrders().length}</h4>
                <small>Pedidos Urgentes</small>
              </div>
              <i className="fas fa-exclamation-triangle fa-2x opacity-75"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-3 mb-3">
        <div className="card bg-success text-white">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <div>
                <h4 className="mb-0">{getTodayOrders().length}</h4>
                <small>Pedidos Hoje</small>
              </div>
              <i className="fas fa-calendar-day fa-2x opacity-75"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-3 mb-3">
        <div className="card bg-info text-white">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <div>
                <h4 className="mb-0">{formatCurrency(totalRevenue)}</h4>
                <small>Receita Hoje</small>
              </div>
              <i className="fas fa-dollar-sign fa-2x opacity-75"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
