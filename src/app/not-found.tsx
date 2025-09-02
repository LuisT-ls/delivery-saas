import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <div className="alert alert-warning" role="alert">
            <i className="fas fa-search fa-3x mb-3"></i>
            <h4>Página Não Encontrada</h4>
            <p>A página que você está procurando não existe ou foi movida.</p>

            <div className="mt-3">
              <Link href="/" className="btn btn-primary me-2">
                <i className="fas fa-home me-2"></i>
                Ir para Home
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
