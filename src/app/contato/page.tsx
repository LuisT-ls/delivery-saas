import ContactForm from '@/components/contact/ContactForm'

export const metadata = {
  title: 'Contato - Delivery SaaS',
  description: 'Entre em contato com a equipe do Delivery SaaS. Estamos aqui para ajudar com suas dúvidas e sugestões.',
}

export default function ContatoPage() {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="text-center mb-5">
            <i className="fas fa-envelope fa-3x text-primary mb-3"></i>
            <h1 className="display-4">Fale Conosco</h1>
            <p className="lead text-secondary">
              Estamos aqui para ajudar com suas dúvidas e sugestões
            </p>
          </div>

          <div className="row g-5">
            {/* Informações de Contato */}
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body text-center p-4">
                  <h5 className="card-title text-primary mb-3">
                    <i className="fas fa-map-marker-alt me-2"></i>
                    Endereço
                  </h5>
                  <p className="card-text text-muted">
                    Rua das Tecnologias, 123<br />
                    Bairro da Inovação<br />
                    São Paulo - SP, 01234-567
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body text-center p-4">
                  <h5 className="card-title text-primary mb-3">
                    <i className="fas fa-phone me-2"></i>
                    Telefone
                  </h5>
                  <p className="card-text text-muted">
                    (11) 99999-9999<br />
                    (11) 88888-8888<br />
                    Segunda a Sexta, 9h às 18h
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body text-center p-4">
                  <h5 className="card-title text-primary mb-3">
                    <i className="fas fa-envelope me-2"></i>
                    Email
                  </h5>
                  <p className="card-text text-muted">
                    contato@deliverysaas.com<br />
                    suporte@deliverysaas.com<br />
                    Resposta em até 24h
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulário de Contato */}
          <div className="card border-0 shadow-sm mt-5">
            <div className="card-header bg-primary text-white text-center py-3">
              <h4 className="mb-0">
                <i className="fas fa-paper-plane me-2"></i>
                Envie sua Mensagem
              </h4>
            </div>
            <div className="card-body p-4 p-md-5">
              <ContactForm />
            </div>
          </div>

          {/* Informações Adicionais */}
          <div className="text-center mt-5">
            <h5 className="text-primary mb-3">Outras Formas de Contato</h5>
            <div className="d-flex justify-content-center gap-4 mb-4">
              <a href="#" className="text-decoration-none text-muted">
                <i className="fab fa-whatsapp fa-2x"></i>
                <div className="mt-2">WhatsApp</div>
              </a>
              <a href="#" className="text-decoration-none text-muted">
                <i className="fab fa-telegram fa-2x"></i>
                <div className="mt-2">Telegram</div>
              </a>
              <a href="#" className="text-decoration-none text-muted">
                <i className="fab fa-discord fa-2x"></i>
                <div className="mt-2">Discord</div>
              </a>
            </div>
            <p className="text-muted">
              Para suporte técnico urgente, utilize nosso chat online disponível 24/7
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
