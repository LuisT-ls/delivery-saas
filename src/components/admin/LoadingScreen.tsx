export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-md-6 col-lg-4 text-center">
            <div className="spinner-border text-primary mb-3" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
            <h4>Carregando...</h4>
            <p className="text-muted">Verificando autenticação</p>
          </div>
        </div>
      </div>
    </div>
  );
}
