import { useState, useEffect, useCallback } from 'react';
import { pushNotificationService } from './push-notifications';

export type NotificationStatus = 'idle' | 'requesting' | 'granted' | 'denied' | 'error' | 'unsupported';

export interface UsePushNotificationsReturn {
  status: NotificationStatus;
  isSupported: boolean;
  setupNotifications: (restaurantId: string, userId: string, userEmail: string) => Promise<boolean>;
  requestPermission: () => Promise<boolean>;
  removeToken: (restaurantId: string) => Promise<boolean>;
}

export function usePushNotifications(): UsePushNotificationsReturn {
  const [status, setStatus] = useState<NotificationStatus>('idle');
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Verificar se o navegador suporta notificações
    const checkSupport = async () => {
      const supported = await pushNotificationService.initialize();
      setIsSupported(supported);
      
      if (!supported) {
        setStatus('unsupported');
      } else if (Notification.permission === 'granted') {
        setStatus('granted');
      } else if (Notification.permission === 'denied') {
        setStatus('denied');
      }
    };

    checkSupport();
  }, []);

  const setupNotifications = useCallback(async (
    restaurantId: string, 
    userId: string, 
    userEmail: string
  ): Promise<boolean> => {
    try {
      setStatus('requesting');
      
      const success = await pushNotificationService.setupNotifications(
        restaurantId,
        userId,
        userEmail
      );

      setStatus(success ? 'granted' : 'denied');
      return success;
    } catch (error) {
      console.error('Erro ao configurar notificações:', error);
      setStatus('error');
      return false;
    }
  }, []);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    try {
      setStatus('requesting');
      const permission = await pushNotificationService.requestPermission();
      setStatus(permission ? 'granted' : 'denied');
      return permission;
    } catch (error) {
      console.error('Erro ao solicitar permissão:', error);
      setStatus('error');
      return false;
    }
  }, []);

  const removeToken = useCallback(async (restaurantId: string): Promise<boolean> => {
    try {
      const success = await pushNotificationService.removeDeviceToken(restaurantId);
      if (success) {
        setStatus('idle');
      }
      return success;
    } catch (error) {
      console.error('Erro ao remover token:', error);
      return false;
    }
  }, []);

  return {
    status,
    isSupported,
    setupNotifications,
    requestPermission,
    removeToken,
  };
}
