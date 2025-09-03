import PrivacyContent from '@/components/legal/PrivacyContent'

export const metadata = {
  title: 'Política de Privacidade - Delivery SaaS',
  description: 'Política de privacidade da plataforma Delivery SaaS. Saiba como coletamos, usamos e protegemos suas informações.',
}

export default function PrivacidadePage() {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="text-center mb-5">
            <i className="fas fa-user-shield fa-3x text-primary mb-3"></i>
            <h1 className="display-4">Política de Privacidade</h1>
            <p className="lead text-secondary">
              Saiba como coletamos, usamos e protegemos suas informações
            </p>
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5">
              <PrivacyContent />
            </div>
          </div>

          <div className="text-center mt-5">
            <p className="text-muted mb-3">
              Tem dúvidas sobre nossa política de privacidade?
            </p>
            <a href="/contato" className="btn btn-outline-primary">
              <i className="fas fa-envelope me-2"></i>
              Entre em Contato
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
