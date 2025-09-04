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
import { usePushNotifications } from '@/lib/use-push-notifications';
import { pushNotificationService } from '@/lib/push-notifications';
import { useAdminAccess } from '@/lib/useAdminAccess';
import { useAuthContext } from '@/components/AuthProvider';

export default function AdminPage() {
  const { user, isAuthenticated } = useAuthContext();
  const { hasAccess, restaurantId, restaurant, loading: adminLoading, error: adminError } = useAdminAccess();
  const router = useRouter();

  const { orders, loading: ordersLoading, error } = useOrdersRealtime(restaurantId);
  const { newOrderAlert, setNewOrderAlert } = useNewOrderAlert(orders);
  const {
    status: notificationStatus,
    isSupported,
    setupNotifications,
    removeToken
  } = usePushNotifications();

  // Configurar notificações push quando o usuário tiver acesso
  useEffect(() => {
    if (hasAccess && restaurantId && user) {
      setupPushNotifications(restaurantId, user.uid, user.email || '');
    }
  }, [hasAccess, restaurantId, user, setupNotifications]);

  const setupPushNotifications = async (restaurantId: string, userId: string, userEmail: string) => {
    if (!isSupported) {
      console.log('Notificações push não são suportadas neste navegador');
      return;
    }

    const success = await setupNotifications(restaurantId, userId, userEmail);

    if (success) {
      // Configurar listener para mensagens em primeiro plano
      pushNotificationService.onMessageReceived((payload) => {
        console.log('Notificação recebida em primeiro plano:', payload);
        // Mostrar notificação local ou atualizar UI
        if (payload.notification) {
          new Notification(payload.notification.title || 'Novo Pedido', {
            body: payload.notification.body || 'Você recebeu um novo pedido!',
            icon: '/icons/icon.svg',
            badge: '/icons/icon.svg',
          });
        }
      });
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Erro no login:', error);
    }
  };

  const handleLogout = async () => {
    try {
      if (restaurantId) {
        await removeToken(restaurantId);
      }
      await signOutUser();
      router.push('/');
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };

  const requestNotificationPermission = async () => {
    if (!restaurantId || !user) return;

    await setupNotifications(restaurantId, user.uid, user.email || '');
  };

  const getNotificationButtonText = () => {
    switch (notificationStatus) {
      case 'granted':
        return 'Notificações Ativas';
      case 'denied':
        return 'Ativar Notificações';
      case 'requesting':
        return 'Configurando...';
      case 'error':
        return 'Erro - Tentar Novamente';
      case 'unsupported':
        return 'Não Suportado';
      default:
        return 'Ativar Notificações';
    }
  };

  const getNotificationButtonClass = () => {
    switch (notificationStatus) {
      case 'granted':
        return 'btn-success';
      case 'denied':
        return 'btn-warning';
      case 'requesting':
        return 'btn-secondary';
      case 'error':
        return 'btn-danger';
      case 'unsupported':
        return 'btn-secondary';
      default:
        return 'btn-outline-info';
    }
  };

  // Mostrar loading enquanto verifica acesso administrativo
  if (adminLoading || ordersLoading) {
    return <LoadingScreen />;
  }

  // Se não tem acesso administrativo, mostrar tela de login/erro
  if (!hasAccess) {
    return (
      <LoginScreen
        onLogin={handleLogin}
        error={adminError}
        isAuthenticated={isAuthenticated}
      />
    );
  }

  // Usuário tem acesso administrativo - mostrar dashboard
  return (
    <div className="admin-dashboard">
      <NotificationSound play={newOrderAlert} />

      <header className="admin-header">
        <div className="container-fluid px-3">
          <div className="row align-items-center">
            <div className="col-12 col-lg-6 mb-3 mb-lg-0">
              <h1 className="mb-0 h4-responsive h3-lg-responsive">
                <i className="fas fa-utensils me-2"></i>
                <span className="d-none d-md-inline">Painel do Restaurante: </span>
                <span className="d-md-none">Restaurante: </span>
                {restaurant?.name || 'Meu Restaurante'}
              </h1>
            </div>
            <div className="col-12 col-lg-6">
              <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-3">
                <div className="d-flex flex-wrap gap-2">
                  <span className="badge bg-warning">
                    <i className="fas fa-clock me-1"></i>
                    <span className="d-none d-sm-inline">{orders.filter(o => o.status === 'pending').length} Pendentes</span>
                    <span className="d-sm-none">{orders.filter(o => o.status === 'pending').length}</span>
                  </span>
                  <span className="badge bg-info">
                    <i className="fas fa-fire me-1"></i>
                    <span className="d-none d-sm-inline">{orders.filter(o => o.status === 'preparing').length} Preparando</span>
                    <span className="d-sm-none">{orders.filter(o => o.status === 'preparing').length}</span>
                  </span>
                  <span className="badge bg-success">
                    <i className="fas fa-check-circle me-1"></i>
                    <span className="d-none d-sm-inline">{orders.filter(o => o.status === 'ready').length} Prontos</span>
                    <span className="d-sm-none">{orders.filter(o => o.status === 'ready').length}</span>
                  </span>
                </div>
                <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-2">
                  <span className="text-white-50 small d-none d-md-inline">
                    <span className="status-indicator status-online me-1"></span>
                    <i className="fas fa-user me-1"></i>
                    {user?.email}
                  </span>
                  <div className="d-flex gap-2">
                    <button
                      className={`btn btn-sm ${getNotificationButtonClass()}`}
                      onClick={requestNotificationPermission}
                      disabled={notificationStatus === 'requesting' || notificationStatus === 'unsupported'}
                      title={
                        notificationStatus === 'granted'
                          ? 'Notificações push ativas'
                          : notificationStatus === 'unsupported'
                            ? 'Notificações push não são suportadas neste navegador'
                            : 'Ativar notificações push para novos pedidos'
                      }
                    >
                      <i className={`fas ${notificationStatus === 'granted' ? 'fa-bell' : 'fa-bell-slash'} me-1`}></i>
                      <span className="d-none d-sm-inline">{getNotificationButtonText()}</span>
                      <span className="d-sm-none">Notif.</span>
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={handleLogout}
                    >
                      <i className="fas fa-sign-out-alt me-1"></i>
                      <span className="d-none d-sm-inline">Sair</span>
                      <span className="d-sm-none">Sair</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="admin-main">
        <div className="container-fluid px-3">
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
