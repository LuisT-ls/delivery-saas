import TermsContent from '@/components/legal/TermsContent'

export const metadata = {
  title: 'Termos de Uso - Delivery SaaS',
  description: 'Termos de uso da plataforma Delivery SaaS. Conheça as regras e responsabilidades para uso de nossos serviços.',
}

export default function TermosPage() {
  return (
    <div className="container-fluid px-3 px-md-4 px-lg-5 py-4 py-md-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8 col-xl-7">
          <div className="text-center mb-4 mb-md-5">
            <i className="fas fa-gavel fa-2x fa-md-3x text-primary mb-3"></i>
            <h1 className="display-4 display-md-3 display-lg-4 fw-bold mb-3 text-break">Termos de Uso</h1>
            <p className="lead text-secondary text-break px-2">
              Conheça as regras e responsabilidades para uso de nossos serviços
            </p>
          </div>

          <div className="card border-0 shadow-sm legal-card">
            <div className="card-body p-3 p-md-4 p-lg-5">
              <TermsContent />
            </div>
          </div>

          <div className="text-center mt-4 mt-md-5">
            <p className="text-muted mb-3 text-break">
              Tem dúvidas sobre nossos termos?
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
