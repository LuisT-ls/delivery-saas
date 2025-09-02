'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from 'firebase/auth';
import { onAuthStateChange, signInWithGoogle, signOutUser, isGoogleUser } from '@/lib/auth';
import { Order } from '@/lib/types';
import OrderBoard from '@/components/admin/OrderBoard';
import LoginScreen from '@/components/admin/LoginScreen';
import LoadingScreen from '@/components/admin/LoadingScreen';
import NotificationSound from '@/components/admin/NotificationSound';
import StatsCard from '@/components/admin/StatsCard';
import { useOrdersRealtime, useNewOrderAlert } from '@/lib/admin-hooks';

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  const router = useRouter();

  const { orders, loading: ordersLoading, error } = useOrdersRealtime(restaurantId);
  const { newOrderAlert, setNewOrderAlert } = useNewOrderAlert(orders);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);

      if (user && isGoogleUser()) {
        // Para demo, vamos usar um restaurantId fixo
        // Em produção, isso viria do perfil do usuário ou configuração
        setRestaurantId('demo-restaurant-1');

        // Solicitar permissão de notificação
        if ('Notification' in window && Notification.permission === 'default') {
          setTimeout(() => {
            Notification.requestPermission();
          }, 1000);
        }
      }
    });

    return () => unsubscribe();
  }, []);



  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Erro no login:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOutUser();
      setRestaurantId(null);
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        alert('Notificações ativadas! Você receberá alertas de novos pedidos.');
      }
    }
  };

  if (loading || ordersLoading) {
    return <LoadingScreen />;
  }

  if (!user || !isGoogleUser()) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="admin-dashboard">
      <NotificationSound play={newOrderAlert} />

      <header className="admin-header">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="mb-0">
              <i className="fas fa-utensils me-2"></i>
              Painel do Restaurante
            </h1>
            <div className="d-flex align-items-center">
              <div className="me-4">
                <div className="d-flex gap-3">
                  <span className="badge bg-warning">
                    <i className="fas fa-clock me-1"></i>
                    {orders.filter(o => o.status === 'pending').length} Pendentes
                  </span>
                  <span className="badge bg-info">
                    <i className="fas fa-fire me-1"></i>
                    {orders.filter(o => o.status === 'preparing').length} Preparando
                  </span>
                  <span className="badge bg-success">
                    <i className="fas fa-check-circle me-1"></i>
                    {orders.filter(o => o.status === 'ready').length} Prontos
                  </span>
                </div>
              </div>
              <span className="me-3">
                <span className="status-indicator status-online"></span>
                <i className="fas fa-user me-1"></i>
                {user.email}
              </span>
              <button
                className="btn btn-outline-info me-2"
                onClick={requestNotificationPermission}
                title="Ativar notificações"
              >
                <i className="fas fa-bell me-1"></i>
                Notificações
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={handleLogout}
              >
                <i className="fas fa-sign-out-alt me-1"></i>
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="admin-main">
        <div className="container-fluid">
          {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              <i className="fas fa-exclamation-triangle me-2"></i>
              <strong>Erro:</strong> {error}
              <button
                type="button"
                className="btn-close"
                onClick={() => window.location.reload()}
              ></button>
            </div>
          )}

          {newOrderAlert && (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              <i className="fas fa-bell me-2"></i>
              <strong>Novo pedido recebido!</strong> Verifique a coluna "Pendentes".
              <button
                type="button"
                className="btn-close"
                onClick={() => setNewOrderAlert(false)}
              ></button>
            </div>
          )}

          <StatsCard orders={orders} />
          <OrderBoard orders={orders} />
        </div>
      </main>
    </div>
  );
}
