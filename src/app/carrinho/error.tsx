'use client'

import { useEffect } from 'react'

export default function CarrinhoError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log do erro para debugging
    console.error('Erro na página do carrinho:', error)
  }, [error])

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <div className="alert alert-danger" role="alert">
            <i className="fas fa-shopping-cart fa-3x mb-3"></i>
            <h4>Erro ao Carregar Carrinho</h4>
            <p>Ocorreu um erro ao carregar o carrinho de compras.</p>

            {process.env.NODE_ENV === 'development' && (
              <details className="mt-3">
                <summary>Detalhes do erro (desenvolvimento)</summary>
                <pre className="text-start mt-2 small bg-light p-3 rounded">
                  {error.message}
                  {error.stack && (
                    <>
                      <br />
                      <br />
                      Stack trace:
                      <br />
                      {error.stack}
                    </>
                  )}
                </pre>
              </details>
            )}

            <div className="mt-3">
              <button
                className="btn btn-primary me-2"
                onClick={reset}
              >
                <i className="fas fa-redo me-2"></i>
                Tentar Novamente
              </button>

              <button
                className="btn btn-outline-secondary"
                onClick={() => window.location.href = '/menu'}
              >
                <i className="fas fa-utensils me-2"></i>
                Voltar ao Menu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
