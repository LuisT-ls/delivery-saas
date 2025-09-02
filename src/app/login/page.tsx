'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuthContext } from '@/components/AuthProvider'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const { loginWithGoogle, loginAnonymously, loading } = useAuthContext()
  const router = useRouter()
  const [error, setError] = useState('')

  const handleGoogleLogin = async () => {
    try {
      setError('')
      await loginWithGoogle()
      router.push('/')
    } catch (error: any) {
      setError('Erro ao fazer login com Google. Tente novamente.')
      console.error('Erro no login:', error.message)
    }
  }

  const handleAnonymousLogin = async () => {
    try {
      setError('')
      await loginAnonymously()
      router.push('/')
    } catch (error: any) {
      setError('Erro ao fazer login anônimo. Tente novamente.')
      console.error('Erro no login anônimo:', error.message)
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <i className="fas fa-sign-in-alt fa-3x text-primary mb-3"></i>
                <h2 className="card-title">Login</h2>
                <p className="text-muted">Entre com suas credenciais</p>
              </div>

              {error && (
                <div className="alert alert-danger" role="alert">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  {error}
                </div>
              )}

              <div className="text-center mb-4">
                <p className="text-muted">
                  Escolha uma opção de login:
                </p>
              </div>

              <div className="d-grid gap-3">
                <button
                  className="btn btn-primary"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Entrando...
                    </>
                  ) : (
                    <>
                      <i className="fab fa-google me-2"></i>
                      Entrar com Google (Admin/Staff)
                    </>
                  )}
                </button>

                <button
                  className="btn btn-outline-secondary"
                  onClick={handleAnonymousLogin}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Entrando...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-user me-2"></i>
                      Entrar Anonimamente (Cliente)
                    </>
                  )}
                </button>
              </div>

              <div className="text-center mt-3">
                <Link href="/cadastro" className="text-decoration-none">
                  Não tem uma conta? Cadastre-se
                </Link>
              </div>

              <hr className="my-4" />

              <div className="text-center">
                <small className="text-muted">
                  <i className="fas fa-info-circle me-1"></i>
                  Login com Google é recomendado para administradores e funcionários.
                  <br />
                  Login anônimo é ideal para clientes que querem fazer pedidos rapidamente.
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
