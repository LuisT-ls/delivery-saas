import { Timestamp } from 'firebase/firestore';

export interface Restaurant {
  id?: string;
  name: string;
  address: string;
  phone: string;
  category: string;
  deliveryFee: number;
  deliveryTime: string;
  rating: number;
  image?: string;
  ownerId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface RestaurantFormData {
  name: string;
  address: string;
  phone: string;
  category: string;
  deliveryFee: number;
  deliveryTime: string;
  rating: number;
  image?: string;
}

export interface MenuItem {
  id?: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  isAvailable: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

