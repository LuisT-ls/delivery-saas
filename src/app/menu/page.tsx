export default function MenuPage() {
  // Dados de exemplo dos produtos
  const products = [
    {
      id: 1,
      name: 'X-Burger Clássico',
      description: 'Hambúrguer artesanal com queijo, alface, tomate e molho especial',
      price: 25.90,
      image: '/api/placeholder/300/200',
      category: 'Hambúrgueres'
    },
    {
      id: 2,
      name: 'Pizza Margherita',
      description: 'Pizza tradicional com molho de tomate, mussarela e manjericão',
      price: 35.00,
      image: '/api/placeholder/300/200',
      category: 'Pizzas'
    },
    {
      id: 3,
      name: 'Salada Caesar',
      description: 'Alface romana, croutons, parmesão e molho caesar',
      price: 18.50,
      image: '/api/placeholder/300/200',
      category: 'Saladas'
    },
    {
      id: 4,
      name: 'Batata Frita',
      description: 'Batatas fritas crocantes com sal e temperos especiais',
      price: 12.00,
      image: '/api/placeholder/300/200',
      category: 'Acompanhamentos'
    },
    {
      id: 5,
      name: 'Refrigerante Cola',
      description: 'Refrigerante cola 350ml gelado',
      price: 6.50,
      image: '/api/placeholder/300/200',
      category: 'Bebidas'
    },
    {
      id: 6,
      name: 'Sobremesa Chocolate',
      description: 'Mousse de chocolate com calda e chantilly',
      price: 15.00,
      image: '/api/placeholder/300/200',
      category: 'Sobremesas'
    }
  ]

  const categories = Array.from(new Set(products.map(product => product.category)))

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

      {/* Filtros por categoria */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex flex-wrap gap-2 justify-content-center">
            <button className="btn btn-primary">
              Todos
            </button>
            {categories.map((category, index) => (
              <button key={index} className="btn btn-outline-primary">
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lista de produtos */}
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100 product-card border-0 shadow-sm">
              <div className="card-img-top bg-light d-flex align-items-center justify-content-center"
                style={{ height: '200px' }}>
                <i className="fas fa-image fa-3x text-muted"></i>
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
                  <button className="btn btn-primary">
                    <i className="fas fa-plus me-1"></i>
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Carrinho flutuante */}
      <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1000 }}>
        <button className="btn btn-primary btn-lg rounded-circle shadow">
          <i className="fas fa-shopping-cart"></i>
          <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
            3
          </span>
        </button>
      </div>
    </div>
  )
}
