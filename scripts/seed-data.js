const { initializeApp } = require('firebase/app')
const {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc
} = require('firebase/firestore')

// Configuração do Firebase (substitua pelas suas credenciais)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

// Inicializar Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Dados mock
const restaurants = [
  {
    id: 'restaurant-1',
    name: 'Pizzaria Bella Italia',
    description:
      'As melhores pizzas da cidade com ingredientes frescos e receitas tradicionais italianas.',
    logo: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200',
    banner:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800',
    address: 'Rua das Flores, 123 - Centro',
    phone: '(71) 99999-9999',
    email: 'contato@bellaitalia.com',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'restaurant-2',
    name: 'Hamburgueria Gourmet',
    description:
      'Hambúrgueres artesanais com pães frescos e ingredientes premium.',
    logo: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=200',
    banner:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800',
    address: 'Av. Paulista, 456 - Bela Vista',
    phone: '(71) 88888-8888',
    email: 'contato@gourmetburger.com',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

const categories = [
  // Categorias para Pizzaria Bella Italia
  {
    id: 'cat-1',
    restaurantId: 'restaurant-1',
    name: 'Pizzas Tradicionais',
    description: 'Pizzas com receitas tradicionais italianas',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300',
    order: 1,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'cat-2',
    restaurantId: 'restaurant-1',
    name: 'Pizzas Especiais',
    description: 'Pizzas com ingredientes especiais e combinações únicas',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300',
    order: 2,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'cat-3',
    restaurantId: 'restaurant-1',
    name: 'Bebidas',
    description: 'Refrigerantes, sucos e bebidas alcoólicas',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300',
    order: 3,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // Categorias para Hamburgueria Gourmet
  {
    id: 'cat-4',
    restaurantId: 'restaurant-2',
    name: 'Hambúrgueres Clássicos',
    description: 'Hambúrgueres tradicionais com carne bovina',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300',
    order: 1,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'cat-5',
    restaurantId: 'restaurant-2',
    name: 'Hambúrgueres Gourmet',
    description: 'Hambúrgueres especiais com ingredientes premium',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300',
    order: 2,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'cat-6',
    restaurantId: 'restaurant-2',
    name: 'Acompanhamentos',
    description: 'Batatas fritas, onion rings e outros acompanhamentos',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300',
    order: 3,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

const menuItems = [
  // Itens para Pizzaria Bella Italia
  {
    id: 'item-1',
    restaurantId: 'restaurant-1',
    categoryId: 'cat-1',
    name: 'Margherita',
    description: 'Molho de tomate, mussarela, manjericão fresco e azeite',
    price: 35.9,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
    isAvailable: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'item-2',
    restaurantId: 'restaurant-1',
    categoryId: 'cat-1',
    name: 'Pepperoni',
    description: 'Molho de tomate, mussarela e pepperoni',
    price: 42.9,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
    isAvailable: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'item-3',
    restaurantId: 'restaurant-1',
    categoryId: 'cat-2',
    name: 'Quatro Queijos',
    description: 'Molho de tomate, mussarela, parmesão, gorgonzola e provolone',
    price: 48.9,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
    isAvailable: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'item-4',
    restaurantId: 'restaurant-1',
    categoryId: 'cat-2',
    name: 'Calabresa Especial',
    description: 'Molho de tomate, mussarela, calabresa, cebola e azeitonas',
    price: 45.9,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
    isAvailable: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'item-5',
    restaurantId: 'restaurant-1',
    categoryId: 'cat-3',
    name: 'Coca-Cola 350ml',
    description: 'Refrigerante Coca-Cola em lata',
    price: 6.9,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400',
    isAvailable: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // Itens para Hamburgueria Gourmet
  {
    id: 'item-6',
    restaurantId: 'restaurant-2',
    categoryId: 'cat-4',
    name: 'X-Burger Clássico',
    description: 'Hambúrguer de carne, queijo, alface, tomate e molho especial',
    price: 28.9,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
    isAvailable: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'item-7',
    restaurantId: 'restaurant-2',
    categoryId: 'cat-4',
    name: 'X-Bacon',
    description: 'Hambúrguer de carne, queijo, bacon crocante, alface e tomate',
    price: 32.9,
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400',
    isAvailable: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'item-8',
    restaurantId: 'restaurant-2',
    categoryId: 'cat-5',
    name: 'Gourmet Truffle',
    description:
      'Hambúrguer de carne wagyu, queijo brie, cogumelos e molho truffle',
    price: 65.9,
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400',
    isAvailable: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'item-9',
    restaurantId: 'restaurant-2',
    categoryId: 'cat-6',
    name: 'Batata Frita',
    description: 'Porção de batatas fritas crocantes',
    price: 15.9,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400',
    isAvailable: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'item-10',
    restaurantId: 'restaurant-2',
    categoryId: 'cat-6',
    name: 'Onion Rings',
    description: 'Anéis de cebola empanados e fritos',
    price: 18.9,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400',
    isAvailable: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

async function seedData() {
  try {
    console.log('🌱 Iniciando população do banco de dados...')

    // Adicionar restaurantes
    console.log('📝 Adicionando restaurantes...')
    for (const restaurant of restaurants) {
      await setDoc(doc(db, 'restaurants', restaurant.id), restaurant)
      console.log(`✅ Restaurante "${restaurant.name}" adicionado`)
    }

    // Adicionar categorias
    console.log('📝 Adicionando categorias...')
    for (const category of categories) {
      await setDoc(doc(db, 'categories', category.id), category)
      console.log(`✅ Categoria "${category.name}" adicionada`)
    }

    // Adicionar itens do menu
    console.log('📝 Adicionando itens do menu...')
    for (const item of menuItems) {
      await setDoc(doc(db, 'menu_items', item.id), item)
      console.log(`✅ Item "${item.name}" adicionado`)
    }

    console.log('🎉 População do banco de dados concluída com sucesso!')
    console.log('\n📊 Resumo:')
    console.log(`- ${restaurants.length} restaurantes`)
    console.log(`- ${categories.length} categorias`)
    console.log(`- ${menuItems.length} itens do menu`)

    console.log('\n🔗 URLs de teste:')
    console.log('- http://localhost:3000/r/restaurant-1/menu')
    console.log('- http://localhost:3000/r/restaurant-2/menu')
    console.log('- http://localhost:3000/r/restaurant-1/item/item-1')
  } catch (error) {
    console.error('❌ Erro ao popular banco de dados:', error)
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  seedData()
}

module.exports = { seedData }
