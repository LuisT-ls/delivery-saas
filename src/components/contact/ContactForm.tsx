'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    mensagem: ''
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Limpar erro quando o usuário começa a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

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

    if (!formData.mensagem.trim()) {
      newErrors.mensagem = 'Mensagem é obrigatória'
    } else if (formData.mensagem.trim().length < 10) {
      newErrors.mensagem = 'Mensagem deve ter pelo menos 10 caracteres'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simular envio (substituir por chamada real da API no futuro)
    await new Promise(resolve => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Resetar formulário
    setFormData({
      nome: '',
      email: '',
      mensagem: ''
    })
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-5">
        <div className="mb-4">
          <i className="fas fa-check-circle fa-4x text-success"></i>
        </div>
        <h3 className="text-success mb-3">Mensagem Enviada com Sucesso!</h3>
        <p className="text-secondary mb-4">
          Obrigado pelo seu contato. Retornaremos em breve!
        </p>
        <button
          className="btn btn-primary"
          onClick={() => setIsSubmitted(false)}
        >
          <i className="fas fa-plus me-2"></i>
          Enviar Nova Mensagem
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="mb-4">
        <label htmlFor="nome" className="form-label">
          <i className="fas fa-user me-2 text-primary"></i>
          Nome Completo *
        </label>
        <input
          type="text"
          className={`form-control ${errors.nome ? 'is-invalid' : ''}`}
          id="nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          placeholder="Digite seu nome completo"
        />
        {errors.nome && (
          <div className="invalid-feedback">{errors.nome}</div>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="form-label">
          <i className="fas fa-envelope me-2 text-primary"></i>
          Email *
        </label>
        <input
          type="email"
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Digite seu email"
        />
        {errors.email && (
          <div className="invalid-feedback">{errors.email}</div>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="mensagem" className="form-label">
          <i className="fas fa-comment me-2 text-primary"></i>
          Mensagem *
        </label>
        <textarea
          className={`form-control ${errors.mensagem ? 'is-invalid' : ''}`}
          id="mensagem"
          name="mensagem"
          rows={5}
          value={formData.mensagem}
          onChange={handleChange}
          placeholder="Digite sua mensagem (mínimo 10 caracteres)"
        />
        {errors.mensagem && (
          <div className="invalid-feedback">{errors.mensagem}</div>
        )}
      </div>

      <div className="d-grid">
        <button
          type="submit"
          className="btn btn-primary btn-lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Enviando...
            </>
          ) : (
            <>
              <i className="fas fa-paper-plane me-2"></i>
              Enviar Mensagem
            </>
          )}
        </button>
      </div>

      <div className="mt-3 text-center">
        <small className="text-muted">
          * Campos obrigatórios
        </small>
      </div>
    </form>
  )
}
