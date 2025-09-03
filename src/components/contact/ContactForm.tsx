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
        <h3 className="text-success mb-3 h3-responsive">Mensagem Enviada com Sucesso!</h3>
        <p className="text-secondary mb-4 text-break">
          Obrigado pelo seu contato. Retornaremos em breve!
        </p>
        <button
          className="btn btn-primary btn-lg w-100 w-sm-auto"
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
      {/* Nome e Email em linha no desktop, empilhados no mobile */}
      <div className="row g-3 g-md-4 mb-4">
        <div className="col-12 col-md-6">
          <label htmlFor="nome" className="form-label fw-semibold">
            <i className="fas fa-user me-2 text-primary"></i>
            Nome Completo *
          </label>
          <input
            type="text"
            className={`form-control form-control-lg ${errors.nome ? 'is-invalid' : ''}`}
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Digite seu nome completo"
            aria-describedby="nomeHelp"
            required
          />
          {errors.nome && (
            <div className="invalid-feedback" id="nomeError">{errors.nome}</div>
          )}
          <div id="nomeHelp" className="form-text">
            Digite seu nome completo como aparece em documentos
          </div>
        </div>

        <div className="col-12 col-md-6">
          <label htmlFor="email" className="form-label fw-semibold">
            <i className="fas fa-envelope me-2 text-primary"></i>
            Email *
          </label>
          <input
            type="email"
            className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Digite seu email"
            aria-describedby="emailHelp"
            required
          />
          {errors.email && (
            <div className="invalid-feedback" id="emailError">{errors.email}</div>
          )}
          <div id="emailHelp" className="form-text">
            Usaremos este email para retornar o contato
          </div>
        </div>
      </div>

      {/* Mensagem sempre em largura total */}
      <div className="mb-4">
        <label htmlFor="mensagem" className="form-label fw-semibold">
          <i className="fas fa-comment me-2 text-primary"></i>
          Mensagem *
        </label>
        <textarea
          className={`form-control form-control-lg ${errors.mensagem ? 'is-invalid' : ''}`}
          id="mensagem"
          name="mensagem"
          rows={5}
          value={formData.mensagem}
          onChange={handleChange}
          placeholder="Digite sua mensagem (mínimo 10 caracteres)"
          aria-describedby="mensagemHelp"
          required
        />
        {errors.mensagem && (
          <div className="invalid-feedback" id="mensagemError">{errors.mensagem}</div>
        )}
        <div id="mensagemHelp" className="form-text">
          Descreva detalhadamente sua dúvida ou sugestão
        </div>
      </div>

      {/* Botão responsivo */}
      <div className="d-flex flex-column flex-sm-row justify-content-end gap-3">
        <button
          type="submit"
          className="btn btn-primary btn-lg w-100 w-sm-auto"
          disabled={isSubmitting}
          aria-describedby="submitHelp"
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
        <div id="submitHelp" className="form-text text-center text-sm-start">
          * Campos obrigatórios
        </div>
      </div>
    </form>
  )
}
