import TermsContent from '@/components/legal/TermsContent'

export const metadata = {
  title: 'Termos de Uso - Delivery SaaS',
  description: 'Termos de uso da plataforma Delivery SaaS. Conheça as regras e responsabilidades para uso de nossos serviços.',
}

export default function TermosPage() {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="text-center mb-5">
            <i className="fas fa-gavel fa-3x text-primary mb-3"></i>
            <h1 className="display-4">Termos de Uso</h1>
            <p className="lead text-secondary">
              Conheça as regras e responsabilidades para uso de nossos serviços
            </p>
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5">
              <TermsContent />
            </div>
          </div>

          <div className="text-center mt-5">
            <p className="text-muted mb-3">
              Tem dúvidas sobre nossos termos?
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
