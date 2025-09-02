'use client'

import { useState } from 'react'
import { useCartStore } from '@/lib/cart-store'
import { useAuthContext } from '@/components/AuthProvider'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function MenuPage() {
  const { isAuthenticated } = useAuthContext()
  const { addItem, items } = useCartStore()
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [showLoginAlert, setShowLoginAlert] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState<string | null>(null)

  // Dados de exemplo dos produtos com imagens reais
  const products = [
    {
      id: '1',
      restaurantId: 'rest1',
      name: 'X-Burger Clássico',
      description: 'Hambúrguer artesanal com queijo, alface, tomate e molho especial',
      price: 25.90,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
      category: 'Hambúrgueres',
      isAvailable: true,
      isActive: true
    },
    {
      id: '2',
      restaurantId: 'rest1',
      name: 'Pizza Margherita',
      description: 'Pizza tradicional com molho de tomate, mussarela e manjericão',
      price: 35.00,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop',
      category: 'Pizzas',
      isAvailable: true,
      isActive: true
    },
    {
      id: '3',
      restaurantId: 'rest1',
      name: 'Salada Caesar',
      description: 'Alface romana, croutons, parmesão e molho caesar',
      price: 18.50,
      image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop',
      category: 'Saladas',
      isAvailable: true,
      isActive: true
    },
    {
      id: '4',
      restaurantId: 'rest1',
      name: 'Batata Frita',
      description: 'Batatas fritas crocantes com sal e temperos especiais',
      price: 12.00,
      image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop',
      category: 'Acompanhamentos',
      isAvailable: true,
      isActive: true
    },
    {
      id: '5',
      restaurantId: 'rest1',
      name: 'Refrigerante Cola',
      description: 'Refrigerante cola 350ml gelado',
      price: 6.50,
      image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&h=300&fit=crop',
      category: 'Bebidas',
      isAvailable: true,
      isActive: true
    },
    {
      id: '6',
      restaurantId: 'rest1',
      name: 'Sobremesa Chocolate',
      description: 'Mousse de chocolate com calda e chantilly',
      price: 15.00,
      image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop',
      category: 'Sobremesas',
      isAvailable: true,
      isActive: true
    },
    {
      id: '7',
      restaurantId: 'rest1',
      name: 'Pizza Pepperoni',
      description: 'Pizza com pepperoni, mussarela e molho de tomate',
      price: 42.90,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop',
      category: 'Pizzas',
      isAvailable: true,
      isActive: true
    },
    {
      id: '8',
      restaurantId: 'rest1',
      name: 'Espaguete à Bolonhesa',
      description: 'Espaguete com molho de carne e tomate',
      price: 28.90,
      image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop',
      category: 'Massas',
      isAvailable: true,
      isActive: true
    }
  ]

  const categories = Array.from(new Set(products.map(product => product.category)))

  // Filtrar produtos por categoria
  const filteredProducts = selectedCategory === 'Todos'
    ? products
    : products.filter(product => product.category === selectedCategory)

  // Função para adicionar item ao carrinho
  const handleAddToCart = async (product: any) => {
    try {
      // Validação do produto
      if (!product || !product.id || !product.name || typeof product.price !== 'number') {
        console.error('Produto inválido:', product)
        alert('Erro: Produto inválido. Tente novamente.')
        return
      }

      setIsAddingToCart(product.id)

      // Simula um pequeno delay para feedback visual
      await new Promise(resolve => setTimeout(resolve, 300))

      // Adiciona o item ao carrinho
      addItem(product, 1)

      // Feedback visual de sucesso
      const button = document.querySelector(`[data-product-id="${product.id}"]`)
      if (button) {
        button.classList.add('btn-success')
        button.classList.remove('btn-primary')
        setTimeout(() => {
          button.classList.remove('btn-success')
          button.classList.add('btn-primary')
        }, 1000)
      }
    } catch (error) {
      console.error('Erro ao adicionar item ao carrinho:', error)
      alert('Erro ao adicionar item ao carrinho. Tente novamente.')
    } finally {
      setIsAddingToCart(null)
    }
  }

  // Função para ir para o carrinho
  const handleGoToCart = () => {
    try {
      router.push('/carrinho')
    } catch (error) {
      console.error('Erro ao navegar para o carrinho:', error)
      // Fallback para navegação
      window.location.href = '/carrinho'
    }
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center mb-5">
            <i className="fas fa-utensils me-3"></i>
            Cardápio
          </h1>
        </div>
      </div>

      {/* Alert de login necessário */}
      {showLoginAlert && (
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
          <i className="fas fa-exclamation-triangle me-2"></i>
          <strong>Atenção!</strong> Para finalizar o pedido, você precisa estar logado.
          <button type="button" className="btn-close" onClick={() => setShowLoginAlert(false)}></button>
        </div>
      )}

      {/* Filtros por categoria */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex flex-wrap gap-2 justify-content-center">
            <button
              className={`btn ${selectedCategory === 'Todos' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setSelectedCategory('Todos')}
            >
              Todos
            </button>
            {categories.map((category, index) => (
              <button
                key={index}
                className={`btn ${selectedCategory === category ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lista de produtos */}
      <div className="row">
        {filteredProducts.map((product) => {
          // Validação adicional para cada produto
          if (!product || !product.id || !product.name || typeof product.price !== 'number') {
            return null
          }

          return (
            <div key={product.id} className="col-lg-4 col-md-6 mb-4">
              <div className="card h-100 product-card border-0 shadow-sm hover-shadow">
                <div className="position-relative" style={{ height: '200px' }}>
                  <Image
                    src={product.image || '/placeholder-food.svg'}
                    alt={product.name}
                    fill
                    className="card-img-top"
                    style={{ objectFit: 'cover' }}
                    onError={(e) => {
                      // Fallback para imagem quebrada
                      const target = e.target as HTMLImageElement
                      target.src = '/placeholder-food.svg'
                    }}
                  />
                </div>
                <div className="card-body d-flex flex-column">
                  <div className="mb-2">
                    <span className="badge bg-secondary">{product.category}</span>
                  </div>
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text text-muted flex-grow-1">
                    {product.description}
                  </p>
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <span className="h5 text-primary mb-0">
                      R$ {product.price.toFixed(2)}
                    </span>
                    <button
                      className="btn btn-primary"
                      data-product-id={product.id}
                      onClick={() => handleAddToCart(product)}
                      disabled={isAddingToCart === product.id}
                    >
                      {isAddingToCart === product.id ? (
                        <>
                          <i className="fas fa-spinner fa-spin me-1"></i>
                          Adicionando...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-plus me-1"></i>
                          Adicionar
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Carrinho flutuante */}
      {items && Array.isArray(items) && items.length > 0 && (
        <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1000 }}>
          <button
            className="btn btn-primary btn-lg rounded-circle shadow"
            onClick={handleGoToCart}
          >
            <i className="fas fa-shopping-cart"></i>
            <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
              {items.reduce((sum, item) => {
                if (item && typeof item.quantity === 'number' && !isNaN(item.quantity)) {
                  return sum + item.quantity
                }
                return sum
              }, 0)}
            </span>
          </button>
        </div>
      )}
    </div>
  )
}
