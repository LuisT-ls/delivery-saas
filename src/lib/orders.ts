import { 
  collection, 
  addDoc, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  updateDoc 
} from 'firebase/firestore';
import { db } from './firebase-client';
import { Order, OrderItem, CustomerInfo } from './types';

interface CreateOrderData {
  restaurantId: string;
  items: OrderItem[];
  customer: CustomerInfo;
  subtotal: number;
  tax: number;
  total: number;
}

export async function createOrder(orderData: CreateOrderData): Promise<Order> {
  try {
    const orderDoc = {
      restaurantId: orderData.restaurantId,
      items: orderData.items,
      customer: orderData.customer,
      status: 'pending' as const,
      subtotal: orderData.subtotal,
      tax: orderData.tax,
      total: orderData.total,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, 'orders'), orderDoc);
    
    return {
      id: docRef.id,
      ...orderDoc,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    throw new Error('Falha ao criar pedido');
  }
}

export async function getOrder(orderId: string): Promise<Order | null> {
  try {
    const orderDoc = await getDoc(doc(db, 'orders', orderId));
    
    if (!orderDoc.exists()) {
      return null;
    }

    const data = orderDoc.data();
    return {
      id: orderDoc.id,
      restaurantId: data.restaurantId,
      items: data.items,
      customer: data.customer,
      status: data.status,
      subtotal: data.subtotal,
      tax: data.tax,
      total: data.total,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date()
    };
  } catch (error) {
    console.error('Erro ao buscar pedido:', error);
    throw new Error('Falha ao buscar pedido');
  }
}

export async function getOrdersByRestaurant(restaurantId: string): Promise<Order[]> {
  try {
    const q = query(
      collection(db, 'orders'),
      where('restaurantId', '==', restaurantId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const orders: Order[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      orders.push({
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
    
    return orders;
  } catch (error) {
    console.error('Erro ao buscar pedidos do restaurante:', error);
    throw new Error('Falha ao buscar pedidos');
  }
}

export async function updateOrderStatus(orderId: string, status: Order['status']): Promise<void> {
  try {
    await updateDoc(doc(db, 'orders', orderId), {
      status,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Erro ao atualizar status do pedido:', error);
    throw new Error('Falha ao atualizar status do pedido');
  }
}
