export default function Footer() {
  return (
    <footer className="footer py-4 mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>
              <i className="fas fa-utensils me-2"></i>
              Delivery SaaS
            </h5>
            <p className="text-muted">
              Sistema de delivery desenvolvido em Next.js + Firebase,
              com suporte a múltiplos restaurantes e painel de pedidos em tempo real.
            </p>
          </div>

          <div className="col-md-4">
            <h6>Links Úteis</h6>
            <ul className="list-unstyled">
              <li><a href="/sobre" className="text-decoration-none text-muted">Sobre Nós</a></li>
              <li><a href="/termos" className="text-decoration-none text-muted">Termos de Uso</a></li>
              <li><a href="/privacidade" className="text-decoration-none text-muted">Política de Privacidade</a></li>
              <li><a href="/contato" className="text-decoration-none text-muted">Contato</a></li>
            </ul>
          </div>

          <div className="col-md-4">
            <h6>Redes Sociais</h6>
            <div className="d-flex gap-3">
              <a href="#" className="text-decoration-none text-muted">
                <i className="fab fa-facebook fa-lg"></i>
              </a>
              <a href="#" className="text-decoration-none text-muted">
                <i className="fab fa-instagram fa-lg"></i>
              </a>
              <a href="#" className="text-decoration-none text-muted">
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a href="#" className="text-decoration-none text-muted">
                <i className="fab fa-linkedin fa-lg"></i>
              </a>
            </div>
          </div>
        </div>

        <hr className="my-3" />

        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="text-muted mb-0">
              © 2024 Delivery SaaS. Todos os direitos reservados.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="text-muted mb-0">
              <i className="fas fa-heart text-danger me-1"></i>
              Desenvolvido com Next.js e Firebase
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
