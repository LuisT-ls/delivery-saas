import Link from 'next/link'

export default function CarrinhoNotFound() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <div className="alert alert-warning" role="alert">
            <i className="fas fa-shopping-cart fa-3x mb-3"></i>
            <h4>Carrinho Não Encontrado</h4>
            <p>O carrinho que você está procurando não existe ou foi limpo.</p>

            <div className="mt-3">
              <Link href="/menu" className="btn btn-primary me-2">
                <i className="fas fa-utensils me-2"></i>
                Ver Menu
              </Link>

              <Link href="/restaurantes" className="btn btn-outline-primary">
                <i className="fas fa-store me-2"></i>
                Ver Restaurantes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
