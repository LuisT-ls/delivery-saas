import ContactForm from '@/components/contact/ContactForm'

export const metadata = {
  title: 'Contato - Delivery SaaS',
  description: 'Entre em contato com a equipe do Delivery SaaS. Estamos aqui para ajudar com suas dúvidas e sugestões.',
}

export default function ContatoPage() {
  return (
    <div className="container-fluid px-3 px-md-4 px-lg-5 py-4 py-md-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8 col-xl-7">
          <div className="text-center mb-4 mb-md-5">
            <i className="fas fa-envelope fa-2x fa-md-3x text-primary mb-3"></i>
            <h1 className="display-4 display-md-3 display-lg-4 fw-bold mb-3 text-break">Fale Conosco</h1>
            <p className="lead text-secondary text-break px-2">
              Estamos aqui para ajudar com suas dúvidas e sugestões
            </p>
          </div>

          <div className="row g-3 g-md-4 g-lg-5">
            {/* Informações de Contato */}
            <div className="col-12 col-md-4">
              <div className="card border-0 shadow-sm h-100 contact-info-card">
                <div className="card-body text-center p-3 p-md-4">
                  <h5 className="card-title text-primary mb-3 h5-responsive">
                    <i className="fas fa-map-marker-alt me-2"></i>
                    Endereço
                  </h5>
                  <p className="card-text text-muted text-break">
                    Rua das Tecnologias, 123<br />
                    Bairro da Inovação<br />
                    São Paulo - SP, 01234-567
                  </p>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="card border-0 shadow-sm h-100 contact-info-card">
                <div className="card-body text-center p-3 p-md-4">
                  <h5 className="card-title text-primary mb-3 h5-responsive">
                    <i className="fas fa-phone me-2"></i>
                    Telefone
                  </h5>
                  <p className="card-text text-muted text-break">
                    (11) 99999-9999<br />
                    (11) 88888-8888<br />
                    Segunda a Sexta, 9h às 18h
                  </p>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="card border-0 shadow-sm h-100 contact-info-card">
                <div className="card-body text-center p-3 p-md-4">
                  <h5 className="card-title text-primary mb-3 h5-responsive">
                    <i className="fas fa-envelope me-2"></i>
                    Email
                  </h5>
                  <p className="card-text text-muted text-break">
                    contato@deliverysaas.com<br />
                    suporte@deliverysaas.com<br />
                    Resposta em até 24h
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulário de Contato */}
          <div className="card border-0 shadow-sm mt-4 mt-md-5 contact-form-card">
            <div className="card-header bg-primary text-white text-center py-3">
              <h4 className="mb-0 h4-responsive">
                <i className="fas fa-paper-plane me-2"></i>
                Envie sua Mensagem
              </h4>
            </div>
            <div className="card-body p-3 p-md-4 p-lg-5">
              <ContactForm />
            </div>
          </div>

          {/* Informações Adicionais */}
          <div className="text-center mt-4 mt-md-5">
            <h5 className="text-primary mb-3 h5-responsive">Outras Formas de Contato</h5>
            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 gap-md-4 mb-4">
              <a href="#" className="text-decoration-none text-muted contact-social-link">
                <i className="fab fa-whatsapp fa-2x fa-md-3x"></i>
                <div className="mt-2">WhatsApp</div>
              </a>
              <a href="#" className="text-decoration-none text-muted contact-social-link">
                <i className="fab fa-telegram fa-2x fa-md-3x"></i>
                <div className="mt-2">Telegram</div>
              </a>
              <a href="#" className="text-decoration-none text-muted contact-social-link">
                <i className="fab fa-discord fa-2x fa-md-3x"></i>
                <div className="mt-2">Discord</div>
              </a>
            </div>
            <p className="text-muted text-break px-2">
              Para suporte técnico urgente, utilize nosso chat online disponível 24/7
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
