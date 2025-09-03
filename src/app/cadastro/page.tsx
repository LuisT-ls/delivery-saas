'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/components/AuthProvider'
import { SignUpData, AuthError } from '@/lib/types'

export default function CadastroPage() {
  const router = useRouter()
  const { signUp, loading } = useAuthContext()

  const [formData, setFormData] = useState<SignUpData>({
    nome: '',
    email: '',
    telefone: '',
    password: '',
    confirmPassword: ''
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [submitError, setSubmitError] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório'
    } else if (formData.nome.trim().length < 2) {
      newErrors.nome = 'Nome deve ter pelo menos 2 caracteres'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }

    if (!formData.telefone.trim()) {
      newErrors.telefone = 'Telefone é obrigatório'
    } else if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(formData.telefone)) {
      newErrors.telefone = 'Telefone deve estar no formato (11) 99999-9999'
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

  const formatPhoneNumber = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '')

    // Aplica a máscara (XX) XXXXX-XXXX
    if (numbers.length <= 2) {
      return `(${numbers}`
    } else if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    } else if (numbers.length <= 11) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`
    } else {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError('')

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      await signUp(formData)

      // Redirecionar para o menu após cadastro bem-sucedido
      router.push('/menu')
    } catch (error: any) {
      if (error.userMessage) {
        setSubmitError(error.userMessage)
      } else {
        setSubmitError('Ocorreu um erro inesperado. Tente novamente.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === 'telefone') {
      const formattedValue = formatPhoneNumber(value)
      setFormData({
        ...formData,
        [name]: formattedValue
      })
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }

    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }

    // Limpar erro geral quando o usuário modificar qualquer campo
    if (submitError) {
      setSubmitError('')
    }
  }

  const isFormValid = () => {
    return formData.nome.trim() &&
      formData.email.trim() &&
      formData.telefone.trim() &&
      formData.password &&
      formData.confirmPassword &&
      formData.password === formData.confirmPassword
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

              {submitError && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  {submitError}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setSubmitError('')}
                  ></button>
                </div>
              )}

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
                      disabled={isSubmitting}
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
                      disabled={isSubmitting}
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
                      disabled={isSubmitting}
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
                      disabled={isSubmitting}
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
                      disabled={isSubmitting}
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
                    disabled={isSubmitting}
                  />
                  <label className="form-check-label" htmlFor="terms">
                    Concordo com os <Link href="/termos" className="text-decoration-none">Termos de Uso</Link> e <Link href="/privacidade" className="text-decoration-none">Política de Privacidade</Link>
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 mb-3"
                  disabled={isSubmitting || !isFormValid()}
                >
                  {isSubmitting ? (
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
                <button className="btn btn-outline-primary w-100 mb-2" disabled>
                  <i className="fab fa-google me-2"></i>
                  Cadastrar com Google
                </button>
                <button className="btn btn-outline-dark w-100" disabled>
                  <i className="fab fa-facebook me-2"></i>
                  Cadastrar com Facebook
                </button>
                <small className="text-muted d-block mt-2">
                  <i className="fas fa-info-circle me-1"></i>
                  Login social será implementado em breve
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
