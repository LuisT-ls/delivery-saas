export default function LoadingSpinner() {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="text-center">
        <div className="spinner-border text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Carregando...</span>
        </div>
        <h5 className="text-muted">Carregando menu...</h5>
      </div>
    </div>
  );
}
