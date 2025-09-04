'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuthContext } from '@/components/AuthProvider'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const { loginWithGoogle, loginAnonymously, loginWithEmail, loading } = useAuthContext()
  const router = useRouter()
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showEmailForm, setShowEmailForm] = useState(false)

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

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setError('')
      if (!email || !password) {
        setError('Por favor, preencha todos os campos.')
        return
      }
      await loginWithEmail(email, password)
      router.push('/')
    } catch (error: any) {
      setError(error.userMessage || 'Erro ao fazer login. Tente novamente.')
      console.error('Erro no login com email:', error.message)
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6 col-xl-4">
          <div className="card shadow auth-card">
            <div className="card-body p-4 p-md-5">
              <div className="text-center mb-4">
                <i className="fas fa-sign-in-alt fa-md-3x text-primary mb-3"></i>
                <h2 className="card-title h2-responsive">Login</h2>
                <p className="text-muted h5-responsive">Entre com suas credenciais</p>
              </div>

              {error && (
                <div className="alert alert-danger" role="alert">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  {error}
                </div>
              )}

              {!showEmailForm ? (
                <>
                  <div className="text-center mb-4">
                    <p className="text-muted h5-responsive">
                      Escolha uma opção de login:
                    </p>
                  </div>

                  <div className="d-grid gap-3">
                    <button
                      className="btn btn-primary w-100"
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
                          <span className="d-none d-md-inline">Entrar com Google (Admin/Staff)</span>
                          <span className="d-md-none">Entrar com Google</span>
                        </>
                      )}
                    </button>

                    <button
                      className="btn btn-outline-primary w-100"
                      onClick={() => setShowEmailForm(true)}
                      disabled={loading}
                    >
                      <i className="fas fa-envelope me-2"></i>
                      <span className="d-none d-md-inline">Entrar com E-mail e Senha</span>
                      <span className="d-md-none">Entrar com E-mail</span>
                    </button>

                    <button
                      className="btn btn-outline-secondary w-100"
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
                          <span className="d-none d-md-inline">Entrar Anonimamente (Cliente)</span>
                          <span className="d-md-none">Entrar Anonimamente</span>
                        </>
                      )}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center mb-4">
                    <button
                      className="btn btn-link text-decoration-none p-0 mb-2"
                      onClick={() => setShowEmailForm(false)}
                    >
                      <i className="fas fa-arrow-left me-2"></i>
                      Voltar às opções de login
                    </button>
                    <h4 className="h4-responsive">Login com E-mail</h4>
                    <p className="text-muted">Digite suas credenciais</p>
                  </div>

                  <form onSubmit={handleEmailLogin}>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        <i className="fas fa-envelope me-2"></i>
                        E-mail
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seu@email.com"
                        required
                        disabled={loading}
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="password" className="form-label">
                        <i className="fas fa-lock me-2"></i>
                        Senha
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Sua senha"
                        required
                        disabled={loading}
                      />
                    </div>

                    <div className="d-grid">
                      <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Entrando...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-sign-in-alt me-2"></i>
                            Entrar
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}

              <div className="text-center mt-4">
                <Link href="/cadastro" className="text-decoration-none h5-responsive">
                  Não tem uma conta? Cadastre-se
                </Link>
              </div>

              <hr className="my-4" />

              <div className="text-center">
                <small className="text-muted">
                  <i className="fas fa-info-circle me-1"></i>
                  <span className="d-none d-md-inline">
                    Login com Google é recomendado para administradores e funcionários.
                    <br />
                    Login com e-mail é para usuários cadastrados manualmente.
                    <br />
                    Login anônimo é ideal para clientes que querem fazer pedidos rapidamente.
                  </span>
                  <span className="d-md-none">
                    Google para admins, e-mail para cadastrados, anônimo para clientes.
                  </span>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
