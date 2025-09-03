import PrivacyContent from '@/components/legal/PrivacyContent'

export const metadata = {
  title: 'Política de Privacidade - Delivery SaaS',
  description: 'Política de privacidade da plataforma Delivery SaaS. Saiba como coletamos, usamos e protegemos suas informações.',
}

export default function PrivacidadePage() {
  return (
    <div className="container-fluid px-3 px-md-4 px-lg-5 py-4 py-md-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8 col-xl-7">
          <div className="text-center mb-4 mb-md-5">
            <i className="fas fa-user-shield fa-2x fa-md-3x text-primary mb-3"></i>
            <h1 className="display-4 display-md-3 display-lg-4 fw-bold mb-3 text-break">Política de Privacidade</h1>
            <p className="lead text-secondary text-break px-2">
              Saiba como coletamos, usamos e protegemos suas informações
            </p>
          </div>

          <div className="card border-0 shadow-sm legal-card">
            <div className="card-body p-3 p-md-4 p-lg-5">
              <PrivacyContent />
            </div>
          </div>

          <div className="text-center mt-4 mt-md-5">
            <p className="text-muted mb-3 text-break">
              Tem dúvidas sobre nossa política de privacidade?
            </p>
            <a href="/contato" className="btn btn-outline-primary btn-lg w-100 w-sm-auto">
              <i className="fas fa-envelope me-2"></i>
              Entre em Contato
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
