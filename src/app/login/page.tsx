'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // TODO: Implementar lógica de autenticação
    console.log('Tentativa de login:', formData)

    // Simular delay
    setTimeout(() => {
      setLoading(false)
      alert('Funcionalidade de login será implementada em breve!')
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
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

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    <i className="fas fa-envelope me-2"></i>
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="seu@email.com"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    <i className="fas fa-lock me-2"></i>
                    Senha
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Sua senha"
                  />
                </div>

                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="remember"
                  />
                  <label className="form-check-label" htmlFor="remember">
                    Lembrar de mim
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 mb-3"
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

                <div className="text-center">
                  <Link href="/cadastro" className="text-decoration-none">
                    Não tem uma conta? Cadastre-se
                  </Link>
                </div>
              </form>

              <hr className="my-4" />

              <div className="text-center">
                <button className="btn btn-outline-primary w-100 mb-2">
                  <i className="fab fa-google me-2"></i>
                  Entrar com Google
                </button>
                <button className="btn btn-outline-dark w-100">
                  <i className="fab fa-facebook me-2"></i>
                  Entrar com Facebook
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
