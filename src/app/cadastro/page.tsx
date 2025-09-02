'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function CadastroPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }

    if (!formData.telefone.trim()) {
      newErrors.telefone = 'Telefone é obrigatório'
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    // TODO: Implementar lógica de cadastro
    console.log('Tentativa de cadastro:', formData)

    // Simular delay
    setTimeout(() => {
      setLoading(false)
      alert('Funcionalidade de cadastro será implementada em breve!')
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      })
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <i className="fas fa-user-plus fa-3x text-primary mb-3"></i>
                <h2 className="card-title">Criar Conta</h2>
                <p className="text-muted">Preencha seus dados para se cadastrar</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <label htmlFor="nome" className="form-label">
                      <i className="fas fa-user me-2"></i>
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.nome ? 'is-invalid' : ''}`}
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      required
                      placeholder="Seu nome completo"
                    />
                    {errors.nome && <div className="invalid-feedback">{errors.nome}</div>}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="form-label">
                      <i className="fas fa-envelope me-2"></i>
                      Email
                    </label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="seu@email.com"
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="telefone" className="form-label">
                      <i className="fas fa-phone me-2"></i>
                      Telefone
                    </label>
                    <input
                      type="tel"
                      className={`form-control ${errors.telefone ? 'is-invalid' : ''}`}
                      id="telefone"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      required
                      placeholder="(11) 99999-9999"
                    />
                    {errors.telefone && <div className="invalid-feedback">{errors.telefone}</div>}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="password" className="form-label">
                      <i className="fas fa-lock me-2"></i>
                      Senha
                    </label>
                    <input
                      type="password"
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="Mínimo 6 caracteres"
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                      <i className="fas fa-lock me-2"></i>
                      Confirmar Senha
                    </label>
                    <input
                      type="password"
                      className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      placeholder="Confirme sua senha"
                    />
                    {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                  </div>
                </div>

                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="terms"
                    required
                  />
                  <label className="form-check-label" htmlFor="terms">
                    Concordo com os <Link href="/termos" className="text-decoration-none">Termos de Uso</Link> e <Link href="/privacidade" className="text-decoration-none">Política de Privacidade</Link>
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
                      Criando conta...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-user-plus me-2"></i>
                      Criar Conta
                    </>
                  )}
                </button>

                <div className="text-center">
                  <Link href="/login" className="text-decoration-none">
                    Já tem uma conta? Faça login
                  </Link>
                </div>
              </form>

              <hr className="my-4" />

              <div className="text-center">
                <button className="btn btn-outline-primary w-100 mb-2">
                  <i className="fab fa-google me-2"></i>
                  Cadastrar com Google
                </button>
                <button className="btn btn-outline-dark w-100">
                  <i className="fab fa-facebook me-2"></i>
                  Cadastrar com Facebook
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
