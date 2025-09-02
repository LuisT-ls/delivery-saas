export interface Restaurant {
  id: string;
  name: string;
  description: string;
  logo?: string;
  banner?: string;
  address: string;
  phone: string;
  email: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  restaurantId: string;
  name: string;
  description?: string;
  image?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  isAvailable: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MenuWithItems {
  category: Category;
  items: MenuItem[];
}

// Tipos para o carrinho
export interface CartItem {
  itemId: string;
  restaurantId: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
  subtotal: number;
}

export interface CartState {
  items: CartItem[];
  restaurantId: string | null;
  subtotal: number;
  tax: number;
  total: number;
  initialize: () => void;
  addItem: (item: MenuItem, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  calculateTotals: () => void;
}

// Tipos para pedidos
export interface CustomerInfo {
  name: string;
  phone: string;
  address?: string;
  deliveryType: 'delivery' | 'pickup';
  notes?: string;
}

export interface OrderItem {
  itemId: string;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: string;
  restaurantId: string;
  items: OrderItem[];
  customer: CustomerInfo;
  status: 'pending' | 'preparing' | 'ready' | 'delivering' | 'delivered';
  subtotal: number;
  tax: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}
