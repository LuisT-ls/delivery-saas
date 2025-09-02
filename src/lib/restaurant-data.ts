import { db } from './firebase-client';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy 
} from 'firebase/firestore';
import { Restaurant, Category, MenuItem, MenuWithItems } from './types';

// Buscar restaurante por ID
export async function getRestaurant(restaurantId: string): Promise<Restaurant | null> {
  try {
    const restaurantDoc = await getDoc(doc(db, 'restaurants', restaurantId));
    
    if (!restaurantDoc.exists()) {
      return null;
    }

    const data = restaurantDoc.data();
    return {
      id: restaurantDoc.id,
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
    } as Restaurant;
  } catch (error) {
    console.error('Erro ao buscar restaurante:', error);
    return null;
  }
}

// Buscar categorias do restaurante
export async function getCategories(restaurantId: string): Promise<Category[]> {
  try {
    const categoriesQuery = query(
      collection(db, 'categories'),
      where('restaurantId', '==', restaurantId),
      where('isActive', '==', true),
      orderBy('order')
    );

    const categoriesSnapshot = await getDocs(categoriesQuery);
    const categories: Category[] = [];

    categoriesSnapshot.forEach((doc) => {
      const data = doc.data();
      categories.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as Category);
    });

    return categories;
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    return [];
  }
}

// Buscar itens do menu por categoria
export async function getMenuItems(restaurantId: string, categoryId?: string): Promise<MenuItem[]> {
  try {
    let menuQuery;
    
    if (categoryId) {
      menuQuery = query(
        collection(db, 'menu_items'),
        where('restaurantId', '==', restaurantId),
        where('categoryId', '==', categoryId),
        where('isActive', '==', true),
        where('isAvailable', '==', true)
      );
    } else {
      menuQuery = query(
        collection(db, 'menu_items'),
        where('restaurantId', '==', restaurantId),
        where('isActive', '==', true),
        where('isAvailable', '==', true)
      );
    }

    const menuSnapshot = await getDocs(menuQuery);
    const menuItems: MenuItem[] = [];

    menuSnapshot.forEach((doc) => {
      const data = doc.data();
      menuItems.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as MenuItem);
    });

    return menuItems;
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
    const itemDoc = await getDoc(doc(db, 'menu_items', itemId));
    
    if (!itemDoc.exists()) {
      return null;
    }

    const data = itemDoc.data();
    return {
      id: itemDoc.id,
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
    } as MenuItem;
  } catch (error) {
    console.error('Erro ao buscar item do menu:', error);
    return null;
  }
}
