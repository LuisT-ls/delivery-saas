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
    <div className="row mb-4 g-3">
      <div className="col-12 col-sm-6 col-md-3">
        <div className="card bg-primary text-white h-100">
          <div className="card-body p-3 p-md-4">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className="mb-0 h3-responsive">{getOrdersByStatus('pending').length}</h4>
                <small className="h6-responsive">Pedidos Pendentes</small>
              </div>
              <i className="fas fa-clock fa-2x fa-md-3x opacity-75"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-md-3">
        <div className="card bg-warning text-white h-100">
          <div className="card-body p-3 p-md-4">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className="mb-0 h3-responsive">{getUrgentOrders().length}</h4>
                <small className="h6-responsive">Pedidos Urgentes</small>
              </div>
              <i className="fas fa-exclamation-triangle fa-2x fa-md-3x opacity-75"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-md-3">
        <div className="card bg-success text-white h-100">
          <div className="card-body p-3 p-md-4">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className="mb-0 h3-responsive">{getTodayOrders().length}</h4>
                <small className="h6-responsive">Pedidos Hoje</small>
              </div>
              <i className="fas fa-calendar-day fa-2x fa-md-3x opacity-75"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-md-3">
        <div className="card bg-info text-white h-100">
          <div className="card-body p-3 p-md-4">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className="mb-0 h3-responsive">{formatCurrency(totalRevenue)}</h4>
                <small className="h6-responsive">Receita Hoje</small>
              </div>
              <i className="fas fa-dollar-sign fa-2x fa-md-3x opacity-75"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
