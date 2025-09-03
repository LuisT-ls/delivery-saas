export default function SobrePage() {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="text-center mb-5">
            <i className="fas fa-info-circle fa-3x text-primary mb-3"></i>
            <h1 className="display-4">Sobre o Delivery SaaS</h1>
            <p className="lead text-secondary">
              Sistema completo de delivery para restaurantes
            </p>
          </div>

          <div className="row g-4 mb-5">
            <div className="col-md-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <i className="fas fa-mobile-alt fa-2x text-primary mb-3"></i>
                  <h4>Aplicativo Mobile</h4>
                  <p className="text-muted">
                    Aplicativo nativo para iOS e Android com interface intuitiva para clientes e entregadores.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <i className="fas fa-chart-line fa-2x text-primary mb-3"></i>
                  <h4>Painel Administrativo</h4>
                  <p className="text-muted">
                    Dashboard completo com relatórios, analytics e gestão de pedidos em tempo real.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <i className="fas fa-store fa-2x text-primary mb-3"></i>
                  <h4>Múltiplos Restaurantes</h4>
                  <p className="text-muted">
                    Suporte a múltiplos restaurantes com gestão independente de cardápios e pedidos.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <i className="fas fa-clock fa-2x text-primary mb-3"></i>
                  <h4>Tempo Real</h4>
                  <p className="text-muted">
                    Atualizações em tempo real do status dos pedidos e localização dos entregadores.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-5">
            <div className="col-md-6">
              <h3>Nossa Missão</h3>
              <p className="text-secondary">
                Facilitar a vida dos restaurantes e clientes através de uma plataforma completa de delivery
                que conecta todos os envolvidos no processo de forma eficiente e transparente.
              </p>
            </div>
            <div className="col-md-6">
              <h3>Nossa Visão</h3>
              <p className="text-secondary">
                Ser a plataforma líder em soluções de delivery para restaurantes, oferecendo tecnologia
                de ponta e experiência excepcional para todos os usuários.
              </p>
            </div>
          </div>

          <div className="bg-light p-4 rounded mb-5">
            <h3 className="text-center mb-4 text-dark">Tecnologias Utilizadas</h3>
            <div className="row text-center">
              <div className="col-md-3 mb-3">
                <i className="fab fa-react fa-2x text-primary mb-2"></i>
                <h6 className="text-dark">Next.js</h6>
                <small className="text-muted">Framework React</small>
              </div>
              <div className="col-md-3 mb-3">
                <i className="fas fa-fire fa-2x text-warning mb-2"></i>
                <h6 className="text-dark">Firebase</h6>
                <small className="text-muted">Backend & Database</small>
              </div>
              <div className="col-md-3 mb-3">
                <i className="fab fa-bootstrap fa-2x text-primary mb-2"></i>
                <h6 className="text-dark">Bootstrap</h6>
                <small className="text-muted">UI Framework</small>
              </div>
              <div className="col-md-3 mb-3">
                <i className="fas fa-code fa-2x text-info mb-2"></i>
                <h6 className="text-dark">TypeScript</h6>
                <small className="text-muted">Linguagem</small>
              </div>
            </div>
          </div>

          <div className="row mb-5">
            <div className="col-md-6">
              <h3>Para Restaurantes</h3>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <i className="fas fa-check text-success me-2"></i>
                  Gestão completa de pedidos
                </li>
                <li className="mb-2">
                  <i className="fas fa-check text-success me-2"></i>
                  Controle de cardápio
                </li>
                <li className="mb-2">
                  <i className="fas fa-check text-success me-2"></i>
                  Relatórios e analytics
                </li>
                <li className="mb-2">
                  <i className="fas fa-check text-success me-2"></i>
                  Integração com entregadores
                </li>
              </ul>
            </div>
            <div className="col-md-6">
              <h3>Para Clientes</h3>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <i className="fas fa-check text-success me-2"></i>
                  Interface intuitiva
                </li>
                <li className="mb-2">
                  <i className="fas fa-check text-success me-2"></i>
                  Acompanhamento em tempo real
                </li>
                <li className="mb-2">
                  <i className="fas fa-check text-success me-2"></i>
                  Múltiplas opções de pagamento
                </li>
                <li className="mb-2">
                  <i className="fas fa-check text-success me-2"></i>
                  Avaliações e feedback
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <h3>Pronto para começar?</h3>
            <p className="text-secondary mb-4">
              Junte-se a centenas de restaurantes que já confiam no nosso sistema.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <a href="/cadastro" className="btn btn-primary btn-lg">
                <i className="fas fa-rocket me-2"></i>
                Criar Conta Gratuita
              </a>
              <a href="/menu" className="btn btn-outline-primary btn-lg">
                <i className="fas fa-eye me-2"></i>
                Ver Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
