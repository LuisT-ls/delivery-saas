import { Restaurant, Category, MenuItem, MenuWithItems } from './types';

// Dados mockados para desenvolvimento
const mockRestaurants: Restaurant[] = [
  {
    id: 'rest1',
    name: 'Restaurante Italiano Bella Vista',
    description: 'Autêntica culinária italiana com massas frescas e pizzas tradicionais.',
    logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200&h=200&fit=crop',
    banner: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&h=400&fit=crop',
    address: 'Rua das Flores, 123 - Centro',
    phone: '(11) 99999-9999',
    email: 'contato@bellavista.com',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'rest2',
    name: 'Sushi Master',
    description: 'Sushi e sashimi frescos preparados por chefs especializados.',
    logo: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=200&h=200&fit=crop',
    banner: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=1200&h=400&fit=crop',
    address: 'Av. Paulista, 456 - Bela Vista',
    phone: '(11) 88888-8888',
    email: 'contato@sushimaster.com',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const mockCategories: Category[] = [
  {
    id: 'cat1',
    restaurantId: 'rest1',
    name: 'Pizzas',
    description: 'Pizzas tradicionais e gourmet',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100&h=100&fit=crop',
    order: 1,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'cat2',
    restaurantId: 'rest1',
    name: 'Massas',
    description: 'Massas frescas e molhos artesanais',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=100&h=100&fit=crop',
    order: 2,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const mockMenuItems: MenuItem[] = [
  {
    id: 'item1',
    restaurantId: 'rest1',
    categoryId: 'cat1',
    name: 'Pizza Margherita',
    description: 'Molho de tomate, mussarela, manjericão fresco',
    price: 35.90,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=200&fit=crop',
    isAvailable: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'item2',
    restaurantId: 'rest1',
    categoryId: 'cat1',
    name: 'Pizza Pepperoni',
    description: 'Molho de tomate, mussarela, pepperoni',
    price: 42.90,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=200&fit=crop',
    isAvailable: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'item3',
    restaurantId: 'rest1',
    categoryId: 'cat2',
    name: 'Espaguete à Bolonhesa',
    description: 'Espaguete com molho de carne e tomate',
    price: 28.90,
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=300&h=200&fit=crop',
    isAvailable: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Buscar restaurante por ID
export async function getRestaurant(restaurantId: string): Promise<Restaurant | null> {
  try {
    const restaurant = mockRestaurants.find(r => r.id === restaurantId);
    return restaurant || null;
  } catch (error) {
    console.error('Erro ao buscar restaurante:', error);
    return null;
  }
}

// Buscar categorias do restaurante
export async function getCategories(restaurantId: string): Promise<Category[]> {
  try {
    const categories = mockCategories.filter(c => c.restaurantId === restaurantId && c.isActive);
    return categories.sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    return [];
  }
}

// Buscar itens do menu por categoria
export async function getMenuItems(restaurantId: string, categoryId?: string): Promise<MenuItem[]> {
  try {
    let items = mockMenuItems.filter(item => 
      item.restaurantId === restaurantId && 
      item.isActive && 
      item.isAvailable
    );
    
    if (categoryId) {
      items = items.filter(item => item.categoryId === categoryId);
    }

    return items;
  } catch (error) {
    console.error('Erro ao buscar itens do menu:', error);
    return [];
  }
}

// Buscar menu completo organizado por categorias
export async function getMenuWithCategories(restaurantId: string): Promise<MenuWithItems[]> {
  try {
    const categories = await getCategories(restaurantId);
    const allItems = await getMenuItems(restaurantId);
    
    const menuWithItems: MenuWithItems[] = categories.map(category => ({
      category,
      items: allItems.filter(item => item.categoryId === category.id)
    }));

    return menuWithItems.filter(menu => menu.items.length > 0);
  } catch (error) {
    console.error('Erro ao buscar menu com categorias:', error);
    return [];
  }
}

// Buscar item específico do menu
export async function getMenuItem(itemId: string): Promise<MenuItem | null> {
  try {
    const item = mockMenuItems.find(item => item.id === itemId);
    return item || null;
  } catch (error) {
    console.error('Erro ao buscar item do menu:', error);
    return null;
  }
}
