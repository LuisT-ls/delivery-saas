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
