import { useState, useEffect } from 'react';
import { onSnapshot, collection, query, where, orderBy } from 'firebase/firestore';
import { db } from './firebase-client';
import { Order } from './types';

export function useOrdersRealtime(restaurantId: string | null) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!restaurantId) {
      setOrders([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const q = query(
      collection(db, 'orders'),
      where('restaurantId', '==', restaurantId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const newOrders: Order[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          newOrders.push({
            id: doc.id,
            restaurantId: data.restaurantId,
            items: data.items,
            customer: data.customer,
            status: data.status,
            subtotal: data.subtotal,
            tax: data.tax,
            total: data.total,
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date()
          });
        });
        setOrders(newOrders);
        setLoading(false);
      },
      (error) => {
        console.error('Erro ao escutar pedidos:', error);
        setError('Erro ao carregar pedidos');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [restaurantId]);

  return { orders, loading, error };
}

export function useNewOrderAlert(orders: Order[]) {
  const [newOrderAlert, setNewOrderAlert] = useState(false);
  const [previousOrders, setPreviousOrders] = useState<Set<string>>(new Set());
  const [isPageVisible, setIsPageVisible] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPageVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  useEffect(() => {
    const currentOrderIds = new Set(orders.map(order => order.id));
    const newOrders = Array.from(currentOrderIds).filter(id => !previousOrders.has(id));
    
    if (newOrders.length > 0 && previousOrders.size > 0) {
      setNewOrderAlert(true);
      
      // Se a página não estiver visível, mostrar notificação do navegador
      if (!isPageVisible) {
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('Novo Pedido!', {
            body: 'Um novo pedido foi recebido. Verifique o painel.',
            icon: '/icons/icon-192x192.png'
          });
        }
      }
      
      setTimeout(() => setNewOrderAlert(false), 5000);
    }
    
    setPreviousOrders(currentOrderIds);
  }, [orders, isPageVisible]);

  return { newOrderAlert, setNewOrderAlert };
}
