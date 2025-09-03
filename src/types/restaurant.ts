import { Timestamp } from 'firebase/firestore';

export interface Restaurant {
  id?: string;
  name: string;
  address: string;
  phone: string;
  ownerId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface RestaurantFormData {
  name: string;
  address: string;
  phone: string;
}

