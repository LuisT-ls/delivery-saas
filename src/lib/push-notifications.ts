import { getMessagingInstance } from './firebase';
import { db } from './firebase';
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { getToken, onMessage } from 'firebase/messaging';

// VAPID key para notificações push
const VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;

export interface DeviceToken {
  token: string;
  userId: string;
  userEmail: string;
  createdAt: Date;
  lastUsed: Date;
  platform: string;
  userAgent: string;
}

export class PushNotificationService {
  private static instance: PushNotificationService;
  private messaging: any = null;
  private currentToken: string | null = null;

  private constructor() {}

  static getInstance(): PushNotificationService {
    if (!PushNotificationService.instance) {
      PushNotificationService.instance = new PushNotificationService();
    }
    return PushNotificationService.instance;
  }

  async initialize(): Promise<boolean> {
    try {
      this.messaging = await getMessagingInstance();
      if (!this.messaging) {
        console.log('Firebase Cloud Messaging não é suportado neste navegador');
        return false;
      }
      return true;
    } catch (error) {
      console.error('Erro ao inicializar FCM:', error);
      return false;
    }
  }

  async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.log('Este navegador não suporta notificações');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission === 'denied') {
      console.log('Permissão de notificação negada');
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    } catch (error) {
      console.error('Erro ao solicitar permissão:', error);
      return false;
    }
  }

  async getToken(): Promise<string | null> {
    if (!this.messaging) {
      console.log('FCM não inicializado');
      return null;
    }

    try {
      const token = await getToken(this.messaging, { vapidKey: VAPID_KEY });
      this.currentToken = token;
      return token;
    } catch (error) {
      console.error('Erro ao obter token FCM:', error);
      return null;
    }
  }

  async saveDeviceToken(restaurantId: string, userId: string, userEmail: string): Promise<boolean> {
    if (!this.currentToken) {
      console.log('Token FCM não disponível');
      return false;
    }

    try {
      const deviceData: DeviceToken = {
        token: this.currentToken,
        userId,
        userEmail,
        createdAt: new Date(),
        lastUsed: new Date(),
        platform: navigator.platform,
        userAgent: navigator.userAgent,
      };

      const deviceRef = doc(db, 'restaurants', restaurantId, 'devices', this.currentToken);
      
      // Verificar se o token já existe
      const existingDoc = await getDoc(deviceRef);
      
      if (existingDoc.exists()) {
        // Atualizar dados existentes
        await updateDoc(deviceRef, {
          lastUsed: new Date(),
          userEmail,
          platform: navigator.platform,
          userAgent: navigator.userAgent,
        });
      } else {
        // Criar novo documento
        await setDoc(deviceRef, deviceData);
      }

      console.log('Token do dispositivo salvo com sucesso');
      return true;
    } catch (error) {
      console.error('Erro ao salvar token do dispositivo:', error);
      return false;
    }
  }

  async removeDeviceToken(restaurantId: string): Promise<boolean> {
    if (!this.currentToken) {
      return false;
    }

    try {
      const deviceRef = doc(db, 'restaurants', restaurantId, 'devices', this.currentToken);
      await setDoc(deviceRef, { deleted: true, deletedAt: new Date() }, { merge: true });
      this.currentToken = null;
      return true;
    } catch (error) {
      console.error('Erro ao remover token do dispositivo:', error);
      return false;
    }
  }

  onMessageReceived(callback: (payload: any) => void): void {
    if (!this.messaging) {
      console.log('FCM não inicializado');
      return;
    }

    onMessage(this.messaging, (payload) => {
      console.log('Mensagem recebida:', payload);
      callback(payload);
    });
  }

  async setupNotifications(restaurantId: string, userId: string, userEmail: string): Promise<boolean> {
    // 1. Inicializar FCM
    const fcmSupported = await this.initialize();
    if (!fcmSupported) {
      console.log('FCM não suportado');
      return false;
    }

    // 2. Solicitar permissão
    const permissionGranted = await this.requestPermission();
    if (!permissionGranted) {
      console.log('Permissão de notificação negada');
      return false;
    }

    // 3. Obter token
    const token = await this.getToken();
    if (!token) {
      console.log('Não foi possível obter token FCM');
      return false;
    }

    // 4. Salvar token no Firestore
    const saved = await this.saveDeviceToken(restaurantId, userId, userEmail);
    if (!saved) {
      console.log('Não foi possível salvar token');
      return false;
    }

    console.log('Notificações push configuradas com sucesso');
    return true;
  }
}

// Instância singleton
export const pushNotificationService = PushNotificationService.getInstance();
